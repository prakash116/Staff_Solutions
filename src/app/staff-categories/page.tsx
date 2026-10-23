import type { Metadata } from "next";

import { CTASection } from "@/components/home/CTASection";
import { StaffCategoryGrid } from "@/components/staff/StaffCategoryGrid";
import { PageHero } from "@/components/ui/PageHero";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getHome, getPricing, getSeo, getSite, getStaffCategories, getStaffIndustries } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";
import { toStaffCardModel } from "@/lib/view-models";

export const metadata: Metadata = buildPageMetadata({ page: "staffCategories", path: "/staff-categories" });

export default function StaffCategoriesPage() {
  const categories = getStaffCategories().map(toStaffCardModel);
  const industries = getStaffIndustries().filter((i) => i !== "Any");
  const pricing = getPricing();
  const site = getSite();
  const seo = getSeo().pages.staffCategories;
  const { staffCategories, ctaBanner } = getHome();

  return (
    <>
      <PageHero title={seo?.title ?? "Staff categories"} intro={seo?.description}>
        {site.demoMode ? <SampleNotice>{pricing.pricingDisclaimer}</SampleNotice> : null}
      </PageHero>

      <SectionWrapper aria-label="Browse staff categories" className="pt-4 sm:pt-6 lg:pt-8">
        <StaffCategoryGrid
          categories={categories}
          industries={industries}
          labels={{ cardCta: staffCategories.cardCta, estimate: pricing.estimateLabel, salary: pricing.salaryLabel }}
          headingLevel="h2"
        />
      </SectionWrapper>

      <CTASection id="categories" headline={ctaBanner.headline} text={ctaBanner.text} primaryCta={ctaBanner.cta} variant="banner" />
    </>
  );
}
