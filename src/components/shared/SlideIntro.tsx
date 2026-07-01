import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface SlideIntroProps extends BlockProps {
  children: React.ReactNode;
}

/** Eyebrow + heading group with consistent spacing */
export function SlideIntro({ children, className }: SlideIntroProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:gap-3.5", className)}>
      {children}
    </div>
  );
}

interface SlideIntroSectionProps extends BlockProps {
  children: React.ReactNode;
}

/** Intro block plus optional description below */
export function SlideIntroSection({
  children,
  className,
}: SlideIntroSectionProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:gap-4", className)}>
      {children}
    </div>
  );
}
