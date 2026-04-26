"use client";

import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { certifications } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";
import { TiltCard } from "@/components/effects/TiltCard";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border/40 py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6">
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            <TextReveal text="Continuous" by="word" className="block" />
            <TextReveal
              text="Learning. Always."
              by="word"
              delay={0.15}
              className="block text-text-mute"
            />
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ perspective: 1000 }}
            >
              <TiltCard intensity={6}>
                <div
                  data-cursor="hover"
                  className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-panel/60 p-8 backdrop-blur transition-colors duration-300 hover:border-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
                      <Award size={18} strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
                      / {c.badge}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
                      {c.title}
                    </h3>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
                      {c.issuer}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
                      verified
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-bg transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </span>
                  </div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
