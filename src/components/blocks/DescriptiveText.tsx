import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface DescriptiveTextProps extends BlockProps {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
}

const sizeStyles = {
  lg: "text-xl font-medium leading-[1.5] tracking-[-0.01em] sm:text-2xl md:text-[1.625rem]",
  md: "text-lg font-medium leading-[1.55] tracking-[-0.008em] sm:text-xl md:text-[1.375rem]",
  sm: "text-base font-medium leading-relaxed sm:text-lg",
};

function DescriptiveTextRoot({
  children,
  className,
  size = "md",
}: DescriptiveTextProps) {
  return (
    <p className={cn(sizeStyles[size], "max-w-3xl text-muted", className)}>
      {children}
    </p>
  );
}

interface DescriptiveTextSpanProps extends BlockProps {
  children: React.ReactNode;
}

function DescriptiveTextPrimary({ children, className }: DescriptiveTextSpanProps) {
  return <span className={cn("text-foreground", className)}>{children}</span>;
}

function DescriptiveTextMuted({ children, className }: DescriptiveTextSpanProps) {
  return <span className={cn("text-muted", className)}>{children}</span>;
}

export const DescriptiveText = Object.assign(DescriptiveTextRoot, {
  Primary: DescriptiveTextPrimary,
  Muted: DescriptiveTextMuted,
});
