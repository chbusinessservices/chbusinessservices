import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useToast } from "~/components/Toast";
import { sql } from "~/db";
import { useState } from "react";

export const Route = createFileRoute("/alerts")({
  component: Alerts,
});

/* ─── Server function for alert subscriptions ─── */

const subscribeAlerts = createServerFn().handler(
  async (payload: { name: string; email: string }) => {
    const { name, email } = payload;

    if (!name || !email) {
      throw new Error("Name and email are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const client = sql();
    await client`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    try {
      await client`
        INSERT INTO subscribers (name, email)
        VALUES (${name}, ${email})
      `;
      return { success: true };
    } catch (err: unknown) {
      // Postgres UNIQUE violation (email already exists)
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        (err as { code: string }).code === "23505"
      ) {
        return { success: true, message: "already_subscribed" };
      }
      throw err;
    }
  },
);

function Alerts() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const { addToast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
    };

    try {
      const result = await subscribeAlerts(payload);
      if (result.message === "already_subscribed") {
        setAlreadySubscribed(true);
        setSubmitted(true);
        addToast("You're already on the list!", "info");
      } else {
        setAlreadySubscribed(false);
        setSubmitted(true);
        form.reset();
        addToast("You're signed up! Check your inbox.", "success");
      }
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Weekly <span className="gradient-text">Opportunity Alerts</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              New niche gaps, pain-point spikes, and emerging market signals delivered to your inbox.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {submitted ? (
              alreadySubscribed ? (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">You're already on the list!</h2>
                  <p className="mt-2 text-gray-600">You'll keep receiving alerts. No need to sign up again.</p>
                </div>
              ) : (
                <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">You're signed up!</h2>
                  <p className="mt-2 text-gray-600">We'll send your first alert soon. Keep an eye on your inbox.</p>
                </div>
              )
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input id="name" name="name" type="text" required className="input-premium mt-1" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" name="email" type="email" required className="input-premium mt-1" placeholder="you@example.com" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full text-base disabled:opacity-60">
                  {submitting ? (
                    <><svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Subscribing...</>
                  ) : "Subscribe to alerts"}
                </button>
              </form>
            )}
            <p className="mt-6 text-center text-sm text-gray-500">Free with any vault membership.</p>
            <div className="mt-8 text-center">
              <Link to="/vault" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Learn about vault membership &rarr;</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
