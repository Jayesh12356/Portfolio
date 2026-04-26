# Jayesh Koli — Portfolio

A scroll-driven, single-page personal portfolio built to feel like a peak-tier
agency site. Built on Next.js 15 + TypeScript + Tailwind v4, with a maximum-impact
motion stack: Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll, and a
custom GLSL shader blob via React Three Fiber.

The content is sourced from [`cv.md`](cv.md) and centralized in
[`lib/data.ts`](lib/data.ts) — edit one file and the whole site updates.

---

## Stack

| Layer            | Tooling                                                            |
| ---------------- | ------------------------------------------------------------------ |
| Framework        | Next.js 15 (App Router), React 19, TypeScript 5.6                  |
| Styling          | Tailwind CSS v4 (CSS-first `@theme inline` tokens)                 |
| Component motion | Framer Motion 12 (`whileInView`, layout, springs)                  |
| Scroll motion    | GSAP 3 + ScrollTrigger (marquee, count-up, scroll syncing)         |
| Smooth scroll    | Lenis 1.1 (driven by GSAP ticker for perfect ScrollTrigger sync)   |
| 3D / Shaders     | three.js + @react-three/fiber 9 + @react-three/drei 10             |
| Icons            | lucide-react                                                       |
| Fonts            | Anton (display), Geist Sans (UI), JetBrains Mono (mono)            |
| Email            | Resend SDK + Next.js Server Action + Zod validation                |
| PDF CV           | pdfkit (build-time, single-page generated artifact)                |

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the build
npm run build:cv     # regenerate public/Jayesh-Koli-CV.pdf from the script
```

## Project map

```
app/
  layout.tsx       # root: fonts, providers (SmoothScroll), global UI shell
  page.tsx         # composes the 9 sections
  globals.css      # Tailwind v4 + tokens + utilities + reduced-motion
  fonts.ts         # next/font Google font loaders
  icon.tsx         # programmatic favicon (crimson J)
  actions/
    send-message.ts  # "use server" — Resend send + zod + honeypot
components/
  effects/
    SmoothScroll.tsx   # Lenis -> GSAP ticker -> ScrollTrigger.update
    CustomCursor.tsx   # dot + ring with springs, [data-cursor] hover
    MagneticButton.tsx # cursor-attractor wrapper using motion values
    TextReveal.tsx     # word/char split-reveal with viewport stagger
    TextScramble.tsx   # ASCII-noise-to-text reveal
    TiltCard.tsx       # 3D tilt on hover via motion springs
    GrainOverlay.tsx   # SVG fractal noise at 6% mix-blend
    HeroBlob.tsx       # R3F icosahedron + custom GLSL (snoise + fresnel)
  layout/
    Preloader.tsx      # 00->100 + scramble + clip-path exit
    Navbar.tsx         # glass nav, scroll-spy, magnetic Hire Me, mobile menu
    Footer.tsx         # socials + scroll-to-top + meta
  ui/
    GlowButton.tsx     # primary/outline/ghost button with crimson glow
    SectionLabel.tsx   # /SLASH-PREFIXED labels (Image-2 DNA)
  sections/
    Hero.tsx           # name, blob, portrait tilt card, find/skills rows
    About.tsx          # who I am, stats strip, download CV
    Marquee.tsx        # infinite skills tape (GSAP)
    Expertise.tsx      # 4 stat blocks, count-up + fill bars
    Experience.tsx     # sticky company panel + scrolling metric cards
    Projects.tsx       # 2 stacked sticky cards + abstract visuals
    Education.tsx      # zig-zag vertical timeline
    Certifications.tsx # 3 tilt-on-hover badge cards
    Contact.tsx        # pills + real form (server action + Resend)
lib/
  data.ts          # ALL content sourced from cv.md - edit here
  utils.ts         # cn(), clamp(), lerp()
scripts/
  generate-cv-pdf.mjs  # node script that produces the single-page PDF
  process-portrait.mjs # one-off image preprocessor for /public/me.jpg
public/
  Jayesh-Koli-CV.pdf   # GENERATED — served by the Download CV button
  me.jpg               # OPTIONAL — your portrait (see below)
cv.md                  # source of truth for site content + PDF input
.env.example           # RESEND_API_KEY template
```

## Personalize it

### 1. Add your portrait

Drop a square-ish portrait image at `public/me.jpg`. The hero will pick it up
automatically with a 3D tilt, glow ring, and grain overlay. Until you do, a
stylized silhouette + crimson halo placeholder shows in its place.

Recommended:

- 1200x1500 or larger (4:5)
- JPG or WebP
- Subject framed center-right

If you want a different filename, update the `src` in
[`components/sections/Hero.tsx`](components/sections/Hero.tsx) (`PortraitCard`).

### 2. Update CV content

All copy is in [`lib/data.ts`](lib/data.ts). Sections:

- `profile` — name, title, intro, contact, experience years, users served
- `socials`, `contactPills` — links + icons
- `expertise` — the 4 stat blocks (title, percent, blurb, detail)
- `skillTape` — the infinite marquee items
- `experience` — work history + bulleted impact metrics
- `projects` — featured work (title, tagline, bullets, stack)
- `education`, `certifications`
- `navLinks` — top-nav items

Then update [`cv.md`](cv.md) so the source of truth and the site stay in sync.
The Download CV button serves the generated **single-page PDF** at
`public/Jayesh-Koli-CV.pdf`. After editing `cv.md`, regenerate the PDF with:

```bash
npm run build:cv
```

The generator is [`scripts/generate-cv-pdf.mjs`](scripts/generate-cv-pdf.mjs).
It uses pdfkit + built-in Helvetica (no font files), renders one tall page
(8.5" × 23.3"), uses the same crimson accent (`#FF2E63`) as the site, and
walks every section in order: header → summary → capabilities → 9-category
skills → experience → projects → education → certifications.

### 3. Tweak the look

Theme tokens live in [`app/globals.css`](app/globals.css) under `@theme inline`:

- `--color-bg`, `--color-panel*`, `--color-border` — surfaces
- `--color-text`, `--color-text-mute`, `--color-text-dim` — type
- `--color-accent`, `--color-accent-soft`, `--color-accent-deep` — crimson
- `--font-display`, `--font-sans`, `--font-mono` — typography

Change `--color-accent` once and the whole site re-tints (button glow, blob
shader, marquee dots, ring borders, scroll progress).

## Effects palette (what triggers what)

| Trigger              | Effect                                                                   |
| -------------------- | ------------------------------------------------------------------------ |
| Page load            | Preloader: 00->100 + name scramble + clip-path reveal                    |
| Scroll               | Lenis-driven inertial scroll, ScrollTrigger updates                      |
| Section in view      | Word/char text reveal, fade+slide of bullets                             |
| Hover any `[data-cursor="hover"]` | Custom cursor expands to crimson ring; magnetic pull on buttons |
| Hover Marquee        | Tape slows to 25% speed                                                  |
| Hover Project card   | Crimson edge ring + glow halo, magnetic Read More CTA                    |
| Hover Cert card      | 3D tilt with motion springs                                              |
| Hover Portrait card  | 3D tilt + glow ring                                                      |
| Cursor on hero       | Hero blob shader displaces toward cursor (uMouse uniform)                |
| `prefers-reduced-motion` | Smooth scroll, scramble, marquee, count-up all short-circuit          |
| `(max-width: 767px)` | Hero blob downgrades to static crimson radial gradient orb               |
| `deviceMemory < 4`   | Hero blob also downgrades                                                |

## Email & deployment

The contact form posts to a Next.js **server action**
([`app/actions/send-message.ts`](app/actions/send-message.ts)) which validates
the payload with Zod, blocks bots via a hidden honeypot field, and forwards
the message to `jkoli6704@gmail.com` using the [Resend](https://resend.com)
SDK. `replyTo` is set to the submitted email, so replies from your inbox land
back to the sender automatically.

### Local setup

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month).
2. Create an API key under **API Keys → Create**.
3. Copy [`.env.example`](.env.example) to `.env.local` and paste the key:
   ```bash
   cp .env.example .env.local
   # then edit .env.local: RESEND_API_KEY=re_yourRealKey
   ```
4. Restart `npm run dev`. Submit the form — the email arrives in seconds.

The default `from` address is `onboarding@resend.dev`, which Resend
provisions for free without domain verification. Optionally verify your own
domain later under **Domains** for a branded sender like
`hello@jayeshkoli.dev`, then update `FROM` in
[`app/actions/send-message.ts`](app/actions/send-message.ts).

### Vercel deploy

1. Push the repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com/new).
3. Under **Project Settings → Environment Variables** add `RESEND_API_KEY`
   for **Production** (and **Preview**, if you want previews to send mail).
4. Deploy. Server actions run on Vercel's serverless runtime out of the box —
   no separate backend is needed.

If `RESEND_API_KEY` is unset, the form fails gracefully with a friendly
"Email service is not configured yet — please email directly" banner instead
of crashing.

## Production notes

- First-load JS ~441 kB (R3F + three.js dominate) — fine for a portfolio.
- Static export friendly: the page is fully prerendered (`○ Static`).
- All animations are client-only (`"use client"`); the SSR shell is a clean
  semantic skeleton for SEO.
- The blob `Canvas` is mounted only after a client-side capability check, so
  there's no hydration mismatch.
- The contact form ships as a server action — no API routes, no env-aware
  client code. The Resend key never leaves the server.

## License

Personal portfolio — all rights reserved by Jayesh Koli.
