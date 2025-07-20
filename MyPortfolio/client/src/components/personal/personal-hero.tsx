import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Heart, Sparkles, Coffee, Music } from "lucide-react";

export default function PersonalHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <section id="personal-home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-600/20 blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span 
                className="text-2xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                👋
              </motion.span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="text-gradient">Hey, I'm</span>
              <br />
              <span className="text-foreground">Akarsh Reddy</span>
            </h1>
          </motion.div>

          {/* Animated tagline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-xl md:text-2xl text-muted-foreground font-medium min-h-[2em] flex items-center justify-center">
              <TypeAnimation
                sequence={[
                  "A dreamer with a passion for life ✨",
                  2000,
                  "Someone who finds joy in small moments 🌟",
                  2000,
                  "A storyteller at heart 📚",
                  2000,
                  "Always curious, always learning 🚀",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Welcome to my personal corner of the internet! This is where I share my thoughts, 
              passions, and the beautiful chaos that makes life worth living.
            </p>
          </motion.div>

          {/* Personality traits */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Coffee, text: "Coffee Enthusiast", color: "from-amber-500 to-orange-600" },
              { icon: Music, text: "Music Lover", color: "from-purple-500 to-pink-600" },
              { icon: Sparkles, text: "Dream Chaser", color: "from-blue-500 to-indigo-600" },
              { icon: Heart, text: "Life Appreciator", color: "from-red-500 to-rose-600" },
            ].map((trait, index) => (
              <motion.div
                key={trait.text}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${trait.color} bg-opacity-10 backdrop-blur-sm border border-white/10`}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <trait.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{trait.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <motion.a
              href="#personal-about"
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('personal-about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get to Know Me
            </motion.a>
            <motion.a
              href="#personal-blog"
              className="px-8 py-3 border border-violet-500/30 text-violet-400 rounded-full font-medium transition-all duration-300 hover:bg-violet-500/10 hover:border-violet-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('personal-blog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Read My Stories
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-violet-400/50 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-violet-400 rounded-full mt-2"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}