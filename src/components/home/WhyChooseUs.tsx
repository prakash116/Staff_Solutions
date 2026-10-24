import { Check } from "lucide-react";
import Image from "next/image";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getHome } from "@/lib/data";

export function WhyChooseUs() {
  const { whyChooseUs } = getHome();

  return (
    <SectionWrapper id="why-us" aria-labelledby="why-heading" rule>
      <GlassCard padding="lg" className="overflow-hidden rounded-card-lg">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <AnimatedSection>
            <h2 id="why-heading" className="text-3xl font-semibold sm:text-4xl">
              {whyChooseUs.title}
            </h2>
            <p className="mt-4 max-w-prose text-base text-muted sm:text-lg">{whyChooseUs.intro}</p>
            {whyChooseUs.image ? (
              <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-card border border-border">
                <Image src={whyChooseUs.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            ) : null}
          </AnimatedSection>
          <StaggerGroup as="ul" className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {whyChooseUs.points.map((p) => (
              <StaggerItem key={p.id} as="li" className="flex gap-3.5">
                <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-pill bg-primary text-primary-foreground">
                  <Check aria-hidden="true" size={14} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted">{p.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
