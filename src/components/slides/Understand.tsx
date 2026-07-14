import Image from "next/image";
import { HeadingBlock, Slide, SlideLead, TextBlock } from "@/components/shared";

export function AppIntroSlide4() {
  return (
    <Slide id="app-intro-4" variant="gradient">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row-reverse md:items-center md:justify-between md:gap-16">
        <SlideLead className="max-w-xl text-center md:text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
            Understand
          </HeadingBlock>
          <TextBlock size="md" className="mx-auto mt-2 md:mx-0">
          Your results tracked over time, and ready to share with your doctor in seconds.
          </TextBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-56 shrink-0 sm:w-64 md:w-72">
          <Image
            src="/images/app-screenshot-4.png"
            alt="AarthiLife app"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
