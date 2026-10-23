import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getFaqItems, getHome } from "@/lib/data";

export function FAQSection() {
  const { faq } = getHome();
  const items = getFaqItems();

  if (items.length === 0) return null;

  return (
    <SectionWrapper id="faq" aria-labelledby="faq-heading" rule>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="faq-heading" className="text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
            {faq.title}
          </h2>
          <p className="mt-4 max-w-prose text-base text-muted sm:text-lg">{faq.intro}</p>
          <Button href="/contact" variant="secondary" className="mt-6">
            Ask a different question
          </Button>
        </AnimatedSection>
        <AnimatedSection delay={0.08}>
          <FAQAccordion items={items} />
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
