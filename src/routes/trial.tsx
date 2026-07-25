import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AnimatedSection } from "~/components/AnimatedSection";
import { saveTrialSignup } from "~/lib/db-trial";

export const Route = createFileRoute("/trial")({
  component: Trial,
  head: () => ({
    meta: [
      { title: "Start Your Free Trial — CH Business Services" },
      { name: "description", content: "Try our conversion sites, automation systems, intelligence reports, or marketplace — free, no credit card required." },
    ],
  }),
});

const WHAT_OPTIONS = [
  { value: "", label: "Select what you'd like to try" },
  { value: "conversion-site", label: "Conversion Site" },
  { value: "automation", label: "Automation" },
  { value: "intelligence", label: "Intelligence" },
  { value: "marketplace", label: "Marketplace" },
];

interface TrialForm {
  fullName: string;
  email: string;
  company: string;
  wantToTry: string;
}

function Trial() {
  const navigate = useNavigate();
  const [form, setForm] = useState<TrialForm>({
    fullName: "",
    email: "",
    company: "",
    wantToTry: "",
  });
  const [errors, setErrors] = useState<Partial<TrialForm>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(): boolean {
    const e: Partial<TrialForm> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.wantToTry) e.wantToTry = "Please select what you'd like to try";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Store to localStorage as backup
    const trialData = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      wantToTry: form.wantToTry,
      startedAt: new Date().toISOString(),
    };
    localStorage.setItem("ch_trial_user", JSON.stringify(trialData));

    // Save to database (primary store)
    try {
      await saveTrialSignup({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        wantToTry: form.wantToTry,
      });
    } catch (err) {
      // Database save failed — localStorage still has the backup
      console.error("Failed to save trial signup to database:", err);
    }

    setLoading(false);
    setSuccess(true);
    // Redirect after brief success state
    setTimeout(() => {
      navigate({ to: "/demo", search: { trial: "true" } });
    }, 800);
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-gray-900">
            You're all set!
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Welcome, {form.fullName}. Redirecting to your demo...
          </p>
          <div className="mt-6">
            <div className="mx-auto h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full animate-pulse rounded-full bg-brand-gold" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-brand-cream">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 sm:py-24">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              No credit card required
            </span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
              Start your{" "}
              <span className="gradient-text">free trial</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-gray">
              Experience the full power of our Conversion Sites, Automation Systems, Intelligence Reports, or Marketplace — risk-free.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card-premium overflow-hidden">
              <div className="border-b border-brand-border-light bg-brand-cream-dark px-6 py-4">
                <h2 className="font-serif text-lg font-semibold text-brand-navy">Create your account</h2>
                <p className="mt-0.5 text-sm text-brand-gray">Fill in the details below to get started.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-brand-navy">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Jane Smith"
                    className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm text-brand-navy placeholder:text-brand-gray-light transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/30 ${
                      errors.fullName ? "border-red-300 bg-red-50" : "border-brand-border bg-white"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-navy">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm text-brand-navy placeholder:text-brand-gray-light transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/30 ${
                      errors.email ? "border-red-300 bg-red-50" : "border-brand-border bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-brand-navy">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Inc."
                    className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm text-brand-navy placeholder:text-brand-gray-light transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/30 ${
                      errors.company ? "border-red-300 bg-red-50" : "border-brand-border bg-white"
                    }`}
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                  )}
                </div>

                {/* What to try */}
                <div>
                  <label htmlFor="wantToTry" className="block text-sm font-medium text-brand-navy">
                    What do you want to try?
                  </label>
                  <select
                    id="wantToTry"
                    value={form.wantToTry}
                    onChange={(e) => setForm({ ...form, wantToTry: e.target.value })}
                    className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm text-brand-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/30 ${
                      errors.wantToTry ? "border-red-300 bg-red-50" : "border-brand-border bg-white"
                    }`}
                  >
                    {WHAT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.wantToTry && (
                    <p className="mt-1 text-xs text-red-500">{errors.wantToTry}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating your trial...
                    </span>
                  ) : (
                    "Start Free Trial — No Credit Card"
                  )}
                </button>

                <p className="text-center text-xs text-brand-gray-light">
                  By starting a trial, you agree to our{" "}
                  <Link to="/terms" className="text-brand-gold hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-brand-gold hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Trust badges ─── */}
      <section className="bg-brand-cream py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "No Credit Card",
                desc: "Start immediately — no payment info needed.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
              },
              {
                title: "Cancel Anytime",
                desc: "No contracts. No cancellation fees. Ever.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Full Access",
                desc: "Try every feature — not a limited demo.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-brand-gray">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
