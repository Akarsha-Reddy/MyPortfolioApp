import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TypeAnimation } from "react-type-animation";
import K8sCluster from "@/components/k8s-cluster";

const STATS = [
  { value: "5+", label: "Years Exp.", icon: "⚡" },
  { value: "99.9%", label: "Uptime SLA", icon: "🛡️" },
  { value: "500+", label: "Deployments", icon: "🚀" },
  { value: "40%", label: "Cost Saved", icon: "💰" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const floatX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), { stiffness: 60, damping: 22 });
  const floatY = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), { stiffness: 60, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width) * 2 - 1);
    mouseY.set(((e.clientY - top) / height) * 2 - 1);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden aurora-bg"
      style={{ paddingTop: "80px" }}
    >
      <div className="grain-overlay" />

      {/* Ambient glow — centered */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, rgba(16,185,129,0.04) 50%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl">

        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border mb-6"
          style={{ color: "#0ea5e9", borderColor: "rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.07)" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for Infrastructure Challenges
        </motion.div>

        {/* NAME — uses layoutId="hero-name" to receive the FLIP transition from intro */}
        <motion.div layoutId="hero-name" className="mb-4">
          <motion.h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-white">Akarsha </span>
            <motion.span
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #0ea5e9 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{ backgroundPosition: ["0% center", "200% center", "0% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Reddy
            </motion.span>
            <br />
            <span
              className="font-black"
              style={{
                fontSize: "0.55em",
                letterSpacing: "0.06em",
                background: "linear-gradient(135deg, rgba(148,163,184,0.7) 0%, #0ea5e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ChiripiReddy
            </span>
          </motion.h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          className="flex items-center justify-center gap-2 text-lg text-slate-400 font-medium mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <span className="text-slate-600">›</span>
          <TypeAnimation
            sequence={[
              "Senior DevOps Engineer", 2000,
              "Infrastructure Architect", 2000,
              "Automation Evangelist", 2000,
              "Cloud Native Builder", 2000,
              "Site Reliability Engineer", 2000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
          />
          <motion.span
            className="w-0.5 h-5 inline-block"
            style={{ background: "#0ea5e9" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </motion.div>

        {/* K8s cluster — centered centerpiece */}
        <motion.div
          className="relative flex items-center justify-center w-full"
          style={{ x: floatX, y: floatY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(14,165,233,0.07) 0%, transparent 65%)" }}
          />
          <K8sCluster />
        </motion.div>

        {/* Stats chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8 -mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              whileHover={{ scale: 1.05, borderColor: "rgba(14,165,233,0.35)" }}
            >
              <span className="text-sm">{stat.icon}</span>
              <span className="text-sm font-black" style={{ color: "#0ea5e9" }}>{stat.value}</span>
              <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
            </motion.div>
          ))}
          <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <span className="text-sm">📍</span>
            <span className="text-xs text-slate-500 font-medium">Bangalore · Bosch Digital</span>
          </motion.div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 pb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <MagneticButton
            strength={0.4}
            className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden text-sm"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #10b981)", boxShadow: "0 0 30px rgba(14,165,233,0.4)" } as React.CSSProperties}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative flex items-center gap-2">
              View My Work
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
            </span>
          </MagneticButton>

          <MagneticButton
            strength={0.3}
            className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold border-2 text-sm"
            style={{ borderColor: "rgba(14,165,233,0.4)", color: "#0ea5e9", background: "rgba(14,165,233,0.06)" } as React.CSSProperties}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let's Connect
          </MagneticButton>

          <MagneticButton
            strength={0.2}
            className="relative inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold border text-sm"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(148,163,184,0.7)", background: "rgba(255,255,255,0.02)" } as React.CSSProperties}
          >
            <a href="/Akarsha_DevOpsEngineer_Banglore_1752959237651.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              Resume ↗
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-[9px] uppercase tracking-[0.3em] font-bold" style={{ color: "rgba(148,163,184,0.2)" }}>scroll</p>
        <motion.div className="w-5 h-8 border-2 rounded-full flex justify-center" style={{ borderColor: "rgba(14,165,233,0.2)" }}>
          <motion.div
            className="w-1 h-2.5 rounded-full mt-1.5"
            style={{ background: "#0ea5e9" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
