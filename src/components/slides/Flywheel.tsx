"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HeadingBlock,
  Icon3D,
  type Icon3DVariant,
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
  icon: Icon3DVariant;
  imageSrc?: string;
  cardBackground?: string;
  arcs: [string, string, string];
}

const pillars: Pillar[] = [
  {
    id: "personalisation",
    title: "Digital personalisation",
    shortLabel: "Personalisation",
    before:
      "Use previous reports, age, gender, risk profile and family history to make the experience relevant.",
    icon: "memory",
    cardBackground: "/images/activity-tracking.jpeg",
    arcs: ["#a142f4", "#4285f4", "#34a853"],
  },
  {
    id: "repeat",
    title: "Repeat behaviour",
    shortLabel: "Repeat behaviour",
    before:
      "Remind customers when an annual or clinically appropriate follow-up check is due.",
    icon: "tools",
    imageSrc: "/images/scheduling-calendar.png",
    arcs: ["#4285f4", "#ea4335", "#fbbc04"],
  },
  {
    id: "packages",
    title: "Higher-value packages",
    shortLabel: "Higher value",
    before:
      "Move customers from basic screening toward deeper packages when their health context justifies it.",
    icon: "orchestration",
    imageSrc: "/images/sample-tracking-pin.png",
    arcs: ["#4285f4", "#34a853", "#fbbc04"],
  },
  {
    id: "margin",
    title: "Margin accretion",
    shortLabel: "Margin accretion",
    before:
      "Increase tests and revenue per customer while leveraging the existing laboratory, centre and home-collection infrastructure.",
    icon: "guardrails",
    imageSrc: "/images/report-delivery-book.png",
    arcs: ["#34a853", "#4285f4", "#ea4335"],
  },
];

function getCardFlexClass(index: number, activeIndex: number, expanded: boolean) {
  if (expanded) return "z-10 flex-[1.65]";

  const distance = Math.abs(index - activeIndex);
  if (distance === 1) return "flex-[0.92]";

  return "flex-1";
}

function PillarGraphic({
  pillar,
  expanded,
}: {
  pillar: Pillar;
  expanded: boolean;
}) {
  if (pillar.imageSrc) {
    return (
      <Image
        src={pillar.imageSrc}
        alt=""
        width={500}
        height={500}
        className={cn(
          "mb-5 shrink-0 object-contain transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          expanded
            ? "h-32 w-32 scale-110 md:mb-6 md:h-36 md:w-36"
            : "h-28 w-28 md:mb-6 md:h-32 md:w-32"
        )}
      />
    );
  }

  return null;
}

function PillarIcon({ pillar }: { pillar: Pillar }) {
  if (pillar.cardBackground) {
    return null;
  }

  if (pillar.imageSrc) {
    return (
      <Image
        src={pillar.imageSrc}
        alt=""
        width={500}
        height={500}
        className="h-9 w-9 object-contain opacity-30 md:h-10 md:w-10"
      />
    );
  }

  return <Icon3D variant={pillar.icon} size="sm" />;
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
      {pillar.cardBackground ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-500",
            expanded ? "opacity-25" : "opacity-100"
          )}
          style={{ backgroundImage: `url(${pillar.cardBackground})` }}
        />
      ) : null}
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col px-5 py-6 transition-[opacity,transform] duration-500 md:px-6 md:py-8",
          expanded
            ? "scale-100 opacity-100"
            : "pointer-events-none absolute inset-0 scale-[0.98] opacity-0"
        )}
      >
        <PillarGraphic pillar={pillar} expanded={expanded} />
        <h3 className="mt-2 text-[1.625rem] font-semibold leading-tight tracking-[-0.02em] text-primary md:text-[1.975rem]">
          {pillar.title}
        </h3>
        <div className="mt-4 min-h-0 overflow-y-auto text-sm leading-relaxed md:mt-5 md:text-[0.9375rem]">
          <p className="text-muted">{pillar.before}</p>
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col items-center justify-end gap-5 px-2 pb-8 pt-6 transition-[opacity,transform] duration-500",
          expanded
            ? "pointer-events-none absolute inset-0 scale-[0.96] opacity-0"
            : "scale-100 opacity-100"
        )}
      >
        <div className="flex flex-1 items-center justify-center [&_svg]:h-9 [&_svg]:w-9 md:[&_svg]:h-10 md:[&_svg]:w-10">
          <PillarIcon pillar={pillar} />
        </div>
        <p className="max-w-[4.5rem] text-center text-[9px] font-semibold uppercase leading-snug tracking-[0.1em] text-muted md:max-w-none md:text-[10px]">
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
      className="flex h-[min(56dvh,420px)] w-full min-w-0 gap-2 overflow-visible md:h-[min(58dvh,440px)] md:gap-3"
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
      contentClassName="min-h-0 gap-5 md:gap-6"
    >
      <SlideLead>
        <SlideIntro>
          <HeadingBlock gradient size="xl">
            The growth flywheel
          </HeadingBlock>
        </SlideIntro>
      </SlideLead>
      <SlideBody className="min-h-0 flex-1 justify-end pb-1 md:pb-2">
        <PillarCardRow />
      </SlideBody>
    </Slide>
  );
}
