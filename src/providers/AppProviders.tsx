"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import { ThemeProvider } from "@/context/ThemeContext";

/** Composes all client-side providers in one place. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {/*
        LazyMotion + the `m` component (instead of `motion`) ships only the DOM
        animation features we use, cutting the Framer Motion bundle roughly in
        half. `strict` throws in development if `motion` is used by mistake.
        reducedMotion="user" disables transform/layout animations for users who
        prefer reduced motion.
      */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
