import { HeadingBlock, Slide, SlideLead } from "@/components/shared";

const ARTEFACTS = [
  "Package catalogues",
  "Price lists",
  "Booking flows",
  "Report downloads",
];

export function ProblemSlide() {
  return (
    <Slide id="problem" variant="muted" contentClassName="justify-center">
      <div className="flex flex-col gap-10">
        <SlideLead className="max-w-5xl">
          <HeadingBlock size="xl" className="text-foreground">
            Patients don&apos;t think in test names. They think in{" "}
            <span className="text-accent">health questions.</span>
          </HeadingBlock>
        </SlideLead>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">
            Aarthi&apos;s present experience is built around
          </p>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {ARTEFACTS.map((item) => (
              <div
                key={item}
                className="flex min-h-0 min-w-0 items-center rounded-[16px] bg-black/[0.05] p-5"
              >
                <p className="text-base font-medium leading-snug text-muted">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
          It&apos;s a transaction.{" "}
          <span className="text-muted">Not a relationship.</span>
        </p>
      </div>
    </Slide>
  );
}
