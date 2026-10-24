import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PricingCard } from "@/components/pricing/PricingCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/Icon";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getPricing, getPricingForCategory, getServicesForCategory, getStaffCategories, getStaffCategoryBySlug } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaffCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getStaffCategoryBySlug(slug);
  if (!category) return buildPageMetadata({ page: "notFound", path: `/staff-categories/${slug}` });
  return buildPageMetadata({
    page: "staffCategories",
    path: `/staff-categories/${category.slug}`,
    title: `Hire ${category.name}`,
    description: category.description,
  });
}

export default async function StaffCategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getStaffCategoryBySlug(slug);
  if (!category) notFound();

  const pricing = getPricing();
  const pricingItem = getPricingForCategory(category);
  const services = getServicesForCategory(category.id);
  const all = getStaffCategories();
  const index = all.findIndex((c) => c.id === category.id);
  const related = [...all.slice(index + 1), ...all.slice(0, index)].slice(0, 3);

  return (
    <>
      <header className="pt-10 sm:pt-14">
        <PageContainer>
          <AnimatedSection>
            <Link href="/staff-categories" className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted transition-colors hover:text-foreground">
              <ArrowLeft aria-hidden="true" size={16} />
              All staff categories
            </Link>
            {category.image ? (
              <div className="relative mt-6 aspect-21/9 overflow-hidden rounded-card-lg border border-border">
                <Image
                  src={category.image}
                  alt={`${category.name} placed by Aurevia Staffing Solution`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            ) : null}
            <div className="mt-6 flex items-start gap-5">
              <IconBadge name={category.icon} className="size-14 rounded-[1.1rem] [&_svg]:size-7" />
              <div>
                <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">{category.name}</h1>
                <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{category.description}</p>
              </div>
            </div>
            {category.industries.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Industries">
                {category.industries.map((i) => (
                  <li key={i}>
                    <Badge tone="primary">{i}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </AnimatedSection>
        </PageContainer>
      </header>

      <SectionWrapper aria-label={`${category.name} details`} className="pt-10 sm:pt-12 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <AnimatedSection className="space-y-8">
            {category.longDescription ? (
              <div>
                <h2 className="text-2xl font-semibold">About this role</h2>
                <p className="mt-3 text-base text-foreground/85 sm:text-lg">{category.longDescription}</p>
              </div>
            ) : null}

            {category.typicalResponsibilities && category.typicalResponsibilities.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold">Typical responsibilities</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {category.typicalResponsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[0.95rem]">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-pill bg-primary/15 text-primary-text">
                        <Check aria-hidden="true" size={12} strokeWidth={3} />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {services.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold">Hired through</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services#${s.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-pill border border-border-strong bg-surface px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary/60"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {pricingItem ? (
              <PricingCard item={pricingItem} pricing={pricing} />
            ) : (
              <GlassCard solid>
                <h2 className="text-lg font-semibold">Indicative budget</h2>
                <p className="mt-2 text-muted">Budget for this role is discussed per requirement.</p>
              </GlassCard>
            )}
            <Button href={`/contact?category=${encodeURIComponent(category.id)}`} size="lg" className="w-full" icon={<ArrowRight size={18} />}>
              Request {category.name.toLowerCase().includes("staff") ? category.name.toLowerCase() : `${category.name.toLowerCase()} staff`}
            </Button>
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {related.length > 0 ? (
        <SectionWrapper aria-labelledby="related-heading" rule>
          <AnimatedSection>
            <h2 id="related-heading" className="text-2xl font-semibold sm:text-3xl">
              Other categories
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((c) => (
                <li key={c.id}>
                  <Link href={`/staff-categories/${c.slug}`} className="glass group flex h-full items-center gap-4 rounded-card p-5 transition-colors hover:bg-surface-hover">
                    <IconBadge name={c.icon} />
                    <span className="font-display text-lg font-semibold">{c.name}</span>
                    <ArrowRight aria-hidden="true" size={18} className="ml-auto text-muted transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </SectionWrapper>
      ) : null}
    </>
  );
}
