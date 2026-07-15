import { AboutSlide } from "./About";
import { CompetitiveSlide } from "./TruHealth";
import { SwasthFitSlide } from "./SwasthFit";
import { ThyrocareSlide } from "./Thyrocare";
import { CompetitionAlreadySlide } from "./Introducing";
import { BusinessModelSlide } from "./Flywheel";
import { TitleSlide } from "./AarthiLife";
import { AppIntroSlide } from "./Discover";
import { AppIntroSlide2 } from "./Booking";
import { AppIntroSlide3 } from "./Track";
import { AppIntroSlide4 } from "./Understand";
import { AppIntroSlide5 } from "./Loop";
import { StatementSlide } from "./Diagnostics";
import { ProblemSlide } from "./Problem";
import { StrengthsSlide } from "./Strengths";
import { ShiftSlide } from "./Shift";
import { RelationshipSlide } from "./Relationship";

/** Narrative: introduction → statement → about → competition → solution → strengths → the shift → introducing → app intro → relationship */
export const slideSections = [
  { label: "Introduction", slides: [0, 1] },
  { label: "About", slides: [2] },
  { label: "Competition", slides: [3, 4, 5] },
  { label: "Solution", slides: [6] },
  { label: "Strengths", slides: [7] },
  { label: "The shift", slides: [8, 9] },
  { label: "Introducing", slides: [10] },
  { label: "App", slides: [11, 12, 13, 14, 15] },
  { label: "Relationship", slides: [16] },
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
  "The Shift",
  "Introducing",
  "App 1",
  "App 2",
  "App 3",
  "App 4",
  "App 5",
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
  ShiftSlide,
  CompetitionAlreadySlide,
  AppIntroSlide,
  AppIntroSlide2,
  AppIntroSlide3,
  AppIntroSlide4,
  AppIntroSlide5,
  RelationshipSlide,
];
