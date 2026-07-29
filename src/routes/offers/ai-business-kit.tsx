import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { withSuccessUrl } from "~/lib/fulfillment";

export const Route = createFileRoute("/offers/ai-business-kit")({ component: AIBusinessKit });

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

function AIBusinessKit() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-1 text-sm font-semibold text-indigo-700">$3,000–$15,000</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="gradient-text">AI Business Kit</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">Launch-ready packaged business — brand, site, prompts, automations, and sales flow included.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">What's included</h2>
            <ul className="mt-8 space-y-4">
              <CheckItem text="Brand identity and positioning" />
              <CheckItem text="Conversion-optimized website" />
              <CheckItem text="Complete prompt and agent set" />
              <CheckItem text="Automation workflows" />
              <CheckItem text="Report logic and intelligence engine" />
              <CheckItem text="Sales flow and marketing assets" />
            </ul>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection><h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready to launch your AI business?</h2></AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">Choose the plan that fits your goals — from starter to full-scale launch.</p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Starter */}
            <AnimatedSection delay={200}>
              <div className="card-premium flex flex-col p-8 text-center">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 self-center">Starter</span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$3,000</p>
                <p className="mt-2 text-sm text-gray-600">Brand, site, prompts, and automation — the essentials to launch fast.</p>
                <a href={withSuccessUrl("https://buy.stripe.com/4gM5kDg0p5Xag3U08Q9Zm0e", "starter")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold">Buy Starter Kit — $3,000</a>
              </div>
            </AnimatedSection>

            {/* Pro */}
            <AnimatedSection delay={280}>
              <div className="card-premium relative flex flex-col p-8 text-center border-indigo-300 ring-2 ring-indigo-500/30 shadow-indigo-100/50 shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">Recommended</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-xs font-semibold text-indigo-700 self-center mt-2">Pro</span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$15,000</p>
                <p className="mt-2 text-sm text-gray-600">Full launch-ready business with report logic, sales flow, and complete marketing assets.</p>
                <a href={withSuccessUrl("https://buy.stripe.com/cNi4gz29zadq2d47Bi9Zm0f", "pro")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500">Buy Pro Kit — $15,000</a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
