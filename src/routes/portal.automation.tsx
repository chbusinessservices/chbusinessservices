import { Link, createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { EmptyState } from "~/components/EmptyState";

export const Route = createFileRoute("/portal/automation")({
  component: PortalAutomation,
});

/* ─── Agent card data ─── */

const agents = [
  {
    name: "Lead Capture",
    description: "Captures leads from web forms, landing pages, and chat widgets 24/7",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    name: "Follow-up Engine",
    description: "Auto-responds to leads via email and SMS with personalized sequences",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    name: "CRM Sync",
    description: "Keeps your CRM up to date with lead status, notes, and deal stages",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
  {
    name: "Booking Agent",
    description: "Schedules calls and appointments automatically into your calendar",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
];

/* ─── Page ─── */

function PortalAutomation() {
  const hasAutomation = true;
  const planName = "Automation Pro";
  const nextCallDate = "August 1, 2026";

  return (
    <DashboardLayout currentPath="/portal/automation">
      <div className="page-enter px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Automation
          </h1>
          <p className="mt-2 text-brand-gray">
            Monitor and manage your active AI agents.
          </p>
        </AnimatedSection>

        {hasAutomation ? (
          <>
            {/* Plan header */}
            <AnimatedSection delay={80}>
              <div className="mt-8 card-premium overflow-hidden border-l-4 border-l-brand-gold bg-gradient-to-r from-brand-cream to-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-brand-gray">Current Plan</p>
                    <p className="mt-1 font-serif text-xl font-bold tracking-tight text-brand-navy">{planName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-brand-gray">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Next optimization call: {nextCallDate}
                </div>
              </div>
            </AnimatedSection>

            {/* Agent Status Cards — 2x2 grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {agents.map((agent, i) => (
                <AnimatedSection key={agent.name} delay={120 + i * 80}>
                  <div className="card-premium overflow-hidden border-l-4 border-l-brand-gold p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                        <span className="[&>svg]:h-5 [&>svg]:w-5">{agent.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-brand-navy">{agent.name}</h3>
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            Active
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-brand-gray">{agent.description}</p>
                        <a
                          href="#"
                          className="mt-3 inline-block text-sm font-medium text-brand-gold-dark hover:text-brand-gold transition-colors"
                        >
                          View activity →
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Empty state for one slot */}
            <AnimatedSection delay={460}>
              <div className="mt-6 card-premium border-2 border-dashed border-brand-border bg-brand-cream/50 p-6 text-center">
                <p className="text-sm text-brand-gray">
                  Need more agents?{" "}
                  <Link to="/services" className="font-medium text-brand-gold-dark hover:text-brand-gold transition-colors">
                    Browse add-ons →
                  </Link>
                </p>
              </div>
            </AnimatedSection>
          </>
        ) : (
          <div className="mt-8">
            <EmptyState
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12" />
                </svg>
              }
              title="No active automation"
              description="You don't have any active automation yet. Explore our automation packages to get started."
              ctaLabel="View Services"
              ctaHref="/services"
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
