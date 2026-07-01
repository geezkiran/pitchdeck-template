import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface QuoteBlockProps extends BlockProps {
  quote: string;
  attribution?: string;
}

export function QuoteBlock({ quote, attribution, className }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "deck-card-muted rounded-[18px] p-6 md:p-8",
        className
      )}
    >
      <p className="text-lg font-medium leading-[1.5] tracking-[-0.015em] text-foreground md:text-xl">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <footer className="mt-4 text-sm font-medium text-muted md:text-base">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
