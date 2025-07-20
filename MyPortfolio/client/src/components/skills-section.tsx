import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Cloud Platform",
    icon: "☁️",
    description: "AWS Certified Solutions Architect",
    skills: ["EC2, S3, VPC", "Lambda, CloudWatch", "IAM, ELB, Auto Scaling"],
    color: "primary"
  },
  {
    title: "Containerization",
    icon: "🐳",
    description: "Container Orchestration Expert",
    skills: ["Docker, Kubernetes", "OpenShift, ECS", "Container Registry"],
    color: "secondary"
  },
  {
    title: "CI/CD Pipeline",
    icon: "🔄",
    description: "Automation Architect",
    skills: ["Jenkins, GitLab CI", "Maven, SonarQube", "JFrog Artifactory"],
    color: "accent"
  },
  {
    title: "Infrastructure as Code",
    icon: "💻",
    description: "Infrastructure Automation",
    skills: ["Terraform, Ansible", "Shell Scripting", "Configuration Management"],
    color: "violet"
  },
  {
    title: "Monitoring",
    icon: "📊",
    description: "Observability Expert",
    skills: ["Grafana, Prometheus", "CloudWatch, AppDynamics", "ELK Stack"],
    color: "destructive"
  },
  {
    title: "Version Control",
    icon: "🌿",
    description: "Source Control Master",
    skills: ["Git, GitHub", "Bitbucket, GitLab", "Branching Strategies"],
    color: "primary"
  },
  {
    title: "Testing & QA",
    icon: "🐛",
    description: "Quality Assurance",
    skills: ["Selenium, Cypress", "Postman, TestNG", "Automation Testing"],
    color: "secondary"
  },
  {
    title: "Operating Systems",
    icon: "🐧",
    description: "System Administration",
    skills: ["Linux (RedHat, CentOS)", "Windows Server", "Shell Administration"],
    color: "accent"
  }
];

export default function SkillsSection() {
  const [ref, inView] = useScrollAnimation(0.1);

  return (
    <section ref={ref} id="skills" className="py-20">
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
            The <span className="text-primary">DevOps</span> Arsenal
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Tools that power the infrastructure magic
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <Card 
                className="bg-slate-800 border-slate-700 hover-lift transition-all duration-300 h-full"
              >
                <CardContent className="p-6">
                  <motion.div 
                    className="text-3xl mb-4"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: (index * 0.1) + 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: (index * 0.1) + 0.4 }}
                  >
                    {category.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-400 text-sm mb-4"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: (index * 0.1) + 0.5 }}
                  >
                    {category.description}
                  </motion.p>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: (index * 0.1) + 0.6 }}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex} 
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: (index * 0.1) + 0.7 + (skillIndex * 0.1) }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className={`w-2 h-2 bg-${category.color} rounded-full mr-2 flex-shrink-0`}
                          whileHover={{ scale: 1.5 }}
                        ></motion.div>
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
