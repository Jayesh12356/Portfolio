"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border/40 py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6">
          <SectionLabel>Recent Work</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            <TextReveal
              text="Production"
              by="word"
              className="block"
            />
            <TextReveal
              text="GenAI Systems"
              by="word"
              delay={0.1}
              className="block text-accent text-glow"
            />
            <TextReveal
              text="that I shipped."
              by="word"
              delay={0.25}
              className="block text-text-mute"
            />
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.95]);

  const reverse = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="lg:sticky"
      style={{ top: `${88 + index * 28}px` }}
    >
      <div
        className={`group relative grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-border bg-panel/70 backdrop-blur md:grid-cols-2 ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
        data-cursor="hover"
      >
        <ProjectVisual
          project={project}
          index={index}
          y={y}
          scale={visualScale}
        />

        <div className="relative flex flex-col justify-between gap-8 p-8 md:p-12 [direction:ltr]">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
            <span>/ Project · {project.index}</span>
            <span className="text-accent">{project.tagline}</span>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-display text-[clamp(2rem,4vw,3.75rem)] leading-[0.95] tracking-tight">
              {project.title}
            </h3>

            <ul className="flex flex-col gap-3">
              {project.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="flex gap-3 text-sm text-text-mute"
                >
                  <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-bg/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-mute"
                >
                  {s}
                </span>
              ))}
            </div>

            <MagneticButton>
              <button
                type="button"
                data-cursor="hover"
                className="group/btn flex items-center gap-3 rounded-full border border-border bg-bg/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text transition-colors hover:border-accent hover:text-accent"
              >
                <span>Read More</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-bg transition-transform duration-300 group-hover/btn:rotate-45">
                  <ArrowUpRight size={12} strokeWidth={2.4} />
                </span>
              </button>
            </MagneticButton>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-accent/40 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

function ProjectVisual({
  project,
  index,
  y,
  scale,
}: {
  project: Project;
  index: number;
  y: import("framer-motion").MotionValue<number>;
  scale: import("framer-motion").MotionValue<number>;
}) {
  const isRag = index === 0;
  return (
    <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-bg md:aspect-auto md:border-b-0 md:border-r [direction:ltr]">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 origin-center"
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        <div className="absolute -right-1/4 top-1/2 h-[120%] w-[120%] -translate-y-1/2 bg-radial-glow opacity-70" />

        {isRag ? <RagVisual /> : <LlmOpsVisual />}
      </motion.div>

      <div className="absolute left-6 top-6 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-bg">
          {project.index}
        </span>
        <span>/ {project.tagline}</span>
      </div>
    </div>
  );
}

function RagVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center p-8">
      <div className="relative w-full max-w-md">
        {/* Document chips */}
        <div className="grid grid-cols-3 gap-3">
          {[
            "/policy-2024.md",
            "/finance-rules",
            "/access-matrix",
            "/audit-spec",
            "/expense-cap",
            "/sap-flow",
          ].map((d, i) => (
            <motion.div
              key={d}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-md border border-border bg-panel/80 px-2 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-text-mute"
            >
              {d}
            </motion.div>
          ))}
        </div>

        {/* Connector */}
        <div className="my-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
          <span className="h-px flex-1 bg-accent/40" />
          <span>RAG · pgvector</span>
          <span className="h-px flex-1 bg-accent/40" />
        </div>

        {/* LLM box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-xl border border-accent/40 bg-bg/80 p-4 shadow-[0_0_24px_rgba(255,46,99,.25)]"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            <Sparkles size={12} />
            <span>LLM · Approved Knowledge</span>
          </div>
          <div className="mt-2 font-display text-2xl tracking-tight">
            Confidence 0.92
          </div>
          <div className="mt-1 text-xs text-text-mute">
            → Routed to Human Reviewer
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LlmOpsVisual() {
  const bars = [38, 64, 52, 78, 45, 70, 58, 82, 49, 66];
  return (
    <div className="absolute inset-0 grid place-items-center p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
          <span className="flex items-center gap-2 text-accent">
            <Layers size={12} />
            Prompt v1.3 · drift
          </span>
          <span>2.4ms p50</span>
        </div>

        <div className="mt-4 grid grid-cols-10 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: "circOut" }}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              className={`rounded-sm ${
                i === 7 ? "bg-accent shadow-[0_0_12px_rgba(255,46,99,.6)]" : "bg-panel-3"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          {[
            { label: "Tokens", value: "412K" },
            { label: "Cost", value: "$1.20" },
            { label: "Drift", value: "0.04" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className="rounded-md border border-border bg-panel/80 p-3"
            >
              <div className="text-text-mute">{s.label}</div>
              <div className="mt-1 font-display text-xl text-text">{s.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
