import type { PricingItem } from "@/types";

const formatterCache = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: string): Intl.NumberFormat {
  const cached = formatterCache.get(currency);
  if (cached) return cached;
  // en-IN applies the Indian numbering system (1,00,000) for INR.
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const fmt = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  formatterCache.set(currency, fmt);
  return fmt;
}

export function formatCurrency(amount: number, currency: string): string {
  return getCurrencyFormatter(currency).format(amount);
}

/** "₹18,000 – ₹35,000" | "From ₹18,000" | "Up to ₹35,000" | null when no data. */
export function formatSalaryRange(item: PricingItem, currency: string): string | null {
  const { salaryMin, salaryMax } = item;
  if (salaryMin != null && salaryMax != null) {
    if (salaryMin === salaryMax) return formatCurrency(salaryMin, currency);
    return `${formatCurrency(salaryMin, currency)} – ${formatCurrency(salaryMax, currency)}`;
  }
  if (salaryMin != null) return `From ${formatCurrency(salaryMin, currency)}`;
  if (salaryMax != null) return `Up to ${formatCurrency(salaryMax, currency)}`;
  return null;
}

export function formatBillingPeriod(period: string): string {
  switch (period) {
    case "monthly":
      return "per month";
    case "one-time":
      return "one-time";
    default:
      return period;
  }
}

export function formatPlacementFee(
  item: PricingItem,
  currency: string,
  unavailableLabel: string,
): string {
  return item.placementFee == null ? unavailableLabel : formatCurrency(item.placementFee, currency);
}

/** Replaces {year} and {name} tokens in the footer copyright template. */
export function formatCopyright(template: string, name: string, year = new Date().getFullYear()): string {
  return template.replace("{year}", String(year)).replace("{name}", name);
}
