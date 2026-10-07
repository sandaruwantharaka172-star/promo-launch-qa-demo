import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/entries/route";

const validPayload = {
  fullName: "Alex Morgan",
  email: "alex@example.com",
  receiptCode: "GH-482910",
  termsAccepted: true,
  marketingOptIn: false,
};

function requestWith(body: string | object): Request {
  return new Request("http://localhost/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/entries", () => {
  beforeEach(() => {
    process.env.DEMO_NOW = "2026-10-07T10:00:00Z";
  });

  afterEach(() => {
    delete process.env.DEMO_NOW;
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(requestWith("{"));
    expect(response.status).toBe(400);
  });

  it("rejects a valid JSON null payload without throwing", async () => {
    const response = await POST(requestWith("null"));
    expect(response.status).toBe(400);
  });

  it("rejects invalid entry data at the API boundary", async () => {
    const response = await POST(requestWith({ ...validPayload, email: "invalid" }));
    expect(response.status).toBe(422);
  });

  it("returns a duplicate conflict for the deterministic review code", async () => {
    const response = await POST(requestWith({ ...validPayload, receiptCode: "USED-2026" }));
    expect(response.status).toBe(409);
  });

  it("returns a service-unavailable state for the outage review code", async () => {
    const response = await POST(requestWith({ ...validPayload, receiptCode: "ERROR-500" }));
    expect(response.status).toBe(503);
  });

  it("accepts a valid demo request and returns a reference", async () => {
    const response = await POST(requestWith(validPayload));
    const result = await response.json() as { entryId?: string; status?: string };

    expect(response.status).toBe(200);
    expect(result.status).toBe("accepted");
    expect(result.entryId).toMatch(/^DEMO-[A-Z0-9]{8}$/);
  });

  it("rejects entry after the campaign closes", async () => {
    process.env.DEMO_NOW = "2026-12-25T00:00:00Z";
    const response = await POST(requestWith(validPayload));
    expect(response.status).toBe(403);
  });
});
