import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  HeadingBlock,
  Slide,
  SlideBody,
  SlideIntro,
  SlideLead,
  TextBlock,
} from "@/components/shared";

type EvolutionSegmentKey =
  | "totallyDifferent"
  | "greatDealDifferent"
  | "someDifferences"
  | "noDifferent";

type LikelihoodKey = "highlyLikely" | "somewhatLikely" | "unlikely";

interface SurveySegment<K extends string> {
  key: K;
  label: string;
  color: string;
  textColor: string;
}

interface SurveyBar<K extends string> {
  label: string;
  values: Record<K, number>;
}

const evolutionSegments: SurveySegment<EvolutionSegmentKey>[] = [
  {
    key: "totallyDifferent",
    label: "Totally different",
    color: "#d8ead0",
    textColor: "#3d5c32",
  },
  {
    key: "greatDealDifferent",
    label: "A great deal different but still recognisable",
    color: "#86b84a",
    textColor: "#ffffff",
  },
  {
    key: "someDifferences",
    label: "Some differences",
    color: "#b8d96a",
    textColor: "#3d5c32",
  },
  {
    key: "noDifferent",
    label: "No different",
    color: "#2f5f1a",
    textColor: "#ffffff",
  },
];

const evolutionBars: SurveyBar<EvolutionSegmentKey>[] = [
  {
    label: "3–5 years",
    values: {
      totallyDifferent: 2.8,
      greatDealDifferent: 19.3,
      someDifferences: 63.0,
      noDifferent: 14.9,
    },
  },
  {
    label: "6–10 years",
    values: {
      totallyDifferent: 18.0,
      greatDealDifferent: 49.0,
      someDifferences: 31.0,
      noDifferent: 2.0,
    },
  },
];

const likelihoodSegments: SurveySegment<LikelihoodKey>[] = [
  {
    key: "highlyLikely",
    label: "Highly likely",
    color: "#2f5f1a",
    textColor: "#ffffff",
  },
  {
    key: "somewhatLikely",
    label: "Somewhat likely",
    color: "#b8d96a",
    textColor: "#3d5c32",
  },
  {
    key: "unlikely",
    label: "Unlikely",
    color: "#5b9bd5",
    textColor: "#ffffff",
  },
];

const technologyRows: SurveyBar<LikelihoodKey>[] = [
  {
    label: "Cloud computing",
    values: { highlyLikely: 64, somewhatLikely: 33, unlikely: 4 },
  },
  {
    label: "Artificial intelligence",
    values: { highlyLikely: 60, somewhatLikely: 37, unlikely: 2 },
  },
  {
    label: "Blockchain technology",
    values: { highlyLikely: 40, somewhatLikely: 49, unlikely: 11 },
  },
  {
    label: "Nanotechnology",
    values: { highlyLikely: 36, somewhatLikely: 48, unlikely: 16 },
  },
  {
    label: "VR / AR",
    values: { highlyLikely: 35, somewhatLikely: 56, unlikely: 10 },
  },
  {
    label: "Quantum computing",
    values: { highlyLikely: 26, somewhatLikely: 49, unlikely: 25 },
  },
  {
    label: "Digital twins",
    values: { highlyLikely: 23, somewhatLikely: 56, unlikely: 20 },
  },
];

const CHART_SCALE = 1.2;

const CHART_SIZE = {
  width: Math.round(440 * CHART_SCALE),
  height: Math.round(250 * CHART_SCALE),
  svgHeightClass: "h-[264px] md:h-[288px]",
  legendMinHeightClass: "min-h-[77px]",
} as const;

const EVOLUTION_CHART = {
  ...CHART_SIZE,
  margin: {
    top: Math.round(8 * CHART_SCALE),
    right: Math.round(12 * CHART_SCALE),
    bottom: Math.round(32 * CHART_SCALE),
    left: Math.round(40 * CHART_SCALE),
  },
  barWidth: Math.round(84 * CHART_SCALE),
  barGap: Math.round(60 * CHART_SCALE),
} as const;

const TECH_CHART = {
  ...CHART_SIZE,
  margin: {
    top: Math.round(8 * CHART_SCALE),
    right: Math.round(12 * CHART_SCALE),
    bottom: Math.round(32 * CHART_SCALE),
    left: Math.round(96 * CHART_SCALE),
  },
  barHeight: Math.round(19 * CHART_SCALE),
  rowGap: Math.round(11 * CHART_SCALE),
} as const;

const SEGMENT_STAGGER_MS = 100;
const BAR_GAP_MS = 280;
const CHART_INTRO_MS = 120;
const H_ROW_STAGGER_MS = 55;
const H_SEGMENT_STAGGER_MS = 70;

function getEvolutionSegmentDelay(barIndex: number, segmentIndex: number) {
  return (
    CHART_INTRO_MS +
    barIndex *
      (evolutionSegments.length * SEGMENT_STAGGER_MS + BAR_GAP_MS) +
    segmentIndex * SEGMENT_STAGGER_MS
  );
}

function getEvolutionBarLabelDelay(barIndex: number) {
  return (
    CHART_INTRO_MS +
    barIndex *
      (evolutionSegments.length * SEGMENT_STAGGER_MS + BAR_GAP_MS) +
    evolutionSegments.length * SEGMENT_STAGGER_MS +
    80
  );
}

const evolutionLegendDelayMs =
  CHART_INTRO_MS +
  evolutionBars.length *
    (evolutionSegments.length * SEGMENT_STAGGER_MS + BAR_GAP_MS) +
  120;

function getTechSegmentDelay(rowIndex: number, segmentIndex: number) {
  return (
    CHART_INTRO_MS +
    rowIndex *
      (likelihoodSegments.length * H_SEGMENT_STAGGER_MS + H_ROW_STAGGER_MS) +
    segmentIndex * H_SEGMENT_STAGGER_MS
  );
}

const techLegendDelayMs =
  CHART_INTRO_MS +
  technologyRows.length *
    (likelihoodSegments.length * H_SEGMENT_STAGGER_MS + H_ROW_STAGGER_MS) +
  120;

function SurveyLegend({
  items,
  delayMs,
}: {
  items: SurveySegment<string>[];
  delayMs: number;
}) {
  return (
    <figcaption
      className={`deck-survey-chart-legend mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:gap-x-4 ${CHART_SIZE.legendMinHeightClass}`}
      style={{ "--legend-delay": `${delayMs}ms` } as CSSProperties}
    >
      {items.map((segment) => (
        <div
          key={segment.key}
          className="flex items-center gap-1.5 text-[9px] font-medium text-muted md:text-[10px]"
        >
          <span
            className="h-2 w-2 shrink-0 rounded-sm"
            style={{ backgroundColor: segment.color }}
            aria-hidden
          />
          <span>{segment.label}</span>
        </div>
      ))}
    </figcaption>
  );
}

function DiagnosticsEvolutionChart() {
  const plotTop = EVOLUTION_CHART.margin.top;
  const plotBottom = EVOLUTION_CHART.height - EVOLUTION_CHART.margin.bottom;
  const plotLeft = EVOLUTION_CHART.margin.left;
  const plotRight = EVOLUTION_CHART.width - EVOLUTION_CHART.margin.right;
  const plotHeight = plotBottom - plotTop;

  const scaleY = (value: number) =>
    plotBottom - (value / 100) * plotHeight;

  const barsStartX =
    plotLeft +
    (plotRight -
      plotLeft -
      (EVOLUTION_CHART.barWidth * 2 + EVOLUTION_CHART.barGap)) /
      2;

  const yTicks = [0, 20, 40, 60, 80, 100];

  return (
    <figure className="deck-survey-chart flex w-full min-w-0 flex-col">
      <div className={`w-full shrink-0 ${CHART_SIZE.svgHeightClass}`}>
        <svg
          viewBox={`0 0 ${EVOLUTION_CHART.width} ${EVOLUTION_CHART.height}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Stacked bar chart showing clinician expectations for how different diagnostics will look in 3 to 5 years versus 6 to 10 years"
        >
        {yTicks.map((tick) => {
          const y = scaleY(tick);
          return (
            <g key={tick} className="deck-survey-chart-grid">
              <line
                x1={plotLeft}
                y1={y}
                x2={plotRight}
                y2={y}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth={1}
              />
              <text
                x={plotLeft - 6}
                y={y + 4}
                textAnchor="end"
                className="deck-survey-chart-tick fill-muted text-[9px] font-medium"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {evolutionBars.map((bar, barIndex) => {
          const barX =
            barsStartX +
            barIndex * (EVOLUTION_CHART.barWidth + EVOLUTION_CHART.barGap);
          let cumulative = 0;

          return (
            <g key={bar.label}>
              {evolutionSegments.map((segment, segmentIndex) => {
                const value = bar.values[segment.key];
                const segmentBottom = scaleY(cumulative);
                cumulative += value;
                const segmentTop = scaleY(cumulative);
                const segmentHeight = segmentBottom - segmentTop;
                const showLabel = value >= 8;
                const delay = getEvolutionSegmentDelay(barIndex, segmentIndex);

                return (
                  <g key={segment.key}>
                    <rect
                      x={barX}
                      y={segmentTop}
                      width={EVOLUTION_CHART.barWidth}
                      height={segmentHeight}
                      fill={segment.color}
                      className="deck-survey-bar-segment"
                      style={
                        { "--segment-delay": `${delay}ms` } as CSSProperties
                      }
                    />
                    {showLabel && (
                      <text
                        x={barX + EVOLUTION_CHART.barWidth / 2}
                        y={segmentTop + segmentHeight / 2 + 3}
                        textAnchor="middle"
                        className="deck-survey-bar-label text-[10px] font-semibold"
                        fill={segment.textColor}
                        style={
                          { "--segment-delay": `${delay}ms` } as CSSProperties
                        }
                      >
                        {value.toFixed(value % 1 === 0 ? 0 : 1)}%
                      </text>
                    )}
                  </g>
                );
              })}

              <text
                x={barX + EVOLUTION_CHART.barWidth / 2}
                y={plotBottom + 20}
                textAnchor="middle"
                className="deck-survey-bar-axis-label fill-foreground text-[10px] font-semibold"
                style={
                  {
                    "--segment-delay": `${getEvolutionBarLabelDelay(barIndex)}ms`,
                  } as CSSProperties
                }
              >
                {bar.label}
              </text>
            </g>
          );
        })}

        <line
          x1={plotLeft}
          y1={plotBottom}
          x2={plotRight}
          y2={plotBottom}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
          className="deck-survey-chart-axis"
        />
      </svg>
      </div>

      <SurveyLegend
        items={evolutionSegments}
        delayMs={evolutionLegendDelayMs}
      />
    </figure>
  );
}

function getRowTotal(values: Record<LikelihoodKey, number>) {
  return likelihoodSegments.reduce((sum, segment) => sum + values[segment.key], 0);
}

function TechnologyAdoptionChart() {
  const plotTop = TECH_CHART.margin.top;
  const plotLeft = TECH_CHART.margin.left;
  const plotRight = TECH_CHART.width - TECH_CHART.margin.right;
  const plotBottom = TECH_CHART.height - TECH_CHART.margin.bottom;
  const plotWidth = plotRight - plotLeft;

  const scaleX = (value: number) => plotLeft + (value / 100) * plotWidth;
  const xTicks = [0, 20, 40, 60, 80, 100];

  return (
    <figure className="deck-survey-chart flex w-full min-w-0 flex-col">
      <div className={`w-full shrink-0 ${CHART_SIZE.svgHeightClass}`}>
        <svg
          viewBox={`0 0 ${TECH_CHART.width} ${TECH_CHART.height}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Horizontal stacked bar chart showing planned technology adoption by diagnostics companies over the next five years"
        >
        {xTicks.map((tick) => {
          const x = scaleX(tick);
          return (
            <g key={tick} className="deck-survey-chart-grid">
              <line
                x1={x}
                y1={plotTop}
                x2={x}
                y2={plotBottom}
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={plotBottom + 16}
                textAnchor="middle"
                className="deck-survey-chart-tick fill-muted text-[9px] font-medium"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {technologyRows.map((row, rowIndex) => {
          const rowY =
            plotTop + rowIndex * (TECH_CHART.barHeight + TECH_CHART.rowGap);
          const rowTotal = getRowTotal(row.values);
          let cumulative = 0;
          const rowLabelDelay = getTechSegmentDelay(rowIndex, 0);

          return (
            <g key={row.label}>
              <text
                x={plotLeft - 6}
                y={rowY + TECH_CHART.barHeight / 2 + 3}
                textAnchor="end"
                className="deck-survey-row-label fill-foreground text-[10px] font-medium md:text-[11px]"
                style={
                  { "--segment-delay": `${rowLabelDelay}ms` } as CSSProperties
                }
              >
                {row.label}
              </text>

              {likelihoodSegments.map((segment, segmentIndex) => {
                const value = row.values[segment.key];
                const share = (value / rowTotal) * 100;
                const segmentLeft = scaleX(cumulative);
                cumulative += share;
                const segmentRight = scaleX(cumulative);
                const segmentWidth = segmentRight - segmentLeft;
                const showLabel = value >= 9;
                const delay = getTechSegmentDelay(rowIndex, segmentIndex);
                const isLastSegment = segmentIndex === likelihoodSegments.length - 1;

                const renderedWidth = isLastSegment
                  ? plotRight - segmentLeft
                  : segmentWidth;

                return (
                  <g key={segment.key}>
                    <rect
                      x={segmentLeft}
                      y={rowY}
                      width={renderedWidth}
                      height={TECH_CHART.barHeight}
                      fill={segment.color}
                      className="deck-survey-hbar-segment"
                      style={
                        { "--segment-delay": `${delay}ms` } as CSSProperties
                      }
                    />
                    {showLabel && (
                      <text
                        x={segmentLeft + renderedWidth / 2}
                        y={rowY + TECH_CHART.barHeight / 2 + 3}
                        textAnchor="middle"
                        className="deck-survey-bar-label text-[8.5px] font-semibold md:text-[10px]"
                        fill={segment.textColor}
                        style={
                          { "--segment-delay": `${delay}ms` } as CSSProperties
                        }
                      >
                        {value}%
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        <line
          x1={plotLeft}
          y1={plotBottom}
          x2={plotRight}
          y2={plotBottom}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
          className="deck-survey-chart-axis"
        />
        <line
          x1={plotRight}
          y1={plotTop}
          x2={plotRight}
          y2={plotBottom}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
          className="deck-survey-chart-axis"
        />
      </svg>
      </div>

      <SurveyLegend
        items={likelihoodSegments}
        delayMs={techLegendDelayMs}
      />
    </figure>
  );
}

function ChartFootnote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "min-w-0 pt-4 text-center text-[9px] leading-snug text-muted/70 md:pt-5 md:text-[10px]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function IndustryDirectionSlide() {
  return (
    <Slide id="industry-direction">
      <SlideLead>
        <SlideIntro>
          <HeadingBlock>Where diagnostics is heading</HeadingBlock>
        </SlideIntro>
        <TextBlock size="sm">
          Disruptive technologies will transform diagnostics over the next five
          to ten years.
        </TextBlock>
      </SlideLead>
      <SlideBody>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-4 xl:gap-x-8">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <DiagnosticsEvolutionChart />
          </div>
          <ChartFootnote className="lg:col-start-1 lg:row-start-2">
            Deloitte analysis of Sermo survey of 751 clinicians.
             How different do you envision the future of diagnostics
            will look in 3–5 years and 6–10 years?
          </ChartFootnote>
          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <TechnologyAdoptionChart />
          </div>
          <ChartFootnote className="lg:col-start-2 lg:row-start-2">
            Deloitte analysis of iResearch survey of 250 diagnostics
            companies. What technologies does your organisation plan
            to introduce over the next five years to better understand,
            protect, and use data from medical devices?
          </ChartFootnote>
        </div>
      </SlideBody>
    </Slide>
  );
}
