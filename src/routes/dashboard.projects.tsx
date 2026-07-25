import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

export const Route = createFileRoute("/dashboard/projects")({
  component: MyProjects,
});

function MyProjects() {
  return (
    <DashboardLayout currentPath="/dashboard/projects">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Projects
          </h1>
          <p className="mt-2 text-gray-600">
            Active automation and site projects.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <EmptyState
            icon={icon}
            title="No active projects"
            description="Start with a free gap scan to identify your highest-leverage opportunity."
            ctaLabel="Start gap scan"
            ctaHref="/offers/gap-scan"
            className="mt-12"
          />
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
