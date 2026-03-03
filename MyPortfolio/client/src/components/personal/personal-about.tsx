import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { MapPin, Calendar, Smile, Coffee, Music, Book, Camera } from "lucide-react";

const PERSONAL_STATS = [
  { emoji: "☕", icon: Coffee, label: "Cups of Coffee", value: "∞", color: "#f59e0b" },
  { emoji: "📖", icon: Book, label: "Books This Year", value: "23", color: "#0ea5e9" },
  { emoji: "🎵", icon: Music, label: "Fav Playlists", value: "47", color: "#a855f7" },
  { emoji: "📸", icon: Camera, label: "Photos Captured", value: "2.1k", color: "#10b981" },
];

const PERSONAL_VALUES = [
  { icon: "🎯", title: "Authenticity", description: "Being true to myself and others in everything I do", color: "#a855f7" },
  { icon: "🌱", title: "Growth", description: "Constantly learning and evolving as a person", color: "#10b981" },
  { icon: "🤝", title: "Connection", description: "Building meaningful relationships with people", color: "#0ea5e9" },
  { icon: "🎨", title: "Creativity", description: "Finding unique ways to express and solve problems", color: "#f59e0b" },
  { icon: "🗺️", title: "Adventure", description: "Embracing new experiences and stepping out of my comfort zone", color: "#ec4899" },
  { icon: "🙏", title: "Gratitude", description: "Appreciating the small moments that make life beautiful", color: "#8b5cf6" },
];

const STORY_LINES = [
  "Hi! I'm Akarsh Reddy Chiripireddy — but just call me Akarsh.",
  "I believe life is too short to not pursue what makes your heart sing.",
  "When I'm not deep in the tech world, you'll find me exploring coffee shops, getting lost in a good book, or planning my next adventure.",
  "What drives me? Every day is an opportunity to learn something new, to make someone smile, or to create something beautiful.",
];

export default function PersonalAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="personal-about"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(236,72,153,0.04) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      {/* Ambient orb */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-72 h-72 rounded-full blur-3xl opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#ec4899", borderColor: "rgba(236,72,153,0.3)", background: "rgba(236,72,153,0.08)" }}
          >
            Beyond the Code
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            About{" "}
            <span style={{ background: "linear-gradient(135deg, #ec4899, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              The Real Me
            </span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
            Behind the screens and beyond the code — here's who I really am
          </p>
        </motion.div>

        {/* Story + Visual Panel */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left — story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-bold text-white">My Story</h3>
            {STORY_LINES.map((line, i) => (
              <motion.p
                key={i}
                className="text-slate-400 leading-relaxed text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              {[
                { Icon: MapPin, text: "Bangalore, India", color: "#a855f7" },
                { Icon: Calendar, text: "Born in the 90s", color: "#ec4899" },
                { Icon: Smile, text: "Optimist at heart", color: "#f59e0b" },
              ].map(({ Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon className="w-4 h-4" style={{ color }} />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpotlightCard
              className="aspect-square p-8"
              spotlightColor="rgba(168,85,247,0.12)"
            >
              <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                {/* Giant emoji */}
                <motion.div
                  className="text-7xl"
                  animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  👨‍💻
                </motion.div>
                {/* Quote */}
                <div className="text-center px-4">
                  <p className="text-slate-400 text-sm italic leading-relaxed">
                    "Life is not about finding yourself.<br />Life is about creating yourself."
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#a855f7" }}>— A motto I live by</p>
                </div>
                {/* Animated glow layer */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.05), transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Animated stat counters */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {PERSONAL_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-5 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              whileHover={{ scale: 1.05, borderColor: stat.color + "44" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, type: "spring" }}
            >
              <div className="text-2xl mb-2">{stat.emoji}</div>
              <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values grid */}
        <div>
          <motion.h3
            className="text-2xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            What I Value
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERSONAL_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="p-5 rounded-2xl border group"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.5 }}
                whileHover={{ scale: 1.02, borderColor: value.color + "44", background: value.color + "07" }}
              >
                <div className="text-2xl mb-2">{value.icon}</div>
                <h4 className="text-sm font-bold mb-1.5 transition-colors" style={{ color: value.color }}>{value.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}