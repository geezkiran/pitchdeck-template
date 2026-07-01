"use client";

import { useEffect, useState, type RefObject } from "react";

export function useSlideActive(ref: RefObject<HTMLElement | null>) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const slide = element.closest<HTMLElement>("[data-slide]");
    if (!slide) return;

    const sync = () => setIsActive(slide.classList.contains("is-active"));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(slide, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [ref]);

  return isActive;
}
