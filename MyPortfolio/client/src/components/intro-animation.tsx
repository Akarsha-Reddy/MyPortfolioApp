import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CLI_LINES = [
    { text: "$ sudo init cloud-orchestrator --env=production", delay: 200, color: "rgba(148,163,184,0.8)" },
    { text: "✓ SSH keys verified · Cluster endpoint resolved", delay: 900, color: "#10b981" },
    { text: "$ kubectl apply -f infra/cluster-bootstrap.yaml", delay: 1600, color: "rgba(148,163,184,0.8)" },
    { text: "✓ 3/3 control-plane nodes · Ready", delay: 2300, color: "#10b981" },
    { text: "$ helm upgrade --install ci-stack ./charts/...", delay: 3000, color: "rgba(148,163,184,0.8)" },
    { text: "✓ Jenkins · ArgoCD · Grafana — Operational", delay: 3700, color: "#10b981" },
    { text: "$ terraform apply -auto-approve", delay: 4400, color: "rgba(148,163,184,0.8)" },
    { text: "✓ 47 resources applied · 0 destroyed", delay: 5100, color: "#10b981" },
    { text: "$ prometheus --config=./monitoring/rules.yml", delay: 5800, color: "rgba(148,163,184,0.8)" },
    { text: "✓ Metrics ingested · Alertmanager — Live", delay: 6500, color: "#10b981" },
];

const WELCOME_START = 7200;
const TOTAL_DURATION = 10500;

/* ─── Particle background canvas ─── */
function MatrixCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cols = Math.floor(canvas.width / 20);
        const drops: number[] = Array(cols).fill(1);
        const chars = "アカルシュ01DEVOPS CLOUD K8S AWS⎈";

        const draw = () => {
            ctx.fillStyle = "rgba(3,8,20,0.06)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(14,165,233,0.18)";
            ctx.font = "13px monospace";
            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * 20, y * 20);
                if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
        };

        const id = setInterval(draw, 55);
        return () => clearInterval(id);
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />;
}

/* ─── Glitch text effect ─── */
function GlitchLine({ text, color }: { text: string; color: string }) {
    const [glitch, setGlitch] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setGlitch(true), 200);
        const t2 = setTimeout(() => setGlitch(false), 600);
        return () => { clearTimeout(t); clearTimeout(t2); };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="relative font-mono"
            style={{ color }}
        >
            {glitch && (
                <span
                    className="absolute inset-0 font-mono"
                    style={{
                        color: "#0ea5e9",
                        clipPath: "inset(30% 0 40% 0)",
                        transform: "translateX(4px)",
                        opacity: 0.6,
                    }}
                >
                    {text}
                </span>
            )}
            {text}
        </motion.div>
    );
}

export default function IntroAnimation() {
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showGlowBurst, setShowGlowBurst] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const seen = sessionStorage.getItem("portfolio_intro_seen_v2");
        if (seen) { setDismissed(true); return; }
        setShow(true);

        CLI_LINES.forEach((_, idx) => {
            setTimeout(() => setVisibleLines((p) => [...p, idx]), CLI_LINES[idx].delay);
        });
        setTimeout(() => setShowWelcome(true), WELCOME_START);
        setTimeout(() => setShowGlowBurst(true), WELCOME_START + 200);
        setTimeout(() => dismiss(), TOTAL_DURATION);
    }, []);

    const dismiss = () => {
        sessionStorage.setItem("portfolio_intro_seen_v2", "1");
        setDismissed(true);
    };

    if (!show || dismissed) return null;

    return (
        <AnimatePresence>
            {!dismissed && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "hsl(222,84%,2.5%)" }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                >
                    {/* Matrix rain */}
                    <MatrixCanvas />

                    {/* CRT scanlines */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.045]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(14,165,233,0.5) 2px, rgba(14,165,233,0.5) 3px)",
                        }}
                    />

                    {/* Vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
                    />

                    {!showWelcome ? (
                        /* ── PHASE 1: CLI Terminal ── */
                        <motion.div
                            className="relative w-full max-w-2xl mx-6 rounded-xl overflow-hidden border"
                            style={{ background: "rgba(4,10,24,0.96)", borderColor: "rgba(14,165,233,0.2)" }}
                            key="terminal"
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Title bar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                                <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                                <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                                <span className="ml-auto text-xs font-mono" style={{ color: "rgba(100,116,139,0.5)" }}>
                                    akarsh@devops-cluster  ~
                                </span>
                            </div>
                            <div className="p-6 min-h-[260px] font-mono text-sm leading-loose space-y-0.5">
                                {CLI_LINES.map((line, idx) =>
                                    visibleLines.includes(idx) ? (
                                        <GlitchLine key={idx} text={line.text} color={line.color} />
                                    ) : null
                                )}
                                {/* blinking cursor */}
                                <span className="inline-block">
                                    <motion.span
                                        className="inline-block w-2 h-4 ml-1 align-middle"
                                        style={{ background: "#0ea5e9" }}
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.7, repeat: Infinity }}
                                    />
                                </span>
                            </div>
                            {/* Progress bar */}
                            <div className="px-6 pb-4">
                                <div className="h-px w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: "linear-gradient(90deg, #0ea5e9, #10b981)" }}
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: WELCOME_START / 1000, ease: "linear" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ── PHASE 2: CINEMATIC WELCOME ── */
                        <motion.div
                            className="relative flex flex-col items-center justify-center text-center w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            key="welcome"
                        >
                            {/* Glow burst */}
                            {showGlowBurst && (
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(14,165,233,0.35) 0%, transparent 65%)" }}
                                    initial={{ width: 0, height: 0, opacity: 1 }}
                                    animate={{ width: "120vw", height: "120vw", opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                />
                            )}

                            {/* "SYSTEM ONLINE" small label */}
                            <motion.p
                                className="text-xs font-black tracking-[0.5em] uppercase mb-8"
                                style={{ color: "#10b981" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                ✓ System Online · All Services Running
                            </motion.p>

                            {/* BIG WELCOME */}
                            <motion.p
                                className="text-2xl font-bold tracking-[0.35em] uppercase mb-4"
                                style={{ color: "rgba(148,163,184,0.5)" }}
                                initial={{ opacity: 0, letterSpacing: "1em" }}
                                animate={{ opacity: 1, letterSpacing: "0.35em" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                Welcome
                            </motion.p>

                            {/* NAME — huge, layoutId for FLIP dissolve into hero */}
                            <motion.div layoutId="hero-name" style={{ display: "inline-block" }}>
                                <motion.h1
                                    className="font-black leading-none tracking-tight"
                                    style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
                                    initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <span style={{
                                        background: "linear-gradient(135deg, #ffffff 10%, #0ea5e9 50%, #10b981 90%)",
                                        backgroundSize: "200% auto",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}>
                                        Akarsha Reddy
                                    </span>
                                    <br />
                                    <span style={{
                                        background: "linear-gradient(135deg, #0ea5e9 10%, #10b981 90%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        fontSize: "0.6em",
                                        letterSpacing: "0.08em",
                                    }}>
                                        ChiripiReddy
                                    </span>
                                </motion.h1>
                            </motion.div>

                            {/* Role line */}
                            <motion.p
                                className="mt-6 text-base font-mono tracking-widest uppercase"
                                style={{ color: "rgba(14,165,233,0.6)" }}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                Senior DevOps Engineer · Bosch Digital · Bangalore
                            </motion.p>
                        </motion.div>
                    )}

                    {/* Skip button */}
                    <motion.button
                        className="absolute bottom-8 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full border transition-all"
                        style={{ color: "rgba(100,116,139,0.6)", borderColor: "rgba(255,255,255,0.08)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ color: "#0ea5e9", borderColor: "rgba(14,165,233,0.4)" }}
                        onClick={dismiss}
                    >
                        Skip →
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
