import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { pageHead } from "~/lib/seo";

const CONTACT_EMAIL = "hello@chbusiness.services";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact CH — CH Business Services",
      description:
        "Tell CH Business Services what you need organized. Send a general, non-sensitive inquiry by email and we'll review whether it fits CH's services.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-dark-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Tell us what you need organized.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-muted">
              We&apos;ll review whether it fits CH&apos;s services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Inquiry instructions ─── */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card-premium p-8 text-center sm:p-10">
              <p className="text-brand-text-secondary">For general inquiries, contact:</p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=CH%20Business%20Services%20inquiry`}
                className="mt-4 inline-block break-all text-2xl font-semibold text-brand-accent transition-colors hover:text-brand-accent-dark sm:text-3xl"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brand-text-secondary">
                Please include your name, the service you are interested in,
                and a brief, non-sensitive description of the task.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="mt-8 rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6">
              <p className="leading-relaxed text-brand-text-secondary">
                <span className="font-semibold text-brand-text">
                  Do not email
                </span>{" "}
                identification documents, account numbers, medical records,
                immigration records, passwords, or other sensitive
                information.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="mt-8 text-center text-sm text-brand-text-muted">
              Sending an inquiry does not create a service agreement.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
