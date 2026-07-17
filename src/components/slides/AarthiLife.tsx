import Image from "next/image";
import { Slide, SlideLead, TextBlock } from "@/components/shared";

export function TitleSlide() {
  return (
    <Slide id="title" variant="gradient">
      <SlideLead className="w-full items-center text-center">
        <div className="flex w-full items-center gap-6">
          <div className="flex flex-1 justify-end">
            <Image
              src="/images/aarthilife-logo.png"
              alt="AarthiLife"
              width={447}
              height={97}
              className="h-auto w-[20rem] max-w-full"
              priority
            />
          </div>
          <span className="h-12 w-px shrink-0 bg-foreground/15" aria-hidden />
          <div className="flex flex-1 justify-start">
            <Image
              src="/images/framer-badge.png"
              alt="TwoSpoon"
              width={285}
              height={96}
              className="h-auto w-[13rem] max-w-full invert"
            />
          </div>
        </div>
        <TextBlock size="md" className="mt-10 leading-tight">
          <span className="text-muted">
            {" "}
            Turning Aarthi’s diagnostic network into a recurring 
          </span>
          <span className="text-foreground">
            <br /> consumer-health business
          </span>
          
        </TextBlock>
      </SlideLead>
    </Slide>
  );
}
