import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/Icon";
import type { StaffCardModel } from "@/lib/view-models";

interface StaffCategoryCardProps {
  category: StaffCardModel;
  ctaLabel: string;
  estimateLabel: string;
  salaryLabel: string;
  dailyLabel: string;
  /** h3 under a section heading (home); h2 when the grid sits directly under the page h1. */
  headingLevel?: "h2" | "h3";
}

export function StaffCategoryCard({ category, ctaLabel, estimateLabel, salaryLabel, dailyLabel, headingLevel = "h3" }: StaffCategoryCardProps) {
  const href = `/staff-categories/${category.slug}`;
  const Heading = headingLevel;

  return (
    <GlassCard as="article" interactive padding="none" className="group flex h-full flex-col overflow-hidden">
      {category.image ? (
        <div className="relative aspect-video w-full overflow-hidden border-b border-border">
          <Image src={category.image} alt={`${category.name} staff`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <IconBadge name={category.icon} />
          {category.featured ? <Badge tone="accent">Popular request</Badge> : null}
        </div>

        <Heading className="mt-5 text-xl font-semibold text-foreground">
          <Link href={href} className="rounded-sm after:absolute after:inset-0 after:content-['']">
            {category.name}
          </Link>
        </Heading>
        <p className="mt-2 text-[0.95rem] text-muted">{category.description}</p>

        {category.industries.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Industries">
            {category.industries.slice(0, 3).map((i) => (
              <li key={i}>
                <Badge>{i}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-6">
          {category.salary ? (
            <dl className="border-t border-border pt-4">
              <dt className="text-xs text-muted">
                {salaryLabel}
                {category.salary.isEstimate ? <span className="text-accent-text"> · {estimateLabel}</span> : null}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-foreground">
                {category.salary.label} <span className="text-sm font-normal text-muted">{category.salary.period}</span>
              </dd>
              {category.daily ? (
                <>
                  <dt className="mt-2 text-xs text-muted">{dailyLabel}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-primary-text">{category.daily}</dd>
                </>
              ) : null}
            </dl>
          ) : (
            <p className="border-t border-border pt-4 text-sm text-muted">Budget discussed per requirement.</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text">
            {ctaLabel}
            <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
