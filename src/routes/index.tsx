import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState } from "react";
import { SITE_URL, pageHead, organizationLd, faqLd } from "~/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "AI Business Kits & Automation Systems | CH Business Services",
    description: "CH Business Services builds conversion-focused websites, AI business kits, automation systems, and intelligence reports. Get a free Business Gap Scan today.",
    ogType: "website",
  }),
  component: Home,
});

/* ─── Inline SVG Icons ─── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  );
}
function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}
function CogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41.514z" />
    </svg>
  );
}
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}
function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function DollarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

/* ─── Home ─── */

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long until I see results?",
      a: "Most clients see measurable improvements within 60–90 days. Conversion site sprints launch in 2–3 weeks. Automation systems begin capturing and qualifying leads immediately upon deployment. Growth OS clients typically see compounding results starting month 2.",
    },
    {
      q: "Do I need technical skills?",
      a: "None. We build, deploy, and manage the entire system. You get a simple dashboard and regular reports. If you can use email and a calendar, you can run what we build. We handle the complexity behind the scenes.",
    },
    {
      q: "What's included in each package?",
      a: "Each package is tailored to your needs after a free Business Gap Scan. Conversion Site Sprint includes positioning, copy, design, and basic SEO. Automation systems layer on CRM, pipeline, booking, and follow-ups. Growth OS adds ongoing optimization and content. See our pricing page for full breakdowns.",
    },
    {
      q: "Can you work with my existing site?",
      a: "Absolutely. We can audit your current site, identify conversion gaps, and either enhance what you have or build a replacement that preserves your existing SEO equity. No wasted investment.",
    },
    {
      q: "What if I'm not happy?",
      a: "Every engagement starts with a free Business Gap Scan so we both understand the opportunity before committing. For retainers, you can cancel anytime. For project work, we define clear deliverables and checkpoints so you're never in the dark.",
    },
    {
      q: "How do payments work?",
      a: "Project fees are split into milestones — typically 50% to start, 50% on delivery. Retainers are billed monthly. All payments are processed securely through Stripe. No long-term contracts unless you want one.",
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationLd()),
        }}
      />
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

      {/* ═══════════════════════════════════════════
          1. HERO — dark, bold, minimal
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-gradient">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
        {/* Single decorative blob */}
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-brand-accent/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedSection>
              <div className="inline-flex items-center rounded-full border border-brand-accent/20 bg-brand-accent/5 px-4 py-1.5 mb-8">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
                </span>
                <span className="text-xs font-medium text-brand-accent-light">Now accepting new clients</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]">
                Your business deserves a website{" "}
                <span className="gradient-text">that actually converts</span>.
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text-muted sm:text-xl">
                We build conversion-focused websites, automation systems, and
                intelligence reports that turn visitors into customers — not just
                look pretty.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={350}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/offers/gap-scan"
                  className="btn-primary px-8 py-4 text-base"
                >
                  Start with a Free Gap Scan
                </Link>
                <a
                  href="#how-it-works"
                  className="btn-ghost px-8 py-4 text-base group"
                >
                  See how it works
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </AnimatedSection>

            {/* Trust indicators */}
            <AnimatedSection delay={500}>
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-brand-text-muted/60">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  No upfront commitment
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Built in 2–3 weeks
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Managed for you
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-brand-surface" />
      </section>

      {/* ═══════════════════════════════════════════
          TRUST BAR — social proof right after hero
          ═══════════════════════════════════════════ */}
      <section className="bg-brand-surface py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-center text-sm font-medium uppercase tracking-wider text-brand-text-muted/70">
              Trusted by growing businesses
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { stat: "50+", label: "Projects delivered" },
                { stat: "98%", label: "Client satisfaction" },
                { stat: "14 days", label: "Avg. time to launch" },
                { stat: "40%", label: "Avg. conversion lift" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-mono text-3xl font-bold gradient-text sm:text-4xl">
                    {item.stat}
                  </div>
                  <div className="mt-1 text-sm text-brand-text-secondary">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. THE PROBLEM — light, clean
          ═══════════════════════════════════════════ */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-accent mb-4">The Problem</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                Most business websites look nice — but{" "}
                <span className="gradient-text">don&apos;t actually work</span>.
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <XCircleIcon className="h-5 w-5" />,
                title: "No leads from your site",
                desc: "Visitors come and go. Your site isn't capturing contact info, booking calls, or moving anyone toward a purchase.",
              },
              {
                icon: <MailIcon className="h-5 w-5" />,
                title: "Manual follow-up eating your time",
                desc: "You're sending individual emails, chasing invoices, and reminding clients manually — hours you could spend growing.",
              },
              {
                icon: <ChartIcon className="h-5 w-5" />,
                title: "Can't prove ROI on your marketing",
                desc: "You're spending on ads, content, and SEO but have no system to track what's actually producing revenue.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="card-glass-light group p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/8 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-text-secondary">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. HOW WE FIX IT — alt background with grid
          ═══════════════════════════════════════════ */}
      <section id="how-it-works" className="section-pad relative bg-brand-surface-alt">
        <div className="absolute inset-0 hero-dots-light opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-accent mb-4">How We Fix It</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                We build websites that{" "}
                <span className="gradient-text">grow your business</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                num: "1",
                title: "Find your highest-value gap",
                desc: "Every project starts with a free Business Gap Scan. We analyze your market, competitors, and current systems to identify the one change that will produce the biggest return — before you spend a dollar.",
              },
              {
                num: "2",
                title: "Build the system that fills it",
                desc: "Whether it's a conversion-optimized website, an automated follow-up engine, or an intelligence pipeline — we design, build, and deploy the exact system your gap requires.",
              },
              {
                num: "3",
                title: "Run on autopilot",
                desc: "Leads are captured, qualified, and followed up automatically. Content is repurposed. Reports arrive on schedule. You focus on what you do best — we handle the rest.",
              },
            ].map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 150}>
                <div className="relative text-center">
                  <div className="mx-auto step-number">{step.num}</div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-brand-text">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-text-secondary">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. TRUST / TESTIMONIALS — moved up for social proof
          ═══════════════════════════════════════════ */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-accent mb-4">Testimonials</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                Real <span className="gradient-text">results</span> from real businesses
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                metric: "40%",
                label: "more booked jobs",
                quote: "I didn't realize how much business I was losing until the system showed me. Now I wake up to booked jobs instead of missed calls.",
                author: "Mike R.",
                role: "Owner, Denver Plumbing Co.",
              },
              {
                metric: "15 hrs",
                label: "saved per week",
                quote: "We were drowning in manual work. Now our pipeline runs itself — and our conversion rate proves it.",
                author: "Sarah Chen",
                role: "CEO, DataPulse Analytics",
              },
              {
                metric: "$24K/mo",
                label: "from content alone",
                quote: "I was already creating great content — I just had no system to turn it into clients. Now my podcast is my best salesperson.",
                author: "James Oluwole",
                role: "Founder, Amplify Coaching",
              },
            ].map((t, i) => (
              <AnimatedSection key={t.author} delay={i * 120}>
                <div className="card-glass-light flex h-full flex-col p-8">
                  <div className="font-mono text-4xl font-bold gradient-text">
                    {t.metric}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-brand-text">{t.label}</div>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-brand-text-secondary italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-brand-border-light pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent font-serif text-sm font-bold text-white shadow-sm shadow-brand-accent/20">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-brand-text">{t.author}</div>
                      <div className="text-xs text-brand-text-secondary">{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-10 text-center">
              <Link to="/case-studies" className="btn-secondary px-8 py-4 text-base">
                Read full case studies
              </Link>
            </div>
          </AnimatedSection>

          {/* Inline CTA — third gap scan offer on homepage */}
          <AnimatedSection delay={500}>
            <div className="mt-8 text-center">
              <p className="text-sm text-brand-text-secondary mb-3">Ready to get similar results?</p>
              <Link
                to="/offers/gap-scan"
                className="btn-primary px-8 py-4 text-base"
              >
                Start your free Gap Scan
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SERVICES PREVIEW — white bg, 4 cards
          ═══════════════════════════════════════════ */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-accent mb-4">What We Do</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                Services built to make your business look{" "}
                <span className="gradient-text">premium and convert better</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <GlobeIcon className="h-6 w-6" />,
                title: "Websites That Convert",
                desc: "SEO-smart, mobile-first sites built to capture leads and book calls.",
                link: "/services",
              },
              {
                icon: <CogIcon className="h-6 w-6" />,
                title: "Automation Systems",
                desc: "Lead handling, follow-ups, booking, and review requests on autopilot.",
                link: "/services",
              },
              {
                icon: <ChartIcon className="h-6 w-6" />,
                title: "Intelligence Reports",
                desc: "Niche opportunity briefs, market gap analysis, and weekly alerts.",
                link: "/intelligence",
              },
              {
                icon: <PackageIcon className="h-6 w-6" />,
                title: "AI Business Kits",
                desc: "Ready-to-launch packaged businesses with brand, site, and automations.",
                link: "/marketplace",
              },
            ].map((svc, i) => (
              <AnimatedSection key={svc.title} delay={i * 80} className="h-full">
                <Link to={svc.link} className="card-premium group flex h-full flex-col p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/6 text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-accent/20">
                    {svc.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-brand-text transition-colors group-hover:text-brand-accent">
                    {svc.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-text-secondary">{svc.desc}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-accent">
                    Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. PACKAGES SNAPSHOT — alt bg
          ═══════════════════════════════════════════ */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-accent mb-4">Pricing</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                Simple packages.{" "}
                <span className="gradient-text">Serious value.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$1,500–$3,500",
                desc: "A conversion-optimized website built to turn visitors into leads.",
                features: ["5-page custom site", "SEO foundation", "Mobile-first design", "Contact & booking forms", "2-week delivery"],
                link: "/offers/conversion-site-sprint",
                featured: false,
              },
              {
                name: "Growth",
                price: "$297–$997/mo",
                desc: "Ongoing optimization, content, and automation management.",
                features: ["Everything in Starter", "Monthly SEO & content", "Automation management", "Analytics dashboard", "Priority support"],
                link: "/offers/growth-os",
                featured: true,
              },
              {
                name: "Premium",
                price: "$3,000–$15,000",
                desc: "Complete business system: brand, site, automations, and AI kit.",
                features: ["Everything in Growth", "Full automation suite", "AI-powered systems", "Marketplace listing", "Dedicated strategist"],
                link: "/offers/ai-business-kit",
                featured: false,
              },
            ].map((pkg, i) => (
              <AnimatedSection key={pkg.name} delay={i * 120}>
                <div
                  className={`card-glass-light relative flex flex-col p-8 ${
                    pkg.featured
                      ? "border-brand-accent/25 ring-1 ring-brand-accent/10 shadow-md"
                      : ""
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-6">
                      <span className="badge bg-brand-accent text-white shadow-lg shadow-brand-accent/20">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-semibold text-brand-text">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 font-mono text-3xl font-bold text-brand-text">
                    {pkg.price}
                  </p>
                  <p className="mt-3 text-sm text-brand-text-secondary">{pkg.desc}</p>
                  <hr className="my-5 border-brand-border-light" />
                  <ul className="flex-1 space-y-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-brand-text-secondary">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={pkg.link}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      pkg.featured
                        ? "bg-brand-accent text-white hover:bg-brand-accent-dark hover:shadow-lg hover:shadow-brand-accent/20"
                        : "border border-brand-border bg-white text-brand-text hover:border-brand-accent/30 hover:text-brand-accent"
                    }`}
                  >
                    View package
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300}>
            <div className="mt-10 text-center">
              <Link to="/pricing" className="btn-secondary px-8 py-4 text-base">
                See all pricing options
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. INTERACTIVE DEMO TEASER — dark
          ═══════════════════════════════════════════ */}
      <section className="section-pad relative bg-dark-gradient-alt">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <div className="badge bg-brand-accent/15 text-brand-accent-light mb-4">Interactive Demo</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Watch how it runs, before you commit
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-text-muted">
                See a live automation dashboard in action — lead capture, follow-up
                sequences, and real-time reporting.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              {/* Mock dashboard preview card */}
              <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/20">
                {/* Mock toolbar */}
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 font-mono text-xs text-brand-text-muted">Automation Dashboard</span>
                </div>
                {/* Mock content */}
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="rounded-xl bg-white/5 p-5 transition-colors hover:bg-white/8">
                    <div className="font-mono text-3xl font-bold gradient-text">247</div>
                    <div className="mt-1 text-xs text-brand-text-muted">Leads captured</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-5 transition-colors hover:bg-white/8">
                    <div className="font-mono text-3xl font-bold gradient-text">98%</div>
                    <div className="mt-1 text-xs text-brand-text-muted">Response rate</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-5 transition-colors hover:bg-white/8">
                    <div className="font-mono text-3xl font-bold gradient-text">14m</div>
                    <div className="mt-1 text-xs text-brand-text-muted">Avg. response time</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mx-6 mb-6 overflow-hidden rounded-full bg-white/8">
                  <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="mt-8">
                <Link
                  to="/demo"
                  className="btn-primary px-8 py-4 text-base"
                >
                  Try the interactive demo
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. PROCESS TIMELINE — white bg
          ═══════════════════════════════════════════ */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-accent mb-4">Process</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                A clear, predictable process
              </h2>
              <p className="mt-4 text-brand-text-secondary">
                From first conversation to launch and beyond — here&apos;s what to expect.
              </p>
            </div>
          </AnimatedSection>

          <div className="timeline-line relative mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                { day: "Day 1", title: "Discovery Call", desc: "We learn about your business, goals, and current challenges. 30 minutes, no commitment." },
                { day: "Day 3", title: "Gap Analysis", desc: "We deliver a detailed report identifying your highest-value opportunity with clear next steps." },
                { day: "Day 10", title: "Build & Deploy", desc: "Your system is designed, built, tested, and launched. You approve every step." },
                { day: "Day 30+", title: "Optimize & Grow", desc: "We monitor performance, refine the system, and identify new opportunities for growth." },
              ].map((step, i) => (
                <AnimatedSection key={step.day} delay={i * 120}>
                  <div className="relative z-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-accent/30 bg-brand-surface shadow-sm">
                      <span className="font-mono text-sm font-bold text-brand-text">{step.day}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-brand-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. FAQ — white bg
          ═══════════════════════════════════════════ */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <div className="badge badge-accent mb-4">FAQ</div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="rounded-2xl border border-brand-border-light bg-white transition-all duration-200 hover:border-brand-accent/20 hover:shadow-sm">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-serif text-lg font-semibold text-brand-text pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-brand-accent transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`faq-answer px-6 ${
                      openFaq === i ? "open pb-5" : ""
                    }`}
                  >
                    <p className="leading-relaxed text-brand-text-secondary">{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. FINAL CTA — dark gradient
          ═══════════════════════════════════════════ */}
      <section className="relative section-pad bg-dark-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-accent/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to stop leaving money on the table?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-text-muted">
              Every project starts with a free Business Gap Scan. We&apos;ll identify the
              highest-value opportunity in your business — before you spend a dollar.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/offers/gap-scan"
                className="btn-primary px-8 py-4 text-base"
              >
                Start your free Gap Scan
              </Link>
              <Link
                to="/contact"
                className="btn-ghost px-8 py-4 text-base"
              >
                Or talk to us first
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
