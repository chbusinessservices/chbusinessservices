import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const Route = createFileRoute("/dashboard/reports")({
  component: MyReports,
});

function MyReports() {
  return (
    <DashboardLayout currentPath="/dashboard/reports">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Reports
          </h1>
          <p className="mt-2 text-gray-600">
            Your purchased and saved intelligence reports.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <EmptyState
            icon={icon}
            title="No reports yet"
            description="Browse the vault to discover niche intelligence reports and get started."
            ctaLabel="Browse the vault"
            ctaHref="/vault"
            className="mt-12"
          />
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
