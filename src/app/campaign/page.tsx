import Link from "next/link";
import { CampaignStatus } from "@/components/CampaignStatus";
import { EntryForm } from "@/components/EntryForm";
import { CAMPAIGN, formatCampaignWindow, getCampaignStatus } from "@/lib/campaign";

export default function CampaignPage() {
  const status = getCampaignStatus();

  return (
    <main className="campaign-page">
      <header className="campaign-header shell">
        <Link className="brand light" href="/">
          <span className="brand-mark">L</span>
          <span>Launchproof</span>
        </Link>
        <Link className="back-link" href="/">← Implementation notes</Link>
      </header>

      <section className="campaign-shell shell">
        <div className="campaign-story">
          <span className="campaign-brand">{CAMPAIGN.brand}</span>
          <span className="eyebrow warm">Fictional promotional campaign</span>
          <h1>Find your golden hour.</h1>
          <p className="campaign-lede">Buy any qualifying product, enter the code from your receipt and you could win {CAMPAIGN.prize.toLowerCase()}.</p>

          <div className="campaign-prize-card">
            <span className="sun-disc" aria-hidden="true" />
            <div>
              <small>Prize draw</small>
              <strong>{CAMPAIGN.prize}</strong>
              <span>{formatCampaignWindow()}</span>
            </div>
          </div>

          <CampaignStatus state={status} />

          <ol className="campaign-steps">
            <li><span>1</span><div><strong>Purchase</strong><p>Buy a qualifying product during the campaign window.</p></div></li>
            <li><span>2</span><div><strong>Enter</strong><p>Use the receipt code and complete the eligibility checks.</p></div></li>
            <li><span>3</span><div><strong>Confirm</strong><p>Receive an entry reference after successful validation.</p></div></li>
          </ol>
        </div>

        <div className="campaign-form-wrap">
          <EntryForm disabled={status !== "live"} />
        </div>
      </section>
    </main>
  );
}
