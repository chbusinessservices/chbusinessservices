import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { withSuccessUrl } from "~/lib/fulfillment";

export const Route = createFileRoute("/offers/custom-brief")({ component: CustomBrief });

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

function CustomBrief() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-1 text-sm font-semibold text-indigo-700">$500–$2,500</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="gradient-text">Custom Brief</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">A private research sprint on your niche or opportunity — delivered in days.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">What's included</h2>
            <ul className="mt-8 space-y-4">
              <CheckItem text="Market validation — is there real demand?" />
              <CheckItem text="Competitor analysis — who's serving this market?" />
              <CheckItem text="Keyword opportunities — high-intent search terms" />
              <CheckItem text="Monetization path — pricing models and strategy" />
            </ul>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection><h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready for your custom brief?</h2></AnimatedSection>
          <AnimatedSection delay={200}><a href={withSuccessUrl("https://buy.stripe.com/8x2bJ101r99m2d48Fm9Zm0d", "custom-brief")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center px-8 py-4 text-base">Buy Custom Brief — $500</a></AnimatedSection>
        </div>
      </section>
    </>
  );
}
