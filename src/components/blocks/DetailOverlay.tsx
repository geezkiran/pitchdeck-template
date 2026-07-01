"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface DetailOverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function DetailOverlay({
  open,
  onClose,
  title,
  children,
  className,
}: DetailOverlayProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close details"
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-overlay-title"
        className={cn(
          "deck-card relative w-full max-w-md rounded-[20px] p-6 shadow-[var(--shadow-card)] md:max-w-lg md:p-8",
          className
        )}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.12] bg-background text-muted transition-colors hover:border-black/20 hover:text-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="pr-10">
          <h3
            id="detail-overlay-title"
            className="text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl"
          >
            {title}
          </h3>
          <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-muted md:text-[0.9375rem]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export interface ReportDetails {
  title: string;
  description?: string;
  metrics?: { label: string; value: string }[];
  bullets?: string[];
}

export function ReportDetailsContent({
  description,
  metrics,
  bullets,
}: Omit<ReportDetails, "title">) {
  return (
    <>
      {description && <p className="text-muted">{description}</p>}
      {metrics && metrics.length > 0 && (
        <dl className="grid gap-2.5 rounded-[14px] bg-surface p-4">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-4"
            >
              <dt className="text-muted">{item.label}</dt>
              <dd className="shrink-0 text-right text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 pl-4 text-muted">
          {bullets.map((bullet) => (
            <li key={bullet} className="list-disc">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
