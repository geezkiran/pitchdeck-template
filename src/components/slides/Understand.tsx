import Image from "next/image";
import { HeadingBlock, Slide, SlideLead } from "@/components/shared";

export function AppIntroSlide4() {
  return (
    <Slide id="app-intro-4" variant="gradient">
      <div className="flex flex-row-reverse items-center justify-center gap-28">
        <SlideLead className="max-w-xl text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
          Results that finally make sense.
          </HeadingBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-72 shrink-0">
          <Image
            src="/images/report.png"
            alt="AarthiLife app"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
