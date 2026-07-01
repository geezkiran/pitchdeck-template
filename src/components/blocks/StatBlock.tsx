import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface StatBlockProps extends BlockProps {
  value: React.ReactNode;
  label: string;
  description?: string;
}

export function StatBlock({
  value,
  label,
  description,
  className,
}: StatBlockProps) {
  return (
    <div className={cn("deck-card-muted rounded-[18px] p-5 md:p-6", className)}>
      <p className="text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-muted md:text-base">
        {label}
      </p>
      {description && (
        <p className="mt-1 text-sm font-medium text-muted">{description}</p>
      )}
    </div>
  );
}
