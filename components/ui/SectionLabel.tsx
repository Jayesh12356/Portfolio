"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextScramble } from "@/components/effects/TextScramble";

type Props = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionLabel({ children, className, align = "left" }: Props) {
  const text = String(children).replace(/^\//, "").trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-text-mute",
        align === "center" && "justify-center",
        className,
      )}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{ transformOrigin: "0% 50%" }}
        className="h-px w-8 bg-accent"
      />
      <span className="text-accent">
        /
        <TextScramble
          text={text}
          trigger="viewport"
          duration={750}
          className="ml-1"
        />
      </span>
    </motion.div>
  );
}
