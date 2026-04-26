"use client";

import { createElement, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

type Props = {
  text: string;
  className?: string;
  trigger?: "viewport" | "mount" | "hover";
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

export function TextScramble({
  text,
  className,
  trigger = "viewport",
  duration = 800,
  as = "span",
}: Props) {
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  const run = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) {
      setOutput(text);
      return;
    }

    const length = text.length;
    const queue: { from: string; to: string; start: number; end: number }[] = [];
    for (let i = 0; i < length; i++) {
      const from = " ";
      const to = text[i];
      const start = Math.floor(Math.random() * (duration * 0.4));
      const end = start + Math.floor(Math.random() * (duration * 0.6));
      queue.push({ from, to, start, end });
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      let out = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (elapsed >= end) {
          complete++;
          out += to;
        } else if (elapsed >= start) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          out += from;
        }
      }
      setOutput(out);
      if (complete < queue.length) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") {
      run();
      return;
    }
    if (trigger === "viewport" && ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              run();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  const handleHover = () => {
    if (trigger === "hover") {
      startedRef.current = false;
      run();
    }
  };

  return createElement(
    as,
    { ref, className, onMouseEnter: handleHover },
    output
  );
}
