import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface HeadingBlockProps extends BlockProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  gradient?: boolean;
  size?: "xl" | "lg" | "md";
}

const sizeStyles = {
  xl: "text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[4.5rem]",
  lg: "text-3xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-4xl md:text-[2.75rem]",
  md: "text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl md:text-4xl",
};

export function HeadingBlock({
  children,
  className,
  as: Tag = "h2",
  gradient = false,
  size = "lg",
}: HeadingBlockProps) {
  return (
    <Tag
      className={cn(
        sizeStyles[size],
        gradient && "deck-gradient-text",
        className
      )}
    >
      {children}
    </Tag>
  );
}
