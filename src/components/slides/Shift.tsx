"use client";

import { useState } from "react";
import { HeadingBlock, Slide, SlideLead } from "@/components/shared";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  { q: "Where am I?", a: "A personalised health baseline" },
  { q: "What changed?", a: "Progress since your last visit" },
  { q: "What's next?", a: "Guided follow-ups & family care" },
  { q: "What's relevant?", a: "Aarthi services, surfaced at the right moment" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "h-4 w-4 shrink-0 text-muted transition-transform duration-300",
        open && "rotate-180 text-accent"
      )}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function ShiftSlide() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Slide id="shift" variant="gradient" contentClassName="justify-center">
      <div className="flex flex-col gap-8 md:gap-10">
        <SlideLead className="max-w-5xl">
          <HeadingBlock
            size="xl"
            className="text-foreground lg:text-[4.1875rem] lg:leading-[0.98]"
          >
            A patient-first experience,<br /> organised around four questions.
          </HeadingBlock>
        </SlideLead>

        <div className="flex flex-col gap-3 md:gap-4">
          {QUESTIONS.map(({ q, a }, i) => {
            const open = openIndex === i;
            return (
              <div
                key={q}
                className={cn(
                  "rounded-[20px] border bg-surface-elevated shadow-[var(--shadow-soft)] transition-colors",
                  open ? "border-accent/40" : "border-surface-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-6 py-4 text-left md:px-7 md:py-5"
                >
                  <span className="flex-1 text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-[1.75rem]">
                    {q}
                  </span>
                  <ChevronIcon open={open} />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-[var(--ease-apple)]",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-base font-medium leading-snug text-muted md:px-7 md:pb-5 md:text-lg">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}
