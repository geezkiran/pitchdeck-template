"use client";

import { useId, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSlideActive } from "@/hooks/useSlideActive";
import {
  DetailOverlay,
  ReportDetailsContent,
  type ReportDetails,
} from "./DetailOverlay";
import type { BlockProps } from "./types";

interface ProgressGaugeCardProps extends BlockProps {
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
          "deck-card flex min-h-0 w-full flex-1 flex-col rounded-[16px] p-4 md:p-5",
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
            <p className="text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
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
