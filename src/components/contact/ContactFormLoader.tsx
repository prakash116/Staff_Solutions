"use client";

import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/contact/ContactForm";
import type { ContactData, SelectOption } from "@/types";

interface ContactFormLoaderProps {
  copy: ContactData["form"];
  staffCategoryOptions: SelectOption[];
}

/** Reads ?category=<id> from the URL to pre-select a staff category. Rendered inside Suspense. */
export function ContactFormLoader(props: ContactFormLoaderProps) {
  const params = useSearchParams();
  const category = params.get("category") ?? undefined;
  return <ContactForm {...props} initialStaffCategory={category} />;
}
