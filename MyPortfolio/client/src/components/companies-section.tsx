import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import boschLogo from "@assets/Bosch_1752968584869.jpg";
import publicisLogo from "@assets/PublicisSapient_1752968584870.jpg";
import dxcLogo from "@assets/DXCTechnology_1752968584870.jpg";

const COMPANIES = [
  { name: "Bosch Digital", logo: boschLogo, period: "2022 – Now", role: "Senior DevOps Engineer", color: "#0ea5e9" },
  { name: "Publicis Sapient", logo: publicisLogo, period: "2021 – 2022", role: "Associate L2", color: "#10b981" },
  { name: "DXC Technology", logo: dxcLogo, period: "2018 – 2021", role: "DevOps / QA Engineer", color: "#a855f7" },
];

const TECH_STRIP_1 = ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins", "Grafana", "Prometheus", "Ansible", "GitLab CI", "ArgoCD", "Helm", "ELK"];
const TECH_STRIP_2 = ["SonarQube", "JFrog", "Linux", "Python", "GitHub Actions", "CloudWatch", "OpenShift", "Bitbucket", "Maven", "Shell", "Selenium", "Vault"];

function LogoCard({ company }: { company: typeof COMPANIES[number] }) {
  return (
    <motion.div
      className="flex-shrink-0 flex items-center gap-4 px-5 py-3 rounded-2xl border group cursor-default"
      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
      whileHover={{ scale: 1.04, borderColor: company.color + "50", background: company.color + "0A" }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-12 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 flex-shrink-0"
        style={{ boxShadow: `0 0 0 1px ${company.color}33` }}
      >
        <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-tight">{company.name}</p>
        <p className="text-xs font-medium" style={{ color: company.color }}>{company.role}</p>
        <p className="text-xs text-slate-600">{company.period}</p>
      </div>
    </motion.div>
  );
}

export default function CompaniesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
      style={{ background: "hsl(222,84%,5.5%)" }}
    >
      {/* Divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="text-center text-xs font-bold tracking-[0.3em] uppercase text-slate-600 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Companies I've built for
        </motion.p>

        {/* Company logos — first marquee */}
        <motion.div
          className="mb-8 pause-on-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <InfiniteMarquee direction="left" speed={35} gap={16} pauseOnHover>
            {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((co, i) => (
              <LogoCard key={`${co.name}-${i}`} company={co} />
            ))}
          </InfiniteMarquee>
        </motion.div>

        {/* Divider */}
        <div className="my-6 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }} />

        {/* Tech stack strips */}
        <motion.div
          className="space-y-3 pause-on-hover"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <InfiniteMarquee direction="left" speed={40} gap={12} pauseOnHover>
            {TECH_STRIP_1.map((tech) => (
              <span
                key={tech}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold border"
                style={{ color: "rgb(100,116,139)", background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                {tech}
              </span>
            ))}
          </InfiniteMarquee>
          <InfiniteMarquee direction="right" speed={32} gap={12} pauseOnHover>
            {TECH_STRIP_2.map((tech) => (
              <span
                key={tech}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold border"
                style={{ color: "rgb(71,85,105)", background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.04)" }}
              >
                {tech}
              </span>
            ))}
          </InfiniteMarquee>
        </motion.div>
      </div>
    </section>
  );
}