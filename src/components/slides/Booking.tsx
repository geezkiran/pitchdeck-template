import Image from "next/image";
import { HeadingBlock, Slide, SlideLead, TextBlock } from "@/components/shared";

export function AppIntroSlide2() {
  return (
    <Slide id="app-intro-2" variant="gradient">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row-reverse md:items-center md:justify-between md:gap-16">
        <SlideLead className="max-w-xl text-center md:text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
            Book
            
          </HeadingBlock>
          <TextBlock size="md" className="mx-auto mt-2 md:mx-0">
          Book for yourself or your whole family, choose a time that works, pay without the hassle, and walk in already prepared.
          </TextBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-56 shrink-0 sm:w-64 md:w-72">
          <Image
            src="/images/app-screenshot-2.png"
            alt="AarthiLife app"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
