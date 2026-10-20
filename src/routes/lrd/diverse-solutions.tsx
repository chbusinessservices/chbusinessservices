import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { Catalog } from "~/components/lrd/Catalog";
import { LRD_SERVICES } from "~/lib/lrd-data";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/diverse-solutions")({
  head: () =>
    pageHead({
      title: "Diverse Solutions by CH Business Services",
      description:
        "Browse CH-priced services from Diverse Solutions by CH Business Services, upload your documents securely, and follow your request from booking to delivery—all in one place.",
      ogType: "website",
    }),
  component: DiverseSolutions,
});

function DiverseSolutions() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Diverse Solutions by CH Business Services
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse CH-priced services from Diverse Solutions by CH Business
            Services, upload your documents securely, and follow your request
            from booking to delivery—all in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Catalog services={LRD_SERVICES} />
      </section>

      <CtaBand />
    </>
  );
}
