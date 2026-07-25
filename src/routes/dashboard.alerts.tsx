import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const Route = createFileRoute("/dashboard/alerts")({
  component: MyAlerts,
});

function MyAlerts() {
  return (
    <DashboardLayout currentPath="/dashboard/alerts">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Alerts
          </h1>
          <p className="mt-2 text-gray-600">
            Your configured opportunity alerts.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <EmptyState
            icon={icon}
            title="No alerts configured"
            description="Set up opportunity alerts to get notified when new market gaps match your interests."
            ctaLabel="Set up alerts"
            ctaHref="/alerts"
            className="mt-12"
          />
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
