import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Camera, X, ChevronLeft, ChevronRight, MapPin, Calendar, Heart } from "lucide-react";

// Mock gallery data - in a real app, this would come from your API
const galleryItems = [
  {
    id: 1,
    title: "Morning Coffee Ritual",
    description: "The perfect start to any day - finding peace in the simple ritual of brewing coffee.",
    image: null, // Using emoji placeholder
    category: "Daily Life",
    date: new Date("2024-01-15"),
    location: "Home",
    emoji: "☕",
  },
  {
    id: 2,
    title: "Sunset from the Balcony",
    description: "Sometimes the most beautiful moments happen right at home.",
    image: null,
    category: "Nature",
    date: new Date("2024-01-12"),
    location: "Balcony",
    emoji: "🌅",
  },
  {
    id: 3,
    title: "Book Collection Corner",
    description: "My growing collection of stories and wisdom from around the world.",
    image: null,
    category: "Personal",
    date: new Date("2024-01-10"),
    location: "Reading Nook",
    emoji: "📚",
  },
  {
    id: 4,
    title: "Street Art Discovery",
    description: "Found this incredible mural during a weekend walk. Art is everywhere if you look for it.",
    image: null,
    category: "Urban",
    date: new Date("2024-01-08"),
    location: "Downtown",
    emoji: "🎨",
  },
  {
    id: 5,
    title: "Midnight Coding Session",
    description: "When inspiration strikes at 2 AM and the world is quiet.",
    image: null,
    category: "Work",
    date: new Date("2024-01-05"),
    location: "Home Office",
    emoji: "💻",
  },
  {
    id: 6,
    title: "Weekend Market Adventure",
    description: "Exploring local markets and discovering new flavors and stories.",
    image: null,
    category: "Adventure",
    date: new Date("2024-01-03"),
    location: "Local Market",
    emoji: "🛒",
  },
  {
    id: 7,
    title: "Rainy Day Reflection",
    description: "There's something magical about watching rain from inside with a warm cup of tea.",
    image: null,
    category: "Mood",
    date: new Date("2023-12-30"),
    location: "Window Side",
    emoji: "🌧️",
  },
  {
    id: 8,
    title: "Gaming Setup",
    description: "My corner for digital adventures and creative challenges.",
    image: null,
    category: "Gaming",
    date: new Date("2023-12-28"),
    location: "Gaming Corner",
    emoji: "🎮",
  },
  {
    id: 9,
    title: "Garden Visitors",
    description: "The little creatures that make our garden their home.",
    image: null,
    category: "Nature",
    date: new Date("2023-12-25"),
    location: "Garden",
    emoji: "🦋",
  },
];

const categories = ["All", "Daily Life", "Nature", "Personal", "Urban", "Work", "Adventure", "Mood", "Gaming"];

export default function PersonalGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(item => 
    selectedCategory === "All" || item.category === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setSelectedImage(filteredItems[nextIndex].id);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setSelectedImage(filteredItems[prevIndex].id);
    }
  };

  const selectedItem = selectedImage ? filteredItems.find(item => item.id === selectedImage) : null;

  return (
    <section id="personal-gallery" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">Gallery</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Moments captured, memories preserved - a visual journey through my life
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-violet-500 text-white"
                    : "bg-slate-800/50 text-muted-foreground hover:bg-violet-500/20 hover:text-violet-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openLightbox(item.id)}
              >
                {/* Image placeholder with emoji */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">{item.title}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                    <span>•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{item.date.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Photo Journal Note */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-slate-800/20 rounded-2xl border border-violet-500/20"
          >
            <Camera className="w-12 h-12 text-violet-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Photo Journal</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Each image tells a story, captures a feeling, or preserves a moment that mattered to me. 
              Photography isn't just about the technical aspects—it's about freezing time and 
              creating a visual diary of life's beautiful, ordinary, and extraordinary moments.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="aspect-square max-w-2xl mx-auto rounded-xl overflow-hidden bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center border border-violet-500/30">
                <span className="text-8xl">{selectedItem.emoji}</span>
              </div>

              {/* Image details */}
              <div className="mt-6 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-white/80 mb-4 max-w-2xl mx-auto">{selectedItem.description}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedItem.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedItem.date.toLocaleDateString()}</span>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-violet-500/20 text-violet-300 text-xs">
                    {selectedItem.category}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}