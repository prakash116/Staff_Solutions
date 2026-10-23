import type { ReactNode } from "react";

import { PageContainer } from "@/components/ui/PageContainer";
import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Adds a fading hairline rule above the section. */
  rule?: boolean;
  "aria-labelledby"?: string;
}

export function SectionWrapper({
  id,
  className,
  containerClassName,
  children,
  rule = false,
  "aria-labelledby": labelledBy,
}: SectionWrapperProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative scroll-mt-24 py-16 sm:py-20 lg:py-24", className)}>
      {rule ? (
        <PageContainer>
          <div className="rule-fade mb-16 sm:mb-20 lg:mb-24" aria-hidden="true" />
        </PageContainer>
      ) : null}
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  );
}
