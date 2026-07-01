import {
  CTABlock,
  HeadingBlock,
  Slide,
  SlideIntro,
  StatGrid,
  TextBlock,
} from "@/components/shared";

export function AskSlide() {
  return (
    <Slide id="next-steps" variant="gradient">
      <SlideIntro>
        <HeadingBlock size="lg" gradient>
          Patients served with zero friction
        </HeadingBlock>
      </SlideIntro>
      <StatGrid
        columns={3}
        stats={[
          {
            value: "60%",
            label: "Delays are pre-analytical",
            description: "Addressable via tracking & digital ID",
          },
          {
            value: "200+",
            label: "Centres to unify",
            description: "Single booking & identity layer",
          },
          {
            value: "6 hrs",
            label: "TAT promise to defend",
            description: "With redundant report delivery",
          },
        ]}
      />
      <TextBlock size="sm">
        We propose a joint working session with Aarthi leadership to prioritize
        Phase 1 — aligning operational fixes with the vision Er. V. Govindarajan
        built over 38 years.
      </TextBlock>
      <CTABlock
        primaryLabel="Get Quote"
        primaryHref="mailto:santosh@twospoon.ai"
        primaryVariant="gradient"
        secondaryLabel="Get in touch with us"
        secondaryHref="https://care.aarthiscan.com/appointments"
      />
    </Slide>
  );
}
