import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { EmptyState } from "~/components/EmptyState";

export const Route = createFileRoute("/portal/invoices")({
  component: PortalInvoices,
});

/* ─── Placeholder invoices ─── */

const invoices = [
  {
    id: "INV-2026-0042",
    date: "July 15, 2026",
    description: "Automation Pro — Monthly (July 2026)",
    amount: "$3,500.00",
    status: "Paid" as const,
  },
  {
    id: "INV-2026-0035",
    date: "June 15, 2026",
    description: "Automation Pro — Monthly (June 2026)",
    amount: "$3,500.00",
    status: "Paid" as const,
  },
  {
    id: "INV-2026-0028",
    date: "May 15, 2026",
    description: "Automation Pro — Monthly (May 2026)",
    amount: "$3,500.00",
    status: "Pending" as const,
  },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-brand-gold/10 text-brand-gold-dark ring-brand-gold/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Overdue: "bg-red-50 text-red-700 ring-red-600/20",
};

/* ─── Page ─── */

function PortalInvoices() {
  const outstanding = invoices
    .filter((inv) => inv.status !== "Paid")
    .reduce((sum, inv) => {
      const amt = parseFloat(inv.amount.replace(/[$,]/g, ""));
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);

  return (
    <DashboardLayout currentPath="/portal/invoices">
      <div className="page-enter px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Invoices
          </h1>
          <p className="mt-2 text-brand-gray">
            View and download your invoice history.
          </p>
        </AnimatedSection>

        {invoices.length > 0 ? (
          <>
            {/* Invoice table */}
            <AnimatedSection delay={80}>
              <div className="mt-8 overflow-hidden rounded-xl border border-brand-border-light bg-white shadow-sm">
                {/* Table header — hidden on small screens */}
                <div className="hidden border-b border-brand-border-light bg-brand-cream/60 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6 sm:py-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray">Invoice</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray">Date</div>
                  <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-brand-gray">Description</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray">Amount</div>
                  <div className="text-right text-xs font-semibold uppercase tracking-wider text-brand-gray">Status</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-brand-border-light">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-brand-cream/40 sm:grid sm:grid-cols-6 sm:gap-4 sm:items-center"
                    >
                      {/* Invoice # + mobile label */}
                      <div>
                        <span className="text-xs text-brand-gray-light sm:hidden">Invoice </span>
                        <span className="text-sm font-mono font-medium text-brand-navy">{inv.id}</span>
                      </div>

                      {/* Date */}
                      <div>
                        <span className="text-xs text-brand-gray-light sm:hidden">Date: </span>
                        <span className="text-sm text-brand-gray">{inv.date}</span>
                      </div>

                      {/* Description */}
                      <div className="col-span-2">
                        <span className="text-xs text-brand-gray-light sm:hidden">Description: </span>
                        <span className="text-sm text-brand-navy">{inv.description}</span>
                      </div>

                      {/* Amount */}
                      <div>
                        <span className="text-xs text-brand-gray-light sm:hidden">Amount: </span>
                        <span className="text-sm font-semibold text-brand-navy">{inv.amount}</span>
                      </div>

                      {/* Status + Download */}
                      <div className="flex items-center justify-end gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                            statusStyles[inv.status]
                          }`}
                        >
                          {inv.status}
                        </span>
                        <a
                          href="#"
                          className="btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Outstanding balance */}
            <AnimatedSection delay={160}>
              <div className="mt-6 card-premium p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-brand-gray">Outstanding Balance</p>
                    <p className="mt-1 font-serif text-2xl font-bold tracking-tight text-brand-navy">
                      ${outstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  {outstanding > 0 ? (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                      Payment due
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      All paid
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Subscribe to Report Vault */}
            <AnimatedSection delay={240}>
              <div className="mt-8 card-premium overflow-hidden rounded-xl border border-brand-gold/20 bg-gradient-to-br from-brand-cream to-white p-8">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold tracking-tight text-brand-navy">Report Vault Subscription</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-gray">Ongoing access to market-gap intelligence reports, new drops weekly, and full archive search.</p>
                    <p className="mt-2 font-serif text-2xl font-bold tracking-tight text-brand-gold-dark">$99<span className="text-base font-medium text-brand-gray">/mo</span></p>
                  </div>
                  <a
                    href="https://buy.stripe.com/28E28r15v99m1909Jq9Zm0c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-semibold"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Subscribe to Report Vault
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </>
        ) : (
          <div className="mt-8">
            <EmptyState
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
              title="No invoices yet"
              description="You don't have any invoices. Invoices will appear here once your service is active."
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
