"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types";

export interface HeaderProps {
  brand: { text: string; subtext?: string; mark: string | null };
  links: NavLink[];
  cta: NavLink;
}

/** Active when the pathname matches the link path (hash fragments are ignored). */
export function isActiveLink(pathname: string, href: string): boolean {
  const path = href.split("#")[0] || "/";
  if (href.includes("#")) return false;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header({ brand, links, cta }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu closes from MobileMenu link/CTA onClick handlers, so no route-change effect is needed.
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,box-shadow] duration-300 ease-out-expo",
          scrolled || menuOpen ? "glass border-x-0 border-t-0 rounded-none" : "border-b border-transparent bg-transparent",
        )}
      >
        <PageContainer className="flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link href="/" className="flex items-center gap-2.5 rounded-control" aria-label={`${brand.text}${brand.subtext ? ` ${brand.subtext}` : ""} — home`}>
            {brand.mark ? (
              <Image src={brand.mark} alt="" width={40} height={40} priority className="size-10" />
            ) : (
              <span aria-hidden="true" className="size-8 rounded-[0.6rem] bg-linear-to-br from-primary to-accent" />
            )}
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">{brand.text}</span>
              {brand.subtext ? <span className="mt-0.5 text-[0.65rem] font-medium tracking-[0.12em] whitespace-nowrap text-muted uppercase">{brand.subtext}</span> : null}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const active = isActiveLink(pathname, link.href);
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-control px-3.5 text-[0.95rem] font-medium transition-colors duration-200",
                        active ? "text-foreground" : "text-muted hover:text-foreground hover:bg-muted-surface",
                      )}
                    >
                      {link.label}
                      {active ? (
                        <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-pill bg-accent" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Button href={cta.href} size="sm" className="hidden sm:inline-flex">
              {cta.label}
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-colors hover:bg-surface-hover lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </PageContainer>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} links={links} cta={cta} pathname={pathname} />
    </header>
  );
}
