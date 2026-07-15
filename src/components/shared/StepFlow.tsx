"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface StepFlowProps extends BlockProps {
  steps: string[];
  /** Number of leading steps rendered as completed (filled, checked). Ignored when autoPlay is true. */
  completed?: number;
  direction?: "horizontal" | "vertical";
  /** Automatically animate through the steps once the component scrolls into view. */
  autoPlay?: boolean;
  /** Restart the animation from the beginning after finishing. Defaults to true. */
  loop?: boolean;
}

/** Time the line/ring takes to travel from one checkpoint to the next. */
const FILL_DURATION = 550;
/** Pause at each checkpoint before the line resumes toward the next one. */
const HOLD_DURATION = 650;
const STEP_DURATION = FILL_DURATION + HOLD_DURATION;
const LOOP_PAUSE = 1600;
const FILL_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Steps through 0..total on an interval once visible in the viewport, then loops (unless disabled). */
function useAutoProgress(total: number, enabled: boolean, loop = true) {
  const [active, setActive] = useState(enabled ? -1 : total);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive((current) => (current < 0 ? 0 : current));
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || active < 0) return;
    if (active >= total && !loop) return;
    const delay = active >= total ? LOOP_PAUSE : STEP_DURATION;
    const timer = setTimeout(() => {
      setActive((a) => (a >= total ? 0 : a + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [active, total, enabled, loop]);

  return { active: enabled ? Math.max(active, 0) : total, containerRef };
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-2.5 w-2.5"
    >
      <path d="M3 8.5 6.2 12 13 4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-2.5 w-2.5"
    >
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.8V8l2.2 1.3" />
    </svg>
  );
}

function StepMarker({ isDone, isCurrent }: { isDone: boolean; isCurrent: boolean }) {
  if (isDone) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors duration-500">
        <CheckIcon />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500",
        isCurrent ? "border-accent text-accent" : "border-muted/30 text-muted"
      )}
    >
      <ClockIcon />
    </span>
  );
}

export function CircularStepFlow({
  steps,
  className,
  accent = false,
  autoPlay = false,
}: Omit<StepFlowProps, "completed"> & { accent?: boolean }) {
  const n = steps.length;
  const radius = 40;
  const { active, containerRef } = useAutoProgress(n, autoPlay);
  // Nodes sit at angle fraction i/n around the full circle (not i/(n-1)),
  // so the ring must fill to the same fraction to land exactly on each checkpoint.
  const progress = n > 0 ? Math.min(active, n) / n : 0;
  const r = 40;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto aspect-square w-80 sm:w-[26rem]", className)}
    >
      <div
        className={cn(
          "absolute inset-[10%] rounded-full border border-dashed",
          accent ? "border-emerald-500/50" : "border-muted/50"
        )}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="butt"
          className="text-emerald-500"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          style={{ transition: `stroke-dashoffset ${FILL_DURATION}ms ${FILL_EASE}` }}
        />
      </svg>
      {steps.map((step, i) => {
        const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        const isDone = i < active;
        const isCurrent = i === active;
        return (
          <div
            key={step}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={cn(
                "flex w-max max-w-[7rem] items-center gap-1.5 rounded-full border-2 bg-surface px-2 py-1 transition-colors duration-500 sm:max-w-[8.5rem]",
                isDone || isCurrent
                  ? "border-emerald-500"
                  : accent
                    ? "border-emerald-500/30"
                    : "border-muted/30"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isCurrent
                      ? "border-2 border-emerald-500 text-emerald-600"
                      : "border-2 border-muted/30 text-muted"
                )}
              >
                {isDone ? <CheckIcon /> : <ClockIcon />}
              </span>
              <span
                className={cn(
                  "text-xs leading-snug transition-colors duration-500 sm:text-sm",
                  isDone || isCurrent ? "text-emerald-700" : "text-muted"
                )}
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StepFlow({
  steps,
  completed = 0,
  className,
  direction = "horizontal",
  autoPlay = false,
  loop = true,
}: StepFlowProps) {
  const { active, containerRef } = useAutoProgress(steps.length, autoPlay, loop);
  const effectiveCompleted = autoPlay ? active : completed;

  if (direction === "vertical") {
    return (
      <div ref={containerRef} className={cn("flex flex-col items-start", className)}>
        {steps.map((step, i) => {
          const isDone = i < effectiveCompleted;
          const isCurrent = i === effectiveCompleted;
          const isLast = i === steps.length - 1;
          const isActiveOrDone = isDone || isCurrent;
          return (
            <div key={step} className={cn("flex items-stretch", !isLast && "flex-1")}>
              <div className="relative flex shrink-0 flex-col items-center">
                <StepMarker isDone={isDone} isCurrent={isCurrent} />
                {!isLast ? (
                  <span className="relative my-1.5 w-1 flex-1 overflow-hidden rounded-full bg-surface-border">
                    <span
                      className="absolute inset-x-0 top-0 h-full w-full origin-top bg-accent"
                      style={{
                        transform: isDone ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform ${FILL_DURATION}ms ${FILL_EASE}`,
                      }}
                    />
                  </span>
                ) : null}
              </div>
              <span
                className={cn(
                  "ml-4 text-base leading-snug transition-colors duration-500 sm:text-lg",
                  isActiveOrDone ? "text-foreground" : "text-muted",
                  !isLast && "pb-16"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("flex items-center pb-9", className)}>
      {steps.map((step, i) => {
        const isDone = i < effectiveCompleted;
        const isCurrent = i === effectiveCompleted;
        const isLast = i === steps.length - 1;
        return (
          <div key={step} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="relative flex shrink-0 flex-col items-center">
              <StepMarker isDone={isDone} isCurrent={isCurrent} />
              <span className="absolute top-full mt-1.5 w-16 text-center text-xs leading-snug text-muted sm:w-20">
                {step}
              </span>
            </div>
            {!isLast ? (
              <span className="relative h-px flex-1 overflow-hidden bg-surface-border">
                <span
                  className="absolute inset-y-0 left-0 h-full w-full origin-left bg-accent"
                  style={{
                    transform: isDone ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform ${FILL_DURATION}ms ${FILL_EASE}`,
                  }}
                />
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
