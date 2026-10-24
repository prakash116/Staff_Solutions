import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from "@/components/layout/SocialIcon";
import { PageContainer } from "@/components/ui/PageContainer";
import { getActiveSocialLinks, getFooter, getNavigation, getServices, getSite, getStaffCategories } from "@/lib/data";
import { formatCopyright } from "@/lib/formatters";

const linkClass = "text-[0.95rem] text-muted transition-colors hover:text-foreground";

export function Footer() {
  const site = getSite();
  const footer = getFooter();
  const nav = getNavigation();
  const services = getServices().slice(0, footer.columns.services.max);
  const categories = getStaffCategories().slice(0, footer.columns.categories.max);
  const social = getActiveSocialLinks();
  const { contact } = site;
  const addressLines = [contact.address.line1, contact.address.line2, `${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}`, contact.address.country].filter(Boolean);

  return (
    <footer className="relative mt-16 border-t border-border sm:mt-24">
      <PageContainer className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:gap-8">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-control" aria-label={`${site.name} — home`}>
              {site.logo.full ? (
                // Full logo on a light card so the multicolour wordmark reads in both themes.
                <span className="inline-flex rounded-card bg-white p-3">
                  <Image src={site.logo.full} alt={site.name} width={180} height={116} className="h-auto w-44" />
                </span>
              ) : (
                <>
                  {site.logo.mark ? <Image src={site.logo.mark} alt="" width={32} height={32} className="size-8" /> : null}
                  <span className="font-display text-lg font-semibold tracking-tight">{site.logo.text}</span>
                </>
              )}
            </Link>
            <p className="mt-4 text-[0.95rem] text-muted">{footer.description}</p>
            {social.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2" aria-label="Social media">
                {social.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Footer: company">
            <h2 className="font-display text-base font-semibold">{footer.columns.quickLinks.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.main.map((l) => (
                <li key={l.id}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer: services">
            <h2 className="font-display text-base font-semibold">{footer.columns.services.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer: staff categories">
            <h2 className="font-display text-base font-semibold">{footer.columns.categories.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/staff-categories/${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-base font-semibold">{footer.columns.contact.title}</h2>
            <address className="mt-4 space-y-3 text-[0.95rem] not-italic text-muted">
              <p className="flex items-start gap-2.5">
                <Mail aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary-text" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-foreground">
                  {contact.email}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <Phone aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary-text" />
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-foreground">
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary-text" />
                <span>
                  {addressLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{formatCopyright(footer.copyright, site.name)}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </footer>
  );
}
