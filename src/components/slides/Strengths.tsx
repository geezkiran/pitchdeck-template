import { Eyebrow, HeadingBlock, Slide, SlideLead } from "@/components/shared";

const STRENGTHS = [
  "200+ centres across India",
  "Presence across 12 states",
  "Home sample collection",
  "Pathology and radiology capabilities",
  "A strong affordability proposition",
  "Jana Seva preventive-health packages",
  "Iswaryam home-friendly preventive packages",
  "Smart Reports with health scores, explanations, trends and next steps",
];

export function StrengthsSlide() {
  return (
    <Slide id="strengths" variant="muted" contentClassName="justify-center">
      <div className="flex flex-col gap-8 md:gap-10">
        <SlideLead className="max-w-5xl">
         
          <HeadingBlock size="xl" className="text-foreground">
            A diagnostic network built to scale.
          </HeadingBlock>
        </SlideLead>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {STRENGTHS.map((item) => (
            <div
              key={item}
              className="flex min-h-0 min-w-0 items-center gap-3 rounded-[16px] border border-surface-border bg-surface-elevated p-5 shadow-[var(--shadow-soft)] md:p-6"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              <p className="text-base font-medium leading-snug text-foreground md:text-lg">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
