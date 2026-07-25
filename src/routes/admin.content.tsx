import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "~/components/AdminLayout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState, useEffect, useCallback } from "react";
import {
  getContentBriefs,
  getSignals,
  generateContentBrief,
  generateContent,
  publishContent,
  unpublishContent,
  seedContentBriefs,
  createContentBriefsTable,
  type ContentBrief,
  type MarketSignal,
} from "~/lib/intelligence";

export const Route = createFileRoute("/admin/content")({
  component: ContentManager,
});

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-700",
    draft: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function ContentManager() {
  const navigate = useNavigate();
  const [briefs, setBriefs] = useState<ContentBrief[]>([]);
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Generate brief from signal
  const [generatingBrief, setGeneratingBrief] = useState<number | null>(null);
  const [showSignalPicker, setShowSignalPicker] = useState(false);

  // Generate content
  const [generatingContent, setGeneratingContent] = useState<number | null>(null);

  // Preview
  const [previewBrief, setPreviewBrief] = useState<ContentBrief | null>(null);

  // Seed
  const [seeding, setSeeding] = useState(false);

  const flash = (msg: string) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(null), 3000);
  };

  const loadBriefs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getContentBriefs();
      setBriefs(data);
    } catch (e: any) {
      if (e.message?.includes("Unauthorized")) {
        navigate({ to: "/admin/login" });
        return;
      }
      setError(e.message || "Failed to load content briefs");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const loadSignals = useCallback(async () => {
    try {
      const data = await getSignals();
      setSignals(data);
    } catch (_) {
      // Signals may fail if table doesn't exist yet
    }
  }, []);

  useEffect(() => {
    loadBriefs();
    loadSignals();
  }, [loadBriefs, loadSignals]);

  const handleSeed = async () => {
    try {
      setSeeding(true);
      await createContentBriefsTable();
      const result = await seedContentBriefs();
      flash(result.message || "Seeded successfully");
      await loadBriefs();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const handleGenerateBrief = async (signalId: number) => {
    try {
      setGeneratingBrief(signalId);
      setShowSignalPicker(false);
      const result = await generateContentBrief({ signal_id: signalId });
      flash(`Brief created: "${result.brief.title}"`);
      await loadBriefs();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    } finally {
      setGeneratingBrief(null);
    }
  };

  const handleGenerateContent = async (briefId: number) => {
    try {
      setGeneratingContent(briefId);
      const result = await generateContent({ brief_id: briefId });
      flash(`Content generated! ~${result.word_count} words`);
      await loadBriefs();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    } finally {
      setGeneratingContent(null);
    }
  };

  const handleTogglePublish = async (brief: ContentBrief) => {
    try {
      if (brief.status === "published") {
        await unpublishContent({ id: brief.id });
        flash("Unpublished");
      } else {
        await publishContent({ id: brief.id });
        flash("Published!");
      }
      await loadBriefs();
    } catch (e: any) {
      flash(`Error: ${e.message}`);
    }
  };

  const handlePreview = (brief: ContentBrief) => {
    setPreviewBrief(brief);
  };

  // Unused signals (no brief yet)
  const usedSignalIds = new Set(briefs.map(b => b.signal_id).filter(Boolean));
  const unusedSignals = signals.filter(s => !usedSignalIds.has(s.id));

  return (
    <AdminLayout currentPath="/admin/content">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                Content Manager
              </h1>
              <p className="mt-1 text-brand-gray">
                SEO content briefs and blog generation. {briefs.length} briefs tracked.
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
                  "Seed 5 Content Briefs"
                )}
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSignalPicker(!showSignalPicker)}
                  className="inline-flex items-center rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-md active:translate-y-0"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Generate Brief
                </button>
                {showSignalPicker && (
                  <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-brand-navy">Select a market signal</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2">
                      {unusedSignals.length === 0 ? (
                        <p className="px-3 py-4 text-sm text-gray-500">All signals have briefs. Add new signals first.</p>
                      ) : (
                        unusedSignals.map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => handleGenerateBrief(s.id)}
                            disabled={generatingBrief === s.id}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-cream disabled:opacity-50"
                          >
                            <div>
                              <p className="font-medium text-brand-navy">{s.keyword}</p>
                              <p className="text-xs text-brand-gray">{s.niche} · Score {s.opportunity_score}</p>
                            </div>
                            {generatingBrief === s.id && (
                              <svg className="h-4 w-4 animate-spin text-brand-gold" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Flash message */}
          {actionMsg && (
            <div className="mt-4 animate-fade-in-up rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {actionMsg}
            </div>
          )}
        </AnimatedSection>

        {/* Content preview panel */}
        {previewBrief && (
          <AnimatedSection delay={100}>
            <div className="mt-6 rounded-2xl border border-brand-border-light bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-brand-navy">{previewBrief.title}</h2>
                  <p className="mt-0.5 text-sm text-brand-gray">
                    {previewBrief.word_count} words · <StatusBadge status={previewBrief.status} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewBrief(null)}
                  className="rounded-lg p-2 text-brand-gray transition-colors hover:bg-gray-100 hover:text-brand-navy"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-6 max-h-[70vh]">
                {previewBrief.content ? (
                  <div
                    className="blog-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewBrief.content }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-brand-gray">
                    <svg className="h-12 w-12 text-brand-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-3 font-medium">No content yet</p>
                    <p className="mt-1 text-sm">Click "Generate Content" to create the blog post.</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Briefs Table */}
        <AnimatedSection delay={150}>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="h-8 w-8 animate-spin text-brand-gold" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="ml-3 text-brand-gray">Loading content briefs...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-red-500">
                <p>{error}</p>
                <button onClick={loadBriefs} className="btn-secondary mt-4 text-sm">Retry</button>
              </div>
            ) : briefs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-brand-gray">
                <svg className="h-12 w-12 text-brand-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-3 font-medium">No content briefs yet</p>
                <p className="mt-1 text-sm">Click "Generate Brief" or "Seed 5 Content Briefs" to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-brand-navy to-brand-navy-light">
                      {["Title", "Target Keyword", "Status", "Words", "Slug", "Actions"].map((col) => (
                        <th key={col} className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white/80">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {briefs.map((b) => (
                      <tr key={b.id} className="transition-colors hover:bg-brand-cream/50">
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-semibold text-brand-navy line-clamp-1 max-w-xs block">
                            {b.title}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                            {b.target_keyword}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <span className="text-sm font-mono text-brand-gray">
                            {b.word_count ? b.word_count.toLocaleString() : "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs font-mono text-brand-gray-light line-clamp-1 max-w-[120px] block">
                            /blog/{b.slug}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            {!b.content && (
                              <button
                                type="button"
                                onClick={() => handleGenerateContent(b.id)}
                                disabled={generatingContent === b.id}
                                className="inline-flex items-center gap-1 rounded-lg border border-brand-gold/50 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
                              >
                                {generatingContent === b.id ? (
                                  <>
                                    <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Gen...
                                  </>
                                ) : (
                                  "Gen Content"
                                )}
                              </button>
                            )}
                            {b.content && (
                              <button
                                type="button"
                                onClick={() => handlePreview(b)}
                                className="inline-flex items-center rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
                              >
                                Preview
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(b)}
                              className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                                b.status === "published"
                                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {b.status === "published" ? "Unpublish" : "Publish"}
                            </button>
                          </div>
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
