import Link from "next/link";
import { QAPanel } from "@/components/QAPanel";

const repoUrl = "https://github.com/sandaruwantharaka172-star/promo-launch-qa-demo";
const actionsUrl = `${repoUrl}/actions`;
const handoffUrl = `${repoUrl}/blob/main/SAMPLE-HANDOFF.md`;
const issueReportUrl = `${repoUrl}/blob/main/SAMPLE-ISSUE-REPORT.md`;

const capabilities = [
  {
    index: "01",
    title: "Mechanic implementation",
    copy: "Translate an approved promotion mechanic into a clear, testable consumer flow inside the existing project and platform constraints.",
  },
  {
    index: "02",
    title: "Edge-case handling",
    copy: "Model date boundaries, duplicate entries, invalid data, consent and service failures as explicit reviewable states.",
  },
  {
    index: "03",
    title: "Launch evidence",
    copy: "Pair manual QA thinking with automated domain, API and browser checks so acceptance criteria are visible before launch.",
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="brand" href="/">
          <span className="brand-mark">L</span>
          <span>Launchproof</span>
        </Link>
        <div className="header-meta">
          <span className="demo-pill">Independent capability sample</span>
          <a href={repoUrl}>GitHub</a>
        </div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">External implementation + QA for promotional agencies</span>
          <h1>Promotional campaigns should fail in testing, not in market.</h1>
          <p>
            I build and QA consumer entry flows for campaigns your team has already approved. The agency/client keeps strategy, creative, the client relationship, legal/compliance decisions, prize administration and every third-party account.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/campaign">Run the sample flow</Link>
            <a className="secondary-button" href="#evidence">See QA evidence</a>
            <a className="secondary-button" href={repoUrl}>View QA code / repo</a>
          </div>
          <p className="honesty-note">Fictional campaign. Built as a capability sample and not presented as paid client work.</p>
        </div>

        <aside className="delivery-card" aria-label="Delivery summary">
          <div className="delivery-topline">
            <span>Campaign implementation sample</span>
            <a className="live-chip" href={actionsUrl}>View test runs ↗</a>
          </div>
          <div className="delivery-window">
            <span>Approved mechanic</span>
            <strong>Purchase → code → entry → confirmation</strong>
          </div>
          <div className="delivery-grid">
            <div><small>Implementation</small><strong>Next.js + TypeScript</strong></div>
            <div><small>Validation</small><strong>Client + API boundary</strong></div>
            <div><small>Testing</small><strong>Vitest + Playwright</strong></div>
            <div><small>Handoff</small><strong>Branch + PR + CI</strong></div>
          </div>
          <div className="delivery-foot"><span>Bounded scope</span><span>No production entrant data</span><span>Reviewable states</span></div>
        </aside>
      </section>

      <section className="capability-section shell">
        <div className="section-kicker">What this demonstrates</div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item.index}>
              <span>{item.index}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="shell" id="evidence"><QAPanel /></div>

      <section className="handoff-section shell">
        <div>
          <span className="eyebrow">Designed for a clean handoff</span>
          <h2>Small scope. Visible assumptions. Reviewable acceptance.</h2>
        </div>
        <div className="handoff-copy">
          <p>
            No production entrant data is used in this demo. In a real engagement, data access, retention, consent, monitoring and security controls would be implemented against the agency/client&apos;s approved requirements and existing platform. This sample does not claim GDPR, CAP or legal approval.
          </p>
          <div className="handoff-links">
            <a href={handoffUrl}>Sample handoff document ↗</a>
            <a href={issueReportUrl}>Sample issue report ↗</a>
            <a href={repoUrl + "/issues"}>Tracked issues ↗</a>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <span>Launchproof capability demo · 2026</span>
        <span>Independent implementation + QA sample.</span>
      </footer>
    </main>
  );
}
