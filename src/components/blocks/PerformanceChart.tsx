"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSlideActive } from "@/hooks/useSlideActive";
import { useSketchPaths } from "@/hooks/useSketchPaths";
import type { BlockProps } from "./types";

export interface ChartPoint {
  x: number;
  y: number;
}

export interface ChartSeries {
  id: string;
  label: string;
  points: ChartPoint[];
  variant?: "primary" | "secondary";
}

export interface ChartAxis {
  label: string;
  min: number;
  max: number;
  ticks: number[];
  /** Optional scale bounds — narrower than min/max spreads tick labels (curves still use data values) */
  scaleMin?: number;
  scaleMax?: number;
}

export interface ChartAnnotation {
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

export function PerformanceChart({
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
