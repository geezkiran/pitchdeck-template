import { HeadingBlock, ProgressGaugeCard, Slide, SlideBody } from "@/components/shared";

export function CompetitiveSlide() {
  return (
    <Slide
      id="competitive-landscape"
      className="pt-16"
      contentClassName="gap-14 md:gap-20"
      centerContent={false}
      footerClassName="pt-1 md:pt-1.5"
      footer={
        <p className="text-left text-sm font-medium text-blue-400 break-all">
          [
          <a
            href="https://www.metropolisindia.com/newdata/investors/data/submission_to_stock_exchange/fy2024-2025/q2/se_intimation_-_investor_presentation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-600"
          >
            https://www.metropolisindia.com/newdata/investors/data/submission_to_stock_exchange/fy2024-2025/q2/se_intimation_-_investor_presentation.pdf
          </a>
          ]<sup>1</sup>
        </p>
      }
    >
      <SlideBody className="mt-0">
        <HeadingBlock size="xl" className="text-left">
          <span className="text-black">TruHealth</span>{" "}
          <span className="text-neutral-300">by Metropolis</span>
        </HeadingBlock>
      </SlideBody>

      <div className="grid h-80 grid-cols-3 gap-4">
        <ProgressGaugeCard
          value={23}
          status="TruHealth revenue growth"
          detail="YoY, Q2 FY25"
          actionLabel="View details"
          sketchDelay={0}
          reportDetails={{
            title: "TruHealth — revenue growth",
            description:
              "Metropolis reported TruHealth revenue growth of 23% year over year in Q2 FY25.",
            metrics: [
              { label: "Revenue growth", value: "+23% YoY" },
              { label: "Revenue contribution", value: "14% → 16%" },
            ],
            bullets: [
              "Strong digital interventions and personalised customer-lifecycle journeys.",
              "“Next Best Action” recommendations based on test results.",
              "Cross-selling and upselling into higher-end packages.",
            ],
          }}
        />
        <ProgressGaugeCard
          value={8}
          status="Test volume growth"
          detail="YoY, Q2 FY25"
          actionLabel="View details"
          sketchDelay={200}
          reportDetails={{
            title: "TruHealth — test volume growth",
            description:
              "Metropolis reported TruHealth test volumes increasing 8% year over year in Q2 FY25.",
            metrics: [
              { label: "Test volume growth", value: "+8% YoY" },
              { label: "Revenue per test", value: "+14% YoY" },
              { label: "Avg. package realisation", value: ">₹2,500" },
            ],
            bullets: [
              "Strong digital interventions and personalised customer-lifecycle journeys.",
              "“Next Best Action” recommendations based on test results.",
              "Cross-selling and upselling into higher-end packages.",
            ],
          }}
        />
        <ProgressGaugeCard
          value={14}
          status="Revenue per test growth"
          detail="YoY, Q2 FY25"
          actionLabel="View details"
          sketchDelay={400}
          reportDetails={{
            title: "TruHealth — revenue per test",
            description:
              "Scientifically tailored, margin-accretive packages lifted revenue per test 14% year over year in Q2 FY25.",
            metrics: [
              { label: "Revenue per test growth", value: "+14% YoY" },
              { label: "Avg. package realisation", value: ">₹2,500" },
              { label: "Revenue contribution", value: "14% → 16%" },
            ],
            bullets: [
              "Margin-accretive packages with average realisations above ₹2,500.",
              "Scientifically tailored packages built on test results.",
              "Cross-selling and upselling into higher-end packages.",
            ],
          }}
        />
      </div>
    </Slide>
  );
}
