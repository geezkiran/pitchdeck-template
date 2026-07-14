import { CircularStepFlow, Slide, StepFlow } from "@/components/shared";

export function AboutSlide() {
  return (
    <Slide id="about" contentClassName="justify-center">
      <div className="grid h-full grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-16 sm:divide-x sm:divide-surface-border">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h3 className="mb-4 text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl">
            Traditional
          </h3>
          <StepFlow
            direction="vertical"
            className="w-full max-w-xs"
            steps={["Doctor prescription", "Test", "PDF report", "Relationship ends"]}
          />
        </div>

        <div className="flex h-full flex-col items-center justify-center sm:pl-6">
          <h3 className="mb-4 text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl">
            Emerging
          </h3>
          <CircularStepFlow
            accent
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
