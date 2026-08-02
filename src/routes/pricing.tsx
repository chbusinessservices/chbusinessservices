import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { withSuccessUrl } from "~/lib/fulfillment";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — Packages from $1,500 | CH Business Services" },
      { name: "description", content: "Transparent pricing for conversion websites, automation systems, Growth OS retainers, and AI business kits. Free gap scan included." },
      { property: "og:title", content: "Pricing — Packages from $1,500 | CH Business Services" },
      { property: "og:description", content: "Transparent pricing for conversion websites, automation systems, Growth OS retainers, and AI business kits. Free gap scan included." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/pricing" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — Packages from $1,500 | CH Business Services" },
      { name: "twitter:description", content: "Transparent pricing for conversion websites, automation systems, Growth OS retainers, and AI business kits. Free gap scan included." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/pricing" },
    ],
  }),
});

/* ─── Preserved Stripe links from original tiers ─── */

const STRIPE = {
  conversionSite: "https://buy.stripe.com/4gM5kD01r4T6eZQg7O9Zm08",
  automation: "https://buy.stripe.com/14A5kD29z5XadVM3l29Zm09",
  growthOS: "https://buy.stripe.com/eVq8wP6pPbhubNEf3K9Zm0b",
  reportVault: "https://buy.stripe.com/28E28r15v99m1909Jq9Zm0c",
  customBrief: "https://buy.stripe.com/8x2bJ101r99m2d48Fm9Zm0d",
  aiBusinessKit: "https://buy.stripe.com/3cIaEW30feyodkA8UQf3a05",
};

/* ─── Package comparison data ─── */

interface PkgCol {
  name: string;
  price: string;
  features: (string | boolean)[];
  cta: string;
  href?: string;
  stripeLink?: string;
  highlight?: boolean;
}

const PACKAGES: PkgCol[] = [
  {
    name: "Starter",
    price: "Free",
    features: [true, false, false, "Basic", "Email", false],
    cta: "Get free scan",
    href: "/offers/gap-scan",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$997/mo",
    features: [true, true, "1 workflow", "Advanced", "Priority", "Monthly"],
    cta: "Start Growth",
    stripeLink: withSuccessUrl(STRIPE.growthOS, "growth-os-retainer"),
    highlight: true,
  },
  {
    name: "Pro",
    price: "$2,000/mo",
    features: [true, true, "Multiple agents", "Full audit", "Dedicated", "Weekly"],
    cta: "Go Pro",
    stripeLink: withSuccessUrl(STRIPE.automation, "automation-pro"),
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [true, true, "Custom", "Dedicated", "24/7", "Real-time"],
    cta: "Contact us",
    stripeLink: withSuccessUrl(STRIPE.customBrief, "custom-brief"),
    highlight: false,
  },
];

const FEATURE_LABELS = [
  "Gap Scan",
  "Conversion Site",
  "Automation",
  "SEO Setup",
  "Support",
  "Reports",
];

/* ─── Add-on cards data ─── */

interface Addon {
  name: string;
  price: string;
  desc: string;
  cta: string;
  stripeLink: string;
}

const ADDONS: Addon[] = [
  {
    name: "Conversion Site Sprint",
    price: "$1,500",
    desc: "Launch a site that converts — positioning, homepage copy, design system, and basic SEO in one sprint.",
    cta: "Buy now — $1,500",
    stripeLink: withSuccessUrl(STRIPE.conversionSite, "conversion-site-sprint"),
  },
  {
    name: "Custom Brief",
    price: "$500",
    desc: "Private research sprint on a niche or opportunity — validation, competitors, keywords, monetization path.",
    cta: "Buy now — $500",
    stripeLink: withSuccessUrl(STRIPE.customBrief, "custom-brief"),
  },
  {
    name: "Report Vault",
    price: "$99/mo",
    desc: "Ongoing market-gap intelligence — report access, new drops, alerts, and full archive search.",
    cta: "Subscribe — $99/mo",
    stripeLink: withSuccessUrl(STRIPE.reportVault, "report-vault"),
  },
  {
    name: "AI Business Kit Starter",
    price: "$3,000",
    desc: "Launch-ready packaged business — brand, site, prompt set, automations, report logic, and sales flow.",
    cta: "Buy now — $3,000",
    stripeLink: withSuccessUrl(STRIPE.aiBusinessKit, "starter"),
  },
];

/* ─── FAQ data ─── */

const FAQS = [
  {
    q: "What's included in the free Gap Scan?",
    a: "The free Gap Scan is a quick diagnostic of your current digital presence. We identify the single highest-leverage opportunity — whether that's a conversion bottleneck, an automation gap, or an untapped niche — and give you a clear next-step recommendation. No commitment, no credit card.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can move between plans at any time. When you upgrade, you get immediate access to the new tier's features and we prorate the difference. Downgrades take effect at the end of your current billing cycle — nothing is lost.",
  },
  {
    q: "Do you offer custom packages for larger businesses?",
    a: "Yes — our Enterprise tier is built for that. We'll design a custom scope with dedicated automation, SEO, and support. Reach out through the Enterprise CTA and we'll put together a tailored proposal within 48 hours.",
  },
];

/* ─── Stripe button component ─── */

function StripeButton({
  href,
  children,
  variant = "navy",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "navy" | "outline";
}) {
  const base =
    "inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";
  const variants: Record<string, string> = {
    gold: "bg-brand-accent text-white hover:bg-brand-accent-dark hover:shadow-md",
    navy: "bg-brand-dark text-white hover:bg-brand-dark-lighter",
    outline: "border border-brand-dark bg-white text-brand-text hover:bg-brand-surface-alt",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </a>
  );
}

/* ─── Checkmark icon ─── */

function Check({ className = "h-5 w-5 text-brand-accent" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Dash({ className = "h-5 w-5 text-brand-text-muted" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
}

/* ─── ROI Calculator ─── */

function ROICalculator() {
  const [leads, setLeads] = useState(50);
  const [dealSize, setDealSize] = useState(2000);
  const [conversionRate, setConversionRate] = useState(3);

  const currentRevenue = Math.round(leads * (conversionRate / 100) * dealSize);
  const improvedRevenue = Math.round(currentRevenue * 3.2);
  const extra = improvedRevenue - currentRevenue;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <section className="section-pad bg-brand-surface-alt">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-heading text-center">
            What's your upside?
          </h2>
          <p className="section-subtitle text-center">
            Drag the sliders to see how much more revenue our systems can unlock.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="mt-10 space-y-8 rounded-2xl bg-white p-6 shadow-sm border border-brand-border-light sm:p-8">
            {/* Leads slider */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-brand-text">
                  How many leads do you get per month?
                </label>
                <span className="font-mono text-lg font-bold text-brand-accent">{leads}</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="mt-2 w-full h-2 bg-brand-surface-alt rounded-lg appearance-none cursor-pointer accent-brand-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-brand-text-muted">
                <span>5</span>
                <span>500</span>
              </div>
            </div>

            {/* Deal size slider */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-brand-text">
                  What's your average deal size?
                </label>
                <span className="font-mono text-lg font-bold text-brand-accent">
                  {fmt(dealSize)}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={dealSize}
                onChange={(e) => setDealSize(Number(e.target.value))}
                className="mt-2 w-full h-2 bg-brand-surface-alt rounded-lg appearance-none cursor-pointer accent-brand-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-brand-text-muted">
                <span>$100</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Conversion rate slider */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-brand-text">
                  Current conversion rate?
                </label>
                <span className="font-mono text-lg font-bold text-brand-accent">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="mt-2 w-full h-2 bg-brand-surface-alt rounded-lg appearance-none cursor-pointer accent-brand-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-brand-text-muted">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-xl bg-brand-surface-alt p-5 space-y-3 border border-brand-border-light">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-text-secondary">Current monthly revenue from leads:</span>
                <span className="font-mono font-semibold text-brand-text">{fmt(currentRevenue)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-text-secondary">With our system (avg 3.2× improvement):</span>
                <span className="font-mono font-bold text-brand-accent text-lg">{fmt(improvedRevenue)}</span>
              </div>
              <div className="pt-3 border-t border-brand-border-light flex items-center justify-between">
                <span className="text-base font-semibold text-brand-text">That's extra per month:</span>
                <span className="font-mono text-xl font-bold text-brand-accent">{fmt(extra)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/offers/gap-scan"
              className="btn-primary w-full py-4 text-base"
            >
              Capture that revenue — start with a Gap Scan
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */

function PricingFAQ() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-heading text-center">
            Pricing FAQ
          </h2>
        </AnimatedSection>

        <div className="mt-10 space-y-4">
          {FAQS.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <details className="group rounded-2xl border border-brand-border-light bg-white shadow-sm transition-shadow hover:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left font-serif text-lg font-semibold text-brand-text marker:content-none">
                  <span>{faq.q}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-brand-accent transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-brand-text-secondary leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */

function Pricing() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-brand-surface-alt">
        <div className="absolute inset-0 hero-dots-light opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
              Simple pricing.{" "}
              <span className="gradient-text">Serious value.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-secondary">
              Every package includes a free Gap Scan first — we find your
              highest-leverage opportunity before you spend a dollar.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Package Comparison Grid ─── */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="section-heading text-center">
              Compare packages
            </h2>
            <p className="section-subtitle text-center">
              Find the right fit — every plan starts with a free Gap Scan.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-brand-border-light bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left">
                {/* Head */}
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="px-6 py-5 font-serif text-lg font-semibold">Feature</th>
                    {PACKAGES.map((pkg) => (
                      <th
                        key={pkg.name}
                        className={`px-5 py-5 text-center font-serif text-lg font-semibold ${
                          pkg.highlight ? "text-brand-accent-light" : ""
                        }`}
                      >
                        <div>{pkg.name}</div>
                        <div className="mt-1 font-mono text-sm font-normal text-white/70">
                          {pkg.price}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* Body */}
                <tbody className="divide-y divide-brand-border-light">
                  {FEATURE_LABELS.map((label, fi) => (
                    <tr key={label} className="hover:bg-brand-surface-alt/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-brand-text">{label}</td>
                      {PACKAGES.map((pkg, pi) => {
                        const val = pkg.features[fi];
                        if (typeof val === "boolean") {
                          return (
                            <td key={pi} className="px-5 py-4 text-center">
                              {val ? (
                                <Check className="mx-auto h-5 w-5 text-brand-accent" />
                              ) : (
                                <Dash className="mx-auto h-5 w-5 text-brand-text-muted" />
                              )}
                            </td>
                          );
                        }
                        return (
                          <td
                            key={pi}
                            className={`px-5 py-4 text-center text-sm ${
                              pkg.highlight ? "font-semibold text-brand-accent" : "text-brand-text-secondary"
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* CTA row */}
                  <tr>
                    <td className="px-6 py-5" />
                    {PACKAGES.map((pkg) => (
                      <td key={pkg.name} className="px-4 py-5">
                        {pkg.stripeLink ? (
                          <StripeButton
                            href={pkg.stripeLink}
                            variant={pkg.highlight ? "gold" : "navy"}
                          >
                            {pkg.cta}
                          </StripeButton>
                        ) : (
                          <Link
                            to={pkg.href ?? "/"}
                            className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border border-brand-dark bg-white text-brand-text hover:bg-brand-surface-alt"
                          >
                            {pkg.cta}
                          </Link>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Add-on Cards ─── */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="section-heading text-center">
              Individual services
            </h2>
            <p className="section-subtitle text-center">
              One-off projects — no subscription required.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((addon, i) => (
              <AnimatedSection key={addon.name} delay={i * 100}>
                <div className="card-premium flex h-full flex-col p-6">
                  <h3 className="font-serif text-lg font-semibold text-brand-text">
                    {addon.name}
                  </h3>
                  <p className="mt-2 font-mono text-2xl font-bold text-brand-accent">
                    {addon.price}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-text-secondary">
                    {addon.desc}
                  </p>
                  <a
                    href={addon.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark-lighter active:translate-y-0"
                  >
                    {addon.cta}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROI Calculator ─── */}
      <ROICalculator />

      {/* ─── FAQ ─── */}
      <PricingFAQ />

      {/* ─── Trust Strip ─── */}
      <section className="bg-brand-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            {[
              "No hidden fees",
              "No long-term contracts",
              "Cancel anytime",
            ].map((text, i) => (
              <div key={text} className="flex items-center gap-2.5 text-white">
                <Check className="h-5 w-5 text-brand-accent" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
