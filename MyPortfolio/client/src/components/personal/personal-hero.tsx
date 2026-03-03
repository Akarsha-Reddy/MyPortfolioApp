import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { TypeAnimation } from "react-type-animation";

const TRAITS = [
  { emoji: "☕", label: "Coffee Enthusiast", color: "#f59e0b" },
  { emoji: "🎵", label: "Music Lover", color: "#a855f7" },
  { emoji: "✨", label: "Dream Chaser", color: "#0ea5e9" },
  { emoji: "❤️", label: "Life Appreciator", color: "#ec4899" },
  { emoji: "📚", label: "Avid Reader", color: "#10b981" },
  { emoji: "📸", label: "Photographer", color: "#f97316" },
];

const VIBES = [
  "vibes", "stories", "adventures", "passions", "moments", "dreams",
  "hobbies", "reflections", "memories", "journey", "life", "art",
];

export default function PersonalHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      id="personal-home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(222,84%,4.9%)" }}
    >
      {/* Aurora bg — violet/pink palette */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Mouse-parallax glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(800px circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, rgba(168,85,247,0.07), transparent 60%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

          {/* Icon badge */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              👋
            </motion.div>
            <motion.span
              className="text-sm font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border"
              style={{ color: "#a855f7", borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)" }}
            >
              Personal Space
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
              <motion.span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{ backgroundPosition: ["0% center", "200% center", "0% center"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Hey, I'm
              </motion.span>
              <span className="block text-white">Akarsh Reddy</span>
            </h1>
          </motion.div>

          {/* TypeAnimation tagline */}
          <motion.div variants={itemVariants} className="text-xl md:text-2xl text-slate-400 font-medium min-h-[2.5em] flex items-center justify-center">
            <TypeAnimation
              sequence={[
                "A dreamer with a passion for life ✨", 2200,
                "Someone who finds joy in small moments 🌟", 2200,
                "A storyteller at heart 📚", 2200,
                "Always curious, always learning 🚀", 2200,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </motion.div>

          {/* Personality trait chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {TRAITS.map((trait, i) => (
              <motion.div
                key={trait.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                style={{ borderColor: trait.color + "30", background: trait.color + "0C", color: "rgb(203,213,225)" }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.4, type: "spring" }}
                whileHover={{ scale: 1.08, borderColor: trait.color + "70", y: -3 }}
              >
                <span>{trait.emoji}</span>
                <span>{trait.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <MagneticButton
              href="#personal-about"
              strength={0.4}
              className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden group cursor-pointer"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 0 30px rgba(168,85,247,0.35)" } as React.CSSProperties}
            >
              <motion.span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Get to Know Me
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
              </span>
            </MagneticButton>
            <MagneticButton
              href="#personal-blog"
              strength={0.3}
              className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold border-2 cursor-pointer"
              style={{ borderColor: "rgba(168,85,247,0.4)", color: "#a855f7", background: "rgba(168,85,247,0.06)" } as React.CSSProperties}
            >
              <span className="flex items-center gap-2">📖 Read My Stories</span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Bottom vibe marquee */}
        <motion.div
          className="absolute bottom-10 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-xs text-slate-700 font-bold tracking-widest uppercase text-center mb-3">Life is made of</p>
          <InfiniteMarquee direction="left" speed={30} gap={32} className="py-1">
            {VIBES.map((v) => (
              <span key={v} className="flex-shrink-0 text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(168,85,247,0.35)" }}>
                {v} ·
              </span>
            ))}
          </InfiniteMarquee>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: "rgba(168,85,247,0.4)" }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full mt-2"
            style={{ background: "#a855f7" }}
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}