import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About CH — CH Business Services",
      description:
        "CH Business Services is a founder-led administrative and business operations practice built to move people and small businesses from scattered information to clear, practical next steps.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-dark-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <AnimatedSection>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Organization is the service. People are the priority.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Founder statement ─── */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-lg font-medium text-brand-accent">
              I&apos;m [Your Name], founder of CH Business Services.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mt-6 text-lg leading-relaxed text-brand-text-secondary">
              I&apos;m building CH to help people and small businesses move
              from scattered information to clear, practical next steps.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-text-secondary">
              The approach is straightforward: listen carefully, define the
              work, organize what matters, and use technology where it
              genuinely helps.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-text-secondary">
              CH is designed around administrative support, business
              operations, websites, and responsible AI-assisted workflows—not
              replacing licensed professionals or promising outcomes outside
              our control.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mt-4">
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
