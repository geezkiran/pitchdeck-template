import {
  Eyebrow,
  HeadingBlock,
  Slide,
  SlideIntro,
  StatGrid,
  StatGridGroup,
} from "@/components/shared";

export function AboutSlide() {
  return (
    <Slide id="about-aarthi">
      <SlideIntro>
        <Eyebrow>About Aarthi Scans & Labs</Eyebrow>
        <HeadingBlock>India&apos;s leading integrated diagnostic chain</HeadingBlock>
      </SlideIntro>
      <p className="max-w-3xl text-base font-medium leading-relaxed text-muted sm:text-lg">
        <span className="text-foreground">
          Founded by Er. V. Govindarajan,{" "}
        </span>
        <span className="text-muted">
          Aarthi Scan & Labs delivers MRI, CT, ultrasound, X-ray, blood tests, and preventive health
          packages across 12 states with all modalities under one roof.
        </span>
      </p>
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
