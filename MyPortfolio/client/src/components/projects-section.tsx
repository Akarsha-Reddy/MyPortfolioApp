import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { TextReveal } from "@/components/ui/text-reveal";

/* ─── Data ─── */
const PROJECTS = [
  {
    title: "Ocean Transport & We Trade",
    company: "Publicis Sapient • Cargill",
    description: "Built automated CI/CD pipelines for a $2B global trading platform. Implemented Docker containerization, Kubernetes orchestration, and full AWS infrastructure via Terraform — serving millions of transactions daily.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=400",
    tags: ["Jenkins", "Docker", "AWS", "Terraform", "K8s", "ELK"],
    achievements: [
      { icon: "⚡", value: "70%", label: "Faster Deploys" },
      { icon: "🚀", value: "0", label: "Downtime" },
      { icon: "📊", value: "99.9%", label: "SLA Met" },
    ],
    color: "#0ea5e9",
    gradient: "from-cyan-500/20 to-blue-600/10",
  },
  {
    title: "London Markets Platform",
    company: "DXC Technology • Lloyd's of London",
    description: "Architected comprehensive monitoring and CI/CD solutions for London's flagship insurance market platform. Integrated SonarQube for code quality gates and Grafana dashboards for real-time performance visibility.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=400",
    tags: ["Jenkins", "Maven", "SonarQube", "Grafana", "AWS", "Bitbucket"],
    achievements: [
      { icon: "🛡️", value: "99.9%", label: "Uptime" },
      { icon: "✅", value: "+40%", label: "Code Quality" },
      { icon: "⏱️", value: "↓87%", label: "MTTR" },
    ],
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-600/10",
  },
  {
    title: "Student Management Service",
    company: "DXC Technology • TAFE Australia",
    description: "Built a Selenium automation framework from the ground up. Created 300+ regression test suites integrated into Jenkins CI — cutting manual QA effort by 60% and establishing the foundation for my DevOps journey.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=400",
    tags: ["Selenium", "Java", "TestNG", "Jenkins", "Postman"],
    achievements: [
      { icon: "🧪", value: "300+", label: "Test Cases" },
      { icon: "📈", value: "80%", label: "Automation" },
      { icon: "⏰", value: "↓60%", label: "QA Time" },
    ],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-teal-600/10",
  },
];

const TECH_MARQUEE = [
  "Kubernetes", "Docker", "Terraform", "AWS", "Jenkins",
  "Grafana", "Prometheus", "Ansible", "GitLab CI", "ArgoCD",
  "Helm", "ELK Stack", "SonarQube", "JFrog", "Linux",
  "Python", "Shell", "GitHub Actions", "CloudWatch", "OpenShift",
];

/* ─── 3D Tilt Card ─── */
function TiltCard({ project, index, inView }: { project: typeof PROJECTS[number]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const glowX = useMotionValue("50%");
  const glowY = useMotionValue("50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - y) * 14);
    rotateY.set((x - 0.5) * 14);
    glowX.set(`${x * 100}%`);
    glowY.set(`${y * 100}%`);
  };

  const handleMouseEnter = () => scale.set(1.02);
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      className="perspective-1000"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border overflow-hidden cursor-default group"
        whileHover={{ borderColor: project.color + "55" }}
        transition={{ duration: 0.3 }}
        initial={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {/* Spotlight glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${glowX.get()} ${glowY.get()}, ${project.color}18, transparent 50%)`,
          }}
        />

        {/* Animated top border */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 z-20"
          style={{ background: project.color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
        />

        {/* Image with gradient overlay */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 30%, ${project.color}22 70%, hsl(222,84%,4.9%) 100%)`,
            }}
          />
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Card content */}
        <div className="p-6 relative z-10" style={{ background: "rgba(6,10,30,0.95)" }}>
          {/* Company badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: project.color }} />
            <span className="text-xs text-slate-500 font-medium">{project.company}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">{project.description}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
            {project.achievements.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-sm font-black text-white">{m.icon} {m.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="glow-tag text-[11px] px-2.5 py-1 rounded-lg font-medium"
                style={{ background: project.color + "15", color: project.color, border: `1px solid ${project.color}30` }}
                whileHover={{ scale: 1.08 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,84%,4.9%) 0%, rgba(245,158,11,0.04) 50%, hsl(222,84%,4.9%) 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
          animate={{ x: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
          animate={{ x: [0, 30, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ color: "#f59e0b", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            War Stories
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight text-white">
            DevOps{" "}
            <span style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              War Stories
            </span>
          </h2>
          <motion.p
            className="text-slate-400 text-lg mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Real enterprise projects. Real infrastructure decisions. Real impact on millions of users.
          </motion.p>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PROJECTS.map((project, i) => (
            <TiltCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Infinite tech marquee */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-center text-slate-600 font-bold tracking-widest uppercase mb-5">
            Technologies in my weaponry
          </p>
          <div className="pause-on-hover space-y-3">
            <InfiniteMarquee direction="left" speed={45} gap={16} className="py-1">
              {TECH_MARQUEE.map((tech) => (
                <span
                  key={tech}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  {tech}
                </span>
              ))}
            </InfiniteMarquee>
            <InfiniteMarquee direction="right" speed={35} gap={16} className="py-1">
              {[...TECH_MARQUEE].reverse().map((tech) => (
                <span
                  key={tech}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 border"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
                >
                  {tech}
                </span>
              ))}
            </InfiniteMarquee>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
