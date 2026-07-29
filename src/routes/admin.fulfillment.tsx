import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { EmptyState } from "~/components/EmptyState";
import { AnimatedSection } from "~/components/AnimatedSection";
import {
  getOrders,
  updateOrderStatus,
  type Order,
  type OrderStatus,
} from "~/lib/db-fulfillment";

/* ─── Icons ─── */

const fulfillIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

/* ─── Helpers ─── */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60",
  fulfilled: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/60",
  delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  fulfilled: "Fulfilled",
  delivered: "Delivered",
};

/* ─── Component ─── */

export const Route = createFileRoute("/admin/fulfillment")({
  component: AdminFulfillment,
});

function AdminFulfillment() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getOrders()
      .then((data) => {
        setOrders(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: number, status: OrderStatus) => {
    setUpdatingId(id);
    try {
      const updated = await updateOrderStatus({ data: { id, status } });
      if (updated) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? updated : o))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ─── Summary stats ─── */
  const total = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const fulfilled = orders.filter((o) => o.status === "fulfilled").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  const stats = [
    { label: "Total Orders", value: total, color: "text-gray-900", bg: "bg-gray-50" },
    { label: "Pending", value: pending, color: "text-amber-700", bg: "bg-amber-50" },
    { label: "Fulfilled", value: fulfilled, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Delivered", value: delivered, color: "text-emerald-700", bg: "bg-emerald-50" },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order Fulfillment
          </h1>
          <p className="mt-1 text-gray-600">
            Track and manage digital kit orders and delivery status.
          </p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={100}>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-xl ${s.bg} p-4`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {s.label}
              </p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>
                {loading ? "…" : s.value}
              </p>
            </div>
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
          ) : error ? (
            <div className="px-6 py-16 text-center">
              <EmptyState
                icon={fulfillIcon}
                title="Could not load orders"
                description={error}
                className="border-none px-0 py-0"
              />
            </div>
          ) : orders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <EmptyState
                icon={fulfillIcon}
                title="No orders yet"
                description="Orders from marketplace and offer-page purchases will appear here."
                className="border-none px-0 py-0"
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    {["Email", "Product", "Tier", "Status", "Ordered", "Actions"].map((col) => (
                      <th
                        key={col}
                        className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {row.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.product_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                          {row.product_tier}
                        </code>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}
                        >
                          {STATUS_LABELS[row.status]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(row.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          {row.status !== "fulfilled" && (
                            <button
                              type="button"
                              disabled={updatingId === row.id}
                              onClick={() => handleStatusChange(row.id, "fulfilled")}
                              className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:opacity-50"
                            >
                              Mark Fulfilled
                            </button>
                          )}
                          {row.status !== "delivered" && (
                            <button
                              type="button"
                              disabled={updatingId === row.id}
                              onClick={() => handleStatusChange(row.id, "delivered")}
                              className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {row.status !== "pending" && (
                            <button
                              type="button"
                              disabled={updatingId === row.id}
                              onClick={() => handleStatusChange(row.id, "pending")}
                              className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </td>
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
