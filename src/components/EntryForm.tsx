"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { hasValidationErrors, normalizeReceiptCode, validateEntry } from "@/lib/validation";
import type { EntryPayload, FieldErrors } from "@/lib/types";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || submitting) return;

    const payload = { ...form, receiptCode: normalizeReceiptCode(form.receiptCode) };
    const nextErrors = validateEntry(payload);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) return;

    setSubmitting(true);
    setApiError("");

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

      router.push(`/campaign/success?entry=${encodeURIComponent(result.entryId)}`);
    } catch {
      setApiError("The entry service is temporarily unavailable. Your details were not submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <span className="eyebrow">Step 2 of 2</span>
          <h2>Enter the draw</h2>
        </div>
        <span className="secure-note">Demo · no data stored</span>
      </div>

      <label className="field">
        <span>Full name</span>
        <input
          aria-invalid={Boolean(errors.fullName)}
          disabled={disabled}
          name="fullName"
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Alex Morgan"
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
          placeholder="alex@example.com"
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
          placeholder="GH-482910"
          value={form.receiptCode}
        />
        <em>Demo edge cases: USED-2026 returns duplicate; ERROR-500 simulates an outage.</em>
        {errors.receiptCode && <small role="alert">{errors.receiptCode}</small>}
      </label>

      <label className="checkbox-row">
        <input
          checked={form.termsAccepted}
          disabled={disabled}
          onChange={(e) => update("termsAccepted", e.target.checked)}
          type="checkbox"
        />
        <span>I confirm I am eligible and accept the promotion terms.</span>
      </label>
      {errors.termsAccepted && <small className="standalone-error" role="alert">{errors.termsAccepted}</small>}

      <label className="checkbox-row optional">
        <input
          checked={form.marketingOptIn}
          disabled={disabled}
          onChange={(e) => update("marketingOptIn", e.target.checked)}
          type="checkbox"
        />
        <span>Send me occasional brand updates. Optional.</span>
      </label>

      {apiError && <div className="api-error" role="alert">{apiError}</div>}

      <button className="primary-button full" disabled={disabled || submitting} type="submit">
        {disabled ? "Entries unavailable" : submitting ? "Submitting…" : "Submit entry"}
      </button>

      <p className="privacy-note">Demonstration only. No production database or personal-data storage is connected.</p>
    </form>
  );
}
