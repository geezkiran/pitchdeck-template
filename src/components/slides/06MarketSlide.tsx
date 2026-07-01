import {
  ComparisonTable,
  HeadingBlock,
  Slide,
  SlideIntro,
  TextBlock,
} from "@/components/shared";

export function MarketSlide() {
  return (
    <Slide id="report-delays" variant="muted">
      <SlideIntro>
        <HeadingBlock>Why reports get delayed</HeadingBlock>
      </SlideIntro>
      <TextBlock size="sm">
        Over 60% of delays happen before a sample reaches Roche or Bio-Rad
        analyzers. Even with Smart Report and 8 AI radiology tools, pre- and
        post-analytical bottlenecks stall delivery.
      </TextBlock>
      <ComparisonTable
        rows={[
          {
            label: "Pre-analytical",
            before:
              "Hemolysis forces re-draws; hub-and-spoke transit across 200+ centres stalls; barcode mismatches at front desk",
            after:
              "End-to-end sample tracking from home collection to NABL lab; digital ID onboarding",
          },
          {
            label: "Analytical",
            before:
              "Critical-value re-runs on Siemens machines, QC calibration failures, reagent stockouts",
            after:
              "Predictive maintenance on imported equipment, automated QC alerts, inventory forecasting",
          },
          {
            label: "Post-analytical",
            before:
              "Pathologist sign-off backlogs, manual transcription, LIMS-to-WhatsApp/app API failures",
            after:
              "Priority validation queues, auto-capture to LIMS, redundant sync with instant WhatsApp delivery",
          },
        ]}
      />
    </Slide>
  );
}
