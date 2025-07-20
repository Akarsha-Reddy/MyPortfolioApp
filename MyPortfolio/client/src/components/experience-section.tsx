import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import boschDigitalLogo from "@assets/Bosch_1752968584869.jpg";
import boschLogo from "@assets/Bosch_1752968584869.jpg";
import publicisLogo from "@assets/PublicisSapient_1752968584870.jpg";
import dxcLogo from "@assets/DXCTechnology_1752968584870.jpg";

const experiences = [
  {
    company: "Bosch Digital",
    role: "Senior DevOps Engineer",
    period: "Jan 2023 - Present",
    description: "Leading DevOps initiatives for digital transformation projects. Implementing cutting-edge CI/CD pipelines and cloud infrastructure solutions.",
    logo: boschDigitalLogo,
    color: "primary",
    side: "left"
  },
  {
    company: "Bosch Global Software Technologies",
    role: "Senior Engineer",
    period: "Aug 2022 - Dec 2022",
    description: "Transitional role focusing on advanced DevOps practices and mentoring junior team members.",
    logo: boschLogo,
    color: "secondary",
    side: "right"
  },
  {
    company: "Publicis Sapient",
    role: "Associate L2",
    period: "July 2021 - Aug 2022",
    description: "Worked on Cargill's Ocean Transport and We Trade projects. Implemented automated CI/CD pipelines and AWS infrastructure.",
    logo: publicisLogo,
    color: "accent",
    side: "left"
  },
  {
    company: "DXC Technology",
    role: "DevOps Engineer",
    period: "Nov 2019 - July 2021",
    description: "Worked on Lloyd's of London Market project. Built CI/CD pipelines, managed AWS infrastructure, and implemented monitoring solutions.",
    logo: dxcLogo,
    color: "violet",
    side: "right"
  },
  {
    company: "DXC Technology",
    role: "Quality Engineer",
    period: "Nov 2018 - Oct 2019",
    description: "Started journey in automation testing for TAFE Australia's Student Management Service. Built Selenium automation frameworks.",
    logo: dxcLogo,
    color: "destructive",
    side: "left"
  }
];

export default function ExperienceSection() {
  const [ref, inView] = useScrollAnimation(0.1);

  return (
    <section ref={ref} id="experience" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Career <span className="text-primary">Evolution</span>
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The journey from Quality Engineer to Senior DevOps
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-secondary"
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="flex items-center relative"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + (index * 0.2), duration: 0.6 }}
              >
                {exp.side === "left" ? (
                  <>
                    <motion.div 
                      className="w-1/2 pr-8 text-right"
                      initial={{ opacity: 0, x: 50 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + (index * 0.2), duration: 0.6 }}
                    >
                      <motion.div 
                        className="bg-slate-900 p-6 rounded-2xl shadow-lg hover-lift"
                        whileHover={{ scale: 1.02, rotateY: -5 }}
                      >
                        <div className="flex items-center justify-end mb-4">
                          <motion.div 
                            className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-3 p-2"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <img 
                              src={exp.logo} 
                              alt={`${exp.company} logo`}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-semibold">{exp.company}</h3>
                            <p className="text-slate-400">{exp.role}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{exp.period}</p>
                        <p className="text-slate-400">{exp.description}</p>
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-${exp.color} rounded-full border-4 border-slate-800`}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 1.2 + (index * 0.2), type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.5 }}
                    />
                    <div className="w-1/2 pl-8"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8"></div>
                    <motion.div 
                      className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-${exp.color} rounded-full border-4 border-slate-800`}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 1.2 + (index * 0.2), type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.5 }}
                    />
                    <motion.div 
                      className="w-1/2 pl-8"
                      initial={{ opacity: 0, x: -50 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + (index * 0.2), duration: 0.6 }}
                    >
                      <motion.div 
                        className="bg-slate-900 p-6 rounded-2xl shadow-lg hover-lift"
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-3 p-2"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                          >
                            <img 
                              src={exp.logo} 
                              alt={`${exp.company} logo`}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-semibold">{exp.company}</h3>
                            <p className="text-slate-400">{exp.role}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{exp.period}</p>
                        <p className="text-slate-400">{exp.description}</p>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
