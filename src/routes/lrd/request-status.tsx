import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "~/components/lrd/CtaBand";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/request-status")({
  head: () =>
    pageHead({
      title: "Track Your Request | Life Admin Desk",
      description: "Enter your reference number to see the latest update on your service.",
      ogType: "website",
    }),
  component: RequestStatus,
});

function RequestStatus() {
  const [ref, setRef] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Track Your Request</h1>
          <p className="mt-3 text-muted-foreground">Enter your reference number to see the latest update on your service.</p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setChecked(true);
            }}
          >
            <label className="mb-1.5 block text-sm font-medium" htmlFor="lrd-ref">Reference number</label>
            <input
              id="lrd-ref"
              value={ref}
              onChange={(e) => { setRef(e.target.value); setChecked(false); }}
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Check status
            </button>
          </form>
          {checked && ref && (
            <p className="mt-4 text-sm text-muted-foreground">
              Status updates for this reference are sent to your email. If you
              can&apos;t find yours, <a href="mailto:hello@lifeadmindesk.com" className="font-medium text-primary hover:underline">contact us</a>.
            </p>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            You will receive a reference number by email once your appointment is confirmed.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
