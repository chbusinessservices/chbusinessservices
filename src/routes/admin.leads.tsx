import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";
import { sql } from "~/db";
import { useEffect, useState } from "react";

/* ─── Icons ─── */

const leadsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

/* ─── Types ─── */

interface GapScan {
  id: number;
  business_name: string;
  email: string;
  website: string | null;
  goal: string | null;
  status: string;
  created_at: string;
}

interface Contact {
  id: number;
  business_name: string;
  email: string;
  website: string | null;
  whats_broken: string | null;
  desired_outcome: string | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  created_at: string;
}

interface Subscriber {
  id: number;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

interface LeadsData {
  gap_scans: GapScan[];
  contacts: Contact[];
  subscribers: Subscriber[];
  errors: string[];
}

/* ─── Server function ─── */

const getLeads = createServerFn().handler(async (): Promise<LeadsData> => {
  const result: LeadsData = { gap_scans: [], contacts: [], subscribers: [], errors: [] };

  try {
    const client = sql();

    try {
      const gapRows = await client`
        SELECT id, business_name, email, website, goal, status, created_at
        FROM gap_scans
        ORDER BY created_at DESC
        LIMIT 50
      `;
      result.gap_scans = gapRows.map((r: Record<string, unknown>) => ({
        ...r,
        created_at: String(r.created_at),
        website: r.website ? String(r.website) : null,
        goal: r.goal ? String(r.goal) : null,
      })) as GapScan[];
    } catch {
      result.errors.push("gap_scans table not available");
    }

    try {
      const contactRows = await client`
        SELECT id, business_name, email, website, whats_broken, desired_outcome, budget, timeline, status, created_at
        FROM contacts
        ORDER BY created_at DESC
        LIMIT 50
      `;
      result.contacts = contactRows.map((r: Record<string, unknown>) => ({
        ...r,
        created_at: String(r.created_at),
        website: r.website ? String(r.website) : null,
        whats_broken: r.whats_broken ? String(r.whats_broken) : null,
        desired_outcome: r.desired_outcome ? String(r.desired_outcome) : null,
        budget: r.budget ? String(r.budget) : null,
        timeline: r.timeline ? String(r.timeline) : null,
      })) as Contact[];
    } catch {
      result.errors.push("contacts table not available");
    }

    try {
      const subRows = await client`
        SELECT id, name, email, status, created_at
        FROM subscribers
        ORDER BY created_at DESC
        LIMIT 50
      `;
      result.subscribers = subRows.map((r: Record<string, unknown>) => ({
        ...r,
        created_at: String(r.created_at),
      })) as Subscriber[];
    } catch {
      result.errors.push("subscribers table not available");
    }
  } catch {
    // DATABASE_URL not set — all tables unavailable
    result.errors.push("Database not connected");
  }

  return result;
});

/* ─── Helpers ─── */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    closed: "bg-gray-100 text-gray-600",
    unsubscribed: "bg-red-100 text-red-700",
  };
  const cls = map[status.toLowerCase()] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

/* ─── Component ─── */

type TabKey = "gap_scans" | "contacts" | "subscribers";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeads,
});

function AdminLeads() {
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("gap_scans");

  // Load data on mount
  useEffect(() => {
    getLeads().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "gap_scans", label: "Gap Scans", count: data?.gap_scans.length ?? 0 },
    { key: "contacts", label: "Contacts", count: data?.contacts.length ?? 0 },
    { key: "subscribers", label: "Subscribers", count: data?.subscribers.length ?? 0 },
  ];

  const activeData = data?.[activeTab] ?? [];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Leads
            </h1>
            <p className="mt-1 text-gray-600">
              All captured leads from gap scans, contact forms, and subscriptions.
            </p>
          </div>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={100}>
          <div className="mt-6 flex gap-1 rounded-xl bg-gray-100/80 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {loading ? (
                  <span className="ml-1.5 inline-block h-4 w-4 animate-pulse rounded-full bg-gray-200 align-middle" />
                ) : (
                  <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 py-0 text-xs font-semibold text-gray-600">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Table */}
        <AnimatedSection delay={200}>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="h-8 w-8 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : activeData.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <EmptyState
                  icon={leadsIcon}
                  title="No leads yet"
                  description={`No ${activeTab === "gap_scans" ? "gap scan" : activeTab === "contacts" ? "contact form" : "subscriber"} leads have been captured yet.`}
                  className="border-none px-0 py-0"
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {activeTab === "gap_scans" && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                        {["Date", "Business Name", "Email", "Website", "Goal", "Status"].map((col) => (
                          <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(activeData as GapScan[]).map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-gray-50/50">
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(row.created_at)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{row.business_name}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.email}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {row.website ? (
                              <a href={row.website.startsWith("http") ? row.website : `https://${row.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                                {row.website.length > 30 ? row.website.slice(0, 30) + "…" : row.website}
                              </a>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="max-w-[200px] truncate px-6 py-4 text-sm text-gray-500" title={row.goal ?? undefined}>
                            {row.goal ?? <span className="text-gray-300">—</span>}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{statusBadge(row.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "contacts" && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                        {["Date", "Business Name", "Email", "Budget", "Timeline", "Status"].map((col) => (
                          <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(activeData as Contact[]).map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-gray-50/50">
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(row.created_at)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{row.business_name}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.email}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.budget ?? <span className="text-gray-300">—</span>}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.timeline ?? <span className="text-gray-300">—</span>}</td>
                          <td className="whitespace-nowrap px-6 py-4">{statusBadge(row.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "subscribers" && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                        {["Date", "Name", "Email", "Status"].map((col) => (
                          <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(activeData as Subscriber[]).map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-gray-50/50">
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(row.created_at)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">{statusBadge(row.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
  );
}
