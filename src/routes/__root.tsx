import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

// Force Link to be retained in the client bundle (prevents tree-shaking)
void Link;

import appCss from "~/styles/app.css?url";
import { ToastProvider } from "~/components/Toast";
import { SITE_URL, SITE_NAME, organizationLd } from "~/lib/seo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/* ─── Sign In Dropdown ─── */
function SignInDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-2 inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-text-secondary transition-all duration-200 hover:border-brand-accent/30 hover:text-brand-accent hover:shadow-sm"
      >
        Sign In
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-brand-border-light bg-white/95 shadow-xl shadow-black/5 backdrop-blur-xl transition-all duration-200 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="py-1">
          <Link
            to="/portal"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-brand-text transition-colors hover:bg-brand-surface-alt hover:text-brand-accent"
          >
            <svg className="h-4 w-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Client Portal
          </Link>
          <Link
            to="/admin/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-brand-text transition-colors hover:bg-brand-surface-alt hover:text-brand-accent"
          >
            <svg className="h-4 w-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI Business Kits & Automation Systems | CH Business Services" },
      {
        name: "description",
        content:
          "CH Business Services builds conversion-focused websites, AI business kits, automation systems, and intelligence reports for service businesses and growing brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Business Kits & Automation Systems | CH Business Services" },
      { name: "twitter:description", content: "CH Business Services builds conversion-focused websites, AI business kits, automation systems, and intelligence reports for service businesses and growing brands." },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-brand-surface">
      <div className="text-center">
        <h1 className="font-serif text-8xl font-bold text-brand-accent/10">404</h1>
        <p className="mt-4 text-lg text-brand-text-secondary">Page not found</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-accent/30 active:translate-y-0"
        >
          Back to home
        </Link>
      </div>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();

  return (
    <RootDocument>
      <ToastProvider>
        {/* ─── Sticky Nav ─── */}
        <header className="sticky top-0 z-50 border-b border-brand-border-light bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-accent text-white font-bold text-sm shadow-sm shadow-brand-accent/20 transition-shadow group-hover:shadow-md group-hover:shadow-brand-accent/30">
                  CH
                </div>
                <span className="font-serif text-lg font-semibold tracking-tight text-brand-text transition-colors">
                  CH Business Services
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-0.5 md:flex">
                {navLinks.map((link) => {
                  const isActive =
                    link.to === "/"
                      ? routerState.location.pathname === "/"
                      : routerState.location.pathname.startsWith(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`nav-link-underline rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-brand-text"
                          : "text-brand-text-secondary hover:text-brand-text"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to="/offers/gap-scan"
                  className="ml-3 inline-flex items-center rounded-xl bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-dark hover:shadow-xl hover:shadow-brand-accent/30 active:translate-y-0"
                >
                  Free Gap Scan
                </Link>
                <SignInDropdown />
              </nav>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="rounded-xl p-2 text-brand-text-secondary transition-all duration-200 hover:text-brand-text md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`overflow-hidden transition-all duration-300 md:hidden ${
              mobileOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="border-t border-brand-border-light bg-white/95 backdrop-blur-xl">
              <div className="space-y-1 px-4 py-3">
                {navLinks.map((link) => {
                  const isActive =
                    link.to === "/"
                      ? routerState.location.pathname === "/"
                      : routerState.location.pathname.startsWith(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-brand-accent/5 text-brand-accent"
                          : "text-brand-text-secondary hover:bg-brand-surface-alt hover:text-brand-text"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to="/offers/gap-scan"
                  className="mt-2 block rounded-xl bg-brand-accent px-3 py-2.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                  onClick={() => setMobileOpen(false)}
                >
                  Free Gap Scan
                </Link>
                <div className="mt-2 border-t border-brand-border-light pt-2">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-brand-text-muted">
                    Sign In
                  </p>
                  <Link
                    to="/portal"
                    className="block rounded-xl px-3 py-2.5 text-base font-medium text-brand-text-secondary transition-colors hover:bg-brand-surface-alt hover:text-brand-text"
                    onClick={() => setMobileOpen(false)}
                  >
                    Client Portal
                  </Link>
                  <Link
                    to="/admin/login"
                    className="block rounded-xl px-3 py-2.5 text-base font-medium text-brand-text-secondary transition-colors hover:bg-brand-surface-alt hover:text-brand-text"
                    onClick={() => setMobileOpen(false)}
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="page-enter flex-1">
          <Outlet />
        </div>

        {/* ─── Footer ─── */}
        <footer className="relative bg-brand-dark">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <Link to="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-accent text-white font-bold text-sm">
                    CH
                  </div>
                  <span className="font-serif text-lg font-semibold tracking-tight text-white">
                    CH Business Services
                  </span>
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-brand-text-muted">
                  Premium websites &amp; business systems that turn visitors into customers.
                </p>
              </div>

              {/* Navigate */}
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                  Navigate
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-brand-text-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* More */}
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                  More
                </h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <Link to="/case-studies" className="text-sm text-brand-text-muted transition-colors hover:text-white">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/intelligence" className="text-sm text-brand-text-muted transition-colors hover:text-white">
                      Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link to="/demo" className="text-sm text-brand-text-muted transition-colors hover:text-white">
                      Interactive Demo
                    </Link>
                  </li>
                  <li>
                    <Link to="/trial" className="text-sm text-brand-text-muted transition-colors hover:text-white">
                      Free Trial
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobos" className="text-sm text-brand-text-muted transition-colors hover:text-white">
                      JobOS AI Workers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Offers */}
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                  Offers
                </h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <Link
                      to="/offers/gap-scan"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Free Gap Scan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/trial"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Free Trial
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/marketplace"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/intelligence"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobos"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      AI Workforce Solutions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                  Company
                </h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <Link
                      to="/about"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-sm text-brand-text-muted transition-colors hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
                {/* Social */}
                <div className="mt-6">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                    Social
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href="https://www.linkedin.com/company/133396602/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-brand-text-muted transition-all duration-200 hover:bg-white/[0.12] hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/ch-business-services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-brand-text-muted transition-all duration-200 hover:bg-white/[0.12] hover:text-white"
                      aria-label="GitHub"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/[0.07] pt-8 text-center text-sm text-brand-text-muted/60">
              &copy; {new Date().getFullYear()} CH Business Services. All rights
              reserved.
            </div>
          </div>
        </footer>
      </ToastProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
