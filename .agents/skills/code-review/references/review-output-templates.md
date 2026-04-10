# Review Output Templates

Standard formats for reporting code review findings using [Conventional Comments](https://conventionalcomments.org/).

For label definitions, decorations, and scoring rules, see `review-conventional-comments.md`.

## Review Structure

Every review follows this top-level structure:

```text
Code Review: <branch-name>

Scope: N commits, N files changed (+N / -N lines)

---

## Overview

1. First capability or change area summary
2. Second capability or change area summary
3. ...

---

1. <file-or-area> — <short context>

<CC findings for this section>

2. <file-or-area> — <short context>

<CC findings for this section>

---

### Already Reported  <!-- PR review mode only — omit this section in local review mode -->

N. <file-or-area> — <short context>

<Already-reported CC findings>

---

praise: [single praise block]

## Review Summary

[summary table + verdict]
```

### Structure Rules

1. **Header** — Always start with `Code Review: <branch-name>`.
2. **Scope** — Show commit count and file/line change stats.
3. **Overview** — Numbered list summarizing what the branch does. Keep each item to 1-2 sentences.
4. **Numbered sections** — Group findings by file or area. Each section gets a numbered heading: `N. <file-or-area> — <short context>`. Findings within use CC format.
5. **Sections are organizational, not analytical** — Section headings name the file or area, not the review dimension. Do not use dimension names (Security, Bug Detection, etc.) as section headings.
6. **Two-tier structure in PR mode** — In PR review mode, `### Already Reported` separates Tier 1 (new) from Tier 2 (already-reported) findings. Omit entirely in local review mode.

## Single Finding (Local Review)

```text
<label> (<decorations>): <Short description>

  File: path/to/file.ts:42

  Fix: Concrete fix with code.

  Why: What is wrong and why it matters.

  // Current
  <problematic code>

  // Suggested
  <fixed code>
```

## Single Finding (PR Review with GitHub Permalink)

```text
<label> (<decorations>): <Short description>

  File: https://github.com/{owner}/{repo}/blob/{sha}/{file}#L{start}-L{end}

  Fix: Concrete fix with code.

  Why: What is wrong and why it matters.
```

## Already-Reported Finding (PR Review)

```text
<label> (<decorations>): <Short description>

  File: https://github.com/{owner}/{repo}/blob/{sha}/{file}#L{start}-L{end}

  Existing: <permalink to existing PR comment>

  Disposition: already covered | widen scope — <brief explanation>

  Fix: Concrete fix with code (only if "widen scope").

  Why: What is wrong and why it matters (only if "widen scope").
```

Template rules:

- `Existing:` — mandatory, contains the `html_url` of the matched comment
- `Disposition:` — mandatory, one of two values with brief explanation
- When `already covered`: `Fix:` and `Why:` are optional (omit to reduce noise)
- When `widen scope`: `Fix:` and `Why:` are mandatory (describe additional scope)

## Consolidated Finding (N Similar Issues)

```text
<label> (<decorations>): <Short description> — N occurrences

  Files: path/a.ts:10, path/b.ts:25, path/c.ts:42

  Fix: Common fix approach with example.

  Why: Common description of the repeated pattern.
```

## Praise Block

A single praise block after all findings, before the summary table:

```text
praise: [Summary of what was done well — good patterns, clean design, thorough tests, etc.]
```

## Summary Table

```text
## Review Summary

| Label | Count |
|-------|-------|
| issue (blocking) | 0 |
| issue | 0 |

Verdict: VERDICT — Explanation.
```

Always show `issue (blocking)` and `issue` rows. Omit zero-count rows for other labels (todo, suggestion, question, thought, note, chore).

In PR review mode, add an `Already reported` row:

```text
| Already reported | 0 |
```

This row does NOT affect verdict — verdicts are based on all findings regardless of tier (a blocking issue is blocking whether or not someone else already flagged it). Omit in local review mode.

## Verdict Templates

### APPROVE

```text
Verdict: APPROVE — No issues or todos found. Code is ready to merge.
```

### COMMENT

```text
Verdict: COMMENT — N issues found but none are blocking. Should address before merge.
```

### REQUEST CHANGES

```text
Verdict: REQUEST CHANGES — N blocking issues found. Must fix before merge:
- [Brief description of each blocking issue]
```

## Complete Review Example

Below is a complete, correctly formatted review output:

---

Code Review: feat/user-api-validation

Scope: 3 commits, 5 files changed (+245 / -38 lines)

---

## Overview

1. Adds input validation to the user API endpoints using Zod schemas.
2. Extracts shared validation helpers for email and phone fields.
3. Adds parameterized queries to the user lookup endpoint.

---

1. src/db/users.ts — User lookup query

issue (blocking, security): SQL injection via string concatenation

File: src/db/users.ts:42

Fix: Use parameterized query: `db.query('SELECT * FROM users WHERE id = $1', [userId])`

Why: User-controlled `userId` is interpolated directly into the query string, allowing arbitrary SQL execution.

2. src/api/orders.ts — Order validation

suggestion (non-blocking): Extract repeated validation into shared helper

File: src/api/orders.ts:18

Fix: Move the email/phone validation block to `src/utils/validate.ts` and import it.

Why: The same 15-line validation block appears in 3 route handlers. A shared helper reduces duplication and ensures consistent validation.

3. src/services/payment.ts — Payment service call

todo (non-blocking): Add error handling for external API timeout

File: src/services/payment.ts:67

Fix: Wrap the `fetch()` call in a try/catch and return a typed error result on timeout.

Why: The payment service call has no timeout or error handling. A network failure will crash the request handler.

praise: Clean separation of concerns between the route handlers and service layer. The consistent use of typed Result objects for error propagation is well done.

## Review Summary

| Label            | Count |
| ---------------- | ----- |
| issue (blocking) | 1     |
| issue            | 0     |
| todo             | 1     |
| suggestion       | 1     |

Verdict: REQUEST CHANGES — 1 blocking issue (SQL injection) must be fixed before merge.

---

## Anti-Patterns (Do NOT Do This)

**Wrong — review dimension names as section headers:**

> ### Security
>
> I checked for SQL injection and found...
>
> ### Bug Detection
>
> Looking at the logic...

**Right — file/area as numbered section headers:**

> 1. src/db/users.ts — User lookup query
>
> issue (blocking, security): ...

**Wrong — narrative prose instead of CC format:**

> There's a potential issue in the payment handler where the timeout isn't configured...

**Wrong — missing decoration and Issue/Fix instead of Fix/Why:**

> issue: Missing timeout
> Issue: The payment service call has no timeout.
> Fix: Add a timeout.

**Correct:**

> issue (non-blocking): Missing timeout on payment service call
>
> File: src/services/payment.ts:67
>
> Fix: Add `signal: AbortSignal.timeout(5000)` to the fetch options.
>
> Why: Network failures will hang the request handler indefinitely without a timeout.

## Test Coverage Gap Report

```text
## Test Coverage Assessment

Coverage rating: N/10
- [Gap description with file:line references]
- [Gap description with file:line references]

Recommendation: [What tests to add]
```

## Thorough Mode Pass Summary

```text
## Multi-Pass Review Results

### Pass 1: Security + Bugs
[Findings or "No issues found"]

### Pass 2: Types + Simplification
[Findings or "No issues found"]

### Pass 3: Tests + Silent Failures
[Findings or "No issues found"]

---
[Merged findings in flat list ordered by label severity, praise block, summary table, and verdict]
```
