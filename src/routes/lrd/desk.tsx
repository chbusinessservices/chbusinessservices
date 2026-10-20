import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { Catalog } from "~/components/lrd/Catalog";
import { LRD_CATALOG, LRD_SERVICE_CARDS, type LrdService } from "~/lib/lrd-data";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/desk")({
  head: () =>
    pageHead({
      title: "Life Admin Desk | CH Business Services",
      description:
        "Life gets complicated. Getting help shouldn't. Insurance, taxes, documents, immigration paperwork support, housing, rentals and business setup in one place.",
      ogType: "website",
    }),
  component: Desk,
});

const chips = ["I got a letter", "I need an ITIN", "I need taxes done", "I need insurance", "I need a notary", "I'm starting a business", "I need a rental", "I need a translation"];

const HERO_IMG =
  "https://media.base44.com/images/public/6abfd3d0449aa5b934f60a52/1f2ea5084_generated_b3eb78ea.jpg/v1/fill/w_1024,h_1024,al_c,q_90,usm_0.66_1.00_0.01,enc_webp,quality_auto/1f2ea5084_generated_b3eb78ea.webp";

function DashboardPreview() {
  const cols = [
    { t: "Do now", items: ["Renew driver's license", "Submit FAFSA correction", "Pay quarterly taxes"] },
    { t: "Due soon", items: ["Green card renewal window", "Lease renewal notice", "IRS letter response"] },
    { t: "Waiting on", items: ["Attorney review", "Notary appointment", "Insurance quote"] },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <p className="font-heading text-lg font-semibold">My Next 30 Days™</p>
      <p className="text-xs text-muted-foreground">member dashboard preview</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {cols.map((c) => (
          <div key={c.t} className="rounded-xl bg-secondary/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.t}</p>
            <ul className="mt-2 space-y-1.5">
              {c.items.map((i) => (
                <li key={i} className="text-xs text-foreground/80">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Our fees</p><p className="text-sm font-semibold">$250 this month</p></div>
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Government fees</p><p className="text-sm font-semibold">$410 upcoming</p></div>
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Payment plan status</p><p className="text-sm font-semibold">Active</p></div>
      </div>
    </div>
  );
}

function Desk() {
  const scrollToCatalog = () => {
    document.getElementById("lrd-catalog")?.scrollIntoView({ behavior: "smooth" });
  };
  const clickChip = (label: string) => {
    scrollToCatalog();
    const input = document.querySelector<HTMLInputElement>("#lrd-catalog input");
    if (input) {
      input.value = label;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-medium text-primary-foreground/80">
            Serving New Jersey families, workers, renters, landlords and businesses. Bilingual English &amp; Spanish.
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Life gets complicated. Getting help shouldn&apos;t.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Insurance, taxes, documents, immigration paperwork support, housing,
            rentals and business setup in one place. Published prices. Know what
            to bring. Real people.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => clickChip(c)}
                className="rounded-full bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20"
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToCatalog}
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
          >
            Find my service
          </button>
        </div>
      </section>

      {/* Image + dashboard preview */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <img
            src={HERO_IMG}
            alt="An organized desk in a sunlit New Jersey brownstone"
            className="w-full rounded-3xl object-cover shadow-md"
            loading="lazy"
          />
          <DashboardPreview />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Pick a category, or just search</h2>
        <p className="mt-2 text-muted-foreground">Every service below has a starting price. Tap one to see what to bring and book.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LRD_SERVICE_CARDS.map((c) => {
            const count = LRD_CATALOG.filter((s: LrdService) => s.category === c.cat).length;
            return (
              <button
                key={c.cat}
                type="button"
                onClick={scrollToCatalog}
                className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-colors hover:border-primary/40"
              >
                <h3 className="font-heading text-base font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                <p className="mt-3 text-xs font-medium text-primary">{count} services</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Catalog */}
      <section id="lrd-catalog" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Catalog services={LRD_CATALOG} />
      </section>

      {/* Book */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Ready? One appointment moves things forward.
          </h2>
          <p className="mt-2 text-primary-foreground/90">Bring the paperwork. We&apos;ll organize the next step.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@lifeadmindesk.com?subject=Appointment%20request"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
            >
              Request an appointment
            </a>
            <a
              href="tel:+12015550100"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/15 px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/25"
            >
              Call us
            </a>
            <a
              href="sms:+12015550101"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/15 px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/25"
            >
              Text us
            </a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Built for New Jersey life</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We help families, workers, renters, landlords and new entrepreneurs organize the paperwork behind major life moments.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Serving Hudson County and surrounding New Jersey communities",
            "Bilingual support: English and Spanish",
            "Transparent starting prices",
            "Licensed professional referrals where required",
            "By appointment and mobile-service options",
            "Private document intake",
            "Clear next steps before you pay",
          ].map((t) => (
            <div key={t} className="flex items-start gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-sm shadow-sm">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              {t}
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
