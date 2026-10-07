const checks = [
  ["Entry window", "Date-gated"],
  ["Form validation", "Client + server"],
  ["Duplicate handling", "Conflict state"],
  ["Consent", "Required terms"],
  ["Failure recovery", "User-safe error"],
  ["Automated coverage", "Unit + E2E"],
] as const;

export function QAPanel() {
  return (
    <section className="qa-panel" aria-labelledby="qa-title">
      <div className="section-kicker">Launch evidence</div>
      <div className="section-heading-row">
        <h2 id="qa-title">QA built into the flow, not added at the end.</h2>
        <span className="qa-score">6 / 6 checks represented</span>
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
    </section>
  );
}
