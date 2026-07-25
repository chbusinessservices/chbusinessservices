import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState, useEffect } from "react";
import { getPublicSignals, type MarketSignal } from "~/lib/intelligence";

export const Route = createFileRoute("/vault")({
  component: Vault,
});

const STRIPE_VAULT_LINK = "https://buy.stripe.com/28E28r15v99m1909Jq9Zm0c";
const FREE_PREVIEW_COUNT = 3;

/* ─── Score color ─── */

function scoreColor(score: number): string {
  if (score >= 80) return "from-emerald-500 to-emerald-400";
  if (score >= 60) return "from-amber-500 to-amber-400";
  if (score >= 40) return "from-orange-500 to-orange-400";
  return "from-red-500 to-red-400";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-50 text-emerald-700";
  if (score >= 60) return "bg-amber-50 text-amber-700";
  if (score >= 40) return "bg-orange-50 text-orange-700";
  return "bg-red-50 text-red-700";
}

/* ─── Trend ─── */

function TrendIcon({ direction }: { direction: string | null }) {
  if (direction === "rising") return <span className="text-emerald-600 font-bold" title="Rising">↑ Rising</span>;
  if (direction === "declining") return <span className="text-red-500 font-bold" title="Declining">↓ Declining</span>;
  return <span className="text-amber-500 font-bold" title="Stable">→ Stable</span>;
}

/* ─── Report card ─── */

function ReportCard({ signal, isLocked }: { signal: MarketSignal; isLocked: boolean }) {
  return (
    <div className="card-premium group relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {signal.niche}
          </span>
          <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight text-brand-text group-hover:text-brand-accent transition-colors">
            {signal.keyword}
          </h3>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${scoreBg(signal.opportunity_score)}`}>
            {signal.opportunity_score}
          </span>
        </div>
      </div>

      {/* Score bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${scoreColor(signal.opportunity_score)} transition-all duration-700`}
          style={{ width: `${signal.opportunity_score}%` }}
        />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-text-secondary">
        {signal.summary || "No summary available."}
      </p>

      <div className="mt-3 flex items-center gap-4 text-xs text-brand-text-muted">
        {signal.search_volume && (
          <span className="font-mono">{signal.search_volume.toLocaleString()} searches/mo</span>
        )}
        <span className="inline-flex items-center gap-1">
          <TrendIcon direction={signal.trend_direction} />
        </span>
      </div>

      <div className="mt-4">
        {isLocked ? (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Subscribe to unlock
          </div>
        ) : (
          <Link
            to="/reports/$slug"
            params={{ slug: String(signal.id) }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accent-dark transition-colors"
          >
            Read full report
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-brand-text-secondary">{text}</span>
    </li>
  );
}

function Vault() {
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicSignals()
      .then(setSignals)
      .catch((e) => setError(e.message || "Failed to load reports"))
      .finally(() => setLoading(false));
  }, []);

  // First 3 free, rest locked
  const freeReports = signals.slice(0, FREE_PREVIEW_COUNT);
  const lockedReports = signals.slice(FREE_PREVIEW_COUNT);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-surface-alt">
        <div className="absolute inset-0 hero-dots-light opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
              The Market <span className="gradient-text">Intelligence Vault</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-secondary">
              Data-backed market opportunity reports. New intelligence drops weekly. First 3 reports free — unlock the full vault to access all reports.
            </p>
            <p className="mt-4 font-serif text-3xl font-bold tracking-tight text-brand-text">
              $99<span className="text-lg font-normal text-brand-text-secondary">/month</span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={250}>
            <a
              href={STRIPE_VAULT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 px-8 py-4 text-base"
            >
              Subscribe to Report Vault
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Report Grid */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="h-8 w-8 animate-spin text-brand-accent" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="ml-3 text-brand-text-secondary">Loading reports...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-brand-text-secondary">
              <p>{error}</p>
            </div>
          ) : signals.length === 0 ? (
            <div className="text-center py-20">
              <AnimatedSection>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-400">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-brand-text">No reports yet</h3>
                <p className="mt-2 text-brand-text-secondary">Check back soon — our intelligence engine is scanning for opportunities.</p>
              </AnimatedSection>
            </div>
          ) : (
            <>
              {/* Free preview reports */}
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Free Preview
                  </span>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-text">
                    Top {FREE_PREVIEW_COUNT} Reports
                  </h2>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {freeReports.map((s, i) => (
                  <AnimatedSection key={s.id} delay={i * 100}>
                    <ReportCard signal={s} isLocked={false} />
                  </AnimatedSection>
                ))}
              </div>

              {/* Locked reports */}
              {lockedReports.length > 0 && (
                <>
                  <AnimatedSection delay={200}>
                    <div className="relative mt-16 mb-8">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-amber-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Vault Members Only — {lockedReports.length} additional reports
                        </span>
                      </div>
                    </div>
                  </AnimatedSection>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-70">
                    {lockedReports.map((s, i) => (
                      <AnimatedSection key={s.id} delay={i * 100}>
                        <ReportCard signal={s} isLocked={true} />
                      </AnimatedSection>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* What you get */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="section-heading">What you get</h2>
            <ul className="mt-8 space-y-4">
              <CheckItem text="Full report access — every niche report, unlocked with deep-dive analysis." />
              <CheckItem text="New drops weekly — fresh intelligence added to the vault every week." />
              <CheckItem text="Keyword data — search volumes, competition levels, and trend analysis." />
              <CheckItem text="Action plans — 3-step execution roadmaps for each opportunity." />
              <CheckItem text="Monetization paths — revenue projections and go-to-market strategies." />
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-dark-gradient">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to get ahead of the market?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-text-muted">
              Join the vault and unlock every report — plus new drops every week.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={STRIPE_VAULT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-base"
              >
                Subscribe — $99/month
              </a>
              <Link to="/vault/sample" className="btn-ghost px-8 py-4 text-base">
                Try a free sample
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
