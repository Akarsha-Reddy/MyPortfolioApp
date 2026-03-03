import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CompaniesSection from "@/components/companies-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import FloatingElements from "@/components/floating-elements";
import AIAssistantSection from "@/components/ai-assistant-section";
import AIChatbotWidget from "@/components/ai-chatbot-widget";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen aurora-bg grain-overlay overflow-x-hidden relative">
      {/* Global scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[60] origin-left"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #0ea5e9, #10b981, #a855f7)",
          boxShadow: "0 0 10px rgba(14,165,233,0.6)",
        }}
      />

      <Navigation />
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <CompaniesSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <SkillsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <ExperienceSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <AIAssistantSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <ProjectsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <ContactSection />
        </motion.div>
      </div>

      {/* Scroll-to-top FAB — moved right-24 to make room for chatbot */}
      <motion.div
        className="fixed bottom-6 right-24 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      >
        <motion.a
          href="#home"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0ea5e9, #10b981)",
            boxShadow: "0 0 20px rgba(14,165,233,0.4)",
          }}
          animate={{ boxShadow: ["0 0 20px rgba(14,165,233,0.4)", "0 0 40px rgba(14,165,233,0.7)", "0 0 20px rgba(14,165,233,0.4)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg className="w-5 h-5 text-white relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.a>
      </motion.div>

      {/* AI Chatbot Widget — floating bottom-right */}
      <AIChatbotWidget />

      {/* Footer */}
      <motion.footer
        className="py-8 relative overflow-hidden border-t border-white/5"
        style={{ background: "rgba(6, 12, 30, 0.8)", backdropFilter: "blur(20px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Footer gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #0ea5e9, #10b981, transparent)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Akarsha Reddy ChiripiReddy. Crafted with{" "}
              <motion.span
                className="text-red-400 mx-1"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              and a lot of{" "}
              <motion.span
                className="mx-1"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ☕
              </motion.span>
            </p>
            <motion.span
              className="text-slate-500 text-sm"
              whileHover={{ color: "#0ea5e9" }}
              transition={{ duration: 0.3 }}
            >
              Built with React + DevOps Magic ✨
            </motion.span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
