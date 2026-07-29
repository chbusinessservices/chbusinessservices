import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { withSuccessUrl } from "~/lib/fulfillment";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — Premium Websites & Automation | CH Business Services" },
      { name: "description", content: "Conversion-focused websites, automation systems, intelligence reports, and AI business kits. Turn visitors into customers with CH Business Services." },
      { property: "og:title", content: "Services — Premium Websites & Automation | CH Business Services" },
      { property: "og:description", content: "Conversion-focused websites, automation systems, intelligence reports, and AI business kits. Turn visitors into customers with CH Business Services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chbusinessservices.pro/services" },
      { property: "og:site_name", content: "CH Business Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services — Premium Websites & Automation | CH Business Services" },
      { name: "twitter:description", content: "Conversion-focused websites, automation systems, intelligence reports, and AI business kits. Turn visitors into customers with CH Business Services." },
    ],
    links: [
      { rel: "canonical", href: "https://chbusinessservices.pro/services" },
    ],
  }),
});

interface ServiceCard { title: string; description: string; icon: React.ReactNode; cta?: string; ctaTo?: string; }

/* ─── Preserved Stripe links for service CTAs ─── */
const STRIPE = {
  customBrief: "https://buy.stripe.com/8x2bJ101r99m2d48Fm9Zm0d",
  growthOS: "https://buy.stripe.com/eVq8wP6pPbhubNEf3K9Zm0b",
};

function GlobeIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>);
}
function SearchIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>);
}
function CogIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41.514z" /></svg>);
}
function ChartIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>);
}
function StarIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>);
}
function PencilIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);
}
function RobotIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V8m6 4v2m0-2a2 2 0 100-4m0 4a2 2 0 110-4m6 4a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V8M3 20h18M3 20v-2m18 2v-2" /></svg>);
}

const serviceCards: ServiceCard[] = [
  { title: "Websites that convert", description: "Smart, fast, SEO-ready sites built to turn traffic into leads and sales.", icon: <GlobeIcon className="h-6 w-6" /> },
  { title: "SEO that attracts intent", description: "Keyword research, content strategy, and technical SEO to capture demand.", icon: <SearchIcon className="h-6 w-6" /> },
  { title: "Automation that follows up", description: "Lead qualification, email sequences, booking, and reminders.", icon: <CogIcon className="h-6 w-6" /> },
  { title: "CRM setup that organizes leads", description: "Pipeline management, deal tracking, and client portals.", icon: <ChartIcon className="h-6 w-6" /> },
  { title: "Reputation systems that build trust", description: "Review generation, monitoring, and response workflows.", icon: <StarIcon className="h-6 w-6" /> },
  { title: "Content systems that keep you visible", description: "Blog, social, and email content that runs on autopilot.", icon: <PencilIcon className="h-6 w-6" /> },
  { title: "AI Workforce Solutions", description: "Deploy pre-trained AI agents for customer support, bookkeeping, marketing, and more — at a fraction of traditional costs. Powered by JobOS.", icon: <RobotIcon className="h-6 w-6" />, cta: "Hire AI Workers →", ctaTo: "/jobos" },
];

function ServiceCardItem({ title, description, icon, cta, ctaTo }: ServiceCard) {
  return (
    <div className="card-premium group relative overflow-hidden p-8">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cream-dark text-brand-navy">
        {icon}
      </div>
      <h3 className="mt-5 font-serif text-lg font-semibold text-brand-navy">{title}</h3>
      <p className="mt-3 leading-relaxed text-brand-gray">{description}</p>
      {cta && ctaTo && (
        <Link
          to={ctaTo}
          className="mt-4 inline-flex items-center text-sm font-semibold text-brand-accent transition-colors hover:text-brand-accent-dark"
        >
          {cta}
        </Link>
      )}
    </div>
  );
}

function Services() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 hero-dots opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
              Systems that make your business{" "}
              <span className="gradient-text">harder to ignore</span> and easier to run.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-gray">
              From websites to automation, CRM to content — every system we build is designed to turn traffic into revenue.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-pad bg-brand-warm-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 80}>
                <ServiceCardItem {...card} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
              Ready to build the system your business needs?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-3 max-w-xl text-brand-gray">Purchase directly or schedule a call to discuss your requirements.</p>
          </AnimatedSection>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedSection delay={200}>
              <a href={withSuccessUrl(STRIPE.customBrief, "custom-brief")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center px-8 py-4 text-base">
                Buy Custom Brief — $500
              </a>
            </AnimatedSection>
            <AnimatedSection delay={280}>
              <a href={withSuccessUrl(STRIPE.growthOS, "growth-os-retainer")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center px-8 py-4 text-base">
                Subscribe Growth OS — $997/mo
              </a>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={360}>
            <Link to="/pricing" className="mt-6 inline-flex items-center text-sm font-medium text-brand-gold hover:text-brand-gold-dark">View all pricing plans →</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
