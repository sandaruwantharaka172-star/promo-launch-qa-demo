import type { EntryPayload, FieldErrors } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECEIPT_PATTERN = /^[A-Z0-9-]{6,24}$/;

export function normalizeReceiptCode(value: string): string {
  return value.trim().toUpperCase();
}

export function validateEntry(payload: EntryPayload): FieldErrors {
  const errors: FieldErrors = {};
  const fullName = payload.fullName.trim();
  const email = payload.email.trim();
  const receiptCode = normalizeReceiptCode(payload.receiptCode);

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!RECEIPT_PATTERN.test(receiptCode)) {
    errors.receiptCode = "Use 6–24 letters, numbers or hyphens.";
  }

  if (!payload.termsAccepted) {
    errors.termsAccepted = "You must accept the promotion terms to enter.";
  }

  return errors;
}

export function hasValidationErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
