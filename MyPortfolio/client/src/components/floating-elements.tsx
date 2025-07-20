import { motion } from "framer-motion";

export default function FloatingElements() {
  const particles = [
    { size: 2, color: "bg-primary", x: "10%", y: "20%", delay: 0 },
    { size: 1, color: "bg-secondary", x: "80%", y: "40%", delay: 0.5 },
    { size: 3, color: "bg-accent", x: "15%", y: "60%", delay: 1 },
    { size: 2, color: "bg-primary", x: "90%", y: "20%", delay: 1.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.color} rounded-full opacity-60`}
          style={{
            width: `${particle.size * 4}px`,
            height: `${particle.size * 4}px`,
            left: particle.x,
            top: particle.y,
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: -20,
            y: -20
          }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.8, 0.4],
            scale: [0, 1, 0.8, 1.2, 0.9],
            x: [0, 15, -10, 20, 0],
            y: [0, -20, 10, -15, 0],
          }}
          transition={{
            delay: particle.delay,
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Larger floating geometric shapes */}
      <motion.div
        className="absolute top-32 right-24 w-16 h-16 border border-primary/20 rounded-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-32 w-12 h-12 border border-secondary/20"
        animate={{
          rotate: [0, -360],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
