import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
  head: () => ({
    meta: [
      { title: "Case Studies — Real Results from Real Businesses | CH Business Services" },
      { name: "description", content: "See how CH Business Services helped businesses increase conversions, automate workflows, and grow revenue. Real results, real stories." },
      { property: "og:title", content: "Case Studies — Real Results from Real Businesses | CH Business Services" },
      { property: "og:description", content: "See how CH Business Services helped businesses increase conversions, automate workflows, and grow revenue. Real results, real stories." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/case-studies" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Case Studies — Real Results from Real Businesses | CH Business Services" },
      { name: "twitter:description", content: "See how CH Business Services helped businesses increase conversions, automate workflows, and grow revenue. Real results, real stories." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/case-studies" },
    ],
  }),
});

/* ─── Inline icons ─── */

function ArrowTrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
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

function CurrencyDollar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l7.075-7.075a8.713 8.713 0 00-3.52-3.52L7.9 11.42m3.52 3.52l-3.52-3.52m3.52 3.52a8.713 8.713 0 01-3.52 3.52l-3.52-3.52m3.52 3.52L4.4 22.9m0 0l-3.535-3.535M4.4 22.9l3.535-3.535" />
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

/* ─── Case study data ─── */

interface CaseStudy {
  company: string;
  tagline: string;
  service: string;
  serviceLink: string;
  color: string;
  problem: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
    bullets: string[];
  };
  results: {
    title: string;
    description: string;
  };
  metrics: { value: string; label: string; icon: React.ReactNode }[];
  testimonial?: { quote: string; author: string; role: string };
}

const caseStudies: CaseStudy[] = [
  {
    company: "Denver Plumbing Co.",
    tagline: "From missed calls to booked jobs — a local service business goes digital.",
    service: "Conversion Site Sprint",
    serviceLink: "/offers/conversion-site-sprint",
    color: "from-indigo-500 to-blue-600",
    problem: {
      title: "The Problem",
      description:
        "Denver Plumbing Co. was getting 5–10 qualified leads every week from Google searches and Yelp — but had no website of their own. Leads came through third-party platforms with no way to capture contact info, no follow-up system, and no brand presence. Every missed call was a lost job.",
    },
    solution: {
      title: "The Solution",
      description:
        "We built a conversion-optimized website with clear service pages, trust signals, and a frictionless booking flow. Behind the scenes, we wired up an automation system that captures every lead, sends instant SMS confirmations, and syncs appointments directly to their calendar.",
      bullets: [
        "Custom conversion site with mobile-first booking flow",
        "Automated lead capture with SMS confirmation",
        "Calendar sync to eliminate double-bookings",
        "Review request automation after job completion",
      ],
    },
    results: {
      title: "The Results",
      description:
        "In 60 days, Denver Plumbing Co. went from losing leads to a waitlist. The site now generates 60% of their new business, and the automation system handles booking while the team is on the road.",
    },
    metrics: [
      { value: "40%", label: "more booked jobs", icon: <ArrowTrendingUp className="h-5 w-5" /> },
      { value: "$12K/mo", label: "incremental revenue", icon: <CurrencyDollar className="h-5 w-5" /> },
      { value: "60 days", label: "to full ROI", icon: <ClockIcon className="h-5 w-5" /> },
    ],
    testimonial: {
      quote: "I didn't realize how much business I was losing until the system showed me. Now I wake up to booked jobs instead of missed calls.",
      author: "Mike R.",
      role: "Owner, Denver Plumbing Co.",
    },
  },
  {
    company: "DataPulse Analytics",
    tagline: "A B2B SaaS team reclaims 15 hours a week by automating their growth engine.",
    service: "Automation System",
    serviceLink: "/offers/automation-system",
    color: "from-purple-500 to-pink-600",
    problem: {
      title: "The Problem",
      description:
        "DataPulse Analytics was attracting 50+ trial signups every week, but their onboarding was entirely manual. The founder spent 15 hours a week qualifying leads, sending welcome emails, checking CRM data, and routing high-value signups to sales — creating a bottleneck that capped growth.",
    },
    solution: {
      title: "The Solution",
      description:
        "We built an intelligent automation system that scores every trial signup based on firmographic data, product usage signals, and behavioral triggers. High-fit leads are automatically enriched, routed to the right sales rep, and placed into personalized email sequences — all without a human touching it.",
      bullets: [
        "AI lead scoring using 20+ qualification signals",
        "Automated enrichment with CRM sync",
        "Personalized drip sequences triggered by behavior",
        "Slack alerts for hot leads within 5 minutes of signup",
      ],
    },
    results: {
      title: "The Results",
      description:
        "The team reclaimed 15 hours per week and saw trial-to-paid conversions jump by 22%. Response time dropped from 2 days to under 15 minutes, and no high-value lead slipped through the cracks again.",
    },
    metrics: [
      { value: "15 hrs", label: "saved per week", icon: <ClockIcon className="h-5 w-5" /> },
      { value: "+22%", label: "trial-to-paid conversion", icon: <ChartIcon className="h-5 w-5" /> },
      { value: "15 min", label: "response time", icon: <BoltIcon className="h-5 w-5" /> },
    ],
    testimonial: {
      quote: "We were drowning in manual work. Now our pipeline runs itself — and our conversion rate proves it.",
      author: "Sarah Chen",
      role: "CEO, DataPulse Analytics",
    },
  },
  {
    company: "Amplify Coaching",
    tagline: "5,000 listeners. Zero pipeline. One system changed everything.",
    service: "Growth OS Retainer",
    serviceLink: "/offers/growth-os",
    color: "from-emerald-500 to-teal-600",
    problem: {
      title: "The Problem",
      description:
        "Amplify Coaching had a top-ranked business podcast with 5,000 monthly listeners and a growing newsletter — but no system to convert that audience into coaching clients. Content was published and forgotten. There was no lead magnet, no nurture sequence, and no predictable way to fill their client roster.",
    },
    solution: {
      title: "The Solution",
      description:
        "We built a content repurposing engine that automatically transforms each podcast episode into social posts, email snippets, and SEO-optimized blog articles. Paired with a lead magnet funnel and automated email nurture, every listener became a potential client — captured, warmed, and invited to book a call.",
      bullets: [
        "Automated content repurposing: podcast → blog → social → email",
        "Lead magnet funnel with downloadable frameworks",
        "7-day email nurture sequence with behavioral triggers",
        "Monthly growth analytics dashboard and strategy adjustments",
      ],
    },
    results: {
      title: "The Results",
      description:
        "Within 90 days, Amplify Coaching signed 8 new retainer clients — all sourced from content that was already being created. The system now generates a predictable $24K MRR pipeline from their existing audience.",
    },
    metrics: [
      { value: "8", label: "new retainer clients", icon: <UsersIcon className="h-5 w-5" /> },
      { value: "$24K/mo", label: "from content alone", icon: <CurrencyDollar className="h-5 w-5" /> },
      { value: "90 days", label: "to first results", icon: <ClockIcon className="h-5 w-5" /> },
    ],
    testimonial: {
      quote: "I was already creating great content — I just had no system to turn it into clients. Now my podcast is my best salesperson.",
      author: "James Oluwole",
      role: "Founder, Amplify Coaching",
    },
  },
];

/* ─── Page ─── */

function CaseStudies() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 hero-dots opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-brand-cream-dark px-3 py-1 text-xs font-semibold text-brand-navy">
              Social Proof
            </span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
              Real <span className="gradient-text">results</span>, real{" "}
              <span className="gradient-text">businesses</span>.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-gray">
              Three businesses that replaced one-off labor with repeatable systems — and
              the numbers to prove it.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Case Studies ─── */}
      {caseStudies.map((cs, idx) => (
        <section
          key={cs.company}
          className={`relative overflow-hidden ${
            idx % 2 === 0 ? "bg-brand-warm-white" : "bg-brand-cream"
          } py-20 lg:py-28`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Company header */}
            <AnimatedSection>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    to={cs.serviceLink}
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${cs.color} px-3 py-1 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105`}
                  >
                    {cs.service}
                  </Link>
                  <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
                    {cs.company}
                  </h2>
                  <p className="mt-2 max-w-2xl text-lg leading-relaxed text-brand-gray">
                    {cs.tagline}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Problem / Solution — two-column on desktop */}
            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Problem */}
              <AnimatedSection delay={100}>
                <div className="card-premium p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <WrenchIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-brand-navy">
                      {cs.problem.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-brand-gray">
                    {cs.problem.description}
                  </p>
                </div>
              </AnimatedSection>

              {/* Solution */}
              <AnimatedSection delay={200}>
                <div className="card-premium p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cream-dark text-brand-navy">
                      <SparklesIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-brand-navy">
                      {cs.solution.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-brand-gray">
                    {cs.solution.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {cs.solution.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-gold"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm text-brand-gray">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Results + Metrics */}
            <AnimatedSection delay={300}>
              <div className={`mt-10 rounded-2xl bg-gradient-to-r ${cs.color} p-8 sm:p-10`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white">
                    <ChartIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {cs.results.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-3xl leading-relaxed text-white/90">
                  {cs.results.description}
                </p>

                {/* Metrics grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {cs.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                        {m.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white sm:text-3xl">
                          {m.value}
                        </div>
                        <div className="text-sm text-white/70">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Testimonial */}
            {cs.testimonial && (
              <AnimatedSection delay={400}>
                <div className="mt-8 rounded-xl border border-brand-border-light bg-white p-6 sm:p-8">
                  <blockquote className="text-lg leading-relaxed text-brand-gray italic">
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy font-serif text-sm font-bold text-brand-gold">
                      {cs.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-brand-navy">
                        {cs.testimonial.author}
                      </div>
                      <div className="text-sm text-brand-gray">
                        {cs.testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>
      ))}

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-light section-pad">
        <div className="absolute inset-0 hero-dots opacity-5" />
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-brand-navy-light/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Want similar results?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-gray-light">
              Every project starts with a free Business Gap Scan — we&apos;ll
              identify the highest-leverage opportunity in your business and show
              you exactly what a system could do for you.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/offers/gap-scan"
                className="inline-flex items-center rounded-xl bg-brand-gold px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              >
                Start with a free Gap Scan
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                Talk to us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
