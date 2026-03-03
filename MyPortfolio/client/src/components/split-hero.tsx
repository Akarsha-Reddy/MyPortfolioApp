import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Tag data ─── */
const PRO_TAGS = [
    { text: "DevOps", x: 8, y: 15 },
    { text: "Kubernetes", x: 5, y: 36 },
    { text: "AWS", x: 22, y: 58 },
    { text: "CI/CD", x: 6, y: 75 },
    { text: "Terraform", x: 28, y: 27 },
    { text: "Docker", x: 14, y: 46 },
    { text: "99.9% Uptime", x: 3, y: 88 },
    { text: "GitOps", x: 32, y: 68 },
];

const PERSONAL_TAGS = [
    { text: "☕ Coffee", x: 58, y: 14 },
    { text: "🎵 Music", x: 75, y: 32 },
    { text: "📚 Reading", x: 62, y: 55 },
    { text: "✈️ Travel", x: 80, y: 68 },
    { text: "📸 Photos", x: 88, y: 22 },
    { text: "✨ Dreamer", x: 70, y: 80 },
    { text: "🧘 Mindful", x: 56, y: 72 },
    { text: "🎮 Gaming", x: 85, y: 48 },
];

type Mode = "professional" | "personal";

interface SplitHeroProps {
    onSelectMode: (mode: Mode) => void;
}

export default function SplitHero({ onSelectMode }: SplitHeroProps) {
    const [hovered, setHovered] = useState<"left" | "right" | null>(null);
    const [exiting, setExiting] = useState<Mode | null>(null);

    /* divider% — 50 center, 65 = left expanded, 35 = right expanded */
    const dividerPct = hovered === "left" ? 65 : hovered === "right" ? 35 : 50;

    const enter = useCallback(
        (mode: Mode) => {
            setExiting(mode);
            setTimeout(() => onSelectMode(mode), 650);
        },
        [onSelectMode]
    );

    return (
        <div className="fixed inset-0 z-[999] overflow-hidden select-none" style={{ background: "hsl(222,84%,4%)" }}>
            {/* ═══════ LEFT HALF ═══════ */}
            <motion.div
                className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden cursor-pointer"
                animate={{ right: `${100 - dividerPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                onMouseEnter={() => setHovered("left")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => enter("professional")}
            >
                {/* Background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background:
                            hovered === "left"
                                ? "linear-gradient(135deg,#030d22 0%,#061530 50%,#0a2048 100%)"
                                : "linear-gradient(135deg,#050f20 0%,#081a35 60%,#071220 100%)",
                    }}
                    transition={{ duration: 0.5 }}
                />

                {/* Dot-grid */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: "radial-gradient(rgba(14,165,233,1) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Glow blobs */}
                <motion.div
                    className="absolute rounded-full blur-3xl pointer-events-none"
                    style={{ width: 440, height: 440, left: "-60px", top: "10%", background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)" }}
                    animate={{ scale: hovered === "left" ? 1.25 : 1, opacity: hovered === "right" ? 0.3 : 0.8 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.div
                    className="absolute rounded-full blur-3xl pointer-events-none"
                    style={{ width: 320, height: 320, left: "15%", bottom: "5%", background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
                    animate={{ scale: hovered === "left" ? 1.3 : 1, opacity: hovered === "right" ? 0.2 : 0.7 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Floating pro tags */}
                {PRO_TAGS.map((tag, i) => (
                    <motion.div
                        key={tag.text}
                        className="absolute text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm pointer-events-none whitespace-nowrap"
                        style={{
                            left: `${tag.x}%`,
                            top: `${tag.y}%`,
                            color: "rgba(14,165,233,0.85)",
                            borderColor: "rgba(14,165,233,0.22)",
                            background: "rgba(14,165,233,0.07)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: hovered === "right" ? 0.15 : 0.8,
                            y: hovered === "left" ? -5 : 0,
                        }}
                        transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                    >
                        {tag.text}
                    </motion.div>
                ))}

                {/* Text content */}
                <div className="relative z-10 text-left pr-16 pl-10 max-w-xs">
                    <motion.p
                        className="text-[10px] font-black tracking-[0.35em] uppercase mb-3"
                        style={{ color: "rgba(14,165,233,0.55)" }}
                        animate={{ opacity: hovered === "right" ? 0.25 : 1 }}
                    >
                        {"< engineer />"}
                    </motion.p>

                    <motion.h2
                        className="text-5xl md:text-[4.5rem] font-black leading-none mb-3 tracking-tight"
                        animate={{ opacity: hovered === "right" ? 0.2 : 1, x: hovered === "left" ? -6 : 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <span style={{ background: "linear-gradient(135deg,#f8fafc 40%,#0ea5e9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Akarsh
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-sm font-semibold tracking-wide mb-6"
                        style={{ color: "rgba(148,163,184,0.75)" }}
                        animate={{ opacity: hovered === "right" ? 0.2 : 1 }}
                    >
                        Senior DevOps Engineer
                    </motion.p>

                    <motion.div
                        className="space-y-1.5 mb-8"
                        animate={{ opacity: hovered === "right" ? 0 : 1, y: hovered === "left" ? 0 : 8 }}
                        transition={{ duration: 0.35 }}
                    >
                        {["Infrastructure Architecture", "Cloud & Automation", "5+ Years @ Bosch Digital"].map((t) => (
                            <p key={t} className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#0ea5e9" }} />
                                {t}
                            </p>
                        ))}
                    </motion.div>

                    <motion.button
                        className="relative px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg,#0ea5e9,#10b981)",
                            boxShadow: hovered === "left" ? "0 0 40px rgba(14,165,233,0.5)" : "0 0 18px rgba(14,165,233,0.25)",
                        }}
                        animate={{ opacity: hovered === "right" ? 0 : 1, y: hovered === "left" ? 0 : 12 }}
                        transition={{ duration: 0.35 }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="relative">View My Work →</span>
                    </motion.button>
                </div>

                {/* Right-edge divider line */}
                <div className="absolute inset-y-0 right-0 w-px" style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.08),transparent)" }} />
            </motion.div>

            {/* ═══════ RIGHT HALF ═══════ */}
            <motion.div
                className="absolute inset-y-0 right-0 flex items-center justify-center overflow-hidden cursor-pointer"
                animate={{ left: `${dividerPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                onMouseEnter={() => setHovered("right")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => enter("personal")}
            >
                {/* Background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background:
                            hovered === "right"
                                ? "linear-gradient(225deg,#0c0224 0%,#16053a 50%,#0a0228 100%)"
                                : "linear-gradient(225deg,#090120 0%,#120430 60%,#080118 100%)",
                    }}
                    transition={{ duration: 0.5 }}
                />

                {/* Bokeh blobs */}
                <motion.div
                    className="absolute rounded-full blur-3xl pointer-events-none"
                    style={{ width: 420, height: 420, right: "-60px", top: "8%", background: "radial-gradient(circle,rgba(168,85,247,0.18) 0%,transparent 70%)" }}
                    animate={{ scale: hovered === "right" ? 1.25 : 1, opacity: hovered === "left" ? 0.3 : 0.8 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.div
                    className="absolute rounded-full blur-3xl pointer-events-none"
                    style={{ width: 300, height: 300, right: "12%", bottom: "8%", background: "radial-gradient(circle,rgba(236,72,153,0.13) 0%,transparent 70%)" }}
                    animate={{ scale: hovered === "right" ? 1.3 : 1, opacity: hovered === "left" ? 0.2 : 0.7 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Floating personal tags */}
                {PERSONAL_TAGS.map((tag, i) => {
                    const leftPct = tag.x - dividerPct;
                    return (
                        <motion.div
                            key={tag.text}
                            className="absolute text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm pointer-events-none whitespace-nowrap"
                            style={{
                                left: `${(tag.x - 50) * 2}%`,
                                top: `${tag.y}%`,
                                color: "rgba(168,85,247,0.85)",
                                borderColor: "rgba(168,85,247,0.22)",
                                background: "rgba(168,85,247,0.07)",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: hovered === "left" ? 0.15 : 0.8,
                                y: hovered === "right" ? -5 : 0,
                            }}
                            transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                        >
                            {tag.text}
                        </motion.div>
                    );
                })}

                {/* Text content */}
                <div className="relative z-10 text-right pl-16 pr-10 max-w-xs">
                    <motion.p
                        className="text-[10px] font-black tracking-[0.35em] uppercase mb-3"
                        style={{ color: "rgba(168,85,247,0.55)" }}
                        animate={{ opacity: hovered === "left" ? 0.25 : 1 }}
                    >
                        {"{ human }"}
                    </motion.p>

                    <motion.h2
                        className="text-5xl md:text-[4.5rem] font-black leading-none mb-3 tracking-tight"
                        animate={{ opacity: hovered === "left" ? 0.2 : 1, x: hovered === "right" ? 6 : 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <span style={{ background: "linear-gradient(135deg,#f8fafc 40%,#a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Reddy
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-sm font-semibold tracking-wide mb-6"
                        style={{ color: "rgba(148,163,184,0.75)" }}
                        animate={{ opacity: hovered === "left" ? 0.2 : 1 }}
                    >
                        Life Beyond the Terminal
                    </motion.p>

                    <motion.div
                        className="space-y-1.5 mb-8"
                        animate={{ opacity: hovered === "left" ? 0 : 1, y: hovered === "right" ? 0 : 8 }}
                        transition={{ duration: 0.35 }}
                    >
                        {["Coffee & Conversations", "Music & Mindfulness", "Stories & Adventures"].map((t) => (
                            <p key={t} className="text-xs text-slate-500 flex items-center justify-end gap-2">
                                {t}
                                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#a855f7" }} />
                            </p>
                        ))}
                    </motion.div>

                    <div className="flex justify-end">
                        <motion.button
                            className="relative px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg,#a855f7,#ec4899)",
                                boxShadow: hovered === "right" ? "0 0 40px rgba(168,85,247,0.5)" : "0 0 18px rgba(168,85,247,0.25)",
                            }}
                            animate={{ opacity: hovered === "left" ? 0 : 1, y: hovered === "right" ? 0 : 12 }}
                            transition={{ duration: 0.35 }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="relative">♥ Get to Know Me</span>
                        </motion.button>
                    </div>
                </div>

                {/* Left-edge accent line */}
                <div className="absolute inset-y-0 left-0 w-px" style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.08),transparent)" }} />
            </motion.div>

            {/* ═══════ CENTER AVATAR ═══════ */}
            <motion.div
                className="fixed z-[100] pointer-events-none"
                animate={{ left: `${dividerPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                style={{ top: "50%", transform: "translate(-50%, -50%)" }}
            >
                {/* Spinning gradient ring */}
                <motion.div
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full p-[2px] flex items-center justify-center"
                    style={{
                        background:
                            hovered === "left"
                                ? "conic-gradient(from 0deg,#0ea5e9,#10b981,#0ea5e9)"
                                : hovered === "right"
                                    ? "conic-gradient(from 0deg,#a855f7,#ec4899,#a855f7)"
                                    : "conic-gradient(from 0deg,#0ea5e9,#a855f7,#ec4899,#10b981,#0ea5e9)",
                        boxShadow:
                            hovered === "left"
                                ? "0 0 55px rgba(14,165,233,0.55)"
                                : hovered === "right"
                                    ? "0 0 55px rgba(168,85,247,0.55)"
                                    : "0 0 35px rgba(14,165,233,0.3)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    {/* Inner circle */}
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "hsl(222,84%,5%)" }}>
                        {/* Split inner halves */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 h-full" style={{ background: "linear-gradient(to right,rgba(14,165,233,0.12),transparent)" }} />
                                <div className="w-1/2 h-full" style={{ background: "linear-gradient(to left,rgba(168,85,247,0.12),transparent)" }} />
                            </div>
                            {/* Center seam */}
                            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: "rgba(255,255,255,0.06)" }} />
                            <span
                                className="relative z-10 text-[1.9rem] font-black"
                                style={{
                                    background: "linear-gradient(135deg,#0ea5e9 0%,#f8fafc 50%,#a855f7 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    letterSpacing: "-0.04em",
                                }}
                            >
                                AR
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Pulsing rings */}
                {[0, 1].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border"
                        style={{
                            borderColor:
                                hovered === "left"
                                    ? "rgba(14,165,233,0.3)"
                                    : hovered === "right"
                                        ? "rgba(168,85,247,0.3)"
                                        : "rgba(255,255,255,0.06)",
                        }}
                        animate={{ scale: [1, 1.45 + i * 0.2], opacity: [0.7, 0] }}
                        transition={{ duration: 2.2, delay: i * 0.55, repeat: Infinity }}
                    />
                ))}

                {/* Hint label */}
                <AnimatePresence>
                    {hovered === null && (
                        <motion.p
                            className="absolute whitespace-nowrap text-[9px] font-bold tracking-[0.25em] uppercase text-slate-600"
                            style={{ bottom: "-28px", left: "50%", transform: "translateX(-50%)" }}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.35 }}
                        >
                            choose your side
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* ═══════ ENTER OVERLAY ═══════ */}
            <AnimatePresence>
                {exiting && (
                    <motion.div
                        className="fixed inset-0 z-[1000]"
                        style={{
                            background:
                                exiting === "professional"
                                    ? "linear-gradient(135deg,#040e22,#081a35)"
                                    : "linear-gradient(135deg,#080120,#14042e)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
