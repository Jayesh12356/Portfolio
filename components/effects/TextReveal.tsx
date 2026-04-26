"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  once?: boolean;
};

export function TextReveal({
  text,
  as = "div",
  className,
  delay = 0,
  stagger = 0.04,
  by = "word",
  once = true,
}: Props) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  const items = by === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      variants={container}
      aria-label={text}
    >
      {items.map((part, i) => (
        <span
          key={`${part}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.05em]"
          style={{ paddingRight: by === "word" ? "0.32em" : 0 }}
        >
          <motion.span variants={item} className="inline-block">
            {part === " " ? "\u00A0" : part}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
