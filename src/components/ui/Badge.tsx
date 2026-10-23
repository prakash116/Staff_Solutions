import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "primary" | "accent";
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-medium leading-none",
        tone === "neutral" && "border-border-strong bg-muted-surface text-muted",
        tone === "primary" && "border-primary/25 bg-primary/10 text-primary-text",
        tone === "accent" && "border-accent/30 bg-accent/10 text-accent-text",
        className,
      )}
    >
      {children}
    </span>
  );
}
