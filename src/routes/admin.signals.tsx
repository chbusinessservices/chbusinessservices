import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "~/components/AdminLayout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState, useEffect, useCallback, type FormEvent } from "react";
import {
  getSignals,
  addSignal,
  generateReport,
  updateSignalStatus,
  seedSignals,
  createSignalsTable,
  type MarketSignal,
} from "~/lib/intelligence";

export const Route = createFileRoute("/admin/signals")({
  component: SignalScanner,
});

/* ─── Score color helpers ─── */

function scoreColor(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  if (score >= 40) return "bg-orange-400";
  return "bg-red-400";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-50 text-emerald-700";
  if (score >= 60) return "bg-amber-50 text-amber-700";
  if (score >= 40) return "bg-orange-50 text-orange-700";
  return "bg-red-50 text-red-700";
}

/* ─── Trend icon ─── */

function TrendIcon({ direction }: { direction: string | null }) {
  if (direction === "rising") {
    return <span className="text-emerald-600 font-bold text-lg" title="Rising">↑</span>;
  }
  if (direction === "declining") {
    return <span className="text-red-500 font-bold text-lg" title="Declining">↓</span>;
  }
  return <span className="text-amber-500 font-bold text-lg" title="Stable">→</span>;
}

/* ─── Status badge ─── */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-700",
    detected: "bg-blue-100 text-blue-700",
    draft: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

/* ─── Competition badge ─── */

function CompBadge({ level }: { level: string | null }) {
  if (!level) return <span className="text-gray-400 text-xs">—</span>;
  const map: Record<string, string> = {
    low: "bg-green-50 text-green-700 border-green-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    high: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${map[level] || ""}`}>
      {level}
    </span>
  );
}

function SignalScanner() {
  const navigate = useNavigate();
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Add signal form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    keyword: "",
    niche: "",
    opportunity_score: 50,
    search_volume: "",
    competition: "medium" as "low" | "medium" | "high",
    trend_direction: "stable" as "rising" | "stable" | "declining",
    summary: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Report generation tracking
  const [generating, setGenerating] = useState<number | null>(null);
  const [seeding, setSeeding] = useState(false);

  const loadSignals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSignals();
      setSignals(data);
    } catch (e: any) {
      if (e.message?.includes("Unauthorized")) {
        navigate({ to: "/admin/login" });
        return;
      }
      setError(e.message || "Failed to load signals");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadSignals();
  }, [loadSignals]);

  const flash = (msg: string) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(null), 3000);
  };

  const handleSeed = async () => {
    try {
      setSeeding(true);
      // Create table first
      await createSignalsTable();
      const result = await seedSignals();
      flash(result.message || "Seeded successfully");
      await loadSignals();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const handleGenerate = async (id: number) => {
    try {
      setGenerating(id);
      await generateReport({ id });
      flash("Report generated!");
      await loadSignals();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    } finally {
      setGenerating(null);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "published" ? "detected" : "published";
      await updateSignalStatus({ id, status: newStatus });
      flash(newStatus === "published" ? "Published!" : "Unpublished");
      await loadSignals();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    }
  };

  const handleAddSignal = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await addSignal({
        keyword: form.keyword,
        niche: form.niche,
        opportunity_score: form.opportunity_score,
        search_volume: form.search_volume ? parseInt(form.search_volume) : undefined,
        competition: form.competition,
        trend_direction: form.trend_direction,
        summary: form.summary || undefined,
      });
      flash("Signal added!");
      setShowForm(false);
      setForm({ keyword: "", niche: "", opportunity_score: 50, search_volume: "", competition: "medium", trend_direction: "stable", summary: "" });
      await loadSignals();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout currentPath="/admin/signals">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                Signal Scanner
              </h1>
              <p className="mt-1 text-brand-gray">
                Monitor and score incoming market signals. {signals.length} signals tracked.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSeed}
                disabled={seeding}
                className="inline-flex items-center rounded-xl border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-cream hover:border-brand-gold disabled:opacity-60"
              >
                {seeding ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Seeding...
                  </>
                ) : (
                  "Seed 15 sample signals"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-md active:translate-y-0"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Signal
              </button>
            </div>
          </div>

          {/* Flash message */}
          {actionMsg && (
            <div className="mt-4 animate-fade-in-up rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {actionMsg}
            </div>
          )}
        </AnimatedSection>

        {/* Add Signal Form */}
        {showForm && (
          <AnimatedSection delay={100}>
            <div className="mt-6 rounded-2xl border border-brand-border-light bg-white p-6 shadow-sm">
              <h2 className="font-serif text-lg font-semibold text-brand-navy">Add New Signal</h2>
              <form onSubmit={handleAddSignal} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-brand-gray">Keyword *</label>
                  <input type="text" required value={form.keyword} onChange={e => setForm({ ...form, keyword: e.target.value })}
                    className="input-premium mt-1" placeholder="e.g. Local SEO for plumbers" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gray">Niche *</label>
                  <input type="text" required value={form.niche} onChange={e => setForm({ ...form, niche: e.target.value })}
                    className="input-premium mt-1" placeholder="e.g. Plumbing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gray">Opportunity Score (1-100)</label>
                  <input type="number" min="1" max="100" value={form.opportunity_score} onChange={e => setForm({ ...form, opportunity_score: parseInt(e.target.value) || 0 })}
                    className="input-premium mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gray">Search Volume</label>
                  <input type="number" value={form.search_volume} onChange={e => setForm({ ...form, search_volume: e.target.value })}
                    className="input-premium mt-1" placeholder="e.g. 8200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gray">Competition</label>
                  <select value={form.competition} onChange={e => setForm({ ...form, competition: e.target.value as any })}
                    className="input-premium mt-1">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gray">Trend</label>
                  <select value={form.trend_direction} onChange={e => setForm({ ...form, trend_direction: e.target.value as any })}
                    className="input-premium mt-1">
                    <option value="rising">Rising</option>
                    <option value="stable">Stable</option>
                    <option value="declining">Declining</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-brand-gray">Summary</label>
                  <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })}
                    className="input-premium mt-1" rows={2} placeholder="Brief description of the market opportunity..." />
                </div>
                <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3">
                  <button type="submit" disabled={submitting}
                    className="btn-primary text-sm disabled:opacity-60">
                    {submitting ? "Adding..." : "Add Signal"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="btn-secondary text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        )}

        {/* Signals Table */}
        <AnimatedSection delay={150}>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="h-8 w-8 animate-spin text-brand-gold" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="ml-3 text-brand-gray">Loading signals...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-red-500">
                <p>{error}</p>
                <button onClick={loadSignals} className="btn-secondary mt-4 text-sm">Retry</button>
              </div>
            ) : signals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-brand-gray">
                <svg className="h-12 w-12 text-brand-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="mt-3 font-medium">No signals yet</p>
                <p className="mt-1 text-sm">Click "Seed 15 sample signals" or "Add Signal" to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-brand-navy to-brand-navy-light">
                      {["Keyword", "Niche", "Score", "Volume", "Comp", "Trend", "Status", "Report", "Actions"].map((col) => (
                        <th key={col} className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white/80">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {signals.map((s) => (
                      <tr key={s.id} className="transition-colors hover:bg-brand-cream/50">
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <span className="text-sm font-semibold text-brand-navy">{s.keyword}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                            {s.niche}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${scoreColor(s.opportunity_score)}`}
                                style={{ width: `${s.opportunity_score}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${scoreBg(s.opportunity_score)} rounded-full px-1.5 py-0.5`}>
                              {s.opportunity_score}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <span className="text-sm font-mono text-brand-gray">
                            {s.search_volume ? s.search_volume.toLocaleString() : "—"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <CompBadge level={s.competition} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-center">
                          <TrendIcon direction={s.trend_direction} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          {s.full_report ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Ready
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleGenerate(s.id)}
                              disabled={generating === s.id}
                              className="inline-flex items-center gap-1 rounded-lg border border-brand-gold/50 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
                            >
                              {generating === s.id ? (
                                <>
                                  <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                  </svg>
                                  Gen...
                                </>
                              ) : (
                                "Generate"
                              )}
                            </button>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(s.id, s.status)}
                            className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                              s.status === "published"
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {s.status === "published" ? "Unpublish" : "Publish"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </AdminLayout>
  );
}
