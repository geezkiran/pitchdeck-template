import {
  BulletList,
  ComparisonTable,
  CTABlock,
  DescriptiveText,
  Eyebrow,
  FeatureCarousel,
  FeatureGrid,
  HeadingBlock,
  Icon3D,
  Slide,
  SlideIntro,
  SplitBlock,
  StatGrid,
  StatGridGroup,
  TextBlock,
  Timeline,
} from "@/components/blocks";
import { PerformanceChart } from "@/components/blocks/PerformanceChart";
import { ProgressGaugeCard } from "@/components/blocks/ProgressGaugeCard";
import { SpotlightBlock } from "@/components/blocks/SpotlightBlock";

export function TitleSlide() {
  return (
    <Slide id="title" variant="gradient">
      <div className="flex w-full flex-col items-start gap-6 md:gap-8">
        
        <HeadingBlock as="h1" size="xl" gradient>
           
          Aarthi Scan & Labs Case Study
        </HeadingBlock>
        <TextBlock size="md">
        <span className="text-muted">
        {" "}
            A phased plan to close the gap between Aarthi Lab&apos;s promise — 
            </span>
            <span className="text-foreground"> 200+
            centres, 6-hour reports, 60% scan savings
          </span>
          <span className="text-muted">
            {" "}
            — and the operational friction patients experience today.
          </span>
        </TextBlock>
        <CTABlock
          primaryLabel="Schedule a meeting with us"
          primaryHref="mailto:santosh@twospoon.ai"
          primaryVariant="gradient"
          secondaryLabel="View proposal"
          secondaryHref="#roadmap"
        />
      </div>
    </Slide>
  );
}

export function AboutSlide() {
  return (
    <Slide id="about-aarthi">
      <SlideIntro>
        <Eyebrow>About Aarthi Scans & Labs</Eyebrow>
        <HeadingBlock>India&apos;s leading integrated diagnostic chain</HeadingBlock>
      </SlideIntro>
      <DescriptiveText size="sm">
        <DescriptiveText.Primary>
          Founded by Er. V. Govindarajan,{" "}
        </DescriptiveText.Primary>
        
        <DescriptiveText.Muted>
          {" "}
          Aarthi Scan & Labs delivers MRI, CT, ultrasound, X-ray, blood tests, and preventive health
          packages across 12 states with all modalities under one roof.
        </DescriptiveText.Muted>
      </DescriptiveText>
      <StatGridGroup>
        <StatGrid
          columns={4}
          stats={[
            { value: "38", label: "Years of trust" },
            { value: "200+", label: "Centres across India" },
            { value: "8", label: "AI radiology models" },
            
          ]}
        />
        <StatGrid
          columns={4}
          stats={[
            { value: "9", label: "NABL accreditations" },
            { value: "10", label: "NABH accreditations" },
          ]}
        />
      </StatGridGroup>
      

    </Slide>
  );
}

export function SolutionSlide() {
  return (
    <Slide id="lab-operations" variant="muted">
      <SlideIntro>
        <Eyebrow>Operational pain points</Eyebrow>
        <HeadingBlock>Scale is exposing execution gaps</HeadingBlock>
      </SlideIntro>
      <SplitBlock
        left={
          <BulletList
            items={[
              {
                text: "Preventive packages from ₹999 and 60% scan discounts drive volume — but margin pressure and reagent costs strain 200+ centres",
                highlight: true,
              },
              {
                text: "Home blood collection across 12 states suffers phlebotomist turnover, scheduling errors, and cold-chain breaks in transit to hub labs",
                highlight: true,
              },
              {
                text: "care.aarthiscan.com, franchisee billing, and LIMS fall out of sync — causing OTP loops, missing reports, and broken tracking",
                highlight: true,
              },
              {
                text: "High-volume front desks at peak hours introduce data entry errors that delay the 6-hour report promise",
                highlight: true,
              },
            ]}
          />
        }
        
        
      />
    </Slide>
  );
}

export function ProductSlide() {
  return (
    <Slide
      id="patient-experience"
      contentClassName="min-w-0 gap-6 md:gap-7"
    >
      <SlideIntro>
        <HeadingBlock>Trust breaks despite world-class infrastructure</HeadingBlock>
      </SlideIntro>
      <FeatureCarousel
        className="mt-10 min-w-0"
        features={[
          {
            icon: <Icon3D variant="orchestration" />,
            title: "Phantom appointments",
            description:
              "Online bookings via care.aarthiscan.com confirm slots — patients arrive to find specialists unavailable or capacity mismatched.",
            accent: "blue",
          },
          {
            icon: <Icon3D variant="guardrails" />,
            title: "Broken digital onboarding",
            description:
              "Registration loops on the patient app lock users out when their mobile number is already registered — blocking report access.",
            accent: "purple",
          },
          {
            icon: <Icon3D variant="team" />,
            title: "Home collection no-shows",
            description:
              "Fasting patients wait for phlebotomists who miss windows without tracking updates — despite Aarthi's home collection service.",
            accent: "green",
          },
          {
            icon: <Icon3D variant="pricing" />,
            title: "TAT & pricing friction",
            description:
              "Promised 6-hour turnaround stretches to days. Published online prices sometimes conflict with on-site surcharges at centres.",
            accent: "sand",
          },
        ]}
      />
    </Slide>
  );
}

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

export function TractionSlide() {
  return (
    <Slide id="voice-of-customer">
      <SlideIntro>
        <HeadingBlock>What patients report most</HeadingBlock>
      </SlideIntro>
      <TextBlock size="sm">
        Against a 4.8 star average across 28,000+ reviews, these gaps appear
        repeatedly in feedback and directly affect medical decisions.
      </TextBlock>
      <StatGridGroup>
        <StatGrid
          columns={4}
          stats={[
            { value: "#1", label: "Booking & scheduling" },
            { value: "#2", label: "Report delays" },
            { value: "#3", label: "Customer support" },
            { value: "#4", label: "Technical bugs" },
          ]}
        />
        <StatGrid
          columns={4}
          stats={[
            { value: "#5", label: "Staff behaviour" },
            { value: "#6", label: "Pricing & refunds" },
            { value: "#7", label: "Mismatched results" },
          ]}
        />
      </StatGridGroup>
    </Slide>
  );
}

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

export function RoadmapSlide() {
  return (
    <Slide id="roadmap">
      <SlideIntro>
        <HeadingBlock>Phased rollout across 12 states</HeadingBlock>
      </SlideIntro>
      <Timeline
        entries={[
          {
            period: "Phase 1 · Q3 2026",
            title: "Digital foundation",
            description:
              "Fix care.aarthiscan.com OTP loops, deploy digital ID onboarding, and add failover on LIMS-to-WhatsApp sync.",
          },
          {
            period: "Phase 2 · Q4 2026",
            title: "Operations & tracking",
            description:
              "End-to-end sample tracking for home collection, phlebotomist route optimization, cold-chain monitoring.",
          },
          {
            period: "Phase 3 · Q1 2027",
            title: "Booking & capacity",
            description:
              "Live slot validation for MRI, CT, and ultrasound across all 200+ centres and home collection.",
          },
          {
            period: "Phase 4 · Q2 2027",
            title: "Intelligence & scale",
            description:
              "Extend 8 AI models to TAT forecasting, Smart Report trend alerts, and predictive inventory for assay kits.",
          },
        ]}
      />
    </Slide>
  );
}

export function TeamSlide() {
  return (
    <Slide id="initiatives" variant="muted">
      <SlideIntro>
        <HeadingBlock>Four pillars to close the gap</HeadingBlock>
      </SlideIntro>
      <FeatureGrid
        columns={2}
        features={[
          {
            icon: <Icon3D variant="orchestration" />,
            title: "Report tracking",
            description:
              "Track every sample from home collection through NABL-accredited processing to Smart Report delivery.",
          },
          {
            icon: <Icon3D variant="memory" />,
            title: "Digital ID onboarding",
            description:
              "One verified profile across care.aarthiscan.com — eliminating duplicate registrations and barcode mismatches.",
          },
          {
            icon: <Icon3D variant="tools" />,
            title: "Unified scheduling",
            description:
              "Sync online booking to live Siemens MRI/CT capacity — no more phantom appointments.",
          },
          {
            icon: <Icon3D variant="guardrails" />,
            title: "Reliable WhatsApp delivery",
            description:
              "Redundant sync so every validated report reaches patients instantly — honouring the 6-hour promise.",
          },
        ]}
      />
    </Slide>
  );
}

export function ImpactSlide() {
  return (
    <Slide id="impact">
      <SpotlightBlock
        title="6-hour reports"
        subtitle="Proposed digital workflow across booking, lab operations, and patient delivery."
        statPrefix="Up to"
        statValue="90%"
        statLabel="faster report turnaround"
        imageSrc="/images/iphone-17-pro-deep-blue-portrait.png"
        imageAlt="iPhone displaying patient reports"
        imageLayout="viewport-edge"
        imageFootnote="Image shown is a prototype and is subject to changes in the production-ready application."
      />
    </Slide>
  );
}

export function PerformanceSlide() {
  return (
    <Slide
      id="performance"
      variant="muted"
      className="items-stretch justify-start pb-28 pt-16 md:pb-32 md:pt-20"
      contentClassName="flex min-h-[calc(100dvh-10rem)] flex-1 flex-col gap-4 md:min-h-[calc(100dvh-11rem)] md:gap-5"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="grid flex-1 grid-cols-1 items-stretch gap-4 lg:grid-cols-[8fr_4fr] lg:gap-3">
          <PerformanceChart
            framed
            className="h-full min-h-0"
            xAxis={{
              label: "Operational overhead index",
              min: 0,
              max: 100,
              ticks: [0, 20, 40, 60, 80, 100],
            }}
            yAxis={{
              label: "Relative patient trust",
              min: 0,
              max: 200,
              ticks: [0, 50, 100, 150, 200],
            }}
            series={[
              {
                id: "aarthi-proposed",
                label: "Aarthi Labs (proposed)",
                variant: "primary",
                points: [
                  { x: 10, y: 50 },
                  { x: 22, y: 95 },
                  { x: 35, y: 130 },
                  { x: 48, y: 165 },
                  { x: 60, y: 190 },
                ],
              },
              {
                id: "current-state",
                label: "Current operations",
                variant: "secondary",
                points: [
                  { x: 25, y: 20 },
                  { x: 45, y: 45 },
                  { x: 70, y: 72 },
                  { x: 88, y: 86 },
                ],
              },
            ]}
            annotation={{ x: 60, label: "90%" }}
          />
          <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-3">
            <ProgressGaugeCard
              value={64}
              status="Phase 1 in progress"
              detail="120 of 200+ centres onboarded"
              actionLabel="View details"
              sketchDelay={400}
              reportDetails={{
                title: "Centre rollout — Phase 1",
                description:
                  "Digital foundation rollout across priority hubs before national scale-up.",
                metrics: [
                  { label: "Completion", value: "64%" },
                  { label: "Centres live", value: "120 / 200+" },
                  { label: "States in scope", value: "12" },
                  { label: "Target completion", value: "Q3 2026" },
                ],
                bullets: [
                  "Unified booking and patient identity layer at each onboarded centre.",
                  "LIMS-to-app sync for report status and WhatsApp delivery.",
                  "Remaining centres queued by volume and post-analytical delay risk.",
                ],
              }}
            />
            <ProgressGaugeCard
              value={90}
              status="6-hour TAT target"
              detail="Vs. industry average turnaround"
              actionLabel="View details"
              sketchDelay={620}
              reportDetails={{
                title: "6-hour report delivery",
                description:
                  "Share of reports delivered within the 6-hour promise vs. current industry benchmarks.",
                metrics: [
                  { label: "On-target delivery", value: "90%" },
                  { label: "TAT promise", value: "6 hours" },
                  { label: "Industry average", value: "~18 hours" },
                  { label: "Measurement window", value: "Last 90 days" },
                ],
                bullets: [
                  "Priority validation queues for critical and home-collection samples.",
                  "Redundant WhatsApp and app delivery paths when primary sync fails.",
                  "Pre-analytical delays remain the main lever to reach 95%+.",
                ],
              }}
            />
          </div>
        </div>
        <p className="mx-auto mt-5 shrink-0 w-full text-center text-[10px] leading-none whitespace-nowrap text-muted/60 md:mt-6 md:text-[11px]">
          Proposed operating model vs. current patient feedback trends across booking, report delivery, and support.
        </p>
      </div>
    </Slide>
  );
}

export function AskSlide() {
  return (
    <Slide id="next-steps" variant="gradient">
      <SlideIntro>
        <HeadingBlock size="lg" gradient>
          Patients served with zero friction
        </HeadingBlock>
      </SlideIntro>
      <StatGrid
        columns={3}
        stats={[
          {
            value: "60%",
            label: "Delays are pre-analytical",
            description: "Addressable via tracking & digital ID",
          },
          {
            value: "200+",
            label: "Centres to unify",
            description: "Single booking & identity layer",
          },
          { value: "6 hrs", label: "TAT promise to defend", description: "With redundant report delivery" },
        ]}
      />
      <TextBlock size="sm">
        We propose a joint working session with Aarthi leadership to prioritize
        Phase 1 — aligning operational fixes with the vision Er. V. Govindarajan
        built over 38 years.
      </TextBlock>
      <CTABlock
        primaryLabel="Get Quote"
        primaryHref="mailto:santosh@twospoon.ai"
        primaryVariant="gradient"
        secondaryLabel="Get in touch with us"
        secondaryHref="https://care.aarthiscan.com/appointments"
      />
    </Slide>
  );
}

export const slideLabels = [
  "Title",
  "About Aarthi",
  "Lab Operations",
  "Patient Experience",
  "Report Delays",
  "Voice of Customer",
  "Proposed Changes",
  "Roadmap",
  "Key Initiatives",
  "Impact",
  "Performance",
  "Next Steps",
];

export const slides = [
  TitleSlide,
  AboutSlide,
  SolutionSlide,
  ProductSlide,
  MarketSlide,
  TractionSlide,
  BusinessModelSlide,
  RoadmapSlide,
  TeamSlide,
  ImpactSlide,
  PerformanceSlide,
  AskSlide,
];
