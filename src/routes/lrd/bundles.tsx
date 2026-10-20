import { Link, createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/bundles")({
  head: () =>
    pageHead({
      title: "Three Bundles | CH Business Services",
      description:
        "Don't buy individual tools first. Buy a bundle based on your problem.",
      ogType: "website",
    }),
  component: Bundles,
});

const bundles = [
  {
    t: "Get Found Bundle",
    d: "For businesses that need visibility and credibility",
    p: "$1,500–$3,500 one time",
    features: [
      "Website or landing-page improvement",
      "Google Business Profile optimization",
      "Basic local SEO setup",
      "Review-request system",
      "Call-to-action and contact-flow upgrade",
      "Lead tracking",
    ],
    best: "New businesses, trades, salons, restaurants, local services, consultants, realtors",
  },
  {
    t: "Stop Losing Leads Bundle",
    d: "For businesses getting inquiries but responding too slowly",
    p: "$2,500–$5,000 setup + $497–$997/mo",
    features: [
      "Website lead form or landing page",
      "Instant text/email response",
      "Missed-call text-back",
      "AI web chat for common questions",
      "Online booking",
      "CRM pipeline",
      "Lead-notification system",
      "Monthly reporting",
    ],
    best: "Contractors, legal firms, med spas, insurance agencies, clinics, home services, accountants, realtors, and professional services",
  },
  {
    t: "Close More Business Bundle",
    d: "For businesses that send quotes or proposals but need better follow-up",
    p: "$4,500–$8,500 setup + $997–$1,997/mo",
    features: [
      "Everything in Stop Losing Leads",
      "Estimate and proposal follow-up",
      "Re-engagement sequence",
      "Sales pipeline cleanup",
      "Automated reminders for salespeople",
      "Lead-priority alerts",
      "Review and referral system",
      "Monthly conversion review",
    ],
    best: "Contractors, agencies, B2B services, commercial cleaning, remodelers, roofing, HVAC, legal, finance, and real estate",
  },
];

function Bundles() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Three bundles to sell</h1>
          <p className="mt-3 text-muted-foreground">
            Don&apos;t buy individual tools first. Buy a bundle based on your problem.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {bundles.map((b) => (
            <div key={b.t} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold">{b.t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              <p className="mt-4 font-heading text-xl font-bold">{b.p}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {b.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm">
                <span className="font-semibold">Best for:</span>{" "}
                <span className="text-muted-foreground">{b.best}</span>
              </p>
              <Link
                to="/lrd/contact"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Request this
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
