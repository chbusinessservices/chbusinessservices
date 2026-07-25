import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface Props {
  /** SVG icon element */
  icon: ReactNode;
  /** Main title */
  title: string;
  /** Subtitle / description */
  description: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA link target */
  ctaHref?: string;
  /** Optional onClick for CTA (overrides href) */
  onCtaClick?: () => void;
  /** Additional class for the wrapper */
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/60 px-6 py-16 text-center backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-400">
        <span className="[&>svg]:h-8 [&>svg]:w-8">{icon}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
        {description}
      </p>
      {ctaLabel && (ctaHref || onCtaClick) && (
        <div className="mt-6">
          {ctaHref && !onCtaClick ? (
            <Link
              to={ctaHref}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
