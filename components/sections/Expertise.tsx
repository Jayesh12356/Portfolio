"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expertise } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";
import { TiltCard } from "@/components/effects/TiltCard";
import { cn } from "@/lib/utils";

export function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
              <TextReveal text="My Experience" by="word" className="block" />
              <TextReveal
                text="And Expertise With"
                by="word"
                delay={0.1}
                className="block"
              />
              <TextReveal
                text="Tools Used Through Out My Career."
                by="word"
                delay={0.25}
                className="block text-text-mute"
              />
            </h2>
          </div>
        </div>

        <div
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: 1200 }}
        >
          {expertise.map((item, i) => (
            <ExpertiseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Item = (typeof expertise)[number];

function ExpertiseCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: item.percent,
      duration: reduced ? 0 : 1.6,
      ease: "power3.out",
      delay: index * 0.08,
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.v));
      },
    });
    return () => {
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [inView, item.percent, index]);

  const isAccent = index === 0;

  return (
    <TiltCard intensity={4} className="h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: index * 0.08 }}
        className={cn(
          "group relative flex h-full flex-col justify-between gap-10 bg-panel p-8 transition-all duration-500 md:p-10",
          "hover:bg-panel-2 hover:shadow-[inset_0_0_0_1px_rgba(255,46,99,0.15),0_0_42px_rgba(255,46,99,0.18)]",
        )}
        data-cursor="hover"
      >
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
          <span>{item.title}</span>
          <span className="text-accent">{item.index}</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs text-text-mute">{item.blurb}</div>
          <div className="text-sm text-text-dim">{item.detail}</div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span
              ref={numRef}
              className="font-display text-[clamp(4rem,11vw,7rem)] leading-none tracking-tight transition-colors duration-500 group-hover:text-accent"
            >
              0
            </span>
            <span className="font-display text-3xl text-text-mute">%</span>
          </div>
          <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.percent}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 1.4,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                isAccent
                  ? "bg-accent shadow-[0_0_18px_rgba(255,46,99,.6)] group-hover:shadow-[0_0_28px_rgba(255,46,99,.85)]"
                  : "bg-text/80 group-hover:bg-accent group-hover:shadow-[0_0_18px_rgba(255,46,99,.55)]",
              )}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 ring-1 ring-inset ring-accent/60 transition-opacity duration-500 group-hover:opacity-100" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(255,46,99,0.10), transparent 60%)",
          }}
        />
      </motion.div>
    </TiltCard>
  );
}
