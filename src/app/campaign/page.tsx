import Link from "next/link";
import { CampaignStatus } from "@/components/CampaignStatus";
import { EntryForm } from "@/components/EntryForm";
import { CAMPAIGN, formatCampaignWindow, getCampaignStatus } from "@/lib/campaign";

export const dynamic = "force-dynamic";

export default function CampaignPage() {
  const status = getCampaignStatus();

  return (
    <main className="campaign-page">
      <header className="campaign-header shell">
        <Link className="brand light" href="/">
          <span className="brand-mark">L</span>
          <span>Launchproof</span>
        </Link>
        <Link className="back-link" href="/">← Implementation evidence</Link>
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

          <div className="campaign-conditions">
            <strong>Demo significant conditions</strong>
            <span>18+ UK residents · 1 winner · closes 23:59 UK time, 24 Dec 2026</span>
            <span>Promoter: Northline Coffee Co. (fictional). Final eligibility, promoter details and legal copy would be supplied or approved by the agency/client.</span>
            <div className="campaign-legal-links">
              <a href="#demo-terms">Demo terms</a>
              <a href="#demo-privacy">Demo privacy notice</a>
            </div>
          </div>

          <CampaignStatus state={status} />

          <ol className="campaign-steps">
            <li><span>1</span><div><strong>Purchase</strong><p>Buy a qualifying product during the campaign window.</p></div></li>
            <li><span>2</span><div><strong>Enter</strong><p>Use the receipt code and complete the eligibility checks.</p></div></li>
            <li><span>3</span><div><strong>Confirm</strong><p>Receive a demo reference after successful API validation.</p></div></li>
          </ol>

          <div className="demo-legal-copy">
            <details id="demo-terms">
              <summary>Demo terms placeholder</summary>
              <p>This section demonstrates where agency-approved full promotion terms would be available before entry. It is intentionally not presented as legal advice or an approved set of terms.</p>
            </details>
            <details id="demo-privacy">
              <summary>Demo privacy notice placeholder</summary>
              <p>This demo stores no entrant data. A real implementation would use the agency/client-approved privacy, retention, consent and processor requirements for the selected platform.</p>
            </details>
          </div>
        </div>

        <div className="campaign-form-wrap">
          <EntryForm disabled={status !== "live"} />
        </div>
      </section>
    </main>
  );
}
