import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { LRD_SERVICES } from "~/lib/lrd-data";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/diverse-solutions/$serviceId")({
  head: ({ params }) => {
    const s = LRD_SERVICES.find((x) => x.id === params.serviceId);
    return pageHead({
      title: s ? `${s.title} | Diverse Solutions` : "Service | Diverse Solutions",
      description: s?.desc ?? "CH-priced service by Diverse Solutions.",
      ogType: "website",
    });
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { serviceId } = Route.useParams();
  const s = LRD_SERVICES.find((x) => x.id === serviceId);
  if (!s) throw notFound();

  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <Link to="/lrd/diverse-solutions" className="text-sm font-medium text-primary hover:underline">
            ← All services
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{s.category}</span>
            <span className="text-xs text-muted-foreground">{s.format}</span>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{s.desc}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">What&apos;s included</dt>
              <dd className="mt-1.5 text-sm">{s.desc}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Turnaround</dt>
              <dd className="mt-1.5 text-sm">{s.turnaround}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Delivery</dt>
              <dd className="mt-1.5 text-sm">{s.format}</dd>
            </div>
            {s.id === "6ac6e91c52554a739c3c02c0" && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Information you&apos;ll provide</dt>
                <dd className="mt-1.5 text-sm">
                  Owner IDs, business name choices, address, ownership
                  percentages, prior returns and bank statements.
                </dd>
              </div>
            )}
          </dl>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">CH Business Services price</p>
            <p className="mt-1 font-heading text-2xl font-bold text-primary">{s.price}</p>
            <Link
              to="/lrd/login"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Book This Service
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Fulfilled by Diverse Solutions. You pay CH Business Services; we
              coordinate delivery.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
