"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/effects/MagneticButton";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
  download?: string | boolean;
  target?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaBusy?: boolean;
};

const sizes = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

export const GlowButton = forwardRef<HTMLAnchorElement, Props>(function GlowButton(
  {
    children,
    href,
    onClick,
    variant = "primary",
    size = "md",
    className,
    magnetic = true,
    download,
    target,
    type = "button",
    disabled = false,
    ariaBusy = false,
  },
  ref
) {
  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-mono uppercase tracking-[0.18em] transition-colors duration-300";

  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-bg hover:bg-accent-soft shadow-[0_0_24px_rgba(255,46,99,.45),0_0_64px_rgba(255,46,99,.25)] hover:shadow-[0_0_12px_rgba(255,46,99,.65),0_0_40px_rgba(255,46,99,.55),0_0_96px_rgba(255,46,99,.35)]",
    outline:
      "border border-border bg-panel/40 text-text hover:border-accent hover:text-accent backdrop-blur",
    ghost:
      "border border-transparent bg-transparent text-text hover:text-accent",
  };

  const inner = (
    <span className={cn(base, sizes[size], variants[variant], className)}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,.25), transparent 60%)",
          }}
        />
      )}
    </span>
  );

  const useMagnetic = magnetic && !disabled;
  const content = useMagnetic ? (
    <MagneticButton className="group">{inner}</MagneticButton>
  ) : (
    <span className="group">{inner}</span>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        download={download as string | undefined}
        className="inline-block"
        data-cursor="hover"
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={ariaBusy || undefined}
      className={cn(
        "inline-block",
        disabled && "cursor-not-allowed opacity-60 pointer-events-none",
      )}
      data-cursor="hover"
    >
      {content}
    </button>
  );
});
