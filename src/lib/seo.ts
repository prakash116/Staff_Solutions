import type { Metadata } from "next";

import { getSeo, getSite } from "@/lib/data";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

interface PageMetadataOptions {
  /** Key in seo.json → pages. */
  page: string;
  /** Route path, e.g. "/about". */
  path: string;
  /** Overrides for dynamic routes. */
  title?: string;
  description?: string;
}

export function buildRootMetadata(): Metadata {
  const seo = getSeo();
  const site = getSite();
  const ogImages = seo.default.ogImage ? [{ url: absoluteUrl(seo.default.ogImage) }] : undefined;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: seo.default.title,
      template: seo.default.titleTemplate,
    },
    description: seo.default.description,
    keywords: seo.default.keywords,
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: seo.default.title,
      description: seo.default.description,
      url: getSiteUrl(),
      images: ogImages,
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title: seo.default.title,
      description: seo.default.description,
      site: seo.default.twitterHandle ?? undefined,
      images: ogImages,
    },
    robots: { index: true, follow: true },
  };
}

export function buildPageMetadata({ page, path, title, description }: PageMetadataOptions): Metadata {
  const seo = getSeo();
  const entry = seo.pages[page];
  const resolvedTitle = title ?? entry?.title ?? seo.default.title;
  const resolvedDescription = description ?? entry?.description ?? seo.default.description;
  const url = absoluteUrl(path);

  // Next applies a layout's title.template only to child segments, so the root page
  // (same segment as the root layout) needs the brand suffix applied explicitly.
  const titleMeta: Metadata["title"] =
    path === "/" ? { absolute: seo.default.titleTemplate.replace("%s", resolvedTitle) } : resolvedTitle;

  // Next merges metadata per top-level key, so a page-level `openGraph` object
  // replaces the root one entirely — the shared image must be repeated here.
  const ogImages = seo.default.ogImage ? [{ url: absoluteUrl(seo.default.ogImage), width: 1200, height: 630, alt: getSite().name }] : undefined;

  return {
    title: titleMeta,
    description: resolvedDescription,
    keywords: entry?.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      images: ogImages,
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: ogImages,
    },
  };
}
