"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Slide } from "@/components/shared";

function ImpactSpotlight() {
  const imageSrc = "/images/Aarthiscan.png";
  const imageMaxHeight = "min(calc(100dvh - 6rem), 897px)";

  return (
    <div
      className={cn(
        "deck-spotlight-sync relative w-full min-w-0 overflow-visible",
        "grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,46%)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,52%)] lg:gap-14"
      )}
    >
      <div className="relative z-10 flex min-w-0 max-w-xl flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-2 md:gap-2.5">
          <h2 className="deck-accent-gradient-text text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem]">
            4 step 
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            Proposed digital workflow across booking, lab operations, and patient delivery.
          </p>
        </div>

        <div className="mt-4 h-px w-full max-w-sm bg-black/[0.08] md:mt-6" />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted md:text-base">Up to</p>
          <p className="deck-accent-gradient-text text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl md:text-7xl">
            90%
          </p>
          <p className="text-sm font-medium text-muted md:text-base">
            faster report turnaround
          </p>
        </div>
      </div>

      <div
        className="relative hidden min-h-0 min-w-0 items-center justify-end overflow-visible md:flex"
        aria-hidden
      >
        <Image
          src={imageSrc}
          alt="Aarthi Scan app displaying patient reports"
          width={439}
          height={897}
          priority
          className="h-auto w-auto origin-right scale-[1.6] object-contain lg:translate-y-[40%] xl:translate-y-0"
          style={{ maxHeight: imageMaxHeight }}
        />
      </div>
    </div>
  );
}

export function ImpactSlide() {
  return (
    <Slide
      id="impact"
      className="overflow-visible"
      footer={
        <p className="text-left text-[10px] leading-snug text-muted/70 md:text-[11px]">
          Image shown is a prototype and is subject to changes in the production-ready application.
        </p>
      }
    >
      <ImpactSpotlight />
    </Slide>
  );
}
