"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { isActiveLink } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  cta: NavLink;
  pathname: string;
}

export function MobileMenu({ open, onClose, links, cta, pathname }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Escape closes; lock body scroll while open; focus first item.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-16 z-40 bg-jade/40 sm:top-18 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-label="Site navigation"
            className="absolute inset-x-0 top-full z-50 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-none border-x-0 border-t-0">
              <PageContainer className="py-4">
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {links.map((link, index) => {
                      const active = isActiveLink(pathname, link.href);
                      return (
                        <li key={link.id}>
                          <Link
                            ref={index === 0 ? firstLinkRef : undefined}
                            href={link.href}
                            onClick={onClose}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-12 items-center justify-between rounded-control px-3 text-base font-medium transition-colors",
                              active ? "bg-muted-surface text-foreground" : "text-foreground/85 hover:bg-muted-surface",
                            )}
                          >
                            {link.label}
                            {active ? <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent" /> : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mt-4 border-t border-border pt-4">
                  <Button href={cta.href} className="w-full" onClick={onClose}>
                    {cta.label}
                  </Button>
                </div>
              </PageContainer>
            </div>
          </m.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
