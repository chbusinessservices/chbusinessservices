import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/reports")({
  component: Reports,
  head: () => ({
    meta: [
      { title: "Market Reports — Intelligence Briefs | CH Business Services" },
      { name: "description", content: "Download market intelligence reports compiled by CH Business Services. Niche analysis, competitor insights, and opportunity briefs." },
      { property: "og:title", content: "Market Reports — Intelligence Briefs | CH Business Services" },
      { property: "og:description", content: "Download market intelligence reports compiled by CH Business Services. Niche analysis, competitor insights, and opportunity briefs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/reports" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Market Reports — Intelligence Briefs | CH Business Services" },
      { name: "twitter:description", content: "Download market intelligence reports compiled by CH Business Services. Niche analysis, competitor insights, and opportunity briefs." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/reports" },
    ],
  }),
});

interface ReportCard { title: string; category: string; painScore: number; slug: string; }

const reports: ReportCard[] = [
  { title: "Local Service Gap Analysis", category: "Local Services", painScore: 8, slug: "local-service-gap" },
  { title: "SaaS Churn Signal Report", category: "SaaS", painScore: 9, slug: "saas-churn-signals" },
  { title: "E-commerce Niche Opportunity Brief", category: "E-commerce", painScore: 7, slug: "ecommerce-niche" },
  { title: "B2B Automation Demand Scan", category: "B2B", painScore: 8, slug: "b2b-automation-demand" },
];

function PainBadge({ score }: { score: number }) {
  const colors: Record<number, string> = { 9: "bg-red-100 text-red-700", 8: "bg-orange-100 text-orange-700", 7: "bg-yellow-100 text-yellow-700" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[score] || "bg-gray-100 text-gray-600"}`}>
      Pain {score}/10
    </span>
  );
}

function ReportCardItem({ report }: { report: ReportCard }) {
  return (
    <Link
      to="/reports/$slug"
      params={{ slug: report.slug }}
      className="card-premium group p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {report.category}
          </span>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
            {report.title}
          </h3>
        </div>
        <PainBadge score={report.painScore} />
      </div>
      <p className="mt-4 text-sm font-medium text-indigo-600 group-hover:underline">View report &rarr;</p>
    </Link>
  );
}

function Reports() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Niche <span className="gradient-text">intelligence reports</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">Ranked by pain score, confidence, and monetization potential.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {reports.map((report, i) => (
              <AnimatedSection key={report.slug} delay={i * 100}>
                <ReportCardItem report={report} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Get the full picture</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600">Full report access, new drops weekly, and archive search — all in the vault.</p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Link to="/vault" className="btn-primary mt-6 px-8 py-4 text-base">Join the vault</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
