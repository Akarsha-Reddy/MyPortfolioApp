import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "@/components/ui/magnetic-button";

const CONTACT_INFO = [
  { icon: "✉️", label: "Email", value: "akarshreddy.c@gmail.com", href: "mailto:akarshreddy.c@gmail.com", color: "#0ea5e9" },
  { icon: "📱", label: "Phone", value: "+91 77801 40251", href: "tel:+917780140251", color: "#10b981" },
  { icon: "💼", label: "LinkedIn", value: "akarsh-reddy-chiripireddy", href: "https://linkedin.com/in/akarsh-reddy-chiripireddy-48a125195", color: "#a855f7" },
  { icon: "📍", label: "Location", value: "Bangalore, Karnataka, India", href: null, color: "#f59e0b" },
];

function FloatingInput({
  label, type = "text", value, onChange, placeholder, required, isTextarea,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; isTextarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          required={required}
          rows={4}
          className="w-full px-4 pt-6 pb-3 rounded-xl text-sm text-white resize-none transition-all duration-300 outline-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${focused ? "#0ea5e9" : "rgba(255,255,255,0.09)"}`,
            boxShadow: focused ? "0 0 0 1px #0ea5e9, 0 0 20px rgba(14,165,233,0.2)" : "none",
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          required={required}
          className="w-full px-4 pt-6 pb-2 h-14 rounded-xl text-sm text-white transition-all duration-300 outline-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${focused ? "#0ea5e9" : "rgba(255,255,255,0.09)"}`,
            boxShadow: focused ? "0 0 0 1px #0ea5e9, 0 0 20px rgba(14,165,233,0.2)" : "none",
          }}
        />
      )}
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none font-medium"
        style={{
          color: focused ? "#0ea5e9" : "rgb(100,116,139)",
          top: focused || filled ? "0.4rem" : isTextarea ? "1rem" : "50%",
          transform: focused || filled ? "none" : isTextarea ? "none" : "translateY(-50%)",
          fontSize: focused || filled ? "0.65rem" : "0.85rem",
          letterSpacing: focused || filled ? "0.08em" : "0",
          textTransform: focused || filled ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    toast({ title: "Message sent! 🚀", description: "I'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(168,85,247,0.04) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#a855f7", borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Let's{" "}
            <span style={{ background: "linear-gradient(135deg, #a855f7, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Connect
            </span>
          </h2>
          <motion.p
            className="text-slate-400 text-lg mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Ready to discuss your next DevOps challenge? Let's build something extraordinary.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Open to work badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border mb-8"
              style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.3)" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(16,185,129,0.3)", "0 0 0 8px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-400">Open to opportunities</span>
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Available for <span style={{ color: "#a855f7" }}>Senior DevOps</span> roles
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              5+ years of enterprise DevOps experience. Looking for roles where infrastructure automation, cloud architecture, and developer experience matter.
            </p>

            {/* Contact cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.09, duration: 0.5 }}
                >
                  {info.href ? (
                    <motion.a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border group"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                      whileHover={{ borderColor: info.color + "50", scale: 1.01, background: info.color + "08" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: info.color + "18", border: `1px solid ${info.color}30` }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">{info.label}</p>
                        <p className="text-sm text-white font-semibold group-hover:text-opacity-90"
                          style={{ color: "white" }}
                        >{info.value}</p>
                      </div>
                      <motion.span
                        className="ml-auto text-slate-600 group-hover:text-slate-400"
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  ) : (
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl border"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: info.color + "18", border: `1px solid ${info.color}30` }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">{info.label}</p>
                        <p className="text-sm text-white font-semibold">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative p-8 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(168,85,247,0.08), transparent 70%)" }}
              />

              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <FloatingInput label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                </div>

                <FloatingInput label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} required />

                <FloatingInput label="Your Message..." value={form.message} onChange={(v) => setForm({ ...form, message: v })} isTextarea required />

                {/* Magnetic submit button */}
                <MagneticButton type="submit" strength={0.3} className="w-full">
                  <motion.div
                    className="relative w-full py-4 rounded-xl font-bold text-sm overflow-hidden text-white"
                    style={{ background: sending ? "rgba(168,85,247,0.3)" : "linear-gradient(135deg, #a855f7, #0ea5e9)" }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
                      animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <AnimatePresence mode="wait">
                        {sent ? (
                          <motion.span key="sent" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                            ✅ Sent!
                          </motion.span>
                        ) : sending ? (
                          <motion.span key="sending" className="flex items-center gap-2">
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>⚙️</motion.span>
                            Launching...
                          </motion.span>
                        ) : (
                          <motion.span key="default" className="flex items-center gap-2">
                            🚀 Send Message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.div>
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
