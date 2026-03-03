import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Mail, MapPin, Coffee, Heart, MessageCircle, Github, Linkedin } from "lucide-react";

const SOCIAL_LINKS = [
  { name: "Email", icon: Mail, href: "mailto:akarshreddy.c@gmail.com", color: "#ef4444", label: "akarshreddy.c@gmail.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/akarsh-reddy-chiripireddy-48a125195", color: "#0aa0d5", label: "akarsh-reddy-chiripireddy" },
  { name: "GitHub", icon: Github, href: "https://github.com/akarsh", color: "#6e7681", label: "github.com/akarsh" },
];

const CONTACT_REASONS = [
  { emoji: "☕", title: "Coffee Chat", description: "Want to discuss tech, life, or just chat over virtual coffee?", color: "#f59e0b" },
  { emoji: "🤝", title: "Collaboration", description: "Have an interesting project or idea you'd like to explore together?", color: "#a855f7" },
  { emoji: "👋", title: "Just Saying Hi", description: "Sometimes the best conversations start with a simple hello!", color: "#10b981" },
];

function FloatingInput({ label, type = "text", value, onChange, required, isTextarea }: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  required?: boolean; isTextarea?: boolean;
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
          placeholder=" " required={required} rows={4}
          className="w-full px-4 pt-6 pb-3 rounded-xl text-sm text-white resize-none transition-all duration-300 outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${focused ? "#a855f7" : "rgba(255,255,255,0.09)"}`, boxShadow: focused ? "0 0 0 1px #a855f7, 0 0 20px rgba(168,85,247,0.2)" : "none" }}
        />
      ) : (
        <input
          type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" " required={required}
          className="w-full px-4 pt-6 pb-2 h-14 rounded-xl text-sm text-white transition-all duration-300 outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${focused ? "#a855f7" : "rgba(255,255,255,0.09)"}`, boxShadow: focused ? "0 0 0 1px #a855f7, 0 0 20px rgba(168,85,247,0.2)" : "none" }}
        />
      )}
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none font-medium"
        style={{
          color: focused ? "#a855f7" : "rgb(100,116,139)",
          top: focused || filled ? "0.4rem" : isTextarea ? "1rem" : "50%",
          transform: focused || filled ? "none" : isTextarea ? "none" : "translateY(-50%)",
          fontSize: focused || filled ? "0.65rem" : "0.85rem",
          letterSpacing: focused || filled ? "0.08em" : "0",
          textTransform: (focused || filled) ? "uppercase" as const : "none" as const,
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function PersonalContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false); setSent(true);
    toast({ title: "Message sent! 💜", description: "I'll get back to you soon!" });
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="personal-contact"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(168,85,247,0.05) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
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
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#a855f7", borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)" }}
          >
            Say Hello
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Let's{" "}
            <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Connect
            </span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
            Whether you want to chat about tech, share a story, or just say hello — I'd love to hear from you!
          </p>
        </motion.div>

        {/* Why connect cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTACT_REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              className="text-center p-6 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, borderColor: r.color + "44", background: r.color + "07" }}
            >
              <div className="text-4xl mb-3">{r.emoji}</div>
              <h3 className="text-sm font-bold text-white mb-2">{r.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — social + info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Availability badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border mb-6"
              style={{ background: "rgba(168,85,247,0.08)", borderColor: "rgba(168,85,247,0.3)" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(168,85,247,0.3)", "0 0 0 8px rgba(168,85,247,0)", "0 0 0 0 rgba(168,85,247,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
              </span>
              <span className="text-sm font-semibold" style={{ color: "#a855f7" }}>Open to conversations</span>
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-2">
              Love to hear from <span style={{ color: "#a855f7" }}>interesting humans</span>
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              I'm pretty responsive across all platforms and always open to interesting conversations about tech, life, creativity, or anything in between!
            </p>

            <div className="space-y-3">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border group"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  whileHover={{ borderColor: link.color + "50", scale: 1.01, background: link.color + "08" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: link.color + "18", border: `1px solid ${link.color}30` }}>
                    <link.icon className="w-5 h-5" style={{ color: link.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">{link.name}</p>
                    <p className="text-sm text-white font-semibold truncate">{link.label}</p>
                  </div>
                  <motion.span className="text-slate-600 group-hover:text-slate-400" whileHover={{ x: 3 }}>→</motion.span>
                </motion.a>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl border text-xs text-slate-500 space-y-1.5" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <p>📍 Based in Bangalore, India</p>
              <p>⏰ Usually respond within 24 hours</p>
              <p>☕ Best reached in the morning after coffee</p>
              <p>🌟 Always open to interesting conversations</p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="p-8 rounded-2xl border relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(168,85,247,0.08), transparent 70%)" }} />

              <h3 className="text-xl font-bold text-white mb-6">Send a Message 💬</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <FloatingInput label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                </div>
                <FloatingInput label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} required />
                <FloatingInput label="Your Message..." value={form.message} onChange={(v) => setForm({ ...form, message: v })} isTextarea required />

                <MagneticButton type="submit" strength={0.3} className="w-full">
                  <motion.div
                    className="relative w-full py-4 rounded-xl font-bold text-sm overflow-hidden text-white"
                    style={{ background: sending ? "rgba(168,85,247,0.3)" : "linear-gradient(135deg, #a855f7, #ec4899)" }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
                      animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <AnimatePresence mode="wait">
                        {sent ? (
                          <motion.span key="sent" initial={{ scale: 0 }} animate={{ scale: 1 }}>✅ Sent! Talk soon!</motion.span>
                        ) : sending ? (
                          <motion.span key="sending" className="flex items-center gap-2">
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>💜</motion.span>
                            Sending...
                          </motion.span>
                        ) : (
                          <motion.span key="default">💌 Send Message</motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.div>
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Closing quote */}
        <motion.div
          className="text-center mt-20 py-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-2xl font-light text-slate-400 italic max-w-2xl mx-auto">
            "The best conversations are <span style={{ color: "#a855f7" }}>yet to happen.</span>" ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}