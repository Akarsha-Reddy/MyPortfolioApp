import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import boschLogo from "@assets/Bosch_1752968584869.jpg";
import publicisLogo from "@assets/PublicisSapient_1752968584870.jpg";
import dxcLogo from "@assets/DXCTechnology_1752968584870.jpg";

/* ─── Animated counter (safe isolated hook) ─── */
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

/* ─── Stat card as isolated component ─── */
function StatCard({
  value, suffix, label, color, icon, active, delay,
}: {
  value: number; suffix: string; label: string; color: string; icon: string; active: boolean; delay: number;
}) {
  const count = useCounter(value, 1600, active);
  return (
    <motion.div
      className="relative p-6 rounded-2xl border text-center overflow-hidden group cursor-default"
      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04, borderColor: color + "55" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${color}12, transparent 70%)` }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      />
      <div className="relative">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-4xl font-black leading-none mb-2" style={{ color }}>
          {count}{suffix}
        </div>
        <div className="text-xs text-slate-400 font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

/* ─── Data ─── */
const STATS = [
  { value: 5, suffix: "+", label: "Years of Experience", color: "#0ea5e9", icon: "⚡" },
  { value: 100, suffix: "+", label: "Pipelines Automated", color: "#10b981", icon: "🔄" },
  { value: 50, suffix: "+", label: "Projects Delivered", color: "#f59e0b", icon: "🚀" },
  { value: 3, suffix: "", label: "Enterprise Companies", color: "#a855f7", icon: "🏢" },
];

const JOURNEY = [
  { year: "2018", title: "The Spark", description: "Joined DXC Technology as DevOps Engineer. First CI/CD pipeline shipped. Fell in love with automation.", color: "#0ea5e9", icon: "💡" },
  { year: "2021", title: "Level Up", description: "Moved to Publicis Sapient as Associate L2. Scaled infrastructure across global clients with Kubernetes & Terraform.", color: "#10b981", icon: "🎯" },
  { year: "2022", title: "The Peak", description: "Joined Bosch Digital as Senior DevOps Engineer. Leading infrastructure strategies and cloud-native migrations.", color: "#a855f7", icon: "🏆" },
  { year: "Now", title: "Beyond", description: "Making deployments invisible. Building systems that scale, self-heal, and make developers' lives effortless.", color: "#f59e0b", icon: "🌟" },
];

const TERMINAL_LINES = [
  { prompt: "$", cmd: "whoami", out: "akarsh-reddy-chiripireddy", delay: 0.5 },
  { prompt: "$", cmd: "cat /etc/role", out: "Senior DevOps Engineer @ Bosch Digital", delay: 1.1 },
  { prompt: "$", cmd: "kubectl get pods --all", out: "50+ pods · 99.9% uptime", delay: 1.7 },
  { prompt: "$", cmd: "terraform plan", out: "✅ 100+ resources · 0 errors", delay: 2.3 },
  { prompt: "$", cmd: "echo $PASSION", out: "Automation · Cloud · Infrastructure", delay: 2.9 },
  { prompt: "▋", cmd: "", out: "", delay: 3.5 },
];

const STORY_CARDS = [
  {
    highlight: "Electronics & Communication Engineering",
    color: "#0ea5e9",
    text: "My journey started with circuits and signals, but fate had bigger plans — automation, pipelines, and cloud infrastructure became my true calling.",
  },
  {
    highlight: "From Selenium scripts to Kubernetes clusters",
    color: "#10b981",
    text: "I evolved from writing first test scripts into orchestrating complex CI/CD pipelines across global enterprises. Infrastructure is my language.",
  },
  {
    highlight: "Currently at Bosch Digital",
    color: "#a855f7",
    text: "Blending cutting-edge DevOps practices with real-world business impact. My mission: making deployments so smooth, they're practically invisible.",
  },
];

const COMPANIES = [
  { src: boschLogo, name: "Bosch Digital", year: "2022–Now", color: "#0ea5e9" },
  { src: publicisLogo, name: "Publicis Sapient", year: "2021–2022", color: "#10b981" },
  { src: dxcLogo, name: "DXC Technology", year: "2018–2021", color: "#a855f7" },
];

/* ─── Main Component ─── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(14,165,233,0.04) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#0ea5e9", borderColor: "rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.08)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            About Me
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              The{" "}
              <span style={{ background: "linear-gradient(135deg, #0ea5e9, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Infrastructure
              </span>
            </motion.span>
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              Whisperer
            </motion.span>
          </h2>
        </motion.div>

        {/* ── Two column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* LEFT: Story cards + company strip */}
          <div>
            {STORY_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="mb-6 p-5 rounded-2xl border relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ borderColor: card.color + "44", scale: 1.01 }}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: card.color }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${card.color}08, transparent 70%)` }}
                />
                <p className="text-slate-400 text-sm leading-relaxed pl-3">
                  <strong style={{ color: card.color }}>{card.highlight}</strong>{" "}— {card.text}
                </p>
              </motion.div>
            ))}

            {/* Company logos */}
            <motion.div
              className="mt-8 p-5 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">Companies I've shaped</p>
              <div className="flex items-center gap-4 flex-wrap">
                {COMPANIES.map((co, i) => (
                  <motion.div
                    key={co.name}
                    className="flex items-center gap-2.5 cursor-default group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5"
                      style={{ boxShadow: `0 0 0 1px ${co.color}33` }}
                    >
                      <img src={co.src} alt={co.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white leading-none">{co.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{co.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Terminal + Timeline */}
          <div className="space-y-8">
            {/* Terminal */}
            <motion.div
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0d1117" }}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "#161b22" }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
                <span className="ml-2 text-xs text-slate-500 font-mono">akarsh@devops ~ bash</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: line.delay, duration: 0.4 }}
                  >
                    {line.cmd ? (
                      <div>
                        <span style={{ color: "#10b981" }}>{line.prompt} </span>
                        <span className="text-white">{line.cmd}</span>
                        {line.out && <div className="text-slate-400 mt-0.5 ml-2">→ {line.out}</div>}
                      </div>
                    ) : (
                      <motion.span
                        className="text-white"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {line.prompt}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">Career Timeline</p>
              <div className="absolute left-3 top-8 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #0ea5e9, #a855f7, transparent)" }} />
              <div className="space-y-4 pl-10">
                {JOURNEY.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute -left-7 top-3 w-3 h-3 rounded-full border-2"
                      style={{ borderColor: item.color, background: item.color + "33" }}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.9 + i * 0.12, duration: 0.4, type: "spring" }}
                    />
                    <div
                      className="p-4 rounded-xl border transition-all duration-300"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{item.icon}</span>
                        <span className="text-xs font-bold" style={{ color: item.color }}>{item.year}</span>
                        <span className="text-sm font-semibold text-white">{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div ref={statsRef}>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {STATS.map((stat, i) => (
              <StatCard
                key={i}
                {...stat}
                active={statsInView}
                delay={i * 0.1}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
