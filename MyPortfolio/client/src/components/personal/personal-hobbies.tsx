import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Coffee, Music, Book, Camera, Gamepad2, Plane, Palette } from "lucide-react";

const hobbies = [
  {
    id: 1,
    name: "Coffee Exploration",
    description: "Discovering unique coffee shops and brewing methods. There's something magical about that perfect cup that starts the day right.",
    icon: Coffee,
    category: "Lifestyle",
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: 2,
    name: "Music Discovery",
    description: "Always hunting for new artists and genres. Music is the soundtrack to life, and I love curating playlists for different moods.",
    icon: Music,
    category: "Creative",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-500/20 to-pink-600/20",
  },
  {
    id: 3,
    name: "Reading & Learning",
    description: "From fiction to philosophy, books open new worlds. Currently exploring mindfulness and personal development literature.",
    icon: Book,
    category: "Intellectual",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-500/20 to-indigo-600/20",
  },
  {
    id: 4,
    name: "Photography",
    description: "Capturing moments that tell stories. Street photography and nature shots are my favorite ways to freeze time.",
    icon: Camera,
    category: "Creative",
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-500/20 to-teal-600/20",
  },
  {
    id: 5,
    name: "Gaming",
    description: "From indie narratives to strategy games, gaming offers incredible storytelling and problem-solving challenges.",
    icon: Gamepad2,
    category: "Entertainment",
    color: "from-red-500 to-rose-600",
    bgColor: "from-red-500/20 to-rose-600/20",
  },
  {
    id: 6,
    name: "Travel Planning",
    description: "Dreaming up adventures and exploring new cultures. Even planning trips brings joy and excitement to everyday life.",
    icon: Plane,
    category: "Adventure",
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-500/20 to-blue-600/20",
  },
  {
    id: 7,
    name: "Creative Writing",
    description: "Expressing thoughts through words, whether it's journaling, poetry, or short stories. Writing is thinking made visible.",
    icon: Palette,
    category: "Creative",
    color: "from-violet-500 to-purple-600",
    bgColor: "from-violet-500/20 to-purple-600/20",
  },
  {
    id: 8,
    name: "Mindfulness Practice",
    description: "Daily meditation and reflection help me stay grounded. It's amazing how 10 minutes of stillness can transform a day.",
    icon: Heart,
    category: "Wellness",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-500/20 to-rose-600/20",
  },
];

export default function PersonalHobbies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <section id="personal-hobbies" className="py-20 relative">
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
              <Heart className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">Hobbies & Interests</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The things that spark joy, fuel creativity, and make life worth living
            </p>
          </motion.div>

          {/* Hobbies Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.id}
                className="group relative overflow-hidden rounded-xl bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${hobby.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                
                <div className="relative p-6 space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${hobby.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <hobby.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-2 py-1 rounded-md bg-slate-700/50 text-xs text-violet-400 font-medium">
                    {hobby.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-violet-400 transition-colors duration-300">
                    {hobby.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {hobby.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Personal Note */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-slate-800/20 rounded-2xl border border-violet-500/20"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-4xl">✨</span>
              <h3 className="text-2xl font-bold text-foreground">Life is an Adventure</h3>
              <span className="text-4xl">✨</span>
            </div>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              These hobbies aren't just ways to pass time—they're windows into different aspects of life. 
              Each one teaches me something new about myself and the world around me. Whether it's the patience 
              required for the perfect brew, the creativity sparked by a good book, or the mindfulness found in 
              a quiet moment, every interest adds color to my story.
            </p>
            <p className="text-violet-400 font-medium">
              "The best way to find out if you can trust somebody is to trust them." — Life lessons from my hobbies
            </p>
          </motion.div>

          {/* Current Focus */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20">
              <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Currently Brewing</h4>
              <p className="text-muted-foreground text-sm">Experimenting with pour-over techniques and exploring Ethiopian single origins</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/20">
              <Book className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Currently Reading</h4>
              <p className="text-muted-foreground text-sm">"The Power of Now" by Eckhart Tolle and "Atomic Habits" by James Clear</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20">
              <Music className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Currently Listening</h4>
              <p className="text-muted-foreground text-sm">Discovering lo-fi jazz and indie folk artists that create the perfect coding atmosphere</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}