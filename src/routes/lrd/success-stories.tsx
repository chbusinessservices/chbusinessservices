import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/success-stories")({
  head: () =>
    pageHead({
      title: "Success Stories | Life Admin Desk",
      description: "How organized paperwork helped real clients move forward.",
      ogType: "website",
    }),
  component: Stories,
});

const stories = [
  { cat: "Immigration", t: "Reuniting a family after a lost file", ch: "A client arrived with three years of scattered immigration documents and a recently denied petition due to missing evidence.", did: "We organized the file, coordinated certified translations, and referred the client to a licensed immigration attorney for the legal strategy.", out: "The attorney filed an updated petition with a complete, indexed package. The case was approved within the normal processing window." },
  { cat: "Taxes", t: "Three years of back taxes, organized", ch: "A self-employed worker had not filed for three years and had unopened IRS notices.", did: "We sorted income and expense records, organized the IRS notices, and prepared the files for a tax professional to file.", out: "All three returns were filed, a payment plan request was prepared, and the client received a clear next-step checklist." },
  { cat: "Business", t: "From idea to registered LLC", ch: "A new entrepreneur wanted to start a cleaning business but did not know where to begin.", did: "We walked through name choices, prepared the NJ LLC filing and EIN information, and built a compliance calendar.", out: "The LLC was registered, the EIN was obtained, and the owner left with a month-by-month reminder schedule." },
  { cat: "Housing", t: "A renter ready in one week", ch: "A relocating nurse needed a 30-day furnished stay and a complete rental application file fast.", did: "We ran a compliance check, set up the 30+ day listing inquiry, and assembled her application file with ID, income, and references.", out: "She was approved for the stay and moved in within the week, with a move-in checklist in hand." },
];

function Stories() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h1>
          <p className="mt-3 text-muted-foreground">How organized paperwork helped real clients move forward.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((s) => (
            <article key={s.t} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{s.cat}</span>
              <h2 className="mt-3 font-heading text-xl font-semibold">{s.t}</h2>
              <div className="mt-4 space-y-3 text-sm">
                <p><span className="font-semibold">The challenge:</span> <span className="text-muted-foreground">{s.ch}</span></p>
                <p><span className="font-semibold">What we did:</span> <span className="text-muted-foreground">{s.did}</span></p>
                <p><span className="font-semibold">The outcome:</span> <span className="text-muted-foreground">{s.out}</span></p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
