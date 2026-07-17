import { HeadingBlock, ProgressGaugeCard, Slide, SlideBody } from "@/components/shared";

export function ThyrocareSlide() {
  return (
    <Slide
      id="thyrocare"
      className="pt-16"
      contentClassName="gap-14 md:gap-20"
      centerContent={false}
      footerClassName="pt-1 md:pt-1.5"
      footer={
        <p className="text-left text-sm font-medium text-blue-400 break-all">
          [
          <a
            href="https://investor.thyrocare.com/wp-content/uploads/2026/05/Analyst-Call-Transcript.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-600"
          >
            https://investor.thyrocare.com/wp-content/uploads/2026/05/Analyst-Call-Transcript.pdf
          </a>
          ]<sup>3</sup>
        </p>
      }
    >
      <SlideBody className="mt-0">
        <HeadingBlock size="xl" className="text-left">
          <span className="text-black">Aarogyam</span>{" "}
          <span className="text-neutral-300">by Thyrocare</span>
        </HeadingBlock>
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
            bullets: [
              "Aarogyam continues to compound at healthy double-digit rates.",
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
