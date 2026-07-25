import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState, useEffect } from "react";
import { getPublicSignals, type MarketSignal } from "~/lib/intelligence";

export const Route = createFileRoute("/intelligence")({
  component: Intelligence,
});

const STRIPE_VAULT_LINK = "https://buy.stripe.com/28E28r15v99m1909Jq9Zm0c";

function scoreColor(score: number): string {
  if (score >= 80) return "from-emerald-500 to-emerald-400";
  if (score >= 60) return "from-amber-500 to-amber-400";
  if (score >= 40) return "from-orange-500 to-orange-400";
  return "from-red-500 to-red-400";
}

function TrendIcon({ direction }: { direction: string | null }) {
  if (direction === "rising") return <span className="text-emerald-600 font-bold" title="Rising">↑ Rising</span>;
  if (direction === "declining") return <span className="text-red-500 font-bold" title="Declining">↓ Declining</span>;
  return <span className="text-amber-500 font-bold" title="Stable">→ Stable</span>;
}

function SampleCard({ signal }: { signal: MarketSignal }) {
  return (
    <div className="card-premium group relative overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {signal.niche}
          </span>
          <h3 className="mt-2 font-serif text-base font-semibold text-brand-text">{signal.keyword}</h3>
        </div>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${
          signal.opportunity_score >= 80 ? "bg-emerald-50 text-emerald-700" :
          signal.opportunity_score >= 60 ? "bg-amber-50 text-amber-700" :
          "bg-orange-50 text-orange-700"
        }`}>
          {signal.opportunity_score}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${scoreColor(signal.opportunity_score)}`}
          style={{ width: `${signal.opportunity_score}%` }}
        />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-brand-text-secondary">{signal.summary || "No summary"}</p>
      <div className="mt-2 flex items-center gap-3 text-xs text-brand-text-muted">
        {signal.search_volume && <span className="font-mono">{signal.search_volume.toLocaleString()} searches/mo</span>}
        <TrendIcon direction={signal.trend_direction} />
      </div>
    </div>
  );
}

function IntelCard({ title, description, cta, href, highlight }: {
  title: string; description: string; cta: string; href: string; highlight?: boolean;
}) {
  return (
    <div className={`card-premium group relative overflow-hidden p-8 ${highlight ? "border-brand-accent/30 ring-1 ring-brand-accent/15" : ""}`}>
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h3 className="font-serif text-lg font-semibold tracking-tight text-brand-text">{title}</h3>
      <p className="mt-3 leading-relaxed text-brand-text-secondary">{description}</p>
      <Link
        to={href}
        className={`mt-5 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
          highlight
            ? "bg-brand-accent text-white hover:bg-brand-accent-dark"
            : "border border-brand-border bg-white text-brand-text hover:bg-brand-surface-alt"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

function Intelligence() {
  const [samples, setSamples] = useState<MarketSignal[]>([]);

  useEffect(() => {
    getPublicSignals()
      .then(data => setSamples(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-surface-alt">
        <div className="absolute inset-0 hero-dots-light opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
              See the market <span className="gradient-text">before everyone else</span> does.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-secondary">
              Our intelligence engine scans search data, competition signals, and market trends to surface high-opportunity niches — ranked, scored, and ready to act on.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={250}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/vault" className="btn-primary px-8 py-4 text-base">
                Browse the Vault
              </Link>
              <a
                href={STRIPE_VAULT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 text-base"
              >
                Subscribe — $99/mo
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-center section-heading">
              How the intelligence engine works
            </h2>
          </AnimatedSection>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Signal Detection",
                desc: "We scan search trends, competitor landscapes, demographic shifts, and public data to spot emerging market gaps before they become crowded.",
              },
              {
                step: "02",
                title: "Opportunity Scoring",
                desc: "Every signal is scored 1–100 based on search volume, competition level, trend direction, and monetization potential. Higher scores = faster action.",
              },
              {
                step: "03",
                title: "Deep-Dive Reports",
                desc: "High-scoring signals get full intelligence reports: market sizing, competitor analysis, keyword data, and 3-step action plans you can execute immediately.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 150}>
                <div className="text-center">
                  <span className="font-mono text-5xl font-bold text-brand-accent/15">{item.step}</span>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-brand-text">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-brand-text-secondary">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample reports */}
      {samples.length > 0 && (
        <section className="section-pad bg-brand-surface-alt">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-center section-heading">
                Recent market signals
              </h2>
              <p className="text-center section-subtitle">
                A preview of what our engine is detecting right now.
              </p>
            </AnimatedSection>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {samples.map((s, i) => (
                <AnimatedSection key={s.id} delay={i * 120}>
                  <SampleCard signal={s} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Offerings */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-center section-heading">
              Intelligence products
            </h2>
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <IntelCard
              title="Report Vault"
              description="Full access to all published reports, new drops weekly, and archive search. $99/month."
              cta="Open the vault"
              href="/vault"
              highlight
            />
            <IntelCard
              title="Free sample reports"
              description="Preview our methodology with a sample intelligence report. See how we rank opportunities."
              cta="View sample"
              href="/vault/sample"
            />
            <IntelCard
              title="Custom validation briefs"
              description="A private research sprint on your niche or opportunity — delivered in days."
              cta="Order a brief"
              href="/briefs"
            />
            <IntelCard
              title="Weekly opportunity alerts"
              description="New niche gaps, pain-point spikes, and emerging market signals delivered to your inbox."
              cta="Get alerts"
              href="/alerts"
            />
            <IntelCard
              title="AI business kits"
              description="Ready-to-run business assets — agent definitions, prompts, and config — built from our intelligence."
              cta="Browse marketplace"
              href="/marketplace"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark-gradient py-24 lg:py-32">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Intelligence that <span className="gradient-text">pays for itself</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-text-muted">
              Join founders and operators who use our signals to spot opportunities before the crowd.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/vault" className="btn-primary px-8 py-4 text-base">
                Browse reports
              </Link>
              <a
                href={STRIPE_VAULT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-8 py-4 text-base"
              >
                Subscribe to vault
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
