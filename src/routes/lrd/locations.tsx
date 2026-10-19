import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/locations")({
  head: () =>
    pageHead({
      title: "Office Locations | Life Admin Desk",
      description: "Where to find us, our hours, and how to get here.",
      ogType: "website",
    }),
  component: Locations,
});

const offices = [
  { t: "Jersey City Office", addr: "Newark Avenue, Jersey City, NJ 07302", hours: "Mon–Fri 9am–6pm · Sat by appointment", dest: "Jersey%20City%2C%20NJ%2007302" },
  { t: "Union City Satellite", addr: "Bergenline Avenue, Union City, NJ 07087", hours: "Tue & Thu 10am–4pm · By appointment", dest: "Bergenline%20Avenue%2C%20Union%20City%2C%20NJ" },
];

function Locations() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Office Locations</h1>
          <p className="mt-3 text-muted-foreground">Where to find us, our hours, and how to get here.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {offices.map((o) => (
            <div key={o.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-xl font-semibold">{o.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.addr}</p>
              <p className="mt-2 text-sm text-muted-foreground">Hours: {o.hours}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${o.dest}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
              >
                Get directions
              </a>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
