import type { ContactFormValues } from "@/lib/validation";

export type SubmissionResult =
  | { ok: true; mode: "demo" | "live"; referenceId?: string }
  | { ok: false; message: string };

/**
 * Single integration point for the contact form.
 *
 * The website currently has no backend, so this runs in demo mode: it simulates
 * a short network delay and resolves successfully WITHOUT sending or storing
 * anything. To connect a real API, replace the body of this function with a
 * fetch() to your endpoint and return { ok: true, mode: "live" } on success.
 */
export async function submitContactRequest(values: ContactFormValues): Promise<SubmissionResult> {
  // Example live implementation:
  // const res = await fetch("/api/contact", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(values),
  // });
  // if (!res.ok) return { ok: false, message: "Request failed." };
  // return { ok: true, mode: "live" };

  void values; // intentionally unused in demo mode — nothing is transmitted
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { ok: true, mode: "demo" };
}
