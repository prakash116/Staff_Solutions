import type { Metadata } from "next";

import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricingSection } from "@/components/home/PricingSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StaffCategoriesSection } from "@/components/home/StaffCategoriesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ValueProposition } from "@/components/home/ValueProposition";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { getHome } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ page: "home", path: "/" });

export default function HomePage() {
  const { ctaBanner, finalCta } = getHome();

  return (
    <>
      <HeroSection />
      <ValueProposition />
      <StaffCategoriesSection />
      <ServicesSection />
      <PricingSection />
      <HowItWorks />
      <WhyChooseUs />
      <CTASection id="request" headline={ctaBanner.headline} text={ctaBanner.text} primaryCta={ctaBanner.cta} variant="banner" image={ctaBanner.image} />
      <TestimonialsSection />
      <FAQSection />
      <CTASection
        id="final"
        headline={finalCta.headline}
        text={finalCta.text}
        primaryCta={finalCta.primaryCta}
        secondaryCta={finalCta.secondaryCta}
        variant="final"
      />
    </>
  );
}
