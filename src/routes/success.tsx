import { Link, createFileRoute, useSearch } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import {
  FULFILLMENT_SITE_URL,
  ONBOARDING_BOOKING_URL,
  SUPPORT_EMAIL,
  getFulfillmentKit,
  type Deliverable,
  type DeliverableType,
} from "~/lib/fulfillment";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
  head: () => ({
    meta: [
      { title: "Order Confirmed — CH Business Services" },
      {
        name: "description",
        content:
          "Your purchase is confirmed. Access your kit downloads, setup instructions, and support.",
      },
      { property: "og:title", content: "Order Confirmed — CH Business Services" },
      {
        property: "og:description",
        content:
          "Your purchase is confirmed. Access your kit downloads, setup instructions, and support.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${FULFILLMENT_SITE_URL}/success` },
    ],
    links: [{ rel: "canonical", href: `${FULFILLMENT_SITE_URL}/success` }],
  }),
});

/* ─── Icons ─── */

function DeliverableIcon({ type }: { type: DeliverableType }) {
  const cls = "h-5 w-5";
  switch (type) {
    case "download":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      );
    case "access":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      );
    case "schedule":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    case "instruction":
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
  }
}

function CheckCircle() {
  return (
    <svg className="h-16 w-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/* ─── Deliverable card ─── */

function DeliverableCard({ d }: { d: Deliverable }) {
  const typeColor: Record<DeliverableType, string> = {
    download: "bg-indigo-50 text-indigo-600",
    access: "bg-purple-50 text-purple-600",
    schedule: "bg-amber-50 text-amber-600",
    instruction: "bg-slate-100 text-slate-600",
  };
  const typeLabel: Record<DeliverableType, string> = {
    download: "Download",
    access: "Access",
    schedule: "Schedule",
    instruction: "Guide",
  };
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${typeColor[d.type]}`}>
        <DeliverableIcon type={d.type} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-900">{d.title}</h4>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
            {typeLabel[d.type]}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600">{d.description}</p>
      </div>
    </div>
  );
}

/* ─── Page ─── */

function SuccessPage() {
  // TanStack Router exposes query params via useSearch when validated.
  const search = useSearch({ strict: false }) as { product?: string; name?: string };
  const tier = search.product ?? null;
  const productName = search.name ?? undefined;
  const kit = getFulfillmentKit(tier);

  // No product param → generic thank-you
  if (!tier) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <CheckCircle />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Thank you for your purchase!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We've received your order. A confirmation with your deliverables and
              next steps is on its way to your inbox.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
              >
                Contact support
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to home
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Questions? Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-indigo-600 hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 py-16 sm:py-20">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex justify-center">
              <div className="rounded-full bg-white/15 p-3 backdrop-blur-sm">
                <CheckCircle />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Order Confirmed
            </h1>
            <p className="mt-3 text-lg text-indigo-100">
              You're all set — here's everything you need to get started.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-xl bg-white/10 px-6 py-4 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                Purchased
              </span>
              <span className="text-lg font-bold text-white">
                {productName ?? kit.kitName}
              </span>
              <span className="mt-1 inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white">
                Delivery: {kit.estimatedDeliveryTime}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Deliverables ─── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Deliverables</h2>
            <p className="mt-1 text-gray-600">Everything included with your purchase.</p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="mt-6 space-y-3">
              {kit.deliverables.map((d) => (
                <DeliverableCard key={d.title} d={d} />
              ))}
            </div>
          </AnimatedSection>

          {/* Download button */}
          {kit.downloadUrl && (
            <AnimatedSection delay={150}>
              <div className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 text-center">
                <h3 className="text-base font-semibold text-gray-900">Download your kit</h3>
                <p className="mt-1 text-sm text-gray-600">
                  The complete {kit.kitName} bundle, ready to use.
                </p>
                <a
                  href={`${FULFILLMENT_SITE_URL}${kit.downloadUrl}`}
                  className="btn-primary mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Kit (.zip)
                </a>
                <p className="mt-3 text-xs text-gray-400">
                  A download link has also been emailed to you.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ─── Setup + Access ─── */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Setup */}
            <AnimatedSection>
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Setup Instructions
                </h3>
                <ol className="mt-4 space-y-3">
                  {kit.setupInstructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>

            {/* Access */}
            <AnimatedSection delay={100}>
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Access Instructions
                </h3>
                <ul className="mt-4 space-y-3">
                  {kit.accessInstructions.map((line, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Onboarding CTA */}
          {kit.includesOnboardingCall && (
            <AnimatedSection delay={150}>
              <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center sm:p-8">
                <h3 className="text-lg font-bold text-white">Schedule your onboarding call</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-indigo-100">
                  Your plan includes a personalized onboarding call. Book a time
                  that works for you and we'll walk through your setup together.
                </p>
                <a
                  href={ONBOARDING_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Book onboarding call
                </a>
              </div>
            </AnimatedSection>
          )}

          {/* Self-Hosted Deployment (applies to all kit tiers) */}
          <AnimatedSection delay={150}>
            <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 ring-1 ring-inset ring-indigo-100">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">Self-Hosted Deployment</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Prefer full control over your infrastructure? Every kit can be self-hosted —
                    deploy on your own servers, manage your own data, and route traffic on your
                    terms. These resources make it easier to get started.
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    <li>
                      <a
                        href="https://awesome-selfhosted.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
                      >
                        Browse self-hosted software alternatives for running your kit infrastructure
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://omniroute.online/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
                      >
                        Route API traffic across multiple providers with Omniroute
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Support ─── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Need help?</h2>
            <p className="mt-2 text-gray-600">{kit.supportContact}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email support
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to home
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
