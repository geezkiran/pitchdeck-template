"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { BlockProps, FeatureItem } from "./types";

export interface CarouselFeatureItem extends FeatureItem {
  accent?: "blue" | "purple" | "green" | "sand";
}

interface FeatureCarouselProps extends BlockProps {
  features: CarouselFeatureItem[];
}

const accentStyles = {
  blue: "from-[#e4f2fc] via-[#edf6ff] to-[#f5faff]",
  purple: "from-[#f0e8ff] via-[#f6f0ff] to-[#faf7ff]",
  green: "from-[#e6f7ef] via-[#eefbf4] to-[#f4fdf8]",
  sand: "from-[#f5f0e8] via-[#faf6ef] to-[#fdfbf7]",
};

const defaultAccents: CarouselFeatureItem["accent"][] = [
  "blue",
  "purple",
  "green",
  "sand",
];

function FeatureCarouselCard({
  icon,
  title,
  description,
  accent = "blue",
}: CarouselFeatureItem) {
  return (
    <article
      className={cn(
        "flex w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-[22px]",
        "border border-black/[0.06] bg-background shadow-[var(--shadow-soft)]",
        "transition-shadow duration-300 hover:shadow-[var(--shadow-card)]",
        "sm:w-[280px] md:w-[300px]"
      )}
    >
      <div
        className={cn(
          "flex min-h-[200px] flex-1 items-center justify-center bg-gradient-to-b px-6 py-10 md:min-h-[220px] md:py-12",
          accentStyles[accent]
        )}
      >
        {icon && (
          <div className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] [&_svg]:h-[4.5rem] [&_svg]:w-[4.5rem] md:[&_svg]:h-20 md:[&_svg]:w-20">
            {icon}
          </div>
        )}
      </div>
      <div className="shrink-0 border-t border-black/[0.04] bg-background px-5 py-5 md:px-6 md:py-6">
        <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-[0.9375rem]">
          {description}
        </p>
      </div>
    </article>
  );
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous card" : "Next card"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.12]",
        "bg-background/95 text-muted shadow-[var(--shadow-soft)] backdrop-blur-sm",
        "transition-colors hover:border-black/20 hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-30"
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

export function FeatureCarousel({
  features,
  className,
}: FeatureCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = scrollRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, features.length]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = scrollRef.current;
    const card = track?.querySelector("article");
    if (!track || !card) return;

    const gap = 16;
    const step = card.getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div className={cn("relative min-w-0", className)}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent md:w-12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent md:w-12"
        aria-hidden
      />

      <div
        ref={scrollRef}
        className="deck-carousel flex gap-4 overflow-x-auto overscroll-x-contain pb-2 pl-10 pr-8 snap-x snap-mandatory scroll-pl-10 md:pl-12 md:pr-10 md:scroll-pl-12"
        tabIndex={0}
        role="region"
        aria-label="Feature highlights"
      >
        {features.map((feature, index) => (
          <FeatureCarouselCard
            key={feature.title}
            {...feature}
            accent={feature.accent ?? defaultAccents[index % defaultAccents.length]}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2 pr-1 md:pr-2">
        <CarouselArrow
          direction="prev"
          disabled={!canScrollLeft}
          onClick={() => scrollByCard(-1)}
        />
        <CarouselArrow
          direction="next"
          disabled={!canScrollRight}
          onClick={() => scrollByCard(1)}
        />
      </div>
    </div>
  );
}
