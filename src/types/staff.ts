export interface StaffCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  image: string | null;
  industries: string[];
  typicalResponsibilities?: string[];
  pricingId: string | null;
  featured: boolean;
  active: boolean;
}

export interface StaffCategoriesData {
  categories: StaffCategory[];
}
