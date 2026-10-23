/**
 * Centralised data access layer.
 *
 * Every component reads business content through these selectors rather than
 * importing JSON directly. To replace the JSON files with an API or database
 * later, change the implementation of these functions (e.g. make them async and
 * fetch from an endpoint) and the UI stays untouched.
 */
import aboutJson from "@/data/about.json";
import contactJson from "@/data/contact.json";
import faqJson from "@/data/faq.json";
import footerJson from "@/data/footer.json";
import homeJson from "@/data/home.json";
import legalJson from "@/data/legal.json";
import navigationJson from "@/data/navigation.json";
import pricingJson from "@/data/pricing.json";
import seoJson from "@/data/seo.json";
import servicesJson from "@/data/services.json";
import siteJson from "@/data/site.json";
import staffJson from "@/data/staff-categories.json";
import testimonialsJson from "@/data/testimonials.json";

import type {
  AboutData,
  ContactData,
  FaqData,
  FaqItem,
  FooterData,
  HomeData,
  LegalData,
  NavigationData,
  PricingData,
  PricingItem,
  SeoData,
  Service,
  ServicesData,
  SiteData,
  SocialLink,
  StaffCategoriesData,
  StaffCategory,
  Testimonial,
  TestimonialsData,
} from "@/types";

// Structural typing: TypeScript verifies each JSON file matches its interface.
const site: SiteData = siteJson;
const navigation: NavigationData = navigationJson;
const home: HomeData = homeJson;
const about: AboutData = aboutJson;
const services: ServicesData = servicesJson;
const staff: StaffCategoriesData = staffJson;
const pricing: PricingData = pricingJson;
const testimonials: TestimonialsData = testimonialsJson;
const faq: FaqData = faqJson;
const contact: ContactData = contactJson;
const footer: FooterData = footerJson;
const seo: SeoData = seoJson;
const legal: LegalData = legalJson;

/* ---------------------------------- Site --------------------------------- */

export const getSite = (): SiteData => site;
export const getNavigation = (): NavigationData => navigation;
export const getFooter = (): FooterData => footer;
export const getSeo = (): SeoData => seo;
export const getLegal = (): LegalData => legal;

export const getActiveSocialLinks = (): SocialLink[] =>
  site.social.filter((s) => s.active && s.url.trim().length > 0);

/* -------------------------------- Content -------------------------------- */

export const getHome = (): HomeData => home;
export const getAbout = (): AboutData => about;
export const getContact = (): ContactData => contact;

/* --------------------------------- Staff --------------------------------- */

export const getStaffCategories = (): StaffCategory[] =>
  staff.categories.filter((c) => c.active);

export const getFeaturedStaffCategories = (limit?: number): StaffCategory[] => {
  const featured = getStaffCategories().filter((c) => c.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
};

export const getStaffCategoryBySlug = (slug: string): StaffCategory | undefined =>
  getStaffCategories().find((c) => c.slug === slug);

export const getStaffCategoryById = (id: string): StaffCategory | undefined =>
  getStaffCategories().find((c) => c.id === id);

export const getStaffCategoriesByIds = (ids: string[]): StaffCategory[] =>
  ids.map((id) => getStaffCategoryById(id)).filter((c): c is StaffCategory => Boolean(c));

/** Unique, sorted list of industries referenced by active categories. */
export const getStaffIndustries = (): string[] => {
  const set = new Set<string>();
  for (const c of getStaffCategories()) for (const i of c.industries) set.add(i);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

/* -------------------------------- Services ------------------------------- */

export const getServices = (): Service[] => services.services.filter((s) => s.active);

export const getFeaturedServices = (limit?: number): Service[] => {
  const featured = getServices().filter((s) => s.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
};

export const getServiceBySlug = (slug: string): Service | undefined =>
  getServices().find((s) => s.slug === slug);

export const getServicesForCategory = (categoryId: string): Service[] =>
  getServices().filter((s) => s.categoryIds.includes(categoryId));

/* -------------------------------- Pricing -------------------------------- */

export const getPricing = (): PricingData => pricing;

export const getActivePricingItems = (): PricingItem[] => pricing.items.filter((p) => p.active);

export const getPricingById = (id: string | null | undefined): PricingItem | undefined => {
  if (!id) return undefined;
  return getActivePricingItems().find((p) => p.id === id);
};

export const getPricingForCategory = (category: StaffCategory): PricingItem | undefined =>
  getPricingById(category.pricingId);

/** Pricing items joined with their category, in category display order. */
export const getPricingWithCategories = (): { item: PricingItem; category: StaffCategory }[] =>
  getStaffCategories()
    .map((category) => {
      const item = getPricingForCategory(category);
      return item ? { item, category } : null;
    })
    .filter((x): x is { item: PricingItem; category: StaffCategory } => x !== null);

/* ----------------------------- Testimonials ------------------------------ */

export const getTestimonialsData = (): TestimonialsData => testimonials;

export const getActiveTestimonials = (): Testimonial[] =>
  testimonials.enabled ? testimonials.items.filter((t) => t.active) : [];

/* ---------------------------------- FAQ ---------------------------------- */

export const getFaqItems = (): FaqItem[] => faq.items.filter((f) => f.active);
