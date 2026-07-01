"use client";

import { cn } from "@/lib/utils";

interface SlideNavProps {
  labels: string[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export function SlideNav({ labels, activeIndex, onNavigate }: SlideNavProps) {
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

        <div className="flex items-center justify-end gap-1.5 md:gap-2">
          {labels.map((label, index) => (
            <button
              key={label}
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
          ))}
        </div>
      </div>
    </nav>
  );
}
