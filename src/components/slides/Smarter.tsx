import { HeadingBlock, Slide } from "@/components/shared";

export function SmarterSlide() {
  return (
    <Slide
      id="smarter"
      variant="gradient"
      contentClassName="items-center justify-center"
    >
      <HeadingBlock size="xl" gradient className="max-w-4xl text-center">
        What if every visit made the next one smarter?
      </HeadingBlock>
    </Slide>
  );
}
