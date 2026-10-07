import { describe, expect, it } from "vitest";
import { getCampaignStatus } from "@/lib/campaign";

describe("getCampaignStatus", () => {
  it("stays scheduled one second before the UK-local launch instant", () => {
    expect(getCampaignStatus(new Date("2026-09-30T22:59:59Z"))).toBe("scheduled");
  });

  it("opens at midnight BST on 1 October", () => {
    expect(getCampaignStatus(new Date("2026-09-30T23:00:00Z"))).toBe("live");
  });

  it("remains live through the final second of the approved window", () => {
    expect(getCampaignStatus(new Date("2026-12-24T23:59:59Z"))).toBe("live");
  });

  it("closes immediately after the approved end instant", () => {
    expect(getCampaignStatus(new Date("2026-12-25T00:00:00Z"))).toBe("closed");
  });
});
