import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFormLoader } from "@/components/contact/ContactFormLoader";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHero } from "@/components/ui/PageHero";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getActiveSocialLinks, getContact, getSite, getStaffCategories } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ page: "contact", path: "/contact" });

export default function ContactPage() {
  const contact = getContact();
  const site = getSite();
  const social = getActiveSocialLinks();
  const categoryOptions = getStaffCategories().map((c) => ({ value: c.id, label: c.name }));
  const { address } = site.contact;

  return (
    <>
      <PageHero title={contact.hero.title} intro={contact.hero.intro} />

      <SectionWrapper aria-label="Contact" className="pt-4 sm:pt-6 lg:pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
          <AnimatedSection>
            {/* useSearchParams forces a client render up to this boundary; the fallback renders the
                same form (without pre-selection) so the static HTML still contains the full markup. */}
            <Suspense fallback={<ContactForm copy={contact.form} staffCategoryOptions={categoryOptions} />}>
              <ContactFormLoader copy={contact.form} staffCategoryOptions={categoryOptions} />
            </Suspense>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <GlassCard>
              <h2 className="text-xl font-semibold">{contact.info.title}</h2>
              <p className="mt-1 text-sm text-muted">{contact.info.intro}</p>
              {site.demoMode ? <SampleNotice className="mt-4">{site.placeholderNotice}</SampleNotice> : null}

              <dl className="mt-6 space-y-5">
                <InfoRow icon={<Mail aria-hidden="true" size={18} />} label={contact.info.emailLabel}>
                  <a href={`mailto:${site.contact.email}`} className="hover:text-primary-text">
                    {site.contact.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<Phone aria-hidden="true" size={18} />} label={contact.info.phoneLabel}>
                  <a href={`tel:${site.contact.phone.replace(/\s+/g, "")}`} className="hover:text-primary-text">
                    {site.contact.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={<MapPin aria-hidden="true" size={18} />} label={contact.info.addressLabel}>
                  <address className="not-italic">
                    {address.line1}
                    {address.line2 ? (
                      <>
                        <br />
                        {address.line2}
                      </>
                    ) : null}
                    <br />
                    {address.city}, {address.state} {address.postalCode}
                    <br />
                    {address.country}
                  </address>
                </InfoRow>
                <InfoRow icon={<Clock aria-hidden="true" size={18} />} label={contact.info.hoursLabel}>
                  {site.contact.businessHours}
                </InfoRow>
              </dl>

              {social.length > 0 ? (
                <div className="mt-6 border-t border-border pt-5">
                  <h3 className="text-sm font-semibold text-muted">{contact.info.socialLabel}</h3>
                  <ul className="mt-3 flex gap-2">
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
                </div>
              ) : null}
            </GlassCard>
          </AnimatedSection>
        </div>
      </SectionWrapper>
    </>
  );
}

/** A dl group: the icon lives inside the <dt> so the dl > div > dt/dd structure stays valid. */
function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="text-[0.95rem]">
      <dt className="flex items-center gap-3.5 text-xs text-muted">
        <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-primary/10 text-primary-text">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-0.5 pl-12.5 font-medium text-foreground">{children}</dd>
    </div>
  );
}
