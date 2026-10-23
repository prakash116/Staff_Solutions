import { Quote } from "lucide-react";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getActiveTestimonials, getHome, getTestimonialsData } from "@/lib/data";

/** Hidden entirely when disabled or empty; labelled as preview content when isSample is true. */
export function TestimonialsSection() {
  const { testimonials } = getHome();
  const data = getTestimonialsData();
  const items = getActiveTestimonials();

  if (!data.enabled || items.length === 0) return null;

  return (
    <SectionWrapper id="testimonials" aria-labelledby="testimonials-heading" rule>
      <AnimatedSection>
        <SectionHeading id="testimonials-heading" title={testimonials.title} intro={testimonials.intro} />
        {data.isSample ? <SampleNotice className="mb-8">{data.sampleNotice}</SampleNotice> : null}
      </AnimatedSection>
      <StaggerGroup as="ul" className="grid gap-5 md:grid-cols-3">
        {items.map((t) => (
          <StaggerItem key={t.id} as="li" className="h-full">
            <GlassCard as="figure" className="flex h-full flex-col">
              <Quote aria-hidden="true" size={22} className="text-accent" />
              <blockquote className="mt-4 flex-1 text-[0.95rem] text-foreground/85 sm:text-base">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                <span className="block font-semibold text-foreground">{t.name}</span>
                <span className="text-muted">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionWrapper>
  );
}
