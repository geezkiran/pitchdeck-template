"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useSlideActive } from "@/hooks/useSlideActive";
import { useSketchPaths } from "@/hooks/useSketchPaths";
import { Slide } from "@/components/shared";

interface BlockProps {
  className?: string;
}

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

interface ReportDetails {
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

function ProgressGaugeCard({
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

interface ChartPoint {
  x: number;
  y: number;
}

interface ChartSeries {
  id: string;
  label: string;
  points: ChartPoint[];
  variant?: "primary" | "secondary";
}

interface ChartAxis {
  label: string;
  min: number;
  max: number;
  ticks: number[];
  /** Optional scale bounds — narrower than min/max spreads tick labels (curves still use data values) */
  scaleMin?: number;
  scaleMax?: number;
}

interface ChartAnnotation {
  /** X coordinate for the vertical guide line */
  x: number;
  /** Large label shown between the curves, e.g. "90%" */
  label: string;
}

interface PerformanceChartProps extends BlockProps {
  title?: string;
  series: ChartSeries[];
  xAxis: ChartAxis;
  yAxis: ChartAxis;
  annotation?: ChartAnnotation;
  footnote?: string;
  footnotePlacement?: "below" | "bottom-right";
  framed?: boolean;
}

const WIDTH = 760;
const HEIGHT = 420;
const MARGIN = { top: 28, right: 40, bottom: 68, left: 60 };
/** Taller plot in framed mode — spreads y-axis ticks without changing data mapping */
const FRAMED_HEIGHT = 620;
const FRAMED_MARGIN = { top: 14, right: 40, bottom: 68, left: 60 };
const X_TICK_OFFSET = 22;
const X_LABEL_OFFSET = 54;
const CURVE_DRAW_MS = 1500;
const CURVE_STAGGER_MS = 240;
const ANNOTATION_DRAW_MS = 700;
const ANNOTATION_CLIP_PAD = 2;

const COLORS = {
  grid: "rgba(0,0,0,0.06)",
  axis: "rgba(0,0,0,0.14)",
  tick: "rgba(0,0,0,0.45)",
  label: "rgba(0,0,0,0.72)",
  secondary: "#86868b",
  annotation: "rgba(0,0,0,0.35)",
  annotationText: "#1d1d1f",
  primaryLabel: "#1d1d1f",
};

function scale(value: number, min: number, max: number, start: number, end: number) {
  if (max === min) return start;
  return start + ((value - min) / (max - min)) * (end - start);
}

function smoothPath(
  points: ChartPoint[],
  xScale: (value: number) => number,
  yScale: (value: number) => number
) {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const x = xScale(points[0].x);
    const y = yScale(points[0].y);
    return `M ${x} ${y}`;
  }

  const coords = points.map((point) => ({
    x: xScale(point.x),
    y: yScale(point.y),
  }));

  let path = `M ${coords[0].x} ${coords[0].y}`;

  for (let index = 0; index < coords.length - 1; index += 1) {
    const previous = coords[index - 1] || coords[index];
    const current = coords[index];
    const next = coords[index + 1];
    const after = coords[index + 2] || next;

    const cp1x = current.x + (next.x - previous.x) / 6;
    const cp1y = current.y + (next.y - previous.y) / 6;
    const cp2x = next.x - (after.x - current.x) / 6;
    const cp2y = next.y - (after.y - current.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}

function interpolateY(points: ChartPoint[], x: number) {
  if (points.length === 0) return 0;
  if (x <= points[0].x) return points[0].y;
  if (x >= points[points.length - 1].x) return points[points.length - 1].y;

  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index];
    const end = points[index + 1];
    if (x >= start.x && x <= end.x) {
      const progress = (x - start.x) / (end.x - start.x);
      return start.y + (end.y - start.y) * progress;
    }
  }

  return points[points.length - 1].y;
}

function resetAnnotationClip(
  rect: SVGRectElement,
  x: number,
  top: number,
  bottom: number
) {
  const height = bottom - top;
  rect.style.transition = "none";
  rect.setAttribute("x", `${x - ANNOTATION_CLIP_PAD}`);
  rect.setAttribute("y", `${top}`);
  rect.setAttribute("width", `${ANNOTATION_CLIP_PAD * 2}`);
  rect.setAttribute("height", `${height}`);
  rect.style.transformBox = "fill-box";
  rect.style.transformOrigin = "center bottom";
  rect.style.transform = "scaleY(0)";
}

function revealAnnotationClip(
  rect: SVGRectElement,
  x: number,
  top: number,
  bottom: number,
  duration: number
) {
  resetAnnotationClip(rect, x, top, bottom);
  rect.getBoundingClientRect();
  rect.style.transition = `transform ${duration}ms var(--ease-apple)`;
  rect.style.transform = "scaleY(1)";
}

function PerformanceChart({
  title,
  series,
  xAxis,
  yAxis,
  annotation,
  footnote,
  footnotePlacement = "below",
  framed = false,
  className,
}: PerformanceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const clipRectRef = useRef<SVGRectElement>(null);
  const clipPathId = `deck-annotation-clip-${useId().replace(/:/g, "")}`;
  const isActive = useSlideActive(containerRef);

  useSketchPaths(
    pathRefs,
    isActive,
    { duration: CURVE_DRAW_MS, stagger: CURVE_STAGGER_MS },
    series.length
  );

  const height = framed ? FRAMED_HEIGHT : HEIGHT;
  const margin = framed ? FRAMED_MARGIN : MARGIN;

  const chartLeft = margin.left;
  const chartRight = WIDTH - margin.right;
  const chartTop = margin.top;
  const chartBottom = height - margin.bottom;

  const xScale = (value: number) =>
    scale(value, xAxis.min, xAxis.max, chartLeft, chartRight);
  const yScaleMin = yAxis.scaleMin ?? yAxis.min;
  const yScaleMax = yAxis.scaleMax ?? yAxis.max;
  const yScale = (value: number) =>
    scale(value, yScaleMin, yScaleMax, chartBottom, chartTop);

  const primarySeries = series.find((item) => item.variant !== "secondary") ?? series[0];
  const secondarySeries = series.find((item) => item.variant === "secondary") ?? series[1];

  const annotationX = annotation ? xScale(annotation.x) : null;
  const annotationPrimaryY = annotation && primarySeries
    ? yScale(interpolateY(primarySeries.points, annotation.x))
    : null;
  const annotationSecondaryY = annotation && secondarySeries
    ? yScale(interpolateY(secondarySeries.points, annotation.x))
    : null;

  const primarySeriesIndex = Math.max(
    0,
    series.findIndex((item) => item.variant !== "secondary")
  );
  const primaryDrawDelay = primarySeriesIndex * CURVE_STAGGER_MS;

  const graphCompleteDelay =
    Math.max(0, series.length - 1) * CURVE_STAGGER_MS + CURVE_DRAW_MS;
  const annotationLineDelay = graphCompleteDelay;

  const chartTimingStyle = {
    "--chart-label-secondary-delay": `${Math.round(CURVE_DRAW_MS * 0.55)}ms`,
    "--chart-label-primary-delay": `${primaryDrawDelay + Math.round(CURVE_DRAW_MS * 0.62)}ms`,
    "--chart-annotation-delay": `${graphCompleteDelay}ms`,
    "--chart-annotation-duration": `${ANNOTATION_DRAW_MS}ms`,
  } as React.CSSProperties;

  useLayoutEffect(() => {
    const rect = clipRectRef.current;
    if (!rect || annotationX === null || annotationPrimaryY === null || annotationSecondaryY === null) {
      return;
    }
    resetAnnotationClip(rect, annotationX, annotationPrimaryY, annotationSecondaryY);
  }, [annotationX, annotationPrimaryY, annotationSecondaryY]);

  useEffect(() => {
    const rect = clipRectRef.current;
    if (
      !rect ||
      !annotation ||
      annotationX === null ||
      annotationPrimaryY === null ||
      annotationSecondaryY === null
    ) {
      return;
    }

    if (!isActive) {
      resetAnnotationClip(rect, annotationX, annotationPrimaryY, annotationSecondaryY);
      return;
    }

    resetAnnotationClip(rect, annotationX, annotationPrimaryY, annotationSecondaryY);

    const startTimer = window.setTimeout(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      revealAnnotationClip(
        rect,
        annotationX,
        annotationPrimaryY,
        annotationSecondaryY,
        reducedMotion ? 0 : ANNOTATION_DRAW_MS
      );
    }, annotationLineDelay);

    return () => window.clearTimeout(startTimer);
  }, [
    isActive,
    annotation,
    annotationLineDelay,
    annotationX,
    annotationPrimaryY,
    annotationSecondaryY,
  ]);

  const isBottomRightFootnote = footnotePlacement === "bottom-right";

  return (
    <div
      ref={containerRef}
      className={cn(
        "deck-performance-chart flex w-full flex-col",
        (isBottomRightFootnote || framed) && "h-full min-h-0 flex-1",
        className
      )}
      style={chartTimingStyle}
    >
      <figure
        className={cn(
          "mx-auto w-full",
          framed
            ? "flex h-full w-full min-h-0 flex-col items-center justify-center overflow-hidden rounded-[18px] border border-black/[0.08] bg-background p-3 shadow-[var(--shadow-soft)] md:p-4"
            : "max-w-2xl",
          isBottomRightFootnote && "flex flex-1 flex-col justify-center"
        )}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className={cn(
            "block w-full",
            framed ? "h-auto max-h-[78%] w-full max-w-full" : "h-auto"
          )}
          role="img"
          aria-label={title ?? "Performance comparison chart"}
        >
          <defs>
            <linearGradient
              id="deck-curve-primary"
              x1={chartLeft}
              y1={chartBottom}
              x2={chartRight}
              y2={chartTop}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E8550A" />
              <stop offset="52%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#E8467A" />
            </linearGradient>
            {annotation && (
              <clipPath id={clipPathId}>
                <rect ref={clipRectRef} className="deck-chart-annotation-clip" />
              </clipPath>
            )}
          </defs>

          {yAxis.ticks
            .filter((tick) => tick !== 0)
            .map((tick) => {
            const y = yScale(tick);
            return (
              <g key={`y-${tick}`}>
                <line
                  x1={chartLeft}
                  y1={y}
                  x2={chartRight}
                  y2={y}
                  stroke={COLORS.grid}
                  strokeWidth={1}
                />
                <text
                  x={chartLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill={COLORS.tick}
                  fontSize={11}
                  fontWeight={500}
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {xAxis.ticks
            .filter((tick) => tick !== 0)
            .map((tick) => {
            const x = xScale(tick);
            return (
              <text
                key={`x-${tick}`}
                x={x}
                y={chartBottom + X_TICK_OFFSET}
                textAnchor="middle"
                fill={COLORS.tick}
                fontSize={11}
                fontWeight={500}
              >
                {tick}
              </text>
            );
          })}

          <line
            x1={chartLeft}
            y1={chartBottom}
            x2={chartRight}
            y2={chartBottom}
            stroke={COLORS.axis}
            strokeWidth={1}
          />
          <line
            x1={chartLeft}
            y1={chartTop}
            x2={chartLeft}
            y2={chartBottom}
            stroke={COLORS.axis}
            strokeWidth={1}
          />

          <text
            x={(chartLeft + chartRight) / 2}
            y={chartBottom + X_LABEL_OFFSET}
            textAnchor="middle"
            fill={COLORS.label}
            fontSize={13}
            fontWeight={500}
          >
            {xAxis.label}
          </text>

          <text
            x={18}
            y={(chartTop + chartBottom) / 2}
            textAnchor="middle"
            fill={COLORS.label}
            fontSize={13}
            fontWeight={500}
            transform={`rotate(-90 18 ${(chartTop + chartBottom) / 2})`}
          >
            {yAxis.label}
          </text>

          {series.map((item, seriesIndex) => {
            const path = smoothPath(item.points, xScale, yScale);
            const isPrimary = item.variant !== "secondary";
            const endPoint = item.points[item.points.length - 1];

            return (
              <g key={item.id}>
                <path
                  ref={(node) => {
                    pathRefs.current[seriesIndex] = node;
                  }}
                  d={path}
                  fill="none"
                  stroke={isPrimary ? "url(#deck-curve-primary)" : COLORS.secondary}
                  strokeWidth={isPrimary ? 3.5 : 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="deck-curve-line"
                />
                {endPoint && (
                  <text
                    x={xScale(endPoint.x)}
                    y={yScale(endPoint.y) - 10}
                    textAnchor="middle"
                    fill={isPrimary ? COLORS.primaryLabel : COLORS.secondary}
                    fontSize={isPrimary ? 14 : 13}
                    fontWeight={600}
                    className={cn(
                      "deck-chart-label",
                      isPrimary ? "deck-chart-label-primary" : "deck-chart-label-secondary"
                    )}
                  >
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}

          {annotation &&
            annotationX !== null &&
            annotationPrimaryY !== null &&
            annotationSecondaryY !== null && (
              <g>
                <g clipPath={`url(#${clipPathId})`}>
                  <line
                    x1={annotationX}
                    y1={annotationSecondaryY}
                    x2={annotationX}
                    y2={annotationPrimaryY}
                    stroke={COLORS.annotation}
                    strokeWidth={1.5}
                    strokeDasharray="4 5"
                    className="deck-chart-annotation-line"
                  />
                </g>
                <text
                  x={annotationX + 14}
                  y={(annotationPrimaryY + annotationSecondaryY) / 2 + 8}
                  fill={COLORS.annotationText}
                  fontSize={42}
                  fontWeight={600}
                  letterSpacing="-0.04em"
                  className="deck-chart-annotation-label"
                >
                  {annotation.label}
                </text>
              </g>
            )}
        </svg>

        {footnote && footnotePlacement === "below" && (
          <figcaption className="mt-3 text-[10px] leading-relaxed text-muted md:text-[11px]">
            {footnote}
          </figcaption>
        )}
      </figure>

      {footnote && isBottomRightFootnote && (
        <figcaption className="mt-auto w-full shrink-0 pt-4 text-right text-[10px] leading-none whitespace-nowrap text-muted md:pt-6 md:text-[11px]">
          {footnote}
        </figcaption>
      )}
    </div>
  );
}

export function PerformanceSlide() {
  return (
    <Slide
      id="performance"
      variant="muted"
      centerContent={false}
      className="items-stretch pt-16 md:pt-20"
      contentClassName="min-h-0 flex-1 gap-4 md:gap-5"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="grid flex-1 grid-cols-1 items-stretch gap-4 lg:grid-cols-[8fr_4fr] lg:gap-3">
          <PerformanceChart
            framed
            className="h-full min-h-0"
            xAxis={{
              label: "Operational overhead index",
              min: 0,
              max: 100,
              ticks: [0, 20, 40, 60, 80, 100],
            }}
            yAxis={{
              label: "Relative patient trust",
              min: 0,
              max: 200,
              ticks: [0, 50, 100, 150, 200],
            }}
            series={[
              {
                id: "aarthi-proposed",
                label: "Aarthi Labs (proposed)",
                variant: "primary",
                points: [
                  { x: 10, y: 50 },
                  { x: 22, y: 95 },
                  { x: 35, y: 130 },
                  { x: 48, y: 165 },
                  { x: 60, y: 190 },
                ],
              },
              {
                id: "current-state",
                label: "Current operations",
                variant: "secondary",
                points: [
                  { x: 25, y: 20 },
                  { x: 45, y: 45 },
                  { x: 70, y: 72 },
                  { x: 88, y: 86 },
                ],
              },
            ]}
            annotation={{ x: 60, label: "90%" }}
          />
          <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-3">
            <ProgressGaugeCard
              value={64}
              status="Phase 1 in progress"
              detail="120 of 200+ centres onboarded"
              actionLabel="View details"
              sketchDelay={400}
              reportDetails={{
                title: "Centre rollout — Phase 1",
                description:
                  "Digital foundation rollout across priority hubs before national scale-up.",
                metrics: [
                  { label: "Completion", value: "64%" },
                  { label: "Centres live", value: "120 / 200+" },
                  { label: "States in scope", value: "12" },
                  { label: "Target completion", value: "Q3 2026" },
                ],
                bullets: [
                  "Unified booking and patient identity layer at each onboarded centre.",
                  "LIMS-to-app sync for report status and WhatsApp delivery.",
                  "Remaining centres queued by volume and post-analytical delay risk.",
                ],
              }}
            />
            <ProgressGaugeCard
              value={90}
              status="6-hour TAT target"
              detail="Vs. industry average turnaround"
              actionLabel="View details"
              sketchDelay={620}
              reportDetails={{
                title: "6-hour report delivery",
                description:
                  "Share of reports delivered within the 6-hour promise vs. current industry benchmarks.",
                metrics: [
                  { label: "On-target delivery", value: "90%" },
                  { label: "TAT promise", value: "6 hours" },
                  { label: "Industry average", value: "~18 hours" },
                  { label: "Measurement window", value: "Last 90 days" },
                ],
                bullets: [
                  "Priority validation queues for critical and home-collection samples.",
                  "Redundant WhatsApp and app delivery paths when primary sync fails.",
                  "Pre-analytical delays remain the main lever to reach 95%+.",
                ],
              }}
            />
          </div>
        </div>
        <p className="mx-auto mt-5 shrink-0 w-full text-center text-[10px] leading-none whitespace-nowrap text-muted/60 md:mt-6 md:text-[11px]">
          Proposed operating model vs. current patient feedback trends across booking, report delivery, and support.
        </p>
      </div>
    </Slide>
  );
}
