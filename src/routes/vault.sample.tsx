import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/vault/sample")({
  component: VaultSample,
});

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{score}/10</span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function VaultSample() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Free <span className="gradient-text">Sample Report</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              See how we analyze and rank market opportunities. This is a preview of what vault members get every week.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card-premium p-8 sm:p-10">
              <span className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-sm font-medium text-indigo-700">Local Services</span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Local Service Gap Analysis — Sample</h2>
              <div className="mt-6 space-y-4">
                <ScoreBar label="Pain Score" score={8} />
                <ScoreBar label="Confidence Score" score={7} />
              </div>
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Preview Excerpt</h3>
                <p className="mt-3 leading-relaxed text-gray-700">
                  Our analysis of 50 metro areas identified several underserved local service categories where demand significantly outpaces supply...
                </p>
              </div>
              <p className="mt-6 text-sm text-gray-500">This is a preview excerpt. The full report includes detailed competitor mapping, keyword opportunity tables, revenue projections, and an implementation roadmap.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready for the full picture?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600">Unlock every report, every week, with a vault membership.</p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Link to="/vault" className="btn-primary mt-6 px-8 py-4 text-base">Get the full report in the vault</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
