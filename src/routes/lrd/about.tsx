import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/about")({
  head: () =>
    pageHead({
      title: "About Life Admin Desk",
      description: "The team, the mission, and the values behind every appointment.",
      ogType: "website",
    }),
  component: About,
});

const values = [
  { t: "Clarity first", d: "Plain language, published prices, and a clear next step before you pay." },
  { t: "Honesty about limits", d: "We never guarantee approvals or outcomes. Government agencies decide." },
  { t: "Licensed partners", d: "When a license is required, we refer you to a qualified professional." },
  { t: "Private by design", d: "Sensitive documents never travel by email or text. Access is logged and limited." },
  { t: "Bilingual always", d: "English and Spanish at every step, from the same team." },
  { t: "Local knowledge", d: "Built for New Jersey rules, towns, and communities." },
];

const team = [
  { i: "A", t: "Administrative Lead", r: "Operations & intake", d: "Runs the intake, builds your Action Map, and keeps every deadline on track." },
  { i: "N", t: "Notary & Translation Specialist", r: "Notary public & certified translation", d: "Performs notary acts and coordinates English–Spanish translation and certification." },
  { i: "C", t: "Client Care Coordinator", r: "Appointments & reminders", d: "Your point of contact for scheduling, reminders, and document checklists." },
  { i: "P", t: "Partner Network Coordinator", r: "Licensed professional referrals", d: "Connects you to attorneys, realtors, producers, and accountants when needed." },
];

function About() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">About Life Admin Desk</h1>
          <p className="mt-3 text-muted-foreground">The team, the mission, and the values behind every appointment.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Our mission</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Life Admin Desk was founded to remove the paperwork panic from major
          life moments. We are not a law firm, an insurance agency, or a tax
          preparer by ourselves — we are the organized team that helps you
          gather, understand, and act on the documents behind those moments, and
          we connect you to the right licensed professional when one is required.
        </p>

        <h2 className="mt-12 font-heading text-2xl font-bold tracking-tight">Our values</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-heading text-base font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-heading text-2xl font-bold tracking-tight">Who you work with</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.t} className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{m.i}</span>
              <h3 className="mt-4 font-heading text-base font-semibold">{m.t}</h3>
              <p className="text-xs text-muted-foreground">{m.r}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
