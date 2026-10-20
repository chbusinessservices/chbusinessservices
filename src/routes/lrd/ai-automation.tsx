import { Link, createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/ai-automation")({
  head: () =>
    pageHead({
      title: "AI Automation Lab | CH Business Services",
      description:
        "AI Revenue Desk is a suite of automation tools built for local service businesses.",
      ogType: "website",
    }),
  component: AiAutomation,
});

const CONSULT_MAILTO =
  "mailto:hello@chbusiness.services?subject=AI%20Automation%20Lab%20%E2%80%94%20consultation&body=I%E2%80%99d%20like%20to%20learn%20how%20AI%20automation%20can%20help%20my%20business.%0A%0ABusiness%20name%3A%0AWebsite%3A%0ABiggest%20revenue%20leak%3A";

const tools = [
  { t: "Instant Lead Response", d: "Reply while the lead is still interested. When a new customer reaches out, your system responds in seconds—not tomorrow morning.", b: ["Replies immediately by text or email", "Confirms the request was received", "Asks two to five qualifying questions"] },
  { t: "Website AI Chat", d: "Turn website visitors into real conversations. Your AI web assistant answers common questions, guides people to the right service, and captures leads when your team is busy.", b: ["Answers only approved business questions", "Guides visitors to the correct service", "Captures name, phone, email, and need"] },
  { t: "Appointment and No-Show System", d: "More booked appointments. Fewer no-shows. Give customers an easy way to book, confirm, reschedule, and get reminders automatically.", b: ["Lets customers book online", "Sends confirmation immediately", "Sends SMS and email reminders"] },
  { t: "Estimate and Quote Follow-Up", d: "Your estimates should not die in someone's inbox. We build follow-up systems that keep your business top of mind without sounding pushy.", b: ["Sends a branded “Did you have any questions?” message", "Reminds customers their estimate is ready", "Sends timed follow-ups"] },
  { t: "Reviews and Reputation System", d: "Turn great service into more five-star proof. Ask happy customers at the right moment, protect your reputation, and build the trust that makes the next customer choose you.", b: ["Sends a review request after a completed job", "Makes leaving a Google review simple", "Sends a private feedback path to unhappy customers"] },
];

const how = [
  { t: "AI drafts, humans decide", d: "Automation handles repetitive follow-up—instant replies, reminders, qualification questions—while your team stays in control of pricing, complaints, and high-stakes conversations." },
  { t: "One connected journey", d: "Search → website → chat or form → instant reply → booking → reminder → quote follow-up → review request. Every step is wired together so no lead falls through the cracks." },
  { t: "Outcomes, not buzzwords", d: "We report response speed, leads captured, bookings created, no-shows prevented, and reviews generated—the numbers that move revenue." },
];

const recovery = [
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

function AiAutomation() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">AI Automation Lab</span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Every missed inquiry is revenue walking away.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            AI Revenue Desk helps service businesses respond instantly, qualify
            leads, book appointments, reduce no-shows, and recover unhappy
            customers—without adding another full-time employee.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={CONSULT_MAILTO} className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90">
              Book a consultation
            </a>
            <a href="#tools" className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/15 px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/25">
              Explore the tools
            </a>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">The automation systems</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          AI Revenue Desk is a suite of automation tools built for local service
          businesses. Each tool solves a specific place where revenue leaks out
          of your pipeline.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <div key={t.t} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold">{t.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              <ul className="mt-4 space-y-2">
                {t.b.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">How it works for local businesses</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {how.map((h) => (
              <div key={h.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-heading text-base font-semibold">{h.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">CH Lead Recovery System™</h2>
        <p className="mt-3 font-heading text-lg">Every lead gets an answer. Every inquiry gets followed up.</p>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We help you respond to leads faster, book more qualified appointments,
          and stop letting good opportunities disappear because someone was too
          busy to follow up.
        </p>
        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <ul className="grid gap-2 sm:grid-cols-2">
            {recovery.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                {r}
              </li>
            ))}
          </ul>
          <a href={CONSULT_MAILTO} className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Start with a Revenue Leak Audit
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
