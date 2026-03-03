import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
    gap?: number;
}

export function InfiniteMarquee({
    children,
    direction = "left",
    speed = 60,
    pauseOnHover = true,
    className = "",
    gap = 24,
}: InfiniteMarqueeProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [trackWidth, setTrackWidth] = useState(400);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.scrollWidth / 2);
        }
    }, [children]);

    const duration = trackWidth > 0 ? trackWidth / speed : 20;
    const xFrom = direction === "left" ? 0 : -trackWidth;
    const xTo = direction === "left" ? -trackWidth : 0;

    return (
        <div
            className={`overflow-hidden ${className}`}
            onMouseEnter={() => pauseOnHover && setPaused(true)}
            onMouseLeave={() => pauseOnHover && setPaused(false)}
        >
            <motion.div
                ref={trackRef}
                className="flex w-max"
                animate={paused ? {} : { x: [xFrom, xTo] }}
                transition={{
                    duration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                style={{ gap }}
            >
                <div className="flex flex-shrink-0" style={{ gap }}>
                    {children}
                </div>
                <div className="flex flex-shrink-0" aria-hidden style={{ gap }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
