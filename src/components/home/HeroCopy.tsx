import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { Cta } from "@/types";

interface HeroCopyProps {
  headline: string;
  subheadline: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  note: string;
}

/**
 * The single orchestrated entrance on the site: headline, copy, then actions.
 * Driven by CSS keyframes (see `hero-rise` / `hero-enter` in globals.css) rather
 * than JS so the text — the page's LCP element — paints at first render instead
 * of waiting for hydration. The headline and lead paragraph only translate (no
 * fade) so Chrome counts them as LCP at first paint; the buttons and note fade.
 * Reduced-motion users get the final state immediately.
 */
export function HeroCopy({ headline, subheadline, primaryCta, secondaryCta, note }: HeroCopyProps) {
  // Split the headline on sentence boundaries so each line can land separately.
  const lines = headline.split(/(?<=\.)\s+/).filter(Boolean);
  const delay = (step: number) => ({ "--enter-delay": `${step * 90}ms` }) as React.CSSProperties;
  let step = 0;

  return (
    <div className="max-w-2xl">
      <h1 id="hero-heading" className="text-[2.6rem] font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-[4.4rem] xl:text-[4.9rem]">
        {lines.map((line, i) => (
          <span key={line} className="hero-rise block" style={delay(step++)}>
            {i === lines.length - 1 && lines.length > 1 ? <span className="text-gradient-brand">{line}</span> : line}
          </span>
        ))}
      </h1>

      <p className="hero-rise mt-6 max-w-xl text-lg text-muted sm:text-xl" style={delay(step++)}>
        {subheadline}
      </p>

      <div className="hero-enter mt-9 flex flex-col gap-3 sm:flex-row" style={delay(step++)}>
        <Button href={primaryCta.href} size="lg" icon={<ArrowRight size={18} />}>
          {primaryCta.label}
        </Button>
        <Button href={secondaryCta.href} size="lg" variant="secondary">
          {secondaryCta.label}
        </Button>
      </div>

      <p className="hero-enter mt-7 flex items-center gap-2.5 text-sm text-muted" style={delay(step++)}>
        <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent" />
        {note}
      </p>
    </div>
  );
}
