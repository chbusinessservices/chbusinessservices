import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LRD_DISCLOSURES } from "~/lib/lrd-data";

export const Route = createFileRoute("/lrd")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: LrdLayout,
});

const navLinks = [
  { to: "/lrd/ai-revenue-desk", label: "AI Revenue Desk" },
  { to: "/lrd/diverse-solutions", label: "Diverse Solutions" },
  { to: "/lrd/desk", label: "Life Admin Desk" },
  { to: "/lrd/client-portal", label: "Client Portal" },
  { to: "/lrd/offers", label: "Offers" },
  { to: "/lrd/bundles", label: "Bundles" },
] as const;

function LrdLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lrd min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/lrd" className="font-heading text-lg font-bold tracking-tight">
            CH<span className="text-primary">Business</span>Services
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/lrd/ai-revenue-desk"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              See AI Revenue Desk
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="border-t border-border bg-white px-4 py-3 lg:hidden">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/lrd/ai-revenue-desk"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              See AI Revenue Desk
            </Link>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {LRD_DISCLOSURES.title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {LRD_DISCLOSURES.p1}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {LRD_DISCLOSURES.p2}
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} Life Admin Desk. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/lrd/privacy-policy" className="hover:text-foreground">Privacy</Link>
              <Link to="/lrd/terms-of-service" className="hover:text-foreground">Terms</Link>
              <Link to="/lrd/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
