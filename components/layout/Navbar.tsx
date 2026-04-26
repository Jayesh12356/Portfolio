"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(link.href);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-bg/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <a
          href="#hero"
          className="flex items-center gap-2.5"
          data-cursor="hover"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent text-bg shadow-[var(--accent-glow)]">
            <span className="font-display text-lg leading-none">J</span>
            <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-accent/40 blur-xl" />
          </span>
          <span className="font-display text-2xl tracking-tight">
            Jayesh<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className={cn(
                "relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                active === link.href
                  ? "text-accent"
                  : "text-text-mute hover:text-text"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-accent/40 bg-accent/10"
                  transition={{ type: "spring", damping: 22, stiffness: 250 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <GlowButton href="#contact" size="sm">
            Hire Me
          </GlowButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-panel/60 text-text md:hidden"
          data-cursor="hover"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden border-t border-border/60 bg-bg/95 backdrop-blur-xl md:hidden"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 font-mono text-xs uppercase tracking-[0.18em] text-text-mute transition-colors hover:bg-panel hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2">
            <GlowButton href="#contact" size="sm">
              Hire Me
            </GlowButton>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
}
