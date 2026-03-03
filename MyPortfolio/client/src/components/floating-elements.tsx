import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 6 + Math.random() * 10,
  delay: Math.random() * 4,
  amplitude: 15 + Math.random() * 30,
  opacity: 0.1 + Math.random() * 0.4,
  color: ["#0ea5e9", "#10b981", "#a855f7", "#f59e0b"][Math.floor(Math.random() * 4)],
}));

const SHAPES = [
  { w: 60, h: 60, top: "12%", left: "8%", delay: 0, dur: 18, type: "square" },
  { w: 50, h: 50, top: "22%", right: "10%", delay: 2, dur: 22, type: "triangle" },
  { w: 40, h: 40, top: "65%", left: "5%", delay: 1, dur: 15, type: "circle" },
  { w: 70, h: 70, top: "75%", right: "6%", delay: 3, dur: 20, type: "square" },
  { w: 30, h: 30, top: "45%", left: "3%", delay: 0.5, dur: 12, type: "triangle" },
  { w: 45, h: 45, top: "50%", right: "4%", delay: 1.5, dur: 17, type: "circle" },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ─── Particles ─── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -p.amplitude, 0, p.amplitude * 0.5, 0],
            x: [0, p.amplitude * 0.3, -p.amplitude * 0.2, 0],
            opacity: [0, p.opacity, p.opacity * 0.5, p.opacity, 0],
            scale: [0, 1, 0.8, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ─── Geometric Shapes ─── */}
      {SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: shape.w,
            height: shape.h,
            top: shape.top,
            left: (shape as any).left,
            right: (shape as any).right,
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: shape.dur, repeat: Infinity, ease: "linear" },
            y: { duration: shape.dur * 0.6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: shape.dur * 0.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: shape.dur * 0.8, repeat: Infinity, ease: "easeInOut" },
            delay: shape.delay,
          }}
        >
          {shape.type === "square" && (
            <div
              className="w-full h-full border border-primary/30 rotate-12"
              style={{ borderRadius: "4px" }}
            />
          )}
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full border border-secondary/30" />
          )}
          {shape.type === "triangle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
              <polygon
                points="50,5 95,90 5,90"
                fill="none"
                stroke="hsl(263, 70%, 50%)"
                strokeWidth="3"
              />
            </svg>
          )}
        </motion.div>
      ))}

      {/* ─── Horizontal scan line ─── */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.5) 50%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* ─── Corner accents ─── */}
      {[
        { top: "0", left: "0" },
        { top: "0", right: "0" },
        { bottom: "0", left: "0" },
        { bottom: "0", right: "0" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 opacity-20"
          style={pos as React.CSSProperties}
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1 }}
        >
          <div
            className="w-full h-full border-primary"
            style={{
              borderTopWidth: pos.top === "0" ? 2 : 0,
              borderBottomWidth: pos.bottom === "0" ? 2 : 0,
              borderLeftWidth: pos.left === "0" ? 2 : 0,
              borderRightWidth: pos.right === "0" ? 2 : 0,
              borderStyle: "solid",
              borderColor: "#0ea5e9",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
