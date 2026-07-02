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
  shortLabel: string;
  logo?: string;
  x: number;
  y: number;
  featured?: boolean;
  invert?: boolean;
}

const competitors: CompetitorPoint[] = [
  {
    id: "aarthi",
    name: "Aarthi Scans",
    shortLabel: "Aarthi",
    logo: "/images/competitors/aarthi.webp",
    x: 48,
    y: 54,
    featured: true,
  },
  {
    id: "orange",
    name: "Orange Health",
    shortLabel: "Orange",
    logo: "/images/competitors/orange-health.svg",
    x: 70,
    y: 82,
  },
  {
    id: "lal",
    name: "Dr. Lal PathLabs",
    shortLabel: "Dr. Lal",
    logo: "/images/competitors/lal-pathlabs.png",
    x: 86,
    y: 90,
  },
  {
    id: "srl",
    name: "SRL Diagnostics",
    shortLabel: "SRL",
    x: 82,
    y: 86,
  },
  {
    id: "apollo",
    name: "Apollo Diagnostics",
    shortLabel: "Apollo",
    x: 78,
    y: 92,
  },
  {
    id: "metropolis",
    name: "Metropolis Healthcare",
    shortLabel: "Metropolis",
    logo: "/images/competitors/metropolis-logo.svg",
    x: 88,
    y: 78,
    invert: true,
  },
  {
    id: "thyrocare",
    name: "Thyrocare",
    shortLabel: "Thyrocare",
    x: 84,
    y: 84,
  },
  {
    id: "max",
    name: "Max Healthcare",
    shortLabel: "Max",
    x: 66,
    y: 74,
  },
  {
    id: "vijaya",
    name: "Vijaya Diagnostic Centre",
    shortLabel: "Vijaya",
    x: 56,
    y: 70,
  },
  {
    id: "24x7",
    name: "24×7 Labs",
    shortLabel: "24×7",
    x: 60,
    y: 64,
  },
  {
    id: "diligent",
    name: "Diligent Health",
    shortLabel: "Diligent",
    x: 46,
    y: 62,
  },
  {
    id: "quest",
    name: "Quest Diagnostics",
    shortLabel: "Quest",
    x: 92,
    y: 66,
  },
  {
    id: "labcorp",
    name: "LabCorp",
    shortLabel: "LabCorp",
    x: 94,
    y: 60,
  },
  {
    id: "unichem",
    name: "Unichem Laboratories",
    shortLabel: "Unichem",
    x: 42,
    y: 58,
  },
  {
    id: "hitech",
    name: "Hitech Diagnostic Centre",
    shortLabel: "Hitech",
    x: 34,
    y: 52,
  },
  {
    id: "indo-american",
    name: "Indo American Health",
    shortLabel: "Indo American",
    x: 28,
    y: 46,
  },
  {
    id: "satyam",
    name: "Satyam Diagnostic Centre",
    shortLabel: "Satyam",
    x: 38,
    y: 48,
  },
  {
    id: "orchard",
    name: "Orchard Healthcare",
    shortLabel: "Orchard",
    x: 32,
    y: 42,
  },
  {
    id: "redcliffe",
    name: "Redcliffe Labs",
    shortLabel: "Redcliffe",
    x: 64,
    y: 76,
  },
  {
    id: "medanta",
    name: "Medanta The Medicity",
    shortLabel: "Medanta",
    x: 72,
    y: 72,
  },
  {
    id: "agilus",
    name: "Agilus Diagnostics",
    shortLabel: "Agilus",
    x: 54,
    y: 68,
  },
  {
    id: "oncquest",
    name: "Oncquest Laboratories",
    shortLabel: "Oncquest",
    x: 50,
    y: 72,
  },
  {
    id: "medall",
    name: "Medall Diagnostics",
    shortLabel: "Medall",
    x: 58,
    y: 66,
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

function CompanyMarker({
  cx,
  cy,
  logo,
  shortLabel,
  name,
  featured,
  invert,
  delay,
}: {
  cx: number;
  cy: number;
  logo?: string;
  shortLabel: string;
  name: string;
  featured?: boolean;
  invert?: boolean;
  delay: number;
}) {
  const hasLogo = Boolean(logo);
  const width = featured ? 68 : hasLogo ? 56 : Math.min(88, Math.max(42, shortLabel.length * 5.4 + 14));
  const height = featured ? 38 : hasLogo ? 30 : 22;
  const halfW = width / 2;
  const halfH = height / 2;
  const padX = featured ? 7 : 5;
  const padY = featured ? 5 : 4;

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
        rx={hasLogo ? 8 : 999}
        fill="#ffffff"
        stroke={featured ? "rgba(0,113,227,0.35)" : "rgba(0,0,0,0.08)"}
        strokeWidth={featured ? 1.5 : 1}
      />
      {hasLogo ? (
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
      ) : (
        <text
          x={cx}
          y={cy + (featured ? 4 : 3.5)}
          textAnchor="middle"
          fill={featured ? "#0071e3" : "#3a3a3c"}
          fontSize={featured ? 9 : 7.5}
          fontWeight={600}
          aria-label={name}
        >
          {shortLabel}
        </text>
      )}
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
            <CompanyMarker
              key={competitor.id}
              cx={xScale(competitor.x)}
              cy={yScale(competitor.y)}
              logo={competitor.logo}
              shortLabel={competitor.shortLabel}
              name={competitor.name}
              featured={competitor.featured}
              invert={competitor.invert}
              delay={120 + index * 40}
            />
          ))}
        </svg>

        <figcaption className="deck-survey-chart-legend mt-3 text-center text-[10px] leading-snug text-muted/70 md:text-[11px]">
          Representative positioning of 23 diagnostic players. Logos shown where
          official assets are available.
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
