import { AboutSlide } from "./02AboutSlide";
import { CompetitiveSlide } from "./03CompetitiveSlide";
import { IndustryDirectionSlide } from "./04IndustryDirectionSlide";
import { SolutionSlide } from "./05SolutionSlide";
import { TractionSlide } from "./08TractionSlide";
import { TeamSlide } from "./11TeamSlide";
import { ImpactSlide } from "./12ImpactSlide";
import { PerformanceSlide } from "./13PerformanceSlide";
import { AskSlide } from "./14AskSlide";
import { TitleSlide } from "./01TitleSlide";

/** Narrative: introduction → about → current market → future market → loose ends → solution → expected results → ask */
export const slideSections = [
  { label: "Introduction", slides: [0] },
  { label: "About", slides: [1] },
  { label: "Current market", slides: [2] },
  { label: "Future market", slides: [3] },
  { label: "Loose ends", slides: [4, 5] },
  { label: "Solution", slides: [6] },
  { label: "Expected results", slides: [7, 8] },
  { label: "The ask", slides: [9] },
] as const;

export const slideLabels = [
  "Introduction",
  "About Aarthi",
  "Current Market",
  "Future Market",
  "Future Readiness",
  "Voice of Customer",
  "Key Initiatives",
  "Impact",
  "Performance",
  "The Ask",
];

export const slides = [
  TitleSlide,
  AboutSlide,
  CompetitiveSlide,
  IndustryDirectionSlide,
  SolutionSlide,
  TractionSlide,
  TeamSlide,
  ImpactSlide,
  PerformanceSlide,
  AskSlide,
];
