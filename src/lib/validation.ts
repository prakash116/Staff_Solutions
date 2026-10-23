export interface ContactFormValues {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  staffCategory: string;
  employeeCount: string;
  budget: string;
  timeline: string;
  requirements: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  industry: "",
  staffCategory: "",
  employeeCount: "",
  budget: "",
  timeline: "",
  requirements: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts digits, spaces, +, -, ( ) with 10–15 digits overall.
const PHONE_DIGITS_RE = /^\+?[\d\s()-]{10,20}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (values.companyName.trim().length < 2) errors.companyName = "Enter your company or business name.";

  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid business email address.";

  const digits = values.phone.replace(/\D/g, "");
  if (!PHONE_DIGITS_RE.test(values.phone.trim()) || digits.length < 10 || digits.length > 15) {
    errors.phone = "Enter a valid phone number with 10 to 15 digits.";
  }

  if (!values.industry) errors.industry = "Select your industry.";
  if (!values.staffCategory) errors.staffCategory = "Select the staff category you need.";

  const count = Number(values.employeeCount);
  if (!values.employeeCount.trim() || !Number.isInteger(count) || count < 1 || count > 999) {
    errors.employeeCount = "Enter a whole number between 1 and 999.";
  }

  if (!values.budget) errors.budget = "Select an indicative budget.";
  if (!values.timeline) errors.timeline = "Select a hiring timeline.";

  if (values.requirements.length > 1500) errors.requirements = "Keep additional requirements under 1500 characters.";

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
