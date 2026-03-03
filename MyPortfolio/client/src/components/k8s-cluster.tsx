import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";

/* ─── Node definitions ─── */
interface Node {
    id: string;
    label: string;
    icon: string;
    color: string;
    glow: string;
    desc: string;
    /** Radial position on main ring: angle in degrees, radius */
    angle: number;
    radius: number;
    layer: number; // 0=center hub, 1=inner ring, 2=outer ring
}

const HUB: Node = {
    id: "k8s",
    label: "Kubernetes",
    icon: "⎈",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.55)",
    desc: "Container Orchestration Hub",
    angle: 0,
    radius: 0,
    layer: 0,
};

const INNER_NODES: Node[] = [
    { id: "docker", label: "Docker", icon: "🐳", color: "#2196f3", glow: "rgba(33,150,243,0.5)", desc: "Container Runtime", angle: 0, radius: 120, layer: 1 },
    { id: "jenkins", label: "Jenkins", icon: "🔧", color: "#e44d26", glow: "rgba(228,77,38,0.5)", desc: "CI/CD Automation", angle: 60, radius: 120, layer: 1 },
    { id: "aws", label: "AWS", icon: "☁️", color: "#ff9900", glow: "rgba(255,153,0,0.5)", desc: "Cloud Infrastructure", angle: 120, radius: 120, layer: 1 },
    { id: "git", label: "Git", icon: "⑂", color: "#f34f29", glow: "rgba(243,79,41,0.5)", desc: "Version Control", angle: 180, radius: 120, layer: 1 },
    { id: "terraform", label: "Terraform", icon: "🏗️", color: "#7b42bc", glow: "rgba(123,66,188,0.5)", desc: "Infrastructure as Code", angle: 240, radius: 120, layer: 1 },
    { id: "prometheus", label: "Prometheus", icon: "📊", color: "#e6522c", glow: "rgba(230,82,44,0.5)", desc: "Metrics & Monitoring", angle: 300, radius: 120, layer: 1 },
];

const OUTER_NODES: Node[] = [
    { id: "argocd", label: "ArgoCD", icon: "🐙", color: "#10b981", glow: "rgba(16,185,129,0.45)", desc: "GitOps Delivery", angle: 30, radius: 210, layer: 2 },
    { id: "helm", label: "Helm", icon: "⎈", color: "#0f1689", glow: "rgba(15,22,137,0.45)", desc: "Package Manager", angle: 90, radius: 210, layer: 2 },
    { id: "grafana", label: "Grafana", icon: "📈", color: "#f46800", glow: "rgba(244,104,0,0.45)", desc: "Observability Dashboard", angle: 150, radius: 210, layer: 2 },
    { id: "ansible", label: "Ansible", icon: "⚙️", color: "#ee0000", glow: "rgba(238,0,0,0.4)", desc: "Configuration Mgmt", angle: 210, radius: 210, layer: 2 },
    { id: "vault", label: "Vault", icon: "🔐", color: "#ffcf25", glow: "rgba(255,207,37,0.45)", desc: "Secrets Management", angle: 270, radius: 210, layer: 2 },
    { id: "openshift", label: "OpenShift", icon: "🔴", color: "#ee0000", glow: "rgba(238,0,0,0.4)", desc: "Enterprise K8s Platform", angle: 330, radius: 210, layer: 2 },
];

const ALL_NODES = [HUB, ...INNER_NODES, ...OUTER_NODES];

/* ─── Convert polar to Cartesian ─── */
function toXY(angleDeg: number, radius: number): [number, number] {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [radius * Math.cos(rad), radius * Math.sin(rad)];
}

/* ─── 3D projection from rotated sphere ─── */
function project3D(
    angleDeg: number,
    radius: number,
    rotX: number,
    rotY: number,
    viewDist = 600
): { x: number; y: number; scale: number; z: number } {
    const [x2d, y2d] = toXY(angleDeg, radius);
    const z2d = 0;

    // Rotate around Y axis
    const cosY = Math.cos((rotY * Math.PI) / 180);
    const sinY = Math.sin((rotY * Math.PI) / 180);
    const x3 = x2d * cosY - z2d * sinY;
    const z3 = x2d * sinY + z2d * cosY;

    // Rotate around X axis
    const cosX = Math.cos((rotX * Math.PI) / 180);
    const sinX = Math.sin((rotX * Math.PI) / 180);
    const y3 = y2d * cosX - z3 * sinX;
    const z4 = y2d * sinX + z3 * cosX;

    const perspective = viewDist / (viewDist + z4 + radius);
    return { x: x3 * perspective, y: y3 * perspective, scale: perspective, z: z4 };
}

/* ─── Connection pairs ─── */
const CONNECTIONS: [string, string][] = INNER_NODES.map((n) => [HUB.id, n.id]);
const OUTER_CONNECTIONS: [string, string][] = INNER_NODES.flatMap((inner, i) => [
    [inner.id, OUTER_NODES[i].id] as [string, string],
    [inner.id, OUTER_NODES[(i + 1) % OUTER_NODES.length].id] as [string, string],
]);

export default function K8sCluster() {
    const [rotX, setRotX] = useState(-15);
    const [rotY, setRotY] = useState(0);
    const [tooltip, setTooltip] = useState<Node | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
    const autoRotRef = useRef(0);
    const frameRef = useRef(0);

    /* Auto-rotation when not dragging */
    useEffect(() => {
        let raf: number;
        const tick = () => {
            if (!isDragging) {
                autoRotRef.current += 0.18;
                setRotY((prev) => {
                    const next = prev + 0.18;
                    return next >= 360 ? next - 360 : next;
                });
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [isDragging]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY, rotX, rotY };
    }, [rotX, rotY]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setRotY(dragStart.current.rotY + dx * 0.5);
        setRotX(Math.max(-35, Math.min(35, dragStart.current.rotX + dy * 0.3)));
    }, [isDragging]);

    const onMouseUp = useCallback(() => setIsDragging(false), []);

    const SVG_SIZE = 520;
    const CX = SVG_SIZE / 2;
    const CY = SVG_SIZE / 2;

    /* Project all nodes */
    const projected = ALL_NODES.map((node) => {
        if (node.layer === 0) return { node, x: CX, y: CY, scale: 1, z: 0 };
        const { x, y, scale, z } = project3D(node.angle, node.radius, rotX, rotY);
        return { node, x: CX + x, y: CY + y, scale, z };
    }).sort((a, b) => a.z - b.z); // painter's algorithm

    /* Build lookup */
    const posLookup: Record<string, { x: number; y: number; scale: number; z: number }> = {};
    projected.forEach(({ node, x, y, scale, z }) => { posLookup[node.id] = { x, y, scale, z }; });

    const nodeRadius = (layer: number, scale: number) => {
        const base = layer === 0 ? 36 : layer === 1 ? 22 : 16;
        return base * Math.max(0.5, scale);
    };

    return (
        <div
            className="relative select-none"
            style={{ width: SVG_SIZE, height: SVG_SIZE, cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            <svg
                width={SVG_SIZE}
                height={SVG_SIZE}
                className="overflow-visible"
            >
                <defs>
                    {/* Glowing connection line with animated dash */}
                    <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    {/* Animated gradient for hub ring */}
                    <radialGradient id="hub-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(14,165,233,0.35)" />
                        <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                    </radialGradient>
                </defs>

                {/* Outer ring guide circles (faint) */}
                {[120, 210].map((r) => (
                    <ellipse
                        key={r}
                        cx={CX}
                        cy={CY}
                        rx={r}
                        ry={r * Math.abs(Math.cos((rotX * Math.PI) / 180)) * 0.6 + r * 0.15}
                        fill="none"
                        stroke="rgba(14,165,233,0.06)"
                        strokeWidth={1}
                        strokeDasharray="4 6"
                    />
                ))}

                {/* Connections — draw behind nodes */}
                {[...CONNECTIONS, ...OUTER_CONNECTIONS].map(([fromId, toId], ci) => {
                    const from = posLookup[fromId];
                    const to = posLookup[toId];
                    if (!from || !to) return null;
                    const fromNode = ALL_NODES.find((n) => n.id === fromId)!;
                    const toNode = ALL_NODES.find((n) => n.id === toId)!;
                    const avgZ = (from.z + to.z) / 2;
                    const opacity = Math.max(0.05, Math.min(0.5, (avgZ + 250) / 400 * 0.5));
                    return (
                        <motion.line
                            key={`${fromId}-${toId}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={fromNode.color}
                            strokeWidth={1.2}
                            strokeOpacity={opacity}
                            strokeDasharray="4 8"
                            filter="url(#glow-line)"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="-36"
                                dur={`${2 + ci * 0.13}s`}
                                repeatCount="indefinite"
                            />
                        </motion.line>
                    );
                })}

                {/* Orbiting pods around hub */}
                {[0, 72, 144, 216, 288].map((a, i) => {
                    const orbitR = 58;
                    const podAngle = a + rotY * 1.4;
                    const { x, y, scale, z } = project3D(podAngle, orbitR, rotX, rotY * 0.8);
                    const px = CX + x;
                    const py = CY + y;
                    const podOp = Math.max(0.2, (z + 100) / 160 + 0.2);
                    const colors = ["#0ea5e9", "#10b981", "#a855f7", "#f59e0b", "#ef4444"];
                    return (
                        <g key={`pod-${i}`}>
                            <circle cx={px} cy={py} r={4 * scale} fill={colors[i]} opacity={Math.min(0.85, podOp)} filter="url(#glow-node)" />
                            <circle cx={px} cy={py} r={7 * scale} fill={colors[i]} opacity={0.15 * podOp} />
                        </g>
                    );
                })}

                {/* Nodes — sorted by depth (painter's algo) */}
                {projected.map(({ node, x, y, scale, z }) => {
                    const r = nodeRadius(node.layer, scale);
                    const textSize = node.layer === 0 ? 18 : node.layer === 1 ? 13 : 10;
                    const labelSize = node.layer === 0 ? 10 : 8;
                    const depthOp = node.layer === 0 ? 1 : Math.max(0.25, (z + 220) / 360 + 0.2);

                    return (
                        <g
                            key={node.id}
                            style={{ cursor: "pointer" }}
                            opacity={Math.min(1, depthOp)}
                            onMouseEnter={() => setTooltip(node)}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            {/* Glow halo */}
                            <circle cx={x} cy={y} r={r * 1.6} fill={node.glow} opacity={0.3} />
                            {/* Node body */}
                            <circle
                                cx={x}
                                cy={y}
                                r={r}
                                fill={node.layer === 0 ? "rgba(6,16,44,0.95)" : "rgba(6,12,32,0.9)"}
                                stroke={node.color}
                                strokeWidth={node.layer === 0 ? 2.5 : 1.5}
                                filter="url(#glow-node)"
                            />
                            {/* Icon */}
                            <text
                                x={x}
                                y={y + textSize * 0.35}
                                textAnchor="middle"
                                fontSize={textSize}
                                fill={node.color}
                                style={{ pointerEvents: "none", userSelect: "none" }}
                            >
                                {node.icon}
                            </text>
                            {/* Label below */}
                            {(node.layer === 0 || scale > 0.7) && (
                                <text
                                    x={x}
                                    y={y + r + labelSize + 2}
                                    textAnchor="middle"
                                    fontSize={labelSize}
                                    fill={node.layer === 0 ? node.color : "rgba(148,163,184,0.75)"}
                                    fontWeight={node.layer === 0 ? "bold" : "normal"}
                                    style={{ pointerEvents: "none", userSelect: "none" }}
                                >
                                    {node.label}
                                </text>
                            )}
                            {/* Hub pulsing ring */}
                            {node.layer === 0 && (
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r={r + 10}
                                    fill="none"
                                    stroke={node.color}
                                    strokeWidth={1}
                                    style={{ transformOrigin: `${x}px ${y}px` }}
                                    animate={{ scale: [0.85, 1.5, 0.85], opacity: [0.35, 0, 0.35] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        key={tooltip.id}
                        className="absolute z-50 pointer-events-none px-3 py-2 rounded-lg text-xs font-semibold border backdrop-blur-md"
                        style={{
                            left: (posLookup[tooltip.id]?.x ?? CX) + 20,
                            top: (posLookup[tooltip.id]?.y ?? CY) - 12,
                            color: tooltip.color,
                            borderColor: `${tooltip.color}44`,
                            background: "rgba(6,12,32,0.92)",
                            boxShadow: `0 0 20px ${tooltip.glow}`,
                        }}
                        initial={{ opacity: 0, scale: 0.9, x: -4 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                    >
                        <span className="font-black">{tooltip.label}</span>
                        <br />
                        <span className="text-slate-400 font-normal">{tooltip.desc}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Drag hint */}
            <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-wider uppercase pointer-events-none"
                style={{ color: "rgba(100,116,139,0.5)" }}
            >
                drag to rotate
            </div>
        </div>
    );
}
