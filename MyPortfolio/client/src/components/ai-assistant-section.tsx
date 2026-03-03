import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ─── */
interface SummaryData {
    headline?: string;
    summary?: string;
    strengths?: string[];
    techStack?: Record<string, string[]>;
    suggestedRoles?: string[];
}

const QUICK_TOPICS = [
    { id: "DevOps Skills", icon: "⚙️", label: "DevOps Skills", color: "#0ea5e9" },
    { id: "Cloud Architecture", icon: "☁️", label: "Cloud Architecture", color: "#10b981" },
    { id: "Certifications", icon: "🏆", label: "Certifications", color: "#a855f7" },
    { id: "Projects", icon: "🚀", label: "Projects", color: "#f59e0b" },
    { id: "Contact", icon: "📬", label: "Contact & Availability", color: "#ef4444" },
];

export default function AIAssistantSection() {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState("");

    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [cardText, setCardText] = useState<Record<string, string>>({});
    const [cardLoading, setCardLoading] = useState<string | null>(null);

    const handleSummarize = async () => {
        setSummaryLoading(true);
        setSummaryError("");
        setSummary(null);
        try {
            const res = await fetch("/api/ai/summarize", { method: "POST", headers: { "Content-Type": "application/json" } });
            if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
            const data = await res.json();
            setSummary(data);
        } catch (e: any) {
            setSummaryError(e.message);
        } finally {
            setSummaryLoading(false);
        }
    };

    const handleExplain = async (topic: string) => {
        if (cardText[topic]) { setActiveCard(topic); return; }
        setActiveCard(topic);
        setCardLoading(topic);
        try {
            const res = await fetch("/api/ai/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });
            const data = await res.json();
            setCardText((p) => ({ ...p, [topic]: data.explanation || data.error || "No response" }));
        } catch {
            setCardText((p) => ({ ...p, [topic]: "Error loading explanation." }));
        } finally {
            setCardLoading(null);
        }
    };

    return (
        <section id="ai-assistant" className="py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 60%)" }} />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-xs font-black tracking-[0.4em] uppercase px-3 py-1 rounded-full border mb-4 inline-block" style={{ color: "#0ea5e9", borderColor: "rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.07)" }}>
                        AI-Powered
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
                        Ask{" "}
                        <span style={{ background: "linear-gradient(135deg, #0ea5e9, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Akarsh AI
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
                        Explore Akarsh's skills and experience through AI. Powered by GPT-4o mini with his resume as the knowledge base.
                    </p>
                </motion.div>

                {/* ── Tool 2: Resume Summarizer ── */}
                <motion.div
                    className="rounded-2xl border p-8 mb-8"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                <span>📋</span> Resume Summarizer
                            </h3>
                            <p className="text-slate-500 text-xs mt-1">AI generates a recruiter-ready breakdown of Akarsh's profile</p>
                        </div>
                        <motion.button
                            className="px-6 py-2.5 rounded-full text-sm font-bold text-white flex items-center gap-2 relative overflow-hidden"
                            style={{ background: summaryLoading ? "rgba(14,165,233,0.3)" : "linear-gradient(135deg, #0ea5e9, #10b981)", boxShadow: summaryLoading ? "none" : "0 0 20px rgba(14,165,233,0.3)" }}
                            whileHover={!summaryLoading ? { scale: 1.04 } : {}}
                            whileTap={!summaryLoading ? { scale: 0.96 } : {}}
                            onClick={handleSummarize}
                            disabled={summaryLoading}
                        >
                            {summaryLoading ? (
                                <>
                                    <motion.span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full inline-block" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                                    Generating...
                                </>
                            ) : "✨ Summarize My Profile"}
                        </motion.button>
                    </div>

                    {summaryError && (
                        <div className="text-sm text-red-400 p-3 rounded-lg border border-red-500/20 bg-red-500/5 mb-4">
                            {summaryError.includes("not configured") ? "⚠️ OpenAI API key not configured. Add OPENAI_API_KEY to .env to enable AI features." : summaryError}
                        </div>
                    )}

                    <AnimatePresence>
                        {summary && (
                            <motion.div
                                className="grid md:grid-cols-2 gap-4"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                            >
                                {/* Headline */}
                                {summary.headline && (
                                    <div className="md:col-span-2 p-4 rounded-xl border text-center" style={{ borderColor: "rgba(14,165,233,0.25)", background: "rgba(14,165,233,0.05)" }}>
                                        <p className="text-base font-bold" style={{ color: "#0ea5e9" }}>"{summary.headline}"</p>
                                    </div>
                                )}
                                {/* Summary */}
                                {summary.summary && (
                                    <div className="p-4 rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">30-sec Pitch</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">{summary.summary}</p>
                                    </div>
                                )}
                                {/* Strengths */}
                                {summary.strengths && (
                                    <div className="p-4 rounded-xl border" style={{ borderColor: "rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.04)" }}>
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Key Strengths</p>
                                        <ul className="space-y-1">
                                            {summary.strengths.map((s) => (
                                                <li key={s} className="text-sm text-slate-300 flex items-start gap-2"><span style={{ color: "#10b981" }}>✓</span>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {/* Suggested roles */}
                                {summary.suggestedRoles && (
                                    <div className="md:col-span-2 p-4 rounded-xl border" style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.04)" }}>
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Ideal Roles</p>
                                        <div className="flex flex-wrap gap-2">
                                            {summary.suggestedRoles.map((r) => (
                                                <span key={r} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ color: "#a855f7", borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)" }}>{r}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Tool 3: Quick Cards ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-base font-black text-white mb-1 flex items-center gap-2"><span>⚡</span> Quick About Akarsh</h3>
                    <p className="text-slate-500 text-xs mb-5">Click any card for an AI-generated explanation</p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                        {QUICK_TOPICS.map((t) => (
                            <motion.button
                                key={t.id}
                                className="p-4 rounded-xl border text-left transition-all relative overflow-hidden"
                                style={{
                                    borderColor: activeCard === t.id ? `${t.color}55` : "rgba(255,255,255,0.07)",
                                    background: activeCard === t.id ? `${t.color}10` : "rgba(255,255,255,0.02)",
                                }}
                                whileHover={{ scale: 1.03, borderColor: `${t.color}44` }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleExplain(t.id)}
                            >
                                <span className="text-xl block mb-2">{t.icon}</span>
                                <span className="text-xs font-bold" style={{ color: activeCard === t.id ? t.color : "rgba(148,163,184,0.7)" }}>{t.label}</span>
                                {cardLoading === t.id && (
                                    <motion.div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: t.color }} animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Explanation panel */}
                    <AnimatePresence mode="wait">
                        {activeCard && (
                            <motion.div
                                key={activeCard}
                                className="p-5 rounded-xl border"
                                style={{ borderColor: `${QUICK_TOPICS.find((t) => t.id === activeCard)?.color}33`, background: "rgba(255,255,255,0.02)" }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: QUICK_TOPICS.find((t) => t.id === activeCard)?.color }}>
                                    {QUICK_TOPICS.find((t) => t.id === activeCard)?.icon} {activeCard}
                                </p>
                                {cardLoading === activeCard ? (
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <motion.div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-current" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                                            ))}
                                        </motion.div>
                                        Generating AI response...
                                    </div>
                                ) : (
                                    <p className="text-slate-300 text-sm leading-relaxed">{cardText[activeCard] || "Loading..."}</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
