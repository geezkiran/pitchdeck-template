import { cn } from "@/lib/utils";
import type { BlockProps } from "./types";

interface TeamMemberProps extends BlockProps {
  name: string;
  role: string;
  bio?: string;
  initials: string;
}

export function TeamMember({
  name,
  role,
  bio,
  initials,
  className,
}: TeamMemberProps) {
  return (
    <article
      className={cn(
        "deck-card rounded-[18px] p-5 md:p-6",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-[#5ac8fa] to-[#0071e3] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,113,227,0.2)] md:h-14 md:w-14 md:text-base">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold tracking-[-0.015em] text-foreground md:text-lg">
            {name}
          </h3>
          <p className="text-sm font-medium text-accent">{role}</p>
        </div>
      </div>
      {bio && (
        <p className="mt-4 text-sm font-medium leading-relaxed text-muted md:text-base">
          {bio}
        </p>
      )}
    </article>
  );
}
