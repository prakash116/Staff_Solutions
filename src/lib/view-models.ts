import { getPricing, getPricingForCategory } from "@/lib/data";
import { formatBillingPeriod, formatSalaryRange } from "@/lib/formatters";
import type { StaffCategory } from "@/types";

/**
 * Serialisable card data for the client-side staff grid. Pre-formatting on the
 * server keeps the pricing/data modules out of the client bundle.
 */
export interface StaffCardModel {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string | null;
  industries: string[];
  featured: boolean;
  salary: { label: string; period: string; isEstimate: boolean } | null;
}

export function toStaffCardModel(category: StaffCategory): StaffCardModel {
  const pricing = getPricing();
  const item = getPricingForCategory(category);
  const salaryLabel = item ? formatSalaryRange(item, pricing.currency) : null;

  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
    icon: category.icon,
    image: category.image,
    industries: category.industries,
    featured: category.featured,
    salary:
      item && salaryLabel
        ? { label: salaryLabel, period: formatBillingPeriod(item.billingPeriod), isEstimate: item.isEstimate }
        : null,
  };
}
