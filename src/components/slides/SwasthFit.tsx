"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BentoGrid, HeadingBlock, Slide, SlideBody } from "@/components/shared";

export function SwasthFitSlide() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <Slide
      id="swasthfit"
      className="pt-14 md:pt-10"
      contentClassName="gap-2 md:gap-3"
    >
      <SlideBody className="mt-0">
        <div className="flex items-center gap-4">
          <HeadingBlock size="xl" className="text-left">
            <span className="text-accent">SwasthFit</span>{" "}
            by Dr Lal PathLab
          </HeadingBlock>
          <button
            type="button"
            aria-label="Open"
            onClick={() => setOpen(true)}
            className="flex shrink-0 translate-y-[5px] items-center justify-center rounded-full bg-black/[0.06] p-3 text-neutral-400 transition-colors hover:bg-black/[0.1]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </SlideBody>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[200] flex flex-col bg-background p-6 pt-16 md:p-10 md:pt-20"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.12] bg-background text-muted transition-colors hover:border-black/20 hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <BentoGrid className="min-h-0 flex-1" />
          </div>,
          document.body
        )}
    </Slide>
  );
}
