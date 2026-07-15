"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HeadingBlock,
  Slide,
  SlideBody,
  SlideIntro,
  SlideLead,
} from "@/components/shared";

interface Pillar {
  id: string;
  title: string;
  shortLabel: string;
  before: string;
  arcs: [string, string, string];
}

const pillars: Pillar[] = [
  {
    id: "personalisation",
    title: "Digital personalisation",
    shortLabel: "Personalisation",
    before:
      "Use previous reports, age, gender, risk profile and family history to make the experience relevant.",
    arcs: ["#a142f4", "#4285f4", "#34a853"],
  },
  {
    id: "repeat",
    title: "Repeat behaviour",
    shortLabel: "Repeat behaviour",
    before:
      "Remind customers when an annual or clinically appropriate follow-up check is due.",
    arcs: ["#4285f4", "#ea4335", "#fbbc04"],
  },
  {
    id: "packages",
    title: "Higher-value packages",
    shortLabel: "Higher value",
    before:
      "Move customers from basic screening toward deeper packages when their health context justifies it.",
    arcs: ["#4285f4", "#34a853", "#fbbc04"],
  },
  {
    id: "margin",
    title: "Margin accretion",
    shortLabel: "Margin accretion",
    before:
      "Increase tests and revenue per customer while leveraging the existing laboratory, centre and home-collection infrastructure.",
    arcs: ["#34a853", "#4285f4", "#ea4335"],
  },
];

function getCardFlexClass(index: number, activeIndex: number, expanded: boolean) {
  if (expanded) return "z-10 flex-[1.65]";

  const distance = Math.abs(index - activeIndex);
  if (distance === 1) return "flex-[0.92]";

  return "flex-1";
}

function PillarCard({
  pillar,
  index,
  activeIndex,
  expanded,
  onEnter,
}: {
  pillar: Pillar;
  index: number;
  activeIndex: number;
  expanded: boolean;
  onEnter: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      onFocus={onEnter}
      tabIndex={0}
      className={cn(
        "relative flex min-w-0 flex-col rounded-[20px] border border-black/[0.06] bg-background outline-none",
        expanded ? "overflow-visible" : "overflow-hidden",
        "transition-[flex-grow,transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        getCardFlexClass(index, activeIndex, expanded),
        expanded && "scale-[1.03] shadow-[var(--shadow-card)]"
      )}
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col px-6 py-8 transition-[opacity,transform] duration-500",
          expanded
            ? "scale-100 opacity-100"
            : "pointer-events-none absolute inset-0 scale-[0.98] opacity-0"
        )}
      >
        <h3 className="mt-2 text-[1.975rem] font-semibold leading-tight tracking-[-0.02em] text-primary">
          {pillar.title}
        </h3>
        <div className="mt-5 min-h-0 overflow-y-auto text-[0.9375rem] leading-relaxed">
          <p className="text-muted">{pillar.before}</p>
        </div>
      </div>

      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col items-center justify-end gap-5 px-2 pb-8 pt-6 transition-[opacity,transform] duration-500",
          expanded
            ? "pointer-events-none absolute inset-0 scale-[0.96] opacity-0"
            : "scale-100 opacity-100"
        )}
      >
        <p className="max-w-none text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.1em] text-muted">
          {pillar.shortLabel}
        </p>
      </div>
    </article>
  );
}

function PillarCardRow() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="flex h-[min(58dvh,440px)] w-full min-w-0 gap-3 overflow-visible"
      role="list"
      aria-label="Growth flywheel pillars"
    >
      {pillars.map((pillar, index) => (
        <PillarCard
          key={pillar.id}
          pillar={pillar}
          index={index}
          activeIndex={activeIndex}
          expanded={activeIndex === index}
          onEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}

export function BusinessModelSlide() {
  return (
    <Slide
      id="proposed-changes"
      variant="muted"
      contentClassName="min-h-0 gap-6"
    >
      <SlideLead>
        <SlideIntro>
          <HeadingBlock gradient size="xl">
            The growth flywheel
          </HeadingBlock>
        </SlideIntro>
      </SlideLead>
      <SlideBody className="min-h-0 flex-1 justify-end pb-2">
        <PillarCardRow />
      </SlideBody>
    </Slide>
  );
}
