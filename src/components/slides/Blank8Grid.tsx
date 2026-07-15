import { Slide } from "@/components/shared";

const POINTS = [
  "200+ centres across India",
  "Presence across 12 states",
  "Home sample collection",
  "Pathology and radiology capabilities",
  "A strong affordability proposition",
  "Jana Seva preventive-health packages",
  "Iswaryam home-friendly preventive packages",
  "Smart Reports with health scores, explanations, trends and next steps",
];

export function Blank8GridSlide() {
  return (
    <Slide id="blank-8-grid" variant="muted" contentClassName="justify-center">
      <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-3 md:gap-4">
        {POINTS.map((point, index) => (
          <div
            key={index}
            className="flex min-h-0 min-w-0 items-center rounded-[16px] bg-black/[0.05] p-4 md:p-5"
          >
            <p className="text-sm font-medium leading-snug text-foreground md:text-base">
              {point}
            </p>
          </div>
        ))}
      </div>
    </Slide>
  );
}
