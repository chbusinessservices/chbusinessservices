import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { createHmac } from "node:crypto";

/* ─── Configuration ─── */

const COOKIE_NAME = "admin_auth";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const TOKEN_VERSION = "1";

function getSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.warn("[auth] ADMIN_PASSWORD not set — using fallback. Set it in .env immediately.");
    return "admin123"; // fallback default
  }
  return password;
}

/* ─── Token helpers (server-only) ─── */

function signToken(): string {
  const secret = getSecret();
  const exp = Date.now() + COOKIE_MAX_AGE * 1000;
  const payload = JSON.stringify({ v: TOKEN_VERSION, exp });
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  const token = JSON.stringify({ p: payload, s: sig });
  return Buffer.from(token).toString("base64url");
}

function verifyToken(token: string): boolean {
  try {
    const secret = getSecret();
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const { p, s } = JSON.parse(raw);
    const expected = createHmac("sha256", secret).update(p).digest("hex");
    if (s !== expected) return false;
    const { exp } = JSON.parse(p);
    return exp > Date.now();
  } catch {
    return false;
  }
}

/* ─── Server functions ─── */

export const loginFn = createServerFn().handler(async ({ password }: { password: string }) => {
  const secret = getSecret();
  if (password !== secret) {
    throw new Error("Invalid password");
  }

  const token = signToken();
  setCookie(COOKIE_NAME, token, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
});

export const logoutFn = createServerFn().handler(async () => {
  deleteCookie(COOKIE_NAME, { path: "/" });
  return { success: true };
});

export const checkAuth = createServerFn().handler(async () => {
  const token = getCookie(COOKIE_NAME);
  if (!token) return { authenticated: false };
  return { authenticated: verifyToken(token) };
});
