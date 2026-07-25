import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DashboardLayout } from "~/components/DashboardLayout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { EmptyState } from "~/components/EmptyState";
import { useToast } from "~/components/Toast";
import { sql } from "~/db";

/* ─── Server function for ticket submission ─── */

const submitTicket = createServerFn().handler(
  async (payload: {
    subject: string;
    category: string;
    message: string;
    priority: string;
  }) => {
    const { subject, category, message, priority } = payload;

    if (!subject || !category || !message) {
      throw new Error("Subject, category, and message are required.");
    }

    const validCategories = ["Technical Issue", "Billing Question", "General"];
    const validPriorities = ["Normal", "Urgent"];
    if (!validCategories.includes(category)) {
      throw new Error("Invalid category.");
    }
    if (!validPriorities.includes(priority)) {
      throw new Error("Invalid priority.");
    }

    const client = sql();
    await client`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id SERIAL PRIMARY KEY,
        subject TEXT NOT NULL,
        category TEXT NOT NULL,
        message TEXT NOT NULL,
        priority TEXT NOT NULL DEFAULT 'Normal',
        status TEXT NOT NULL DEFAULT 'open',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await client`
      INSERT INTO support_tickets (subject, category, message, priority, status)
      VALUES (${subject}, ${category}, ${message}, ${priority}, 'open')
    `;

    return { success: true };
  },
);

export const Route = createFileRoute("/portal/support")({
  component: PortalSupport,
});

/* ─── Placeholder ticket history ─── */

const placeholderTickets = [
  {
    id: "TKT-001",
    subject: "Follow-up emails not sending to Gmail contacts",
    category: "Technical Issue",
    priority: "Normal",
    status: "In Progress" as const,
    created: "July 18, 2026",
  },
  {
    id: "TKT-002",
    subject: "Question about invoice #INV-2026-0042",
    category: "Billing Question",
    priority: "Normal",
    status: "Resolved" as const,
    created: "July 10, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

/* ─── Page ─── */

function PortalSupport() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      subject: String(formData.get("subject") ?? ""),
      category: String(formData.get("category") ?? "Technical Issue"),
      message: String(formData.get("message") ?? ""),
      priority: String(formData.get("priority") ?? "Normal"),
    };

    try {
      await submitTicket(payload);
      setSubmitted(true);
      form.reset();
      addToast("Support ticket submitted! We'll respond within 1 business day.", "success");
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
    <DashboardLayout currentPath="/portal/support">
      <div className="page-enter px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Support
          </h1>
          <p className="mt-2 text-brand-gray">
            Submit a ticket and we'll respond within 1 business day.
          </p>
        </AnimatedSection>

        {/* Submit ticket form */}
        <AnimatedSection delay={80}>
          <div className="mt-8 card-premium p-6 sm:p-8">
            <h2 className="font-serif text-lg font-semibold text-brand-navy">Submit a Ticket</h2>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-7 w-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-brand-navy">Ticket submitted!</h3>
                <p className="mt-1 text-sm text-brand-gray">We'll get back to you within 1 business day.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-medium text-brand-gold-dark hover:text-brand-gold transition-colors"
                >
                  Submit another ticket →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-navy">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="input-premium mt-1"
                    placeholder="Brief description of your issue"
                  />
                </div>

                {/* Category + Priority row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-brand-navy">
                      Category
                    </label>
                    <select id="category" name="category" required className="input-premium mt-1">
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-brand-navy">
                      Priority
                    </label>
                    <select id="priority" name="priority" required className="input-premium mt-1">
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="input-premium mt-1"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                {/* Submit — gold button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full px-6 py-3 text-base disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Ticket"
                  )}
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>

        {/* Ticket History */}
        <AnimatedSection delay={160}>
          <div className="mt-10">
            <h2 className="font-serif text-lg font-semibold text-brand-navy">Ticket History</h2>
            {placeholderTickets.length > 0 ? (
              <div className="mt-4 space-y-3">
                {placeholderTickets.map((ticket) => (
                  <div key={ticket.id} className="card-premium flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-brand-gray-light">{ticket.id}</span>
                        <h3 className="text-sm font-medium text-brand-navy truncate">{ticket.subject}</h3>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-brand-gray-light">
                        <span>{ticket.category}</span>
                        <span>·</span>
                        <span>{ticket.priority}</span>
                        <span>·</span>
                        <span>{ticket.created}</span>
                      </div>
                    </div>
                    <span
                      className={`ml-3 inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        statusStyles[ticket.status]
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                }
                title="No support tickets"
                description="You haven't submitted any support tickets yet."
              />
            )}
          </div>
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
