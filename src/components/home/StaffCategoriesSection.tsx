import { ArrowRight } from "lucide-react";

import { StaffCategoryGrid } from "@/components/staff/StaffCategoryGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getFeaturedStaffCategories, getHome, getPricing, getStaffIndustries } from "@/lib/data";
import { toStaffCardModel } from "@/lib/view-models";

export function StaffCategoriesSection() {
  const { staffCategories } = getHome();
  const pricing = getPricing();
  const featured = getFeaturedStaffCategories(6).map(toStaffCardModel);

  if (featured.length === 0) return null;

  return (
    <SectionWrapper id="staff-categories" aria-labelledby="categories-heading" rule>
      <AnimatedSection>
        <SectionHeading
          id="categories-heading"
          title={staffCategories.title}
          intro={staffCategories.intro}
          aside={
            <Button href={staffCategories.viewAll.href} variant="secondary" icon={<ArrowRight size={16} />}>
              {staffCategories.viewAll.label}
            </Button>
          }
        />
      </AnimatedSection>
      <StaffCategoryGrid
        categories={featured}
        industries={getStaffIndustries()}
        searchable={false}
        labels={{ cardCta: staffCategories.cardCta, estimate: pricing.estimateLabel, salary: pricing.salaryLabel }}
      />
    </SectionWrapper>
  );
}
