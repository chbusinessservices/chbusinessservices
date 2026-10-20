import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/contact")({
  head: () =>
    pageHead({
      title: "Contact Us | Life Admin Desk",
      description: "Send an inquiry, find our office, or reach the team directly.",
      ogType: "website",
    }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:hello@lifeadmindesk.com?subject=${encodeURIComponent(subject || "Website inquiry")}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-3 text-muted-foreground">Send an inquiry, find our office, or reach the team directly.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <form className="space-y-4" onSubmit={submit}>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="lrd-name">Your name</label>
                <input id="lrd-name" required value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="lrd-email">Your email</label>
                <input id="lrd-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="lrd-subject">Subject</label>
                <input id="lrd-subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="lrd-message">How can we help?</label>
                <textarea id="lrd-message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>
              <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 sm:w-auto">
                Send message
              </button>
              {sent && (
                <p className="text-sm text-muted-foreground">
                  Thank you. Your message is ready in your email app — just hit
                  send and we will reply within one business day.
                </p>
              )}
            </form>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold">Reach us directly</h2>
            <div className="mt-3 flex flex-col gap-1.5 text-sm">
              <a href="mailto:hello@lifeadmindesk.com" className="font-medium text-primary hover:underline">hello@lifeadmindesk.com</a>
              <a href="tel:+12015550100" className="font-medium text-primary hover:underline">(201) 555-0100</a>
              <a href="sms:+12015550101" className="font-medium text-primary hover:underline">(201) 555-0101</a>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-heading text-base font-semibold">Jersey City Office</h3>
                <p className="mt-1 text-sm text-muted-foreground">Newark Avenue, Jersey City, NJ 07302</p>
                <p className="mt-2 text-xs text-muted-foreground">Mon–Fri 9am–6pm · Sat by appointment</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-heading text-base font-semibold">Union City Satellite</h3>
                <p className="mt-1 text-sm text-muted-foreground">Bergenline Avenue, Union City, NJ 07087</p>
                <p className="mt-2 text-xs text-muted-foreground">Tue &amp; Thu 10am–4pm · By appointment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
