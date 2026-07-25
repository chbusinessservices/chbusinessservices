import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
  head: () => ({
    meta: [
      { title: "AI Business Kits Marketplace — Ready-to-Launch Systems | CH Business Services" },
      { name: "description", content: "Buy and sell AI business kits — ready-to-launch systems with prompts, agents, configs, and sales flows. 28 products across 14 categories." },
      { property: "og:title", content: "AI Business Kits Marketplace — Ready-to-Launch Systems | CH Business Services" },
      { property: "og:description", content: "Buy and sell AI business kits — ready-to-launch systems with prompts, agents, configs, and sales flows. 28 products across 14 categories." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/marketplace" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Business Kits Marketplace — Ready-to-Launch Systems | CH Business Services" },
      { name: "twitter:description", content: "Buy and sell AI business kits — ready-to-launch systems with prompts, agents, configs, and sales flows." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/marketplace" },
    ],
  }),
});

const categories = [
  { slug: "sales", name: "Sales Businesses", description: "AI-powered outbound and closing systems" },
  { slug: "support", name: "Support Businesses", description: "Customer service and ticket automation" },
  { slug: "content", name: "Content Businesses", description: "SEO content engines and publishing" },
  { slug: "marketing", name: "Marketing Businesses", description: "Campaign management and ad optimization" },
  { slug: "automation", name: "Automation Businesses", description: "Workflow and integration systems" },
  { slug: "research", name: "Research Businesses", description: "Market intelligence and signal analysis" },
  { slug: "local-services", name: "Local Service Businesses", description: "Lead-gen and operations for local pros" },
  { slug: "lead-generation", name: "Lead-Generation Systems", description: "Cold outreach and pipeline automation" },
  { slug: "seo", name: "SEO Businesses", description: "Audit, rank-tracking, and optimization" },
  { slug: "niche-authority", name: "Niche Authority Sites", description: "Content-first domain authority builders" },
  { slug: "membership", name: "Membership Businesses", description: "Subscription and community platforms" },
  { slug: "report-vaults", name: "Report Vaults", description: "Intelligence subscription businesses" },
  { slug: "ai-assistant", name: "AI Assistant Businesses", description: "Conversational AI and agent systems" },
  { slug: "vertical-saas", name: "Vertical SaaS Starter Kits", description: "Niche software-as-a-service templates" },
];

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="card-premium group relative overflow-hidden p-8">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 text-sm font-bold text-white shadow-sm">
        {step}
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
      <p className="mt-2 leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

function Marketplace() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // If we're on a child route (e.g. /marketplace/sales), render the child content
  if (pathname !== "/marketplace") {
    return <Outlet />;
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Buy and sell <span className="gradient-text">AI businesses</span> built to run.
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                Browse ready-to-launch AI business kits — complete with prompts, agents, configs, and sales flows.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Explore by category
              </h2>
              <p className="mt-4 text-lg text-gray-600">Every kit is a complete business — not just code. Pick your niche.</p>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 40}>
                <Link
                  to={`/marketplace/${cat.slug}`}
                  className="card-premium group p-6"
                >
                  <h3 className="text-base font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{cat.description}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured products</h2>
              <p className="mt-4 text-lg text-gray-600">Top-selling AI business kits ready to launch today.</p>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Cold Email Outreach Engine",
                category: "sales",
                price: "$3,500",
                description: "AI-powered outreach with lead scraping, email sequences, and A/B testing — launch campaigns that convert at scale.",
                features: ["AI lead scraping", "Multi-step email sequences", "A/B testing engine", "CRM auto-sync"],
                link: "https://buy.stripe.com/fZu4gzaG5fxK3h82gY9Zm0o",
                popular: true,
              },
              {
                title: "SEO Content Engine",
                category: "content",
                price: "$5,000",
                description: "Auto-generates keyword-optimized blog posts at scale, with internal linking and content calendars built-in.",
                features: ["Keyword research automation", "AI content generation", "Content calendar", "Performance tracking"],
                link: "https://buy.stripe.com/3cI14n15v0CQ04W7Bi9Zm0m",
                popular: false,
              },
              {
                title: "Ad Optimization Agent",
                category: "marketing",
                price: "$4,500",
                description: "AI agent that optimizes ad spend across Google & Facebook — maximize ROAS with automated adjustments.",
                features: ["Cross-platform bid management", "Creative A/B testing", "Audience segmentation", "Real-time alerts"],
                link: "https://buy.stripe.com/3cI14n15v0CQ04W7Bi9Zm0m",
                popular: false,
              },
            ].map((product, i) => (
              <AnimatedSection key={product.title} delay={i * 100}>
                <div className="card-premium group relative flex flex-col overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {product.popular && (
                    <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                      Popular
                    </span>
                  )}
                  <span className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {product.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-gray-900">{product.title}</h3>
                  <p className="mt-1.5 text-2xl font-bold text-indigo-600">{product.price}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{product.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
                  >
                    Buy Now — {product.price}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How it works</h2>
            </div>
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Browse", description: "Find a business kit that matches your skills and goals." },
              { step: "2", title: "Buy", description: "Purchase the kit. Get the full package: site, prompts, agents, config, and docs." },
              { step: "3", title: "Run or Resell", description: "Launch it as-is, customize it, or list it back on the marketplace." },
            ].map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 100}>
                <StepCard {...s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 py-20 lg:py-28">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Launch your AI business today</h2>
            <p className="mt-4 text-lg text-indigo-100">Pre-built kits ready to launch — or list your own kit and earn from every sale.</p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/cNi4gz29zadq2d47Bi9Zm0f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                Buy AI Business Kit — Pro ($15,000)
              </a>
              <Link to="/contact" className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]">
                List your kit
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
