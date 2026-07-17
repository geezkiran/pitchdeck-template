import Image from "next/image";
import { HeadingBlock, Slide, TextBlock } from "@/components/shared";

export function CompetitionAlreadySlide() {
  return (
    <Slide
      id="competition-already"
      variant="gradient"
      contentClassName="items-center justify-center"
    >
      <HeadingBlock
        size="xl"
        gradient
        className="flex max-w-4xl flex-wrap items-center justify-center gap-x-5 text-center"
      >
        <span className="text-black">Introducing</span>
        <Image
          src="/images/aarthilife-logo.png"
          alt="AarthiLife"
          width={447}
          height={95}
          className="h-[69px] w-auto"
        />
      </HeadingBlock>
      <TextBlock size="md" className="max-w-3xl text-center text-muted">
        An affordable preventive-health programme that helps individuals and
        families test regularly, understand their results and track their
        health over time.
      </TextBlock>
    </Slide>
  );
}
