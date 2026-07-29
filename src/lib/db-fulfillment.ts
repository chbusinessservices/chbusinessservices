import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";

/* ─── Types ─── */

export type OrderStatus = "pending" | "fulfilled" | "delivered";

export interface Order {
  id: number;
  email: string;
  product_tier: string;
  product_name: string;
  stripe_session_id: string | null;
  status: OrderStatus;
  created_at: string;
  fulfilled_at: string | null;
}

export interface CreateOrderInput {
  email: string;
  productTier: string;
  productName: string;
  sessionId?: string;
}

/* ─── Ensure table exists ─── */

const ensureTable = createServerFn().handler(async () => {
  const client = sql();
  await client`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      product_tier TEXT NOT NULL,
      product_name TEXT NOT NULL,
      stripe_session_id TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      fulfilled_at TIMESTAMPTZ
    )
  `;
});

/* ─── Create a new order ─── */

export const createOrder = createServerFn()
  .handler(async (input: CreateOrderInput): Promise<Order> => {
    await ensureTable();

    const client = sql();
    const rows = await client`
      INSERT INTO orders (email, product_tier, product_name, stripe_session_id, status)
      VALUES (${input.email}, ${input.productTier}, ${input.productName}, ${input.sessionId ?? null}, 'pending')
      RETURNING id, email, product_tier, product_name, stripe_session_id, status, created_at, fulfilled_at
    `;
    const row = rows[0] as Record<string, unknown>;
    return coerceOrder(row);
  });

/* ─── Update order status ─── */

export const updateOrderStatus = createServerFn()
  .validator((data: { id: number; status: OrderStatus }) => data)
  .handler(async ({ data }): Promise<Order | null> => {
    await ensureTable();

    const client = sql();
    const setFulfilled =
      data.status === "fulfilled" || data.status === "delivered";
    const rows = setFulfilled
      ? await client`
          UPDATE orders
          SET status = ${data.status}, fulfilled_at = NOW()
          WHERE id = ${data.id}
          RETURNING id, email, product_tier, product_name, stripe_session_id, status, created_at, fulfilled_at
        `
      : await client`
          UPDATE orders
          SET status = ${data.status}, fulfilled_at = NULL
          WHERE id = ${data.id}
          RETURNING id, email, product_tier, product_name, stripe_session_id, status, created_at, fulfilled_at
        `;
    if (rows.length === 0) return null;
    return coerceOrder(rows[0] as Record<string, unknown>);
  });

/* ─── Get all orders (admin) ─── */

export const getOrders = createServerFn()
  .handler(async (): Promise<Order[]> => {
    await ensureTable();

    const client = sql();
    const rows = await client`
      SELECT id, email, product_tier, product_name, stripe_session_id, status, created_at, fulfilled_at
      FROM orders
      ORDER BY created_at DESC
    `;
    return rows.map((r: Record<string, unknown>) => coerceOrder(r));
  });

/* ─── Get a single order ─── */

export const getOrderById = createServerFn()
  .validator((data: { id: number }) => data)
  .handler(async ({ data }): Promise<Order | null> => {
    await ensureTable();

    const client = sql();
    const rows = await client`
      SELECT id, email, product_tier, product_name, stripe_session_id, status, created_at, fulfilled_at
      FROM orders
      WHERE id = ${data.id}
    `;
    if (rows.length === 0) return null;
    return coerceOrder(rows[0] as Record<string, unknown>);
  });

/* ─── Helpers ─── */

function coerceOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as number,
    email: row.email as string,
    product_tier: row.product_tier as string,
    product_name: row.product_name as string,
    stripe_session_id: (row.stripe_session_id as string | null) ?? null,
    status: (row.status as OrderStatus) ?? "pending",
    created_at: String(row.created_at),
    fulfilled_at: row.fulfilled_at ? String(row.fulfilled_at) : null,
  };
}
