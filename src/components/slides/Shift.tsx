"use client";

import { useState } from "react";
import { HeadingBlock, Slide, SlideLead } from "@/components/shared";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    q: "Where am I?",
    a: "A personalised health baseline, built the moment a patient walks in — vitals, labs, and history unified into one clear starting point, with risk factors and trends flagged early instead of buried in old reports, so the patient, the doctor, and the wider care team are all working from the same shared view.",
  },
  {
    q: "What changed?",
    a: "Progress since your last visit, laid out as a clear before-and-after — the readings that improved, the ones that still need attention, and the trend line behind each, so patients see momentum instead of a disconnected snapshot each time they return.",
  },
  {
    q: "What's next?",
    a: "Guided follow-ups & family care, with the next test, consult, or screening surfaced automatically based on what was found this visit, and the same guidance extended to spouses, parents, and children so the whole family stays on a proactive care rhythm rather than reacting to problems.",
  },
  {
    q: "What's relevant?",
    a: "Aarthi services, surfaced at the right moment — the specific diagnostic, specialist, or programme that fits a patient's current results and history, recommended when it's actually useful rather than pushed as a generic upsell.",
  },
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
      <div className="flex flex-col gap-10">
        <SlideLead className="max-w-5xl">
          <HeadingBlock
            size="xl"
            className="text-foreground text-[4.1875rem] leading-[0.98]"
          >
            A patient-first experience,<br /> organised around four questions.
          </HeadingBlock>
        </SlideLead>

        <div className="flex flex-col gap-4">
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
                  className="flex w-full items-center gap-3 px-7 py-5 text-left"
                >
                  <span className="flex-1 text-[1.75rem] font-semibold tracking-[-0.02em] text-foreground">
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
                    <p className="px-7 pb-5 text-lg font-medium leading-snug text-muted">
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
