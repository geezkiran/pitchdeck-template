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
        <HeadingBlock
          as="h1"
          size="xl"
          gradient
          className="text-[6rem]"
        >
          AarthiLife
        </HeadingBlock>
        <TextBlock size="lg" className="leading-tight">
          <span className="text-muted">
            {" "}
            Turning Aarthi’s diagnostic network into a recurring 
          </span>
          <span className="text-foreground">
            <br /> consumer-health business
          </span>
          
        </TextBlock>
      </SlideLead>
      <SlideBody>
        <CTABlock
          primaryLabel="Schedule a meeting with us"
          primaryHref="mailto:santosh@twospoon.ai"
          primaryVariant="gradient"
          secondaryLabel="View proposal"
          secondaryHref="#competition-already"
        />
      </SlideBody>
    </Slide>
  );
}
