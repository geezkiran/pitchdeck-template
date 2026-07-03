"use client";

import { cn } from "@/lib/utils";
import { HeadingBlock, Slide } from "@/components/shared";

interface MetricColumn {
  id: string;
  text: string;
  tagline: string;
  value: string;
}

const columns: MetricColumn[] = [
  {
    id: "acquisition",
    text: "WhatsApp booking, secure reports, and UPI flows lift new patient volume by upto 45%. Those acquiring patients entirely through digital channels will redefine competitive dynamics.",
    tagline: "Increase upto",
    value: "45%",
  },
  {
    id: "retention",
    text: "Reports bundled with tele-consult drive repeat bookings within the measured retention window by 70%. This shifts the transaction from a one-off test to an ongoing healthcare relationship.",
    tagline: "Higher rebooking rate",
    value: "70%",
  },
  {
    id: "telemedicine",
    text: "India's telemedicine market is projected to grow ~5×, reaching US$15.1 billion by 2030 reflecting a Compound Annual Growth Rate (CAGR) of approximately 21%.",
    tagline: "Growth",
    value: "5x",
  },
  {
    id: "home-collection",
    text: " Over 75% of customers now prefer home sample collection. This massive shift in consumer behavior is primarily driven by the convenience of not having to travel, the elimination of waiting room times, and the ease of booking slots.",
    tagline: "D2C Shift",
    value: "75%",
  },
];

function MetricColumn({
  text,
  tagline,
  value,
  showDivider,
}: MetricColumn & { showDivider: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-[10rem] flex-col justify-between py-1 md:min-h-[12rem] lg:min-h-[14rem]",
        showDivider && "border-black/[0.12] lg:border-l lg:pl-8 xl:pl-10"
      )}
    >
      <p className="max-w-[11rem] text-[13px] leading-[1.45] text-foreground/75 md:text-sm md:leading-[1.5]">
        {text}
      </p>
      <div className="mt-8 flex flex-col gap-1.5">
        <p className="text-[12px] font-semibold leading-snug text-muted/80 md:text-sm">
          {tagline}
        </p>
        <p className="text-[3.25rem] font-bold leading-none tracking-[-0.04em] md:text-[4.25rem] lg:text-[5.25rem] xl:text-[5.75rem]">
          {value}
        </p>
      </div>
    </div>
  );
}

export function SolutionSlide() {
  return (
    <Slide
      id="lab-operations"
      variant="default"
      centerContent={false}
      className="pt-14 md:pt-16"
      contentClassName="min-h-0 flex-1 justify-start gap-0"
    >
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <HeadingBlock size="xl" className="max-w-[44rem] text-left">
          Customer acquisition and retention
        </HeadingBlock>

        <div className="mt-auto grid w-full flex-1 grid-cols-1 gap-10 pt-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:pt-20">
          {columns.map((column, index) => (
            <MetricColumn
              key={column.id}
              {...column}
              showDivider={index > 0}
            />
          ))}
        </div>
      </div>
    </Slide>
  );
}
