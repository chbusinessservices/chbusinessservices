import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/admin/billing")({
  component: BillingOverview,
});

const billingStats = [
  { label: "MRR", value: "$0", trend: "up", color: "emerald" },
  { label: "Active Subscriptions", value: "0", trend: "up", color: "indigo" },
  { label: "Total Revenue", value: "$0", trend: "up", color: "purple" },
];

const colorMap: Record<string, string> = {
  emerald: "border-l-emerald-500",
  indigo: "border-l-indigo-500",
  purple: "border-l-purple-500",
};

function TrendArrow() {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-400">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      0%
    </span>
  );
}

function BillingOverview() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Billing Overview
            </h1>
            <p className="mt-1 text-gray-600">
              Revenue, transactions, and subscription health.
            </p>
          </div>
        </AnimatedSection>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {billingStats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <div className={`card-premium border-l-4 ${colorMap[stat.color]} p-6`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <TrendArrow />
                </div>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  {stat.value}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Placeholder */}
        <AnimatedSection delay={300}>
          <div className="mt-8 rounded-xl border-2 border-dashed border-gray-200 bg-white/60 px-6 py-16 text-center backdrop-blur-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-400">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mt-5 text-sm font-medium text-gray-900">
              Billing data will appear here once Stripe is connected and transactions begin.
            </p>
          </div>
        </AnimatedSection>
      </div>

  );
}
