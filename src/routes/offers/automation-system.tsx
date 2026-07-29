import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { withSuccessUrl } from "~/lib/fulfillment";

export const Route = createFileRoute("/offers/automation-system")({ component: AutomationSystem });

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

function AutomationSystem() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-1 text-sm font-semibold text-indigo-700">$2,500–$7,500</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="gradient-text">Automation System</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">Automate lead handling, follow-up, and retention — so nothing falls through the cracks.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">What's included</h2>
            <ul className="mt-8 space-y-4">
              <CheckItem text="CRM setup and pipeline configuration" />
              <CheckItem text="Lead qualification and routing workflows" />
              <CheckItem text="Automated booking and scheduling" />
              <CheckItem text="Reminder and follow-up sequences" />
              <CheckItem text="Review request automation" />
            </ul>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection><h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready to automate?</h2></AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">Choose the plan that fits your business and start automating today.</p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Automation Starter */}
            <AnimatedSection delay={200}>
              <div className="card-premium flex flex-col p-8 text-center">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 self-center">Starter</span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$500<span className="text-lg font-medium text-gray-500">/mo</span></p>
                <p className="mt-2 text-sm text-gray-600">Essential automation for small teams — CRM, pipelines, and follow-up workflows.</p>
                <a href={withSuccessUrl("https://buy.stripe.com/14A5kD29z5XadVM3l29Zm09", "automation-starter")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold">Buy Automation Starter — $500/mo</a>
              </div>
            </AnimatedSection>

            {/* Automation Pro */}
            <AnimatedSection delay={280}>
              <div className="card-premium relative flex flex-col p-8 text-center border-indigo-300 ring-2 ring-indigo-500/30 shadow-indigo-100/50 shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">Recommended</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-xs font-semibold text-indigo-700 self-center mt-2">Pro</span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$2,000<span className="text-lg font-medium text-gray-500">/mo</span></p>
                <p className="mt-2 text-sm text-gray-600">Advanced automation with custom integrations, multi-channel sequences, and priority support.</p>
                <a href={withSuccessUrl("https://buy.stripe.com/00w4gz15vclybNEg7O9Zm0a", "automation-pro")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500">Buy Automation Pro — $2,000/mo</a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
