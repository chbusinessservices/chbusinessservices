import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
});

const sections = [
  {
    title: "1. Information We Collect",
    items: [
      "Identity & Contact Data: When you fill out a form, subscribe to a report, or create an account, we may collect your name, email address, company name, and phone number.",
      "Business Details: To deliver certain Services — such as automation systems or intelligence reports — we may ask for information about your business, target market, and existing workflows.",
      "Payment Data: Payments are processed by Stripe. We do not store full credit card numbers on our servers. Stripe collects and processes payment details in accordance with its own privacy policy.",
      "Technical Data: When you visit our website, our hosting provider and analytics may automatically collect your IP address, browser type, device information, referring URL, and page interaction patterns.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "To deliver the Services you have requested — including building websites, setting up automations, and sending intelligence reports or alerts.",
      "To communicate with you about your account, respond to inquiries, and provide customer support.",
      "To send you reports, newsletters, or updates that you have subscribed to. You may opt out of marketing emails at any time using the unsubscribe link in each email.",
      "To improve our offerings — analyzing how visitors use our site helps us make it faster, clearer, and more useful.",
      "To comply with legal obligations, enforce our Terms of Service, and protect the rights, property, or safety of CH Business Services, our clients, or others.",
    ],
  },
  {
    title: "3. Data Storage & Security",
    items: [
      "Our website and application data are hosted on Neon Postgres, a serverless PostgreSQL platform with encryption at rest and in transit.",
      "Payment transactions are processed by Stripe, a PCI DSS Level 1 certified payment processor.",
      "We implement reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of electronic storage or transmission over the internet is 100% secure.",
    ],
  },
  {
    title: "4. Cookies & Tracking",
    items: [
      "Our Stripe checkout flow uses cookies necessary for payment processing and fraud prevention.",
      "We may use minimal analytics cookies to understand site traffic and improve the user experience.",
      "You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the site.",
    ],
  },
  {
    title: "5. Third-Party Services",
    items: [
      "Stripe: Payment processing. View Stripe's privacy policy at stripe.com/privacy.",
      "Neon: Database hosting. View Neon's privacy policy at neon.tech/privacy.",
      "We do not sell, rent, or trade your personal information to third parties for their own marketing purposes. We may share information with service providers solely as necessary to deliver our Services and under appropriate data processing agreements.",
    ],
  },
  {
    title: "6. Data Retention",
    items: [
      "We retain your personal information for as long as your account is active or as needed to provide you with the Services. When you close your account or terminate a Service, we will delete your data from active systems within sixty (60) days, unless retention is required by law.",
      "Anonymized or aggregated data that cannot identify you may be retained indefinitely for analytics and product improvement.",
    ],
  },
  {
    title: "7. Your Rights",
    items: [
      "Access: You may request a copy of the personal data we hold about you.",
      "Correction: You may ask us to correct any inaccurate or incomplete data.",
      "Deletion: You may request that we delete your personal data, subject to legal retention obligations.",
      "Opt-Out: You may unsubscribe from marketing communications at any time.",
      "To exercise any of these rights, please contact us via our Contact page or email us at privacy@chbusinessservices.com. We will respond within thirty (30) days.",
    ],
  },
  {
    title: "8. Children's Privacy",
    items: [
      "Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately and we will take steps to delete it.",
    ],
  },
  {
    title: "9. International Transfers",
    items: [
      "Your information may be transferred to and processed in countries other than your country of residence. We take steps to ensure that data transfers comply with applicable data protection laws, including the use of standard contractual clauses where appropriate.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    items: [
      "We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.",
    ],
  },
];

function Privacy() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Last updated: July 22, 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-indigo mx-auto max-w-none">
            <p className="lead">
              CH Business Services ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains what information we collect, how we use it, and the rights
              you have regarding your personal data when you use our website and Services.
            </p>

            {sections.map((section) => (
              <div key={section.title} className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                  {section.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="leading-relaxed text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-14 rounded-xl border border-indigo-100 bg-indigo-50/50 p-6">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                Questions or Concerns?
              </h2>
              <p className="mt-2 leading-relaxed text-gray-600">
                If you have questions about this Privacy Policy or wish to exercise your data rights,
                please contact us via our{" "}
                <a href="/contact" className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                  Contact page
                </a>
                {" "}or email us at privacy@chbusinessservices.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
