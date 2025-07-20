import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, MapPin, Calendar, Smile, Coffee, Music, Book, Camera } from "lucide-react";

export default function PersonalAbout() {
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

  const personalStats = [
    { icon: Coffee, label: "Cups of Coffee", value: "∞", color: "from-amber-500 to-orange-600" },
    { icon: Book, label: "Books Read This Year", value: "23", color: "from-blue-500 to-indigo-600" },
    { icon: Music, label: "Favorite Playlists", value: "47", color: "from-purple-500 to-pink-600" },
    { icon: Camera, label: "Photos Captured", value: "2.1k", color: "from-emerald-500 to-teal-600" },
  ];

  const personalValues = [
    { title: "Authenticity", description: "Being true to myself and others in everything I do" },
    { title: "Growth", description: "Constantly learning and evolving as a person" },
    { title: "Connection", description: "Building meaningful relationships with people" },
    { title: "Creativity", description: "Finding unique ways to express myself and solve problems" },
    { title: "Adventure", description: "Embracing new experiences and stepping out of my comfort zone" },
    { title: "Gratitude", description: "Appreciating the small moments that make life beautiful" },
  ];

  return (
    <section id="personal-about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">About Me</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Behind the screens and beyond the code, here's who I really am
            </p>
          </motion.div>

          {/* Personal Story */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">My Story</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hi there! I'm Akarsh Reddy Chiripireddy, but you can call me Akarsh. 
                  I'm someone who believes that life is too short to not pursue what makes your heart sing.
                </p>
                <p>
                  When I'm not diving deep into the tech world, you'll find me exploring new coffee shops, 
                  getting lost in a good book, or planning my next adventure. I have an insatiable curiosity 
                  about the world and the people in it.
                </p>
                <p>
                  What drives me? The belief that every day is an opportunity to learn something new, 
                  to make someone smile, or to create something beautiful. I'm passionate about 
                  connecting with people and sharing stories that matter.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  Based in India
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  Born in the 90s
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Smile className="w-4 h-4 text-violet-400" />
                  Optimist at heart
                </div>
              </div>
            </div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 p-8 backdrop-blur-sm border border-violet-500/20">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl">👨‍💻</div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Personal Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {personalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Personal Values */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-foreground">What I Value</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <h4 className="text-lg font-semibold text-violet-400 mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Quote */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12"
          >
            <blockquote className="text-2xl md:text-3xl font-light text-gradient italic max-w-4xl mx-auto">
              "Life is not about finding yourself. Life is about creating yourself."
            </blockquote>
            <p className="text-muted-foreground mt-4">— A motto I live by</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}