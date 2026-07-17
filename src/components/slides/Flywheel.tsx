"use client";

import { Fragment } from "react";
import { Slide, SlideBody } from "@/components/shared";

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: "personalisation" | "repeat" | "packages" | "margin";
}

const pillars: Pillar[] = [
  {
    id: "personalisation",
    title: "Digital personalisation",
    description:
      "Use previous reports, age, gender, risk profile and family history to make the experience relevant.",
    icon: "personalisation",
  },
  {
    id: "repeat",
    title: "Repeat behaviour",
    description:
      "Remind customers when an annual or clinically appropriate follow-up check is due.",
    icon: "repeat",
  },
  {
    id: "packages",
    title: "Higher-value packages",
    description:
      "Move customers from basic screening toward deeper packages when their health context justifies it.",
    icon: "packages",
  },
  {
    id: "margin",
    title: "Margin accretion",
    description:
      "Increase tests and revenue per customer while leveraging the existing laboratory, centre and home-collection infrastructure.",
    icon: "margin",
  },
];

function PillarIcon({ variant }: { variant: Pillar["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };

  switch (variant) {
    case "personalisation":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19.5c1.4-3.4 4-5 6.5-5s5.1 1.6 6.5 5" />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
          <path d="M20 4v4h-4" />
          <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
          <path d="M4 20v-4h4" />
        </svg>
      );
    case "packages":
      return (
        <svg {...common}>
          <path d="M12 3 21 8v8l-9 5-9-5V8z" />
          <path d="M3 8l9 5 9-5" />
          <path d="M12 13v8" />
        </svg>
      );
    case "margin":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M15 6h6v6" />
        </svg>
      );
  }
}

function FlywheelCircle() {
  const n = pillars.length;
  const iconR = 38;
  const textR = 60;

  return (
    <div className="relative mx-auto aspect-square h-[min(64dvh,540px)]">
      <div
        className="absolute rounded-full border border-dashed border-accent/30"
        style={{ inset: `${50 - iconR}%` }}
      />

      <h2 className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-semibold tracking-[-0.01em] text-primary">
        Growth Flywheel
      </h2>

      {pillars.map((pillar, i) => {
        const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const iconX = 50 + iconR * cos;
        const iconY = 50 + iconR * sin;
        // Align every title's top to the icon's vertical center.
        const textY = iconY;
        // Top/bottom pillars sit on the vertical axis, so their text would land
        // on top of the icon — push those blocks to the right of the icon.
        const onVerticalAxis = Math.abs(cos) < 0.01;
        const textX = onVerticalAxis ? iconX + 8 : 50 + textR * cos;

        return (
          <Fragment key={pillar.id}>
            <span
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent bg-background text-accent shadow-[var(--shadow-card)]"
              style={{ left: `${iconX}%`, top: `${iconY}%` }}
            >
              <PillarIcon variant={pillar.icon} />
            </span>
            <div
              className={`absolute flex w-40 flex-col text-left ${pillar.id === "personalisation" ? "flex-col-reverse -translate-y-[calc(100%-1rem)]" : "-translate-y-3"} ${onVerticalAxis ? "" : "-translate-x-1/2"}`}
              style={{ left: `${textX}%`, top: `${textY}%` }}
            >
              <h3 className="text-sm font-semibold leading-tight tracking-[-0.01em] text-primary">
                {pillar.title}
              </h3>
              <p className={`text-xs leading-relaxed text-muted ${pillar.id === "personalisation" ? "mb-2" : "mt-2"}`}>
                {pillar.description}
              </p>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export function BusinessModelSlide() {
  return (
    <Slide id="proposed-changes" variant="muted" contentClassName="min-h-0 items-center justify-center">
      <SlideBody className="flex min-h-0 flex-1 items-center justify-center">
        <FlywheelCircle />
      </SlideBody>
    </Slide>
  );
}
