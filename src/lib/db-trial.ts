import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";

/* ─── Types ─── */

export interface TrialSignup {
  id: number;
  full_name: string;
  email: string;
  company: string;
  want_to_try: string;
  created_at: string;
}

export interface TrialSignupInput {
  fullName: string;
  email: string;
  company: string;
  wantToTry: string;
}

/* ─── Ensure table exists ─── */

const ensureTable = createServerFn().handler(async () => {
  const client = sql();
  await client`
    CREATE TABLE IF NOT EXISTS trial_signups (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      want_to_try TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
});

/* ─── Save a trial signup ─── */

export const saveTrialSignup = createServerFn()
  .handler(async (input: TrialSignupInput): Promise<TrialSignup> => {
    await ensureTable();

    const client = sql();
    const rows = await client`
      INSERT INTO trial_signups (full_name, email, company, want_to_try)
      VALUES (${input.fullName}, ${input.email}, ${input.company}, ${input.wantToTry})
      RETURNING id, full_name, email, company, want_to_try, created_at
    `;
    const row = rows[0] as Record<string, unknown>;
    return {
      id: row.id as number,
      full_name: row.full_name as string,
      email: row.email as string,
      company: row.company as string,
      want_to_try: row.want_to_try as string,
      created_at: String(row.created_at),
    };
  });

/* ─── Get all trial signups ─── */

export const getTrialSignups = createServerFn()
  .handler(async (): Promise<TrialSignup[]> => {
    await ensureTable();

    const client = sql();
    const rows = await client`
      SELECT id, full_name, email, company, want_to_try, created_at
      FROM trial_signups
      ORDER BY created_at DESC
    `;
    return rows.map((r: Record<string, unknown>) => ({
      id: r.id as number,
      full_name: r.full_name as string,
      email: r.email as string,
      company: r.company as string,
      want_to_try: r.want_to_try as string,
      created_at: String(r.created_at),
    }));
  });
