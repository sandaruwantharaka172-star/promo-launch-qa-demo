import type { CampaignState } from "./types";

export const CAMPAIGN = {
  name: "Golden Hour Getaway",
  brand: "Northline Coffee Co.",
  start: new Date("2026-10-01T00:00:00+01:00"),
  end: new Date("2026-12-24T23:59:59+00:00"),
  prize: "A two-night city escape for two",
} as const;

function getDefaultNow(): Date {
  const injected = process.env.DEMO_NOW?.trim();

  if (injected) {
    const parsed = new Date(injected);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  return new Date();
}

export function getCampaignStatus(now = getDefaultNow()): CampaignState {
  if (now < CAMPAIGN.start) return "scheduled";
  if (now > CAMPAIGN.end) return "closed";
  return "live";
}

export function formatCampaignWindow(): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
    timeZoneName: "short",
  });

  return `${formatter.format(CAMPAIGN.start)} – ${formatter.format(CAMPAIGN.end)}`;
}
