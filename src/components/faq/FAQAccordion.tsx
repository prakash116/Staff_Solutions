"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import type { FaqItem } from "@/types";

interface FAQAccordionProps {
  items: FaqItem[];
  /** Index opened by default; null for all closed. */
  defaultOpen?: number | null;
}

export function FAQAccordion({ items, defaultOpen = 0 }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen != null ? (items[defaultOpen]?.id ?? null) : null);
  const baseId = useId();
  const reduce = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <div className="glass divide-y divide-border rounded-card">
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3 className="font-sans text-base font-normal tracking-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className={cn(
                  "flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors sm:px-7",
                  "rounded-card hover:bg-surface-hover",
                )}
              >
                <span className="font-display text-lg font-semibold text-foreground sm:text-xl">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  size={20}
                  className={cn("mt-1 shrink-0 text-muted transition-transform duration-300 ease-out-expo", open && "rotate-180 text-primary-text")}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[0.95rem] text-muted sm:px-7 sm:text-base">{item.answer}</p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
