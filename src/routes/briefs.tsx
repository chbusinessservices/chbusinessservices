import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/briefs")({
  component: Briefs,
});

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-gray-700">{text}</span>
    </li>
  );
}

function Briefs() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Custom <span className="gradient-text">Validation Briefs</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">A private research sprint on your niche or opportunity — delivered in days.</p>
            <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$500–$2,500</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">What's included</h2>
            <ul className="mt-8 space-y-4">
              <CheckItem text="Market validation — is there real demand for your niche or idea?" />
              <CheckItem text="Competitor analysis — who's already serving this market, and where are the gaps?" />
              <CheckItem text="Keyword opportunities — high-intent search terms with traffic and low competition." />
              <CheckItem text="Monetization path — pricing models, revenue projections, and go-to-market strategy." />
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">How it works</h2>
          </AnimatedSection>
          <div className="mt-8 space-y-6">
            {[
              { step: "1", title: "You describe the opportunity", desc: "Tell us about your niche, market, or idea — we'll scope the research sprint." },
              { step: "2", title: "We run the research", desc: "Our intelligence engine analyzes search data, competitor signals, and market patterns." },
              { step: "3", title: "You get the brief", desc: "A clear, actionable report delivered within days — validation, competitors, keywords, and monetization path." },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 100} direction="left">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 text-sm font-semibold text-white shadow-sm">{item.step}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Have a niche or opportunity in mind?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600">Get a private research sprint tailored to your market.</p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Link to="/offers/custom-brief" className="btn-primary mt-6 px-8 py-4 text-base">Order a brief</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
