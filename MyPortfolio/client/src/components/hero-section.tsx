import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useMousePosition } from "@/hooks/use-scroll-animation";
import boschLogo from "@assets/Bosch_1752968584869.jpg";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Senior DevOps Engineer";
  const [ref, inView] = useScrollAnimation(0.3);
  const mousePosition = useMousePosition();

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 0.05}% ${mousePosition.y * 0.05}%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Developer Avatar */}
          <motion.div 
            className="mb-8 relative inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
            >
              AR
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-secondary text-xs px-2 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full mr-1"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Online
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span 
              className="text-gradient block"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              Akarsh Reddy
            </motion.span>
            <motion.span 
              className="text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Chiripireddy
            </motion.span>
          </motion.h1>

          <motion.div 
            className="text-xl md:text-2xl text-slate-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.span 
              className="typing-animation"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 1.2, duration: 2 }}
            >
              {typedText}
            </motion.span>
            <span className="mx-2">|</span>
            <motion.span 
              className="text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Infrastructure Architect
            </motion.span>
            <span className="mx-2">|</span>
            <motion.span 
              className="text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Automation Evangelist
            </motion.span>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {[
              { icon: "location", text: "Bangalore, India", color: "text-primary" },
              { icon: "experience", text: "5+ Years Experience", color: "text-secondary" },
              { icon: "company", text: "Bosch Digital", color: "text-accent", logo: boschLogo }
            ].map((item, index) => (
              <motion.div 
                key={item.text}
                className="flex items-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + (index * 0.2), duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.logo ? (
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center mr-2 p-1">
                    <img 
                      src={item.logo} 
                      alt="Bosch logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <svg className={`w-5 h-5 ${item.color} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                    {item.icon === "location" && (
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    )}
                    {item.icon === "experience" && (
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zm-3 4a1 1 0 100 2 1 1 0 000-2zm5 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    )}
                  </svg>
                )}
                {item.text}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary px-8 py-3 rounded-full transition-all duration-300 font-semibold">
                <a href="#contact">Let's Connect</a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" asChild className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold">
                <a href="/resume.pdf" download>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: [0, 10, 0]
        }}
        transition={{ 
          opacity: { delay: 3, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.2 }}
      >
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
