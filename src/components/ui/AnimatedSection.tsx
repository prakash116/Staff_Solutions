"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/cn";

/*
 * CSS-driven scroll reveals (see `reveal` / `reveal-group` in globals.css and
 * useReveal). No per-element motion components: cheaper to hydrate, and
 * server-rendered content is never hidden before JavaScript runs.
 */

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before the reveal transition starts. */
  delay?: number;
  /** Render as a different element (default div). */
  as?: "div" | "section" | "ul" | "li" | "article" | "header";
}

/** Reveals its content once when it scrolls into view. Transform/opacity only. */
export function AnimatedSection({ children, className, delay = 0, as: Tag = "div" }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const style = delay > 0 ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref as never} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}

/** Container whose StaggerItem children reveal in sequence when scrolled into view. */
export function StaggerGroup({ children, className, as: Tag = "div" }: StaggerGroupProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { stagger: 70 });
  return (
    <Tag ref={ref as never} className={cn("reveal-group", className)}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  return <Tag className={className}>{children}</Tag>;
}
