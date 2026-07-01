import { cn } from "@/lib/utils";
import type { BlockProps, BulletItem } from "./types";

interface BulletListProps extends BlockProps {
  items: BulletItem[];
}

export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cn("space-y-4 md:space-y-5", className)}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3.5">
          <span
            className={cn(
              "mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full",
              item.highlight ? "bg-accent" : "bg-[#d2d2d7]"
            )}
            aria-hidden
          />
          <span
            className={cn(
              "text-base font-medium leading-relaxed md:text-lg",
              item.highlight ? "text-foreground" : "text-muted"
            )}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
