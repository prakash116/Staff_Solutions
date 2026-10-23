import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedSection";
import { IconBadge } from "@/components/ui/Icon";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getHome } from "@/lib/data";

/** Benefits as a two-column editorial list — no card grid, so it reads differently from the categories below. */
export function ValueProposition() {
  const { valueProposition } = getHome();

  return (
    <SectionWrapper aria-labelledby="value-heading" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="value-heading" className="text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
            {valueProposition.title}
          </h2>
          <p className="mt-4 max-w-prose text-base text-muted sm:text-lg">{valueProposition.intro}</p>
        </AnimatedSection>

        <StaggerGroup as="ul" className="divide-y divide-border border-y border-border">
          {valueProposition.items.map((item) => (
            <StaggerItem key={item.id} as="li" className="flex gap-5 py-6 sm:gap-7 sm:py-7">
              <IconBadge name={item.icon} className="mt-0.5" />
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-1.5 max-w-prose text-[0.95rem] text-muted sm:text-base">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionWrapper>
  );
}
