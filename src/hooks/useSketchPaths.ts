"use client";

import { useEffect, type RefObject } from "react";

interface SketchPathOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
}

function resetPath(path: SVGGeometryElement) {
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.style.transition = "none";
}

function drawPath(
  path: SVGGeometryElement,
  duration: number,
  delay: number
) {
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.getBoundingClientRect();
  path.style.transition = `stroke-dashoffset ${duration}ms var(--ease-apple) ${delay}ms`;
  path.style.strokeDashoffset = "0";
}

export function useSketchPaths(
  refs: RefObject<(SVGGeometryElement | null)[]>,
  isActive: boolean,
  { duration = 1400, stagger = 220, delay = 0 }: SketchPathOptions = {},
  pathCount = 0
) {
  useEffect(() => {
    const paths = refs.current
      .slice(0, pathCount || refs.current.length)
      .filter(Boolean) as SVGGeometryElement[];

    if (!paths.length) return;

    if (!isActive) {
      paths.forEach(resetPath);
      return;
    }

    paths.forEach((path, index) => {
      drawPath(path, duration, delay + index * stagger);
    });
  }, [refs, isActive, duration, stagger, delay, pathCount]);
}
