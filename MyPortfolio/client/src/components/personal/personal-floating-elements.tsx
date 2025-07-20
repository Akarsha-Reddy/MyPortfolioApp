import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Coffee, Music, Camera, Book } from "lucide-react";

const floatingElements = [
  { Icon: Heart, delay: 0, duration: 8, color: "text-pink-400" },
  { Icon: Star, delay: 1, duration: 10, color: "text-yellow-400" },
  { Icon: Sparkles, delay: 2, duration: 12, color: "text-purple-400" },
  { Icon: Coffee, delay: 3, duration: 9, color: "text-amber-400" },
  { Icon: Music, delay: 4, duration: 11, color: "text-indigo-400" },
  { Icon: Camera, delay: 5, duration: 7, color: "text-emerald-400" },
  { Icon: Book, delay: 6, duration: 13, color: "text-blue-400" },
];

export default function PersonalFloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} opacity-20`}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            rotate: 0
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [0, 1, 0.5, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <element.Icon className="w-6 h-6" />
        </motion.div>
      ))}
      
      {/* Gradient orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl opacity-30"
          style={{
            background: `radial-gradient(circle, hsl(${Math.random() * 360}, 70%, 60%) 0%, transparent 70%)`,
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [0.5, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
    </div>
  );
}