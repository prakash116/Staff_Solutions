import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { getPricing, getPricingWithCategories } from "@/lib/data";
import { formatBillingPeriod, formatPlacementFee, formatSalaryRange } from "@/lib/formatters";

interface PricingTableProps {
  /** Limit rows (homepage). Omit for all. */
  limit?: number;
}

/**
 * Ledger-style pricing: one row per role, salary and placement fee in separate
 * columns so the two are never confused. Collapses to stacked rows on mobile.
 */
export function PricingTable({ limit }: PricingTableProps) {
  const pricing = getPricing();
  const rows = getPricingWithCategories();
  const visible = typeof limit === "number" ? rows.slice(0, limit) : rows;

  if (visible.length === 0) {
    return <p className="text-muted">Pricing information has not been configured yet.</p>;
  }

  return (
    <div className="glass overflow-hidden rounded-card">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Indicative hiring budgets by staff category</caption>
        <thead className="hidden sm:table-header-group">
          <tr className="border-b border-border text-sm text-muted">
            <th scope="col" className="px-6 py-4 font-medium">
              Role
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              {pricing.salaryLabel}
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              {pricing.placementFeeLabel}
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map(({ item, category }, index) => {
            const salary = formatSalaryRange(item, pricing.currency);
            const fee = formatPlacementFee(item, pricing.currency, pricing.placementFeeUnavailableLabel);
            return (
              <tr
                key={item.id}
                className={
                  "grid grid-cols-2 gap-x-4 gap-y-2 px-6 py-5 sm:table-row sm:px-0 sm:py-0 " +
                  (index < visible.length - 1 ? "border-b border-border" : "")
                }
              >
                <th scope="row" className="col-span-2 font-display text-lg font-semibold sm:px-6 sm:py-5 sm:text-base">
                  <Link href={`/staff-categories/${category.slug}`} className="rounded-sm hover:text-primary-text">
                    {category.name}
                  </Link>
                  {item.notes ? <span className="mt-1 block text-xs font-normal text-muted">{item.notes}</span> : null}
                </th>
                <td className="sm:px-6 sm:py-5">
                  <span className="block text-xs text-muted sm:hidden">{pricing.salaryLabel}</span>
                  {salary ? (
                    <>
                      <span className="font-semibold text-foreground">{salary}</span>
                      <span className="block text-xs text-muted">{formatBillingPeriod(item.billingPeriod)}</span>
                    </>
                  ) : (
                    <span className="text-muted">Not configured</span>
                  )}
                </td>
                <td className="sm:px-6 sm:py-5">
                  <span className="block text-xs text-muted sm:hidden">{pricing.placementFeeLabel}</span>
                  <span className={item.placementFee == null ? "text-muted" : "font-semibold text-foreground"}>{fee}</span>
                </td>
                <td className="col-span-2 sm:px-6 sm:py-5">
                  <Badge tone={item.isEstimate ? "accent" : "primary"}>{item.isEstimate ? pricing.estimateLabel : pricing.confirmedLabel}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-border px-6 py-4 text-sm text-muted">{pricing.pricingDisclaimer}</p>
    </div>
  );
}
