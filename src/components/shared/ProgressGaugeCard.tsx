"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useSlideActive } from "@/hooks/useSlideActive";

interface DetailOverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

function DetailOverlay({
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-8"
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
          "deck-card relative w-full max-w-lg rounded-[20px] p-8 shadow-[var(--shadow-card)]",
          className
        )}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.12] bg-background text-muted transition-colors hover:border-black/20 hover:text-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
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
            className="text-xl font-semibold tracking-[-0.02em] text-foreground"
          >
            {title}
          </h3>
          <div className="mt-4 space-y-4 text-[0.9375rem] font-medium leading-relaxed text-muted">
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

function ReportDetailsContent({
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

export interface ProgressGaugeCardProps {
  className?: string;
  /** 0–100 */
  value: number;
  status: string;
  detail?: string;
  actionLabel?: string;
  actionHref?: string;
  reportDetails?: ReportDetails;
  /** ms delay before arc sketch starts */
  sketchDelay?: number;
}

const SIZE = 200;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CENTER = SIZE / 2;
const ARC_Y = CENTER + RADIUS * 0.15;

function arcPath() {
  const startX = CENTER - RADIUS;
  const endX = CENTER + RADIUS;
  return `M ${startX} ${ARC_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${endX} ${ARC_Y}`;
}

export function ProgressGaugeCard({
  value,
  status,
  detail,
  actionLabel,
  actionHref,
  reportDetails,
  sketchDelay = 0,
  className,
}: ProgressGaugeCardProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const gradientId = useId();
  const cardRef = useRef<HTMLElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const isActive = useSlideActive(cardRef);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const path = arcRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const targetOffset = length - (clamped / 100) * length;
    path.style.strokeDasharray = `${length}`;

    if (!isActive) {
      path.style.transition = "none";
      path.style.strokeDashoffset = `${length}`;
      return;
    }

    path.style.strokeDashoffset = `${length}`;
    path.getBoundingClientRect();
    path.style.transition = `stroke-dashoffset 1.2s var(--ease-apple) ${sketchDelay}ms`;
    path.style.strokeDashoffset = `${targetOffset}`;
  }, [isActive, clamped, sketchDelay]);

  const actionClassName =
    "rounded-full border border-black/[0.12] px-5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-black/20 hover:text-foreground";

  return (
    <>
      <article
        ref={cardRef}
        className={cn(
          "deck-card flex min-h-0 w-full flex-1 flex-col rounded-[16px] p-5",
          className
        )}
      >
        <div className="relative mx-auto flex min-h-0 w-full max-w-[240px] flex-1 flex-col items-center justify-center py-2">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE * 0.72}`}
            className="block h-auto w-full max-h-full"
            role="img"
            aria-label={`${clamped}% complete`}
          >
            <path
              d={arcPath()}
              fill="none"
              stroke="#e8e8ed"
              strokeWidth={STROKE}
              strokeLinecap="round"
            />
            <path
              ref={arcRef}
              d={arcPath()}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={STROKE}
              strokeLinecap="round"
              className="deck-gauge-arc"
            />
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5ac8fa" />
                <stop offset="100%" stopColor="#0071e3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-0.5 text-center">
            <p className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
              {clamped}%
            </p>
            <p className="text-xs font-medium leading-tight text-foreground/80">
              {status}
            </p>
            {detail && (
              <p className="text-[11px] font-medium leading-tight text-muted">
                {detail}
              </p>
            )}
          </div>
        </div>

        {actionLabel && (
          <div className="mt-auto flex shrink-0 justify-center pt-2">
            {reportDetails ? (
              <button
                type="button"
                className={actionClassName}
                onClick={() => setOverlayOpen(true)}
              >
                {actionLabel}
              </button>
            ) : actionHref ? (
              <a href={actionHref} className={actionClassName}>
                {actionLabel}
              </a>
            ) : (
              <button type="button" className={actionClassName}>
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </article>

      {reportDetails && (
        <DetailOverlay
          open={overlayOpen}
          onClose={() => setOverlayOpen(false)}
          title={reportDetails.title}
        >
          <ReportDetailsContent
            description={reportDetails.description}
            metrics={reportDetails.metrics}
            bullets={reportDetails.bullets}
          />
        </DetailOverlay>
      )}
    </>
  );
}
