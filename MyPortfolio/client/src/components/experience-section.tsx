import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import boschLogo from "@assets/Bosch_1752968584869.jpg";
import publicisLogo from "@assets/PublicisSapient_1752968584870.jpg";
import dxcLogo from "@assets/DXCTechnology_1752968584870.jpg";

/* ─── Experience Data ─── */
const EXPERIENCES = [
  {
    id: 0,
    company: "Bosch Digital",
    role: "Senior DevOps Engineer",
    period: "Jan 2023 – Present",
    duration: "2+ yrs",
    logo: boschLogo,
    color: "#0ea5e9",
    type: "Full-Time",
    location: "Bangalore, India",
    description:
      "Leading DevOps transformation for enterprise digital products. Architecting cloud-native infrastructure on AWS, orchestrating multi-region Kubernetes clusters, and driving zero-downtime deployment culture across multiple product teams.",
    highlights: [
      "Reduced deployment time by 70% via optimized CI/CD pipelines",
      "Managed 50+ microservices across multi-region K8s clusters",
      "Implemented GitOps with ArgoCD — 99.9% deployment success rate",
      "Mentored 5 junior engineers in DevOps best practices",
    ],
    tags: ["Kubernetes", "AWS", "Terraform", "Jenkins", "ArgoCD", "Grafana"],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Deploy Speed", value: "↑ 70%" },
      { label: "Services", value: "50+" },
    ],
  },
  {
    id: 1,
    company: "Bosch Global Software Technologies",
    role: "Senior Engineer",
    period: "Aug 2022 – Dec 2022",
    duration: "5 mos",
    logo: boschLogo,
    color: "#10b981",
    type: "Full-Time",
    location: "Bangalore, India",
    description:
      "Transitional role bridging BGST and Bosch Digital. Focused on advanced DevOps practices, standardising pipeline templates across teams, and onboarding new engineers into the DevOps culture.",
    highlights: [
      "Standardised Jenkins shared libraries across 3 product lines",
      "Led knowledge-transfer sessions for 10+ engineers",
      "Architected Docker-based local dev environments",
    ],
    tags: ["Jenkins", "Docker", "Shell", "Git", "SonarQube"],
    metrics: [
      { label: "Teams Onboarded", value: "3" },
      { label: "Engineers", value: "10+" },
      { label: "Pipelines", value: "15+" },
    ],
  },
  {
    id: 2,
    company: "Publicis Sapient",
    role: "Associate L2",
    period: "July 2021 – Aug 2022",
    duration: "1+ yr",
    logo: publicisLogo,
    color: "#f59e0b",
    type: "Full-Time",
    location: "Remote / Bangalore",
    description:
      "Worked on flagship client projects: Cargill's Ocean Transport platform and We Trade global trade network. Implemented end-to-end CI/CD and AWS cloud infrastructure to serve millions of transactions.",
    highlights: [
      "Built CI/CD for Cargill's $2B ocean freight platform",
      "Designed AWS infrastructure with IaC (Terraform)",
      "Integrated ELK stack for real-time monitoring & alerting",
      "Automated 80% of manual release processes",
    ],
    tags: ["AWS", "Terraform", "GitLab CI", "ELK", "Ansible"],
    metrics: [
      { label: "Release Automation", value: "80%" },
      { label: "AWS Services", value: "12+" },
      { label: "Incidents Reduced", value: "↓ 60%" },
    ],
  },
  {
    id: 3,
    company: "DXC Technology",
    role: "DevOps Engineer",
    period: "Nov 2019 – July 2021",
    duration: "1.5 yrs",
    logo: dxcLogo,
    color: "#a855f7",
    type: "Full-Time",
    location: "Bangalore, India",
    description:
      "Worked on Lloyd's of London Market insurance platform. Built robust CI/CD pipelines, managed AWS infrastructure at scale, and implemented comprehensive monitoring solutions for business-critical systems.",
    highlights: [
      "Delivered CI/CD pipeline serving Lloyd's of London Market",
      "Managed AWS EC2, S3, VPC, IAM for 20+ environments",
      "Set up Grafana + CloudWatch dashboards for real-time ops",
      "Reduced MTTR from 4 hours to 30 minutes",
    ],
    tags: ["Jenkins", "AWS", "Docker", "CloudWatch", "Bitbucket"],
    metrics: [
      { label: "MTTR", value: "↓ 87%" },
      { label: "Environments", value: "20+" },
      { label: "Uptime", value: "99.5%" },
    ],
  },
  {
    id: 4,
    company: "DXC Technology",
    role: "Quality Engineer",
    period: "Nov 2018 – Oct 2019",
    duration: "1 yr",
    logo: dxcLogo,
    color: "#f97316",
    type: "Full-Time",
    location: "Bangalore, India",
    description:
      "Started my tech career in automation testing for TAFE Australia's Student Management Service. Built Selenium automation frameworks from scratch, laying the foundation that led me toward the DevOps path.",
    highlights: [
      "Built Selenium + TestNG framework from ground up",
      "Automated 300+ test cases — cut manual testing by 60%",
      "Integrated automation into Jenkins CI pipeline",
      "Sparked passion for DevOps and infrastructure automation",
    ],
    tags: ["Selenium", "TestNG", "Jenkins", "Java", "Postman"],
    metrics: [
      { label: "Test Cases", value: "300+" },
      { label: "Manual Work Cut", value: "60%" },
      { label: "Pass Rate", value: "98%" },
    ],
  },
];

/* ─── Card Component ─── */
function ExperienceCard({
  exp,
  index,
  isActive,
  onClick,
  side,
  inView,
}: {
  exp: typeof EXPERIENCES[number];
  index: number;
  isActive: boolean;
  onClick: () => void;
  side: "left" | "right";
  inView: boolean;
}) {
  return (
    <motion.div
      className={`w-full lg:w-5/12 cursor-pointer ${side === "left" ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}
      initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div
        className="relative rounded-2xl border overflow-hidden transition-all duration-300"
        style={{
          background: isActive ? `${exp.color}0E` : "rgba(255,255,255,0.02)",
          borderColor: isActive ? exp.color + "55" : "rgba(255,255,255,0.07)",
          boxShadow: isActive ? `0 0 40px ${exp.color}18` : "none",
        }}
        layout
      >
        {/* top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: exp.color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
        />

        {/* hover / active background glow */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isActive ? 1 : 0,
            background: `radial-gradient(ellipse at 20% 30%, ${exp.color}10, transparent 70%)`,
          }}
        />

        <div className="relative p-6">
          {/* Header row */}
          <div className="flex items-start gap-4 mb-4">
            {/* Logo */}
            <motion.div
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 flex-shrink-0"
              style={{ boxShadow: `0 0 0 2px ${exp.color}33` }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="text-base font-bold text-white leading-tight">{exp.company}</h3>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: exp.color + "20", color: exp.color, border: `1px solid ${exp.color}40` }}
                >
                  {exp.type}
                </span>
              </div>
              <p className="text-sm font-semibold" style={{ color: exp.color }}>{exp.role}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span>📅 {exp.period}</span>
                <span>⏱ {exp.duration}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{exp.description}</p>

          {/* Metrics strip */}
          <div className="flex gap-4 mb-4 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
            {exp.metrics.map((m) => (
              <div key={m.label} className="text-center flex-1">
                <div className="text-base font-black text-white">{m.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Expandable highlights */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Key Highlights</p>
                  {exp.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <span className="mt-0.5 flex-shrink-0" style={{ color: exp.color }}>▸</span>
                      <span>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                style={{ background: exp.color + "15", color: exp.color, border: `1px solid ${exp.color}30` }}
                whileHover={{ scale: 1.08, background: exp.color + "28" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Expand hint */}
          <motion.div
            className="mt-3 text-xs flex items-center gap-1"
            style={{ color: exp.color + "99" }}
          >
            <motion.span
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▸
            </motion.span>
            <span>{isActive ? "Click to collapse" : "Click to expand highlights"}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<number | null>(0);

  const totalYears = 5;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(16,185,129,0.04) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-10 w-80 h-80 rounded-full blur-3xl opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full blur-3xl opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 11, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#10b981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Career Journey
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight text-white mb-4">
            Career{" "}
            <span style={{ background: "linear-gradient(135deg, #10b981, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Evolution
            </span>
          </h2>
          <motion.p
            className="text-slate-400 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            From Quality Engineer to Senior DevOps — 5+ years of building, breaking, and scaling enterprise infrastructure.
          </motion.p>

          {/* Career progression bar */}
          <motion.div
            className="mt-8 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>2018</span>
              <span className="font-semibold text-white">5+ Years of Growth</span>
              <span>Present</span>
            </div>
            <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #f97316, #a855f7, #f59e0b, #10b981, #0ea5e9)" }}
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ delay: 0.6, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {EXPERIENCES.slice().reverse().map((exp, i) => (
                <motion.div
                  key={exp.id}
                  className="w-2.5 h-2.5 rounded-full cursor-pointer"
                  style={{ background: exp.color }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.08, type: "spring" }}
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setActiveId(exp.id === activeId ? null : exp.id)}
                  title={`${exp.company} — ${exp.role}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Center gradient line — desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <motion.div
              className="w-full"
              style={{ background: "linear-gradient(to bottom, #0ea5e9, #10b981, #f59e0b, #a855f7, #f97316, transparent)" }}
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ delay: 0.5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Left line — mobile */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-px">
            <motion.div
              className="w-full"
              style={{ background: "linear-gradient(to bottom, #0ea5e9, #10b981, #f59e0b, #a855f7, #f97316, transparent)" }}
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ delay: 0.5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="space-y-10">
            {EXPERIENCES.map((exp, index) => {
              const side = index % 2 === 0 ? "left" : "right";
              const isActive = activeId === exp.id;

              return (
                <div key={exp.id} className="relative flex flex-col lg:flex-row items-start lg:items-center">

                  {/* Mobile: offset from left line */}
                  <div className="lg:hidden pl-10 w-full">
                    <ExperienceCard exp={exp} index={index} isActive={isActive} onClick={() => setActiveId(isActive ? null : exp.id)} side="left" inView={inView} />
                  </div>

                  {/* Desktop: alternating sides */}
                  <div className="hidden lg:flex w-full items-center">
                    {side === "left" ? (
                      <>
                        <ExperienceCard exp={exp} index={index} isActive={isActive} onClick={() => setActiveId(isActive ? null : exp.id)} side="left" inView={inView} />
                        {/* Center dot */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                          <motion.div
                            className="w-5 h-5 rounded-full border-4 flex-shrink-0"
                            style={{
                              background: isActive ? exp.color : exp.color + "44",
                              borderColor: "hsl(222,84%,4.9%)",
                              boxShadow: isActive ? `0 0 20px ${exp.color}` : "none",
                            }}
                            initial={{ scale: 0 }}
                            animate={inView ? { scale: 1 } : {}}
                            transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 300 }}
                            whileHover={{ scale: 1.6 }}
                            onClick={() => setActiveId(isActive ? null : exp.id)}
                          />
                        </div>
                        {/* Year label right side */}
                        <motion.div
                          className="w-5/12 pl-12"
                          initial={{ opacity: 0, x: 30 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                        >
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: exp.color + "18", color: exp.color, border: `1px solid ${exp.color}40` }}
                          >
                            <span>📅</span>
                            <span>{exp.period}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 ml-1">📍 {exp.location}</p>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        {/* Year label left side */}
                        <motion.div
                          className="w-5/12 pr-12 text-right"
                          initial={{ opacity: 0, x: -30 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                        >
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: exp.color + "18", color: exp.color, border: `1px solid ${exp.color}40` }}
                          >
                            <span>📅</span>
                            <span>{exp.period}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 mr-1">📍 {exp.location}</p>
                        </motion.div>
                        {/* Center dot */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                          <motion.div
                            className="w-5 h-5 rounded-full border-4 flex-shrink-0"
                            style={{
                              background: isActive ? exp.color : exp.color + "44",
                              borderColor: "hsl(222,84%,4.9%)",
                              boxShadow: isActive ? `0 0 20px ${exp.color}` : "none",
                            }}
                            initial={{ scale: 0 }}
                            animate={inView ? { scale: 1 } : {}}
                            transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 300 }}
                            whileHover={{ scale: 1.6 }}
                            onClick={() => setActiveId(isActive ? null : exp.id)}
                          />
                        </div>
                        <ExperienceCard exp={exp} index={index} isActive={isActive} onClick={() => setActiveId(isActive ? null : exp.id)} side="right" inView={inView} />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Summary strip ── */}
        <motion.div
          className="mt-20 p-6 rounded-2xl border relative overflow-hidden"
          style={{ background: "rgba(16,185,129,0.04)", borderColor: "rgba(16,185,129,0.2)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shine line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #10b981, transparent)" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { emoji: "🏢", value: "3", label: "Companies" },
              { emoji: "⚡", value: "5+", label: "Years Experience" },
              { emoji: "🔄", value: "100+", label: "Pipelines Built" },
              { emoji: "🌍", value: "4", label: "Countries Served" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.3 + i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06 }}
                className="cursor-default"
              >
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
