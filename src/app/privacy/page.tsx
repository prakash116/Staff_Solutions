import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";
import { getLegal } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ page: "privacy", path: "/privacy" });

export default function PrivacyPage() {
  return <LegalPage page={getLegal().privacy} />;
}
