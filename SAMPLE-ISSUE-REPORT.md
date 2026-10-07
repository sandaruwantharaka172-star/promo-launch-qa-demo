# Sample issue report

> Example of the level of issue detail I would hand back during a bounded QA or launch-readiness engagement. The defect below mirrors a real flaw found and fixed in this capability demo; it is not represented as client work.

## Campaign status can drift from API status

**Severity:** High  
**Area:** Campaign availability / launch timing  
**Status:** Fixed in reviewer-hardening work

### Observed
The campaign page was eligible for static prerendering while the API evaluated the campaign window at request time. After the campaign state changed, the page could continue to display a stale `Live` state even while the API rejected entries.

### Expected
Visible campaign availability and the entry API should evaluate the same approved campaign window at request time.

### Reproduction
1. Build the app while the campaign window is live.
2. Inspect the Next.js route output.
3. Observe `/campaign` reported as static.
4. Advance beyond the close boundary without rebuilding.
5. Page status can remain stale while `POST /api/entries` returns 403.

### Root cause
The page called date logic during static generation and had no explicit dynamic rendering directive.

### Fix
- Force dynamic rendering for `/campaign`.
- Encode UK-local launch/close instants explicitly.
- Test the BST/GMT boundary.
- Keep API and page status on the same domain logic.

### Verification
- Build output should report `/campaign` as dynamic.
- Unit tests cover the opening and closing instants.
- Browser/API checks run with a deterministic injected demo clock.

### Handoff note
For a real campaign I would also confirm the approved timezone, launch owner, rollback owner and monitoring/incident route before release.
