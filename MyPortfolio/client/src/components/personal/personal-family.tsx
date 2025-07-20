import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Heart, Home, Star, Gift, Smile } from "lucide-react";

export default function PersonalFamily() {
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

  const familyValues = [
    {
      icon: Heart,
      title: "Unconditional Love",
      description: "The foundation of everything we do - supporting each other through thick and thin.",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: Home,
      title: "Togetherness",
      description: "Family dinners, weekend games, and the comfort of always having a place to belong.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Star,
      title: "Celebrating Success",
      description: "Every achievement, big or small, is a reason for the whole family to celebrate together.",
      color: "from-yellow-500 to-amber-600",
    },
    {
      icon: Gift,
      title: "Creating Memories",
      description: "From spontaneous road trips to quiet movie nights - we treasure every moment together.",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const familyMembers = [
    {
      relation: "Parents",
      description: "My biggest supporters and wisest advisors. They taught me the value of hard work, kindness, and staying true to myself.",
      emoji: "👨‍👩‍👦",
      qualities: ["Supportive", "Wise", "Caring"],
      color: "from-blue-500 to-indigo-600",
    },
    {
      relation: "Siblings",
      description: "My partners in crime and closest friends. We share inside jokes, childhood memories, and an unbreakable bond.",
      emoji: "👫",
      qualities: ["Fun-loving", "Loyal", "Understanding"],
      color: "from-green-500 to-emerald-600",
    },
  ];

  const familyTraditions = [
    "Sunday family breakfasts with everyone's favorite dishes",
    "Annual family trips to explore new places together",
    "Game nights with lots of laughter (and friendly competition)",
    "Celebrating festivals with traditional foods and stories",
    "Movie marathons during rainy weekends",
    "Birthday celebrations that last the whole day",
  ];

  return (
    <section id="personal-family" className="py-20 relative">
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
              <Users className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">Family</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The people who shaped me, supported me, and continue to fill my life with love and laughter
            </p>
          </motion.div>

          {/* Family Story */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Story</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Family is where my story begins. Growing up in a household filled with love, laughter, 
                  and endless support, I learned the most important lessons of life not from textbooks, 
                  but from the people who cared about me unconditionally.
                </p>
                <p>
                  My family taught me that success isn't just about personal achievements - it's about 
                  lifting each other up, celebrating together, and creating a safe space where everyone 
                  can be their authentic selves. They've been my biggest cheerleaders, my honest critics, 
                  and my constant source of strength.
                </p>
                <p>
                  Whether it's late-night conversations about life, surprise celebrations for small wins, 
                  or simply sharing a meal together, every moment with them reminds me of what truly matters in life.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Family Members */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {familyMembers.map((member, index) => (
              <motion.div
                key={member.relation}
                className="p-8 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h4 className="text-2xl font-bold text-foreground">{member.relation}</h4>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {member.qualities.map((quality) => (
                      <span
                        key={quality}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${member.color} bg-opacity-20 text-white`}
                      >
                        {quality}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Family Values */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-foreground">What We Value</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {familyValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="text-center p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Family Traditions */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-foreground">Our Traditions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyTraditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-violet-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Smile className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{tradition}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What They Taught Me */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-slate-800/20 rounded-2xl border border-violet-500/20"
          >
            <Heart className="w-12 h-12 text-violet-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-6">What They Taught Me</h3>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-violet-400">Resilience:</strong> "Life will knock you down, but the strength to get back up comes from knowing you're not alone."
              </p>
              <p>
                <strong className="text-violet-400">Kindness:</strong> "Small acts of kindness create ripples that can change the world."
              </p>
              <p>
                <strong className="text-violet-400">Authenticity:</strong> "Never change yourself to fit in when you were born to stand out."
              </p>
              <p>
                <strong className="text-violet-400">Gratitude:</strong> "Appreciate what you have while working toward what you want."
              </p>
            </div>
            <motion.div
              className="mt-8 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg text-gradient font-medium">
                "Family: where life begins and love never ends" ❤️
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}