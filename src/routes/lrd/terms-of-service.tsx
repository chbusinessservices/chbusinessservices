import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/terms-of-service")({
  head: () =>
    pageHead({
      title: "Terms of Service | CH Business Services",
      description: "The legal terms governing use of the CH Business Services client and partner portals.",
      ogType: "website",
    }),
  component: Terms,
});

const sections: { h: string; p: string[] }[] = [
  { h: "1. Acceptance of terms", p: ["By accessing or using the Diverse Solutions client portal, the partner portal, the CH operations dashboard, or any CH Business Services website, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services."] },
  { h: "2. Your account", p: ["You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You must be at least 18 years old to create an account.", "You agree to provide accurate information when registering and to keep your contact and identity details current."] },
  { h: "3. Client portal use", p: ["Clients may book services, upload documents, track status, and request cancellations through the client portal. You agree to provide truthful information and to upload only documents relevant to the service requested.", "Payment is collected by CH Business Services. A secure payment link is issued after confirmation. Services begin only after payment or quote approval, as applicable."] },
  { h: "4. Partner portal use", p: ["Partners are granted access to view and fulfill only the bookings and documents assigned to them. Partners may not access, copy, or share records belonging to other clients or partners.", "Partners agree to maintain confidentiality of all client information, deliver services within agreed timelines, and update booking statuses promptly through the operations tools provided.", "Partner accounts may be suspended or revoked for misuse, breach of confidentiality, or failure to meet service standards."] },
  { h: "5. Acceptable use", p: ["You agree not to misuse the portals, attempt unauthorized access, reverse engineer, introduce malicious code, or use the services for any unlawful purpose.", "Automated scraping, bulk data extraction, or resale of portal data without written permission is prohibited."] },
  { h: "6. Services and disclaimers", p: ["Diverse Solutions facilitates access to administrative support services. Some services—such as tax preparation, immigration assistance, and legal document review—may be performed by licensed professionals or third-party partners. CH Business Services is not a law firm and does not provide legal advice.", "AI Revenue Desk tools are provided to assist with lead response, follow-up, and scheduling. Automation outputs are drafts and suggestions; you remain responsible for reviewing communications before they reach your customers."] },
  { h: "7. Fees and refunds", p: ["Service fees are displayed at booking or provided in a quote. Cancellation and refund eligibility depends on the service and stage of fulfillment—see the cancellation terms shown at booking or contact us for details.", "Recurring subscription fees for AI Revenue Desk and growth plans are billed in advance and may be cancelled with notice as described in your service agreement."] },
  { h: "8. Limitation of liability", p: ["To the maximum extent permitted by law, CH Business Services is not liable for indirect, incidental, or consequential damages arising from your use of the portals or services. Our total liability for any claim is limited to the amount you paid for the specific service giving rise to the claim."] },
  { h: "9. Termination", p: ["We may suspend or terminate access for violations of these Terms. You may close your account at any time by contacting us, subject to any active service commitments and legal retention obligations."] },
  { h: "10. Changes to these terms", p: ["We may update these Terms from time to time. Material changes will be posted on this page with an updated effective date. Continued use after changes constitutes acceptance."] },
];

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
      <p className="mt-3 text-muted-foreground">
        The legal terms governing use of the CH Business Services client and partner portals.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Effective: October 16, 2026</p>
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
        <h2 className="font-heading text-xl font-semibold">Contact</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Questions about these Terms?{" "}
          <a href="mailto:hello@chbusiness.services" className="font-medium text-primary hover:underline">hello@chbusiness.services</a>
          {" · "}
          <a href="tel:+12015550199" className="font-medium text-primary hover:underline">(201) 555-0199</a>
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          See also our{" "}
          <a href="/lrd/privacy-policy" className="font-medium text-primary hover:underline">Privacy Policy</a>
          {" and "}
          <a href="/lrd/security" className="font-medium text-primary hover:underline">Security Policy</a>.
        </p>
      </section>
    </div>
  );
}
