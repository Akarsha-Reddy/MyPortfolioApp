import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import boschLogo from "@assets/Bosch_1752968584869.jpg";
import publicisLogo from "@assets/PublicisSapient_1752968584870.jpg";
import dxcLogo from "@assets/DXCTechnology_1752968584870.jpg";

const companies = [
  {
    name: "Bosch Digital",
    logo: boschLogo,
    period: "2022 - Present",
    role: "Senior DevOps Engineer"
  },
  {
    name: "Publicis Sapient",
    logo: publicisLogo,
    period: "2021 - 2022",
    role: "Associate L2"
  },
  {
    name: "DXC Technology",
    logo: dxcLogo,
    period: "2018 - 2021",
    role: "DevOps Engineer"
  }
];

export default function CompaniesSection() {
  const [ref, inView] = useScrollAnimation(0.2);

  return (
    <section ref={ref} className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-slate-400 text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Trusted by Industry Leaders
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover-lift"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-24 h-16 flex items-center justify-center">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: (index * 0.2) + 0.3 }}
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                  {company.name}
                </h3>
                <p className="text-slate-600 text-sm mb-1 group-hover:text-slate-700 transition-colors">
                  {company.role}
                </p>
                <p className="text-slate-500 text-xs group-hover:text-slate-600 transition-colors">
                  {company.period}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}