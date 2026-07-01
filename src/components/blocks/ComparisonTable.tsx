import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface ComparisonRow {
  label: string;
  before: string;
  after: string;
}

interface ComparisonTableProps extends BlockProps {
  rows: ComparisonRow[];
}

const headerCellClass =
  "text-sm font-medium tracking-[-0.01em] text-muted md:text-base";
const labelCellClass =
  "text-sm font-semibold tracking-[-0.01em] text-foreground md:text-base";
const beforeCellClass = "text-sm font-medium text-muted md:text-base";
const afterCellClass = "text-sm font-medium text-foreground md:text-base";
const mobileLabelClass =
  "inline-block w-[4.75rem] shrink-0 md:hidden";

export function ComparisonTable({ rows, className }: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "deck-card overflow-hidden rounded-[18px]",
        className
      )}
    >
      <div className="hidden grid-cols-3 gap-4 bg-surface px-5 py-3.5 md:grid md:px-6">
        <span className={headerCellClass}>Area</span>
        <span className={headerCellClass}>Today</span>
        <span className={headerCellClass}>Proposed</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-2 border-t border-surface-border px-5 py-4 md:grid-cols-3 md:gap-4 md:px-6 md:py-5"
        >
          <p className={labelCellClass}>{row.label}</p>
          <p className={beforeCellClass}>
            <span className={cn(mobileLabelClass, "text-muted/80")}>
              Today:
            </span>
            {row.before}
          </p>
          <p className={afterCellClass}>
            <span className={cn(mobileLabelClass, "text-accent")}>
              Proposed:
            </span>
            {row.after}
          </p>
        </div>
      ))}
    </div>
  );
}
