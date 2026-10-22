import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead({
      title: "How It Works — CH Business Services",
      description:
        "The CH client journey: tell us what you need, confirm the scope, complete onboarding, and review the work—with clear boundaries around professional advice and AI-assisted work.",
      path: "/how-it-works",
    }),
  component: HowItWorks,
});

const steps = [
  {
    title: "Tell us what you need",
    body: "Share a general description of the task. Please do not send sensitive records through an initial inquiry.",
  },
  {
    title: "Confirm the scope",
    body: "Before work begins, we define the deliverables, exclusions, price, and responsibilities.",
  },
  {
    title: "Complete onboarding",
    body: "We agree on the information needed and the appropriate way to provide it. Do not send documents until you have received instructions.",
  },
  {
    title: "Review the work",
    body: "You receive the agreed materials and an explanation of any remaining actions.",
  },
];

function HowItWorks() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-dark-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              How It Works
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-muted">
              A clear client journey, so you always know what happens next.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 100}>
                <div className="card-premium flex gap-5 p-7">
                  <div className="step-number flex-shrink-0">{i + 1}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-brand-text">
                      {step.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-brand-text-secondary">
                      {step.body}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Boundaries ─── */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card-premium p-8">
              <h2 className="text-xl font-semibold text-brand-text">
                When professional advice is needed
              </h2>
              <p className="mt-3 leading-relaxed text-brand-text-secondary">
                CH provides administrative and operational support. Legal,
                tax, insurance, medical, and other licensed professional
                decisions remain with appropriately qualified professionals.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="card-premium mt-6 p-8">
              <h2 className="text-xl font-semibold text-brand-text">
                AI-assisted work
              </h2>
              <p className="mt-3 leading-relaxed text-brand-text-secondary">
                Any use of AI should follow the agreed service scope.
                Sensitive or consequential work requires human review.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad bg-dark-gradient">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to get started?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="mt-8">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Contact CH
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
