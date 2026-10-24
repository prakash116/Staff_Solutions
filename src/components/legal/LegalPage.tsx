import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/components/ui/PageHero";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { LegalPage as LegalPageData } from "@/types";

export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <>
      <PageHero title={page.title} intro={page.intro}>
        <p className="text-sm text-muted">Last updated: {page.lastUpdated}</p>
        {page.isPlaceholder ? <SampleNotice className="mt-4">{page.placeholderNotice}</SampleNotice> : null}
      </PageHero>
      <SectionWrapper aria-label={page.title} className="pt-2 sm:pt-4 lg:pt-6" containerClassName="max-w-3xl">
        <AnimatedSection className="space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-base text-foreground/85">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </AnimatedSection> 
      </SectionWrapper>
    </>
  );
}
