import { HeroCopy } from "@/components/home/HeroCopy";
import { PageContainer } from "@/components/ui/PageContainer";
import { HeroVisual } from "@/components/visual/HeroVisual";
import { getHome } from "@/lib/data";

export function HeroSection() {
  const { hero } = getHome();

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      <PageContainer className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <HeroCopy
          headline={hero.headline}
          subheadline={hero.subheadline}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
          note={hero.note}
        />
        <div className="relative lg:-mr-6">
          <HeroVisual cards={hero.visualCards} />
        </div>
      </PageContainer>
    </section>
  );
}
