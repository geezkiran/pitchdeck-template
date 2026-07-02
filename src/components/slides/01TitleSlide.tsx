import {
  CTABlock,
  HeadingBlock,
  Slide,
  SlideBody,
  SlideLead,
  TextBlock,
} from "@/components/shared";

export function TitleSlide() {
  return (
    <Slide id="title" variant="gradient">
      <SlideLead className="w-full items-start">
        <HeadingBlock as="h1" size="xl" gradient>
          Aarthi Scan & Labs 
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
      </SlideLead>
      <SlideBody>
        <CTABlock
          primaryLabel="Schedule a meeting with us"
          primaryHref="mailto:santosh@twospoon.ai"
          primaryVariant="gradient"
          secondaryLabel="View proposal"
          secondaryHref="#proposed-changes"
        />
      </SlideBody>
    </Slide>
  );
}
