import { HeadingBlock, Slide, TextBlock } from "@/components/shared";

export function CompetitionAlreadySlide() {
  return (
    <Slide
      id="competition-already"
      variant="gradient"
      contentClassName="items-center justify-center"
    >
      <HeadingBlock size="xl" gradient className="max-w-4xl text-center">
        Introducing AarthiLife
      </HeadingBlock>
      <TextBlock size="md" className="max-w-3xl text-center text-muted">
        An affordable preventive-health programme that helps individuals and
        families test regularly, understand their results and track their
        health over time.
      </TextBlock>
    </Slide>
  );
}
