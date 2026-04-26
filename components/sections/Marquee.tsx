"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { skillTape, skillTapeSecondary } from "@/lib/data";

type MarqueeRowProps = {
  items: string[];
  variant: "primary" | "secondary";
  duration?: number;
  reverse?: boolean;
};

function MarqueeRow({
  items,
  variant,
  duration = 32,
  reverse = false,
}: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const distance = el.scrollWidth / 2;
    const fromX = reverse ? -distance : 0;
    const toX = reverse ? 0 : -distance;

    gsap.set(el, { x: fromX });
    tweenRef.current = gsap.to(el, {
      x: toX,
      duration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [duration, reverse]);

  const slowDown = () => tweenRef.current?.timeScale(0.25);
  const speedUp = () => tweenRef.current?.timeScale(1);

  const loop = [...items, ...items];

  return (
    <div
      className="mask-fade-edges"
      onMouseEnter={slowDown}
      onMouseLeave={speedUp}
    >
      <div
        ref={trackRef}
        className={
          variant === "primary"
            ? "flex w-max gap-12 will-change-transform"
            : "flex w-max gap-6 will-change-transform"
        }
      >
        {loop.map((item, i) =>
          variant === "primary" ? (
            <div
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-12"
            >
              <span className="font-display text-3xl uppercase leading-none tracking-tight text-text md:text-5xl">
                {item}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-accent" />
            </div>
          ) : (
            <span
              key={`${item}-${i}`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-panel-2/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-mute backdrop-blur-sm transition-colors duration-300 hover:border-accent/60 hover:text-accent md:text-xs"
            >
              <span className="h-1 w-1 rounded-full bg-accent/70 transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_8px_var(--color-accent)]" />
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Skills"
      className="relative overflow-hidden border-y border-border/60 bg-panel/40 py-8"
    >
      <div className="flex flex-col gap-5">
        <MarqueeRow items={skillTape} variant="primary" duration={34} />
        <MarqueeRow
          items={skillTapeSecondary}
          variant="secondary"
          duration={28}
          reverse
        />
      </div>
    </section>
  );
}
