import Link from "next/link";
import { QAPanel } from "@/components/QAPanel";

const capabilities = [
  {
    index: "01",
    title: "Mechanic implementation",
    copy: "Translate an approved promotion mechanic into a clear, testable consumer flow using existing project constraints.",
  },
  {
    index: "02",
    title: "Edge-case handling",
    copy: "Treat dates, duplicate entries, invalid data, consent and service failures as product states—not surprises after launch.",
  },
  {
    index: "03",
    title: "Launch evidence",
    copy: "Pair manual QA thinking with automated unit and browser tests so acceptance is objective and reviewable.",
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
          <span className="demo-pill">Independent demo</span>
          <a href="https://github.com/sandaruwantharaka172-star/promo-launch-qa-demo">GitHub</a>
        </div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">Campaign implementation / QA demonstration</span>
          <h1>Promotional campaigns should fail in testing, not in market.</h1>
          <p>
            A compact demonstration of how I approach a bounded campaign implementation: approved mechanic in, testable flow out, with edge cases and launch-readiness evidence built into delivery.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/campaign">Run the consumer flow</Link>
            <a className="secondary-button" href="#evidence">See QA evidence</a>
          </div>
          <p className="honesty-note">Fictional campaign. Built as a capability sample—not presented as client work.</p>
        </div>

        <aside className="delivery-card" aria-label="Delivery summary">
          <div className="delivery-topline">
            <span>Launch-readiness sample</span>
            <span className="live-chip">Ready for review</span>
          </div>
          <div className="delivery-window">
            <span>Approved mechanic</span>
            <strong>Purchase → code → entry → confirmation</strong>
          </div>
          <div className="delivery-grid">
            <div><small>Implementation</small><strong>Next.js + TypeScript</strong></div>
            <div><small>Validation</small><strong>Client + API</strong></div>
            <div><small>Coverage</small><strong>Vitest + Playwright</strong></div>
            <div><small>Infrastructure</small><strong>$0 demo stack</strong></div>
          </div>
          <div className="launch-bar"><span /></div>
          <div className="delivery-foot"><span>Scope bounded</span><span>No production data</span><span>Reviewable states</span></div>
        </aside>
      </section>

      <section className="capability-section shell">
        <div className="section-kicker">What this proves</div>
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
          <h2>Small scope. Visible assumptions. Objective acceptance.</h2>
        </div>
        <p>
          This sample intentionally avoids a database, paid services and invented client claims. The repository documents assumptions, QA checks, test coverage and the point where production integrations would begin.
        </p>
      </section>

      <footer className="site-footer shell">
        <span>Launchproof demo · 2026</span>
        <span>Built to demonstrate implementation discipline, not campaign strategy.</span>
      </footer>
    </main>
  );
}
