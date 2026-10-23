"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { StaffCategoryCard } from "@/components/staff/StaffCategoryCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { StaffCardModel } from "@/lib/view-models";

interface StaffCategoryGridProps {
  categories: StaffCardModel[];
  industries: string[];
  labels: { cardCta: string; estimate: string; salary: string };
  /** When false, renders the grid without search/filter controls. */
  searchable?: boolean;
  /** Heading level for card titles; use h2 when the grid is directly under the page h1. */
  headingLevel?: "h2" | "h3";
}

const ALL = "__all__";

export function StaffCategoryGrid({ categories, industries, labels, searchable = true, headingLevel = "h3" }: StaffCategoryGridProps) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>(ALL);
  const inputId = useId();
  const statusId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      const matchesIndustry = industry === ALL || c.industries.includes(industry) || c.industries.includes("Any");
      if (!matchesIndustry) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.industries.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [categories, query, industry]);

  const hasFilters = query.trim().length > 0 || industry !== ALL;

  return (
    <div>
      {searchable ? (
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative max-w-xl">
            <label htmlFor={inputId} className="sr-only">
              Search staff categories
            </label>
            <Search aria-hidden="true" size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
            <input
              id={inputId}
              type="search"
              className="field pl-11"
              placeholder="Search by role or industry, e.g. chef, housekeeping, office"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-describedby={statusId}
              autoComplete="off"
            />
          </div>

          <div role="group" aria-label="Filter by industry" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <FilterChip active={industry === ALL} onClick={() => setIndustry(ALL)}>
              All industries
            </FilterChip>
            {industries.map((i) => (
              <FilterChip key={i} active={industry === i} onClick={() => setIndustry(i)}>
                {i}
              </FilterChip>
            ))}
          </div>

          <p id={statusId} role="status" aria-live="polite" className="text-sm text-muted">
            {filtered.length === categories.length
              ? `Showing all ${categories.length} categories`
              : `Showing ${filtered.length} of ${categories.length} categories`}
          </p>
        </div>
      ) : null}

      {filtered.length > 0 ? (
        <StaggerGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" key={`${query}-${industry}`}>
          {filtered.map((c) => (
            <StaggerItem key={c.id} as="li" className="h-full">
              <StaffCategoryCard category={c} ctaLabel={labels.cardCta} estimateLabel={labels.estimate} salaryLabel={labels.salary} headingLevel={headingLevel} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <div className="glass rounded-card px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold">No categories match your search</p>
          <p className="mt-2 text-muted">Try a different role or industry, or request the role directly.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasFilters ? (
              <Button
                variant="secondary"
                icon={<X size={16} />}
                iconPosition="start"
                onClick={() => {
                  setQuery("");
                  setIndustry(ALL);
                }}
              >
                Clear filters
              </Button>
            ) : null}
            <Button href="/contact">Request this role</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 shrink-0 items-center rounded-pill border px-3.5 text-sm font-medium transition-[background-color,border-color,color] duration-200",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border-strong bg-surface text-muted hover:border-primary/60 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
