# Launchproof — Promotional Campaign Implementation & QA Demo

A compact Next.js capability sample showing how I approach the implementation layer of an **already-approved promotional campaign**: translate the mechanic into a testable consumer flow, cover failure states, and provide launch-readiness evidence.

> This is a fictional campaign created as a capability demonstration. It is not presented as client work, and it stores no personal data.

## What this proves

- **Bounded implementation:** approved mechanic → working entry flow.
- **Campaign-state logic:** scheduled, live and closed states are date-gated and testable.
- **Defensive validation:** validation runs in the browser and again at the API boundary.
- **Operational edge cases:** duplicate entry and upstream-service failure are explicit reviewable states.
- **Consent discipline:** required promotion terms are separated from optional marketing consent.
- **Launch evidence:** Vitest covers domain rules; Playwright covers the browser journey.
- **Honest boundaries:** no fake database, fake client metrics or pretend production integrations.

## Demo flow

`Landing → campaign → entry form → API validation → confirmation`

Try these deterministic review cases:

| Receipt code | Result |
| --- | --- |
| `GH-482910` | Successful demo entry |
| `USED-2026` | Duplicate-entry conflict |
| `ERROR-500` | Temporary service failure |

## Stack

- Next.js App Router
- React
- TypeScript
- Route Handlers
- Vitest
- Playwright
- Plain CSS (no UI framework dependency)

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Quality checks

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

## Review the delivery thinking

- [`QA-CHECKLIST.md`](./QA-CHECKLIST.md) — launch-readiness checks and explicit production gaps.
- [`IMPLEMENTATION-NOTES.md`](./IMPLEMENTATION-NOTES.md) — assumptions, scope boundaries and pre-delivery questions.

## Why the sample is intentionally small

The objective is not to build speculative campaign software. It is to demonstrate that a narrow campaign implementation can be understood, built, tested and handed off cleanly. In real agency work, strategy, creative, legal approvals, prize administration and the client relationship remain with the agency/client unless explicitly scoped otherwise.
