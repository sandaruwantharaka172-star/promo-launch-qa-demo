import { describe, expect, it } from "vitest";
import { normalizeReceiptCode, validateEntry } from "@/lib/validation";

describe("entry validation", () => {
  it("normalizes receipt codes", () => {
    expect(normalizeReceiptCode(" gh-482910 ")).toBe("GH-482910");
  });

  it("accepts a valid entry", () => {
    expect(validateEntry({
      fullName: "Alex Morgan",
      email: "alex@example.com",
      receiptCode: "GH-482910",
      termsAccepted: true,
      marketingOptIn: false,
    })).toEqual({});
  });

  it("rejects malformed data and missing terms acceptance", () => {
    const errors = validateEntry({
      fullName: "A",
      email: "not-an-email",
      receiptCode: "?",
      termsAccepted: false,
      marketingOptIn: false,
    });

    expect(errors.fullName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.receiptCode).toBeDefined();
    expect(errors.termsAccepted).toBeDefined();
  });
});
