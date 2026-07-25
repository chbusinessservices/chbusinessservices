import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useToast } from "~/components/Toast";
import { sql } from "~/db";

export const Route = createFileRoute("/offers/gap-scan")({ component: GapScan });

/* ─── Server function for gap scan submissions ─── */

const submitGapScan = createServerFn().handler(
  async (payload: {
    businessName: string;
    email: string;
    website: string;
    goal: string;
  }) => {
    const { businessName, email, website, goal } = payload;

    if (!businessName || !email || !goal) {
      throw new Error("Business name, email, and goal are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const client = sql();
    await client`
      CREATE TABLE IF NOT EXISTS gap_scans (
        id SERIAL PRIMARY KEY,
        business_name TEXT NOT NULL,
        email TEXT NOT NULL,
        website TEXT,
        goal TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await client`
      INSERT INTO gap_scans (business_name, email, website, goal)
      VALUES (${businessName}, ${email}, ${website || null}, ${goal})
    `;

    return { success: true };
  },
);

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-gray-700">{text}</span>
    </li>
  );
}

function ScanForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  if (submitted) {
    return (
      <div className="card-premium p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
          <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">Scan requested!</h3>
        <p className="mt-2 text-gray-600">We'll analyze your business and send the results to your inbox within 48 hours.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      businessName: String(formData.get("businessName") ?? ""),
      email: String(formData.get("email") ?? ""),
      website: String(formData.get("website") ?? ""),
      goal: String(formData.get("goal") ?? ""),
    };

    try {
      await submitGapScan(payload);
      setSubmitted(true);
      form.reset();
      addToast("Gap scan request submitted!", "success");
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business name</label>
        <input type="text" id="businessName" name="businessName" required className="input-premium mt-1" placeholder="Your business name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required className="input-premium mt-1" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Current website</label>
        <input type="url" id="website" name="website" className="input-premium mt-1" placeholder="https://example.com" />
      </div>
      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">What's your top goal?</label>
        <textarea id="goal" name="goal" rows={2} required className="input-premium mt-1" placeholder="More leads, automate follow-up, find a niche..." />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full text-base disabled:opacity-60">
        {submitting ? <><svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</> : "Get the free scan"}
      </button>
    </form>
  );
}

function GapScan() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-1 text-sm font-semibold text-indigo-700">Free</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="gradient-text">Business Gap Scan</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">Find the highest-value opportunity, bottleneck, or niche — for free.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">What you get</h2>
                <ul className="mt-8 space-y-4">
                  <CheckItem text="Quick diagnosis of your current position" />
                  <CheckItem text="One recommended next offer" />
                  <CheckItem text="Clear next-step path" />
                  <CheckItem text="Opportunity scoring and prioritization" />
                </ul>
                <p className="mt-8 text-sm text-gray-500">No commitment. No credit card. Takes about 5 minutes.</p>
              </div>
              <div>
                <ScanForm />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
