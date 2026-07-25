import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState, useEffect, useCallback, useRef } from "react";

export const Route = createFileRoute("/demo")({
  component: Demo,
});

/* ─── Stripe payment links ─── */
const STRIPE = {
  conversionSite: "https://buy.stripe.com/4M5kD01r4T6eZQg7O9Zm08",
  automation: "https://buy.stripe.com/14A5kD29z5XadVM3l29Zm09",
  growthOS: "https://buy.stripe.com/eVq8wP6pPbhubNEf3K9Zm0b",
  aiBusinessKit: "https://buy.stripe.com/cNi4gz29zadq2d47Bi9Zm0f",
};

/* ─── Trial user helper ─── */
function getTrialUser(): { fullName: string; email: string; company: string; wantToTry: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ch_trial_user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isTrialMode(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("trial") === "true" && !!getTrialUser();
}

/* ─── Animated counter hook ─── */
function useAnimatedCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return count;
}

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

/* ═══════════════════════════════════════════
   TAB 1 — Conversion Site Sprint Demo
   ═══════════════════════════════════════════ */

function ConversionSiteDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checks, setChecks] = useState([false, false, false, false]);
  const checkLabels = [
    "SEO setup",
    "Lead capture",
    "Mobile responsive",
    "Conversion copy",
  ];

  useEffect(() => {
    setVisible(true);
    const timers = checkLabels.map((_, i) =>
      setTimeout(() => setChecks((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      }), 600 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const conversionCount = useAnimatedCounter(3.2, 1800, visible);

  return (
    <AnimatedSection direction="up">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium text-brand-gray">
              Preview mode:
            </span>
            <button
              onClick={() => setIsMobile(!isMobile)}
              className="flex items-center gap-2 rounded-full bg-brand-cream-dark px-4 py-2 text-sm font-medium text-brand-navy transition-all hover:bg-brand-cream"
            >
              {isMobile ? (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                  Desktop
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                  Mobile
                </>
              )}
            </button>
          </div>

          <div className="flex gap-4">
            {/* Before */}
            <div
              className={`flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm transition-all duration-500 ${
                isMobile ? "max-w-[180px]" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-200/70 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-gray-400" />
                <div className="h-2 w-2 rounded-full bg-gray-400" />
                <div className="h-2 w-2 rounded-full bg-gray-400" />
                <span className="ml-2 text-[10px] font-medium text-gray-500">Before</span>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  <div className="h-3 w-3/4 rounded bg-gray-300" />
                  <div className="h-2 w-full rounded bg-gray-200" />
                  <div className="h-2 w-5/6 rounded bg-gray-200" />
                  <div className="h-2 w-4/6 rounded bg-gray-200" />
                  <div className="mt-4 h-8 w-full rounded bg-gray-300" />
                  <div className="h-16 w-full rounded bg-gray-200" />
                  <div className="h-16 w-full rounded bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <svg className="h-8 w-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* After */}
            <div
              className={`flex-1 overflow-hidden rounded-2xl border border-brand-gold/30 bg-brand-navy shadow-lg shadow-brand-gold/5 transition-all duration-500 ${
                isMobile ? "max-w-[180px]" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-brand-navy-light px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-400/60" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
                <div className="h-2 w-2 rounded-full bg-green-400/60" />
                <span className="ml-2 text-[10px] font-medium text-brand-gold-light">After</span>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  <div className="h-3 w-2/3 rounded bg-brand-gold/40" />
                  <div className="h-2 w-full rounded bg-white/20" />
                  <div className="h-2 w-5/6 rounded bg-white/15" />
                  <div className="h-2 w-4/6 rounded bg-white/15" />
                  <div className="mt-4 h-8 w-full rounded bg-brand-gold" />
                  <div className="rounded bg-white/10 p-2">
                    <div className="h-2 w-1/2 rounded bg-white/20" />
                    <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/15" />
                  </div>
                  <div className="rounded bg-white/10 p-2">
                    <div className="h-2 w-1/2 rounded bg-white/20" />
                    <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card-premium border-l-4 border-l-brand-gold p-6">
            <h3 className="font-serif text-lg font-semibold text-brand-navy">
              What you get
            </h3>
            <ul className="mt-4 space-y-3">
              {checkLabels.map((label, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                    checks[i] ? "text-brand-navy" : "text-brand-gray-light"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                      checks[i]
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {checks[i] ? "✓" : "○"}
                  </span>
                  <span className={checks[i] ? "font-medium" : ""}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-brand-cream-dark p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-gray">
                Average conversion increase
              </p>
              <p className="mt-1 font-mono text-3xl font-bold text-brand-navy">
                {conversionCount.toFixed(1)}x
              </p>
            </div>

            <a
              href={STRIPE.conversionSite}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 w-full py-3 text-base"
            >
              Get your Conversion Site Sprint — $1,500
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   TAB 2 — Automation System Demo
   ═══════════════════════════════════════════ */

const AUTOMATION_AGENTS = [
  {
    name: "Lead Capture",
    desc: "Form → CRM entry created",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    name: "Follow-up Engine",
    desc: "Email → SMS sequences sent",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    name: "CRM Sync",
    desc: "Pipeline & deal stage updated",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
  {
    name: "Booking Agent",
    desc: "Calendar scheduling link sent",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
];

const LEAD_FLOW_STEPS = [
  { label: "Jane from Acme Co fills out form", time: "0.0s" },
  { label: "Auto-reply sent via email", time: "0.5s" },
  { label: "CRM record created & updated", time: "1.0s" },
  { label: "Follow-up scheduled for tomorrow", time: "1.5s" },
  { label: "Booking link sent to Jane", time: "2.0s" },
];

function AutomationDemo() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setStep(-1);
    setFinished(false);
  }, []);

  const start = useCallback(() => {
    reset();
    setPlaying(true);
    let i = 0;
    const advance = () => {
      if (i < LEAD_FLOW_STEPS.length) {
        setStep(i);
        i++;
        timerRef.current = setTimeout(advance, 900);
      } else {
        setFinished(true);
        setPlaying(false);
      }
    };
    timerRef.current = setTimeout(advance, 400);
  }, [reset]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatedSection direction="up">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {AUTOMATION_AGENTS.map((agent, i) => (
              <div
                key={agent.name}
                className={`card-premium border-l-4 p-5 transition-all duration-500 ${
                  i <= step
                    ? "border-l-emerald-500 bg-emerald-50/30"
                    : i === step + 1 && playing
                      ? "border-l-brand-gold bg-brand-cream animate-pulse-glow"
                      : "border-l-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                      i <= step
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <span className="[&>svg]:h-5 [&>svg]:w-5">{agent.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-brand-navy">{agent.name}</h4>
                      {i <= step && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                          Done
                        </span>
                      )}
                      {i === step + 1 && playing && (
                        <span className="inline-flex items-center rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-medium text-brand-gold-dark">
                          Running
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-brand-gray">{agent.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={playing ? reset : start}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                playing
                  ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  : "bg-brand-navy text-white hover:bg-brand-navy-light"
              }`}
            >
              {playing ? (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset
                </>
              ) : finished ? (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  Replay
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                  Play Demo
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              {LEAD_FLOW_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i <= step ? "w-6 bg-emerald-500" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card-premium overflow-hidden">
            <div className="flex items-center gap-2 border-b border-brand-border-light bg-brand-cream-dark px-4 py-3">
              <span className="font-mono text-xs font-semibold text-brand-navy">Live Lead Flow</span>
              <span className="ml-auto relative inline-flex h-2 w-2 rounded-full bg-emerald-500">
                {playing && <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400" />}
              </span>
            </div>
            <div className="divide-y divide-brand-border-light p-4">
              {LEAD_FLOW_STEPS.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-3 transition-all duration-500 ${
                    i <= step ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      i <= step
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i <= step ? "✓" : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm transition-colors duration-300 ${
                      i <= step ? "text-brand-navy font-medium" : "text-brand-gray"
                    }`}>
                      {s.label}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-brand-gray-light">{s.time}</span>
                </div>
              ))}
            </div>
            {finished && (
              <div className="border-t border-brand-border-light bg-emerald-50/50 px-4 py-3">
                <p className="text-center text-sm font-medium text-emerald-700">
                  ✓ Flow complete — lead captured & booked!
                </p>
              </div>
            )}
          </div>

          <a
            href={STRIPE.automation}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full py-3 text-base"
          >
            Automate your business — from $500/mo
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   TAB 3 — Growth OS Demo
   ═══════════════════════════════════════════ */

function GrowthOSDemo() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const visitors = useAnimatedCounter(12473, 2000, visible);
  const leads = useAnimatedCounter(847, 2000, visible);
  const conversion = useAnimatedCounter(6.8, 2000, visible);
  const rank = useAnimatedCounter(42, 2000, visible);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const month1Heights = [8, 14, 18, 22, 20, 24];
  const month6Heights = [24, 38, 52, 68, 82, 96];
  const [chartMode, setChartMode] = useState<"m1" | "m6">("m6");

  return (
    <AnimatedSection direction="up">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="card-premium overflow-hidden">
          <div className="flex items-center justify-between border-b border-brand-border-light bg-brand-cream-dark px-5 py-3">
            <span className="font-mono text-xs font-semibold text-brand-navy">Growth OS Dashboard</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartMode("m1")}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  chartMode === "m1"
                    ? "bg-brand-navy text-white"
                    : "bg-white text-brand-gray hover:text-brand-navy"
                }`}
              >
                Month 1
              </button>
              <button
                onClick={() => setChartMode("m6")}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  chartMode === "m6"
                    ? "bg-brand-navy text-white"
                    : "bg-white text-brand-gray hover:text-brand-navy"
                }`}
              >
                Month 6
              </button>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Visitors/mo", value: visitors, suffix: "", format: fmt },
                { label: "Leads/mo", value: leads, suffix: "", format: fmt },
                { label: "Conv. Rate", value: conversion, suffix: "%", format: (n: number) => n.toFixed(1) },
                { label: "SEO Rank", value: rank, suffix: "", format: (n: number) => `#${n}` },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl bg-brand-cream-dark p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-brand-gray">
                    {kpi.label}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-brand-navy">
                    {kpi.format(kpi.value)}{kpi.suffix}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-medium text-brand-gray">Monthly Visitors</p>
              <div className="flex items-end gap-1.5" style={{ height: 120 }}>
                {(chartMode === "m6" ? month6Heights : month1Heights).map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-brand-gold transition-all duration-700 ease-out"
                      style={{
                        height: `${h}%`,
                        opacity: visible ? 1 : 0,
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                    <span className="text-[10px] text-brand-gray-light">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-brand-cream-dark p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-brand-gray">Month 1  →  Month 6</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-brand-navy">
                    Visitors: <span className="text-emerald-600">↑ 312%</span>
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card-premium overflow-hidden">
            <div className="border-b border-brand-border-light bg-brand-cream-dark px-5 py-3">
              <span className="font-mono text-xs font-semibold text-brand-navy">Top Performing Content (Simulated)</span>
            </div>
            <div className="divide-y divide-brand-border-light">
              {[
                { title: "Ultimate Guide to SEO for Plumbers", views: "4,201", change: "+18%" },
                { title: "How to Automate Lead Follow-ups", views: "3,856", change: "+12%" },
                { title: "Conversion Copywriting Framework", views: "2,944", change: "+24%" },
                { title: "Small Business CRM Comparison", views: "2,510", change: "+9%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-3 transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-10px)",
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-brand-navy">{item.title}</p>
                  </div>
                  <div className="ml-3 flex items-center gap-3 text-right">
                    <span className="font-mono text-xs text-brand-gray">{item.views}</span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium border-l-4 border-l-brand-gold p-6">
            <h3 className="font-serif text-lg font-semibold text-brand-navy">
              Ready to grow?
            </h3>
            <p className="mt-2 text-sm text-brand-gray">
              Continuous SEO, content, and automation — all managed for you.
            </p>
            <a
              href={STRIPE.growthOS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 w-full py-3 text-base"
            >
              Subscribe Growth OS — $997/mo
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   TAB 4 — AI Business Kit Demo
   ═══════════════════════════════════════════ */

function AIBusinessKitDemo() {
  const [showPreview, setShowPreview] = useState(false);

  const kit = {
    name: "Local SEO Intelligence Agency",
    category: "Marketing Automation",
    price: "$8,500",
    includes: [
      "4 AI Agents (SEO audit, keyword research, content brief, rank tracker)",
      "12 Custom prompts for content generation",
      "Google Search Console + Analytics config",
      "Client-ready sales deck & proposal flow",
      "3-month report template package",
    ],
  };

  return (
    <AnimatedSection direction="up">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="card-premium overflow-hidden">
            <div className="relative bg-brand-navy p-6">
              <div className="absolute inset-0 hero-dots opacity-30" />
              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-medium text-brand-gold-light">
                  {kit.category}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white">{kit.name}</h3>
                <p className="mt-4 font-mono text-3xl font-bold text-brand-gold">{kit.price}</p>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-serif text-base font-semibold text-brand-navy">
                What's included
              </h4>
              <ul className="mt-3 space-y-2.5">
                {kit.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-brand-gray">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-navy transition-colors hover:text-brand-gold"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {showPreview ? "Hide preview" : "Live preview"}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                showPreview ? "max-h-72 border-t border-brand-border-light" : "max-h-0"
              }`}
            >
              <div className="bg-brand-cream-dark p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                  <span className="ml-2 font-mono text-[10px] text-brand-gray">Business Dashboard — {kit.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Keywords tracked", val: "1,240" },
                    { label: "Sites monitored", val: "47" },
                    { label: "Reports generated", val: "312" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white p-3 text-center shadow-sm">
                      <p className="text-[10px] text-brand-gray">{stat.label}</p>
                      <p className="mt-0.5 font-mono text-sm font-bold text-brand-navy">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="card-premium border-l-4 border-l-brand-gold p-6">
            <svg className="h-6 w-6 text-brand-gold/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="mt-3 text-sm leading-relaxed text-brand-gray">
              "I bought the Local SEO Agency kit and had my first paying client within 3 weeks. The prompts alone saved me months of trial and error."
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                MT
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-navy">Marcus T.</p>
                <p className="text-xs text-brand-gray">Verified Buyer — April 2026</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/marketplace"
              className="btn-secondary w-full py-3 text-base"
            >
              Browse Marketplace
            </Link>
            <a
              href={STRIPE.aiBusinessKit}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-base"
            >
              Buy Pro Kit — $15,000
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

type TabId = "conversion" | "automation" | "growth" | "kits";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "conversion",
    label: "Conversion Sites",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    id: "automation",
    label: "Automation",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: "growth",
    label: "Growth OS",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    id: "kits",
    label: "AI Business Kits",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

const TAB_ORDER: TabId[] = ["conversion", "automation", "growth", "kits"];

function Demo() {
  const [activeTab, setActiveTab] = useState<TabId>("conversion");
  const trialUser = isTrialMode() ? getTrialUser() : null;
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastInteractionRef = useRef(Date.now());

  /* ─── Auto-advance tabs after 8 seconds of idle ─── */
  useEffect(() => {
    const resetIdle = () => {
      lastInteractionRef.current = Date.now();
    };

    const checkIdle = () => {
      const elapsed = Date.now() - lastInteractionRef.current;
      if (elapsed >= 8000) {
        setActiveTab((prev) => {
          const idx = TAB_ORDER.indexOf(prev);
          const next = TAB_ORDER[(idx + 1) % TAB_ORDER.length];
          return next;
        });
        lastInteractionRef.current = Date.now(); // reset after auto-advance
      }
    };

    // Track user interactions
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetIdle, { passive: true }));

    idleTimerRef.current = setInterval(checkIdle, 1000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, resetIdle));
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, []);

  // Also reset idle on manual tab change
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    lastInteractionRef.current = Date.now();
  };

  return (
    <>
      {/* ─── Trial Welcome Banner ─── */}
      {trialUser && (
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                </span>
                <p className="text-sm font-medium">
                  Welcome, <span className="font-bold">{trialUser.fullName}</span>! Your trial is active.
                </p>
              </div>
              <Link
                to="/trial"
                className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 hero-dots opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 sm:py-24">
          <AnimatedSection>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
              Experience it{" "}
              <span className="gradient-text">before you buy it.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-gray">
              Choose a service below and watch how it works — real simulations, not screenshots.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <section className="sticky top-16 z-40 border-b border-brand-border-light bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-brand-gold text-brand-navy"
                    : "border-transparent text-brand-gray hover:border-brand-border hover:text-brand-navy"
                }`}
              >
                <span className={activeTab === tab.id ? "text-brand-gold" : "text-brand-gray-light"}>
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="ml-2 inline-flex items-center">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="ml-1.5 text-[10px] font-normal text-emerald-600 hidden md:inline">Live</span>
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tab Content ─── */}
      <section className="section-pad bg-brand-warm-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-300 ease-out">
            {activeTab === "conversion" && <ConversionSiteDemo key="conversion" />}
            {activeTab === "automation" && <AutomationDemo key="automation" />}
            {activeTab === "growth" && <GrowthOSDemo key="growth" />}
            {activeTab === "kits" && <AIBusinessKitDemo key="kits" />}
          </div>
        </div>
      </section>

      {/* ─── Trial CTA ─── */}
      {!trialUser && (
        <section className="relative section-pad bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-light p-10 sm:p-14 text-center">
              <div className="absolute inset-0 hero-dots opacity-20" />
              <div className="relative">
                <AnimatedSection>
                  <span className="inline-flex items-center rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-medium text-brand-gold-light">
                    No credit card required
                  </span>
                </AnimatedSection>
                <AnimatedSection delay={100}>
                  <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Start Your Free Trial
                  </h2>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-gray-light">
                    Try any service free. Conversion Sites, Automation, Intelligence, or Marketplace — experience it all with no commitment.
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                  <Link
                    to="/trial"
                    className="btn-primary mt-8 px-8 py-4 text-base"
                  >
                    Start Free Trial
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Bottom CTA ─── */}
      <section className="relative section-pad bg-brand-navy">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Not sure where to start?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-gray-light">
              Get a free Business Gap Scan and we'll recommend the exact service you need.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <Link
              to="/offers/gap-scan"
              className="btn-primary mt-8 px-8 py-4 text-base"
            >
              Start with a Free Gap Scan
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Floating Chat Button ─── */}
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-medium text-white shadow-xl transition-all duration-200 hover:bg-brand-navy-light hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
        aria-label="Chat with us"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
        Chat with us
      </Link>
    </>
  );
}
