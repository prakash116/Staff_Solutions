import type { MetadataRoute } from "next";

import { getStaffCategories } from "@/lib/data";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["/", "/about", "/services", "/staff-categories", "/contact", "/privacy", "/terms"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...getStaffCategories().map((c) => ({
      url: absoluteUrl(`/staff-categories/${c.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
