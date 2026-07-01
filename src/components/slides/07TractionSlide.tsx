import {
  HeadingBlock,
  Slide,
  SlideIntro,
  StatGrid,
  StatGridGroup,
  TextBlock,
} from "@/components/shared";

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
