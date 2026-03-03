import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
      for (const id of sections.reverse()) {
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

  const navItems = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Arsenal", id: "skills" },
    { href: "#experience", label: "Journey", id: "experience" },
    { href: "#projects", label: "War Stories", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
        ? "border-white/10 shadow-2xl"
        : "border-transparent"
        }`}
      style={{
        background: isScrolled
          ? "rgba(6, 12, 30, 0.85)"
          : "rgba(6, 12, 30, 0.0)",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl font-black relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Akarsh Reddy
            </span>
            {/* underline on hover */}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, #0ea5e9, #10b981)" }}
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Nav — Dock Effect */}
          <div className="hidden md:flex items-center space-x-1 dock-container">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="dock-item relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group"
                style={{
                  color: activeSection === item.id ? "#0ea5e9" : "rgba(148,163,184,1)",
                }}
                whileHover={{ color: "#0ea5e9", scale: 1.12 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
              >
                {/* Active indicator pill */}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Hover glow */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(14,165,233,0.06)" }} />
                <span className="relative">{item.label}</span>
              </motion.a>
            ))}

            {/* CTA button in nav */}
            <motion.a
              href="#contact"
              className="ml-4 px-5 py-2 rounded-full text-sm font-semibold text-white relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                boxShadow: "0 0 20px rgba(14,165,233,0.3)",
              }}
              whileHover={{ scale: 1.08, boxShadow: "0 0 35px rgba(14,165,233,0.55)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700" />
              <span className="relative">Hire Me</span>
            </motion.a>
          </div>


          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-slate-950 border-slate-800">
                <div className="flex flex-col gap-2 mt-10">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
