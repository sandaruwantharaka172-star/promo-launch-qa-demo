import { describe, expect, it } from "vitest";
import { getCampaignStatus } from "@/lib/campaign";

describe("getCampaignStatus", () => {
  it("returns scheduled before launch", () => {
    expect(getCampaignStatus(new Date("2026-09-30T23:59:59Z"))).toBe("scheduled");
  });

  it("returns live inside the approved entry window", () => {
    expect(getCampaignStatus(new Date("2026-10-07T10:00:00Z"))).toBe("live");
  });

  it("returns closed after the end date", () => {
    expect(getCampaignStatus(new Date("2026-12-25T00:00:00Z"))).toBe("closed");
  });
});
