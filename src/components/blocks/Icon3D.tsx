import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

export type Icon3DVariant =
  | "orchestration"
  | "memory"
  | "tools"
  | "guardrails"
  | "chart"
  | "rocket"
  | "pricing"
  | "team";

interface Icon3DProps extends BlockProps {
  variant: Icon3DVariant;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-16 w-16",
};

function IconSvg({ variant }: { variant: Icon3DVariant }) {
  switch (variant) {
    case "orchestration":
      return (
        <>
          <circle cx="32" cy="32" r="22" fill="url(#icon-bg-blue)" />
          <circle cx="32" cy="32" r="22" fill="url(#icon-shine)" />
          <circle cx="20" cy="32" r="5" fill="#fff" opacity="0.95" />
          <circle cx="32" cy="32" r="5" fill="#fff" opacity="0.95" />
          <circle cx="44" cy="32" r="5" fill="#fff" opacity="0.95" />
          <path
            d="M20 32h24"
            stroke="#0071e3"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.35"
          />
        </>
      );
    case "memory":
      return (
        <>
          <rect
            x="12"
            y="16"
            width="40"
            height="32"
            rx="8"
            fill="url(#icon-bg-purple)"
          />
          <rect
            x="12"
            y="16"
            width="40"
            height="32"
            rx="8"
            fill="url(#icon-shine)"
          />
          <rect x="18" y="24" width="28" height="4" rx="2" fill="#fff" opacity="0.9" />
          <rect x="18" y="32" width="20" height="4" rx="2" fill="#fff" opacity="0.7" />
          <rect x="18" y="40" width="24" height="4" rx="2" fill="#fff" opacity="0.5" />
        </>
      );
    case "tools":
      return (
        <>
          <rect
            x="14"
            y="14"
            width="36"
            height="36"
            rx="10"
            fill="url(#icon-bg-orange)"
          />
          <rect
            x="14"
            y="14"
            width="36"
            height="36"
            rx="10"
            fill="url(#icon-shine)"
          />
          <path
            d="M32 22v20M22 32h20"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.95"
          />
        </>
      );
    case "guardrails":
      return (
        <>
          <path
            d="M32 14l18 8v14c0 10-7 15-18 18-11-3-18-8-18-18V22l18-8Z"
            fill="url(#icon-bg-green)"
          />
          <path
            d="M32 14l18 8v14c0 10-7 15-18 18-11-3-18-8-18-18V22l18-8Z"
            fill="url(#icon-shine)"
          />
          <path
            d="M26 32l4 4 8-8"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "chart":
      return (
        <>
          <rect x="12" y="12" width="40" height="40" rx="12" fill="url(#icon-bg-blue)" />
          <rect x="12" y="12" width="40" height="40" rx="12" fill="url(#icon-shine)" />
          <rect x="20" y="36" width="6" height="12" rx="2" fill="#fff" opacity="0.85" />
          <rect x="29" y="28" width="6" height="20" rx="2" fill="#fff" opacity="0.9" />
          <rect x="38" y="20" width="6" height="28" rx="2" fill="#fff" opacity="0.95" />
        </>
      );
    case "rocket":
      return (
        <>
          <circle cx="32" cy="32" r="22" fill="url(#icon-bg-purple)" />
          <circle cx="32" cy="32" r="22" fill="url(#icon-shine)" />
          <path
            d="M32 18c6 6 8 14 8 22 0 2-6 4-8 4s-8-2-8-4c0-8 2-16 8-22Z"
            fill="#fff"
            opacity="0.95"
          />
          <circle cx="32" cy="30" r="3" fill="#bf5af2" />
        </>
      );
    case "pricing":
      return (
        <>
          <rect x="14" y="18" width="36" height="28" rx="8" fill="url(#icon-bg-green)" />
          <rect x="14" y="18" width="36" height="28" rx="8" fill="url(#icon-shine)" />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="#fff"
            fontSize="16"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            $
          </text>
        </>
      );
    case "team":
      return (
        <>
          <circle cx="32" cy="32" r="22" fill="url(#icon-bg-orange)" />
          <circle cx="32" cy="32" r="22" fill="url(#icon-shine)" />
          <circle cx="32" cy="26" r="6" fill="#fff" opacity="0.95" />
          <path
            d="M22 42c0-6 4.5-10 10-10s10 4 10 10"
            fill="#fff"
            opacity="0.85"
          />
        </>
      );
  }
}

export function Icon3D({ variant, size = "md", className }: Icon3DProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]",
        sizeStyles[size],
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="icon-bg-blue" x1="16" y1="8" x2="48" y2="56">
            <stop stopColor="#5ac8fa" />
            <stop offset="1" stopColor="#0071e3" />
          </linearGradient>
          <linearGradient id="icon-bg-purple" x1="16" y1="8" x2="48" y2="56">
            <stop stopColor="#bf5af2" />
            <stop offset="1" stopColor="#8944ba" />
          </linearGradient>
          <linearGradient id="icon-bg-orange" x1="16" y1="8" x2="48" y2="56">
            <stop stopColor="#ffb340" />
            <stop offset="1" stopColor="#ff9500" />
          </linearGradient>
          <linearGradient id="icon-bg-green" x1="16" y1="8" x2="48" y2="56">
            <stop stopColor="#63e6a8" />
            <stop offset="1" stopColor="#34c759" />
          </linearGradient>
          <linearGradient id="icon-shine" x1="20" y1="8" x2="44" y2="40">
            <stop stopColor="#fff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <IconSvg variant={variant} />
      </svg>
    </div>
  );
}
