import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Cta } from "@/types";

interface CTASectionProps {
  headline: string;
  text: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  /** "banner" is the mid-page dark band; "final" is the closing section. */
  variant?: "banner" | "final";
  id?: string;
  /** Optional photo behind the banner, darkened so text stays readable. */
  image?: string | null;
}

export function CTASection({ headline, text, primaryCta, secondaryCta, variant = "banner", id, image }: CTASectionProps) {
  const headingId = `${id ?? variant}-cta-heading`;

  if (variant === "banner") {
    return (
      <SectionWrapper id={id} aria-labelledby={headingId} className="py-10 sm:py-14 lg:py-16">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-card-lg bg-jade px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="pointer-events-none object-cover object-[center_18%] opacity-45"
              />
            ) : null}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: image
                  ? "linear-gradient(100deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.72) 55%, rgba(10,10,10,0.35) 100%), radial-gradient(28rem 16rem at 0% 100%, rgba(255,45,149,0.25), transparent 60%)"
                  : "radial-gradient(42rem 20rem at 100% 0%, rgba(0,123,167,0.45), transparent 60%), radial-gradient(28rem 16rem at 0% 100%, rgba(255,45,149,0.28), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 id={headingId} className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                  {headline}
                </h2>
                <p className="mt-4 text-lg text-white/75">{text}</p>
              </div>
              <Button href={primaryCta.href} size="lg" icon={<ArrowRight size={18} />} className="shrink-0">
                {primaryCta.label}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={id} aria-labelledby={headingId} rule>
      <AnimatedSection className="mx-auto max-w-3xl text-center">
        <h2 id={headingId} className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={primaryCta.href} size="lg" icon={<ArrowRight size={18} />}>
            {primaryCta.label}
          </Button>
          {secondaryCta ? (
            <Button href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
