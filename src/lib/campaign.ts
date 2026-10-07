import type { CampaignState } from "./types";

export const CAMPAIGN = {
  name: "Golden Hour Getaway",
  brand: "Northline Coffee Co.",
  start: new Date("2026-10-01T00:00:00.000Z"),
  end: new Date("2026-12-24T23:59:59.000Z"),
  prize: "A two-night city escape for two",
} as const;

export function getCampaignStatus(now = new Date()): CampaignState {
  if (now < CAMPAIGN.start) return "scheduled";
  if (now > CAMPAIGN.end) return "closed";
  return "live";
}

export function formatCampaignWindow(): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return `${formatter.format(CAMPAIGN.start)} – ${formatter.format(CAMPAIGN.end)}`;
}
