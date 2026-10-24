export interface Cta {
  label: string;
  href: string;
}

export interface IconItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HomeData {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    /** Labels shown on the floating hero cards (3D scene and CSS fallback). */
    visualCards: { label: string; caption: string }[];
    note: string;
  };
  valueProposition: {
    title: string;
    intro: string;
    items: IconItem[];
  };
  staffCategories: { title: string; intro: string; viewAll: Cta; cardCta: string };
  services: { title: string; intro: string; viewAll: Cta };
  pricing: { title: string; intro: string; cta: Cta };
  howItWorks: { title: string; intro: string; steps: IconItem[] };
  whyChooseUs: {
    title: string;
    intro: string;
    /** Optional photo shown beside the intro. */
    image?: string | null;
    points: { id: string; title: string; description: string }[];
  };
  /** `image` (optional) is used as a darkened background photo behind the banner. */
  ctaBanner: { headline: string; text: string; cta: Cta; image?: string | null };
  testimonials: { title: string; intro: string };
  faq: { title: string; intro: string };
  finalCta: { headline: string; text: string; primaryCta: Cta; secondaryCta: Cta };
}

export interface AboutData {
  hero: { title: string; intro: string };
  introduction: { title: string; paragraphs: string[]; image?: string | null; imageAlt?: string };
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  approach: { title: string; intro: string; items: IconItem[] };
  philosophy: { title: string; paragraphs: string[] };
  industries: { title: string; intro: string; items: { id: string; name: string; icon: string; description: string }[] };
  process: { title: string; intro: string };
  cta: { headline: string; text: string; cta: Cta };
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  active: boolean;
}

export interface TestimonialsData {
  /** Set to false to hide the section entirely. */
  enabled: boolean;
  /** When true, the section is labelled as sample/preview content. */
  isSample: boolean;
  sampleNotice: string;
  items: Testimonial[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  active: boolean;
}

export interface FaqData {
  items: FaqItem[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactData {
  hero: { title: string; intro: string };
  form: {
    title: string;
    intro: string;
    submitLabel: string;
    submittingLabel: string;
    demoNotice: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    resetLabel: string;
    industries: SelectOption[];
    budgetRanges: SelectOption[];
    timelines: SelectOption[];
  };
  info: {
    title: string;
    intro: string;
    /** Optional photo shown at the top of the contact details card. */
    image?: string | null;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    hoursLabel: string;
    socialLabel: string;
  };
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPage {
  title: string;
  intro: string;
  lastUpdated: string;
  isPlaceholder: boolean;
  placeholderNotice: string;
  sections: LegalSection[];
}

export interface LegalData {
  privacy: LegalPage;
  terms: LegalPage;
}
