"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { HeroFallback } from "@/components/visual/HeroFallback";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

interface HeroVisualProps {
  cards: { label: string; caption: string }[];
}

// Three.js is only loaded on the client, after hydration, and only on pages that render HeroVisual.
const ThreeScene = dynamic(() => import("@/components/visual/ThreeScene"), { ssr: false });

/**
 * Decides between the lazy 3D scene and the CSS fallback:
 * - reduced motion → static CSS cards
 * - no WebGL / context lost → CSS cards (animated)
 * - small screens → CSS cards (saves battery and bundle on phones)
 * The fallback is always in the DOM for layout; it fades out once the scene has drawn a frame.
 */
export function HeroVisual({ cards }: HeroVisualProps) {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [supported, setSupported] = useState(true);
  const [isLarge, setIsLarge] = useState(false);
  const [ready, setReady] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsLarge(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Load the 3D scene only once the main thread is idle, so the ~550 KB Three.js
  // chunk and scene setup never compete with hydration or the first paint.
  useEffect(() => {
    const ric: typeof window.requestIdleCallback | undefined = window.requestIdleCallback;
    if (ric) {
      const handle = ric(() => setIdle(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(() => setIdle(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const onUnsupported = useCallback(() => {
    setSupported(false);
    setReady(false);
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  const use3d = supported && !reduce && isLarge && idle;
  const hideFallback = use3d && ready;

  return (
    <div className="relative w-full">
      <div className={cn("transition-opacity duration-700 ease-out", hideFallback ? "opacity-0" : "opacity-100")}>
        <HeroFallback cards={cards} still={Boolean(reduce)} />
      </div>
      {use3d ? (
        <div className={cn("absolute inset-0 transition-opacity duration-700 ease-out", ready ? "opacity-100" : "opacity-0")}>
          <ThreeScene theme={theme} cards={cards} onUnsupported={onUnsupported} onReady={onReady} />
        </div>
      ) : null}
    </div>
  );
}
