import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface CTABlockProps extends BlockProps {
  primaryLabel: string;
  primaryHref?: string;
  primaryVariant?: "solid" | "gradient";
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTABlock({
  primaryLabel,
  primaryHref = "#",
  primaryVariant = "solid",
  secondaryLabel,
  secondaryHref = "#",
  className,
}: CTABlockProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center", className)}>
      <a
        href={primaryHref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium text-white transition-[filter,transform] duration-200 md:px-6 md:py-2.5 md:text-[0.9375rem]",
          primaryVariant === "gradient"
            ? "deck-cta-gradient shadow-[0_2px_8px_rgba(0,113,227,0.22)] hover:brightness-[1.04] active:scale-[0.98]"
            : "bg-accent transition-colors hover:bg-accent-secondary"
        )}
      >
        {primaryLabel}
      </a>
      {secondaryLabel && (
        <a
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-accent transition-colors hover:underline md:px-8 md:py-3.5 md:text-[0.9375rem]"
        >
          {secondaryLabel}
        </a>
      )}
    </div>
  );
}
