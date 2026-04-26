"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";

export function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 25%"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });
  const dotY = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="education"
      className="relative overflow-hidden border-t border-border/40 py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6">
          <SectionLabel>Education</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            <TextReveal text="Foundations" by="word" className="block" />
            <TextReveal
              text="Across The Years."
              by="word"
              delay={0.15}
              className="block text-text-mute"
            />
          </h2>
        </div>

        <div ref={timelineRef} className="relative mt-16 ml-4 md:ml-0">
          <svg
            aria-hidden
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
            className="pointer-events-none absolute left-3 top-0 -ml-px h-full w-[2px] overflow-visible md:left-1/2"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="#2a2a2e"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="#ff2e63"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              style={{
                pathLength,
                filter: "drop-shadow(0 0 6px rgba(255,46,99,0.55))",
              }}
            />
          </svg>

          <motion.span
            aria-hidden
            style={{ top: dotY }}
            className="pointer-events-none absolute left-3 -ml-[5px] -mt-[5px] block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_rgba(255,46,99,0.85)] md:left-1/2"
          />

          <div className="flex flex-col gap-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0
                    ? "md:[&>*:first-child]:order-1"
                    : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`pl-12 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="rounded-2xl border border-border bg-panel/60 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,46,99,0.12)]">
                    <div
                      className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <GraduationCap size={14} strokeWidth={1.6} />
                      <span>{edu.score}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight md:text-3xl">
                      {edu.degree}
                    </h3>
                    <div className="mt-1 text-sm text-text">
                      {edu.institute}
                    </div>
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
                      {edu.period}
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="absolute left-3 top-6 -ml-1.5 grid h-3 w-3 place-items-center md:left-1/2"
                >
                  <span className="relative block h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
                  <span className="absolute h-6 w-6 animate-ping rounded-full bg-accent/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
