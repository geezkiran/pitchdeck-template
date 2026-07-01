import { cn } from "@/lib/utils";
import { TeamMember } from "./TeamMember";
import type { BlockProps, TeamMemberData } from "./types";

interface TeamGridProps extends BlockProps {
  members: TeamMemberData[];
}

export function TeamGrid({ members, className }: TeamGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5",
        className
      )}
    >
      {members.map((member) => (
        <TeamMember key={member.name} {...member} />
      ))}
    </div>
  );
}
