import { cn } from "@/lib/utils";
import {
  HeadingBlock,
  Icon3D,
  Slide,
  SlideIntro,
} from "@/components/shared";

interface InitiativeFeature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const initiatives: InitiativeFeature[] = [
  {
    icon: <Icon3D variant="orchestration" />,
    title: "Report tracking",
    description:
      "Track every sample from home collection through NABL-accredited processing to Smart Report delivery.",
  },
  {
    icon: <Icon3D variant="memory" />,
    title: "Digital ID onboarding",
    description:
      "One verified profile across care.aarthiscan.com — eliminating duplicate registrations and barcode mismatches.",
  },
  {
    icon: <Icon3D variant="tools" />,
    title: "Unified scheduling",
    description:
      "Sync online booking to live Siemens MRI/CT capacity — no more phantom appointments.",
  },
  {
    icon: <Icon3D variant="guardrails" />,
    title: "Reliable WhatsApp delivery",
    description:
      "Redundant sync so every validated report reaches patients instantly — honouring the 6-hour promise.",
  },
];

function InitiativeCard({
  icon,
  title,
  description,
}: InitiativeFeature) {
  return (
    <article
      className={cn(
        "deck-card rounded-[18px] p-5 transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] md:p-6"
      )}
    >
      {icon && <div className="mb-5">{icon}</div>}
      <h3 className="text-base font-semibold tracking-[-0.015em] text-foreground md:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-[0.9375rem]">
        {description}
      </p>
    </article>
  );
}

export function TeamSlide() {
  return (
    <Slide id="initiatives" variant="muted">
      <SlideIntro>
        <HeadingBlock>Four pillars to close the gap</HeadingBlock>
      </SlideIntro>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {initiatives.map((feature) => (
          <InitiativeCard key={feature.title} {...feature} />
        ))}
      </div>
    </Slide>
  );
}
