import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useToast } from "~/components/Toast";
import { AnimatedSection } from "~/components/AnimatedSection";
import { sql } from "~/db";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

/* ─── Server function for contact submissions ─── */

const submitContact = createServerFn().handler(
  async (payload: {
    businessName: string;
    email: string;
    website: string;
    whatsBroken: string;
    desiredOutcome: string;
    budget: string;
    timeline: string;
  }) => {
    const { businessName, email, website, whatsBroken, desiredOutcome, budget, timeline } = payload;

    if (!businessName || !email) {
      throw new Error("Business name and email are required.");
    }

    if (!whatsBroken && !desiredOutcome) {
      throw new Error("Please describe what's broken or what outcome you want.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const client = sql();
    await client`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        business_name TEXT NOT NULL,
        email TEXT NOT NULL,
        website TEXT,
        whats_broken TEXT,
        desired_outcome TEXT,
        budget TEXT,
        timeline TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await client`
      INSERT INTO contacts (business_name, email, website, whats_broken, desired_outcome, budget, timeline)
      VALUES (${businessName}, ${email}, ${website || null}, ${whatsBroken || null}, ${desiredOutcome || null}, ${budget || null}, ${timeline || null})
    `;

    return { success: true };
  },
);

/* ─── Form component ─── */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      businessName: String(formData.get("businessName") ?? ""),
      email: String(formData.get("email") ?? ""),
      website: String(formData.get("website") ?? ""),
      whatsBroken: String(formData.get("broken") ?? ""),
      desiredOutcome: String(formData.get("outcome") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
    };

    try {
      await submitContact(payload);
      setSubmitted(true);
      form.reset();
      addToast("Your message has been sent! We'll get back to you within 48 hours.", "success");
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">
          Thanks — we'll review and get back to you within 48 hours.
        </h3>
        <p className="mt-2 text-gray-600">
          We'll reach out to the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business name */}
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
          Business name
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          required
          className="input-premium mt-1"
          placeholder="Your business name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input-premium mt-1"
          placeholder="you@example.com"
        />
      </div>

      {/* Current website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Current website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          className="input-premium mt-1"
          placeholder="https://example.com"
        />
      </div>

      {/* What's broken */}
      <div>
        <label htmlFor="broken" className="block text-sm font-medium text-gray-700">
          What's broken
        </label>
        <textarea
          id="broken"
          name="broken"
          rows={3}
          className="input-premium mt-1"
          placeholder="What isn't working in your business right now?"
        />
      </div>

      {/* What outcome matters most */}
      <div>
        <label htmlFor="outcome" className="block text-sm font-medium text-gray-700">
          What outcome matters most
        </label>
        <textarea
          id="outcome"
          name="outcome"
          rows={3}
          className="input-premium mt-1"
          placeholder="If this goes well, what does success look like?"
        />
      </div>

      {/* Budget range */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          className="input-premium mt-1"
        >
          <option value="">Select a range</option>
          <option value="under-1k">Under $1K</option>
          <option value="1k-5k">$1K–$5K</option>
          <option value="5k-15k">$5K–$15K</option>
          <option value="15k-plus">$15K+</option>
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          className="input-premium mt-1"
        >
          <option value="">Select timeline</option>
          <option value="immediate">Immediate</option>
          <option value="this-month">This month</option>
          <option value="this-quarter">This quarter</option>
          <option value="exploring">Exploring</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full px-6 py-3.5 text-base disabled:opacity-60"
      >
        {submitting ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

/* ─── Page ─── */

function Contact() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 sm:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Start with the{" "}
              <span className="gradient-text">highest-leverage</span> problem.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Tell us what's broken and what you want — we'll map the quickest
              path to revenue.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card-premium p-8 sm:p-10">
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
