import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Jayesh Koli",
  firstName: "Jayesh",
  lastName: "Koli",
  title: "Enterprise GenAI Engineer",
  subtitle: "Backend Systems & AI Governance",
  location: "Panvel, Navi Mumbai, India",
  email: "jkoli6704@gmail.com",
  phone: "+91 93724 68778",
  linkedin: "https://linkedin.com/in/jayesh-koli-042357227",
  github: "https://github.com/Jayesh12356",
  yearsExperience: "4+",
  usersServed: "10,000+",
  hourlyTagline: "Designing production-grade LLM systems for regulated enterprise.",
  intro:
    "I architect production GenAI systems at the intersection of finance, compliance, and reliability — fusing deterministic backend engineering with LLM-assisted decision flows.",
  about: [
    "Enterprise GenAI Engineer with 4+ years designing and deploying production-grade LLM systems for regulated enterprise workflows. I build AI-assisted finance and compliance systems with human-in-the-loop controls, auditability, and cost-aware architecture — all backed by a strong cloud and backend foundation.",
    "Currently at Jio Platforms (Reliance) shipping LLM-assisted financial decision workflows with deterministic fallbacks, RAG over policy documents with role-based access, and a centralized LLM evaluation/governance framework with prompt versioning, drift detection, hallucination guards, and rollback.",
    "Deep focus on retrieval quality (hybrid search + reranking), structured LLM I/O (JSON mode, Pydantic), trace-level observability (LangSmith / Langfuse-style), and semantic-cache-driven cost control.",
  ],
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export const contactPills = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "GitHub", value: "Jayesh12356", href: profile.github, icon: Github },
  { label: "LinkedIn", value: "jayesh-koli", href: profile.linkedin, icon: Linkedin },
  { label: "Location", value: "Panvel, Navi Mumbai", href: "#", icon: MapPin },
];

/**
 * The 4 expertise stat blocks (Image-2 inspired).
 * Percentages reflect self-rated proficiency depth from the CV skills section.
 */
export const expertise = [
  {
    index: "/01",
    title: "Backend & Systems",
    percent: 95,
    blurb: "Python, Node.js, FastAPI",
    detail:
      "Event-driven services, microservices, REST APIs powering 10k+ user platforms.",
  },
  {
    index: "/02",
    title: "GenAI & RAG",
    percent: 90,
    blurb: "LLMs · RAG · Governance",
    detail:
      "Production LLM systems with prompt versioning, drift detection, and rollback.",
  },
  {
    index: "/03",
    title: "Data & Cloud",
    percent: 80,
    blurb: "PostgreSQL · pgvector · Redis",
    detail:
      "Relational, vector, and event stores tuned for low-latency retrieval at scale.",
  },
  {
    index: "/04",
    title: "Frontend",
    percent: 85,
    blurb: "React · Next.js · Tailwind",
    detail:
      "Building fast, accessible internal dashboards and approval consoles.",
  },
];

export const skillTape = [
  "Python",
  "Node.js",
  "FastAPI",
  "RAG",
  "Hybrid Retrieval",
  "Reranking",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "Function Calling",
  "Structured Outputs",
  "SSE Streaming",
  "LLM-as-a-Judge",
  "Guardrails",
  "LLM Governance",
  "Prompt Versioning",
  "Embeddings",
  "pgvector",
  "PostgreSQL",
  "Kafka",
  "RabbitMQ",
  "Next.js",
  "React",
  "Redis",
  "OpenAPI",
  "Microservices",
  "RBAC",
  "SAP Integrations",
  "Tailwind CSS",
];

export const skillTapeSecondary = [
  "Human-in-the-Loop",
  "Drift Detection",
  "Hallucination Guards",
  "Confidence Routing",
  "Token Budgeting",
  "Semantic Cache",
  "PII Redaction",
  "Jailbreak Defense",
  "Trace Logging",
  "JSON Mode",
  "Pydantic Schemas",
  "Cohere Rerank",
  "BGE Rerankers",
  "HyDE",
  "Query Rewriting",
  "Recursive Chunking",
  "Semantic Chunking",
  "Pinecone",
  "Qdrant",
  "Weaviate",
  "FAISS",
  "Audit Logging",
  "Cost Monitoring",
  "Event-Driven",
  "Centralized Evaluation",
  "Rollback Capability",
  "Async Workflows",
  "Approval Consoles",
  "Real-time Dashboards",
  "Secure API Design",
  "Performance Optimization",
  "Role-based Retrieval",
  "Metadata Filtering",
  "Behavioral Monitoring",
];

export const skillCategories = [
  {
    title: "GenAI & LLM Engineering",
    items: [
      "LLMs (OpenAI GPT-4 / 4o, Anthropic Claude)",
      "Embeddings (text-embedding-3, BGE)",
      "Prompt Engineering (Few-shot, CoT, ReAct)",
      "Function Calling / Tool Use",
      "Structured Outputs (JSON Mode, Pydantic)",
      "Streaming Responses (SSE)",
      "Human-in-the-Loop Workflows",
    ],
  },
  {
    title: "RAG & Retrieval",
    items: [
      "Retrieval-Augmented Generation",
      "Hybrid Search (BM25 + Vector)",
      "Reranking (Cohere Rerank, BGE)",
      "Query Rewriting / HyDE",
      "Chunking (Recursive, Semantic, Sliding)",
      "Metadata Filtering",
      "Role-based Retrieval",
      "Semantic Caching",
    ],
  },
  {
    title: "LLM Ops & Governance",
    items: [
      "Prompt & Configuration Versioning",
      "Offline Regression Suites",
      "LLM-as-a-Judge Evaluation",
      "Drift & Hallucination Detection",
      "Trace-level Observability (LangSmith / Langfuse-style)",
      "Token & Cost Budgeting",
      "Rate Limiting",
      "Audit Logging",
      "Rollback Strategies",
      "Guardrails (Guardrails.ai, NeMo Guardrails)",
      "PII Redaction · Jailbreak Defense",
    ],
  },
  {
    title: "Frameworks & Orchestration",
    items: [
      "LangChain",
      "LlamaIndex",
      "LangGraph",
      "OpenAI SDK",
      "Anthropic SDK",
    ],
  },
  {
    title: "Backend & Systems",
    items: [
      "Python",
      "Node.js",
      "FastAPI",
      "Express.js",
      "REST APIs",
      "OpenAPI / Swagger",
      "Async / Event-Driven (Kafka, RabbitMQ)",
      "Microservices",
      "Secure API Design",
    ],
  },
  {
    title: "Data & Storage",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MariaDB",
      "Oracle",
      "Redis",
      "pgvector",
      "FAISS",
      "Pinecone",
      "Qdrant",
      "Weaviate",
    ],
  },
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
    ],
  },
  {
    title: "Enterprise Platforms",
    items: [
      "SAP Integrations",
      "Frappe Framework",
      "RBAC & Access Control",
      "Compliance Workflows",
    ],
  },
  {
    title: "Engineering Practices",
    items: [
      "Git",
      "Agile",
      "CI/CD",
      "Performance Optimization",
      "Audit Logging",
      "Cost Monitoring",
      "Reliability-first Design",
    ],
  },
];

export type WorkExperience = {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: { metric?: string; metricLabel?: string; text: string }[];
};

export const experience: WorkExperience[] = [
  {
    company: "Jio Platforms Limited",
    location: "Reliance Corporate Park, Navi Mumbai",
    role: "Software Engineer — Enterprise Backend & GenAI Systems",
    period: "Jun 2022 — Present",
    bullets: [
      {
        metric: "30%",
        metricLabel: "faster",
        text: "Designed and deployed enterprise-grade backend systems for finance, procurement, and corporate services workflows, improving response times through architectural and performance optimizations.",
      },
      {
        metric: "25%",
        metricLabel: "efficiency",
        text: "Built automated financial decision workflows integrating ML-assisted classification with deterministic validation rules and SAP-based approval systems — auditable, human-in-the-loop processing for compliance-sensitive expense proposals.",
      },
      {
        metric: "20%",
        metricLabel: "shorter cycles",
        text: "Architected a scalable financial management platform that reduced procurement cycle times, with extensibility for future commercialization and strict data integrity guarantees.",
      },
      {
        metric: "35%",
        metricLabel: "lower latency",
        text: "Developed event-driven services using RabbitMQ and Node.js to power real-time dashboards and notifications, improving information delivery while maintaining system reliability.",
      },
      {
        metric: "2",
        metricLabel: "GenAI systems shipped",
        text: "Shipped production GenAI surfaces — a RAG-grounded policy assistant and a centralized LLM Ops platform — to internal users, integrating prompt versioning, hallucination guards, and trace-level observability into the standard enterprise release lifecycle.",
      },
      {
        metric: "10k+",
        metricLabel: "employees",
        text: "Implemented RBAC across internal platforms enforcing strict data boundaries, and collaborated cross-functionally to deliver secure, scalable systems used company-wide.",
      },
    ],
  },
];

export type Project = {
  index: string;
  title: string;
  tagline: string;
  bullets: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Enterprise Financial Policy Assistant",
    tagline: "GenAI · RAG · Human-in-the-Loop",
    bullets: [
      "Designed an LLM-assisted financial analysis system grounded in internal policy documents using RAG, constraining responses to approved enterprise knowledge.",
      "Implemented role-based document retrieval, metadata filtering, and structured prompt templates to prevent unauthorized access and reduce hallucinations.",
      "Improved retrieval quality with hybrid search (BM25 + dense vectors over pgvector) and a reranking stage; tuned recursive + semantic chunking to keep grounding tight on adversarial finance queries.",
      "Streamed structured JSON outputs (Pydantic-validated) directly into the approval console via SSE, with token-level streaming for sub-second perceived latency on long answers.",
      "Introduced confidence-based routing and human-in-the-loop approval flows with full audit trails of prompts, retrieved context, model outputs, and decisions.",
      "Evaluated reliability through curated test cases and production feedback, monitoring correctness, latency, and token usage to optimize cost-performance.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "pgvector",
      "OpenAI",
      "Cohere Rerank",
      "Pydantic",
      "PostgreSQL",
      "RBAC",
    ],
  },
  {
    index: "02",
    title: "LLM Evaluation, Monitoring & Governance",
    tagline: "Centralized LLM Ops Framework",
    bullets: [
      "Built a centralized framework for testing, monitoring, and governing LLM behavior across enterprise applications.",
      "Implemented prompt and configuration versioning, treating GenAI behavior as code with traceable changes and rollback capability.",
      "Designed automated response-quality scoring pipelines using LLM-as-a-Judge rubrics (correctness, faithfulness, policy compliance) plus heuristic checks to detect hallucinations, retrieval failures, and drift.",
      "Instrumented end-to-end trace logging across prompt → retrieval → generation → output (LangSmith / Langfuse-style spans) for post-hoc replay and root-cause analysis on failed runs.",
      "Monitored latency, token usage, and error rates with semantic caching and per-tenant budgets to enforce cost and reliability budgets for production GenAI systems.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Langfuse",
      "OpenAPI",
      "CI/CD",
    ],
  },
];

export type EducationItem = {
  degree: string;
  institute: string;
  period: string;
  score: string;
};

export const education: EducationItem[] = [
  {
    degree: "M.Tech — Software Systems",
    institute: "BITS Pilani (WILP)",
    period: "Jun 2022 — Jun 2026",
    score: "CGPA 8.1",
  },
  {
    degree: "B.Sc. Computer Science",
    institute: "Pillai College of Arts, Commerce & Science (Autonomous)",
    period: "Jun 2019 — Mar 2022",
    score: "CGPA 9.0",
  },
  {
    degree: "Higher Secondary — Science (CBSE)",
    institute: "Kendriya Vidyalaya Jr. College",
    period: "Jun 2017 — Mar 2019",
    score: "90%",
  },
  {
    degree: "Secondary School (CBSE)",
    institute: "Datta Meghe World Academy School",
    period: "Jun 2016 — Mar 2017",
    score: "92.8%",
  },
];

export const certifications = [
  {
    title: "IBM Generative AI Engineering",
    issuer: "Coursera · IBM",
    badge: "GENAI",
  },
  {
    title: "Server-Side Development with Node.js, Express & MongoDB",
    issuer: "Coursera",
    badge: "BACKEND",
  },
  {
    title: "The Ultimate React Course — React, Next.js, Redux & More",
    issuer: "Udemy",
    badge: "FRONTEND",
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
