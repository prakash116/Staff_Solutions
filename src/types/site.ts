export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  active: boolean;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  address: Address;
  businessHours: string;
}

export interface SiteData {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  /** Fallback site URL; NEXT_PUBLIC_SITE_URL overrides this at build time. */
  url: string;
  locale: string;
  logo: {
    /** Wordmark text shown next to the mark. */
    text: string;
    /** Small descriptor under/next to the wordmark (e.g. "Staffing Solution"). */
    subtext?: string;
    /** Transparent mark image path; null renders a gradient placeholder. */
    mark: string | null;
    /** Full logo (mark + wordmark) for the footer; null falls back to mark + text. */
    full?: string | null;
  };
  contact: ContactInfo;
  social: SocialLink[];
  /** When true, UI shows demo/sample notices where real business data is missing. */
  demoMode: boolean;
  placeholderNotice: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavigationData {
  main: NavLink[];
  cta: NavLink;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterData {
  description: string;
  columns: {
    quickLinks: { title: string };
    services: { title: string; max: number };
    categories: { title: string; max: number };
    contact: { title: string };
  };
  legalLinks: FooterLink[];
  /** Supports {year} and {name} tokens. */
  copyright: string;
}

export interface SeoPage {
  title: string;
  description: string;
  keywords?: string[];
}

export interface SeoData {
  default: {
    titleTemplate: string;
    title: string;
    description: string;
    keywords: string[];
    ogImage: string | null;
    twitterHandle: string | null;
  };
  pages: Record<string, SeoPage>;
}
