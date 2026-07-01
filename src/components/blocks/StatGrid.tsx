import { cn } from "@/lib/utils";
import { StatBlock } from "./StatBlock";
import type { BlockProps, StatItem } from "./types";

interface StatGridProps extends BlockProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

interface StatGridGroupProps extends BlockProps {
  children: React.ReactNode;
}

const columnStyles = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function StatGridGroup({ children, className }: StatGridGroupProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:gap-4", className)}>
      {children}
    </div>
  );
}

export function StatGrid({ stats, columns = 3, className }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-x-2 gap-y-2 md:gap-x-4 md:gap-y-2",
        columnStyles[columns],
        className
      )}
    >
      {stats.map((stat) => (
        <StatBlock key={stat.label} {...stat} />
      ))}
    </div>
  );
}
