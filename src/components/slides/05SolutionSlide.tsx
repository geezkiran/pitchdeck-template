"use client";

import { useId, type CSSProperties } from "react";
import {
  HeadingBlock,
  Slide,
  SlideBody,
  SlideIntro,
  SlideLead,
  TextBlock,
} from "@/components/shared";

interface CompetitorPoint {
  id: string;
  name: string;
  logo: string;
  x: number;
  y: number;
  featured?: boolean;
  invert?: boolean;
}

const competitors: CompetitorPoint[] = [
  {
    id: "aarthi",
    name: "Aarthi Scans",
    logo: "/images/competitors/aarthi.webp",
    x: 44,
    y: 58,
    featured: true,
  },
  {
    id: "orange",
    name: "Orange Health",
    logo: "/images/competitors/orange-health.svg",
    x: 55,
    y: 80,
  },
  {
    id: "lal",
    name: "Dr. Lal PathLabs",
    logo: "/images/competitors/lal-pathlabs.png",
    x: 43,
    y: 84,
  },
  {
    id: "metropolis",
    name: "Metropolis",
    logo: "/images/competitors/metropolis-logo.svg",
    x: 36,
    y: 75,
    invert: true,
  },
];

const WIDTH = 640;
const HEIGHT = 380;
const MARGIN = { top: 24, right: 36, bottom: 64, left: 52 };
const X_TICK_OFFSET = 20;
const X_LABEL_OFFSET = 50;

const COLORS = {
  grid: "rgba(0,0,0,0.06)",
  axis: "rgba(0,0,0,0.14)",
  tick: "rgba(0,0,0,0.45)",
  label: "rgba(0,0,0,0.72)",
};

const xTicks = [0, 20, 40, 60, 80, 100];
const yTicks = [0, 20, 40, 60, 80, 100];

const REGION = { x: 55, y: 90, angle: 65 };
const REGION_GREEN = "#1aa056";

function scale(value: number, min: number, max: number, start: number, end: number) {
  return start + ((value - min) / (max - min)) * (end - start);
}

function lineThroughPoint(
  cx: number,
  cy: number,
  angleDeg: number,
  left: number,
  right: number,
  top: number,
  bottom: number
) {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const ts: number[] = [];

  if (Math.abs(dx) > 1e-6) {
    ts.push((left - cx) / dx, (right - cx) / dx);
  }
  if (Math.abs(dy) > 1e-6) {
    ts.push((top - cy) / dy, (bottom - cy) / dy);
  }

  const onPlot = (x: number, y: number) =>
    x >= left - 0.5 && x <= right + 0.5 && y >= top - 0.5 && y <= bottom + 0.5;

  const valid = ts
    .filter((t) => onPlot(cx + t * dx, cy + t * dy))
    .sort((a, b) => a - b);

  if (valid.length < 2) {
    return { x1: cx, y1: cy, x2: cx, y2: cy };
  }

  const t0 = valid[0];
  const t1 = valid[valid.length - 1];

  return {
    x1: cx + t0 * dx,
    y1: cy + t0 * dy,
    x2: cx + t1 * dx,
    y2: cy + t1 * dy,
  };
}

function LogoMarker({
  cx,
  cy,
  logo,
  name,
  featured,
  invert,
  delay,
}: {
  cx: number;
  cy: number;
  logo: string;
  name: string;
  featured?: boolean;
  invert?: boolean;
  delay: number;
}) {
  const width = featured ? 72 : 64;
  const height = featured ? 44 : 38;
  const halfW = width / 2;
  const halfH = height / 2;
  const padX = featured ? 8 : 6;
  const padY = featured ? 6 : 5;

  return (
    <g
      className="deck-survey-chart-point"
      style={{ "--point-delay": `${delay}ms` } as CSSProperties}
    >
      <rect
        x={cx - halfW}
        y={cy - halfH}
        width={width}
        height={height}
        rx={10}
        fill="#ffffff"
        stroke={featured ? "rgba(0,113,227,0.35)" : "rgba(0,0,0,0.08)"}
        strokeWidth={featured ? 1.5 : 1}
      />
      <image
        href={logo}
        x={cx - halfW + padX}
        y={cy - halfH + padY}
        width={width - padX * 2}
        height={height - padY * 2}
        preserveAspectRatio="xMidYMid meet"
        aria-label={name}
        style={invert ? { filter: "invert(1)" } : undefined}
      />
    </g>
  );
}

function FutureReadinessChart() {
  const safeId = useId().replace(/:/g, "");
  const regionMaskId = `deck-region-mask-${safeId}`;
  const regionMaskGradientId = `deck-region-mask-gradient-${safeId}`;

  const plotLeft = MARGIN.left;
  const plotRight = WIDTH - MARGIN.right;
  const plotTop = MARGIN.top;
  const plotBottom = HEIGHT - MARGIN.bottom;

  const xScale = (value: number) => scale(value, 0, 100, plotLeft, plotRight);
  const yScale = (value: number) => scale(value, 0, 100, plotBottom, plotTop);

  const regionCx = xScale(REGION.x);
  const regionCy = yScale(REGION.y);
  const regionLine = lineThroughPoint(
    regionCx,
    regionCy,
    REGION.angle,
    plotLeft,
    plotRight,
    plotTop,
    plotBottom
  );

  return (
    <div
      className="deck-performance-chart w-full min-w-0"
      style={{ "--sketch-fill-delay": "900ms" } as CSSProperties}
    >
      <figure className="mx-auto flex w-full max-w-3xl flex-col">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          className="block h-auto w-full"
          role="img"
          aria-label="Future readiness positioning of diagnostic competitors"
        >
          <defs>
            <linearGradient
              id={regionMaskGradientId}
              gradientUnits="userSpaceOnUse"
              x1={plotLeft}
              y1={plotBottom}
              x2={plotRight}
              y2={plotTop}
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.06" />
              <stop offset="55%" stopColor="white" stopOpacity="0.22" />
              <stop offset="100%" stopColor="white" stopOpacity="0.92" />
            </linearGradient>
            <mask id={regionMaskId} maskUnits="userSpaceOnUse">
              <rect
                x={plotLeft}
                y={plotTop}
                width={plotRight - plotLeft}
                height={plotBottom - plotTop}
                fill={`url(#${regionMaskGradientId})`}
              />
            </mask>
          </defs>

          {yTicks
            .filter((tick) => tick !== 0)
            .map((tick) => {
              const y = yScale(tick);
              return (
                <g key={`y-${tick}`} className="deck-survey-chart-grid">
                  <line
                    x1={plotLeft}
                    y1={y}
                    x2={plotRight}
                    y2={y}
                    stroke={COLORS.grid}
                    strokeWidth={1}
                  />
                  <text
                    x={plotLeft - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill={COLORS.tick}
                    fontSize={11}
                    fontWeight={500}
                    className="deck-survey-chart-tick"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

          {xTicks
            .filter((tick) => tick !== 0)
            .map((tick) => (
              <text
                key={`x-${tick}`}
                x={xScale(tick)}
                y={plotBottom + X_TICK_OFFSET}
                textAnchor="middle"
                fill={COLORS.tick}
                fontSize={11}
                fontWeight={500}
                className="deck-survey-chart-tick"
              >
                {tick}
              </text>
            ))}

          <line
            x1={plotLeft}
            y1={plotBottom}
            x2={plotRight}
            y2={plotBottom}
            stroke={COLORS.axis}
            strokeWidth={1}
            className="deck-survey-chart-axis"
          />
          <line
            x1={plotLeft}
            y1={plotTop}
            x2={plotLeft}
            y2={plotBottom}
            stroke={COLORS.axis}
            strokeWidth={1}
            className="deck-survey-chart-axis"
          />

          <text
            x={(plotLeft + plotRight) / 2}
            y={plotBottom + X_LABEL_OFFSET}
            textAnchor="middle"
            fill={COLORS.label}
            fontSize={13}
            fontWeight={500}
            className="deck-survey-bar-axis-label"
          >
            Future-ready capabilities
          </text>
          <text
            x={16}
            y={(plotTop + plotBottom) / 2}
            textAnchor="middle"
            fill={COLORS.label}
            fontSize={13}
            fontWeight={500}
            transform={`rotate(-90 16 ${(plotTop + plotBottom) / 2})`}
            className="deck-survey-bar-axis-label"
          >
            Operational execution
          </text>

          <rect
            x={plotLeft}
            y={plotTop}
            width={plotRight - plotLeft}
            height={plotBottom - plotTop}
            fill={REGION_GREEN}
            fillOpacity={0.24}
            mask={`url(#${regionMaskId})`}
            className="deck-sketch-region-fill"
          />

          <line
            x1={regionLine.x1}
            y1={regionLine.y1}
            x2={regionLine.x2}
            y2={regionLine.y2}
            stroke={REGION_GREEN}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="5 7"
            className="deck-sketch-region-stroke"
          />

          {competitors.map((competitor, index) => (
            <LogoMarker
              key={competitor.id}
              cx={xScale(competitor.x)}
              cy={yScale(competitor.y)}
              logo={competitor.logo}
              name={competitor.name}
              featured={competitor.featured}
              invert={competitor.invert}
              delay={220 + index * 140}
            />
          ))}
        </svg>

        <figcaption className="deck-survey-chart-legend mt-3 text-center text-[10px] leading-snug text-muted/70 md:text-[11px]">
          Scores from competitive analysis.
          Logos: official brand assets.
        </figcaption>
      </figure>
    </div>
  );
}

export function SolutionSlide() {
  return (
    <Slide id="lab-operations" variant="muted">
      <SlideLead>
        <SlideIntro>
          <HeadingBlock>Future Landscape</HeadingBlock>
        </SlideIntro>
        <TextBlock size="sm">
          Aarthi matches peers on future-ready tech, but execution
          gap compared to digital leaders leaves delivery below scale.
        </TextBlock>
      </SlideLead>
      <SlideBody>
        <FutureReadinessChart />
      </SlideBody>
    </Slide>
  );
}
