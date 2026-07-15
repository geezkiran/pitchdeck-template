import Image from "next/image";
import { HeadingBlock, Slide, SlideLead } from "@/components/shared";

export function AppIntroSlide5() {
  return (
    <Slide id="app-intro-5" variant="gradient">
      <div className="flex flex-row items-center justify-center gap-20">
        <SlideLead className="max-w-xl text-left">
          <HeadingBlock as="h2" size="xl" className="text-foreground">
            Stay updated on the schedule.
          </HeadingBlock>
        </SlideLead>
        <div className="relative aspect-[9/19] w-72 shrink-0">
          <Image
            src="/images/appointment.png"
            alt="AarthiLife app"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
