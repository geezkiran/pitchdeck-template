import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface TimelineItemProps extends BlockProps {
  period: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export function TimelineItem({
  period,
  title,
  description,
  isLast = false,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-4 md:gap-6", className)}>
      <div className="flex flex-col items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/10" />
        {!isLast && (
          <div className="mt-1 min-h-12 w-px flex-1 bg-surface-border" />
        )}
      </div>
      <div className="pb-8 md:pb-10">
        <p className="text-xs font-medium tracking-[-0.01em] text-accent md:text-sm">
          {period}
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-[-0.015em] text-foreground md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
