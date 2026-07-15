import { CircularStepFlow, Slide, StepFlow } from "@/components/shared";

export function AboutSlide() {
  return (
    <Slide id="about" contentClassName="justify-center">
      <div className="grid h-full grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-16 sm:divide-x sm:divide-surface-border">
        <div className="relative flex h-full w-full flex-col items-center justify-center pt-20 md:pt-24">
          <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl font-semibold tracking-[-0.02em] text-foreground md:text-6xl">
            Traditional
          </h3>
          <StepFlow
            direction="vertical"
            autoPlay
            loop={false}
            className="w-full max-w-xs"
            steps={["Doctor prescription", "Test", "PDF report", "Relationship ends"]}
          />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center pt-20 sm:pl-6 md:pt-24">
          <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl font-semibold tracking-[-0.02em] text-foreground md:text-6xl">
            Emerging
          </h3>
          <CircularStepFlow
            accent
            autoPlay
            steps={[
              "Establish a baseline",
              "Understand results",
              "Monitor progress",
              "Retest",
              "Move to next package",
            ]}
          />
        </div>
      </div>
    </Slide>
  );
}
