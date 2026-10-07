"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { hasValidationErrors, normalizeReceiptCode, validateEntry } from "@/lib/validation";
import type { EntryPayload, FieldErrors } from "@/lib/types";

const STORAGE_KEY = "launchproof:last-entry";

const initialForm: EntryPayload = {
  fullName: "",
  email: "",
  receiptCode: "",
  termsAccepted: false,
  marketingOptIn: false,
};

export function EntryForm({ disabled = false }: { disabled?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState<EntryPayload>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof EntryPayload>(key: K, value: EntryPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setApiError("");
  }

  function fillScenario(receiptCode: string) {
    setForm({
      fullName: "Alex Morgan",
      email: "alex@example.com",
      receiptCode,
      termsAccepted: true,
      marketingOptIn: false,
    });
    setErrors({});
    setApiError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || submitting) return;

    const payload = { ...form, receiptCode: normalizeReceiptCode(form.receiptCode) };
    const nextErrors = validateEntry(payload);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) return;

    setSubmitting(true);
    setApiError("");
    window.sessionStorage.removeItem(STORAGE_KEY);

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { entryId?: string; message?: string };

      if (!response.ok || !result.entryId) {
        setApiError(result.message ?? "We could not submit your entry. Please try again.");
        return;
      }

      window.sessionStorage.setItem(STORAGE_KEY, result.entryId);
      router.push("/campaign/success");
    } catch {
      setApiError("We couldn’t confirm the submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <span className="eyebrow">Consumer entry</span>
          <h2>Enter the draw</h2>
        </div>
        <span className="secure-note">Demo · no app database</span>
      </div>

      <div className="scenario-tools" aria-label="Quick demo scenarios">
        <span>Quick review</span>
        <button disabled={disabled} onClick={() => fillScenario("GH-482910")} type="button">Success</button>
        <button disabled={disabled} onClick={() => fillScenario("USED-2026")} type="button">Duplicate</button>
        <button disabled={disabled} onClick={() => fillScenario("ERROR-500")} type="button">Outage</button>
      </div>

      <label className="field">
        <span>Full name</span>
        <input
          aria-invalid={Boolean(errors.fullName)}
          disabled={disabled}
          name="fullName"
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="e.g. Alex Morgan"
          value={form.fullName}
        />
        {errors.fullName && <small role="alert">{errors.fullName}</small>}
      </label>

      <label className="field">
        <span>Email</span>
        <input
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          disabled={disabled}
          name="email"
          onChange={(e) => update("email", e.target.value)}
          placeholder="e.g. alex@example.com"
          type="email"
          value={form.email}
        />
        {errors.email && <small role="alert">{errors.email}</small>}
      </label>

      <label className="field">
        <span>Receipt code</span>
        <input
          aria-invalid={Boolean(errors.receiptCode)}
          autoCapitalize="characters"
          disabled={disabled}
          name="receiptCode"
          onChange={(e) => update("receiptCode", e.target.value)}
          placeholder="e.g. GH-482910"
          value={form.receiptCode}
        />
        {errors.receiptCode && <small role="alert">{errors.receiptCode}</small>}
      </label>

      <label className="checkbox-row">
        <input
          checked={form.termsAccepted}
          disabled={disabled}
          onChange={(e) => update("termsAccepted", e.target.checked)}
          type="checkbox"
        />
        <span>I confirm I am 18+, a UK resident and accept the demo promotion terms.</span>
      </label>
      <span className="legal-hint">Placeholder eligibility wording for the capability demo. Final wording would come from the agency/client legal owner. <a href="#demo-terms">View demo terms.</a></span>
      {errors.termsAccepted && <small className="standalone-error" role="alert">{errors.termsAccepted}</small>}

      <label className="checkbox-row optional">
        <input
          checked={form.marketingOptIn}
          disabled={disabled}
          onChange={(e) => update("marketingOptIn", e.target.checked)}
          type="checkbox"
        />
        <span>Email me news and offers from Northline Coffee Co. Optional. Unsubscribe any time.</span>
      </label>

      {apiError && <div className="api-error" role="alert">{apiError}</div>}

      <button className="primary-button full" disabled={disabled || submitting} type="submit">
        {disabled ? "Entries unavailable" : submitting ? "Submitting…" : "Submit entry"}
      </button>

      <p className="privacy-note">Demonstration only. Submissions are processed by a mock endpoint and are not saved to an application database.</p>
    </form>
  );
}
