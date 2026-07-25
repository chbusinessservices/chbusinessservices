import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState, useEffect } from "react";
import { getSignalById, getPublicSignals, type MarketSignal } from "~/lib/intelligence";

export const Route = createFileRoute("/reports/$slug")({
  component: ReportDetail,
});

const STRIPE_VAULT_LINK = "https://buy.stripe.com/28E28r15v99m1909Jq9Zm0c";
const FREE_PREVIEW_COUNT = 3;

/* ─── Simple markdown-ish renderer ─── */

function MarkdownReport({ content }: { content: string }) {
  // Split into sections by ## headers
  const sections = content.split(/(?=^## )/m);

  return (
    <div className="prose-custom space-y-6">
      {sections.map((section, i) => {
        const lines = section.trim().split("\n");
        const headerLine = lines[0];
        const body = lines.slice(1).join("\n").trim();

        // Check if it's a heading
        if (headerLine.startsWith("# ")) {
          return (
            <div key={i}>
              <h1 className="font-serif text-3xl font-bold text-brand-navy">
                {headerLine.replace(/^# /, "")}
              </h1>
              {body && <RenderBody body={body} />}
            </div>
          );
        }

        if (headerLine.startsWith("## ")) {
          return (
            <div key={i}>
              <h2 className="font-serif text-xl font-semibold text-brand-navy mt-8 mb-4">
                {headerLine.replace(/^## /, "")}
              </h2>
              {body && <RenderBody body={body} />}
            </div>
          );
        }

        if (headerLine.startsWith("### ")) {
          return (
            <div key={i}>
              <h3 className="font-serif text-lg font-semibold text-brand-navy mt-6 mb-3">
                {headerLine.replace(/^### /, "")}
              </h3>
              {body && <RenderBody body={body} />}
            </div>
          );
        }

        // Regular paragraph block
        return body ? <RenderBody key={i} body={section.trim()} /> : null;
      })}
    </div>
  );
}

function RenderBody({ body }: { body: string }) {
  const blocks = body.split("\n\n").filter(Boolean);

  return (
    <>
      {blocks.map((block, j) => {
        // Table
        if (block.includes("|")) {
          const rows = block.split("\n").filter(r => r.includes("|"));
          if (rows.length >= 2) {
            const headers = rows[0].split("|").map(h => h.trim()).filter(Boolean);
            const dataRows = rows.slice(2).filter(r => r.includes("|"));
            return (
              <div key={j} className="my-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
                  <thead className="bg-brand-navy">
                    <tr>
                      {headers.map((h, hi) => (
                        <th key={hi} className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-white/80">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {dataRows.map((row, ri) => {
                      const cells = row.split("|").map(c => c.trim()).filter(Boolean);
                      return (
                        <tr key={ri} className="transition-colors hover:bg-gray-50">
                          {cells.map((cell, ci) => (
                            <td key={ci} className="px-4 py-2.5 text-sm text-brand-charcoal">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Bold text
        const withBold = block.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-brand-navy">$1</strong>');

        // List items
        if (block.trim().startsWith("- ")) {
          const items = block.split("\n").filter(l => l.trim().startsWith("- "));
          return (
            <ul key={j} className="my-3 space-y-1.5">
              {items.map((item, li) => (
                <li key={li} className="flex items-start gap-2 text-brand-charcoal">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-brand-navy">$1</strong>') }} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.trim().startsWith("|")) return null; // Table already handled

        return (
          <p key={j} className="my-3 leading-relaxed text-brand-charcoal" dangerouslySetInnerHTML={{ __html: withBold }} />
        );
      })}
    </>
  );
}

function ReportDetail() {
  const { slug } = Route.useParams();
  const [report, setReport] = useState<MarketSignal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [freeIds, setFreeIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Determine which reports are in the free preview tier
    getPublicSignals()
      .then((signals) => {
        const free = new Set(signals.slice(0, FREE_PREVIEW_COUNT).map(s => s.id));
        setFreeIds(free);
      })
      .catch(() => {});

    // Load this specific report
    const id = parseInt(slug);
    if (isNaN(id)) {
      setError("Invalid report ID");
      setLoading(false);
      return;
    }

    getSignalById({ id })
      .then((data) => {
        if (!data) {
          setError("Report not found");
        } else if (data.status !== "published") {
          setError("This report is not yet published");
        } else {
          setReport(data);
        }
      })
      .catch((e) => setError(e.message || "Failed to load report"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-brand-gold" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (error || !report) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 text-red-400">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-5 font-serif text-xl font-semibold text-brand-navy">{error || "Report not found"}</h2>
          <p className="mt-2 text-brand-gray">The report you're looking for isn't available.</p>
          <Link to="/vault" className="btn-primary mt-6 text-sm">Browse all reports</Link>
        </div>
      </section>
    );
  }

  const isFree = freeIds.has(report.id);
  const canAccess = isFree || report.id <= FREE_PREVIEW_COUNT;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-cream">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 sm:py-20">
          <AnimatedSection>
            <span className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-sm font-medium text-indigo-700">
              {report.niche}
            </span>
            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              {report.keyword}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                report.opportunity_score >= 80 ? "bg-emerald-50 text-emerald-700" :
                report.opportunity_score >= 60 ? "bg-amber-50 text-amber-700" :
                "bg-orange-50 text-orange-700"
              }`}>
                Score: {report.opportunity_score}/100
              </span>
              {report.search_volume && (
                <span className="font-mono text-brand-gray">{report.search_volume.toLocaleString()} monthly searches</span>
              )}
              {report.competition && (
                <span className="capitalize text-brand-gray">Competition: {report.competition}</span>
              )}
              {report.trend_direction && (
                <span className={`font-semibold ${report.trend_direction === "rising" ? "text-emerald-600" : report.trend_direction === "declining" ? "text-red-500" : "text-amber-500"}`}>
                  {report.trend_direction === "rising" ? "↑ Rising" : report.trend_direction === "declining" ? "↓ Declining" : "→ Stable"}
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Report content */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {canAccess && report.full_report ? (
            <AnimatedSection>
              <div className="rounded-2xl border border-brand-border-light bg-white p-6 sm:p-10 shadow-sm">
                <MarkdownReport content={report.full_report} />
              </div>
            </AnimatedSection>
          ) : report.full_report ? (
            /* Paywall for locked reports */
            <AnimatedSection>
              <div className="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/30 p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-500">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-brand-navy">Full report available to vault members</h3>
                <p className="mt-2 text-brand-gray">
                  This is a premium report. Subscribe to the Report Vault to unlock the complete analysis, including market sizing, competitor analysis, keyword data, and step-by-step action plans.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={STRIPE_VAULT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm px-6"
                  >
                    Subscribe — $99/month
                  </a>
                  <Link to="/vault" className="btn-secondary text-sm px-6">
                    View free reports
                  </Link>
                </div>
                <p className="mt-4 text-xs text-brand-gray-light">
                  First {FREE_PREVIEW_COUNT} reports are free. Subscribe to unlock all reports + weekly new drops.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            /* Report exists but no full_report generated yet */
            <AnimatedSection>
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-400">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-brand-navy">Full analysis in progress</h3>
                <p className="mt-2 text-brand-gray">Our intelligence engine is generating the full report. Check back soon, or browse other available reports.</p>
                <Link to="/vault" className="btn-primary mt-5 text-sm">Browse reports</Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Summary always visible */}
      {report.summary && (
        <section className="bg-brand-cream py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="font-serif text-xl font-semibold text-brand-navy">Signal Summary</h2>
              <div className="mt-4 rounded-xl border border-brand-border-light bg-white p-6 shadow-sm">
                <p className="leading-relaxed text-brand-charcoal">{report.summary}</p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Get every report, every week
            </h2>
            <p className="mt-3 text-brand-gray-light">
              Unlock the full vault — new intelligence drops weekly.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={STRIPE_VAULT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-base"
              >
                Subscribe — $99/month
              </a>
              <Link to="/vault" className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
                Browse vault
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
