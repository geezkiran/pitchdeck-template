import { HeadingBlock, ProgressGaugeCard, Slide, SlideBody } from "@/components/shared";

export function SwasthFitSlide() {
  return (
    <Slide
      id="swasthfit"
      className="pt-16"
      contentClassName="gap-14 md:gap-20"
      centerContent={false}
      footerClassName="pt-1 md:pt-1.5"
      footer={
        <p className="text-left text-sm font-medium text-blue-400 break-all">
          [
          <a
            href="https://media.lalpathlabs.com/2026-01/3638e680-09b9-4386-aff2-1da0575cfc12.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-600"
          >
            https://media.lalpathlabs.com/2026-01/3638e680-09b9-4386-aff2-1da0575cfc12.pdf
          </a>
          ]<sup>2</sup>
        </p>
      }
    >
      <SlideBody className="mt-0">
        <HeadingBlock size="xl" className="text-left">
          <span className="text-black">SwasthFit</span>{" "}
          <span className="text-neutral-300">by Dr Lal PathLab</span>
        </HeadingBlock>
      </SlideBody>

      <div className="grid h-80 grid-cols-3 gap-4">
        <ProgressGaugeCard
          value={26}
          status="Share of Dr Lal PathLabs"
          detail="Up from 23% in Q3 FY25"
          actionLabel="View details"
          sketchDelay={0}
          reportDetails={{
            title: "SwasthFit — share of business",
            description:
              "SwasthFit has grown from an offering into a material revenue franchise for Dr Lal PathLabs.",
            metrics: [
              { label: "Share of business, Q3 FY26", value: "26%" },
              { label: "Share of business, Q3 FY25", value: "23%" },
            ],
            bullets: ["Preventive packages are now core business for Dr Lal PathLabs."],
          }}
        />
        <ProgressGaugeCard
          value={10.6}
          status="Revenue growth"
          detail="YoY, Q3 FY26"
          actionLabel="View details"
          sketchDelay={200}
          reportDetails={{
            title: "SwasthFit — revenue growth",
            description: "Dr Lal PathLabs reported revenue growth of 10.6% in Q3 FY26.",
            metrics: [{ label: "Revenue growth, Q3 FY26", value: "+10.6% YoY" }],
            bullets: ["Steady double-digit top-line growth in a competitive market."],
          }}
        />
        <ProgressGaugeCard
          value={16.3}
          status="EBITDA growth"
          detail="Pre-exceptional items, Q3 FY26"
          actionLabel="View details"
          sketchDelay={400}
          reportDetails={{
            title: "SwasthFit — EBITDA growth",
            description:
              "EBITDA before exceptional items grew 16.3% in Q3 FY26, outpacing revenue growth.",
            metrics: [
              { label: "EBITDA growth (pre-exceptional), Q3 FY26", value: "+16.3% YoY" },
              { label: "Revenue growth, Q3 FY26", value: "+10.6% YoY" },
            ],
            bullets: ["Profitability is expanding faster than revenue."],
          }}
        />
      </div>
    </Slide>
  );
}
