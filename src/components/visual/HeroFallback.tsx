import { cn } from "@/lib/cn";

interface HeroFallbackProps {
  cards: { label: string; caption: string }[];
  /** When true, cards are static (reduced motion). */
  still?: boolean;
}

const placements = [
  "left-[6%] top-[8%] [--tilt:-6deg]",
  "right-[4%] top-[2%] [--tilt:5deg]",
  "left-[22%] top-[38%] [--tilt:2deg]",
  "right-[14%] top-[44%] [--tilt:-4deg]",
  "left-[2%] bottom-[8%] [--tilt:4deg]",
  "right-[2%] bottom-[4%] [--tilt:-3deg]",
];

/**
 * CSS-only composition of floating "staffing cards". Used while the 3D scene
 * loads, when WebGL is unavailable, and for users who prefer reduced motion.
 */
export function HeroFallback({ cards, still = false }: HeroFallbackProps) {
  const visible = cards.slice(0, placements.length);
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[34rem]" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-primary/15 blur-3xl" />
      {visible.map((card, i) => (
        <div
          key={card.label}
          // Solid translucent surface (no backdrop blur): these cards animate transform
          // continuously, and blur under a moving element re-rasterises every frame on phones.
          className={cn(
            "absolute w-[42%] rounded-card border border-border bg-surface-strong/90 p-4 shadow-glass will-change-transform",
            placements[i],
            !still && "animate-float",
          )}
          style={{ animationDelay: `${i * -1.1}s` }}
        >
          <span className={cn("block h-1.5 w-8 rounded-pill", i % 3 === 1 ? "bg-accent" : "bg-primary")} />
          <span className="mt-3 block font-display text-base font-semibold leading-tight text-foreground">{card.label}</span>
          <span className="mt-1 block text-xs text-muted">{card.caption}</span>
        </div>
      ))}
    </div>
  );
}
