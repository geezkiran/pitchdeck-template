import Image from "next/image";
import { HeadingBlock, Slide, SlideLead } from "@/components/shared";

export function AppIntroSlide3() {
  return (
    <Slide id="app-intro-3" variant="gradient">
      <div className="flex flex-row items-center justify-between gap-24">
        <SlideLead className="max-w-xl text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
            Tracking from pickup to report.
          </HeadingBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-72 shrink-0">
          <Image
            src="/images/app-screenshot-3.png"
            alt="AarthiLife app"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
