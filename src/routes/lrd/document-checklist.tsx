import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/document-checklist")({
  head: () =>
    pageHead({
      title: "Document Checklists | Life Admin Desk",
      description: "What to gather before your appointment — for taxes, immigration, business, and rentals.",
      ogType: "website",
    }),
  component: Checklists,
});

const checklists = [
  { t: "Tax Filing Checklist", d: "What to bring for your tax appointment.", items: ["Government photo ID", "Social Security Number or ITIN for everyone on the return", "All W-2, 1099 and 1098 forms", "Last year's tax return", "Bank account and routing number for refund", "Documentation for deductions (receipts, mortgage interest, childcare, etc.)", "Business income and expense records if self-employed"] },
  { t: "Immigration Application Checklist", d: "Common documents for immigration filings.", items: ["Valid passport", "Current immigration documents (green card, EAD, notices)", "Prior USCIS receipts and notices", "Two passport-style photos", "Residential and employment addresses for the last 5 years", "Certified translations of any non-English documents", "Evidence specific to your application (marriage, birth, hardship, etc.)"] },
  { t: "Business Registration Checklist", d: "To register your NJ LLC.", items: ["Photo ID for each owner", "Two or three business name choices", "Business street address", "Ownership percentages", "Description of the business activity", "Registered agent information", "Prior returns and bank statements if already operating"] },
  { t: "Rental Application Checklist", d: "For renters applying to a new home.", items: ["Government photo ID", "Last two paystubs", "Two recent bank statements", "Current lease or housing history", "Two references", "Proof of income or employment letter", "Renter's insurance quote (if required)"] },
];

function Checklists() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Document Checklists</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            What to gather before your appointment — for taxes, immigration, business, and rentals.
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-5 inline-flex h-9 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
          >
            Print / Save as PDF
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {checklists.map((c) => (
            <div key={c.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold">{c.t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Items to bring</h3>
              <ul className="mt-2 space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
