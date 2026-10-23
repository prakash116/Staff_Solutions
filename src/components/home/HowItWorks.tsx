import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getHome } from "@/lib/data";

interface HowItWorksProps {
  /** Override heading/intro (used on the About page). */
  title?: string;
  intro?: string;
  id?: string;
}

/** A genuine sequence, so steps are numbered and connected by a rule. */
export function HowItWorks({ title, intro, id = "how-it-works" }: HowItWorksProps) {
  const { howItWorks } = getHome();
  const headingId = `${id}-heading`;

  return (
    <SectionWrapper id={id} aria-labelledby={headingId} rule>
      <AnimatedSection>
        <SectionHeading id={headingId} title={title ?? howItWorks.title} intro={intro ?? howItWorks.intro} />
      </AnimatedSection>
      <StaggerGroup as="ol" className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {howItWorks.steps.map((step, index) => (
          <StaggerItem key={step.id} as="li" className="relative">
            <div className="glass h-full rounded-card p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-primary-text/80">{String(index + 1).padStart(2, "0")}</span>
                <span className="inline-flex size-10 items-center justify-center rounded-[0.8rem] bg-muted-surface text-foreground">
                  <Icon name={step.icon} size={20} />
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{step.description}</p>
            </div>
            {index < howItWorks.steps.length - 1 ? (
              <span aria-hidden="true" className="absolute top-1/2 -right-3 hidden h-px w-5 bg-border-strong lg:block" />
            ) : null}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionWrapper>
  );
}
