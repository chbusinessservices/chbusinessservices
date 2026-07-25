import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";
import { getTrialSignups, type TrialSignup } from "~/lib/db-trial";

/* ─── Icons ─── */

const trialsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

/* ─── Helpers ─── */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function wantToTryLabel(value: string): string {
  const map: Record<string, string> = {
    "conversion-site": "Conversion Site",
    automation: "Automation",
    intelligence: "Intelligence",
    marketplace: "Marketplace",
  };
  return map[value] ?? value;
}

/* ─── Component ─── */

export const Route = createFileRoute("/admin/trials")({
  component: AdminTrials,
});

function AdminTrials() {
  const [signups, setSignups] = useState<TrialSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTrialSignups()
      .then((data) => {
        setSignups(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load trial signups");
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Trial Signups
          </h1>
          <p className="mt-1 text-gray-600">
            Users who have signed up for a free trial.
          </p>
        </div>
      </AnimatedSection>

      {/* Count */}
      <AnimatedSection delay={100}>
        <div className="mt-6 flex items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
            {loading ? "..." : signups.length} trial signup{signups.length !== 1 ? "s" : ""}
          </span>
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection delay={200}>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="h-8 w-8 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : error ? (
            <div className="px-6 py-16 text-center">
              <EmptyState
                icon={trialsIcon}
                title="Could not load trials"
                description={error}
                className="border-none px-0 py-0"
              />
            </div>
          ) : signups.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <EmptyState
                icon={trialsIcon}
                title="No trial signups yet"
                description="Trial signups will appear here once users start signing up."
                className="border-none px-0 py-0"
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    {["Full Name", "Email", "Company", "Want To Try", "Signed Up At"].map((col) => (
                      <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {signups.map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{row.full_name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.email}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.company}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{wantToTryLabel(row.want_to_try)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(row.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
