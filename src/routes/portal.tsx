import { Link, createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";

export const Route = createFileRoute("/portal")({
  component: PortalDashboard,
});

/* ─── Mock KPIs ─── */

const kpis = [
  {
    label: "Active Automations",
    value: "4",
    sub: "All running",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12" />
      </svg>
    ),
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    label: "Open Invoices",
    value: "1",
    sub: "$3,500.00 outstanding",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    label: "Support Tickets",
    value: "2",
    sub: "1 in progress",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    label: "Next Call",
    value: "Aug 1",
    sub: "Optimization review",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
];

/* ─── Recent activity ─── */

const activity = [
  {
    id: 1,
    action: "Agent follow-up run completed",
    detail: "Follow-up sequence executed for 3 leads",
    time: "2 hours ago",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 2,
    action: "New lead captured",
    detail: "John Smith — Home Services (via web form)",
    time: "5 hours ago",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    action: "Invoice sent",
    detail: "Invoice #INV-2026-0042 to Acme Corp",
    time: "Yesterday at 2:30 PM",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    action: "Onboarding step completed",
    detail: "Connect Accounts — OAuth links verified",
    time: "Yesterday at 10:15 AM",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ─── Page ─── */

function PortalDashboard() {
  const clientName = "Your Business";
  const planName = "Automation Pro";
  const renewalDate = "August 22, 2026";

  return (
    <DashboardLayout currentPath="/portal">
      <div className="page-enter px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <div className="card-premium overflow-hidden border-l-4 border-l-brand-gold bg-gradient-to-r from-brand-cream to-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-gray">
                Welcome back
              </p>
              <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                {clientName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
              <span className="text-sm font-medium text-brand-navy font-mono">
                {planName}
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-brand-gray">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Renewal: {renewalDate}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="card-premium flex items-start gap-4 p-5"
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${kpi.bg} ${kpi.text}`}>
                <span className="[&>svg]:h-5 [&>svg]:w-5">{kpi.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-brand-gray">
                  {kpi.label}
                </p>
                <p className="mt-1 font-serif text-2xl font-bold tracking-tight text-brand-navy">
                  {kpi.value}
                </p>
                <p className="mt-0.5 text-xs text-brand-gray-light">{kpi.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-brand-navy">
            Quick Actions
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              to="/portal/invoices"
              className="card-premium flex items-center gap-3 rounded-xl border border-brand-border-light bg-white px-5 py-4 text-sm font-medium text-brand-navy transition-all duration-200 hover:border-brand-gold/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              View Invoices
            </Link>
            <Link
              to="/portal/automation"
              className="card-premium flex items-center gap-3 rounded-xl border border-brand-border-light bg-white px-5 py-4 text-sm font-medium text-brand-navy transition-all duration-200 hover:border-brand-gold/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12" />
              </svg>
              Manage Automation
            </Link>
            <Link
              to="/portal/support"
              className="card-premium flex items-center gap-3 rounded-xl border border-brand-border-light bg-white px-5 py-4 text-sm font-medium text-brand-navy transition-all duration-200 hover:border-brand-gold/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              Get Support
            </Link>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="mt-10">
          <h2 className="font-serif text-lg font-semibold text-brand-navy">
            Recent Activity
          </h2>
          <div className="mt-4 space-y-0">
            {activity.map((item, i) => (
              <div key={item.id} className="relative flex gap-4 pb-5">
                {/* Timeline connector */}
                {i < activity.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-brand-border" />
                )}
                {/* Icon */}
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-cream-dark text-brand-gold">
                  <span className="[&>svg]:h-4 [&>svg]:w-4">{item.icon}</span>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <p className="text-sm font-medium text-brand-navy">{item.action}</p>
                  <p className="mt-0.5 text-sm text-brand-gray">{item.detail}</p>
                </div>
                <span className="flex-shrink-0 pt-1.5 text-xs text-brand-gray-light">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
