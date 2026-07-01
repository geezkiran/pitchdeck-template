import { cn } from "@/lib/utils";
import { HeadingBlock, Slide, SlideIntro } from "@/components/shared";

interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

const roadmapEntries: TimelineEntry[] = [
  {
    period: "Phase 1 · Q3 2026",
    title: "Digital foundation",
    description:
      "Fix care.aarthiscan.com OTP loops, deploy digital ID onboarding, and add failover on LIMS-to-WhatsApp sync.",
  },
  {
    period: "Phase 2 · Q4 2026",
    title: "Operations & tracking",
    description:
      "End-to-end sample tracking for home collection, phlebotomist route optimization, cold-chain monitoring.",
  },
  {
    period: "Phase 3 · Q1 2027",
    title: "Booking & capacity",
    description:
      "Live slot validation for MRI, CT, and ultrasound across all 200+ centres and home collection.",
  },
  {
    period: "Phase 4 · Q2 2027",
    title: "Intelligence & scale",
    description:
      "Extend 8 AI models to TAT forecasting, Smart Report trend alerts, and predictive inventory for assay kits.",
  },
];

function RoadmapTimelineItem({
  period,
  title,
  description,
  isLast = false,
}: TimelineEntry & { isLast?: boolean }) {
  return (
    <div className="relative flex gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/10" />
        {!isLast && (
          <div className="mt-1 min-h-12 w-px flex-1 bg-surface-border" />
        )}
      </div>
      <div className={cn("pb-8 md:pb-10")}>
        <p className="text-xs font-medium tracking-[-0.01em] text-accent md:text-sm">
          {period}
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-[-0.015em] text-foreground md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export function RoadmapSlide() {
  return (
    <Slide id="roadmap">
      <SlideIntro>
        <HeadingBlock>Phased rollout across 12 states</HeadingBlock>
      </SlideIntro>
      <div>
        {roadmapEntries.map((entry, index) => (
          <RoadmapTimelineItem
            key={entry.title}
            {...entry}
            isLast={index === roadmapEntries.length - 1}
          />
        ))}
      </div>
    </Slide>
  );
}
