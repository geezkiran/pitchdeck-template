import Image from "next/image";
import { HeadingBlock, Slide, SlideLead, TextBlock } from "@/components/shared";

export function AppIntroSlide() {
  return (
    <Slide id="app-intro" variant="gradient">
      <div className="flex flex-col-reverse items-center justify-center gap-10 md:flex-row md:items-center md:gap-12">
        <SlideLead className="max-w-xl text-center md:text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
            Discover
            
          </HeadingBlock>
          <TextBlock size="md" className="mx-auto mt-2 md:mx-0">
          Every test laid out simply, so you can choose<br /> what fits your life.
          </TextBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-56 shrink-0 sm:w-64 md:w-72">
          <Image
            src="/images/homepage.png"
            alt="AarthiLife app"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
