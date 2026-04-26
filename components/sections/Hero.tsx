"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Cloud, Database, Server, Sparkles } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { TextReveal } from "@/components/effects/TextReveal";
import { TiltCard } from "@/components/effects/TiltCard";
import { HeroBlob } from "@/components/effects/HeroBlob";
import { GlowButton } from "@/components/ui/GlowButton";

const PRELOADER_OFFSET = 2.5;

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pb-24 pt-32 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow opacity-70" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:gap-12 lg:gap-20">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PRELOADER_OFFSET + 0.0, duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-text-mute"
          >
            <span className="h-px w-10 bg-accent" />
            <span>/ Welcome to my World</span>
          </motion.div>

          <h1 className="space-y-1 font-display text-[clamp(3rem,9.5vw,7.5rem)] leading-[0.95] tracking-tight">
            <TextReveal
              text="Hi, I'm"
              by="word"
              delay={PRELOADER_OFFSET + 0.05}
              className="block"
            />
            <TextReveal
              text="Jayesh Koli"
              by="word"
              delay={PRELOADER_OFFSET + 0.25}
              className="block text-accent text-glow"
            />
            <TextReveal
              text="GenAI · Backend · Governance."
              by="word"
              delay={PRELOADER_OFFSET + 0.45}
              className="block text-text-mute"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PRELOADER_OFFSET + 0.85, duration: 0.6 }}
            className="max-w-xl text-balance text-base leading-relaxed text-text-mute md:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PRELOADER_OFFSET + 1.05, duration: 0.6 }}
            className="flex flex-wrap items-start gap-x-12 gap-y-6"
          >
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
                / Find with me
              </div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    data-cursor="hover"
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-panel/60 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[var(--accent-glow)]"
                  >
                    <s.icon size={16} strokeWidth={1.6} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
                / Best skill on
              </div>
              <div className="flex gap-3">
                {[
                  { label: "GenAI", Icon: Sparkles },
                  { label: "Backend", Icon: Server },
                  { label: "Data", Icon: Database },
                  { label: "Cloud", Icon: Cloud },
                ].map((s) => (
                  <div
                    key={s.label}
                    title={s.label}
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-panel/60 text-text-mute backdrop-blur"
                  >
                    <s.Icon size={16} strokeWidth={1.6} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PRELOADER_OFFSET + 1.25, duration: 0.6 }}
            className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.018, 1] }}
              transition={{
                duration: 3.2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: PRELOADER_OFFSET + 2.0,
              }}
              className="w-full sm:w-auto"
            >
              <GlowButton
                href="#contact"
                wrapperClassName="block w-full sm:inline-block sm:w-auto"
                className="w-full sm:w-auto"
              >
                Hire Me
              </GlowButton>
            </motion.div>
            <GlowButton
              href="#projects"
              variant="outline"
              wrapperClassName="block w-full sm:inline-block sm:w-auto"
              className="w-full sm:w-auto"
            >
              View Work
            </GlowButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: PRELOADER_OFFSET + 0.15,
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mx-auto w-full max-w-md md:max-w-none"
          style={{ perspective: 1000 }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 scale-[1.45]">
            <HeroBlob className="h-full w-full" />
          </div>

          <TiltCard className="aspect-[4/5] w-full">
            <PortraitCard />
          </TiltCard>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PRELOADER_OFFSET + 1.0, duration: 0.6 }}
            className="absolute -left-4 -top-6 hidden md:block"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 4.6,
                ease: "easeInOut",
                repeat: Infinity,
                delay: PRELOADER_OFFSET + 1.7,
              }}
              className="w-44 rounded-2xl border border-border bg-panel/80 p-4 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              data-cursor="hover"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                / Available
              </div>
              <div className="mt-1.5 font-display text-2xl leading-none">
                {profile.yearsExperience} yrs
              </div>
              <div className="mt-1 text-xs text-text-mute">
                shipping production GenAI
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PRELOADER_OFFSET + 1.15, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 hidden md:block"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5.4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: PRELOADER_OFFSET + 1.95,
              }}
              className="w-52 rounded-2xl border border-border bg-panel/80 p-4 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              data-cursor="hover"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                / Scale
              </div>
              <div className="mt-1.5 font-display text-2xl leading-none">
                {profile.usersServed}
              </div>
              <div className="mt-1 text-xs text-text-mute">
                employees served at Jio
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PortraitCard() {
  const [imageError, setImageError] = useState(false);
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.4 });
  const py = useSpring(my, { stiffness: 110, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-border bg-panel shadow-[0_0_60px_rgba(255,46,99,0.16)] transition-shadow duration-700 ease-out hover:shadow-[0_0_100px_rgba(255,46,99,0.32)]"
      data-cursor="hover"
    >
      <motion.div
        className="absolute inset-0 z-0 scale-[1.06]"
        style={{ x: px, y: py }}
      >
        {!imageError ? (
          <Image
            src="/me.jpg"
            alt={profile.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 480px"
            onError={() => setImageError(true)}
            className="object-cover"
          />
        ) : (
          <PortraitFallback />
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-bg/65 via-bg/15 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42%] bg-gradient-to-t from-bg/90 via-bg/45 to-transparent" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
        style={{ boxShadow: "inset 0 0 120px 30px rgba(10,10,10,0.85)" }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 rounded-3xl ring-1 ring-inset ring-accent/30 transition-all duration-500 group-hover:ring-accent/60" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(255,46,99,0.18), transparent 55%)",
        }}
      />

      <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            / Now playing
          </div>
          <div className="mt-1 font-display text-lg leading-none">
            Building LLM Ops
          </div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <span className="block h-2 w-2 animate-pulse rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}

function PortraitFallback() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-panel-2 via-panel to-bg">
      <div className="absolute inset-0 bg-radial-glow opacity-60" />
      <svg
        viewBox="0 0 200 250"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="silhouette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#202024" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="rgba(255,46,99,0.3)" />
            <stop offset="100%" stopColor="rgba(255,46,99,0)" />
          </radialGradient>
        </defs>
        <rect width="200" height="250" fill="url(#halo)" />
        <ellipse
          cx="100"
          cy="92"
          rx="32"
          ry="38"
          fill="url(#silhouette)"
          stroke="#2a2a2e"
          strokeWidth="0.6"
        />
        <path
          d="M 50 250 L 50 188 Q 50 142 100 142 Q 150 142 150 188 L 150 250 Z"
          fill="url(#silhouette)"
          stroke="#2a2a2e"
          strokeWidth="0.6"
        />
      </svg>
      <div className="absolute bottom-16 left-0 right-0 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
          / drop your photo at <span className="text-accent">public/me.jpg</span>
        </div>
      </div>
    </div>
  );
}
