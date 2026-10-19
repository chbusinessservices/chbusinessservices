import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LRD_CATEGORIES, type LrdService } from "~/lib/lrd-data";

export function serviceLink(s: LrdService): string {
  return s.id ? `/lrd/diverse-solutions/${s.id}` : "/lrd/diverse-solutions";
}

export function ServiceCard({ s }: { s: LrdService }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      {s.flags && s.flags.length > 0 && (
        <div className="mb-2">
          {s.flags.map((f) => (
            <span
              key={f}
              title="Licensed professional provides the product"
              className="mr-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-amber-700"
            >
              {f}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {s.category}
        </span>
        <span className="text-xs text-muted-foreground">{s.format}</span>
      </div>
      <h3 className="mt-3 font-heading text-base font-semibold tracking-tight">
        {s.title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-primary">{s.price}</span>
        <Link
          to={serviceLink(s)}
          className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-card px-3 text-xs font-medium shadow-sm transition-colors hover:bg-secondary"
        >
          View &amp; Book
        </Link>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Turnaround: {s.turnaround}</p>
    </div>
  );
}

export function Catalog({ services }: { services: LrdService[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [format, setFormat] = useState("All formats");

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          (cat === "All" || s.category === cat) &&
          (format === "All formats" || s.format === format) &&
          (s.title + " " + s.desc).toLowerCase().includes(query.toLowerCase()),
      ),
    [services, cat, format, query],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="h-10 rounded-md border border-input bg-card px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option>All formats</option>
          <option>Online</option>
          <option>In person</option>
          <option>Online or in person</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {["All", ...LRD_CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              cat === c
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground/80 hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{filtered.length} services</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <ServiceCard key={(s.id ?? "") + s.title} s={s} />
        ))}
      </div>
    </div>
  );
}
