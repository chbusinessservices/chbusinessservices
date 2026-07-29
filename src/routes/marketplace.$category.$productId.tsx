import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { createHmac } from "node:crypto";
import { AnimatedSection } from "~/components/AnimatedSection";
import {
  allProducts,
  categoryLookup,
  categoryDescriptions,
  formatPrice,
  STRIPE_LINKS,
  getStripeTier,
  type Product,
} from "~/lib/marketplace-data";
import { withSuccessUrl } from "~/lib/fulfillment";
import { pageHead, productLd, breadcrumbLd, SITE_URL } from "~/lib/seo";

/* ═══════════════════════════════════════════
   Admin Auth Server Function
   ═══════════════════════════════════════════ */

const COOKIE_NAME = "admin_auth";

function getSecret(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function verifyToken(token: string): boolean {
  try {
    const secret = getSecret();
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const { p, s } = JSON.parse(raw);
    const expected = createHmac("sha256", secret).update(p).digest("hex");
    if (s !== expected) return false;
    const { exp } = JSON.parse(p);
    return exp > Date.now();
  } catch {
    return false;
  }
}

const checkAdminAuth = createServerFn().handler(async () => {
  const token = getCookie(COOKIE_NAME);
  if (!token) return { isAdmin: false };
  return { isAdmin: verifyToken(token) };
});

/* ═══════════════════════════════════════════
   Mock Preview Content Generator
   ═══════════════════════════════════════════ */

interface PreviewContent {
  agentDefinitions: { name: string; role: string; instructions: string }[];
  prompts: { title: string; prompt: string; useCase: string }[];
  configFiles: { filename: string; description: string; snippet: string }[];
  setupSteps: { step: number; title: string; detail: string }[];
  directoryStructure: string;
  deliverables: string[];
}

function generatePreviewContent(product: Product): PreviewContent {
  const nameSlug = product.name.toLowerCase().replace(/\s+/g, "-");
  const catName = categoryLookup[product.category] || product.category;

  const agentDefinitions = [
    {
      name: `${product.name} Core Agent`,
      role: `Primary orchestrator for the ${product.name} system`,
      instructions: `You are the core agent for "${product.name}". Your job is to coordinate all sub-agents, manage task queues, handle error recovery, and ensure the system runs reliably. Always prioritize data integrity and user experience. When encountering unknown scenarios, fall back to the human handoff protocol.`,
    },
    {
      name: `Data Pipeline Agent`,
      role: `Handles all data ingestion, transformation, and validation`,
      instructions: `You manage the ETL pipeline for ${product.name}. Validate incoming data against schema definitions, transform raw inputs into structured records, and push to the appropriate storage layer. Flag anomalies to the monitoring dashboard. Retry failed operations with exponential backoff (max 3 attempts).`,
    },
    {
      name: `Notification & Alert Agent`,
      role: `Manages all outbound communications and alerting`,
      instructions: `You handle email, SMS, Slack, and webhook notifications. Follow the configured delivery preferences per user. Rate-limit notifications to prevent fatigue. For critical alerts, escalate through the configured chain: email → SMS → phone call. Log all deliveries for audit.`,
    },
  ];

  const prompts = [
    {
      title: "System Prompt — Main Workflow",
      prompt: `You are an AI assistant powering "${product.name}". You operate within the ${catName} domain.\n\nRules:\n1. Always verify inputs before processing\n2. Maintain conversation context across sessions\n3. Escalate to human when confidence < 80%\n4. Log all decisions for audit trail\n5. Follow the configured brand voice and tone guidelines\n\nCurrent mode: PRODUCTION`,
      useCase: "Initializes the main AI workflow for the business kit",
    },
    {
      title: "Prompt — Lead Qualification",
      prompt: `Analyze the following lead based on:\n- Company size\n- Industry fit\n- Budget signals\n- Timeline urgency\n- Decision-maker access\n\nOutput a score (1–100) and recommended next action. If score > 70, route to sales. If 40–70, enter nurture sequence. If < 40, archive with notes.\n\nLead data: {{lead_data}}`,
      useCase: "Used in automated lead scoring and routing workflows",
    },
    {
      title: "Prompt — Content Generation",
      prompt: `Generate ${catName} content optimized for the following:\n- Target keyword: {{keyword}}\n- Audience: {{audience}}\n- Tone: Professional but accessible\n- Length: {{length}} words\n- Include: {{sections}} sections with actionable takeaways\n\nResearch recent trends in ${product.category} before writing. Cite sources where applicable.`,
      useCase: "Powers the content generation module of the kit",
    },
  ];

  const configFiles = [
    {
      filename: `${nameSlug}.config.yaml`,
      description: "Master configuration file — controls all kit behavior",
      snippet: `# ${product.name} Configuration
kit:
  name: "${product.name}"
  version: "2.1.0"
  environment: production

integrations:
  crm:
    provider: hubspot
    api_key: \${HUBSPOT_API_KEY}
  email:
    provider: sendgrid
    api_key: \${SENDGRID_API_KEY}
  payment:
    provider: stripe
    secret_key: \${STRIPE_SECRET_KEY}

agents:
  core_agent:
    model: claude-sonnet-4-20250514
    temperature: 0.3
    max_tokens: 4096
  data_pipeline:
    batch_size: 100
    retry_attempts: 3
    timeout_seconds: 30

notifications:
  email: true
  sms: false
  slack_webhook: \${SLACK_WEBHOOK_URL}
  digest_frequency: daily`,
    },
    {
      filename: `.env.example`,
      description: "Environment variables template — copy to .env and fill in your keys",
      snippet: `# ${product.name} — Environment Variables
# Copy this to .env and replace placeholder values

# Core
KIT_ENV=production
LOG_LEVEL=info

# API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
HUBSPOT_API_KEY=...
SENDGRID_API_KEY=...
STRIPE_SECRET_KEY=sk_live_...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/${nameSlug}

# Optional
SENTRY_DSN=
REDIS_URL=`,
    },
    {
      filename: `docker-compose.yml`,
      description: "Docker Compose setup for local development and production deployment",
      snippet: `version: "3.9"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${nameSlug}
      POSTGRES_USER: kit_user
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
    },
  ];

  const setupSteps = [
    {
      step: 1,
      title: "Clone and Configure",
      detail: `Clone the repository and copy \`.env.example\` to \`.env\`. Fill in your API keys for Stripe, SendGrid, and your CRM. Run \`docker-compose up -d\` to start the database and Redis. The kit comes pre-configured for ${catName} workflows — adjust the \`${nameSlug}.config.yaml\` to customize behavior for your specific use case.`,
    },
    {
      step: 2,
      title: "Connect Your Integrations",
      detail: `Log into the admin dashboard at \`/admin\` and navigate to Integrations. Connect your Stripe account for payment processing, your email provider (SendGrid or Mailgun), and your CRM (HubSpot, Salesforce, or Pipedrive). Each integration includes a "test connection" button — verify all connections before proceeding.`,
    },
    {
      step: 3,
      title: "Customize AI Prompts & Agents",
      detail: `Open the \`prompts/\` directory and review the default prompts. Each prompt file includes comments explaining how to customize for your business. The core agent prompt in \`prompts/system.txt\` controls the overall behavior — update the brand voice, escalation rules, and domain-specific instructions. Test prompts in the built-in Playground at \`/admin/playground\`.`,
    },
    {
      step: 4,
      title: "Deploy and Monitor",
      detail: `Deploy to your hosting provider of choice (Vercel, Railway, or your own VPS). The kit includes a \`docker-compose.prod.yml\` for production deployments. After deploying, monitor the health dashboard at \`/admin/health\` for the first 48 hours. Set up your alerting thresholds in \`config/alerts.yaml\` — we recommend starting with conservative thresholds and tightening as you establish baselines.`,
    },
  ];

  const directoryStructure = `${nameSlug}/
 README.md
 LICENSE
 docker-compose.yml
 docker-compose.prod.yml
 Dockerfile
 .env.example
 ${nameSlug}.config.yaml
 package.json
 src/
   ├── agents/
   │   ├── core-agent.ts
   │   ├── data-pipeline.ts
   │   └── notifications.ts
   ├── prompts/
   │   ├── system.txt
   │   ├── lead-qualification.txt
   │   └── content-generation.txt
   ├── integrations/
   │   ├── crm.ts
   │   ├── email.ts
   │   └── payment.ts
   ├── workflows/
   │   ├── main-workflow.ts
   │   └── scheduled-jobs.ts
   └── admin/
       ├── dashboard.tsx
       ├── playground.tsx
       └── health.tsx
 config/
   ├── alerts.yaml
   └── schema.json
 tests/
   ├── unit/
   └── integration/
 docs/
    ├── setup.md
    ├── api-reference.md
    └── customization.md`;

  const deliverables = [
    "Full source code (TypeScript, React, Node.js)",
    "Docker Compose files (dev + production)",
    "Pre-built AI agent definitions (3 agents)",
    "Prompt library (3 production-ready prompts)",
    "Integration connectors (CRM, email, payment)",
    "Admin dashboard with Playground and Health monitor",
    "Comprehensive documentation (setup, API, customization)",
    "30 days of email support",
    "12 months of updates and security patches",
  ];

  return {
    agentDefinitions,
    prompts,
    configFiles,
    setupSteps,
    directoryStructure,
    deliverables,
  };
}

/* ═══════════════════════════════════════════
   ROUTE
   ═══════════════════════════════════════════ */

export const Route = createFileRoute("/marketplace/$category/$productId")({
  component: ProductDetailPage,
  head: ({ params }) => {
    const product = allProducts[params.category]?.find((p) => p.id === params.productId);
    const title = product
      ? `${product.name} — ${formatPrice(product.price)} | CH Business Services Marketplace`
      : "Product — CH Business Services Marketplace";
    const desc = product?.description || "View product details and preview AI business kits.";
    const path = `/marketplace/${params.category}/${params.productId}`;
    const url = `${SITE_URL}${path}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "CH Business Services" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [
        { rel: "canonical", href: url },
      ],
    };
  },
});

function ProductDetailPage() {
  const { category, productId } = Route.useParams();
  const displayName = categoryLookup[category];
  const product = allProducts[category]?.find((p) => p.id === productId);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);

  useEffect(() => {
    checkAdminAuth().then((res) => setIsAdmin(res.isAdmin)).catch(() => {});
  }, []);

  const _stripeBaseUrl =
    product?.stripeLink || STRIPE_LINKS[getStripeTier(product?.price ?? 0)];
  const stripeUrl = withSuccessUrl(_stripeBaseUrl, getStripeTier(product?.price ?? 0));

  const handlePreview = () => {
    if (!product) return;
    setPreviewContent(generatePreviewContent(product));
    setShowPreview(true);
  };

  // Not found state
  if (!displayName || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="text-7xl font-bold text-gray-100">404</div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
            Product not found
          </h1>
          <p className="mt-3 text-gray-600">
            We couldn't find that product. Browse all available products below.
          </p>
          <div className="mt-6">
            <Link to="/marketplace/$category" params={{ category }} className="btn-primary">
              Browse {displayName || "category"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      {product && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                productLd({
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  url: `${SITE_URL}/marketplace/${category}/${productId}`,
                  category: categoryLookup[product.category] || product.category,
                })
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                breadcrumbLd([
                  { name: "Home", url: SITE_URL },
                  { name: "Marketplace", url: `${SITE_URL}/marketplace` },
                  { name: categoryLookup[product.category] || product.category, url: `${SITE_URL}/marketplace/${product.category}` },
                  { name: product.name, url: `${SITE_URL}/marketplace/${category}/${productId}` },
                ])
              ),
            }}
          />
        </>
      )}
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Link to="/marketplace" className="hover:text-indigo-600 transition-colors">
                  Marketplace
                </Link>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link
                  to="/marketplace/$category"
                  params={{ category }}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {displayName}
                </Link>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
                  {product.name}
                </span>
              </div>

              {/* Badges */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {displayName}
                </span>
                {product.popular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    Popular
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4">
                <span className="font-mono text-4xl font-bold text-indigo-600">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-2 text-sm text-gray-400">one-time purchase</span>
              </div>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ Features & Details ═══ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  What's included
                </h2>
                <p className="mt-2 text-gray-600">
                  Everything you need to launch and run this AI-powered business.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Preview this kit section */}
              <AnimatedSection delay={200}>
                <div className="mt-12 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-white p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Preview this kit</h3>
                      <p className="text-sm text-gray-500">
                        {isAdmin
                          ? "View the full product contents including agents, prompts, configs, and setup guide."
                          : "Sign in as admin to preview the full product contents."}
                      </p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={handlePreview}
                      className="mt-5 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Preview Product Contents
                    </button>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar — Buy card */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={150} direction="right">
                <div className="sticky top-24 rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm">
                  <div className="text-center">
                    <span className="font-mono text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <p className="mt-1 text-sm text-gray-500">One-time purchase • Lifetime access</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      "Full source code included",
                      "Docker & deployment configs",
                      "AI prompts & agent definitions",
                      "Integration setup guides",
                      "30 days email support",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={stripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      Buy Now — {formatPrice(product.price)}
                    </a>
                    <Link
                      to="/marketplace/$category"
                      params={{ category }}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
                    >
                      ← Back to {displayName}
                    </Link>
                  </div>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    Secure checkout via Stripe. 30-day satisfaction guarantee.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Admin Preview ═══ */}
      {showPreview && previewContent && (
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  🔒 Admin Preview
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Product Preview
                </h2>
                <p className="mt-3 text-gray-600">
                  Full contents of the <strong>{product.name}</strong> kit — visible to admins only.
                </p>
              </div>
            </AnimatedSection>

            {/* Agent Definitions */}
            <AnimatedSection delay={100}>
              <div className="mt-12">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-sm font-bold">
                    1
                  </span>
                  Agent Definitions
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {previewContent.agentDefinitions.map((agent) => (
                    <div
                      key={agent.name}
                      className="card-premium p-6"
                    >
                      <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                      <p className="mt-1 text-xs font-medium text-indigo-600 uppercase tracking-wider">{agent.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{agent.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Prompts */}
            <AnimatedSection delay={200}>
              <div className="mt-14">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 text-sm font-bold">
                    2
                  </span>
                  AI Prompts
                </h3>
                <div className="mt-5 space-y-5">
                  {previewContent.prompts.map((p) => (
                    <div key={p.title} className="card-premium p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{p.title}</h4>
                          <p className="mt-1 text-xs text-gray-500">{p.useCase}</p>
                        </div>
                      </div>
                      <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
                        {p.prompt}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Config Files */}
            <AnimatedSection delay={300}>
              <div className="mt-14">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-sm font-bold">
                    3
                  </span>
                  Configuration Files
                </h3>
                <div className="mt-5 space-y-5">
                  {previewContent.configFiles.map((cfg) => (
                    <div key={cfg.filename} className="card-premium overflow-hidden p-0">
                      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {cfg.filename}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{cfg.description}</p>
                      </div>
                      <pre className="overflow-x-auto bg-gray-900 p-6 text-xs leading-relaxed text-gray-100">
                        {cfg.snippet}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Directory Structure */}
            <AnimatedSection delay={400}>
              <div className="mt-14">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 text-sm font-bold">
                    4
                  </span>
                  Project Structure
                </h3>
                <div className="mt-5 card-premium overflow-hidden p-0">
                  <pre className="overflow-x-auto bg-gray-900 p-6 text-xs leading-relaxed text-gray-100 font-mono">
                    {previewContent.directoryStructure}
                  </pre>
                </div>
              </div>
            </AnimatedSection>

            {/* Setup Steps */}
            <AnimatedSection delay={500}>
              <div className="mt-14">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 text-sm font-bold">
                    5
                  </span>
                  Setup Guide
                </h3>
                <div className="mt-5 space-y-4">
                  {previewContent.setupSteps.map((s) => (
                    <div key={s.step} className="card-premium p-6">
                      <div className="flex items-start gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                          {s.step}
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{s.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Deliverables Summary */}
            <AnimatedSection delay={600}>
              <div className="mt-14">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-600 text-sm font-bold">
                    6
                  </span>
                  Deliverables Checklist
                </h3>
                <div className="mt-5 card-premium p-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {previewContent.deliverables.map((d, i) => (
                      <div key={d} className="flex items-center gap-3 text-sm text-gray-700">
                        <svg className="h-5 w-5 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ═══ Bottom CTA ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 py-16 sm:py-20">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to launch {product.name}?
            </h2>
            <p className="mt-3 text-lg text-indigo-100">
              Get the complete kit and start your AI-powered business today.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                Buy Now — {formatPrice(product.price)}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Have questions? Contact us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
