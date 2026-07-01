import { cn } from "@/lib/utils";

interface ScrollHintProps {
  visible?: boolean;
}

export function ScrollHint({ visible = false }: ScrollHintProps) {
  return (
    <div
      className={cn(
        "deck-scroll-hint pointer-events-none fixed inset-x-0 z-40 flex flex-col items-center justify-center gap-1",
        "bottom-[4.5rem] transition-opacity duration-500 md:bottom-[5rem]",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden={!visible}
    >
      <span className="deck-scroll-hint-label text-xs font-medium text-muted md:text-sm">
        Scroll Down
      </span>
      <svg
        className="deck-scroll-hint-chevron h-3.5 w-3.5 text-muted md:h-4 md:w-4"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 6.25 8 10.25 12 6.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
