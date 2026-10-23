import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";
import { getLegal } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ page: "terms", path: "/terms" });

export default function TermsPage() {
  return <LegalPage page={getLegal().terms} />;
}
