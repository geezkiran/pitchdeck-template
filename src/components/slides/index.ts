import { AboutSlide } from "./About";
import { CompetitiveSlide } from "./TruHealth";
import { SwasthFitSlide } from "./SwasthFit";
import { ThyrocareSlide } from "./Thyrocare";
import { CompetitionAlreadySlide } from "./Introducing";
import { BusinessModelSlide } from "./Flywheel";
import { PerformanceSlide } from "./Performance";
import { AskSlide } from "./Patients";
import { TitleSlide } from "./AarthiLife";
import { AppIntroSlide } from "./Discover";
import { AppIntroSlide2 } from "./Booking";
import { AppIntroSlide3 } from "./Track";
import { AppIntroSlide4 } from "./Understand";
import { AppIntroSlide5 } from "./Loop";
import { StatementSlide } from "./Diagnostics";
import { Blank8GridSlide } from "./Blank8Grid";

/** Narrative: introduction → statement → about → competition → solution → introducing → app intro → expected results → ask */
export const slideSections = [
  { label: "Introduction", slides: [0, 1] },
  { label: "About", slides: [2] },
  { label: "Competition", slides: [3, 4, 5] },
  { label: "Solution", slides: [6] },
  { label: "Blank", slides: [7] },
  { label: "Introducing", slides: [8] },
  { label: "App", slides: [9, 10, 11, 12, 13] },
  { label: "Expected results", slides: [14] },
  { label: "The ask", slides: [15] },
] as const;

export const slideLabels = [
  "Introduction",
  "Statement",
  "About Aarthi",
  "TruHealth",
  "SwasthFit",
  "Thyrocare",
  "Key Initiatives",
  "Blank",
  "Introducing",
  "App 1",
  "App 2",
  "App 3",
  "App 4",
  "App 5",
  "Performance",
  "The Ask",
];

export const slides = [
  TitleSlide,
  StatementSlide,
  AboutSlide,
  CompetitiveSlide,
  SwasthFitSlide,
  ThyrocareSlide,
  BusinessModelSlide,
  Blank8GridSlide,
  CompetitionAlreadySlide,
  AppIntroSlide,
  AppIntroSlide2,
  AppIntroSlide3,
  AppIntroSlide4,
  AppIntroSlide5,
  PerformanceSlide,
  AskSlide,
];
