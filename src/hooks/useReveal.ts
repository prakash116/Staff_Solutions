"use client";

import { useLayoutEffect, type RefObject } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const IO_MARGIN = "0px 0px -8% 0px";
/** Elements whose top is above this fraction of the viewport stay visible. */
const FOLD = 0.92;

interface RevealOptions {
  /** Per-child delay in ms; applied to direct children (stagger groups). */
  stagger?: number;
}

interface Pending {
  el: HTMLElement;
  stagger: number;
}

/*
 * All elements mounted in the same commit are measured together: every
 * getBoundingClientRect() read happens before any DOM write, so a page with
 * many revealed sections costs one layout pass instead of one per section.
 */
const queue: Pending[] = [];
const observers = new WeakMap<HTMLElement, IntersectionObserver>();
let flushScheduled = false;

function flush() {
  flushScheduled = false;
  const items = queue.splice(0);
  if (items.length === 0) return;

  const fold = window.innerHeight * FOLD;
  // Reads
  const belowFold = items.filter(({ el }) => el.isConnected && el.getBoundingClientRect().top >= fold);
  // Writes
  for (const { el, stagger } of belowFold) {
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
          observers.delete(el);
        }
      },
      { rootMargin: IO_MARGIN },
    );
    io.observe(el);
    observers.set(el, io);
  }
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

    queue.push({ el, stagger });
    if (!flushScheduled) {
      flushScheduled = true;
      // Microtask: runs after every layout effect in this commit, still before paint.
      queueMicrotask(flush);
    }

    return () => {
      const index = queue.findIndex((p) => p.el === el);
      if (index !== -1) queue.splice(index, 1);
      observers.get(el)?.disconnect();
      observers.delete(el);
      delete el.dataset.reveal;
    };
  }, [ref, stagger]);
}
