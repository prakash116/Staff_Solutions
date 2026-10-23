import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id?: string;
  title: string;
  intro?: string;
  /** Right-aligned slot (e.g. a "View all" link) on larger screens. */
  aside?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
}

export function SectionHeading({ id, title, intro, aside, as: Tag = "h2", size = "md", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-2xl">
        <Tag
          id={id}
          className={cn(
            "font-display font-semibold text-foreground",
            size === "lg" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          )}
        >
          {title}
        </Tag>
        {intro ? <p className="mt-4 max-w-prose text-base text-muted sm:text-lg">{intro}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
