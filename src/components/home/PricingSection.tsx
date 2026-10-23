import { PricingTable } from "@/components/pricing/PricingTable";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getHome, getPricingWithCategories, getSite } from "@/lib/data";

export function PricingSection() {
  const { pricing } = getHome();
  const site = getSite();
  const rows = getPricingWithCategories();

  if (rows.length === 0) return null;

  return (
    <SectionWrapper id="pricing" aria-labelledby="pricing-heading" rule>
      <AnimatedSection>
        <SectionHeading
          id="pricing-heading"
          title={pricing.title}
          intro={pricing.intro}
          aside={<Button href={pricing.cta.href}>{pricing.cta.label}</Button>}
        />
        {site.demoMode ? <SampleNotice className="mb-6">{site.placeholderNotice}</SampleNotice> : null}
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <PricingTable limit={6} />
      </AnimatedSection>
    </SectionWrapper>
  );
}
