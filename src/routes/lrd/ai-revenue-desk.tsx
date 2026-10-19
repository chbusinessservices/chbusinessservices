import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/ai-revenue-desk")({
  head: () =>
    pageHead({
      title: "AI Revenue Desk | CH Business Services",
      description:
        "AI Revenue Desk helps service businesses respond instantly, qualify leads, book appointments, reduce no-shows, and recover unhappy customers.",
      ogType: "website",
    }),
  component: AiRevenueDesk,
});

const DEMO_MAILTO =
  "mailto:hello@chbusiness.services?subject=Book%20a%20Revenue%20Desk%20demo&body=I%E2%80%99d%20like%20to%20book%20an%20AI%20Revenue%20Desk%20demo.%0A%0ABusiness%20name%3A%0AWebsite%3A%0ABiggest%20revenue%20leak%3A";

const steps = [
  { n: 1, t: "Capture every inquiry", d: "Website forms, chats, missed calls, messages, and lead sources enter one system." },
  { n: 2, t: "Respond immediately", d: "Customers receive fast, helpful, brand-approved replies when intent is highest." },
  { n: 3, t: "Qualify the opportunity", d: "The system identifies service needs, location, budget signals, urgency, and next action." },
  { n: 4, t: "Book or recover", d: "Leads receive booking links, staff handoffs, reminders, rescheduling, and deposit prompts." },
  { n: 5, t: "Protect the experience", d: "Feedback is collected, unhappy customers are escalated, and satisfied customers are guided toward reviews." },
  { n: 6, t: "Show revenue impact", d: "Owners see response speed, leads recovered, bookings created, no-shows prevented, and reviews generated." },
];

const moments = [
  "The first minute after an inquiry",
  "The follow-up after no response",
  "The reminder before an appointment",
  "The recovery message after a cancellation",
  "The private check-in before a negative review",
];

const plans = [
  { t: "Launch", d: "Solo operators and small teams", p: "$149–$249/month", f: "Faster inquiry replies, lead follow-up, booking reminders, review requests" },
  { t: "Growth", d: "Appointment-driven businesses", p: "$399–$699/month", f: "Lead qualification, booking recovery, automated follow-up, feedback escalation, reporting" },
  { t: "Revenue OS", d: "Multi-staff or multi-location teams", p: "$999–$2,500+/month", f: "Multi-location workflows, CRM integration, custom playbooks, dashboards, priority support" },
];

const setup = [
  { t: "Revenue Leak Audit", p: "Free (credited toward implementation)" },
  { t: "Launch setup", p: "$500–$1,000" },
  { t: "Growth implementation", p: "$1,000–$2,500" },
  { t: "Custom integration or multi-location setup", p: "$2,500–$7,500+" },
];

const industries = [
  "Med spas and wellness practices",
  "Premium salons and beauty studios",
  "Home-service companies",
  "Fitness and personal-training studios",
  "Auto detailing and specialty automotive businesses",
  "Property-management and leasing teams",
];

function AiRevenueDesk() {
  const [bookingValue, setBookingValue] = useState(250);
  const [missed, setMissed] = useState(8);
  const [recoverShare, setRecoverShare] = useState(50);
  const [newBookings, setNewBookings] = useState(5);
  const [grossProfit, setGrossProfit] = useState(120);
  const [hoursSaved, setHoursSaved] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const monthly =
    (missed * (recoverShare / 100) * bookingValue) +
    (newBookings * grossProfit) +
    (hoursSaved * hourlyCost);
  const yearly = monthly * 12;
  const recovered = Math.max(1, Math.round(monthly / 997));

  const fields: { label: string; value: number; set: (n: number) => void; money?: boolean }[] = [
    { label: "Average booking value", value: bookingValue, set: setBookingValue, money: true },
    { label: "Missed / no-show appointments per month", value: missed, set: setMissed },
    { label: "Share we recover", value: recoverShare, set: setRecoverShare },
    { label: "New bookings captured per month", value: newBookings, set: setNewBookings },
    { label: "Gross profit per booking", value: grossProfit, set: setGrossProfit, money: true },
    { label: "Staff hours saved per month", value: hoursSaved, set: setHoursSaved },
    { label: "Loaded hourly cost", value: hourlyCost, set: setHourlyCost, money: true },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Every missed inquiry is revenue walking away.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            AI Revenue Desk helps service businesses respond instantly, qualify
            leads, book appointments, reduce no-shows, and recover unhappy
            customers—without adding another full-time employee.
          </p>
          <p className="mt-3 font-heading text-lg text-primary-foreground">
            Turn more conversations into confirmed revenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#calculator"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
            >
              Calculate Your Revenue Leak
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
            </a>
            <a
              href={DEMO_MAILTO}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
            >
              Book a Revenue Desk Demo
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
          <p className="mt-2 text-muted-foreground">One connected workflow from first inquiry to repeat revenue.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{s.n}</span>
                <h3 className="mt-4 font-heading text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not another dashboard */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">It is not another dashboard.</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            AI Revenue Desk is a revenue-recovery system built around the
            moments that decide whether a prospect becomes a customer:
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {moments.map((m) => (
              <li key={m} className="flex items-start gap-2 rounded-xl bg-secondary/70 px-4 py-2.5 text-sm">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            Your team stays in control. The system handles the repetitive
            follow-up that otherwise gets delayed, forgotten, or lost.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Calculate your revenue leak</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Monthly value = (no-shows recovered × booking value) + (new bookings × gross profit) + (staff hours saved × hourly cost).
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.label}>
                    <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
                    <input
                      type="number"
                      min={0}
                      value={f.value}
                      onChange={(e) => f.set(Number(e.target.value) || 0)}
                      className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm">
              <p className="text-sm font-medium uppercase tracking-wide text-primary-foreground/80">Estimated monthly value</p>
              <p className="mt-2 font-heading text-4xl font-bold">${monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="mt-2 text-primary-foreground/90">≈ ${yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })} / year</p>
              <p className="mt-6 text-sm text-primary-foreground/90">
                The Growth plan ($399–$699/mo) pays for itself with roughly{" "}
                <strong>{recovered}</strong> recovered appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Plans</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.t} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold">{p.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              <p className="mt-3 font-heading text-xl font-bold">{p.p}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.f}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Setup is tailored to your current website, booking tools, CRM, and
          customer journey. Implementation starts with a Revenue Leak Audit so
          we connect the highest-value workflows first.
        </p>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <h3 className="font-heading text-xl font-semibold">Implementation &amp; setup</h3>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {setup.map((s) => (
                <tr key={s.t} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4">{s.t}</td>
                  <td className="py-3 text-right font-medium">{s.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Built for appointment-based, high-ticket local services
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-card px-5 py-4 text-sm shadow-sm">{i}</div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
