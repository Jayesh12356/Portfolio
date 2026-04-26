"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 28, stiffness: 350, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 350, mass: 0.4 });
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 140, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 140, mass: 0.6 });

  const [variant, setVariant] = useState<"default" | "hover" | "text">(
    "default",
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;
    setIsMobile(isTouch);
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);

    const updateVariant = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cursorAttr = target
        .closest("[data-cursor]")
        ?.getAttribute("data-cursor");
      if (cursorAttr === "hover") setVariant("hover");
      else if (cursorAttr === "text") setVariant("text");
      else setVariant("default");
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", updateVariant);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", updateVariant);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  const baseDotScale =
    variant === "hover" ? 0 : variant === "text" ? 0.4 : 1;
  const baseRingScale =
    variant === "hover" ? 2.4 : variant === "text" ? 1.6 : 1;

  const dotScale = isPressed ? baseDotScale * 0.55 : baseDotScale;
  const ringScale = isPressed ? baseRingScale * 0.78 : baseRingScale;
  const ringBg = isPressed
    ? "rgba(255,46,99,0.32)"
    : variant === "hover"
      ? "rgba(255,46,99,0.18)"
      : "rgba(255,255,255,0.0)";
  const ringBorder = isPressed
    ? "rgba(255,46,99,1)"
    : variant === "hover"
      ? "rgba(255,46,99,0.95)"
      : "rgba(255,255,255,0.45)";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
          scale: dotScale,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
          scale: ringScale,
          borderColor: ringBorder,
          background: ringBg,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 200 }}
      />
    </>
  );
}
