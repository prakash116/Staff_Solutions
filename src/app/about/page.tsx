import type { Metadata } from "next";

import { CTASection } from "@/components/home/CTASection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getAbout, getSite } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ page: "about", path: "/about" });

export default function AboutPage() {
  const about = getAbout();
  const site = getSite();

  return (
    <>
      <PageHero title={about.hero.title} intro={about.hero.intro} />

      {/* Introduction + mission / vision */}
      <SectionWrapper aria-labelledby="intro-heading" className="pt-4 sm:pt-6 lg:pt-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <AnimatedSection>
            <h2 id="intro-heading" className="text-3xl font-semibold sm:text-4xl">
              {about.introduction.title}
            </h2>
            <div className="mt-5 space-y-4 text-base text-foreground/85 sm:text-lg">
              {about.introduction.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {site.demoMode ? <SampleNotice className="mt-6">{site.placeholderNotice}</SampleNotice> : null}
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="grid gap-5 self-start">
            <GlassCard>
              <h3 className="text-xl font-semibold">{about.mission.title}</h3>
              <p className="mt-2 text-muted">{about.mission.text}</p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-xl font-semibold">{about.vision.title}</h3>
              <p className="mt-2 text-muted">{about.vision.text}</p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* Approach */}
      <SectionWrapper aria-labelledby="approach-heading" rule>
        <AnimatedSection>
          <SectionHeading id="approach-heading" title={about.approach.title} intro={about.approach.intro} />
        </AnimatedSection>
        <StaggerGroup as="ul" className="grid gap-5 sm:grid-cols-2">
          {about.approach.items.map((item) => (
            <StaggerItem key={item.id} as="li">
              <GlassCard className="flex h-full gap-5">
                <IconBadge name={item.icon} />
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{item.description}</p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionWrapper>

      {/* Philosophy */}
      <SectionWrapper aria-labelledby="philosophy-heading" rule>
        <AnimatedSection className="mx-auto max-w-3xl">
          <h2 id="philosophy-heading" className="text-3xl font-semibold sm:text-4xl">
            {about.philosophy.title}
          </h2>
          <div className="mt-5 space-y-4 text-base text-foreground/85 sm:text-lg">
            {about.philosophy.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* Industries */}
      <SectionWrapper aria-labelledby="industries-heading" rule>
        <AnimatedSection>
          <SectionHeading id="industries-heading" title={about.industries.title} intro={about.industries.intro} />
        </AnimatedSection>
        <StaggerGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.industries.items.map((ind) => (
            <StaggerItem key={ind.id} as="li">
              <GlassCard padding="sm" className="flex h-full items-center gap-4">
                <IconBadge name={ind.icon} />
                <div>
                  <h3 className="font-display text-lg font-semibold">{ind.name}</h3>
                  <p className="text-sm text-muted">{ind.description}</p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionWrapper>

      <HowItWorks id="process" title={about.process.title} intro={about.process.intro} />

      <CTASection id="about" headline={about.cta.headline} text={about.cta.text} primaryCta={about.cta.cta} variant="banner" />
    </>
  );
}
