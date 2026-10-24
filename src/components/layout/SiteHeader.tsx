import { Header } from "@/components/layout/Header";
import { getNavigation, getSite } from "@/lib/data";

/** Server wrapper: reads navigation data and passes only what the client Header needs. */
export function SiteHeader() {
  const site = getSite();
  const nav = getNavigation();
  return <Header brand={{ text: site.logo.text, subtext: site.logo.subtext, mark: site.logo.mark }} links={nav.main} cta={nav.cta} />;
}
