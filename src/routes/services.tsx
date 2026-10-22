import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Services & Pricing — CH Business Services",
      description:
        "Life admin support, appointment coordination, AI workflow setup and management, trust websites, and website care. Defined scopes with clear starting prices.",
      path: "/services",
    }),
  component: Services,
});

const services = [
  {
    name: "Document Reset",
    price: "$149",
    cadence: "one-time",
    scope:
      "Document checklist, organization structure, missing-item list, and Action Map",
  },
  {
    name: "Appointment & Deadline Desk",
    price: "$99/month",
    cadence: "monthly",
    scope: "An agreed calendar, reminders, and appointment coordination",
  },
  {
    name: "AI Workflow Setup",
    price: "$750",
    cadence: "one-time",
    scope:
      "One clearly scoped AI-assisted workflow, documented rules, and agreed tests",
  },
  {
    name: "AI Workflow Management",
    price: "$397/month",
    cadence: "monthly",
    scope: "Monitoring and improvement within a written service scope",
  },
  {
    name: "Trust Website",
    price: "$1,500",
    cadence: "one-time",
    scope: "A defined informational website project",
  },
  {
    name: "Website Care",
    price: "$150/month",
    cadence: "monthly",
    scope: "Agreed maintenance tasks under a written care plan",
  },
];

function Services() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-dark-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Services &amp; Pricing
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-muted">
              Every service starts with a defined scope, so you know exactly
              what you are getting before work begins.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Pricing table ─── */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-2xl border border-brand-border-light bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-brand-border-light bg-brand-surface-alt">
                  <th className="px-6 py-4 text-sm font-semibold text-brand-text">
                    Service
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-brand-text">
                    Proposed starting price
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-brand-text">
                    Defined starting scope
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr
                    key={svc.name}
                    className="border-b border-brand-border-light last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-brand-text">{svc.name}</div>
                      <div className="mt-0.5 text-xs uppercase tracking-wide text-brand-text-muted">
                        {svc.cadence}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-medium text-brand-accent">
                      {svc.price}
                    </td>
                    <td className="px-6 py-5 text-sm leading-relaxed text-brand-text-secondary">
                      {svc.scope}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AnimatedSection delay={200}>
            <p className="mt-8 rounded-xl border border-brand-border-light bg-brand-surface-alt p-5 text-sm leading-relaxed text-brand-text-secondary">
              Starting prices apply to defined scopes. Final pricing depends on
              the work, complexity, integrations, and support required. Any
              third-party subscriptions or additional charges will be
              identified in the proposal.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">
              Not sure which service fits?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-4 leading-relaxed text-brand-text-secondary">
              Tell us what you are trying to organize. We&apos;ll review
              whether it fits CH&apos;s services and propose a defined scope.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="mt-8">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Contact CH
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
