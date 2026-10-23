"use client";

import { AnimatePresence, m } from "framer-motion";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { cn } from "@/lib/cn";
import { submitContactRequest } from "@/lib/contact-submission";
import { EMPTY_CONTACT_FORM, hasErrors, validateContactForm, type ContactFormErrors, type ContactFormValues } from "@/lib/validation";
import type { ContactData, SelectOption } from "@/types";

interface ContactFormProps {
  copy: ContactData["form"];
  staffCategoryOptions: SelectOption[];
  /** Pre-selected staff category id (e.g. from a detail page link). */
  initialStaffCategory?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ copy, staffCategoryOptions, initialStaffCategory }: ContactFormProps) {
  const initialValues: ContactFormValues = {
    ...EMPTY_CONTACT_FORM,
    staffCategory: initialStaffCategory && staffCategoryOptions.some((o) => o.value === initialStaffCategory) ? initialStaffCategory : "",
  };
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formId = useId();

  const update = (field: keyof ContactFormValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validateContactForm(next));
  };

  const blur = (field: keyof ContactFormValues) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContactForm(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])) as Record<keyof ContactFormValues, boolean>);
    if (hasErrors(nextErrors)) {
      // Move focus to the first invalid field for keyboard and screen-reader users.
      const first = Object.keys(nextErrors)[0];
      if (first) document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const result = await submitContactRequest(values);
      setStatus(result.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const fieldError = (field: keyof ContactFormValues) => (touched[field] ? errors[field] : undefined);

  if (status === "success") {
    return (
      <GlassCard solid padding="lg" role="status" aria-live="polite">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[0.9rem] border border-primary/25 bg-primary/10 text-primary-text">
            <CircleCheck aria-hidden="true" size={24} />
          </span>
          <div>
            <h3 className="text-2xl font-semibold">{copy.successTitle}</h3>
            <p className="mt-2 text-muted">{copy.successMessage}</p>
            <dl className="mt-6 grid gap-3 rounded-control border border-border bg-muted-surface p-4 text-sm sm:grid-cols-2">
              <Summary label="Name" value={values.fullName} />
              <Summary label="Company" value={values.companyName} />
              <Summary label="Staff category" value={staffCategoryOptions.find((o) => o.value === values.staffCategory)?.label ?? values.staffCategory} />
              <Summary label="Employees required" value={values.employeeCount} />
              <Summary label="Budget" value={copy.budgetRanges.find((o) => o.value === values.budget)?.label ?? values.budget} />
              <Summary label="Timeline" value={copy.timelines.find((o) => o.value === values.timeline)?.label ?? values.timeline} />
            </dl>
            <Button variant="secondary" className="mt-6" onClick={reset}>
              {copy.resetLabel}
            </Button>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard solid padding="lg">
      <h2 className="text-2xl font-semibold">{copy.title}</h2>
      <p className="mt-1 text-sm text-muted">{copy.intro}</p>
      <SampleNotice className="mt-4">{copy.demoNotice}</SampleNotice>

      <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
        <Field id={`${formId}-fullName`} label="Full name" required error={fieldError("fullName")}>
          {(a) => <input {...a} type="text" autoComplete="name" value={values.fullName} onChange={update("fullName")} onBlur={blur("fullName")} />}
        </Field>
        <Field id={`${formId}-companyName`} label="Company name" required error={fieldError("companyName")}>
          {(a) => <input {...a} type="text" autoComplete="organization" value={values.companyName} onChange={update("companyName")} onBlur={blur("companyName")} />}
        </Field>
        <Field id={`${formId}-email`} label="Business email" required error={fieldError("email")}>
          {(a) => <input {...a} type="email" autoComplete="email" inputMode="email" value={values.email} onChange={update("email")} onBlur={blur("email")} />}
        </Field>
        <Field id={`${formId}-phone`} label="Phone number" required error={fieldError("phone")}>
          {(a) => <input {...a} type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={update("phone")} onBlur={blur("phone")} />}
        </Field>

        <Field id={`${formId}-industry`} label="Industry" required error={fieldError("industry")}>
          {(a) => (
            <select {...a} value={values.industry} onChange={update("industry")} onBlur={blur("industry")}>
              <option value="">Select industry</option>
              {copy.industries.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id={`${formId}-staffCategory`} label="Required staff category" required error={fieldError("staffCategory")}>
          {(a) => (
            <select {...a} value={values.staffCategory} onChange={update("staffCategory")} onBlur={blur("staffCategory")}>
              <option value="">Select category</option>
              {staffCategoryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id={`${formId}-employeeCount`} label="Number of employees required" required error={fieldError("employeeCount")}>
          {(a) => <input {...a} type="number" min={1} max={999} step={1} inputMode="numeric" value={values.employeeCount} onChange={update("employeeCount")} onBlur={blur("employeeCount")} />}
        </Field>
        <Field id={`${formId}-budget`} label="Indicative budget per employee" required error={fieldError("budget")}>
          {(a) => (
            <select {...a} value={values.budget} onChange={update("budget")} onBlur={blur("budget")}>
              <option value="">Select budget range</option>
              {copy.budgetRanges.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id={`${formId}-timeline`} label="Hiring timeline" required error={fieldError("timeline")} className="sm:col-span-2">
          {(a) => (
            <select {...a} value={values.timeline} onChange={update("timeline")} onBlur={blur("timeline")}>
              <option value="">Select timeline</option>
              {copy.timelines.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id={`${formId}-requirements`} label="Additional requirements" hint="Shift timings, location, experience level, languages — anything that helps." error={fieldError("requirements")} className="sm:col-span-2">
          {(a) => <textarea {...a} rows={5} maxLength={1500} value={values.requirements} onChange={update("requirements")} onBlur={blur("requirements")} className="field resize-y" />}
        </Field>

        <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={status === "submitting"} aria-busy={status === "submitting"}>
            {status === "submitting" ? copy.submittingLabel : copy.submitLabel}
          </Button>
          <AnimatePresence>
            {status === "error" ? (
              <m.p
                role="alert"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 text-sm text-accent-text"
              >
                <CircleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
                <span>
                  <strong>{copy.errorTitle}.</strong> {copy.errorMessage}
                </span>
              </m.p>
            ) : null}
          </AnimatePresence>
        </div>
      </form>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------------- */

interface FieldA11yProps {
  id: string;
  name: string;
  className: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
  required: boolean;
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (a11y: FieldA11yProps) => React.ReactNode;
}

function Field({ id, label, required = false, hint, error, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const name = id.split("-").pop() ?? id;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-accent-text" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children({ id, name, className: "field", "aria-invalid": Boolean(error), "aria-describedby": describedBy, required })}
      {hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-sm text-accent-text">
          <CircleAlert aria-hidden="true" size={14} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value || "—"}</dd>
    </div>
  );
}
