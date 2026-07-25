import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const portalLinks = [
  {
    to: "/portal",
    label: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1",
  },
  {
    to: "/portal/automation",
    label: "Automation",
    icon: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M6.42 17.578l1.153-1.033M16.425 7.455l1.153-1.033M5.265 8.543l.513 1.41m13.444 5.094l.513 1.41M8.543 18.735l.513-1.41m5.094-13.444l.513-1.41M17.578 17.578l-1.034-1.153M7.455 7.578l-1.034-1.153",
  },
  {
    to: "/portal/invoices",
    label: "Invoices",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
  {
    to: "/portal/onboarding",
    label: "Onboarding",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    to: "/portal/support",
    label: "Support",
    icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z",
  },
];

function SidebarIcon({ d }: { d: string }) {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export function DashboardLayout({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-0 flex-1">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-brand-border-light bg-white/95 pt-16 backdrop-blur-md transition-transform lg:static lg:z-auto lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="border-b border-brand-border-light px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-dark text-sm font-bold text-white shadow-sm font-serif">
              CH
            </span>
            <span className="font-serif text-sm font-semibold tracking-tight text-brand-navy">
              Client Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-0.5">
            {portalLinks.map((link) => {
              const isActive =
                link.to === "/portal"
                  ? currentPath === "/portal"
                  : currentPath.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-brand-gold/10 text-brand-gold shadow-sm"
                      : "text-brand-gray hover:bg-brand-cream-dark hover:text-brand-navy"
                  }`}
                >
                  <SidebarIcon d={link.icon} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer — user greeting + sign out */}
        <div className="border-t border-brand-border-light px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream-dark text-xs font-semibold text-brand-navy font-mono">
              CB
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-brand-navy truncate">
                Client Name
              </p>
              <p className="text-xs text-brand-gray-light truncate">
                client@example.com
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-brand-gray transition-colors hover:bg-brand-cream-dark hover:text-brand-navy"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-brand-cream/30">
        {/* Mobile header bar */}
        <div className="flex items-center gap-3 border-b border-brand-border-light bg-white/90 backdrop-blur-sm px-4 py-3 lg:hidden">
          <button
            type="button"
            className="rounded-lg p-1.5 text-brand-gray transition-all duration-200 hover:bg-brand-cream-dark hover:text-brand-navy"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dark text-xs font-bold text-white font-serif">
              CH
            </span>
            <span className="text-sm font-semibold text-brand-navy font-serif">
              Client Portal
            </span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
