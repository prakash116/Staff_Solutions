import site from "@/data/site.json";

/**
 * Resolves the public site URL. NEXT_PUBLIC_SITE_URL takes precedence over the
 * fallback configured in site.json. Trailing slashes are removed.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || site.url;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
