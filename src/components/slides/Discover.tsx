import Image from "next/image";
import { HeadingBlock, Slide, SlideLead } from "@/components/shared";

export function AppIntroSlide() {
  return (
    <Slide id="app-intro" variant="gradient">
      <div className="flex flex-row items-center justify-center gap-20">
        <SlideLead className="max-w-xl text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
            Every test,<br /> easily available.
          </HeadingBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-72 shrink-0">
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
