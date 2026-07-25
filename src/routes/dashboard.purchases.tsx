import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";

const icon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

export const Route = createFileRoute("/dashboard/purchases")({
  component: MyPurchases,
});

function MyPurchases() {
  return (
    <DashboardLayout currentPath="/dashboard/purchases">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Purchases
          </h1>
          <p className="mt-2 text-gray-600">
            Your purchased business kits and reports.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <EmptyState
            icon={icon}
            title="No purchases yet"
            description="Explore the marketplace to find AI business kits that match your goals."
            ctaLabel="Explore marketplace"
            ctaHref="/marketplace"
            className="mt-12"
          />
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
