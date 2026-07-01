import { cn } from "@/lib/utils";
import { FeatureCard } from "./FeatureCard";
import type { BlockProps, FeatureItem } from "./types";

interface FeatureGridProps extends BlockProps {
  features: FeatureItem[];
  columns?: 2 | 3;
}

const columnStyles = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function FeatureGrid({
  features,
  columns = 2,
  className,
}: FeatureGridProps) {
  return (
    <div className={cn("grid gap-4 md:gap-5", columnStyles[columns], className)}>
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}
