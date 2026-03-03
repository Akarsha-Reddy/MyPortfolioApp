import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const HOBBIES = [
  { emoji: "☕", name: "Coffee Exploration", category: "Lifestyle", description: "Discovering unique coffee shops and brewing methods. There's something magical about that perfect cup.", color: "#f59e0b", now: "Experimenting with pour-over and Ethiopian single origins" },
  { emoji: "🎵", name: "Music Discovery", category: "Creative", description: "Always hunting for new artists and genres. Music is the soundtrack to life.", color: "#a855f7", now: "Discovering lo-fi jazz and indie folk perfect for coding" },
  { emoji: "📚", name: "Reading & Learning", category: "Intellectual", description: "From fiction to philosophy, books open new worlds. Currently into mindfulness literature.", color: "#0ea5e9", now: "\"The Power of Now\" + \"Atomic Habits\"" },
  { emoji: "📸", name: "Photography", category: "Creative", description: "Capturing moments that tell stories. Street photography and nature shots are my favorites.", color: "#10b981", now: "Exploring golden hour portrait shots around Bangalore" },
  { emoji: "🎮", name: "Gaming", category: "Entertainment", description: "From indie narratives to strategy games — incredible storytelling and problem-solving.", color: "#ef4444", now: "Currently playing indie narrative games on weekends" },
  { emoji: "✈️", name: "Travel Planning", category: "Adventure", description: "Dreaming up adventures and exploring new cultures. Even planning brings joy.", color: "#06b6d4", now: "Planning a trip to Ladakh and Coorg this year" },
  { emoji: "✍️", name: "Creative Writing", category: "Creative", description: "Expressing thoughts through words — journaling, poetry, short stories.", color: "#8b5cf6", now: "Writing a travel journal + personal essay series" },
  { emoji: "🧘", name: "Mindfulness", category: "Wellness", description: "Daily meditation and reflection. 10 minutes of stillness transforms everything.", color: "#ec4899", now: "Daily 10-min morning meditation streak: 🔥 43 days" },
];

const STATS = [
  { emoji: "☕", value: "∞", label: "Cups of Coffee", color: "#f59e0b" },
  { emoji: "📖", value: "23", label: "Books This Year", color: "#0ea5e9" },
  { emoji: "🎵", value: "47", label: "Fav Playlists", color: "#a855f7" },
  { emoji: "📸", value: "2.1k", label: "Photos Captured", color: "#10b981" },
];

function HobbyCard({ hobby, index, inView }: { hobby: typeof HOBBIES[number]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <SpotlightCard
        className="h-full p-5 transition-all duration-300 group cursor-default"
        spotlightColor={hobby.color + "18"}
      >
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: hobby.color + "18", border: `1px solid ${hobby.color}30` }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            {hobby.emoji}
          </motion.div>
          <div>
            <span
              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase mb-1"
              style={{ background: hobby.color + "15", color: hobby.color }}
            >
              {hobby.category}
            </span>
            <h3 className="text-sm font-bold text-white leading-tight group-hover:opacity-90">{hobby.name}</h3>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{hobby.description}</p>
        <motion.div
          className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium"
          style={{ background: hobby.color + "0A", borderColor: hobby.color + "25", color: hobby.color }}
          whileHover={{ scale: 1.02 }}
        >
          🔴 Now: {hobby.now}
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function PersonalHobbies() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="personal-hobbies"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(168,85,247,0.04) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#a855f7", borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            What I Love
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Hobbies &{" "}
            <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Passions
            </span>
          </h2>
          <motion.p
            className="text-slate-400 text-lg mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            The things that spark joy, fuel creativity, and make life worth living
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              whileHover={{ scale: 1.04, borderColor: stat.color + "44" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, type: "spring" }}
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hobbies 4-col grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {HOBBIES.map((hobby, i) => (
            <HobbyCard key={hobby.name} hobby={hobby} index={i} inView={inView} />
          ))}
        </div>

        {/* Quote banner */}
        <motion.div
          className="text-center p-10 rounded-2xl border relative overflow-hidden"
          style={{ background: "rgba(168,85,247,0.04)", borderColor: "rgba(168,85,247,0.15)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* Animated bg shimmer */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.06), transparent)" }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative z-10">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-3">Life is an Adventure</h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed mb-4">
              These hobbies aren't just ways to pass time — they're windows into different aspects of life.
              Each one teaches me something new about myself and the world. Whether it's patience from brewing
              the perfect cup, creativity sparked by a book, or mindfulness in a quiet moment.
            </p>
            <span className="text-sm font-medium" style={{ color: "#a855f7" }}>
              "The best way to find yourself is to lose yourself in what you love." ✨
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}