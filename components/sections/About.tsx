"use client";

import { motion, type Variants } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";
import { GlowButton } from "@/components/ui/GlowButton";

const cardContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const SPECIALIZATIONS = ["GenAI", "Backend", "RAG", "LLM Ops", "Cloud"];

const CRED_STATS: Array<{ value: string; label: string }> = [
  { value: "4+ yrs", label: "Production GenAI" },
  { value: "10k+", label: "Users at Jio" },
  { value: "2", label: "LLM Systems Shipped" },
  { value: "8.1", label: "M.Tech CGPA · BITS" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border/40 py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardContainer}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-panel shadow-[0_0_60px_rgba(255,46,99,0.10)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
            <div className="pointer-events-none absolute -inset-px rounded-3xl ring-1 ring-inset ring-accent/15" />

            <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/50" />
            <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-accent/50" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent/50" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/50" />

            <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
              <motion.div
                variants={cardItem}
                className="flex items-center justify-between"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
                  / ID 001 &nbsp;—&nbsp; OPERATOR
                </span>
                <div className="relative grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10">
                  <span className="font-display text-sm leading-none text-accent">
                    JK
                  </span>
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                </div>
              </motion.div>

              <motion.div variants={cardItem} className="mt-7 sm:mt-8">
                <div className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.92] tracking-tight">
                  JAYESH
                </div>
                <div className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.92] tracking-tight text-accent text-glow">
                  KOLI
                </div>
              </motion.div>

              <motion.div
                variants={cardItem}
                className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-mute"
              >
                {SPECIALIZATIONS.map((tag, i) => (
                  <span key={tag} className="flex items-center gap-2">
                    {i > 0 && (
                      <span className="h-1 w-1 rounded-full bg-accent/50" />
                    )}
                    <span>{tag}</span>
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={cardItem}
                className="mt-auto grid grid-cols-2 gap-3 pt-6"
              >
                {CRED_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border/60 bg-panel-2/40 px-3 py-2.5 backdrop-blur-sm"
                  >
                    <div className="font-display text-2xl leading-none">
                      {s.value}
                    </div>
                    <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-text-mute">
                      / {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={cardItem}
                className="mt-4 flex items-center gap-2.5 rounded-xl border border-border/60 bg-panel-2/40 px-3 py-2 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-[11px] leading-tight text-text-mute">
                  Currently shipping{" "}
                  <span className="text-text">LLM Ops</span> at Jio Platforms
                </span>
              </motion.div>

              <motion.div
                variants={cardItem}
                className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim"
              >
                <span>19.0° N · 73.1° E</span>
                <span>Panvel, Navi Mumbai</span>
              </motion.div>
            </div>
          </div>

          <div className="absolute -right-3 -top-3 hidden h-24 w-24 rotate-12 border border-accent/40 bg-accent/5 md:block" />
          <div className="absolute -bottom-4 -left-4 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim md:block">
            / 2022 — present
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          <SectionLabel>About Me</SectionLabel>

          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            <TextReveal text="Who I Am," by="word" className="block" />
            <TextReveal
              text="& What I Build."
              by="word"
              delay={0.15}
              className="block text-text-mute"
            />
          </h2>

          {profile.about.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              className="max-w-2xl text-text-mute leading-relaxed"
            >
              {para}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-3 gap-4 border-y border-border/60 py-6"
          >
            {[
              { label: "Experience", value: "4+ yrs" },
              { label: "Users Served", value: "10k+" },
              { label: "Domains", value: "Fin · GenAI" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl leading-none md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
                  / {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <GlowButton href="/Jayesh-Koli-CV.pdf" download="Jayesh-Koli-CV.pdf">
              <Download size={14} strokeWidth={2} />
              Download CV
            </GlowButton>
            <GlowButton href="#experience" variant="outline">
              <FileText size={14} strokeWidth={1.6} />
              View Experience
            </GlowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
