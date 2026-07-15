import { HeadingBlock, ProgressGaugeCard, Slide, SlideBody } from "@/components/shared";

export function ThyrocareSlide() {
  return (
    <Slide
      id="thyrocare"
      className="pt-16"
      contentClassName="gap-14 md:gap-20"
      centerContent={false}
    >
      <SlideBody className="mt-0">
        <div className="flex items-center gap-3">
          <HeadingBlock size="xl" className="text-left">
            <span className="text-black">Aarogyam</span>{" "}
            <span className="text-neutral-300">by Thyrocare</span>
          </HeadingBlock>
          <a
            href="https://investor.thyrocare.com/wp-content/uploads/2026/05/Analyst-Call-Transcript.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 translate-y-[14px] items-center gap-1 rounded-full bg-gray-400/[0.06] px-2.5 py-1 text-xs font-medium text-neutral-500 transition-colors hover:bg-gray-400/[0.1]"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
            </svg>
            thyrocare.com
          </a>
        </div>
      </SlideBody>

      <div className="grid h-80 grid-cols-3 gap-4">
        <ProgressGaugeCard
          value={33}
          status="Share of overall business mix"
          detail="Aarogyam"
          actionLabel="View details"
          sketchDelay={0}
          reportDetails={{
            title: "Aarogyam — share of business mix",
            description:
              "Thyrocare reported Aarogyam at approximately 33% of its overall business mix.",
            metrics: [
              { label: "Share of business mix", value: "~33%" },
              { label: "YoY growth", value: "~19–20%" },
            ],
            bullets: [
              "Bundling more relevant tests into each customer visit creates operating leverage.",
              "Once a sample tube is being processed, running additional tests consumes only marginal additional laboratory capacity.",
            ],
          }}
        />
        <ProgressGaugeCard
          value={20}
          status="Aarogyam growth"
          detail="~19–20% YoY"
          actionLabel="View details"
          sketchDelay={200}
          reportDetails={{
            title: "Aarogyam — year-over-year growth",
            description: "Thyrocare reported Aarogyam growing approximately 19–20% year over year.",
            metrics: [
              { label: "Aarogyam growth", value: "~19–20% YoY" },
              { label: "Share of business mix", value: "~33%" },
              { label: "Tests per patient", value: "~11" },
            ],
          }}
        />
        <ProgressGaugeCard
          value={66}
          status="Jaanch growth"
          detail="~2% of revenue, YoY"
          actionLabel="View details"
          sketchDelay={400}
          reportDetails={{
            title: "Jaanch — year-over-year growth",
            description:
              "Jaanch is only around 2% of revenue today but is growing 66% year over year.",
            metrics: [
              { label: "Jaanch growth", value: "+66% YoY" },
              { label: "Share of revenue", value: "~2%" },
              { label: "Tests per patient", value: "~11" },
            ],
            bullets: [
              "More relevant tests per customer can increase revenue without requiring a proportional increase in laboratory capacity.",
            ],
          }}
        />
      </div>
    </Slide>
  );
}
