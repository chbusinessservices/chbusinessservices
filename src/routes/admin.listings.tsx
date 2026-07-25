import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export const Route = createFileRoute("/admin/listings")({
  component: MarketplaceListings,
});

function MarketplaceListings() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Marketplace Listings
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your published and draft AI business kit listings.
              </p>
            </div>
            <button type="button" className="btn-primary text-sm">Create listing</button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    {["Title", "Category", "Price", "Status"].map((col) => (
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
                        title="No listings yet"
                        description="Create your first marketplace listing."
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
