import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    borderColor?: string;
    glowOnHover?: boolean;
}

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(14,165,233,0.12)",
    borderColor = "rgba(255,255,255,0.07)",
    glowOnHover = true,
}: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%", opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setSpotlight({ x: `${x}%`, y: `${y}%`, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setSpotlight((s) => ({ ...s, opacity: 0 }));
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative overflow-hidden rounded-2xl border ${className}`}
            style={{ borderColor }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={glowOnHover ? { borderColor: spotlightColor.replace("0.12", "0.5") } : {}}
            transition={{ duration: 0.3 }}
        >
            {/* Spotlight layer */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity: spotlight.opacity,
                    background: `radial-gradient(600px circle at ${spotlight.x} ${spotlight.y}, ${spotlightColor}, transparent 50%)`,
                }}
            />
            {children}
        </motion.div>
    );
}
