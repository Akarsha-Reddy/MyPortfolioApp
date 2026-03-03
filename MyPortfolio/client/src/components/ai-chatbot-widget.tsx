import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const SUGGESTIONS = [
    "What are Akarsh's top skills?",
    "Tell me about his experience at Bosch",
    "What cloud platforms does he use?",
    "What certifications does he have?",
];

export default function AIChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm Akarsh AI 👋 Ask me anything about Akarsh's skills, experience, or projects!" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [streamText, setStreamText] = useState("");
    const [apiError, setApiError] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamText]);

    const send = async (text?: string) => {
        const msg = (text ?? input).trim();
        if (!msg || loading) return;
        setInput("");
        const newMessages: Message[] = [...messages, { role: "user", content: msg }];
        setMessages(newMessages);
        setLoading(true);
        setStreamText("");
        setStreaming(false);

        try {
            const history = newMessages.slice(1, -1).map((m) => ({ role: m.role, content: m.content }));
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, history }),
            });

            if (!res.ok) {
                const d = await res.json();
                if (d.error?.includes("not configured")) {
                    setApiError(true);
                    setMessages([...newMessages, { role: "assistant", content: "⚠️ AI features need an OpenAI API key. Add `OPENAI_API_KEY` to the `.env` file to enable the chatbot." }]);
                } else {
                    setMessages([...newMessages, { role: "assistant", content: `Error: ${d.error}` }]);
                }
                setLoading(false);
                return;
            }

            setStreaming(true);
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
                    for (const line of lines) {
                        const data = line.slice(6);
                        if (data === "[DONE]") break;
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) { accumulated += parsed.text; setStreamText(accumulated); }
                        } catch { }
                    }
                }
            }

            setMessages([...newMessages, { role: "assistant", content: accumulated || "No response received." }]);
            setStreamText("");
            setStreaming(false);
        } catch (e) {
            setMessages([...newMessages, { role: "assistant", content: "Connection error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* FAB button */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                    background: open ? "rgba(30,40,60,0.95)" : "linear-gradient(135deg, #0ea5e9, #10b981)",
                    boxShadow: "0 0 30px rgba(14,165,233,0.5)",
                    border: "1px solid rgba(14,165,233,0.3)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setOpen((o) => !o)}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span key="x" className="text-xl text-white font-bold" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>✕</motion.span>
                    ) : (
                        <motion.span key="ai" className="text-xl" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>🤖</motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed bottom-24 right-6 z-50 w-[360px] rounded-2xl border overflow-hidden shadow-2xl"
                        style={{ background: "rgba(6,14,34,0.97)", borderColor: "rgba(14,165,233,0.25)", backdropFilter: "blur(20px)" }}
                        initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ borderColor: "rgba(14,165,233,0.15)", background: "rgba(14,165,233,0.06)" }}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #0ea5e9, #10b981)" }}>🤖</div>
                            <div>
                                <p className="text-sm font-black text-white">Akarsh AI</p>
                                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                    Online · Knows everything about Akarsh
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div
                                        className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed"
                                        style={m.role === "user"
                                            ? { background: "linear-gradient(135deg, #0ea5e9, #10b981)", color: "white", borderRadius: "18px 18px 4px 18px" }
                                            : { background: "rgba(255,255,255,0.05)", color: "rgba(203,213,225,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px" }
                                        }
                                    >
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Streaming response */}
                            {streaming && (
                                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(203,213,225,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px" }}>
                                        {streamText}
                                        <motion.span className="inline-block w-1 h-3 ml-0.5 align-middle" style={{ background: "#0ea5e9" }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Loading dots */}
                            {loading && !streaming && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#0ea5e9" }} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Suggestions (only on first message) */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        className="text-[10px] px-2.5 py-1 rounded-full border font-medium transition-all"
                                        style={{ color: "#0ea5e9", borderColor: "rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.06)" }}
                                        onClick={() => send(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t" style={{ borderColor: "rgba(14,165,233,0.12)" }}>
                            <div className="flex gap-2 items-center rounded-xl border px-3 py-2" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
                                <input
                                    className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-600 outline-none"
                                    placeholder="Ask about Akarsh's skills..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && send()}
                                    disabled={loading}
                                />
                                <motion.button
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
                                    style={{ background: input.trim() ? "linear-gradient(135deg, #0ea5e9, #10b981)" : "rgba(255,255,255,0.05)" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => send()}
                                    disabled={!input.trim() || loading}
                                >
                                    <span className="text-xs">↑</span>
                                </motion.button>
                            </div>
                            <p className="text-center text-[9px] mt-1.5" style={{ color: "rgba(100,116,139,0.4)" }}>Powered by GPT-4o mini · Resume data as context</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
