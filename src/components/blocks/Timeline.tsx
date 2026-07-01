import { cn } from "@/lib/utils";
import { TimelineItem } from "./TimelineItem";
import type { BlockProps, TimelineEntry } from "./types";

interface TimelineProps extends BlockProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn(className)}>
      {entries.map((entry, index) => (
        <TimelineItem
          key={entry.title}
          {...entry}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
}
