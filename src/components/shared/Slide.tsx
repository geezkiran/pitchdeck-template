import { cn } from "@/lib/utils";
import type { SlideProps } from "./types";

const variantStyles = {
  default: "bg-background",
  muted: "bg-surface",
  gradient: "bg-background deck-glow",
};

export function Slide({
  id,
  children,
  footer,
  className,
  contentClassName,
  variant = "default",
}: SlideProps) {
  return (
    <section
      id={id}
      data-slide
      className={cn(
        "relative flex h-dvh w-full shrink-0 snap-start snap-always flex-col justify-center overflow-hidden",
        "px-6 pt-20 pb-28 md:px-20 md:pt-24 md:pb-32",
        variantStyles[variant === "dark" ? "muted" : variant],
        className
      )}
    >
      <div
        className={cn(
          "slide-content mx-auto flex w-full max-w-5xl flex-col gap-7 md:gap-9",
          contentClassName
        )}
      >
        {children}
      </div>
      {footer ? (
        <div className="absolute inset-x-6 bottom-28 md:inset-x-20 md:bottom-32">
          <div className="mx-auto w-full max-w-5xl">{footer}</div>
        </div>
      ) : null}
    </section>
  );
}
