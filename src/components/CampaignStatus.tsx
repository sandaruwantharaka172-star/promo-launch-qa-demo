import type { CampaignState } from "@/lib/types";

const copy: Record<CampaignState, { label: string; detail: string }> = {
  scheduled: {
    label: "Scheduled",
    detail: "Entry stays locked until the approved launch time.",
  },
  live: {
    label: "Live",
    detail: "The campaign is inside its approved entry window.",
  },
  closed: {
    label: "Closed",
    detail: "Entry is automatically disabled after the campaign end date.",
  },
};

export function CampaignStatus({ state }: { state: CampaignState }) {
  return (
    <div className={`status status-${state}`} aria-live="polite">
      <span className="status-dot" aria-hidden="true" />
      <span>
        <strong>{copy[state].label}</strong>
        <small>{copy[state].detail}</small>
      </span>
    </div>
  );
}
