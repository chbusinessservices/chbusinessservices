import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/privacy-policy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | CH Business Services",
      description: "How CH Business Services collects, uses, and protects your personal information.",
      ogType: "website",
    }),
  component: Privacy,
});

const sections: { h: string; p: string[] }[] = [
  {
    h: "1. Information we collect",
    p: [
      "When you create an account, book a service, or submit an inquiry, we collect the information you provide directly: your name, email address, phone number, mailing address, and any details you share about the service you need.",
      "For Diverse Solutions bookings, this may include identity documents, tax filings, immigration paperwork, and financial records you upload through the Secure Life File system described in our Security Policy.",
      "For AI Revenue Desk and CH Business Services engagements, we may collect business details such as your company name, website, CRM data, lead information, and customer communication records you connect for automation purposes.",
    ],
  },
  {
    h: "2. How we use your information",
    p: [
      "To deliver the services you request, process payments, schedule appointments, and communicate updates about your booking.",
      "To route your inquiry to the appropriate licensed professional, fulfillment partner, or internal operations team.",
      "To send transactional confirmations, status updates, reminders, and follow-up messages related to your service.",
      "To improve our services, analyze trends, and comply with legal and regulatory obligations.",
    ],
  },
  {
    h: "3. How we share your information",
    p: [
      "We share your information only with the fulfillment partners, licensed professionals, and service providers necessary to complete your request. Partners are bound by confidentiality obligations and access only the records assigned to them.",
      "We do not sell your personal information. We never share sensitive documents or financial data for advertising purposes.",
      "We may disclose information when required by law, court order, or to protect the rights, safety, or property of our clients and the public.",
    ],
  },
  {
    h: "4. Data retention",
    p: [
      "We retain your records for as long as your account is active and for the period required by applicable law, professional licensing standards, and tax regulations. Sensitive documents stored in Secure Life File are kept only as long as needed to deliver the service and satisfy retention requirements.",
      "You may request deletion of your account data at any time, subject to legal retention obligations.",
    ],
  },
  {
    h: "5. Your rights",
    p: [
      "You have the right to access, correct, or delete your personal information, and to request a copy of the data we hold about you. To exercise these rights, contact us using the details below.",
      "If you are a California resident, you may exercise rights under the California Consumer Privacy Act (CCPA), including the right to opt out of the sale of personal information. We do not sell personal information.",
    ],
  },
  {
    h: "6. Children's privacy",
    p: ["Our services are not directed to children under 16, and we do not knowingly collect personal information from children."],
  },
  {
    h: "7. Changes to this policy",
    p: ["We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date."],
  },
];

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">
        How CH Business Services collects, uses, and protects your personal information.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Effective: October 16, 2026</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        CH Business Services (“we”, “us”, “our”) operates the Diverse Solutions
        client portal, the partner and operations portals, and the AI Revenue
        Desk. This Privacy Policy explains what we collect, why, and how we keep
        it secure. Sensitive documents are handled through our Secure Life File
        system—see our{" "}
        <a href="/lrd/security" className="font-medium text-primary hover:underline">Security Policy</a>{" "}
        for technical details.
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-heading text-xl font-semibold">{s.h}</h2>
            {s.p.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </section>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="font-heading text-xl font-semibold">Contact us</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Questions about your privacy or this policy? Reach our team:{" "}
          <a href="mailto:hello@chbusiness.services" className="font-medium text-primary hover:underline">hello@chbusiness.services</a>
          {" · "}
          <a href="tel:+12015550199" className="font-medium text-primary hover:underline">(201) 555-0199</a>
        </p>
      </section>
    </div>
  );
}
