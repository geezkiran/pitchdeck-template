import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface LogoMarkProps extends BlockProps {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-9 w-9 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-14 w-14 text-xl",
};

export function LogoMark({
  name = "N",
  className,
  size = "md",
}: LogoMarkProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-[18px] bg-linear-to-b from-[#5ac8fa] to-[#0071e3] font-semibold text-white shadow-[0_8px_20px_rgba(0,113,227,0.28)]",
        sizeStyles[size],
        className
      )}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
