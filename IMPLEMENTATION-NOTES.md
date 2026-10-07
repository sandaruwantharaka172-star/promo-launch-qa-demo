# Implementation notes

## Purpose

This is a deliberately bounded capability sample for promotional campaign implementation and QA. It is not represented as client work and does not claim to be a production promotion platform.

## Approved mechanic used for the demo

`Purchase → receipt code → consumer entry form → validation → confirmation`

The implementation treats the mechanic as an input. Strategy, creative direction, legal rules, prize administration and campaign ownership would remain with the agency/client in a real engagement.

## Design decisions

### 1. Campaign dates are domain logic
The start/end window lives in `src/lib/campaign.ts` and can be tested independently from the UI.

### 2. Validation is not client-only
The same validation rules are enforced again at the API boundary. Browser validation improves UX; API validation protects the contract.

### 3. Failure states are demonstrable
Two deterministic demo codes make review easy:
- `USED-2026` → duplicate-entry conflict.
- `ERROR-500` → temporary upstream/service failure.

### 4. No fake persistence
The demo does not pretend to have a production database. Accepted entries receive a generated reference and are not stored.

### 5. Acceptance can be objective
Vitest covers campaign-state and validation rules. Playwright covers the consumer path and a key error state.

## What I would ask before touching a real campaign

1. Approved mechanic and eligibility rules.
2. Existing platform/repository and access model.
3. Required CRM, analytics, fulfilment or email destinations.
4. Final legal/consent copy and data-retention requirements.
5. Launch time, timezone and rollback/incident owner.
6. Browser/device support requirements.
7. Acceptance criteria and sign-off owner.
8. Client-owned third-party accounts and any paid-service dependencies.

## Delivery boundary

For paid work I would inspect the task, repository, dependencies, third-party costs and deployment requirements before accepting. Work would happen in a branch with tests and a reviewable pull request; client-owned accounts remain client-owned.
