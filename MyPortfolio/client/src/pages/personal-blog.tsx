import { motion } from "framer-motion";
import PersonalNavigation from "@/components/personal/personal-navigation";
import PersonalHero from "@/components/personal/personal-hero";
import PersonalAbout from "@/components/personal/personal-about";
import PersonalBlog from "@/components/personal/personal-blog-section";
import PersonalHobbies from "@/components/personal/personal-hobbies";
import PersonalGallery from "@/components/personal/personal-gallery";
import PersonalContact from "@/components/personal/personal-contact";
import PersonalFAQ from "@/components/personal/personal-faq";
import PersonalFamily from "@/components/personal/personal-family";
import PersonalFloatingElements from "@/components/personal/personal-floating-elements";

export default function PersonalBlogPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Custom gradient background for personal blog */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-pink-900/20 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent -z-10" />
      
      <PersonalNavigation />
      <PersonalFloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10">
        <PersonalHero />
        <PersonalAbout />
        <PersonalBlog />
        <PersonalHobbies />
        <PersonalGallery />
        <PersonalFamily />
        <PersonalFAQ />
        <PersonalContact />
      </div>
      
      {/* Back to top button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.a 
          href="#personal-home" 
          className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          animate={{ 
            boxShadow: [
              "0 4px 14px 0 rgba(139, 92, 246, 0.3)",
              "0 4px 20px 0 rgba(139, 92, 246, 0.5)",
              "0 4px 14px 0 rgba(139, 92, 246, 0.3)"
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
        className="bg-slate-900/80 backdrop-blur-sm py-8 relative overflow-hidden border-t border-violet-500/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              Akarsh Reddy Chiripireddy
            </motion.div>
            <p className="text-muted-foreground max-w-2xl">
              Thank you for taking the time to explore my personal world. 
              Life is about the stories we tell and the connections we make.
            </p>
            <div className="flex gap-4 mt-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white text-sm">♥</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}