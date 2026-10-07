import { NextResponse } from "next/server";
import { getCampaignStatus } from "@/lib/campaign";
import { hasValidationErrors, normalizeReceiptCode, validateEntry } from "@/lib/validation";
import type { EntryPayload } from "@/lib/types";

export async function POST(request: Request) {
  if (getCampaignStatus() !== "live") {
    return NextResponse.json(
      { message: "Entries are not currently open." },
      { status: 403 },
    );
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const payload = parsed as Partial<EntryPayload>;
  const normalized: EntryPayload = {
    fullName: typeof payload.fullName === "string" ? payload.fullName.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "",
    receiptCode: typeof payload.receiptCode === "string" ? normalizeReceiptCode(payload.receiptCode) : "",
    termsAccepted: payload.termsAccepted === true,
    marketingOptIn: payload.marketingOptIn === true,
  };

  const errors = validateEntry(normalized);
  if (hasValidationErrors(errors)) {
    return NextResponse.json({ message: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  if (normalized.receiptCode === "USED-2026") {
    return NextResponse.json(
      { message: "That receipt code has already been used for an entry." },
      { status: 409 },
    );
  }

  if (normalized.receiptCode === "ERROR-500") {
    return NextResponse.json(
      { message: "The entry service is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    entryId: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    status: "accepted",
  });
}
