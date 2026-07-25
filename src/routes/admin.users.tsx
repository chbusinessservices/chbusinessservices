import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const Route = createFileRoute("/admin/users")({
  component: UserManagement,
});

function UserManagement() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              User Management
            </h1>
            <p className="mt-1 text-gray-600">
              View and manage customer accounts.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    {["Name", "Email", "Role", "Subscription", "Joined"].map((col) => (
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
                        title="No users registered"
                        description="Customer accounts will appear here."
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
