"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-border/40 py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[60vh] -translate-y-1/2 bg-radial-glow opacity-50" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            <TextReveal text="Where I've" by="word" className="block" />
            <TextReveal
              text="Built At Scale."
              by="word"
              delay={0.15}
              className="block text-text-mute"
            />
          </h2>
        </div>

        {experience.map((job) => (
          <div
            key={job.company}
            className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16"
          >
            <div className="self-start lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-border bg-panel/60 p-8 backdrop-blur"
              >
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  <Briefcase size={14} strokeWidth={1.6} />
                  <span>/ Current</span>
                </div>

                <div className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight">
                  Jio Platforms
                  <br />
                  <span className="text-text-mute">Limited.</span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-text-mute">
                  <MapPin size={14} strokeWidth={1.5} />
                  <span>{job.location}</span>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
                    / Role
                  </div>
                  <div className="mt-2 text-sm text-text">{job.role}</div>
                </div>

                <div className="mt-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
                    / Period
                  </div>
                  <div className="mt-2 text-sm text-text">{job.period}</div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              {job.bullets.map((b, i) => (
                <BulletCard key={i} bullet={b} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type Bullet = (typeof experience)[number]["bullets"][number];

function MetricCountUp({
  value,
  index,
}: {
  value: string;
  index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      ref.current.textContent = value;
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isInt = Number.isInteger(target);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      ref.current.textContent = value;
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: "power3.out",
      delay: index * 0.05,
      onUpdate: () => {
        if (!ref.current) return;
        const cur = isInt ? Math.round(obj.v) : obj.v.toFixed(1);
        ref.current.textContent = `${cur}${suffix}`;
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = value;
      },
    });
    return () => {
      tween.kill();
    };
  }, [inView, value, index]);

  return (
    <span
      ref={ref}
      className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-tight text-accent text-glow md:w-32"
    >
      0
    </span>
  );
}

function BulletCard({ bullet, index }: { bullet: Bullet; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-border bg-panel/40 p-6 backdrop-blur transition-colors duration-300 hover:border-accent/40 md:grid-cols-[auto_1fr] md:p-8"
      data-cursor="hover"
    >
      <div className="flex flex-col">
        {bullet.metric && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <MetricCountUp value={bullet.metric} index={index} />
          </motion.div>
        )}
        {bullet.metricLabel && (
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
            / {bullet.metricLabel}
          </div>
        )}
      </div>
      <p className="self-center text-balance leading-relaxed text-text">
        {bullet.text}
      </p>

      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
        /{String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
