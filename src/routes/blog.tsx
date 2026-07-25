import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatedSection } from "~/components/AnimatedSection";
import { getPublishedPosts, type ContentBrief } from "~/lib/intelligence";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — Business Growth & Automation Tips | CH Business Services" },
      { name: "description", content: "Expert insights on business automation, website conversion, AI business kits, and market intelligence. Read the CH Business Services blog." },
      { property: "og:title", content: "Blog — Business Growth & Automation Tips | CH Business Services" },
      { property: "og:description", content: "Expert insights on business automation, website conversion, AI business kits, and market intelligence. Read the CH Business Services blog." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/blog" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — Business Growth & Automation Tips | CH Business Services" },
      { name: "twitter:description", content: "Expert insights on business automation, website conversion, AI business kits, and market intelligence. Read the CH Business Services blog." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/blog" },
    ],
  }),
});

function calculateReadTime(wordCount: number | null): string {
  if (!wordCount) return "3 min read";
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Blog() {
  const [posts, setPosts] = useState<ContentBrief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique niches for topic sidebar
  const niches = [...new Set(posts.map(p => p.signal_niche).filter(Boolean))];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="gradient-text">Blog</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Actionable insights on finding demand, converting traffic, and building systems that sell.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main blog grid */}
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <svg className="h-8 w-8 animate-spin text-brand-gold" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="ml-3 text-brand-gray">Loading posts...</span>
                </div>
              ) : posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg className="h-12 w-12 text-brand-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="mt-3 font-medium text-brand-navy">No posts yet</p>
                  <p className="mt-1 text-sm text-brand-gray">Fresh content is on the way. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {posts.map((post, i) => (
                    <AnimatedSection key={post.id} delay={i * 100}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="card-premium group relative flex flex-col overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        {/* Niche badge */}
                        {post.signal_niche && (
                          <span className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                            {post.signal_niche}
                          </span>
                        )}

                        <h2 className="mt-3 font-serif text-xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-brand-gold">
                          {post.title}
                        </h2>

                        {post.meta_description && (
                          <p className="mt-3 flex-1 leading-relaxed text-gray-600 line-clamp-3">
                            {post.meta_description}
                          </p>
                        )}

                        {/* Meta row */}
                        <div className="mt-5 flex items-center gap-4 text-sm text-brand-gray">
                          {post.published_at && (
                            <span>{formatDate(post.published_at)}</span>
                          )}
                          <span>·</span>
                          <span>{calculateReadTime(post.word_count)}</span>
                        </div>

                        {/* Keyword tags */}
                        {post.secondary_keywords && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.secondary_keywords.split(", ").slice(0, 3).map(kw => (
                              <span
                                key={kw}
                                className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Read more arrow */}
                        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all group-hover:gap-2">
                          Read more
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Browse by topic */}
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Browse by Topic
                </h3>
                {niches.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {niches.map(niche => (
                      <li key={niche}>
                        <span className="flex items-center gap-2 text-sm text-brand-gray transition-colors hover:text-brand-navy">
                          <svg className="h-3 w-3 flex-shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {niche}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-brand-gray-light">Topics coming soon</p>
                )}
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-6 text-center shadow-sm">
                <h3 className="font-serif text-lg font-bold text-white">
                  Free Business Gap Scan
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-light">
                  Discover untapped opportunities in your market — in under 5 minutes.
                </p>
                <Link
                  to="/offers/gap-scan"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                >
                  Get Your Scan →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Want deeper market intelligence?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-gray">
              Join the Report Vault for weekly niche reports, competitor breakdowns, and actionable market briefs.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Link to="/vault" className="btn-primary mt-6 px-8 py-4 text-base">
              Join the vault
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
