import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface StepFlowProps extends BlockProps {
  steps: string[];
  /** Number of leading steps rendered as completed (filled, checked). */
  completed?: number;
  direction?: "horizontal" | "vertical";
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

export function CircularStepFlow({
  steps,
  className,
  accent = false,
}: Omit<StepFlowProps, "completed"> & { accent?: boolean }) {
  const n = steps.length;
  const radius = 40;
  return (
    <div className={cn("relative mx-auto aspect-square w-80 sm:w-[26rem]", className)}>
      <div
        className={cn(
          "absolute inset-[10%] rounded-full border border-dashed",
          accent ? "border-emerald-500/50" : "border-muted/50"
        )}
      />
      {steps.map((step, i) => {
        const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <div
            key={step}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={cn(
                "flex w-max max-w-[7rem] items-center gap-1.5 rounded-full border-2 bg-surface px-2 py-1 sm:max-w-[8.5rem]",
                accent ? "border-emerald-500" : "border-muted/30"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold",
                  accent ? "text-emerald-600" : "text-muted"
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "text-xs leading-snug sm:text-sm",
                  accent ? "text-emerald-700" : "text-muted"
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
}: StepFlowProps) {
  if (direction === "vertical") {
    return (
      <div className={cn("flex flex-col items-start", className)}>
        {steps.map((step, i) => {
          const isDone = i < completed;
          const isLast = i === steps.length - 1;
          return (
            <div key={step} className={cn("flex items-stretch", !isLast && "flex-1")}>
              <div className="relative flex shrink-0 flex-col items-center">
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold",
                    isDone
                      ? "bg-accent text-white"
                      : "border-2 border-muted/30 text-muted"
                  )}
                >
                  {isDone ? <CheckIcon /> : i + 1}
                </span>
                {!isLast ? (
                  <span className="my-1.5 w-px flex-1 bg-surface-border" />
                ) : null}
              </div>
              <span
                className={cn(
                  "ml-3 text-xs leading-snug text-muted sm:text-sm",
                  !isLast && "pb-10"
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
    <div className={cn("flex items-center pb-9", className)}>
      {steps.map((step, i) => {
        const isDone = i < completed;
        const isLast = i === steps.length - 1;
        return (
          <div
            key={step}
            className={cn("flex items-center", !isLast && "flex-1")}
          >
            <div className="relative flex shrink-0 flex-col items-center">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold",
                  isDone
                    ? "bg-accent text-white"
                    : "border-2 border-muted/30 text-muted"
                )}
              >
                {isDone ? <CheckIcon /> : i + 1}
              </span>
              <span className="absolute top-full mt-1.5 w-16 text-center text-xs leading-snug text-muted sm:w-20">
                {step}
              </span>
            </div>
            {!isLast ? (
              <span className="h-px flex-1 bg-surface-border" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
