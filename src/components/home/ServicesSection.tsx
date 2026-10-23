import { ArrowRight } from "lucide-react";

import { ServiceCard } from "@/components/services/ServiceCard";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getFeaturedServices, getHome } from "@/lib/data";

export function ServicesSection() {
  const { services } = getHome();
  const featured = getFeaturedServices(6);

  if (featured.length === 0) return null;

  return (
    <SectionWrapper id="services" aria-labelledby="services-heading" rule>
      <AnimatedSection>
        <SectionHeading
          id="services-heading"
          title={services.title}
          intro={services.intro}
          aside={
            <Button href={services.viewAll.href} variant="secondary" icon={<ArrowRight size={16} />}>
              {services.viewAll.label}
            </Button>
          }
        />
      </AnimatedSection>
      <StaggerGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service) => (
          <StaggerItem key={service.id} as="li" className="h-full">
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionWrapper>
  );
}
