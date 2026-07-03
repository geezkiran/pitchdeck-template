import { AboutSlide } from "./02AboutSlide";
import { CompetitiveSlide } from "./03CompetitiveSlide";
import { IndustryDirectionSlide } from "./04IndustryDirectionSlide";
import { SolutionSlide } from "./05SolutionSlide";
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
  { label: "Loose ends", slides: [4] },
  { label: "Solution", slides: [5] },
  { label: "Expected results", slides: [6, 7] },
  { label: "The ask", slides: [8] },
] as const;

export const slideLabels = [
  "Introduction",
  "About Aarthi",
  "Current Market",
  "Future Market",
  "Future Readiness",
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
  TeamSlide,
  ImpactSlide,
  PerformanceSlide,
  AskSlide,
];
