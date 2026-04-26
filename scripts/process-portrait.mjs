/**
 * Portrait pipeline → public/me.jpg
 *
 * Source: linkdin dp.png (or fallback aliases)
 * Output: 1200x1500 JPEG, quality 96, 4:4:4 chroma, mozjpeg-encoded.
 *
 * Design notes
 * ------------
 * The Hero panel (components/sections/Hero.tsx) ALREADY layers two CSS
 * gradients + an inset vignette on top of this image, so the JPEG itself
 * does NOT need to be aggressively darkened or desaturated. Earlier passes
 * applied modulate({ brightness: 0.88, saturation: 0.82 }) plus a heavy
 * radial overlay, which double-dimmed the portrait.
 *
 * Current tuning keeps the original look essentially intact:
 *  - tonal modulation kept very close to 1.0 (subtle, brand-leaning)
 *  - linear() pulls highlights gently, no shadow crush
 *  - the SVG overlay is now lighter, so most of the mood comes from CSS
 *  - resolution bumped to 1200x1500 (better on 2x/3x displays)
 *  - jpeg(quality 96, chromaSubsampling 4:4:4, mozjpeg) preserves edges
 *  - a final tiny sharpen recovers downsample softness
 */

import sharp from "sharp";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const candidates = [
  "linkdin dp.png",
  "linkedin dp.png",
  "assets/c__Learnings_Projects_portfolio_linkdin_dp.png",
];

const SRC = candidates.find((p) => existsSync(resolve(process.cwd(), p)));
if (!SRC) {
  console.error("Source image not found. Tried:\n  " + candidates.join("\n  "));
  process.exit(1);
}

const OUT = "public/me.jpg";
const W = 1200;
const H = 1500;

const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <defs>
       <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
         <stop offset="0%"   stop-color="#0a0a0a" stop-opacity="0.55"/>
         <stop offset="14%"  stop-color="#0a0a0a" stop-opacity="0.18"/>
         <stop offset="32%"  stop-color="#0a0a0a" stop-opacity="0.06"/>
         <stop offset="58%"  stop-color="#0a0a0a" stop-opacity="0.18"/>
         <stop offset="80%"  stop-color="#0a0a0a" stop-opacity="0.42"/>
         <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.62"/>
       </linearGradient>
       <radialGradient id="v" cx="50%" cy="36%" r="78%">
         <stop offset="48%"  stop-color="#0a0a0a" stop-opacity="0"/>
         <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.55"/>
       </radialGradient>
     </defs>
     <rect width="100%" height="100%" fill="url(#g)"/>
     <rect width="100%" height="100%" fill="url(#v)"/>
   </svg>`,
);

await sharp(SRC)
  .resize(W, H, {
    fit: "cover",
    position: "top",
    kernel: sharp.kernel.lanczos3,
    fastShrinkOnLoad: false,
  })
  .modulate({ brightness: 1.0, saturation: 0.96 })
  .linear(1.03, -2)
  .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.6 })
  .composite([{ input: overlay, blend: "over" }])
  .jpeg({
    quality: 96,
    mozjpeg: true,
    chromaSubsampling: "4:4:4",
    progressive: true,
  })
  .toFile(OUT);

console.log(`Wrote ${OUT} from "${SRC}" (${W}x${H})`);
