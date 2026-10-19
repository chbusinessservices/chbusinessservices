import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/security")({
  head: () =>
    pageHead({
      title: "Security Policy | CH Business Services",
      description: "How the Secure Life File system protects your sensitive documents and financial data.",
      ogType: "website",
    }),
  component: Security,
});

const protections = [
  { t: "Encrypted at rest and in transit", d: "Documents uploaded to Secure Life File are encrypted during transmission (TLS) and in storage. Files are never accessible via a public URL." },
  { t: "Access follows your permissions", d: "Only you, the assigned fulfillment partner, and authorized CH operations staff can view your records. Access is enforced per record and per role." },
  { t: "Signed, time-limited links", d: "When you download a document, we generate a short-lived signed link that expires automatically. Links cannot be shared or reused after they expire." },
  { t: "No public exposure", d: "Sensitive files are never indexed by search engines. Your Social Security number, tax returns, and immigration documents never appear on a public page." },
  { t: "Isolated partner access", d: "Partners see only the bookings and documents assigned to them. They cannot browse other clients' records, even within the same partner organization." },
  { t: "Audit-ready history", d: "Every booking keeps a status timeline so you can see who changed what and when. This supports accountability and regulatory compliance." },
];

function Security() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Security Policy</h1>
      <p className="mt-3 text-muted-foreground">
        How the Secure Life File system protects your sensitive documents and financial data.
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-semibold">What is Secure Life File?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Secure Life File is the protected storage layer behind every Diverse
          Solutions booking. When you upload tax returns, immigration paperwork,
          insurance documents, or financial records, they are stored
          privately—not on a public server. Access is controlled by your
          account, the assigned partner, and CH operations staff. No one else
          can open your files.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-semibold">How we protect your data</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {protections.map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-base font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-semibold">Your role in security</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Keep your account password private and enable strong, unique credentials.</li>
          <li>• Download documents only from signed links generated inside your portal.</li>
          <li>• Report any suspicious activity or unauthorized access to us immediately.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-semibold">Limits of this policy</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          No system is perfectly secure. While we apply industry-standard
          safeguards, we cannot guarantee absolute protection. We continuously
          review our practices and will notify affected clients promptly in the
          event of a confirmed data breach. For how we handle your information
          broadly, see our{" "}
          <a href="/lrd/privacy-policy" className="font-medium text-primary hover:underline">Privacy Policy</a>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-semibold">Contact</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Security questions or incident reports:{" "}
          <a href="mailto:hello@chbusiness.services" className="font-medium text-primary hover:underline">hello@chbusiness.services</a>
        </p>
      </section>
    </div>
  );
}
