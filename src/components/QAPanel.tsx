const actionsUrl = "https://github.com/sandaruwantharaka172-star/promo-launch-qa-demo/actions/workflows/quality.yml?query=branch%3Amain";

const checks = [
  ["Entry window", "UK-local date boundary"],
  ["Input validation", "Format + required-field checks"],
  ["Simulated duplicate response", "Hard-coded 409 review state"],
  ["Simulated service outage", "Hard-coded 503 review state"],
  ["Consent UI", "Required checkbox + optional marketing"],
] as const;

export function QAPanel() {
  return (
    <section className="qa-panel" aria-labelledby="qa-title">
      <div className="section-kicker">Launch evidence</div>
      <div className="section-heading-row">
        <h2 id="qa-title">Explicit scenarios with automated evidence behind them.</h2>
        <span className="qa-score">5 review states · automated checks</span>
      </div>
      <div className="qa-grid">
        {checks.map(([name, value]) => (
          <article className="qa-check" key={name}>
            <span className="qa-check-mark" aria-hidden="true">✓</span>
            <div>
              <strong>{name}</strong>
              <span>{value}</span>
            </div>
          </article>
        ))}
      </div>
      <a className="qa-proof-link" href={actionsUrl}>View current GitHub Actions test runs ↗</a>
    </section>
  );
}
