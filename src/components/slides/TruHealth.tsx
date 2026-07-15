import { HeadingBlock, ProgressGaugeCard, Slide, SlideBody } from "@/components/shared";

export function CompetitiveSlide() {
  return (
    <Slide
      id="competitive-landscape"
      className="pt-16"
      contentClassName="gap-14 md:gap-20"
      centerContent={false}
    >
      <SlideBody className="mt-0">
        <div className="flex items-center gap-3">
          <HeadingBlock size="xl" className="text-left">
            <span className="text-black">TruHealth</span>{" "}
            <span className="text-neutral-300">by Metropolis</span>
          </HeadingBlock>
          <a
            href="https://www.metropolisindia.com/newdata/investors/data/submission_to_stock_exchange/fy2024-2025/q2/se_intimation_-_investor_presentation.pdf"
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
            metropolisindia.com
          </a>
        </div>
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
