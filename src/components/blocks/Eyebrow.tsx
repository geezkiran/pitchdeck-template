import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface EyebrowProps extends BlockProps {
  children: React.ReactNode;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "slide-eyebrow text-sm font-medium tracking-[-0.01em] text-accent md:text-[0.9375rem]",
        className
      )}
    >
      {children}
    </p>
  );
}
