import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    /** "words" | "chars" | "lines" */
    splitBy?: "words" | "chars";
    once?: boolean;
    as?: keyof JSX.IntrinsicElements;
}

export function TextReveal({
    text,
    className = "",
    delay = 0,
    duration = 0.6,
    splitBy = "words",
    once = true,
    as: Tag = "span",
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once, margin: "-40px" });

    const units = splitBy === "words" ? text.split(" ") : text.split("");
    const separator = splitBy === "words" ? " " : "";

    return (
        // @ts-ignore — dynamic tag
        <Tag ref={ref} className={`inline ${className}`} aria-label={text}>
            {units.map((unit, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden"
                    style={{ verticalAlign: "bottom" }}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%", opacity: 0 }}
                        animate={inView ? { y: "0%", opacity: 1 } : {}}
                        transition={{
                            delay: delay + i * (splitBy === "words" ? 0.07 : 0.03),
                            duration,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {unit}
                        {separator}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}

/** Simple fade+clip reveal for a block of text */
export function RevealBlock({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
