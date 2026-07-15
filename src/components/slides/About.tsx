import { CircularStepFlow, Slide, StepFlow } from "@/components/shared";

export function AboutSlide() {
  return (
    <Slide id="about" contentClassName="justify-center">
      <div className="grid h-full grid-cols-2 items-center gap-16 divide-x divide-surface-border">
        <div className="relative flex h-full w-full flex-col items-center justify-center pt-24">
          <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl font-semibold tracking-[-0.02em] text-foreground">
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

        <div className="relative flex h-full flex-col items-center justify-center pl-6 pt-24">
          <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl font-semibold tracking-[-0.02em] text-foreground">
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
