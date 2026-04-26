import type { Metadata } from "next";
import { anton, geist, jetbrainsMono } from "./fonts";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayesh Koli — Enterprise GenAI Engineer",
  description:
    "Backend systems & AI governance. Production-grade LLM systems for regulated enterprise workflows.",
  metadataBase: new URL("https://jayeshkoli.dev"),
  openGraph: {
    title: "Jayesh Koli — Enterprise GenAI Engineer",
    description:
      "Backend systems & AI governance. Production-grade LLM systems for regulated enterprise workflows.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
