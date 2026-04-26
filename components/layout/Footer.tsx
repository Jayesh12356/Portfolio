"use client";

import { ArrowUp } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border/70 bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="font-display text-4xl tracking-tight md:text-5xl">
            Jayesh<span className="text-accent">.</span>
          </div>
          <p className="max-w-md font-mono text-xs uppercase tracking-[0.2em] text-text-mute">
            / {profile.title} — {profile.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              aria-label={s.label}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-panel/60 text-text-mute transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[var(--accent-glow)]"
            >
              <s.icon size={16} strokeWidth={1.5} />
            </a>
          ))}

          <MagneticButton>
            <button
              type="button"
              onClick={scrollTop}
              data-cursor="hover"
              aria-label="Scroll to top"
              className="grid h-11 w-11 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              <ArrowUp size={16} />
            </button>
          </MagneticButton>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim md:flex-row">
          <span>
            © {new Date().getFullYear()} Jayesh Koli — All systems operational.
          </span>
          <span>
            Built with Next.js · GSAP · Three.js · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
