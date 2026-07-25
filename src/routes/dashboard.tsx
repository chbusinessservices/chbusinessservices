import { Link, createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const stats = [
  { label: "Active Reports", value: 0, href: "/dashboard/reports", trend: "up", color: "indigo" },
  { label: "Saved Alerts", value: 0, href: "/dashboard/alerts", trend: "up", color: "purple" },
  { label: "Purchased Kits", value: 0, href: "/dashboard/purchases", trend: "up", color: "emerald" },
  { label: "Active Projects", value: 0, href: "/dashboard/projects", trend: "up", color: "amber" },
];

const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  indigo: { bg: "bg-indigo-50", border: "border-l-indigo-500", icon: "text-indigo-500" },
  purple: { bg: "bg-purple-50", border: "border-l-purple-500", icon: "text-purple-500" },
  emerald: { bg: "bg-emerald-50", border: "border-l-emerald-500", icon: "text-emerald-500" },
  amber: { bg: "bg-amber-50", border: "border-l-amber-500", icon: "text-amber-500" },
};

function TrendArrow({ trend }: { trend: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-400">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={trend === "up" ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
      </svg>
      {trend === "up" ? "0%" : "0%"}
    </span>
  );
}

function Dashboard() {
  return (
    <DashboardLayout currentPath="/dashboard">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome back to your AI Business Factory dashboard.
          </p>
        </AnimatedSection>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const c = colorMap[stat.color];
            return (
              <AnimatedSection key={stat.label} delay={i * 80}>
                <Link
                  to={stat.href}
                  className={`group card-premium border-l-4 ${c.border} p-6`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <TrendArrow trend={stat.trend} />
                  </div>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {stat.value}
                  </p>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Quick links */}
        <AnimatedSection delay={300}>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">Quick links</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { to: "/dashboard/reports", label: "My Reports", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { to: "/dashboard/purchases", label: "My Purchases", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
                { to: "/dashboard/projects", label: "My Projects", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
              ].map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center rounded-lg border border-gray-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
