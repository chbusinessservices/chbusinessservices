import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/partners")({
  head: () =>
    pageHead({
      title: "Our Partners | Life Admin Desk",
      description: "Licensed professionals we refer to when a license is required.",
      ogType: "website",
    }),
  component: Partners,
});

const partners = [
  { cat: "Immigration Attorneys", t: "Immigration Attorney Network", d: "For legal advice, representation, and eligibility determinations. DOJ-accredited representatives also available." },
  { cat: "Real Estate Professionals", t: "NJ Licensed Realtors", d: "For property search, buyer and seller representation, and brokerage services." },
  { cat: "Insurance Professionals", t: "Licensed Insurance Producers", d: "For auto, home, life, Medicare, and business insurance quotes and policies." },
  { cat: "Accountants & Tax Professionals", t: "CPA & Tax Professional Network", d: "For complex tax situations, audit support, and formal accounting opinions." },
  { cat: "Mortgage Professionals", t: "Licensed Loan Officers", d: "For mortgage pre-approval, lending, and refinancing." },
];

function Partners() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Our Partners</h1>
          <p className="mt-3 text-muted-foreground">Licensed professionals we refer to when a license is required.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{p.cat}</h2>
              <h3 className="mt-2 font-heading text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
