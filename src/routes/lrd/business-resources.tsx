import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/business-resources")({
  head: () =>
    pageHead({
      title: "Business Resources | Life Admin Desk",
      description: "Articles and guides for business formation, tax compliance, and payroll.",
      ogType: "website",
    }),
  component: Resources,
});

const articles = [
  { cat: "Business Formation", t: "LLC vs. Sole Proprietorship in NJ", d: "A plain-language comparison of liability, taxes, and filing steps.", min: "5 min" },
  { cat: "Tax Compliance", t: "Understanding NJ Sales Tax Filing", d: "Who must file, how often, and what records to keep.", min: "4 min" },
  { cat: "Payroll", t: "First Payroll: W-4, I-9, and Employer Accounts", d: "A checklist for hiring your first employee in New Jersey.", min: "6 min" },
  { cat: "Business Formation", t: "Choosing and Protecting Your Business Name", d: "NJ name rules and a simple availability check.", min: "3 min" },
  { cat: "Tax Compliance", t: "Quarterly Estimated Taxes for the Self-Employed", d: "Why, when, and how much to set aside.", min: "5 min" },
  { cat: "Payroll", t: "Worker Classification: Employee or Contractor", d: "The basics of NJ classification and the documents that support it.", min: "4 min" },
];

function Resources() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Business Resources</h1>
          <p className="mt-3 text-muted-foreground">Articles and guides for business formation, tax compliance, and payroll.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{a.cat}</span>
              <h2 className="mt-3 font-heading text-lg font-semibold">{a.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
              <p className="mt-4 text-xs text-muted-foreground">{a.min}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
