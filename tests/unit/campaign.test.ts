import { describe, expect, it } from "vitest";
import { getCampaignStatus } from "@/lib/campaign";

describe("getCampaignStatus", () => {
  it("stays scheduled one millisecond before the UK-local launch instant", () => {
    expect(getCampaignStatus(new Date("2026-09-30T22:59:59.999Z"))).toBe("scheduled");
  });

  it("opens at midnight BST on 1 October", () => {
    expect(getCampaignStatus(new Date("2026-09-30T23:00:00.000Z"))).toBe("live");
  });

  it("remains live through the final millisecond of 24 December", () => {
    expect(getCampaignStatus(new Date("2026-12-24T23:59:59.999Z"))).toBe("live");
  });

  it("closes at midnight immediately after the approved window", () => {
    expect(getCampaignStatus(new Date("2026-12-25T00:00:00.000Z"))).toBe("closed");
  });
});
