import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HelpCircle, Plus, Minus, MessageCircle, Heart } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What drives your passion for technology?",
    answer: "Technology fascinates me because it's a powerful tool for solving real-world problems and connecting people. I love the creative problem-solving aspect and the constant learning that comes with staying current in this fast-evolving field. Plus, there's something magical about turning an idea into reality through code.",
    category: "Career",
  },
  {
    id: 2,
    question: "How do you balance work and personal life?",
    answer: "Balance is an ongoing journey, not a destination. I prioritize setting boundaries, like no work emails after 8 PM, and I make sure to schedule time for hobbies and relationships. I've learned that taking breaks and pursuing interests outside of work actually makes me more creative and productive when I return to coding.",
    category: "Life",
  },
  {
    id: 3,
    question: "What's your favorite way to learn new things?",
    answer: "I'm a hands-on learner who thrives on building projects. I love starting with documentation, then diving into small experiments, and gradually building something meaningful. I also enjoy learning from others through online communities, podcasts during my morning coffee, and the occasional late-night rabbit hole on YouTube!",
    category: "Learning",
  },
  {
    id: 4,
    question: "If you could have dinner with anyone, who would it be?",
    answer: "That's tough! I'd love to sit down with Maya Angelou. Her wisdom about resilience, humanity, and finding beauty in life's challenges would be incredible to experience firsthand. Plus, I imagine she'd have the most amazing stories and would make even a simple dinner feel profound.",
    category: "Personal",
  },
  {
    id: 5,
    question: "What's the best advice you've ever received?",
    answer: "'Progress, not perfection.' This simple phrase from my mentor changed how I approach everything. It helped me overcome perfectionist paralysis and start sharing my work, even when it wasn't 'perfect.' Some of my best projects and relationships came from embracing this mindset.",
    category: "Wisdom",
  },
  {
    id: 6,
    question: "How do you handle stress and pressure?",
    answer: "I've developed a toolkit over the years: deep breathing exercises, going for walks (especially in nature), listening to music, and talking things through with friends or family. I also practice the '10-10-10 rule' - asking myself if something will matter in 10 minutes, 10 months, and 10 years. It really puts things in perspective.",
    category: "Wellness",
  },
  {
    id: 7,
    question: "What's something people would be surprised to know about you?",
    answer: "I'm actually quite introverted! While I love connecting with people and can be quite social, I recharge best with quiet time alone or with a good book. I also have a secret talent for making really elaborate pancakes on Sunday mornings - it's become my meditation practice.",
    category: "Fun",
  },
  {
    id: 8,
    question: "What are your goals for the next five years?",
    answer: "I want to continue growing both technically and personally. Professionally, I'm excited about diving deeper into emerging technologies and maybe mentoring others. Personally, I'd love to travel more, write a blog that truly resonates with people, and maybe learn a new language. The key is staying open to unexpected opportunities.",
    category: "Future",
  },
  {
    id: 9,
    question: "What's your coffee order?",
    answer: "I'm glad you asked! My go-to is a medium roast pour-over with single-origin beans - currently obsessed with Ethiopian beans for their bright, fruity notes. But honestly, I'm always experimenting. Weekends are for trying new brewing methods, and I'm not ashamed to admit I have strong opinions about water temperature.",
    category: "Favorites",
  },
  {
    id: 10,
    question: "How do you stay motivated during tough times?",
    answer: "I remind myself that tough times are temporary but the growth they bring is permanent. I lean on my support network, practice gratitude for the small things, and try to find one tiny action I can take to move forward. Sometimes it's as simple as making my bed or sending a friend a nice message. Motion creates emotion.",
    category: "Motivation",
  },
];

const categories = ["All", "Career", "Life", "Personal", "Wisdom", "Wellness", "Fun", "Future", "Favorites", "Learning", "Motivation"];

export default function PersonalFAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = faqs.filter(faq => 
    selectedCategory === "All" || faq.category === selectedCategory
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

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="personal-faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
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
              <HelpCircle className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">Ask Me Anything</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Questions I get asked often, along with my honest, unfiltered answers
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
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

          {/* FAQ List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="rounded-xl bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-violet-500/5 transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 rounded-md bg-violet-500/20 text-violet-400 text-xs font-medium">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  </div>
                  <div className="ml-4">
                    {openFAQ === faq.id ? (
                      <Minus className="w-5 h-5 text-violet-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-violet-400" />
                    )}
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Ask More Questions CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-slate-800/20 rounded-2xl border border-violet-500/20"
          >
            <MessageCircle className="w-12 h-12 text-violet-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Have More Questions?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              I love connecting with people and sharing stories. If you have a question that's not here, 
              or if you just want to chat about life, technology, or that perfect cup of coffee, 
              don't hesitate to reach out!
            </p>
            <motion.a
              href="#personal-contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('personal-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Start a Conversation
            </motion.a>
          </motion.div>

          {/* Fun Fact */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-8"
          >
            <Heart className="w-8 h-8 text-violet-400 mx-auto mb-4" />
            <p className="text-muted-foreground italic">
              "The best conversations happen when curiosity meets authenticity."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}