import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/home/CTASection";
import { ServiceCard } from "@/components/services/ServiceCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getHome, getSeo, getServices } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ page: "services", path: "/services" });

export default function ServicesPage() {
  const services = getServices();
  const seo = getSeo().pages.services;
  const { ctaBanner } = getHome();

  return (
    <>
      <PageHero title={seo?.title ?? "Staffing services"} intro={seo?.description}>
        {services.length > 1 ? (
          <nav aria-label="Jump to service">
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.slug}`}
                    className="inline-flex h-9 items-center rounded-pill border border-border-strong bg-surface px-3.5 text-sm font-medium text-muted transition-colors hover:border-primary/60 hover:text-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </PageHero>

      <SectionWrapper aria-label="All staffing services" className="pt-4 sm:pt-6 lg:pt-8">
        {services.length > 0 ? (
          <div className="grid gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={Math.min(i * 0.04, 0.2)}>
                <ServiceCard service={service} variant="full" />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <p className="text-muted">Services have not been configured yet.</p>
        )}
      </SectionWrapper>

      <CTASection id="services" headline={ctaBanner.headline} text={ctaBanner.text} primaryCta={ctaBanner.cta} variant="banner" image={ctaBanner.image} />
    </>
  );
}
