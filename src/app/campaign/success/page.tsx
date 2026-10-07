import Link from "next/link";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ entry?: string }> }) {
  const { entry } = await searchParams;
  const reference = entry?.startsWith("DEMO-") ? entry : "DEMO-REFERENCE";

  return (
    <main className="success-page">
      <section className="success-card">
        <span className="success-ring" aria-hidden="true">✓</span>
        <span className="eyebrow">Submission accepted</span>
        <h1>Entry confirmed.</h1>
        <p>The mock API validated the request and returned a confirmation state without storing personal data.</p>
        <div className="reference-box"><small>Demo reference</small><strong>{reference}</strong></div>
        <div className="success-actions">
          <Link className="primary-button" href="/">View implementation evidence</Link>
          <Link className="secondary-button dark" href="/campaign">Run another test</Link>
        </div>
      </section>
    </main>
  );
}
