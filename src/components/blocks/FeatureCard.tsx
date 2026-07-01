import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface FeatureCardProps extends BlockProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "deck-card rounded-[18px] p-5 transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] md:p-6",
        className
      )}
    >
      {icon && <div className="mb-5">{icon}</div>}
      <h3 className="text-base font-semibold tracking-[-0.015em] text-foreground md:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-[0.9375rem]">
        {description}
      </p>
    </article>
  );
}
