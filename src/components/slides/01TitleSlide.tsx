import {
  CTABlock,
  HeadingBlock,
  Slide,
  TextBlock,
} from "@/components/shared";

export function TitleSlide() {
  return (
    <Slide id="title" variant="gradient">
      <div className="flex w-full flex-col items-start gap-6 md:gap-8">
        <HeadingBlock as="h1" size="xl" gradient>
          Aarthi Scan & Labs Case Study
        </HeadingBlock>
        <TextBlock size="md">
          <span className="text-muted">
            {" "}
            A phased plan to close the gap between Aarthi Lab&apos;s promise —{" "}
          </span>
          <span className="text-foreground">
            200+ centres, 6-hour reports, 60% scan savings
          </span>
          <span className="text-muted">
            {" "}
            — and the operational friction patients experience today.
          </span>
        </TextBlock>
        <CTABlock
          primaryLabel="Schedule a meeting with us"
          primaryHref="mailto:santosh@twospoon.ai"
          primaryVariant="gradient"
          secondaryLabel="View proposal"
          secondaryHref="#roadmap"
        />
      </div>
    </Slide>
  );
}
