import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/Icon";
import { getStaffCategoriesByIds } from "@/lib/data";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  /** Compact variant for the homepage grid; full variant for the services page. */
  variant?: "compact" | "full";
}

export function ServiceCard({ service, variant = "compact" }: ServiceCardProps) {
  const categories = getStaffCategoriesByIds(service.categoryIds);

  if (variant === "compact") {
    return (
      <GlassCard as="article" interactive className="group flex h-full flex-col">
        <IconBadge name={service.icon} />
        <h3 className="mt-5 text-xl font-semibold">
          <Link href={`/services#${service.slug}`} className="rounded-sm after:absolute after:inset-0 after:content-['']">
            {service.name}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] text-muted">{service.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-text">
          Learn more
          <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </GlassCard>
    );
  }

  return (
    <GlassCard as="article" id={service.slug} padding="lg" className="scroll-mt-28">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <div className="flex items-center gap-4">
            <IconBadge name={service.icon} />
            {/* h2: the full variant sits directly under the services page h1. */}
            <h2 className="text-2xl font-semibold sm:text-3xl">{service.name}</h2>
          </div>
          <p className="mt-5 text-base text-foreground/85 sm:text-lg">{service.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact">Request staff</Button>
            <Button href="/staff-categories" variant="secondary">
              Browse categories
            </Button>
          </div>
        </div>

        <div className="grid gap-6 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {service.businessTypes.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold text-muted">Suitable for</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.businessTypes.map((b) => (
                  <li key={b}>
                    <Badge>{b}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {categories.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold text-muted">Staff categories commonly hired</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/staff-categories/${c.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-pill border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary-text transition-colors hover:bg-primary/15"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
}
