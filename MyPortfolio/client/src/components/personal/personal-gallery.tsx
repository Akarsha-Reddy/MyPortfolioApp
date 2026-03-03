import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 1, title: "Morning Coffee Ritual", description: "The perfect start to any day — finding peace in the ritual of brewing.", category: "Lifestyle", location: "Home", date: "Jan 2024", emoji: "☕", color: "#f59e0b" },
  { id: 2, title: "Sunset from the Balcony", description: "Sometimes the most beautiful moments happen right at home.", category: "Nature", location: "Balcony", date: "Jan 2024", emoji: "🌅", color: "#f97316" },
  { id: 3, title: "Book Collection Corner", description: "My growing collection of stories and wisdom from around the world.", category: "Personal", location: "Reading Nook", date: "Jan 2024", emoji: "📚", color: "#0ea5e9" },
  { id: 4, title: "Street Art Discovery", description: "Found this incredible mural during a weekend walk. Art is everywhere.", category: "Urban", location: "Downtown", date: "Jan 2024", emoji: "🎨", color: "#a855f7" },
  { id: 5, title: "Midnight Coding Session", description: "When inspiration strikes at 2 AM and the world is quiet.", category: "Work", location: "Home Office", date: "Jan 2024", emoji: "💻", color: "#10b981" },
  { id: 6, title: "Weekend Market Adventure", description: "Exploring local markets and discovering new flavors and stories.", category: "Adventure", location: "Local Market", date: "Jan 2024", emoji: "🛒", color: "#06b6d4" },
  { id: 7, title: "Rainy Day Reflection", description: "There's something magical about watching rain from inside with tea.", category: "Mood", location: "Window Side", date: "Dec 2023", emoji: "🌧️", color: "#8b5cf6" },
  { id: 8, title: "Gaming Setup", description: "My corner for digital adventures and creative challenges.", category: "Gaming", location: "Gaming Corner", date: "Dec 2023", emoji: "🎮", color: "#ef4444" },
  { id: 9, title: "Garden Visitors", description: "The little creatures that make our garden their home.", category: "Nature", location: "Garden", date: "Dec 2023", emoji: "🦋", color: "#ec4899" },
];

const CATEGORIES = ["All", "Lifestyle", "Nature", "Personal", "Urban", "Work", "Adventure", "Mood", "Gaming"];

function GalleryCard({
  item, onOpen, index, inView,
}: {
  item: typeof GALLERY_ITEMS[number]; onOpen: (id: number) => void;
  index: number; inView: boolean;
}) {
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - y) * 12);
    rotateY.set((x - 0.5) * 12);
  };

  return (
    <motion.div
      className="perspective-1000"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.06 * index, duration: 0.55, type: "spring" }}
    >
      <motion.div
        ref={ref}
        className="aspect-square rounded-2xl border overflow-hidden cursor-pointer group relative"
        style={{ borderColor: "rgba(255,255,255,0.07)", rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => scale.set(1.03)}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0); scale.set(1); }}
        onClick={() => onOpen(item.id)}
        whileTap={{ scale: 0.97 }}
      >
        {/* Emoji bg */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${item.color}18, ${item.color}08, rgba(6,10,30,0.95))` }}
        >
          <motion.span
            className="text-6xl"
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            {item.emoji}
          </motion.span>
        </div>

        {/* Top bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: item.color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.1 + 0.06 * index, duration: 0.6 }}
        />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold border"
          style={{ background: item.color + "15", color: item.color, borderColor: item.color + "30" }}
        >
          {item.category}
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(6,10,30,0.95) 0%, transparent 60%)" }}
        >
          <h3 className="text-sm font-bold text-white mb-1 leading-tight">{item.title}</h3>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <MapPin className="w-3 h-3" /> {item.location}
            <span>·</span>
            <Calendar className="w-3 h-3" /> {item.date}
          </div>
        </motion.div>

        {/* Spotlight glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 30px ${item.color}15` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function PersonalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = GALLERY_ITEMS.filter(i => selectedCategory === "All" || i.category === selectedCategory);
  const selectedItem = filtered.find(i => i.id === selectedId);

  const next = () => {
    if (selectedId == null) return;
    const idx = (filtered.findIndex(i => i.id === selectedId) + 1) % filtered.length;
    setSelectedId(filtered[idx].id);
  };
  const prev = () => {
    if (selectedId == null) return;
    const idx = (filtered.findIndex(i => i.id === selectedId) - 1 + filtered.length) % filtered.length;
    setSelectedId(filtered[idx].id);
  };

  return (
    <section
      ref={sectionRef}
      id="personal-gallery"
      className="py-28 relative overflow-hidden"
      style={{ background: "hsl(222,84%,4.9%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#10b981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
          >
            Life in Frames
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            My{" "}
            <span style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Gallery
            </span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
            Moments captured, memories preserved — a visual journey through my life
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200"
              style={{
                background: selectedCategory === cat ? "#a855f7" : "rgba(255,255,255,0.03)",
                borderColor: selectedCategory === cat ? "#a855f7" : "rgba(255,255,255,0.08)",
                color: selectedCategory === cat ? "white" : "rgb(100,116,139)",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Grid */}
        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} onOpen={setSelectedId} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Journal note */}
        <motion.div
          className="text-center mt-16 p-8 rounded-2xl border"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <Camera className="w-8 h-8 mx-auto mb-3" style={{ color: "#10b981" }} />
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Each image tells a story, captures a feeling, or preserves a moment that mattered to me.
            Photography isn't just about the technical — it's about freezing time and creating a visual diary.
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full mx-4"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <div
                className="aspect-square rounded-2xl flex items-center justify-center mb-5 text-8xl border"
                style={{ background: `linear-gradient(135deg, ${selectedItem.color}18, rgba(6,10,30,0.95))`, borderColor: selectedItem.color + "30" }}
              >
                {selectedItem.emoji}
              </div>
              <div className="text-center text-white px-4">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{selectedItem.description}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span><MapPin className="inline w-3 h-3 mr-1" />{selectedItem.location}</span>
                  <span><Calendar className="inline w-3 h-3 mr-1" />{selectedItem.date}</span>
                  <span className="px-2 py-0.5 rounded-md border text-xs" style={{ color: selectedItem.color, borderColor: selectedItem.color + "30", background: selectedItem.color + "10" }}>
                    {selectedItem.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}