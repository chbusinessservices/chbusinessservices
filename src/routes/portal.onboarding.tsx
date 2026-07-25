import { Link, createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/portal/onboarding")({
  component: PortalOnboarding,
});

/* ─── Onboarding steps ─── */

const steps = [
  {
    number: 1,
    day: "Day 0",
    title: "Sign Up",
    description: "You signed up and scope was confirmed.",
    status: "completed" as const,
    detail: "Service agreement signed. Welcome call completed with your dedicated success manager.",
  },
  {
    number: 2,
    day: "Day 1",
    title: "Onboarding Intake",
    description: "Short form collecting your CRM, calendar, phone, pricing rules.",
    status: "current" as const,
    detail: "We need details about your tech stack, business hours, lead sources, and follow-up preferences.",
    actionLabel: "Complete form →",
    actionHref: "/contact",
  },
  {
    number: 3,
    day: "Day 1–3",
    title: "Connect Accounts",
    description: "We link your email, calendar, and phone.",
    status: "upcoming" as const,
    detail: "Secure OAuth connections to your Gmail, Google Calendar, and Twilio number. No passwords stored.",
  },
  {
    number: 4,
    day: "Day 2–4",
    title: "Rules Configured",
    description: "Follow-up sequences, escalation triggers, and CRM rules built to your business.",
    status: "upcoming" as const,
    detail: "Custom logic for lead qualification, routing, follow-up cadence, and escalation paths.",
  },
  {
    number: 5,
    day: "Day 4–7",
    title: "Tested",
    description: "Test leads run through it before it ever touches a real customer.",
    status: "upcoming" as const,
    detail: "We run synthetic leads through every path to confirm triggers, timing, and handoffs work as expected.",
  },
  {
    number: 6,
    day: "Day 4–7",
    title: "Go Live",
    description: "Automation flipped on.",
    status: "upcoming" as const,
    detail: "Production activation. Real leads begin flowing through the system. We monitor for the first 48 hours.",
  },
];

/* ─── Step component ─── */

function StepRow({
  step,
  isLast,
}: {
  step: (typeof steps)[number];
  isLast: boolean;
}) {
  const isCompleted = step.status === "completed";
  const isCurrent = step.status === "current";
  const isUpcoming = step.status === "upcoming";

  return (
    <div className="flex gap-4">
      {/* Vertical timeline column */}
      <div className="flex flex-col items-center">
        {/* Step icon */}
        {isCompleted ? (
          <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold shadow-sm">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        ) : isCurrent ? (
          <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold shadow-sm ring-4 ring-brand-gold/20">
            <span className="h-3 w-3 rounded-full bg-white" />
          </span>
        ) : (
          <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-border bg-white">
            <span className="text-xs font-semibold text-brand-gray-light">{step.number}</span>
          </span>
        )}
        {/* Connector line */}
        {!isLast && (
          <div
            className={`my-1 w-0.5 flex-1 min-h-[40px] ${
              isCompleted ? "bg-brand-gold/40" : "bg-brand-border"
            }`}
          />
        )}
      </div>

      {/* Content column */}
      <div className={`pb-8 flex-1 ${isLast ? "" : ""}`}>
        <div
          className={`rounded-xl border p-5 transition-all duration-200 ${
            isCurrent
              ? "border-brand-gold/30 bg-brand-cream shadow-sm"
              : isCompleted
                ? "border-brand-border-light bg-white/70"
                : "border-brand-border-light bg-white/50"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isCompleted
                  ? "bg-brand-gold/10 text-brand-gold-dark"
                  : isCurrent
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.day}
            </span>
            <h3
              className={`text-base font-semibold ${
                isUpcoming ? "text-brand-gray-light" : "text-brand-navy"
              }`}
            >
              {step.title}
            </h3>
            {isCompleted && (
              <span className="ml-auto inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                Completed
              </span>
            )}
            {isCurrent && (
              <span className="ml-auto inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                In Progress
              </span>
            )}
            {isUpcoming && (
              <span className="ml-auto inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-brand-gray-light ring-1 ring-inset ring-brand-border">
                Upcoming
              </span>
            )}
          </div>
          <p className={`mt-2 text-sm leading-relaxed ${isUpcoming ? "text-brand-gray-light" : "text-brand-gray"}`}>
            {step.description}
          </p>
          <p className={`mt-1.5 text-sm ${isUpcoming ? "text-brand-gray-light" : "text-brand-gray"}`}>
            {step.detail}
          </p>
          {step.actionLabel && step.actionHref && (
            <Link
              to={step.actionHref}
              className="mt-3 inline-flex items-center text-sm font-medium text-brand-gold-dark hover:text-brand-gold transition-colors"
            >
              {step.actionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */

function PortalOnboarding() {
  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalSteps = steps.length;
  const percentComplete = Math.round((completedCount / totalSteps) * 100);

  return (
    <DashboardLayout currentPath="/portal/onboarding">
      <div className="page-enter px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Onboarding Tracker
          </h1>
          <p className="mt-2 text-brand-gray">
            Track your progress through our 7-day onboarding process.
          </p>
        </AnimatedSection>

        {/* Progress summary */}
        <AnimatedSection delay={80}>
          <div className="mt-8 card-premium p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-brand-gray">Overall Progress</p>
                <p className="mt-1 font-serif text-2xl font-bold tracking-tight text-brand-navy">
                  {percentComplete}%
                </p>
              </div>
              <div className="flex-1 max-w-md">
                <div className="h-3 w-full rounded-full bg-brand-cream-dark">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light transition-all duration-700"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-brand-gray">
                  {completedCount} of {totalSteps} steps completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium uppercase tracking-wider text-brand-gray">Estimated completion</p>
                <p className="mt-1 font-serif text-lg font-semibold text-brand-gold-dark">~5 days remaining</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Vertical step tracker */}
        <div className="mt-10">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={120 + i * 60}>
              <StepRow step={step} isLast={i === steps.length - 1} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
