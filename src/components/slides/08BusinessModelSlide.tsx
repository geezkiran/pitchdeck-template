import {
  ComparisonTable,
  HeadingBlock,
  Slide,
  SlideIntro,
} from "@/components/shared";

export function BusinessModelSlide() {
  return (
    <Slide id="proposed-changes" variant="muted">
      <SlideIntro>
        <HeadingBlock gradient>
          Closing the promise–delivery gap at Aarthi
        </HeadingBlock>
      </SlideIntro>
      <ComparisonTable
        rows={[
          {
            label: "Sample tracking",
            before: "Smart Report shows results — but no chain-of-custody from home collection to lab",
            after: "Real-time tracking across 200+ centres with cold-chain alerts and re-draw triggers",
          },
          {
            label: "Patient identity",
            before: "Separate registrations per visit; OTP loops on care.aarthiscan.com",
            after: "One digital ID across app, WhatsApp, and all 200+ centre front desks",
          },
          {
            label: "Scheduling",
            before: "Online slots not synced to live MRI/CT capacity and specialist availability",
            after: "Unified engine across care.aarthiscan.com, call centre, and centre calendars",
          },
          {
            label: "Report delivery",
            before: "WhatsApp delivery exists but API failures leave validated reports stuck as Pending",
            after: "Redundant LIMS sync with Smart Report push and proactive 6-hour TAT notifications",
          },
        ]}
      />
    </Slide>
  );
}
