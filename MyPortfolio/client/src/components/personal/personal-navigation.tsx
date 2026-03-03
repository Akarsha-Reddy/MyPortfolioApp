import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Home, User, BookOpen, Camera, MessageCircle, HelpCircle, Users } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "#personal-home", icon: Home },
  { name: "About", href: "#personal-about", icon: User },
  { name: "Blog", href: "#personal-blog", icon: BookOpen },
  { name: "Hobbies", href: "#personal-hobbies", icon: Heart },
  { name: "Gallery", href: "#personal-gallery", icon: Camera },
  { name: "Family", href: "#personal-family", icon: Users },
  { name: "FAQ", href: "#personal-faq", icon: HelpCircle },
  { name: "Connect", href: "#personal-contact", icon: MessageCircle },
];

export default function PersonalNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal-home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b"
      style={{
        background: scrolled ? "rgba(6,12,30,0.88)" : "rgba(6,12,30,0)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderColor: scrolled ? "rgba(168,85,247,0.15)" : "transparent",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("#personal-home")}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
              animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0.4)", "0 0 15px rgba(168,85,247,0.5)", "0 0 0px rgba(168,85,247,0.4)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-white" />
            </motion.div>
            <motion.span
              className="text-lg font-black"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Akarsh
            </motion.span>
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-1 left-8 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
              initial={{ width: 0 }}
              whileHover={{ width: "60px" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Desktop nav — Dock effect */}
          <div className="hidden md:flex items-center gap-1 dock-container">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className="dock-item relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium group transition-colors duration-200"
                  style={{ color: isActive ? "#a855f7" : "rgba(148,163,184,1)" }}
                  whileHover={{ color: "#a855f7", scale: 1.1 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.2, duration: 0.4 }}
                >
                  {/* Active pill */}
                  {isActive && (
                    <motion.span
                      layoutId="personal-nav-active"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Hover glow */}
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(168,85,247,0.06)" }} />
                  <item.icon className="w-3.5 h-3.5 relative" />
                  <span className="relative">{item.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile burger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ background: "rgba(168,85,247,0.08)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-5 h-5" style={{ color: "#a855f7" }} /> : <Menu className="w-5 h-5 text-slate-300" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 border-b"
            style={{ background: "rgba(6,12,30,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(168,85,247,0.15)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollTo(item.href)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.02)",
                      color: isActive ? "#a855f7" : "rgb(148,163,184)",
                      border: `1px solid ${isActive ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.05)"}`,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ x: 4, color: "#a855f7" }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}