import { HeadingBlock, Slide } from "@/components/shared";

export function CompetitionAlreadySlide() {
  return (
    <Slide
      id="competition-already"
      variant="gradient"
      contentClassName="items-center justify-center"
    >
      <HeadingBlock size="xl" gradient className="max-w-4xl text-center">
        Your competition is already doing it
      </HeadingBlock>
    </Slide>
  );
}
