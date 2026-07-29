import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { withSuccessUrl } from "~/lib/fulfillment";

export const Route = createFileRoute("/offers/conversion-site-sprint")({ component: ConversionSiteSprint });

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

function ConversionSiteSprint() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-1 text-sm font-semibold text-indigo-700">$1,500–$3,500</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="gradient-text">Conversion Site Sprint</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">Launch a site that converts visitors into leads and sales.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">What's included</h2>
            <ul className="mt-8 space-y-4">
              <CheckItem text="Positioning strategy and messaging framework" />
              <CheckItem text="Homepage copy engineered for conversion" />
              <CheckItem text="Design system (colors, typography, components)" />
              <CheckItem text="Basic SEO setup (meta, schema, sitemap)" />
            </ul>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection><h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready to launch?</h2></AnimatedSection>
          <AnimatedSection delay={200}>
            <a href={withSuccessUrl("https://buy.stripe.com/4gM5kD01r4T6eZQg7O9Zm08", "conversion-site-sprint")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center px-8 py-4 text-base">Buy Conversion Site Sprint — $1,500</a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
