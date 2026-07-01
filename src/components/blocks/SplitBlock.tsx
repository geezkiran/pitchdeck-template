import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface SplitBlockProps extends BlockProps {
  left: React.ReactNode;
  right?: React.ReactNode;
  reverseOnMobile?: boolean;
}

export function SplitBlock({
  left,
  right,
  reverseOnMobile = false,
  className,
}: SplitBlockProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16",
        !right && "md:grid-cols-1",
        reverseOnMobile && "flex flex-col-reverse md:grid",
        className
      )}
    >
      <div>{left}</div>
      {right && <div>{right}</div>}
    </div>
  );
}
