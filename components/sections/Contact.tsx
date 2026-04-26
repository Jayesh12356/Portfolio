"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Copy, Loader2, Send } from "lucide-react";
import { contactPills } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/effects/TextReveal";
import { GlowButton } from "@/components/ui/GlowButton";
import { sendMessage } from "@/app/actions/send-message";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/40 py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-radial-glow opacity-50" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-tight">
            <TextReveal text="Let's Talk." by="word" className="block text-glow" />
            <TextReveal
              text="Build Something Real."
              by="word"
              delay={0.15}
              className="block text-text-mute"
            />
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            {contactPills.map((pill, i) => (
              <ContactPill key={pill.label} pill={pill} index={i} />
            ))}
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

type Pill = (typeof contactPills)[number];

function ContactPill({ pill, index }: { pill: Pill; index: number }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pill.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ x: 6 }}
      className="group relative flex items-center justify-between gap-4 rounded-2xl border border-border bg-panel/60 p-5 backdrop-blur transition-colors duration-300 hover:border-accent/50"
    >
      <a
        href={pill.href}
        target={pill.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer noopener"
        data-cursor="hover"
        className="flex flex-1 items-center gap-4"
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-bg text-text-mute transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
          <pill.icon size={16} strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
            / {pill.label}
          </div>
          <div className="truncate text-sm text-text">{pill.value}</div>
        </div>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${pill.label}`}
        data-cursor="hover"
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-bg/80 text-text-mute transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </motion.div>
  );
}

type FormStatus = "idle" | "success" | "error";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const submit = () => {
    if (isPending) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields before sending.");
      return;
    }
    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("email", form.email);
    fd.set("message", form.message);
    fd.set("company", company);

    startTransition(async () => {
      try {
        const result = await sendMessage(fd);
        if (result.ok) {
          setStatus("success");
          setErrorMsg("");
          setForm({ name: "", email: "", message: "" });
          setCompany("");
          if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
          resetTimerRef.current = setTimeout(() => {
            setStatus("idle");
          }, 6000);
        } else {
          setStatus("error");
          setErrorMsg(result.error);
        }
      } catch {
        setStatus("error");
        setErrorMsg("Network error — please try again in a moment.");
      }
    });
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submit();
  };

  const dismissError = () => {
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const buttonContent = isPending ? (
    <>
      <Loader2 size={14} className="animate-spin" />
      Sending
    </>
  ) : status === "success" ? (
    <>
      <Check size={14} />
      Sent
    </>
  ) : (
    <>
      <Send size={14} />
      {status === "error" ? "Try Again" : "Submit"}
    </>
  );

  return (
    <motion.form
      onSubmit={onFormSubmit}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative flex flex-col gap-4 rounded-3xl border border-border bg-panel/60 p-8 backdrop-blur md:p-10"
      noValidate
      aria-busy={isPending || undefined}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        / Send a Message
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          label="Your Name"
          value={form.name}
          onChange={(v) => {
            setForm({ ...form, name: v });
            dismissError();
          }}
          placeholder="Jane Doe"
          disabled={isPending}
          name="name"
          autoComplete="name"
        />
        <Field
          label="Your Email"
          type="email"
          value={form.email}
          onChange={(v) => {
            setForm({ ...form, email: v });
            dismissError();
          }}
          placeholder="jane@company.com"
          disabled={isPending}
          name="email"
          autoComplete="email"
        />
      </div>

      <Field
        label="Message"
        textarea
        value={form.message}
        onChange={(v) => {
          setForm({ ...form, message: v });
          dismissError();
        }}
        placeholder="Tell me about your problem or project..."
        disabled={isPending}
        name="message"
      />

      {/* Honeypot — visually hidden, never tab-focusable. Bots fill it; humans don't. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="company">
          Company (leave blank)
          <input
            id="company"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-mute">
          / Avg reply within 24h
        </span>
        <GlowButton
          type="submit"
          onClick={submit}
          disabled={isPending || status === "success"}
          ariaBusy={isPending}
          magnetic={!isPending && status !== "success"}
        >
          {buttonContent}
        </GlowButton>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            key="success-banner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent"
          >
            <Check size={16} className="mt-0.5 shrink-0" />
            <span>
              Message received — I&apos;ll reply within 24h. Thanks for
              reaching out.
            </span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            key="error-banner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-300"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span className="flex-1">
              {errorMsg || "Something went wrong. Please try again."}
            </span>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200 underline-offset-4 hover:underline"
              data-cursor="hover"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
  disabled = false,
  name,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  name?: string;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label
      className={`group relative flex flex-col gap-2 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-mute">
        / {label}
      </span>
      <div
        className={`relative rounded-xl border bg-bg/60 transition-colors duration-300 ${
          focused ? "border-accent" : "border-border"
        }`}
      >
        {textarea ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={5}
            disabled={disabled}
            data-cursor="text"
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-text outline-none placeholder:text-text-dim disabled:cursor-not-allowed"
          />
        ) : (
          <input
            type={type}
            name={name}
            autoComplete={autoComplete}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            data-cursor="text"
            className="w-full bg-transparent px-4 py-3 text-sm text-text outline-none placeholder:text-text-dim disabled:cursor-not-allowed"
          />
        )}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ${
            focused ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>
    </label>
  );
}
