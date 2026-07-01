import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface BadgeProps extends BlockProps {
  children: React.ReactNode;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface px-3.5 py-1 text-xs font-medium text-muted md:text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
