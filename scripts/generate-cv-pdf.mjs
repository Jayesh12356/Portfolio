/**
 * Generates public/Jayesh-Koli-CV.pdf — a clean, single-page (tall) PDF resume
 * rendered with pdfkit. Black-and-white typography only, no accent colors.
 *
 * Style is modeled on a standard agency-style resume:
 *   - Bold name at top, role + contact split-aligned
 *   - Section headings: bold 12pt with a thin rule directly underneath
 *   - Job / project entries: bold title, italic company, italic right-aligned dates
 *   - Bullets: small round dots, tight consistent line spacing
 *   - Skills: bold category label + comma-separated items
 *
 * Re-run any time cv.md content changes:
 *   npm run build:cv
 */

import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

// ---------- Geometry ----------
const W = 612; // 8.5 in
const H = 1610; // ~22.4 in — single tall page; sized so the bottom margin
//                feels balanced (no large empty band beneath the content)
const M = 54; // ~0.75 in — slightly wider margin than 50 for breathing room
// Bottom margin = 0 disables auto pagination entirely; we manage the
// footer ourselves and the page is sized to fit all content.
const BM = 0;
const CW = W - 2 * M; // content width

// ---------- Palette (black & white only) ----------
const BLACK = "#000000";
const TEXT = "#1A1A1A"; // near-black body
const META = "#555555"; // medium grey for italics, dates, sublines
const FOOTER = "#999999";

// ---------- Output ----------
const OUT = resolve(process.cwd(), "public/Jayesh-Koli-CV.pdf");
mkdirSync(dirname(OUT), { recursive: true });

const doc = new PDFDocument({
  size: [W, H],
  margins: { top: M, bottom: BM, left: M, right: M },
  bufferPages: true,
  autoFirstPage: true,
  info: {
    Title: "Jayesh Koli — Curriculum Vitae",
    Author: "Jayesh Koli",
    Subject: "Enterprise GenAI Engineer",
    Keywords:
      "GenAI, RAG, LLM Ops, Backend, FastAPI, Python, BITS Pilani, Jio Platforms",
  },
});

doc.pipe(createWriteStream(OUT));

// ---------- Helpers ----------
function rule(yPos, color = BLACK, weight = 0.6) {
  doc
    .moveTo(M, yPos)
    .lineTo(W - M, yPos)
    .lineWidth(weight)
    .strokeColor(color)
    .stroke();
}

function gap(amount = 4) {
  doc.y += amount;
}

/** Section heading: bold 12pt, single thin rule directly underneath. */
function section(title) {
  gap(8);
  const yStart = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(BLACK)
    .text(title, M, yStart, { width: CW });
  const yAfter = doc.y;
  rule(yAfter + 1, BLACK, 0.6);
  doc.y = yAfter + 7;
}

function paragraph(text) {
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text(text, M, doc.y, {
      width: CW,
      lineGap: 1.4,
      align: "justify",
    });
  gap(3);
}

/** Bulleted body line. */
function bullet(text) {
  const startY = doc.y;
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(BLACK)
    .text("\u2022", M + 4, startY, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text(text, M + 14, startY, {
      width: CW - 14,
      lineGap: 1.4,
      align: "left",
    });
  // No extra gap between bullets — lineGap inside the bullet is enough.
}

/**
 * Entry header for jobs / projects:
 *  - Bold title on the left
 *  - Italic dates right-aligned on the same line (optional)
 *  - Italic company / tagline on the line below
 */
function entry({ title, subline, dates }) {
  const startY = doc.y;
  if (dates) {
    doc
      .font("Helvetica-Bold")
      .fontSize(10.5)
      .fillColor(BLACK)
      .text(title, M, startY, {
        width: CW * 0.66,
        lineBreak: false,
      });
    doc
      .font("Helvetica-Oblique")
      .fontSize(9.5)
      .fillColor(META)
      .text(dates, M + CW * 0.66, startY, {
        width: CW * 0.34,
        align: "right",
        lineBreak: false,
      });
    doc.y = startY + 13;
  } else {
    doc
      .font("Helvetica-Bold")
      .fontSize(10.5)
      .fillColor(BLACK)
      .text(title, M, startY, { width: CW });
  }
  if (subline) {
    doc
      .font("Helvetica-Oblique")
      .fontSize(9.5)
      .fillColor(META)
      .text(subline, M, doc.y, { width: CW });
    gap(3);
  }
}

/** Skills category line: bold label + comma-separated items, wrapped tight. */
function skillRow(label, items) {
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(BLACK)
    .text(`${label}:  `, M, doc.y, { continued: true });
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text(items, { lineGap: 1.4 });
  gap(2);
}

/** Two-column row: left bold + right italic-meta, both single line. */
function leftRight({ left, right, leftSize = 10, rightSize = 9.5, leftCol = 0.66 }) {
  const startY = doc.y;
  const lw = CW * leftCol;
  const rw = CW - lw;
  doc
    .font("Helvetica-Bold")
    .fontSize(leftSize)
    .fillColor(BLACK)
    .text(left, M, startY, { width: lw, lineBreak: false });
  doc
    .font("Helvetica-Oblique")
    .fontSize(rightSize)
    .fillColor(META)
    .text(right, M + lw, startY, {
      width: rw,
      align: "right",
      lineBreak: false,
    });
  doc.y = startY + leftSize + 3;
}

// ---------- HEADER ----------
doc
  .font("Helvetica-Bold")
  .fontSize(22)
  .fillColor(BLACK)
  .text("Jayesh Koli", M, M);

doc.y += 1;

doc
  .font("Helvetica-Bold")
  .fontSize(11)
  .fillColor(BLACK)
  .text(
    "Enterprise GenAI Engineer  |  Backend Systems & AI Governance",
    M,
    doc.y,
    { width: CW },
  );

gap(5);

// Address line: location left + email right
{
  const y = doc.y;
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text("Panvel, Navi Mumbai, India", M, y, {
      width: CW * 0.6,
      lineBreak: false,
    });
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text("jkoli6704@gmail.com", M + CW * 0.6, y, {
      width: CW * 0.4,
      align: "right",
      lineBreak: false,
    });
  doc.y = y + 12;
}

// Phone + GitHub
{
  const y = doc.y;
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text("+91 93724 68778", M, y, { width: CW * 0.6, lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text("github.com/Jayesh12356", M + CW * 0.6, y, {
      width: CW * 0.4,
      align: "right",
      lineBreak: false,
    });
  doc.y = y + 12;
}

// LinkedIn full line
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(TEXT)
  .text("linkedin.com/in/jayesh-koli-042357227", M, doc.y, { width: CW });

// ---------- PROFESSIONAL SUMMARY ----------
section("Professional Summary");
paragraph(
  "Enterprise GenAI Engineer with a strong backend and cloud foundation, with 4+ years designing and deploying production-grade LLM systems for regulated enterprise workflows. Proven ability to integrate AI into finance and compliance-sensitive systems using human-in-the-loop controls, auditability, cost-aware architecture, and reliability-first design. Background in large-scale enterprise platforms serving 10,000+ users across finance, procurement, and corporate services.",
);
paragraph(
  "Currently building production GenAI systems at Jio Platforms (Reliance) \u2014 LLM-assisted financial decision workflows with deterministic fallbacks, RAG over policy documents with role-based access controls, and a centralized LLM evaluation/governance framework with prompt versioning, drift detection, hallucination guards, and rollback. Deep focus on retrieval quality (hybrid search + reranking), structured LLM I/O (JSON mode, Pydantic), trace-level observability, and semantic-cache-driven cost control.",
);

// ---------- ENTERPRISE GENAI CAPABILITIES ----------
section("Enterprise GenAI Capabilities");
[
  "Designed LLM-powered decision support systems with deterministic fallbacks, confidence-based routing, and human approval workflows for compliance-sensitive use cases.",
  "Built Retrieval-Augmented Generation (RAG) pipelines over internal enterprise data with hybrid retrieval (BM25 + dense vectors), reranking, and strict role-based access controls.",
  "Implemented structured LLM outputs (JSON mode, Pydantic schemas) and SSE token streaming so model responses can flow safely into downstream backend systems and real-time approval consoles.",
  "Established LLM evaluation and governance frameworks: offline regression suites, LLM-as-a-Judge scoring, drift and hallucination detection, prompt/configuration versioning, and rollback strategies.",
  "Integrated GenAI services into event-driven backend architectures with retries, circuit isolation, semantic caching for cost control, rate limiting, and full trace-level observability across prompt, retrieval, and generation steps.",
  "Deployed cloud-native GenAI applications with audit logging, PII redaction, jailbreak and topic-boundary guardrails, and granular cost and token-budget enforcement.",
].forEach(bullet);

// ---------- WORK EXPERIENCE ----------
section("Work Experience");
entry({
  title: "Software Engineer \u2014 Enterprise Backend & GenAI Systems",
  subline: "Jio Platforms Limited (Reliance Corporate Park), Navi Mumbai, India",
  dates: "Jun 2022 \u2014 Present",
});
[
  "Designed and deployed enterprise-grade backend systems for finance, procurement, and corporate services workflows, improving system response times by 30% through architectural and performance optimizations.",
  "Built automated financial decision workflows integrating LLM-assisted classification with deterministic validation rules and SAP-based approval systems, enabling auditable, human-in-the-loop processing for compliance-sensitive expense proposals and improving workflow efficiency by 25%.",
  "Architected a scalable financial management platform that reduced procurement cycle times by 20%, with extensibility for future commercialization and strict data integrity guarantees.",
  "Developed event-driven enterprise services using RabbitMQ and Node.js to power real-time dashboards and notifications, improving information delivery latency by 35% while maintaining system reliability.",
  "Shipped production GenAI surfaces (RAG-grounded policy assistant + LLM Ops platform) to internal users, integrating prompt versioning, hallucination guards, and trace-level observability into the standard enterprise release lifecycle.",
  "Implemented role-based access control (RBAC) and permission management across internal platforms, enforcing strict data boundaries and eliminating duplicate or inconsistent authorization states.",
  "Collaborated with cross-functional teams across engineering, finance, and operations to deliver secure, scalable systems used by 10,000+ employees.",
].forEach(bullet);

// ---------- PROJECTS ----------
section("Projects");

entry({
  title: "Enterprise Financial Policy Assistant (GenAI + RAG)",
  subline:
    "GenAI \u00B7 RAG \u00B7 Hybrid Retrieval \u00B7 Human-in-the-Loop \u00B7 LLM Governance",
});
[
  "Designed an LLM-assisted financial analysis system grounded in internal policy documents using Retrieval-Augmented Generation (RAG), ensuring responses were constrained to approved enterprise knowledge sources.",
  "Implemented role-based document retrieval, metadata filtering, and structured prompt templates to prevent unauthorized access and reduce hallucinations in compliance-critical use cases.",
  "Improved retrieval quality with hybrid search (BM25 + dense vectors over pgvector) and a reranking stage, plus tuned chunking strategies (recursive + semantic) to keep grounding tight on adversarial finance queries.",
  "Streamed structured JSON outputs (Pydantic-validated) directly into the approval console via Server-Sent Events, with token-level streaming for sub-second perceived latency on long answers.",
  "Introduced confidence-based routing and human-in-the-loop approval workflows, maintaining full audit trails of prompts, retrieved context, model outputs, and final decisions.",
  "Evaluated model reliability using curated test cases and production feedback signals, monitoring correctness, latency, and token usage to optimize cost-performance tradeoffs.",
].forEach(bullet);

gap(4);

entry({
  title: "LLM Evaluation, Monitoring & Governance Framework",
  subline:
    "Centralized LLM Ops \u00B7 Trace Observability \u00B7 LLM-as-a-Judge \u00B7 Cost Budgeting",
});
[
  "Built a centralized framework for testing, monitoring, and governing LLM behavior across enterprise applications.",
  "Implemented prompt and configuration versioning, treating GenAI behavior as code with traceable changes and rollback capability.",
  "Designed automated response quality scoring pipelines using LLM-as-a-Judge rubrics (correctness, faithfulness, policy compliance) alongside heuristic checks to detect hallucinations, retrieval failures, and behavioral drift over time.",
  "Instrumented end-to-end trace logging across prompt, retrieval, generation, and output (LangSmith / Langfuse-style spans) to enable post-hoc replay and root-cause analysis on failed runs.",
  "Monitored latency, token usage, and error rates with semantic caching and per-tenant budgets to enforce cost and reliability constraints for production GenAI systems.",
].forEach(bullet);

// ---------- EDUCATION ----------
section("Education");
[
  {
    degree: "M.Tech \u2014 Software Systems",
    inst: "BITS Pilani (WILP)",
    period: "Jun 2022 \u2014 Jun 2026",
    score: "CGPA 8.1",
  },
  {
    degree: "B.Sc. Computer Science",
    inst: "Pillai College of Arts, Commerce & Science (Autonomous)",
    period: "Jun 2019 \u2014 Mar 2022",
    score: "CGPA 9.0",
  },
  {
    degree: "Higher Secondary \u2014 Science (CBSE)",
    inst: "Kendriya Vidyalaya Jr. College",
    period: "Jun 2017 \u2014 Mar 2019",
    score: "90%",
  },
  {
    degree: "Secondary School (CBSE)",
    inst: "Datta Meghe World Academy School",
    period: "Jun 2016 \u2014 Mar 2017",
    score: "92.8%",
  },
].forEach(({ degree, inst, period, score }) => {
  leftRight({
    left: degree,
    right: `${score}  \u00B7  ${period}`,
    leftSize: 10,
    rightSize: 9.5,
    leftCol: 0.62,
  });
  doc
    .font("Helvetica-Oblique")
    .fontSize(9)
    .fillColor(META)
    .text(inst, M, doc.y, { width: CW });
  gap(5);
});

// ---------- SKILLS ----------
section("Skills");
[
  [
    "GenAI & LLM Engineering",
    "LLMs (OpenAI GPT-4 / 4o, Anthropic Claude), Embeddings (text-embedding-3, BGE), Prompt Engineering (Few-shot, Chain-of-Thought, ReAct), Function Calling / Tool Use, Structured Outputs (JSON Mode, Pydantic schemas), Streaming Responses (SSE), Human-in-the-Loop Workflows",
  ],
  [
    "RAG & Retrieval",
    "Retrieval-Augmented Generation, Hybrid Search (BM25 + Vector), Reranking (Cohere Rerank, BGE rerankers), Query Rewriting / HyDE, Chunking Strategies (Recursive, Semantic, Sliding Window), Metadata Filtering, Role-based Retrieval, Semantic Caching",
  ],
  [
    "LLM Ops & Governance",
    "Prompt & Configuration Versioning, Offline Regression Suites, LLM-as-a-Judge Evaluation, Drift Detection, Hallucination Guards, Trace-level Observability (LangSmith / Langfuse-style), Token & Cost Budgeting, Rate Limiting, Audit Logging, Rollback Strategies, Guardrails (Guardrails.ai, NeMo Guardrails), PII Redaction, Jailbreak & Topic-boundary Defense",
  ],
  [
    "Frameworks & Orchestration",
    "LangChain, LlamaIndex, LangGraph, OpenAI SDK, Anthropic SDK",
  ],
  [
    "Backend & Systems",
    "Python, Node.js, FastAPI, Express.js, REST APIs, OpenAPI / Swagger, Async & Event-Driven Architecture (Kafka, RabbitMQ), Microservices, Secure API Design",
  ],
  [
    "Data & Storage",
    "PostgreSQL, MongoDB, MariaDB, Oracle, Redis, pgvector, FAISS, Pinecone, Qdrant, Weaviate",
  ],
  [
    "Frontend",
    "JavaScript, TypeScript, React.js, Next.js, Redux, Tailwind CSS",
  ],
  [
    "Enterprise Platforms",
    "SAP Integrations, Frappe Framework, RBAC & Access Control, Compliance Workflows",
  ],
  [
    "Engineering Practices",
    "Git, Agile, CI/CD, Performance Optimization, Audit Logging, Cost Monitoring, Reliability-first Design",
  ],
].forEach(([label, items]) => skillRow(label, items));

// ---------- CERTIFICATIONS ----------
section("Certifications");
[
  ["IBM Generative AI Engineering", "Coursera"],
  ["Server Side Development with Node.js, Express.js & MongoDB", "Coursera"],
  [
    "The Ultimate React Course \u2014 React, Next.js, Redux & More",
    "Udemy",
  ],
].forEach(([title, issuer]) => {
  leftRight({
    left: title,
    right: issuer,
    leftSize: 10,
    rightSize: 9.5,
    leftCol: 0.74,
  });
});

// ---------- FOOTER ----------
const finalY = doc.y;
// Footer sits inside the (very small) bottom margin so it never
// triggers an auto page break.
doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(FOOTER)
  .text(
    "Jayesh Koli  \u00B7  jkoli6704@gmail.com  \u00B7  +91 93724 68778",
    M,
    H - 12,
    { width: CW, align: "center", lineBreak: false },
  );

const range = doc.bufferedPageRange();
const pageCount = range.count;
const overflow = pageCount > 1;

doc.end();

console.log(`Wrote ${OUT}`);
console.log(
  `Pages: ${pageCount}  \u00B7  Final content y: ${finalY.toFixed(1)} pt  \u00B7  Page height: ${H} pt  \u00B7  Headroom: ${(H - finalY).toFixed(1)} pt`,
);
if (overflow) {
  console.warn(
    "[warn] PDF generated more than one page. Increase H or compact content.",
  );
}
