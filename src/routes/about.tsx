import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — CH Business Services" },
      { name: "description", content: "CH Business Services builds conversion-focused websites and automation systems for service businesses. Learn about our team and approach." },
      { property: "og:title", content: "About — CH Business Services" },
      { property: "og:description", content: "CH Business Services builds conversion-focused websites and automation systems for service businesses. Learn about our team and approach." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/about" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — CH Business Services" },
      { name: "twitter:description", content: "CH Business Services builds conversion-focused websites and automation systems for service businesses. Learn about our team and approach." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/about" },
    ],
  }),
});

function SearchIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>);
}
function CursorClickIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>);
}
function PackageIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>);
}

const values = [
  { title: "Find demand before competitors", description: "We analyze search data, review signals, and market gaps to surface the opportunities others miss — so you build where demand already exists.", icon: <SearchIcon className="h-6 w-6" /> },
  { title: "Convert traffic into revenue", description: "Every system we build — from websites to automation — is engineered to turn visitors into leads, and leads into paying customers.", icon: <CursorClickIcon className="h-6 w-6" /> },
  { title: "Package expertise into assets", description: "We help you turn what you know into reusable, sellable assets: reports, kits, automations, and systems that work without you.", icon: <PackageIcon className="h-6 w-6" /> },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              We build <span className="gradient-text">revenue systems</span>, not just websites.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              CH Business Services exists to help businesses find demand, convert traffic, automate operations, and package their expertise into assets that can be reused and resold.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 100}>
                <div className="card-premium group relative overflow-hidden p-8">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                    {value.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Ready to find your next opportunity?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base w-full sm:w-auto">Get in touch</Link>
              <Link to="/offers/gap-scan" className="btn-secondary px-8 py-4 text-base w-full sm:w-auto">Start with a free scan</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
