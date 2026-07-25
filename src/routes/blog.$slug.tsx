import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatedSection } from "~/components/AnimatedSection";
import { getPostBySlug, getPublishedPosts, type ContentBrief } from "~/lib/intelligence";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: async ({ params }) => {
    const post = await getPostBySlug({ slug: params.slug });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} — CH Business Services Blog` },
        {
          name: "description",
          content: post.meta_description || `Read ${post.title} on the CH Business Services blog.`,
        },
        { property: "og:title", content: post.title },
        {
          property: "og:description",
          content: post.meta_description || "",
        },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.published_at || "" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
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

function BlogPost() {
  const { post } = Route.useLoaderData();
  const [relatedPosts, setRelatedPosts] = useState<ContentBrief[]>([]);

  useEffect(() => {
    getPublishedPosts()
      .then(posts => {
        // Filter out current post and get up to 3 related
        const others = posts
          .filter(p => p.id !== post.id)
          .slice(0, 3);
        setRelatedPosts(others);
      })
      .catch(() => setRelatedPosts([]));
  }, [post.id]);

  return (
    <>
      {/* Hero header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30">
        <div className="absolute inset-0 hero-dots opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 sm:py-24">
          <AnimatedSection>
            {post.signal_niche && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {post.signal_niche}
              </span>
            )}
            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.meta_description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
                {post.meta_description}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-brand-gray">
              {post.published_at && <span>{formatDate(post.published_at)}</span>}
              <span>·</span>
              <span>{calculateReadTime(post.word_count)}</span>
              {post.word_count && (
                <>
                  <span>·</span>
                  <span>{post.word_count.toLocaleString()} words</span>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content area */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            {/* Main content */}
            <article>
              <AnimatedSection delay={100}>
                {post.content ? (
                  <div
                    className="blog-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-brand-gray">
                    <svg className="h-12 w-12 text-brand-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-3 font-medium">Content being prepared</p>
                  </div>
                )}
              </AnimatedSection>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Browse by topic */}
              {post.signal_niche && (
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-gold">
                    Topic
                  </h3>
                  <span className="mt-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                    {post.signal_niche}
                  </span>
                </div>
              )}

              {/* Keywords */}
              {post.secondary_keywords && (
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-gold">
                    Keywords
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.secondary_keywords.split(", ").map(kw => (
                      <span
                        key={kw}
                        className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-gold">
                    Related Posts
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {relatedPosts.map(rp => (
                      <li key={rp.id}>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: rp.slug }}
                          className="block text-sm font-medium text-brand-navy transition-colors hover:text-brand-gold"
                        >
                          {rp.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-6 text-center shadow-sm">
                <h3 className="font-serif text-lg font-bold text-white">
                  Get a free Gap Scan
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-light">
                  Discover exactly where your business is leaving money on the table.
                </p>
                <Link
                  to="/offers/gap-scan"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                >
                  Get Your Free Scan →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Ready to find your next opportunity?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-gray">
              Our market intelligence engine scans for high-opportunity niches so you don't have to.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link to="/offers/gap-scan" className="btn-primary px-8 py-4 text-base">
                Free Gap Scan
              </Link>
              <Link to="/blog" className="btn-secondary px-8 py-4 text-base">
                More articles
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
