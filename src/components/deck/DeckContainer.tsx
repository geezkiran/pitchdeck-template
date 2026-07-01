"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { SlideNav } from "./SlideNav";
import { ScrollHint } from "./ScrollHint";

interface DeckContainerProps {
  children: React.ReactNode;
  slideLabels: string[];
}

const SCROLL_HINT_IDLE_MS = 6000;

export function DeckContainer({ children, slideLabels }: DeckContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollHintVisible, setScrollHintVisible] = useState(false);
  const activeIndexRef = useRef(0);
  const scrollEndTimerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  const resetScrollHintIdle = useCallback(() => {
    setScrollHintVisible(false);
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      setScrollHintVisible(true);
    }, SCROLL_HINT_IDLE_MS);
  }, []);

  const getSlides = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
  }, []);

  const setSlideActiveStates = useCallback(
    (index: number) => {
      getSlides().forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });
    },
    [getSlides]
  );

  const updateActiveSlide = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = getSlides();
    if (!slides.length) return;

    const viewportCenter = container.scrollTop + container.clientHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetTop + slide.offsetHeight / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestIndex;
      setActiveIndex(closestIndex);
      setSlideActiveStates(closestIndex);
    }
  }, [getSlides, setSlideActiveStates]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setSlideActiveStates(0);

    const onScroll = () => {
      resetScrollHintIdle();
      updateActiveSlide();
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = window.setTimeout(updateActiveSlide, 80);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSlide);
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [updateActiveSlide, setSlideActiveStates, resetScrollHintIdle]);

  useEffect(() => {
    resetScrollHintIdle();

    const onActivity = () => resetScrollHintIdle();
    const activityEvents = [
      "mousemove",
      "mousedown",
      "touchstart",
      "keydown",
      "wheel",
    ] as const;

    activityEvents.forEach((event) => {
      window.addEventListener(event, onActivity, { passive: true });
    });

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, onActivity);
      });
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetScrollHintIdle]);

  const scrollToSlide = useCallback(
    (index: number) => {
      const slides = getSlides();
      const slide = slides[index];
      if (!slide) return;

      activeIndexRef.current = index;
      setActiveIndex(index);
      setSlideActiveStates(index);
      resetScrollHintIdle();

      slide.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [getSlides, setSlideActiveStates, resetScrollHintIdle]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const nextKeys = ["ArrowDown", "ArrowRight", "PageDown", " "];
      const prevKeys = ["ArrowUp", "ArrowLeft", "PageUp"];

      if (nextKeys.includes(event.key)) {
        event.preventDefault();
        scrollToSlide(Math.min(activeIndexRef.current + 1, slideLabels.length - 1));
      }
      if (prevKeys.includes(event.key)) {
        event.preventDefault();
        scrollToSlide(Math.max(activeIndexRef.current - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToSlide, slideLabels.length]);

  return (
    <div className="relative h-dvh">
      <div
        ref={containerRef}
        className={cn(
          "deck-scroll h-dvh snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
        )}
      >
        {children}
      </div>

      <ScrollHint
        visible={
          scrollHintVisible && activeIndex < slideLabels.length - 1
        }
      />

      <SlideNav
        labels={slideLabels}
        activeIndex={activeIndex}
        onNavigate={scrollToSlide}
      />
    </div>
  );
}
