"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "launchproof:last-entry";
const REFERENCE_PATTERN = /^DEMO-[A-Z0-9]{8}$/;

function subscribe() {
  return () => {};
}

function getReferenceSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  const candidate = window.sessionStorage.getItem(STORAGE_KEY);
  return candidate && REFERENCE_PATTERN.test(candidate) ? candidate : null;
}

function getServerSnapshot(): null {
  return null;
}

export function SuccessSummary() {
  const reference = useSyncExternalStore(subscribe, getReferenceSnapshot, getServerSnapshot);

  if (!reference) {
    return (
      <section className="success-card">
        <span className="success-ring neutral" aria-hidden="true">i</span>
        <span className="eyebrow">Direct URL check</span>
        <h1>No demo confirmation in this tab.</h1>
        <p>Direct access to this page is intentionally not treated as proof of a valid entry. Run the sample flow so the mock API can return a reference first.</p>
        <div className="success-actions">
          <Link className="primary-button" href="/campaign">Run the sample flow</Link>
          <Link className="secondary-button dark" href="/">View implementation evidence</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="success-card">
      <span className="success-ring" aria-hidden="true">✓</span>
      <span className="eyebrow">Demo API response received</span>
      <h1>Demo entry accepted.</h1>
      <p>The mock API validated the request and returned a reference. This demo carries that reference between screens in session storage only; a production campaign would derive authoritative status from server-side records.</p>
      <div className="reference-box"><small>Demo reference</small><strong>{reference}</strong></div>
      <div className="success-actions">
        <Link className="primary-button" href="/">View implementation evidence</Link>
        <Link className="secondary-button dark" href="/campaign">Run another test</Link>
      </div>
    </section>
  );
}
