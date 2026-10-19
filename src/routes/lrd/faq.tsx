import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/faq")({
  head: () =>
    pageHead({
      title: "Frequently Asked Questions | Life Admin Desk",
      description: "Appointments, document security, pricing, and what we can and cannot do.",
      ogType: "website",
    }),
  component: Faq,
});

const faqs = [
  { q: "Are you a law firm or a licensed insurance agency?", a: "No. We provide administrative, clerical, translation, document and referral services. Insurance is offered only through licensed producers or agency partners. Immigration legal advice goes to a licensed attorney or DOJ-accredited representative." },
  { q: "Are government and filing fees included?", a: "No. Government fees, premiums and third-party costs are separate and shown before you book." },
  { q: "Can I pay in installments?", a: "Ask about payment plans for services over $300. Terms, due dates and total cost are shown in writing first." },
  { q: "Can you guarantee approval or a credit score increase?", a: "No one honestly can. We never promise results." },
  { q: "How do you handle my sensitive documents?", a: "We use a private document intake available after your appointment is confirmed—never email or WhatsApp for passports, tax returns or immigration documents. Access is logged and limited to the team members working on your request." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-3 text-muted-foreground">Appointments, document security, pricing, and what we can and cannot do.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-heading text-base font-semibold pr-4">{f.q}</span>
                <svg className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
