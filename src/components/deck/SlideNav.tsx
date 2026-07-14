"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface SlideNavProps {
  labels: string[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const MAX_VISIBLE_DOTS = 7;
const SLOT_WIDTH = 14;

function clampStart(start: number, total: number) {
  return Math.max(0, Math.min(start, Math.max(0, total - MAX_VISIBLE_DOTS)));
}

export function SlideNav({ labels, activeIndex, onNavigate }: SlideNavProps) {
  const total = labels.length;

  const [start, setStart] = useState(() =>
    clampStart(activeIndex - Math.floor(MAX_VISIBLE_DOTS / 2), total)
  );
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);

    let nextStart = start;
    if (activeIndex > start + MAX_VISIBLE_DOTS - 1) {
      // stepped past the right edge: jump so active becomes the leftmost dot
      nextStart = activeIndex;
    } else if (activeIndex < start) {
      // stepped past the left edge: jump so active becomes the rightmost dot
      nextStart = activeIndex - MAX_VISIBLE_DOTS + 1;
    }
    nextStart = clampStart(nextStart, total);

    if (nextStart !== start) {
      setStart(nextStart);
    }
  }

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-border bg-background/72 backdrop-blur-2xl backdrop-saturate-150"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 md:px-20 md:py-4">
        <p
          key={activeIndex}
          className="deck-nav-count text-xs font-medium tabular-nums text-muted md:text-sm"
        >
          {activeIndex + 1} / {labels.length}
        </p>

        <div
          className="overflow-hidden"
          style={{ width: MAX_VISIBLE_DOTS * SLOT_WIDTH }}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${start * SLOT_WIDTH}px)` }}
          >
            {labels.map((label, index) => (
              <div
                key={label}
                className="flex shrink-0 items-center justify-center"
                style={{ width: SLOT_WIDTH }}
              >
                <button
                  type="button"
                  aria-label={`Go to slide ${index + 1}: ${label}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                  onClick={() => onNavigate(index)}
                  className={cn(
                    "deck-nav-dot rounded-full",
                    activeIndex === index
                      ? "h-1.5 w-3 bg-foreground/85"
                      : "h-1.5 w-1.5 bg-foreground/20 hover:bg-foreground/35"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
