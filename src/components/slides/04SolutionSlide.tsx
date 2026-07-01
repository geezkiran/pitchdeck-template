import { cn } from "@/lib/utils";
import {
  Eyebrow,
  HeadingBlock,
  Slide,
  SlideIntro,
} from "@/components/shared";

const painPoints = [
  {
    text: "Preventive packages from ₹999 and 60% scan discounts drive volume — but margin pressure and reagent costs strain 200+ centres",
    highlight: true,
  },
  {
    text: "Home blood collection across 12 states suffers phlebotomist turnover, scheduling errors, and cold-chain breaks in transit to hub labs",
    highlight: true,
  },
  {
    text: "care.aarthiscan.com, franchisee billing, and LIMS fall out of sync — causing OTP loops, missing reports, and broken tracking",
    highlight: true,
  },
  {
    text: "High-volume front desks at peak hours introduce data entry errors that delay the 6-hour report promise",
    highlight: true,
  },
];

export function SolutionSlide() {
  return (
    <Slide id="lab-operations" variant="muted">
      <SlideIntro>
        <Eyebrow>Operational pain points</Eyebrow>
        <HeadingBlock>Scale is exposing execution gaps</HeadingBlock>
      </SlideIntro>
      <ul className="space-y-4 md:space-y-5">
        {painPoints.map((item) => (
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
    </Slide>
  );
}
