import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

const sections = [
  {
    title: "1. Services Provided",
    content:
      "CH Business Services provides AI-powered websites, business automation systems, niche intelligence reports, AI business kits, and related consulting and support services (collectively, the \"Services\"). The scope of each engagement is defined in the applicable statement of work, invoice, or order confirmation. We reserve the right to modify or discontinue any Service offering with reasonable notice to active clients.",
  },
  {
    title: "2. Payment Terms",
    content:
      "Prices for all Services are as listed on our website, in your order confirmation, or as quoted in a written proposal. Payment is due as specified in the applicable invoice — typically upfront for one-time projects and monthly in advance for retainers. All fees are in USD unless otherwise stated. Due to the digital nature of our Services, all sales are final and no refunds are provided for digital products, reports, or completed work unless explicitly stated otherwise in a written agreement. Chargebacks or payment disputes initiated without first contacting us may result in immediate suspension of Services.",
  },
  {
    title: "3. Client Responsibilities",
    content:
      "To enable timely delivery, you agree to provide accurate, complete information and any necessary access (accounts, credentials, content, brand assets) within the timeframes we specify. You are responsible for reviewing deliverables and providing feedback promptly. Delays caused by missing or late client input may affect delivery timelines and are not grounds for cancellation or refund. You represent that any materials you provide to us do not infringe the rights of any third party.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "Upon full payment, you receive an exclusive, perpetual, worldwide license to use the deliverables created specifically for you (websites, automations, reports, kits). We retain all rights, title, and interest in our underlying methodologies, frameworks, templates, tools, code libraries, and know-how used to create deliverables — including the right to reuse such pre-existing assets in work for other clients. You may not resell, sublicense, or redistribute our proprietary frameworks or tools independently of the deliverables.",
  },
  {
    title: "5. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, CH Business Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, lost revenue, lost data, or business interruption, arising out of or related to the Services, whether based on contract, tort, negligence, strict liability, or otherwise — even if advised of the possibility of such damages. Our total aggregate liability for any claim arising from the Services is limited to the fees actually paid by you to CH Business Services during the twelve (12) months preceding the event giving rise to the claim. The Services are provided \"as is\" without warranty of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or that they will achieve any specific business outcome.",
  },
  {
    title: "6. Third-Party Services",
    content:
      "Our Services may integrate with or rely on third-party platforms, APIs, and services (e.g., Stripe, Neon, OpenAI). We are not responsible for the availability, accuracy, or security of these third-party services. Your use of any third-party service is subject to that provider's own terms and policies.",
  },
  {
    title: "7. Termination",
    content:
      "Either party may terminate a recurring Service with thirty (30) days written notice. Upon termination, you retain your deliverables and any data exported before the termination date. We will delete your data from our active systems within sixty (60) days unless retention is required by law. Provisions that by their nature should survive termination — including intellectual property, limitation of liability, and governing law — shall survive.",
  },
  {
    title: "8. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any dispute arising from these Terms or the Services shall be resolved exclusively in the state or federal courts located in Delaware. If any provision is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
  },
  {
    title: "9. Changes to These Terms",
    content:
      "We may update these Terms from time to time. Material changes will be communicated to active clients via email or through a notice on our website. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms. The date of the last update is shown at the top of this page.",
  },
];

function Terms() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Terms of Service
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
              These Terms of Service ("Terms") govern your use of the website, products, and services
              offered by CH Business Services ("we," "our," or "us"). By accessing our website or
              engaging our Services, you agree to be bound by these Terms. If you do not agree, please
              do not use our Services.
            </p>

            {sections.map((section) => (
              <div key={section.title} className="mt-10 first:mt-0">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-gray-600">{section.content}</p>
              </div>
            ))}

            <div className="mt-14 rounded-xl border border-indigo-100 bg-indigo-50/50 p-6">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                Questions?
              </h2>
              <p className="mt-2 leading-relaxed text-gray-600">
                If you have questions about these Terms, please contact us via our{" "}
                <a href="/contact" className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                  Contact page
                </a>{" "}
                or email us at legal@chbusinessservices.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
