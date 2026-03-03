import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    strength?: number;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    type?: "button" | "submit" | "reset";
}

export function MagneticButton({
    children,
    className = "",
    style,
    strength = 0.35,
    onClick,
    href,
    target,
    rel,
    type = "button",
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const content = (
        <motion.div
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative inline-flex"
        >
            <motion.div
                animate={{ scale: isHovered ? 1.04 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={className}
                style={style}
                onClick={onClick}
            >
                {children}
            </motion.div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target={target} rel={rel} style={{ display: "inline-flex" }}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            {content}
        </button>
    );
}
