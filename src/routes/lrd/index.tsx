import { Link, createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { ServiceCard } from "~/components/lrd/Catalog";
import { LRD_SERVICES } from "~/lib/lrd-data";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/")({
  head: () =>
    pageHead({
      title: "CH Business Services — AI Revenue Desk & Diverse Solutions",
      description:
        "We build revenue systems for service businesses, and provide everyday professional services: business, housing, immigration paperwork, taxes, notary and translation.",
      ogType: "website",
    }),
  component: Home,
});

const steps = [
  { n: "1", t: "Capture every inquiry", d: "Website forms, chats, missed calls, messages, and lead sources enter one system." },
  { n: "2", t: "Respond immediately", d: "Customers receive fast, helpful, brand-approved replies when intent is highest." },
  { n: "3", t: "Qualify the opportunity", d: "The system identifies service needs, location, budget signals, urgency, and next action." },
  { n: "4", t: "Book or recover", d: "Leads receive booking links, staff handoffs, reminders, rescheduling, and deposit prompts." },
  { n: "5", t: "Protect the experience", d: "Feedback is collected, unhappy customers are escalated, and satisfied customers are guided toward reviews." },
  { n: "6", t: "Show revenue impact", d: "Owners see response speed, leads recovered, bookings created, no-shows prevented, and reviews generated." },
];

const homeServices = ["6ac6e91c52554a739c3c02c0", "6ac6e91c52554a739c3c02bd", "6ac6e91c52554a739c3c02b6", "6ac6e91c52554a739c3c02b9", "6ac6e91c52554a739c3c02af", "6ac6e91c52554a739c3c02b1"];

const offers = [
  { t: "Lead-Generating Website", d: "A site built to look credible, get found, and convert visitors.", p: "$1,250–$6,500+" },
  { t: "Instant Lead Response System", d: "Website chat + missed-call text back + SMS/email follow-up + booking.", p: "$1,500–$4,000 setup + $297–$797/mo" },
  { t: "Local Visibility System", d: "Google Business Profile, local SEO setup, service-area pages, review engine.", p: "$750–$2,500 setup + $500–$1,500/mo" },
  { t: "Growth Partner", d: "Ongoing website, SEO, lead follow-up, CRM, reporting, and optimization.", p: "$1,500–$3,500/mo" },
];

const followUp = [
  { t: "Instant Lead Response", d: "Reply while the lead is still interested. When a new customer reaches out, your system responds in seconds—not tomorrow morning." },
  { t: "Website AI Chat", d: "Turn website visitors into real conversations. Your AI web assistant answers common questions, guides people to the right service, and captures leads when your team is busy." },
  { t: "Appointment and No-Show System", d: "More booked appointments. Fewer no-shows. Give customers an easy way to book, confirm, reschedule, and get reminders automatically." },
  { t: "Estimate and Quote Follow-Up", d: "Your estimates should not die in someone's inbox. We build follow-up systems that keep your business top of mind without sounding pushy." },
  { t: "Reviews and Reputation System", d: "Turn great service into more five-star proof. Ask happy customers at the right moment, protect your reputation, and build the trust that makes the next customer choose you." },
];

const bundles = [
  { t: "Get Found Bundle", d: "For businesses that need visibility and credibility", p: "$1,500–$3,500 one time", f: ["Website or landing-page improvement", "Google Business Profile optimization", "Basic local SEO setup", "Review-request system"] },
  { t: "Stop Losing Leads Bundle", d: "For businesses getting inquiries but responding too slowly", p: "$2,500–$5,000 setup + $497–$997/mo", f: ["Website lead form or landing page", "Instant text/email response", "Missed-call text-back", "AI web chat for common questions"] },
  { t: "Close More Business Bundle", d: "For businesses that send quotes or proposals but need better follow-up", p: "$4,500–$8,500 setup + $997–$1,997/mo", f: ["Everything in Stop Losing Leads", "Estimate and proposal follow-up", "Re-engagement sequence", "Sales pipeline cleanup"] },
];

const advantages = [
  { t: "You start with the revenue leak", d: "Not “Which AI do you want?” Instead: “Where are you losing customers today?”" },
  { t: "You sell one connected customer journey", d: "Search → website → chat/form/call → immediate reply → booking → reminder → quote follow-up → review request." },
  { t: "You build with human control", d: "AI drafts, responds to approved FAQs, qualifies, schedules, and flags. Humans handle exceptions, sensitive conversations, pricing, complaints, and high-stakes decisions." },
  { t: "You report business outcomes", d: "Show response speed, leads captured, bookings, estimate follow-ups, no-show reduction, reviews generated, and pipeline aging." },
  { t: "You make it industry-specific", d: "A system for an HVAC business should not look like a system for a med spa or real-estate broker." },
];

const niches = ["HVAC", "Plumbing", "Roofing", "Renovation and remodeling", "Water damage", "Electrical", "Cleaning", "Landscaping", "Moving", "Pest control"];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Websites are the beginning. Revenue systems are the advantage.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            We build high-converting websites, intelligent lead-response
            workflows, and AI-powered follow-up systems that help service
            businesses turn more inquiries into booked customers.
          </p>
          <p className="mt-3 font-heading text-lg text-primary-foreground">
            Get found. Respond faster. Book more. Lose fewer opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/lrd/ai-revenue-desk"
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80"
            >
              See AI Revenue Desk
            </Link>
            <Link
              to="/lrd/offers"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
            >
              Explore Website Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
        <p className="font-heading text-xl text-balance sm:text-2xl">
          We build revenue systems for service businesses. Start with a
          high-converting site—or install AI Revenue Desk to capture, follow up
          with, book, and retain more customers.
        </p>
      </section>

      {/* Flagship — AI Revenue Desk */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
                Flagship product
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl">AI Revenue Desk</h2>
              <p className="mt-3 max-w-xl text-primary-foreground/90">
                AI Revenue Desk helps service businesses respond instantly,
                qualify leads, book appointments, reduce no-shows, and recover
                unhappy customers—without adding another full-time employee.
              </p>
              <p className="mt-2 font-heading text-lg">Turn more conversations into confirmed revenue.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/lrd/ai-revenue-desk"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80"
                >
                  See AI Revenue Desk
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
            <ol className="grid gap-2">
              {steps.map((s) => (
                <li key={s.n} className="flex items-start gap-3 rounded-xl bg-primary-foreground/10 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">{s.n}</span>
                  <div>
                    <div className="text-sm font-semibold">{s.t}</div>
                    <div className="text-xs text-primary-foreground/80">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Diverse Solutions */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Diverse Solutions by CH Business Services
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Everyday tasks. Professional support. One connected experience.
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Explore Diverse Solutions by CH Business Services, book the help you
            need, securely pay online, and track your service from request to
            completion—all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/lrd/diverse-solutions"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              Explore Services
            </Link>
            <Link
              to="/lrd/diverse-solutions"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
            >
              Book a Service
            </Link>
            <Link
              to="/lrd/client-portal"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" /></svg>
              Track My Booking
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices
            .map((id) => LRD_SERVICES.find((s) => s.id === id))
            .filter((s): s is (typeof LRD_SERVICES)[number] => Boolean(s))
            .map((s) => (
              <ServiceCard key={s.id} s={s} />
            ))}
        </div>
      </section>

      {/* Four core offers */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Four core offers</h2>
        <p className="mt-2 text-muted-foreground">
          Get found → convert visitors → respond instantly → follow up until they book.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <div key={o.t} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-base font-semibold">{o.t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.d}</p>
              <p className="mt-3 text-sm font-semibold">{o.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Link to="/lrd/offers" className="text-sm font-medium text-primary hover:underline">
            Explore all offers →
          </Link>
        </div>
      </section>

      {/* Smart Follow-Up Systems */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Smart Follow-Up Systems</h2>
        <p className="mt-2 text-muted-foreground">Your business rules. Your voice. Human approval where it matters.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {followUp.map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-base font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Link to="/lrd/smart-follow-up" className="text-sm font-medium text-primary hover:underline">
            See how the systems work →
          </Link>
        </div>
      </section>

      {/* Three bundles */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Three bundles to sell</h2>
        <p className="mt-2 text-muted-foreground">Don&apos;t buy individual tools first. Buy a bundle based on your problem.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {bundles.map((b) => (
            <div key={b.t} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-lg font-semibold">{b.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              <p className="mt-3 font-heading font-semibold">{b.p}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {b.f.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
                <li className="text-sm text-muted-foreground">+ more</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Link to="/lrd/bundles" className="text-sm font-medium text-primary hover:underline">
            Compare bundles →
          </Link>
        </div>
      </section>

      {/* What makes us beat the market */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">What makes us beat the market</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We make sure a business can be found, trusted, contacted, followed up with, booked, and reviewed.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <div key={a.t} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-base font-semibold">{a.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-heading text-base font-semibold">Our first niche: high-ticket local home services</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {niches.map((n) => (
                <span key={n} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
