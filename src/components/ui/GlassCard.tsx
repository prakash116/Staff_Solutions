import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  /** Adds hover elevation for interactive cards. */
  interactive?: boolean;
  /** Opaque surface instead of translucent glass (for dense text). */
  solid?: boolean;
}

const paddings = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
};

export function GlassCard({
  as: Tag = "div",
  children,
  className,
  padding = "md",
  interactive = false,
  solid = false,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-card",
        solid ? "glass-strong" : "glass",
        paddings[padding],
        interactive &&
          "transition-[box-shadow,border-color,background-color,transform] duration-300 ease-out-expo hover:border-border-strong hover:bg-surface-hover hover:shadow-glass-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
