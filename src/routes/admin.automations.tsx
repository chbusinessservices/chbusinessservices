import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export const Route = createFileRoute("/admin/automations")({
  component: AutomationPipeline,
});

function AutomationPipeline() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Automation Pipeline
              </h1>
              <p className="mt-1 text-gray-600">
                Monitor workflow runs and automation health.
              </p>
            </div>
            <button type="button" className="btn-primary text-sm">Trigger workflow</button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    {["Workflow", "Status", "Started", "Finished"].map((col) => (
                      <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <EmptyState
                        icon={icon}
                        title="No automation runs logged"
                        description="Trigger a workflow to see results here."
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
