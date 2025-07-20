import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CompaniesSection from "@/components/companies-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import FloatingElements from "@/components/floating-elements";
import ParallaxContainer from "@/components/parallax-container";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Navigation />
      <FloatingElements />
      
      {/* Main Content with Optimized Scroll Animations */}
      <div className="relative z-10">
        <HeroSection />
        
        <CompaniesSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
      
      {/* Enhanced Floating Action Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.a 
          href="#home" 
          className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          animate={{ 
            boxShadow: [
              "0 4px 14px 0 rgba(59, 130, 246, 0.3)",
              "0 4px 20px 0 rgba(59, 130, 246, 0.5)",
              "0 4px 14px 0 rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-slate-900 py-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Footer Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "400% 400%" }}
        />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400 text-sm">
                © 2024 Akarsh Reddy Chiripireddy. Crafted with 
                <motion.span 
                  className="text-destructive ml-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ❤️
                </motion.span> 
                and a lot of 
                <motion.span 
                  className="text-accent ml-1"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ☕
                </motion.span>
              </p>
            </div>
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-slate-400 text-sm">Built with React + DevOps Magic</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
