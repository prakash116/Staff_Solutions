"use client";

import { useLayoutEffect, type RefObject } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const IO_MARGIN = "0px 0px -8% 0px";

interface RevealOptions {
  /** Per-child delay in ms; applied to direct children (stagger groups). */
  stagger?: number;
}

/**
 * Scroll reveal without hiding server-rendered content.
 *
 * Content is visible in the HTML (so it paints, and counts as LCP, before
 * hydration). In a layout effect — before the browser paints the hydrated
 * tree — elements that start below the first viewport get `data-reveal="pending"`
 * (CSS hides them) and an IntersectionObserver removes it when they scroll into
 * view, letting the CSS transition run. Above-the-fold content is never touched.
 * Respects prefers-reduced-motion by doing nothing.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, { stagger = 0 }: RevealOptions = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    // Already (partly) in the first viewport: leave visible.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    if (stagger > 0) {
      Array.from(el.children).forEach((child, index) => {
        (child as HTMLElement).style.transitionDelay = `${index * stagger}ms`;
      });
    }
    el.dataset.reveal = "pending";

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          delete el.dataset.reveal;
          io.disconnect();
        }
      },
      { rootMargin: IO_MARGIN },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, stagger]);
}
