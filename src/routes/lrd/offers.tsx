import { Link, createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/offers")({
  head: () =>
    pageHead({
      title: "Four Core Offers | CH Business Services",
      description:
        "Get found → convert visitors → respond instantly → follow up until they book.",
      ogType: "website",
    }),
  component: Offers,
});

const offers = [
  {
    icon: <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />,
    t: "Lead-Generating Website",
    d: "A site built to look credible, get found, and convert visitors.",
    why: "Their existing site looks outdated or generates too few leads.",
    p: "$1,250–$6,500+",
  },
  {
    icon: <path d="M14.5 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM10.5 3.5a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5zM15 6l2.5 2.5M13 8l2.5 2.5" />,
    t: "Instant Lead Response System",
    d: "Website chat + missed-call text back + SMS/email follow-up + booking.",
    why: "They lose leads because nobody answers fast enough.",
    p: "$1,500–$4,000 setup + $297–$797/mo",
  },
  {
    icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    t: "Local Visibility System",
    d: "Google Business Profile, local SEO setup, service-area pages, review engine.",
    why: "They want local customers to find and trust them.",
    p: "$750–$2,500 setup + $500–$1,500/mo",
  },
  {
    icon: <path d="M16 7h6m0 0-3-3m3 3-3 3M8 17H2m0 0 3 3m-3-3 3-3" />,
    t: "Growth Partner",
    d: "Ongoing website, SEO, lead follow-up, CRM, reporting, and optimization.",
    why: "They want someone responsible for growth after launch.",
    p: "$1,500–$3,500/mo",
  },
];

function Offers() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Four core offers</h1>
          <p className="mt-3 text-muted-foreground">
            Get found → convert visitors → respond instantly → follow up until they book.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <div key={o.t} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{o.icon}</svg>
              </div>
              <h2 className="mt-4 font-heading text-lg font-semibold">{o.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.d}</p>
              <p className="mt-3 text-sm">
                <span className="font-semibold">Why they buy:</span>{" "}
                <span className="text-muted-foreground">{o.why}</span>
              </p>
              <p className="mt-4 font-heading text-lg font-bold">{o.p}</p>
              <Link
                to="/lrd/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Request this
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
