import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
  head: () => ({
    meta: [
      { title: "Resources & Tools — CH Business Services" },
      {
        name: "description",
        content:
          "Curated tools and resources for service businesses: self-hosting infrastructure, developer tools, and learning materials to run and scale AI-powered operations.",
      },
      { property: "og:title", content: "Resources & Tools — CH Business Services" },
      {
        property: "og:description",
        content:
          "Curated tools and resources for service businesses: self-hosting infrastructure, developer tools, and learning materials to run and scale AI-powered operations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/resources" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Resources & Tools — CH Business Services" },
      {
        name: "twitter:description",
        content:
          "Curated tools and resources for service businesses: self-hosting infrastructure, developer tools, and learning materials.",
      },
    ],
    links: [{ rel: "canonical", href: "https://chbusinessservices.pro/resources" }],
  }),
});

interface Resource {
  name: string;
  url: string;
  description: string;
  badge: string;
}

interface ResourceCategory {
  id: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  resources: Resource[];
  placeholder?: boolean;
}

/* ─── Icons ─── */
function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}
function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}
function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

const categories: ResourceCategory[] = [
  {
    id: "infrastructure",
    title: "Infrastructure & Self-Hosting",
    blurb:
      "Run your kit and operations on infrastructure you control. These directories and services help teams self-host software and route traffic across providers without lock-in.",
    icon: <ServerIcon className="h-6 w-6" />,
    resources: [
      {
        name: "Awesome Self-Hosted",
        url: "https://awesome-selfhosted.net/",
        description:
          "A directory of free software solutions you can self-host. Browse alternatives for everything from project management to file sharing to CRM — ideal for businesses that want full control over their infrastructure and data.",
        badge: "Directory",
      },
      {
        name: "Omniroute",
        url: "https://omniroute.online/",
        description:
          "A routing and proxy service for managing and directing API traffic across multiple providers and endpoints. Useful for businesses running multi-agent AI systems that need reliable request routing.",
        badge: "API Routing",
      },
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    blurb:
      "Placeholder for the developer tooling we recommend when building, shipping, and maintaining AI business kits. We'll expand this section with vetted picks shortly.",
    icon: <CodeIcon className="h-6 w-6" />,
    placeholder: true,
    resources: [],
  },
  {
    id: "learning",
    title: "Learning Resources",
    blurb:
      "Placeholder for guides, courses, and references that help operators get more out of automation, AI, and self-hosted systems. Curated picks coming soon.",
    icon: <BookIcon className="h-6 w-6" />,
    placeholder: true,
    resources: [],
  },
];

const badgeColors: Record<string, string> = {
  Directory: "bg-indigo-50 text-indigo-700 ring-indigo-200/60",
  "API Routing": "bg-purple-50 text-purple-700 ring-purple-200/60",
};

function ResourceCard({ r }: { r: Resource }) {
  const badgeClass = badgeColors[r.badge] ?? "bg-slate-100 text-slate-600 ring-slate-200/60";
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand-accent">
          {r.name}
        </h3>
        <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-brand-accent" />
      </div>
      <span className={`mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${badgeClass}`}>
        {r.badge}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{r.description}</p>
      <span className="mt-4 break-all font-mono text-xs text-gray-400 group-hover:text-brand-accent/80">
        {r.url}
      </span>
    </a>
  );
}

function CategorySection({ cat, index }: { cat: ResourceCategory; index: number }) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-brand-accent ring-1 ring-inset ring-indigo-100">
          {cat.icon}
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">{cat.title}</h2>
          <p className="mt-0.5 max-w-2xl text-sm leading-relaxed text-gray-600">{cat.blurb}</p>
        </div>
      </div>

      {cat.resources.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {cat.resources.map((r) => (
            <ResourceCard key={r.name} r={r} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center">
          <p className="text-sm font-medium text-gray-500">Coming soon</p>
          <p className="mt-1 text-xs text-gray-400">
            We're vetting tools for this category. Check back for curated recommendations.
          </p>
        </div>
      )}
    </AnimatedSection>
  );
}

function ResourcesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 sm:py-24">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-100 ring-1 ring-inset ring-white/15 backdrop-blur-sm">
              Resources & Tools
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tools we recommend for running &amp; scaling
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-indigo-100">
              A curated set of infrastructure, developer, and learning resources for the CH Business
              Services community — focused on self-hosting, automation, and AI-powered operations.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore our services
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse marketplace
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Recommended resources
              </h2>
              <p className="mt-3 text-gray-600">
                Hand-picked tools to help you build, deploy, and operate with full control.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-12 space-y-14">
            {categories.map((cat, i) => (
              <CategorySection key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900">
              Want a system built around these tools?
            </h2>
            <p className="mt-3 text-gray-600">
              We design and deploy automation systems, conversion sites, and AI business kits that
              integrate the infrastructure you choose — self-hosted or fully managed.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
              >
                Talk to our team
              </Link>
              <Link
                to="/offers/gap-scan"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Get a free gap scan
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
