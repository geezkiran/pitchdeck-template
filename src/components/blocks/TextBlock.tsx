import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface TextBlockProps extends BlockProps {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
  muted?: boolean;
}

const sizeStyles = {
  lg: "text-xl font-medium leading-[1.5] tracking-[-0.01em] sm:text-2xl md:text-[1.625rem]",
  md: "text-lg font-medium leading-[1.55] tracking-[-0.008em] sm:text-xl md:text-[1.375rem]",
  sm: "text-base font-medium leading-relaxed sm:text-lg",
};

export function TextBlock({
  children,
  className,
  size = "md",
  muted = true,
}: TextBlockProps) {
  return (
    <p
      className={cn(
        sizeStyles[size],
        muted ? "text-muted" : "text-foreground",
        "max-w-3xl",
        className
      )}
    >
      {children}
    </p>
  );
}
