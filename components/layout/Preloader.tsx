"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("           "); // 11 spaces for "JAYESH KOLI"

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(100);
      setName("JAYESH KOLI");
      setTimeout(() => setDone(true), 200);
      return;
    }

    const target = "JAYESH KOLI";
    const start = performance.now();
    const TOTAL = 1900;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / TOTAL, 1);
      setCount(Math.floor(progress * 100));

      const revealCount = Math.floor(progress * target.length * 1.15);
      let next = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealCount) next += target[i];
        else if (target[i] === " ") next += " ";
        else
          next +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setName(next);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setName(target);
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 bg-radial-glow opacity-60" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-text-mute">
              / Loading Portfolio
            </div>
            <div className="font-display text-[clamp(3rem,12vw,9rem)] leading-none tracking-tight text-text">
              {name}
            </div>
            <div className="flex w-[min(70vw,520px)] items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: `${count}%` }}
                />
              </div>
              <div className="font-mono text-sm tabular-nums text-text-mute">
                {String(count).padStart(3, "0")}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
