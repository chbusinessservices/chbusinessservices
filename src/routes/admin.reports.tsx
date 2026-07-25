import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const Route = createFileRoute("/admin/reports")({
  component: ReportManager,
});

function ReportManager() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Report Manager
              </h1>
              <p className="mt-1 text-gray-600">
                Review, edit, and publish intelligence reports.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary text-sm"
            >
              Generate report
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    {["Title", "Category", "Pain Score", "Status", "Published"].map((col) => (
                      <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <EmptyState
                        icon={icon}
                        title="No reports in queue"
                        description="Generate a report to get started."
                        className="border-none px-0 py-0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>

  );
}
