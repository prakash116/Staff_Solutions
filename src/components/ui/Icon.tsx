import { createElement } from "react";

import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";

interface IconProps {
  name: string | null | undefined;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/** Renders a Lucide icon by its JSON name. Decorative by default. */
export function Icon({ name, className, size = 20, strokeWidth = 1.75 }: IconProps) {
  // createElement with a looked-up component: the component identity is stable per icon name
  // (registry is module-level), so this does not remount on re-render.
  return createElement(getIcon(name), { "aria-hidden": true, size, strokeWidth, className: cn("shrink-0", className) });
}

/** Framed icon used on cards and lists. */
export function IconBadge({ name, className, tone = "primary" }: { name: string; className?: string; tone?: "primary" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-[0.9rem] border",
        tone === "primary"
          ? "border-primary/20 bg-primary/10 text-primary-text"
          : "border-accent/25 bg-accent/10 text-accent-text",
        className,
      )}
    >
      <Icon name={name} size={22} />
    </span>
  );
}
