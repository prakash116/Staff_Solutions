import type { ReactNode } from "react";

import { PageContainer } from "@/components/ui/PageContainer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface PageHeroProps {
  title: string;
  intro?: string;
  children?: ReactNode;
}

/** Shared top section for inner pages. Left-aligned, with a short brand rule. */
export function PageHero({ title, intro, children }: PageHeroProps) {
  return (
    <header className="relative pt-14 pb-10 sm:pt-20 sm:pb-14">
      <PageContainer>
        <AnimatedSection>
          <div aria-hidden="true" className="mb-6 h-1 w-14 rounded-pill bg-linear-to-r from-primary to-accent" />
          <h1 className="max-w-3xl text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">{title}</h1>
          {intro ? <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </AnimatedSection>
      </PageContainer>
    </header>
  );
}
