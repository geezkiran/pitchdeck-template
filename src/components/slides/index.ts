import { AboutSlide } from "./About";
import { CompetitiveSlide } from "./TruHealth";
import { SwasthFitSlide } from "./SwasthFit";
import { ThyrocareSlide } from "./Thyrocare";
import { CompetitionAlreadySlide } from "./Introducing";
import { BusinessModelSlide } from "./Flywheel";
import { PerformanceSlide } from "./Performance";
import { TitleSlide } from "./AarthiLife";
import { AppIntroSlide } from "./Discover";
import { AppIntroSlide2 } from "./Booking";
import { AppIntroSlide3 } from "./Track";
import { AppIntroSlide4 } from "./Understand";
import { AppIntroSlide5 } from "./Loop";
import { StatementSlide } from "./Diagnostics";
import { ProblemSlide } from "./Problem";
import { StrengthsSlide } from "./Strengths";
import { SmarterSlide } from "./Smarter";
import { ShiftSlide } from "./Shift";
import { RelationshipSlide } from "./Relationship";

/** Narrative: introduction → statement → about → competition → solution → strengths → the shift → introducing → app intro → expected results → relationship */
export const slideSections = [
  { label: "Introduction", slides: [0, 1] },
  { label: "About", slides: [2] },
  { label: "Competition", slides: [3, 4, 5] },
  { label: "Solution", slides: [6] },
  { label: "Strengths", slides: [7] },
  { label: "The shift", slides: [8, 9, 10] },
  { label: "Introducing", slides: [11] },
  { label: "App", slides: [12, 13, 14, 15, 16] },
  { label: "Expected results", slides: [17] },
  { label: "Relationship", slides: [18] },
] as const;

export const slideLabels = [
  "Introduction",
  "Statement",
  "About Aarthi",
  "TruHealth",
  "SwasthFit",
  "Thyrocare",
  "Key Initiatives",
  "Strengths",
  "The Problem",
  "Smarter",
  "The Shift",
  "Introducing",
  "App 1",
  "App 2",
  "App 3",
  "App 4",
  "App 5",
  "Performance",
  "Relationship",
];

export const slides = [
  TitleSlide,
  StatementSlide,
  AboutSlide,
  CompetitiveSlide,
  SwasthFitSlide,
  ThyrocareSlide,
  BusinessModelSlide,
  StrengthsSlide,
  ProblemSlide,
  SmarterSlide,
  ShiftSlide,
  CompetitionAlreadySlide,
  AppIntroSlide,
  AppIntroSlide2,
  AppIntroSlide3,
  AppIntroSlide4,
  AppIntroSlide5,
  PerformanceSlide,
  RelationshipSlide,
];
