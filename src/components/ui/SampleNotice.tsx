import { Info } from "lucide-react";

import { cn } from "@/lib/cn";

interface SampleNoticeProps {
  children: string;
  className?: string;
}

/** Clearly labels placeholder or sample content that must be replaced before launch. */
export function SampleNotice({ children, className }: SampleNoticeProps) {
  return (
    <p
      role="note"
      className={cn(
        "inline-flex max-w-prose items-start gap-2 rounded-control border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85",
        className,
      )}
    >
      <Info aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-accent-text" />
      <span>{children}</span>
    </p>
  );
}
