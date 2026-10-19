import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/pricing")({
  head: () =>
    pageHead({
      title: "Pricing & Memberships | Life Admin Desk",
      description: "Pay per service, or join a membership for ongoing administrative support.",
      ogType: "website",
    }),
  component: Pricing,
});

const memberships = [
  { t: "Life File Starter", p: "$49 once", d: "Action Map, document checklist, secure file." },
  { t: "Life Admin Monthly", p: "$29/mo", d: "Renewal reminders, vault, 20-minute monthly check-in, member pricing." },
  { t: "Family Operations", p: "$79/mo", d: "Up to 4 people, 2 requests a month, deadline tracker." },
  { t: "Entrepreneur Operations", p: "$149/mo", d: "Business compliance calendar, bookkeeping checklist, tax reminders." },
  { t: "Move & Settle", p: "$299 once", d: "Rental file, utilities, insurance intake, DMV and school checklist." },
  { t: "New to America Admin Pack", p: "$349 once", d: "Document setup, healthcare application checklist, translation, attorney referral." },
];

function Pricing() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Pricing &amp; Memberships</h1>
          <p className="mt-3 text-muted-foreground">Pay per service, or join a membership for ongoing administrative support.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-xl font-semibold">Individual services</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Published starting prices. Pay only for what you need, when you need it.</p>
            <ul className="mt-5 space-y-2.5">
              {["Published starting price for every service", "Pay only for what you need", "No monthly commitment", "Payment plans for services over $300"].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-xl font-semibold">Membership plans</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Ongoing support, reminders, and member pricing for a flat monthly or one-time fee.</p>
            <ul className="mt-5 space-y-2.5">
              {["Renewal and deadline reminders", "Private document vault", "Monthly check-in with the team", "Member pricing on services", "One team that knows your file"].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memberships.map((m) => (
            <div key={m.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-heading text-base font-semibold">{m.t}</h3>
              <p className="mt-2 font-heading text-lg font-bold text-primary">{m.p}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="mailto:hello@lifeadmindesk.com?subject=Appointment%20request"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Book appointment
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
