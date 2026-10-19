import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { Catalog } from "~/components/lrd/Catalog";
import { LRD_CATALOG } from "~/lib/lrd-data";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/services")({
  head: () =>
    pageHead({
      title: "Service Catalog | Life Admin Desk",
      description:
        "Every offering, categorized by industry and need. Tap any service for details and booking.",
      ogType: "website",
    }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Service Catalog</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every offering, categorized by industry and need. Tap any service for details and booking.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Catalog services={LRD_CATALOG} />
      </section>

      <CtaBand />
    </>
  );
}
