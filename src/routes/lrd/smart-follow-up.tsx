import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/smart-follow-up")({
  head: () =>
    pageHead({
      title: "Smart Follow-Up Systems | CH Business Services",
      description:
        "Your business rules. Your voice. Human approval where it matters.",
      ogType: "website",
    }),
  component: SmartFollowUp,
});

const systems = [
  {
    t: "Instant Lead Response",
    solves: "A prospect submits a form, messages after hours, or calls when nobody is available.",
    bullets: ["Replies immediately by text or email", "Confirms the request was received", "Asks two to five qualifying questions", "Offers an appointment link or requests a callback window", "Sends lead details into the CRM", "Alerts the business owner or salesperson"],
    tagline: "Reply while the lead is still interested. When a new customer reaches out, your system responds in seconds—not tomorrow morning.",
  },
  {
    t: "Website AI Chat",
    solves: "Visitors leave because they cannot quickly find prices, hours, service areas, availability, or basic answers.",
    bullets: ["Answers only approved business questions", "Guides visitors to the correct service", "Captures name, phone, email, and need", "Sends hot leads to a person", "Routes sensitive questions to human staff", "Works after business hours"],
    tagline: "Turn website visitors into real conversations. Your AI web assistant answers common questions, guides people to the right service, and captures leads when your team is busy.",
  },
  {
    t: "Appointment and No-Show System",
    solves: "Missed appointments waste time, payroll, advertising spend, and revenue.",
    bullets: ["Lets customers book online", "Sends confirmation immediately", "Sends SMS and email reminders", "Provides easy rescheduling", "Fills openings from a waitlist, if configured", "Sends pre-appointment forms and document reminders", "Requests a review after completion"],
    tagline: "More booked appointments. Fewer no-shows. Give customers an easy way to book, confirm, reschedule, and get reminders automatically.",
  },
  {
    t: "Estimate and Quote Follow-Up",
    solves: "Businesses spend money generating leads and preparing estimates, then fail to consistently follow up.",
    bullets: ["Sends a branded “Did you have any questions?” message", "Reminds customers their estimate is ready", "Sends timed follow-ups", "Allows customers to book a call or approve the estimate", "Flags leads that need personal attention", "Stops messages when a customer says no or converts"],
    tagline: "Your estimates should not die in someone's inbox. We build follow-up systems that keep your business top of mind without sounding pushy.",
  },
  {
    t: "Reviews and Reputation System",
    solves: "Good businesses lose to competitors with more reviews and a stronger Google presence.",
    bullets: ["Sends a review request after a completed job", "Makes leaving a Google review simple", "Sends a private feedback path to unhappy customers", "Notifies the owner about negative feedback", "Provides response templates", "Tracks review volume and rating trends"],
    tagline: "Turn great service into more five-star proof. Ask happy customers at the right moment, protect your reputation, and build the trust that makes the next customer choose you.",
  },
];

function SmartFollowUp() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Smart Follow-Up Systems</h1>
          <p className="mt-3 text-muted-foreground">Your business rules. Your voice. Human approval where it matters.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {systems.map((s) => (
            <div key={s.t} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold">{s.t}</h2>
              <p className="mt-2 text-sm">
                <span className="font-semibold">Solves:</span>{" "}
                <span className="text-muted-foreground">{s.solves}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">{s.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
