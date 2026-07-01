"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface SpotlightBlockProps extends BlockProps {
  title: string;
  subtitle: string;
  statPrefix?: string;
  statValue: string;
  statLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageFootnote?: string;
  /** Pin image to the right column, sized to fit the slide */
  imageLayout?: "default" | "viewport-edge";
  /** Max height for the full device image (CSS length) */
  imageMaxHeight?: string;
}

export function SpotlightBlock({
  title,
  subtitle,
  statPrefix = "Up to",
  statValue,
  statLabel,
  imageSrc,
  imageAlt = "",
  imageCaption,
  imageFootnote,
  imageLayout = "default",
  imageMaxHeight = "min(calc(100dvh - 11rem), 640px)",
  className,
}: SpotlightBlockProps) {
  const isViewportEdge = imageLayout === "viewport-edge";

  return (
    <div
      className={cn(
        "deck-spotlight-sync relative w-full min-w-0",
        isViewportEdge
          ? "grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,38%)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:gap-14"
          : "grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6 md:gap-8",
          isViewportEdge && "relative z-10 min-w-0 max-w-xl"
        )}
      >
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="deck-accent-gradient-text text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem]">
            {title}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="h-px w-full max-w-sm bg-black/[0.08]" />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted md:text-base">{statPrefix}</p>
          <p className="deck-accent-gradient-text text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl md:text-7xl">
            {statValue}
          </p>
          <p className="text-sm font-medium text-muted md:text-base">{statLabel}</p>
        </div>

        {isViewportEdge && imageFootnote ? (
          <p className="mt-15 text-left text-[10px] leading-snug text-muted/70 md:mt-20 md:text-[11px]">
            {imageFootnote}
          </p>
        ) : null}
      </div>

      {isViewportEdge && imageSrc ? (
        <div
          className="relative hidden min-h-0 min-w-0 items-center justify-end md:flex"
          aria-hidden
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1350}
            height={2760}
            priority
            className="h-auto w-auto max-w-full object-contain"
            style={{ maxHeight: imageMaxHeight }}
          />
        </div>
      ) : null}

      {!isViewportEdge ? (
        <div className="deck-spotlight-frame mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[calc(1.125rem-3px)] bg-surface">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.04]">
                  <svg
                    aria-hidden
                    className="h-6 w-6 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-muted">Add your photo</p>
                <p className="text-xs text-muted/80">
                  Set <code className="text-[11px]">imageSrc</code> on SpotlightBlock
                </p>
              </div>
            )}

            {imageCaption && (
              <div className="absolute left-4 top-4 rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                <p className="text-xs font-semibold text-white md:text-sm">{imageCaption}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
