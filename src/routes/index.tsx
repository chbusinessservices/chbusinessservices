import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { pageHead, organizationLd } from "~/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "CH Business Services — Life Admin & Business Operations, Organized",
    description:
      "Clear next steps for paperwork, everyday administration, websites, and AI-assisted workflows. CH Business Services helps individuals, families, and small businesses turn scattered tasks into organized action.",
    ogType: "website",
  }),
  component: Home,
});

/* ─── Inline SVG Icons ─── */

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h4m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
    </svg>
  );
}

/* ─── Home ─── */

function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationLd()),
        }}
      />

      {/* ═══ 1. HERO — navy, clear, human ═══ */}
      <section className="bg-dark-gradient">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Life admin and business operations,{" "}
                <span className="gradient-text-white">organized</span>.
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text-muted">
                Clear next steps for paperwork, everyday administration,
                websites, and AI-assisted workflows.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text-muted">
                CH Business Services helps individuals, families, and small
                businesses turn scattered tasks into organized action—with
                human judgment at the center.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="mt-10">
                <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                  Contact CH
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHAT DO YOU NEED HELP WITH? ═══ */}
      <section className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                What do you need help with?
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <ClipboardIcon className="h-6 w-6" />,
                title: "Life Admin Desk",
                tagline: "Make the paperwork feel manageable.",
                body: "Get help organizing documents, building checklists, tracking appointments, and preparing materials for your own review or a licensed professional.",
                footnote:
                  "Start with a clear picture of what you have, what is missing, and what happens next.",
              },
              {
                icon: <WorkflowIcon className="h-6 w-6" />,
                title: "AI Workforce",
                tagline: "Put repeatable work into a defined process.",
                body: "Explore AI-assisted support for inquiry drafts, scheduling workflows, administrative tasks, and reporting—with defined limits and human review.",
                footnote:
                  "Begin with one useful workflow, not a collection of disconnected tools.",
              },
              {
                icon: <GlobeIcon className="h-6 w-6" />,
                title: "Websites & Automation",
                tagline: "Build a clearer front door for your business.",
                body: "Bring your services, inquiries, booking, and follow-up into a more organized online experience.",
                footnote:
                  "Start with what your customers need to understand and what your business needs to manage.",
              },
            ].map((area, i) => (
              <AnimatedSection key={area.title} delay={i * 100}>
                <div className="card-premium flex h-full flex-col p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                    {area.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-brand-text">
                    {area.title}
                  </h3>
                  <p className="mt-2 font-medium text-brand-accent">{area.tagline}</p>
                  <p className="mt-3 leading-relaxed text-brand-text-secondary">
                    {area.body}
                  </p>
                  <p className="mt-4 border-t border-brand-border-light pt-4 text-sm leading-relaxed text-brand-text-secondary">
                    {area.footnote}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. LESS CONFUSION — light gray ═══ */}
      <section className="section-pad bg-brand-surface-alt">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
              Less confusion. A clearer next step.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mt-6 text-lg leading-relaxed text-brand-text-secondary">
              You do not need another pile of instructions.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-text-secondary">
              You need to know what matters, what is missing, and who needs to
              act.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <p className="mt-6 leading-relaxed text-brand-text-secondary">
              CH starts by understanding the task, defining the scope, and
              organizing the next steps. Where professional advice or a license
              is required, that work stays with an appropriately qualified
              professional.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 4. HOW IT WORKS ═══ */}
      <section id="how-it-works" className="section-pad bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
                How it works
              </h2>
            </div>
          </AnimatedSection>

          <div className="timeline-line relative mt-14">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                "Tell us what you need.",
                "Receive a defined scope and price.",
                "Complete the agreed onboarding steps.",
                "Receive the agreed deliverables and next-step summary.",
              ].map((step, i) => (
                <AnimatedSection key={step} delay={i * 120}>
                  <div className="relative z-10 text-center">
                    <div className="step-number mx-auto">{i + 1}</div>
                    <p className="mt-4 leading-relaxed text-brand-text-secondary">
                      {step}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-12 text-center">
              <Link to="/how-it-works" className="btn-secondary px-8 py-4 text-base">
                See the full client journey
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 5. CLOSING CTA — navy ═══ */}
      <section className="section-pad bg-dark-gradient">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start with the task that is taking up too much space.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-text-muted">
              Tell us what you are trying to organize. We&apos;ll review
              whether it fits CH&apos;s services.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="mt-10">
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
