import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();
  const [ref, inView] = useScrollAnimation(0.2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: "✉️",
      label: "Email",
      value: "akarshreddy.c@gmail.com",
      href: "mailto:akarshreddy.c@gmail.com",
      color: "primary"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91-7780140251",
      href: "tel:+917780140251",
      color: "secondary"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: "https://linkedin.com/in/akarsh-reddy-chiripireddy-48a125195",
      color: "accent"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Bangalore, Karnataka, India",
      href: null,
      color: "violet"
    }
  ];

  return (
    <section ref={ref} id="contact" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg">Ready to discuss your next DevOps challenge?</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-12 h-12 bg-${info.color}/20 rounded-full flex items-center justify-center mr-4 text-xl`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`text-white hover:text-${info.color} transition-colors`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-8">
              <p className="text-slate-400 text-sm mb-4">Follow me on</p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.316 11.19l-.774-.774a.532.532 0 00-.53-.095L8.887 11.16c-.268.073-.65.2-.764.44-.113.24-.026.52.188.734.214.214.494.3.734.188.24-.113.367-.495.44-.764l.84-3.124a.532.532 0 00-.095-.53l-.774-.774 1.86-1.86c.293-.293.293-.768 0-1.061L9.552 2.845a.532.532 0 00-.752 0L7.136 4.508 5.472 2.845a.532.532 0 00-.752 0L3.056 4.508a.532.532 0 000 .752L4.72 6.924 2.056 9.588a.532.532 0 000 .752l1.664 1.664a.532.532 0 00.752 0L6.136 10.34l1.664 1.664a.532.532 0 00.752 0l1.664-1.664 1.86 1.86c.293.293.768.293 1.061 0l.774-.774.774.774c.293.293.768.293 1.061 0l1.86-1.86a.532.532 0 000-.752z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-slate-800 border-slate-600 focus:border-primary"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-800 border-slate-600 focus:border-primary"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 focus:border-primary">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="devops-consultation">DevOps Consultation</SelectItem>
                        <SelectItem value="job-opportunity">Job Opportunity</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                        <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-slate-800 border-slate-600 focus:border-primary min-h-[120px]"
                      placeholder="Tell me about your DevOps challenges..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 font-semibold"
                  >
                    Send Message
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
