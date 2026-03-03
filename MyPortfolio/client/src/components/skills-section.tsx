import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "cloud",
    label: "Cloud & Infra",
    icon: "☁️",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.3)",
    tools: [
      { name: "AWS (EC2, S3, VPC, Lambda)", level: 90, badge: "Certified" },
      { name: "IAM · ELB · Auto Scaling", level: 88 },
      { name: "CloudWatch · CloudTrail", level: 85 },
      { name: "Azure (Basics)", level: 60 },
      { name: "GCP (Basics)", level: 55 },
    ],
  },
  {
    id: "containers",
    label: "Containers",
    icon: "🐳",
    color: "#2496ED",
    glow: "rgba(36,150,237,0.3)",
    tools: [
      { name: "Kubernetes (K8s)", level: 92, badge: "Expert" },
      { name: "Docker", level: 95, badge: "Expert" },
      { name: "OpenShift", level: 78 },
      { name: "Amazon ECS / ECR", level: 82 },
      { name: "Helm Charts", level: 80 },
    ],
  },
  {
    id: "cicd",
    label: "CI/CD",
    icon: "🔄",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    tools: [
      { name: "Jenkins", level: 93, badge: "Expert" },
      { name: "GitLab CI", level: 88 },
      { name: "GitHub Actions", level: 85 },
      { name: "Maven · SonarQube", level: 80 },
      { name: "JFrog Artifactory", level: 76 },
    ],
  },
  {
    id: "iac",
    label: "IaC & Scripting",
    icon: "💻",
    color: "#7B42BC",
    glow: "rgba(123,66,188,0.3)",
    tools: [
      { name: "Terraform", level: 90, badge: "Expert" },
      { name: "Ansible", level: 85 },
      { name: "Shell / Bash Scripting", level: 92 },
      { name: "Python (Automation)", level: 70 },
      { name: "YAML / JSON / HCL", level: 95 },
    ],
  },
  {
    id: "monitoring",
    label: "Observability",
    icon: "📊",
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    tools: [
      { name: "Prometheus · Grafana", level: 88, badge: "Advanced" },
      { name: "ELK Stack", level: 82 },
      { name: "CloudWatch", level: 85 },
      { name: "AppDynamics", level: 75 },
      { name: "Datadog (Basics)", level: 60 },
    ],
  },
  {
    id: "vcs",
    label: "Source Control",
    icon: "🌿",
    color: "#F05032",
    glow: "rgba(240,80,50,0.3)",
    tools: [
      { name: "Git · GitHub", level: 95, badge: "Expert" },
      { name: "GitLab", level: 90 },
      { name: "Bitbucket", level: 85 },
      { name: "Branching Strategies (GitFlow)", level: 88 },
      { name: "Code Review Workflows", level: 85 },
    ],
  },
];

const TECH_CLOUD = [
  { name: "Kubernetes", color: "#326CE5" },
  { name: "Docker", color: "#2496ED" },
  { name: "Terraform", color: "#7B42BC" },
  { name: "AWS", color: "#FF9900" },
  { name: "Jenkins", color: "#D33833" },
  { name: "Grafana", color: "#F46800" },
  { name: "Ansible", color: "#EE0000" },
  { name: "GitLab", color: "#FC6D26" },
  { name: "GitHub", color: "#6e5494" },
  { name: "Linux", color: "#FCC624" },
  { name: "Prometheus", color: "#E6522C" },
  { name: "ELK", color: "#00BFB3" },
  { name: "SonarQube", color: "#4E9BCD" },
  { name: "Helm", color: "#0F1689" },
  { name: "Bash", color: "#4EAA25" },
  { name: "Python", color: "#3776AB" },
  { name: "Maven", color: "#C71A36" },
  { name: "JFrog", color: "#40BE46" },
];

/* ─── Animated proficiency bar ──────────────────────────────── */
function ProficiencyBar({
  name,
  level,
  badge,
  color,
  inView,
  delay,
}: {
  name: string;
  level: number;
  badge?: string;
  color: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300">{name}</span>
          {badge && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: color + "22", color: color, border: `1px solid ${color}44` }}
            >
              {badge}
            </span>
          )}
        </div>
        <motion.span
          className="text-xs font-bold tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {level}%
        </motion.span>
      </div>
      {/* Bar track */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("cloud");
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const cloudInView = useInView(cloudRef, { once: true, margin: "-60px" });

  const activeCategory = CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-28 relative overflow-hidden"
      style={{ background: "hsl(222,84%,4.9%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${activeCategory.glow}, transparent 70%)` }}
          animate={{ opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 4, repeat: Infinity }}
          key={activeTab}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ─── Header ─── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#0ea5e9", borderColor: "rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.08)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Tech Arsenal
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight text-white">
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DevOps
            </span>{" "}
            Arsenal
          </h2>
          <motion.p
            className="text-slate-400 text-lg mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Battle-tested tools that power enterprise-grade infrastructure — from containers to clouds.
          </motion.p>
        </motion.div>

        {/* ─── Tab bar ─── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              style={{
                color: activeTab === cat.id ? cat.color : "rgb(148,163,184)",
                background: activeTab === cat.id ? cat.color + "15" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeTab === cat.id ? cat.color + "50" : "rgba(255,255,255,0.07)"}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {activeTab === cat.id && (
                <motion.span
                  layoutId="tab-active-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: cat.color + "10", border: `1px solid ${cat.color}40` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{cat.icon}</span>
              <span className="relative">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ─── Main panel ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid lg:grid-cols-2 gap-6 mb-16"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left: proficiency bars */}
            <div
              className="p-7 rounded-2xl border"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: activeCategory.color + "30",
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: activeCategory.color + "20", border: `1px solid ${activeCategory.color}40` }}
                >
                  {activeCategory.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeCategory.label}</h3>
                  <p className="text-xs text-slate-500">{activeCategory.tools.length} technologies</p>
                </div>
                {/* Expertise circle */}
                <div className="ml-auto relative w-14 h-14">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <motion.circle
                      cx="18" cy="18" r="15"
                      fill="none"
                      stroke={activeCategory.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="94.25"
                      initial={{ strokeDashoffset: 94.25 }}
                      animate={{ strokeDashoffset: 94.25 * (1 - 0.87) }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color: activeCategory.color }}>87%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {activeCategory.tools.map((tool, i) => (
                  <ProficiencyBar
                    key={tool.name}
                    {...tool}
                    color={activeCategory.color}
                    inView={true}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </div>

            {/* Right: visual cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Big feature card */}
              <motion.div
                className="col-span-2 p-5 rounded-2xl border relative overflow-hidden group"
                style={{
                  background: activeCategory.color + "0A",
                  borderColor: activeCategory.color + "30",
                }}
                whileHover={{ scale: 1.01, borderColor: activeCategory.color + "60" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${activeCategory.color}12, transparent 70%)` }}
                />
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{activeCategory.icon}</span>
                  <div>
                    <p className="text-white font-bold">{activeCategory.label} Expertise</p>
                    <p className="text-xs text-slate-500">Enterprise-level experience</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.tools.map((t) => (
                    <motion.span
                      key={t.name}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ background: activeCategory.color + "18", color: activeCategory.color }}
                      whileHover={{ scale: 1.08, background: activeCategory.color + "30" }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {t.name.split(" (")[0].split(" ·")[0].split(" ·")[0]}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Mini stat cards */}
              {[
                { label: "Years Used", value: "5+", icon: "📅" },
                { label: "Projects", value: "20+", icon: "🚀" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  className="p-5 rounded-2xl border text-center"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                  whileHover={{ scale: 1.04, borderColor: activeCategory.color + "44" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-2xl mb-1">{card.icon}</div>
                  <div className="text-2xl font-black text-white">{card.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
                </motion.div>
              ))}

              {/* Certifications mini card */}
              {activeTab === "cloud" && (
                <motion.div
                  className="col-span-2 p-4 rounded-2xl border flex items-center gap-3"
                  style={{
                    background: "rgba(255,165,0,0.06)",
                    borderColor: "rgba(255,165,0,0.25)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-2xl">🏅</span>
                  <div>
                    <p className="text-sm font-semibold text-white">AWS Certified Solutions Architect</p>
                    <p className="text-xs text-slate-500">Associate Level · Active Certification</p>
                  </div>
                  <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#ffa50022", color: "#ffa500" }}>
                    Certified
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── Tech Cloud (all tools grid) ─── */}
        <motion.div
          ref={cloudRef}
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={cloudInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500">Full Tech Stack</span>
          </div>
          {/* Glowing pill cloud */}
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_CLOUD.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="px-4 py-2 rounded-xl text-sm font-semibold cursor-default border transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: tech.color + "0F",
                  borderColor: tech.color + "30",
                  color: tech.color,
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={cloudInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: i * 0.04,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.12,
                  background: tech.color + "25",
                  borderColor: tech.color + "70",
                  boxShadow: `0 0 16px ${tech.color}40`,
                }}
              >
                {/* Shimmer on hover */}
                <motion.span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700"
                />
                <span className="relative">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
