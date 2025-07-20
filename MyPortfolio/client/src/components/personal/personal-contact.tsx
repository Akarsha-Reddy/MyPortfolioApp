import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageCircle, Send, Heart, Mail, MapPin, Coffee, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function PersonalContact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { name: "Email", icon: Mail, href: "mailto:akarsh@example.com", color: "from-red-500 to-rose-600" },
    { name: "GitHub", icon: Github, href: "https://github.com/akarsh", color: "from-gray-500 to-gray-700" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/akarsh", color: "from-blue-500 to-blue-700" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/akarsh", color: "from-sky-500 to-blue-600" },
  ];

  const contactReasons = [
    {
      icon: Coffee,
      title: "Coffee Chat",
      description: "Want to discuss tech, life, or just chat over virtual coffee?",
      emoji: "☕",
    },
    {
      icon: Heart,
      title: "Collaboration",
      description: "Have an interesting project or idea you'd like to explore together?",
      emoji: "🤝",
    },
    {
      icon: MessageCircle,
      title: "Just Saying Hi",
      description: "Sometimes the best conversations start with a simple hello!",
      emoji: "👋",
    },
  ];

  return (
    <section id="personal-contact" className="py-20 relative">
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
              <MessageCircle className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">Let's Connect</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I believe the best relationships start with authentic conversations. 
              Whether you want to chat about tech, share a story, or just say hello - I'd love to hear from you!
            </p>
          </motion.div>

          {/* Contact Reasons */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {contactReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="text-center p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{reason.emoji}</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form and Info */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              className="space-y-6"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Send Me a Message</h3>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible. 
                  Don't worry about being formal - just be yourself!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-violet-500/20 focus:border-violet-500/50"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-violet-500/20 focus:border-violet-500/50"
                    />
                  </div>
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder="Subject (What's this about?)"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-slate-800/50 border-violet-500/20 focus:border-violet-500/50"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your message... Feel free to share whatever's on your mind!"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-slate-800/50 border-violet-500/20 focus:border-violet-500/50 resize-none"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-3"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center gap-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </motion.div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Other Ways to Reach Me</h3>
                <p className="text-muted-foreground">
                  Choose whichever method feels most comfortable for you. 
                  I'm pretty responsive across all platforms!
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground group-hover:text-violet-400 transition-colors">
                        {link.name}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Info */}
              <div className="space-y-4 p-6 rounded-xl bg-slate-800/20 border border-violet-500/20">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  Quick Info
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📍 Based in India</p>
                  <p>⏰ Usually respond within 24 hours</p>
                  <p>☕ Best reached in the morning with coffee</p>
                  <p>🌟 Always open to interesting conversations</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Closing Note */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-slate-800/20 rounded-2xl border border-violet-500/20"
          >
            <Heart className="w-12 h-12 text-violet-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Looking Forward to Hearing From You</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every message I receive is a gift - a chance to connect with someone new, 
              learn something different, or simply share in the human experience. 
              Don't hesitate to reach out, no matter what's on your mind.
            </p>
            <motion.div
              className="mt-6 text-violet-400 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              "The best conversations are yet to happen." ✨
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}