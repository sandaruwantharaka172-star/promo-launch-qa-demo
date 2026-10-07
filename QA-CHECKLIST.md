# Launch QA checklist

This checklist shows the type of bounded launch-readiness pass I would use before calling a promotional entry flow ready for acceptance.

## Campaign state
- [x] Entry is unavailable before the approved start time.
- [x] Entry is available during the approved window.
- [x] Entry is unavailable after the approved end time.
- [x] Consumer-facing state explains whether the campaign is scheduled, live or closed.

## Entry flow
- [x] Required fields reject empty or malformed values.
- [x] Receipt codes are normalized before validation.
- [x] Terms acceptance is mandatory; marketing consent remains optional.
- [x] Validation exists on both client and API boundaries.
- [x] Duplicate-entry response is explicit and recoverable.
- [x] Temporary service failure has a user-safe response.
- [x] Successful submission returns an entry reference.

## UX / accessibility
- [x] Inputs have programmatic labels.
- [x] Validation messages use alert semantics.
- [x] Keyboard focus remains visible.
- [x] Small-screen layout is supported.
- [x] Reduced-motion preference is respected.

## Test evidence
- [x] Unit coverage for campaign date state.
- [x] Unit coverage for entry validation.
- [x] Browser test for validation + successful entry.
- [x] Browser test for duplicate-entry handling.

## Production handoff items not simulated here
- [ ] Real promotion platform or database integration.
- [ ] Agency/client analytics and CRM events.
- [ ] Approved legal copy and full terms.
- [ ] Data-retention and privacy implementation.
- [ ] Real winner-selection / prize-administration process.
- [ ] Production monitoring and incident contacts.

Those items are intentionally outside this capability demo and would be confirmed in scope before implementation.
