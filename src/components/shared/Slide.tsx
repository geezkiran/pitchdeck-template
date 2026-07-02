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
  centerContent = true,
  pinFooter = false,
  footerClassName,
}: SlideProps) {
  return (
    <section
      id={id}
      data-slide
      className={cn(
        "relative flex h-dvh w-full shrink-0 snap-start snap-always flex-col justify-start overflow-hidden",
        "px-6 pt-20 pb-28 md:px-20 md:pt-24 md:pb-32",
        variantStyles[variant === "dark" ? "muted" : variant],
        className
      )}
    >
      <div className="slide-content mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col">
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-7 md:gap-9",
            centerContent ? "justify-center" : "justify-start",
            contentClassName
          )}
        >
          {children}
        </div>
        {footer && !pinFooter ? (
          <div className="shrink-0 pt-4 md:pt-5">{footer}</div>
        ) : null}
      </div>
      {footer && pinFooter ? (
        <div
          className={cn(
            "absolute inset-x-6 bottom-11 md:inset-x-20 md:bottom-12",
            footerClassName
          )}
        >
          <div className="mx-auto w-full max-w-5xl">{footer}</div>
        </div>
      ) : null}
    </section>
  );
}
