import { Link } from "@tanstack/react-router";

const AUDIT_MAILTO =
  "mailto:hello@chbusiness.services?subject=Free%20Growth%20Audit%20request&body=I%E2%80%99d%20like%20a%20free%20growth%20audit%20for%20my%20business.%0A%0ABusiness%20name%3A%0AWebsite%3A%0ABiggest%20lead%20%2F%20follow-up%20challenge%3A";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          More leads. Faster response. Less follow-up chaos.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
          Get found, respond quickly, book more customers, and stop losing
          opportunities.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={AUDIT_MAILTO}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
          >
            Get a Free Growth Audit
          </a>
          <Link
            to="/lrd/ai-revenue-desk"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
          >
            See AI Revenue Desk
          </Link>
        </div>
      </div>
    </section>
  );
}
