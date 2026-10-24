export type BillingPeriod = "monthly" | "one-time";

export interface PricingItem {
  id: string;
  categoryId: string;
  /** Indicative employee salary range (paid by the hiring business to the employee). */
  salaryMin: number | null;
  salaryMax: number | null;
  /** Recruitment / placement fee charged by the company. null = not configured. */
  placementFee: number | null;
  /** Optional per-day booking rate for roles that can be booked daily. null = not offered. */
  dailyRate: number | null;
  billingPeriod: string;
  isEstimate: boolean;
  active: boolean;
  notes?: string;
}

export interface PricingData {
  currency: string;
  pricingDisclaimer: string;
  salaryLabel: string;
  placementFeeLabel: string;
  placementFeeUnavailableLabel: string;
  dailyRateLabel: string;
  dailyRateUnavailableLabel: string;
  estimateLabel: string;
  confirmedLabel: string;
  items: PricingItem[];
}
