import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { pageHead, faqLd, SITE_URL } from "~/lib/seo";

export const Route = createFileRoute("/jobos")({
  head: () => pageHead({
    title: "Hire AI Workers for Your Business | JobOS by CH Business Services",
    description: "Deploy pre-trained AI agents for customer support, bookkeeping, marketing, and more — at a fraction of traditional costs. 50+ roles, deploy in 48 hours.",
    path: "/jobos",
    ogType: "website",
  }),
  component: JobOS,
});

/* ─── Icons ─── */
function RobotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V8m6 4v2m0-2a2 2 0 100-4m0 4a2 2 0 110-4m6 4a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V8M3 20h18M3 20v-2m18 2v-2" />
    </svg>
  );
}
function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 14v3a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h1a2 2 0 012 2zM12 4v4m0 0a2 2 0 100 4m0-4a2 2 0 110 4" />
    </svg>
  );
}
function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm2.25-4.5h.008v.008H10.5V9zm0 2.25h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5V13.5zm2.25-4.5h.008v.008H12.75V9zm0 2.25h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75V13.5zM19.5 3.75H4.5A2.25 2.25 0 002.25 6v12A2.25 2.25 0 004.5 20.25h15a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25z" />
    </svg>
  );
}
function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M10.125 7.5h3.375a2.25 2.25 0 012.25 2.25v.75m-7.875 6.75h7.875a2.25 2.25 0 002.25-2.25v-.75M8.25 19.5a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h.75a3 3 0 019 0h.75a1.5 1.5 0 011.5 1.5v9.75a1.5 1.5 0 01-1.5 1.5h-.75a3 3 0 01-9 0H8.25zM18 9l3-3M18 14.25l3 3M6 12.75h.008v.008H6v-.008z" />
    </svg>
  );
}
function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
}
function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 3v17.25m0 0c-1.238 0-2.433-.277-3.5-.802m3.5.802a6.5 6.5 0 013.5-.802M12 3a6.5 6.5 0 00-3.5.802M12 3a6.5 6.5 0 013.5-.802M12 20.25c1.238 0 2.433.277 3.5.802M20.25 6.75h-4.5M20.25 6.75L12 18 3.75 6.75M20.25 6.75l-3.75 6M3.75 6.75l3.75 6M8.25 9h7.5M12 12.75v1.5" />
    </svg>
  );
}
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M9 13.5h.008v.008H9v-.008zm2.25 0h.008v.008h-.008V13.5zm2.25 0h.008v.008h-.008V13.5zm2.25 0h.008v.008h-.008V13.5zM9 16.5h.008v.008H9v-.008zm2.25 0h.008v.008h-.008V16.5zm2.25 0h.008v.008h-.008V16.5z" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

/* ─── Worker role definitions ─── */
interface WorkerRole {
  title: string;
  description: string;
  icon: React.ReactNode;
  rate: string;
}

const workerRoles: WorkerRole[] = [
  {
    title: "Customer Support Agent",
    description: "24/7 ticket handling, live chat responses, and issue triage — trained on your knowledge base and brand voice.",
    icon: <HeadsetIcon className="h-7 w-7" />,
    rate: "$8–$15/hr",
  },
  {
    title: "Bookkeeper Agent",
    description: "Bank reconciliation, expense categorization, invoice matching, and monthly close prep without the CPA price tag.",
    icon: <CalculatorIcon className="h-7 w-7" />,
    rate: "$12–$20/hr",
  },
  {
    title: "Marketing Manager Agent",
    description: "Campaign setup, ad copy generation, A/B test analysis, and weekly performance reports — always on brand.",
    icon: <MegaphoneIcon className="h-7 w-7" />,
    rate: "$15–$25/hr",
  },
  {
    title: "Executive Assistant Agent",
    description: "Calendar management, email triage, travel research, and meeting prep — like having a chief of staff, at 10% the cost.",
    icon: <BriefcaseIcon className="h-7 w-7" />,
    rate: "$10–$18/hr",
  },
  {
    title: "Paralegal Agent",
    description: "Contract review, clause extraction, legal research summaries, and compliance checklist automation.",
    icon: <ScaleIcon className="h-7 w-7" />,
    rate: "$20–$35/hr",
  },
  {
    title: "Appointment Setting Agent",
    description: "Inbound and outbound meeting scheduling, calendar coordination across time zones, and automated follow-ups.",
    icon: <CalendarIcon className="h-7 w-7" />,
    rate: "$8–$12/hr",
  },
];

const testimonials = [
  {
    quote: "We deployed a Customer Support Agent and cut our first-response time from 4 hours to under 90 seconds. Our team now focuses on complex cases while the AI handles everything else.",
    author: "Sarah Mitchell",
    role: "VP of CX, SaaSWorkflow",
  },
  {
    quote: "The Bookkeeper Agent saved us $4,200/month compared to our outsourced firm — and closes the books 3 days faster every month.",
    author: "James R. Keller",
    role: "CFO, Midland Property Group",
  },
  {
    quote: "Hiring a Marketing Manager Agent was like adding a senior marketing lead without the six-figure salary. Our campaign ROAS improved 34% in the first quarter.",
    author: "Priya N. Chandrasekhar",
    role: "Founder, Elevate Digital",
  },
];

const faqs = [
  {
    q: "What exactly is an AI worker?",
    a: "An AI worker is a pre-trained, role-specific AI agent that plugs into your existing tools and workflows. It handles repetitive, high-volume tasks — like customer support tickets, bookkeeping entries, or marketing campaign management — so your human team can focus on strategy and high-value work.",
  },
  {
    q: "How are AI workers different from chatbots or automation tools?",
    a: "Unlike simple chatbots, JobOS AI workers are trained for specific professional roles with industry context. They don't just respond — they execute tasks, make judgment calls within defined guardrails, and integrate with your actual business tools (email, Slack, CRMs, accounting software, etc.).",
  },
  {
    q: "Do I need technical expertise to deploy an AI worker?",
    a: "No. Every AI worker comes with a setup wizard and onboarding guide. Most teams are live within 48 hours. If you need help, our onboarding specialists handle the configuration for you.",
  },
  {
    q: "Can I customize an AI worker for my specific business?",
    a: "Yes. Every worker can be trained on your knowledge base, brand guidelines, SOPs, and tool stack. You define the guardrails and escalation paths — the AI handles execution within those bounds.",
  },
  {
    q: "What if the AI worker makes a mistake?",
    a: "Every worker operates with built-in confidence thresholds. When uncertain, it escalates to a human rather than guessing. All actions are logged and auditable. Plus, workers improve over time through feedback loops and fine-tuning.",
  },
  {
    q: "How do I get started?",
    a: 'Click "Hire an AI Worker" below to browse available roles, or schedule a discovery call. We\'ll help you identify the highest-ROI role to deploy first and walk you through the entire onboarding process.',
  },
];

function WorkerCard({ title, description, icon, rate }: WorkerRole) {
  return (
    <div className="card-premium group relative overflow-hidden p-7">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
        {icon}
      </div>
      <h3 className="mt-5 font-serif text-lg font-semibold text-brand-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">{description}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-accent/5 px-3 py-1 font-mono text-xs font-semibold text-brand-accent">
        <BoltIcon className="h-3 w-3" />
        {rate}
      </p>
    </div>
  );
}

/* ─── Page ─── */
function JobOS() {
  return (
    <>
      {/* FAQ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqLd(
              faqs.map((f) => ({
                question: f.q,
                answer: f.a.replace(/<[^>]*>/g, ""),
              }))
            )
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-surface-alt">
        <div className="absolute inset-0 hero-dots-light opacity-50" />
        {/* Gradient blobs for depth */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-32">
          <AnimatedSection>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent shadow-sm shadow-brand-accent/10">
              <RobotIcon className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
              Hire AI Workers{" "}
              <span className="gradient-text">for Your Business</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text-secondary">
              Deploy pre-trained AI agents for customer support, bookkeeping, marketing, and more —{" "}
              <span className="font-semibold text-brand-text">at a fraction of traditional costs</span>.
              Powered by <span className="font-semibold text-brand-accent">JobOS</span>.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://jobos.chbusinessservices.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center gap-2 px-8 py-4 text-base"
              >
                Hire an AI Worker
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://jobos.chbusinessservices.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 text-base"
              >
                Explore AI Roles
              </a>
            </div>
          </AnimatedSection>

          {/* Trust banner */}
          <AnimatedSection delay={450}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-brand-text-secondary">
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-brand-accent" /> 50+ pre-trained roles
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-brand-accent" /> Deploy in 48 hours
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-brand-accent" /> Fraction of traditional cost
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-brand-accent" /> 24/7 operation
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AI Worker Roles Grid */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="section-label">AI Workforce</p>
              <h2 className="section-heading">
                Ready-to-deploy AI roles
              </h2>
              <p className="section-subtitle">
                Each worker is pre-trained for its role, integrates with your existing tools, and operates 24/7 with human escalation built in.
              </p>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workerRoles.map((role, i) => (
              <AnimatedSection key={role.title} delay={i * 80}>
                <WorkerCard {...role} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="section-label">How It Works</p>
              <h2 className="section-heading">
                From selection to production in days
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Pick a role", desc: "Browse our catalog of 50+ pre-trained AI workers and choose the one that fits your biggest bottleneck." },
              { step: "02", title: "Train on your data", desc: "Upload your knowledge base, brand guidelines, and SOPs. The worker learns your business before day one." },
              { step: "03", title: "Integrate & test", desc: "Connect to your tools — email, Slack, CRM, accounting — and run a supervised trial period." },
              { step: "04", title: "Go live 24/7", desc: "Flip the switch. Your AI worker handles tasks around the clock with human escalation for edge cases." },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 120}>
                <div className="text-center">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/10 font-mono text-sm font-bold text-brand-accent">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-brand-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="section-label">Pricing</p>
              <h2 className="section-heading">
                Pay for the work, not the overhead
              </h2>
              <p className="section-subtitle">
                AI workers start at a fraction of the cost of a full-time hire — with no benefits, no PTO, and no ramp-up time.
              </p>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { tier: "Starter", rate: "$8–$12/hr", desc: "Appointment setters, data entry agents, and basic support roles. Ideal for high-volume, repetitive tasks.", highlight: false },
              { tier: "Professional", rate: "$15–$25/hr", desc: "Marketing managers, executive assistants, mid-level bookkeepers. Strategic roles with tool integrations.", highlight: true },
              { tier: "Specialist", rate: "$20–$35/hr", desc: "Paralegal agents, senior analysts, compliance reviewers. Domain-expert roles requiring nuanced judgment.", highlight: false },
            ].map((plan, i) => (
              <AnimatedSection key={plan.tier} delay={i * 100}>
                <div className={`card-premium relative overflow-hidden p-8 ${plan.highlight ? "ring-1 ring-brand-accent/20 shadow-md" : ""}`}>
                  {plan.highlight && (
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-brand-accent px-4 py-1.5 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold text-brand-text">{plan.tier}</h3>
                  <p className="mt-2 font-mono text-3xl font-bold text-brand-accent">{plan.rate}</p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-text-secondary">{plan.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={350}>
            <div className="mt-10 text-center">
              <a
                href="https://jobos.chbusinessservices.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center gap-2 px-8 py-4 text-base"
              >
                View All Roles &amp; Pricing
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="section-label">Testimonials</p>
              <h2 className="section-heading">
                Trusted by growing teams
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="card-premium relative p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <StarIcon key={j} className="h-4 w-4 text-brand-accent" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-brand-text-secondary">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-5 border-t border-brand-border-light pt-4">
                    <p className="font-serif text-sm font-semibold text-brand-text">{t.author}</p>
                    <p className="text-xs text-brand-text-secondary">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="section-label">FAQ</p>
              <h2 className="section-heading">
                Everything you need to know
              </h2>
            </div>
          </AnimatedSection>
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <details className="group card-premium cursor-pointer p-6 transition-shadow duration-200 hover:shadow-md">
                  <summary className="flex items-center justify-between gap-4 font-serif text-lg font-semibold text-brand-text marker:hidden">
                    {faq.q}
                    <span className="flex-shrink-0 text-brand-accent transition-transform duration-200 group-open:rotate-45">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 pr-10 text-sm leading-relaxed text-brand-text-secondary">{faq.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad relative overflow-hidden bg-dark-gradient">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to put AI to work?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-text-muted">
              Join hundreds of businesses that have already deployed AI workers. Start with one role and scale as you grow.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://jobos.chbusinessservices.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center gap-2 px-8 py-4 text-base"
              >
                Hire an AI Worker
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/contact"
                className="btn-ghost px-8 py-4 text-base"
              >
                Schedule a Call
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
