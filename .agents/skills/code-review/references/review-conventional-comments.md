# Conventional Comments Reference

Single source of truth for label definitions, decorations, and scoring rules used by the code review skill.

## Format

```text
<label> (<decorations>): <subject>

<discussion>
```

- **label** — classifies the comment's intent (see table below)
- **decorations** — required modifiers in parentheses, comma-separated. Default to `(non-blocking)` when no other decoration applies
- **subject** — short description of the finding
- **discussion** — structured body with `File:` (local path) or `File:` (GitHub permalink), then `Fix:`, `Why:` fields (see output templates for exact format)

## Labels

| Label          | Meaning                                    | When to Use                                                    | Expected Developer Action                             | Blocking by Default                         |
| -------------- | ------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| **issue**      | A problem that must or should be addressed | Bugs, security vulnerabilities, data loss risks, logic errors  | Fix before merge (if blocking) or before next release | No (use `(blocking)` decoration explicitly) |
| **suggestion** | A proposed improvement                     | Better approaches, cleaner patterns, performance gains         | Consider and apply or discuss                         | No                                          |
| **todo**       | A required follow-up task                  | Missing tests, incomplete error handling, unfinished migration | Complete before merge or create tracked issue         | No                                          |
| **question**   | Seeking clarification                      | Unclear intent, ambiguous logic, missing context               | Respond with explanation or add code comment          | No                                          |
| **thought**    | An observation for consideration           | Architectural observations, potential future concerns          | No action required — informational                    | No                                          |
| **note**       | Highlighting information                   | Context for reviewers, non-obvious behavior, design rationale  | No action required — informational                    | No                                          |
| **chore**      | Maintenance or cleanup task                | Rename, restructure, update dependency, remove dead code       | Apply when convenient                                 | No                                          |
| **praise**     | Positive feedback                          | Well-written code, good patterns, clever solutions             | None — recognition                                    | No                                          |

**Note on `question`:** Prefer `question` over `issue` when you aren't sure whether the code is intentional. Ask for the rationale (e.g., "What was the reasoning for changing X?") rather than flagging it as a defect.

## Decorations

| Decoration         | Definition                                        | When to Apply                                                 |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------- |
| **(blocking)**     | Merge must not proceed until resolved             | Security vulnerabilities, data loss, critical bugs            |
| **(non-blocking)** | Default decoration — finding does not block merge | Always applied unless a more specific decoration overrides it |
| **(if-minor)**     | Resolution is only needed if the change is small  | Minor suggestions where the fix effort should be proportional |
| **(security)**     | Flags a security-related concern                  | Any finding with security implications, regardless of label   |

## Internal Confidence Thresholds

Confidence scores are used internally to decide whether to report a finding. They are **never shown in output**.

| Labels                         | Minimum Confidence                                            |
| ------------------------------ | ------------------------------------------------------------- |
| issue, suggestion, todo, chore | 80+                                                           |
| question, thought, note        | Below 80 allowed                                              |
| nitpick                        | **Never use** — linter-catchable items should not be reported |

## Scoring Factors

When assigning internal confidence:

- **Evidence strength** — Can you point to the exact line and explain the concrete failure mode?
- **Impact severity** — What breaks if this ships? Data loss > UX bug > style issue.
- **Certainty** — Are you sure this is wrong, or could it be intentional?

## Label Ordering (Output)

Findings are organized into two tiers in PR review mode.

### Tier 1: Unreported Findings

New findings not yet covered by existing PR comments, ordered by severity:

1. `issue (blocking)`
2. `issue`
3. `todo`
4. `suggestion`
5. `question`
6. `thought`
7. `note`
8. `chore`

### Tier 2: Already-Reported Findings

Findings matching existing PR comments, ordered by the same severity list.
Each uses the Already-Reported Finding template from `review-output-templates.md`.

**Local review mode:** Tier 2 does not apply. All findings use a single flat list.

Praise is reported as a single block after all findings (after Tier 2 if present),
before the summary table. See `review-output-templates.md` for the summary table format and verdict templates.

## Finding Examples

> Note: `question` findings omit the `Fix:` field because they seek clarification rather than prescribe a change. All other labels include `Fix:`.

### Issue (blocking)

```text
issue (blocking, security): SQL injection via string concatenation

File: src/db/users.ts:42

Fix: Use parameterized query: `db.query('SELECT * FROM users WHERE id = $1', [userId])`

Why: User-controlled `userId` is interpolated directly into the query string.
```

### Issue (non-Blocking)

```text
issue (non-blocking): Race condition in counter increment

File: src/services/counter.ts:15

Fix: Use atomic increment: `db.query('UPDATE counters SET value = value + 1 WHERE id = $1', [id])`

Why: Read-modify-write without a transaction allows concurrent requests to lose increments.
```

### Suggestion (non-Blocking)

```text
suggestion (non-blocking): Extract repeated validation into shared helper

File: src/api/orders.ts:18

Fix: Move the email/phone validation to `src/utils/validate.ts` and import it.

Why: The same 15-line validation block appears in 3 route handlers.
```

### Todo (non-Blocking)

```text
todo (non-blocking): Add unit tests for the new discount calculation

File: src/services/pricing.ts:45

Fix: Add test cases for: zero quantity, negative price, boundary discount tiers.

Why: The discount logic has multiple branches with no test coverage.
```

### Question (non-Blocking) — Curious Tone

```text
question (non-blocking): Is the explicit React fragment necessary here?

File: src/components/Layout.tsx:23

Why: The wrapping `<React.Fragment>` could be replaced with `<>...</>` or
removed entirely if there's a single child — unless there's a specific reason
it's needed (e.g., key prop on the fragment).
```

### Question (non-Blocking) — Seeking Rationale

```text
question (non-blocking): What was the rationale for changing the MIME type?

File: src/api/upload.ts:34

Why: This looks like a significant change for a PR focused on TypeScript
migration. Was this fixing a pre-existing bug or is it related to the
migration?
```

### Suggestion (non-Blocking) — Helpful with Code Example

```text
suggestion (non-blocking): Simplify member selector with direct map

File: src/store/selectors.ts:18

Fix: Consider replacing the manual loop:
`select: ({ members }) => members.map(transformMember),`

Why: The current implementation manually iterates and pushes to an array.
The built-in `map` achieves the same result with less code and avoids
the mutable accumulator.

// Current
select: ({ members }) => {
  const result = [];
  for (const m of members) {
    result.push(transformMember(m));
  }
  return result;
},

// Suggested
select: ({ members }) => members.map(transformMember),
```

### Suggestion (non-Blocking) — Helpful with Reference

```text
suggestion (non-blocking): Remove unnecessary `act` wrapper around `fireEvent`

File: src/components/__tests__/Button.test.tsx:42

Fix: Remove the `act()` call and use `fireEvent.click(button)` directly.

Why: `act` is not typically needed when using `fireEvent` because React
Testing Library wraps those calls in `act` behind the scenes. The extra
wrapper adds noise without changing behavior. See React Testing Library
docs on `act` for details.

// Current
act(() => {
  fireEvent.click(button);
});

// Suggested
fireEvent.click(button);
```

### Suggestion (non-Blocking) — Kind Framing

```text
suggestion (non-blocking): Use the design system size token instead of raw pixel value

File: src/components/Avatar.tsx:15

Fix: Replace `width: '12px'` with `size: sizePx.xsmall` from the
`utility` helper.

Why: The design system provides standardized size tokens that stay
consistent across components. Using `sizePx.xsmall` ensures the avatar
scales correctly if the design system values are updated.
```

### Chore (non-Blocking) — Exact and Specific

```text
chore (non-blocking): Rename file extension from .tsx to .ts

File: src/utils/formatDate.tsx

Fix: Rename to `formatDate.ts`.

Why: This file contains no JSX. Using `.tsx` for non-component files
adds unnecessary JSX transform overhead and misleads readers about
the file's purpose.
```

## Verdict Mapping

| Verdict             | Condition                                                |
| ------------------- | -------------------------------------------------------- |
| **REQUEST CHANGES** | Any `(blocking)` finding present                         |
| **COMMENT**         | Has `issue` or `todo` findings but none are `(blocking)` |
| **APPROVE**         | No `issue` or `todo` findings                            |
