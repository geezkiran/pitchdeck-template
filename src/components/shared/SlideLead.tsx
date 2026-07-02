import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface SlideLeadProps extends BlockProps {
  children: React.ReactNode;
}

/** Intro copy grouped with tight spacing between heading and supporting text */
export function SlideLead({ children, className }: SlideLeadProps) {
  return (
    <div className={cn("flex flex-col gap-2 md:gap-2.5", className)}>
      {children}
    </div>
  );
}

interface SlideBodyProps extends BlockProps {
  children: React.ReactNode;
}

/** Main slide content with extra offset below the intro group */
export function SlideBody({ children, className }: SlideBodyProps) {
  return <div className={cn("mt-4 md:mt-6", className)}>{children}</div>;
}
