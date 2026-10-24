import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatBillingPeriod, formatDailyRate, formatPlacementFee, formatSalaryRange } from "@/lib/formatters";
import type { PricingData, PricingItem } from "@/types";

interface PricingCardProps {
  item: PricingItem;
  pricing: PricingData;
  title?: string;
}

/** Budget summary for a single staff category (used on detail pages). */
export function PricingCard({ item, pricing, title = "Hiring budget" }: PricingCardProps) {
  const salary = formatSalaryRange(item, pricing.currency);
  const daily = formatDailyRate(item, pricing.currency);
  const fee = formatPlacementFee(item, pricing.currency, pricing.placementFeeUnavailableLabel);

  return (
    <GlassCard as="aside" aria-label={title} solid>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge tone={item.isEstimate ? "accent" : "primary"}>{item.isEstimate ? pricing.estimateLabel : pricing.confirmedLabel}</Badge>
      </div>

      <dl className="mt-5 space-y-5">
        <div>
          <dt className="text-sm text-muted">{pricing.salaryLabel}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold">
            {salary ?? "Not configured"}
            {salary ? <span className="ml-2 text-sm font-normal text-muted">{formatBillingPeriod(item.billingPeriod)}</span> : null}
          </dd>
        </div>
        <div className="border-t border-border pt-5">
          <dt className="text-sm text-muted">{pricing.dailyRateLabel}</dt>
          <dd className={"mt-1 font-display text-xl font-semibold " + (daily ? "text-primary-text" : "text-muted")}>
            {daily ?? pricing.dailyRateUnavailableLabel}
          </dd>
        </div>
        <div className="border-t border-border pt-5">
          <dt className="text-sm text-muted">{pricing.placementFeeLabel}</dt>
          <dd className={"mt-1 font-display text-xl font-semibold " + (item.placementFee == null ? "text-muted" : "")}>{fee}</dd>
        </div>
      </dl>

      {item.notes ? <p className="mt-5 text-sm text-muted">{item.notes}</p> : null}
      <p className="mt-5 border-t border-border pt-4 text-xs text-muted">{pricing.pricingDisclaimer}</p>
    </GlassCard>
  );
}
