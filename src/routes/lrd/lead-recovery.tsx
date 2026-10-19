import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/lead-recovery")({
  head: () =>
    pageHead({
      title: "CH Lead Recovery System™ | CH Business Services",
      description:
        "Every lead gets an answer. Every inquiry gets followed up.",
      ogType: "website",
    }),
  component: LeadRecovery,
});

const tiers = [
  { t: "Lead Recovery Starter", p: "$2,500 setup", m: "$497/mo", d: "Small business with one service, one location, and basic lead flow" },
  { t: "Lead Recovery Growth", p: "$5,000 setup", m: "$997/mo", d: "Businesses with multiple services, staff, estimates, bookings, and steady leads" },
  { t: "Lead Recovery Pro", p: "$8,500–$15,000 setup", m: "$1,500–$3,500/mo", d: "High-ticket or multi-location businesses needing deeper CRM and workflow integration" },
];

const includes = [
  "A conversion-focused website or landing page",
  "Instant response after a form submission",
  "Website chat that answers approved FAQs",
  "Missed-call text-back: “Sorry we missed you—how can we help?”",
  "Lead qualification questions",
  "Appointment booking",
  "Automated reminders to reduce no-shows",
  "Quote or estimate follow-up",
  "CRM pipeline that shows every lead's status",
  "Review request after the job, appointment, or purchase",
  "Monthly report: leads, response time, bookings, follow-ups, and missed opportunities",
];

function LeadRecovery() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">Flagship</p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-5xl">CH Lead Recovery System™</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Every lead gets an answer. Every inquiry gets followed up.
          </p>
          <p className="mt-3 max-w-2xl text-primary-foreground/90">
            We help you respond to leads faster, book more qualified
            appointments, and stop letting good opportunities disappear because
            someone was too busy to follow up.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold">{t.t}</h2>
              <p className="mt-3 font-heading text-xl font-bold">{t.p}</p>
              <p className="font-heading text-lg font-bold text-primary">{t.m}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-bold tracking-tight">What it includes</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {includes.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
