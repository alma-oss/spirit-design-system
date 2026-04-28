---
name: code-review
description: Comprehensive code review methodology for security, quality, and maintainability analysis. Use when reviewing code changes, PRs, or any modified files for correctness, security, and project guideline compliance.
---

# Code Review Skill

Comprehensive code review methodology for security, quality, and maintainability analysis.

## Core Philosophy

Quality over quantity. Only surface issues that matter. A review flooded with noise trains developers to ignore feedback. Every reported finding must be actionable, specific, and worth the reader's time.

Frame findings constructively. Assume the author made a reasonable choice until proven otherwise. Use "consider" for suggestions, ask before asserting when intent is ambiguous, and lead with the fix rather than the fault. The goal is to make the code better, not to catalog what's wrong.

## Conventional Comments

This review uses [Conventional Comments](https://conventionalcomments.org/). See `references/review-conventional-comments.md` for full label definitions, decorations, and reporting thresholds.

**Labels:** issue, suggestion, todo, question, thought, note, chore, praise

**Key rule:** Actionable labels (issue, suggestion, todo, chore) require 80+ internal confidence. Soft labels (question, thought, note) are allowed below 80. Internal confidence scores are never shown in output.

## False Positive Exclusion Rules

Do NOT report:

- **Pre-existing issues** — Problems in unchanged code (unless CRITICAL security)
- **Nitpicks** — Do not use the `nitpick` label. Linter-catchable items (formatting, import order, unused variables) should not be reported.
- **Pedantic style preferences** — Style preferences not codified in project conventions
- **Unmodified lines** — Code outside the diff scope
- **Already-silenced warnings** — Intentional lint suppressions with explanatory comments
- **Intentional design decisions** — Patterns consistent with the rest of the codebase
- **Hypothetical issues** — "This could be a problem if..." without evidence it will be
- **Ambiguous intent as defects** — When you're unsure whether code is intentional or a mistake, use `question` to ask for clarification rather than reporting it as an `issue`. Approach unclear code with curiosity, not accusation.

## Review Dimensions

**Important:** The dimensions below guide your _internal analysis_. They are NOT output headers. After analyzing all dimensions, group findings into numbered sections by file or area (e.g., `1. src/db/users.ts — User lookup query`). Do not use dimension names (Security, Bug Detection, etc.) as section headings. See `references/review-output-templates.md` for the full review structure.

### 1. Project Guidelines Compliance

Before reviewing code, read `CLAUDE.md` and any project-specific configuration to understand:

- Import patterns and module organization
- Naming conventions (camelCase, snake_case, etc.)
- Error handling patterns (custom error classes, Result types, etc.)
- File size limits and structure expectations
- Framework-specific conventions

Use the `suggestion` or `issue` label depending on severity when flagging deviations from established project patterns.

### 2. Bug Detection

Look for concrete, demonstrable bugs:

- **Logic errors** — Wrong comparisons, inverted conditions, off-by-one errors
- **Null/undefined handling** — Missing null checks on nullable values, optional chaining gaps
- **Race conditions** — Shared mutable state without synchronization, TOCTOU bugs
- **Resource leaks** — Unclosed connections, missing cleanup in finally/dispose blocks
- **Type mismatches** — Runtime type errors that TypeScript or the type system doesn't catch
- **Boundary errors** — Array index out of bounds, integer overflow, empty collection access
- **State management** — Stale closures, mutation of shared state, inconsistent state transitions

### 3. Security

These MUST be flagged — they can cause real damage:

- **Hardcoded credentials** — API keys, passwords, tokens, connection strings in source
- **SQL injection** — String concatenation in queries instead of parameterized queries
- **XSS vulnerabilities** — Unescaped user input rendered in HTML/JSX
- **Path traversal** — User-controlled file paths without sanitization
- **CSRF vulnerabilities** — State-changing endpoints without CSRF protection
- **Authentication bypasses** — Missing auth checks on protected routes
- **Insecure dependencies** — Known vulnerable packages
- **Exposed secrets in logs** — Logging sensitive data (tokens, passwords, PII)

```typescript
// BAD: SQL injection via string concatenation
const badQuery = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD: Parameterized query
const safeQuery = `SELECT * FROM users WHERE id = $1`;
const result = await db.query(safeQuery, [userId]);
```

```tsx
// BAD: Rendering raw user HTML without sanitization
dangerouslySetInnerHTML={{ __html: userInput }}

// GOOD: Use text content or sanitize
<div>{userComment}</div>
```

### 4. Silent Failure Detection

Silent failures are among the most dangerous bugs — they corrupt data or degrade service without alerting anyone:

- **Empty catch blocks** — `catch (e) {}` is forbidden. At minimum, log the error.
- **Missing error logging** — Errors caught but not logged, reported, or re-thrown
- **Broad exception catching** — `catch (e: any)` that swallows specific errors
- **Unclear user feedback** — Operations that fail without informing the user
- **Mock/fake implementations outside tests** — Stub functions that silently return dummy data in production code
- **Swallowed promise rejections** — `.catch(() => {})` or missing `.catch()` on fire-and-forget promises
- **Default fallbacks hiding errors** — `value ?? defaultValue` when `value` being null indicates a bug

### 5. Test Coverage Analysis

Evaluate behavioral coverage, not line coverage:

- **Critical path coverage** — Are the happy paths tested end-to-end?
- **Edge case coverage** — Empty inputs, boundary values, null/undefined, large datasets
- **Error handling paths** — Are error branches tested? Do tests verify error messages/types?
- **Integration points** — Are external service interactions tested (with appropriate mocking)?
- **Regression potential** — Could this change break existing functionality without a test catching it?

Rate test coverage gaps on a 1-10 scale:

- 1-3: Adequate coverage for the change
- 4-6: Notable gaps that should be addressed
- 7-10: Critical paths untested, high regression risk

### 6. Type Design Quality

Evaluate how well types express and enforce domain invariants:

- **Encapsulation** — Are implementation details hidden behind interfaces?
- **Invariant expression** — Do types make invalid states unrepresentable?
- **Anti-patterns to flag**:
  - Anemic models (data classes with no behavior, logic scattered elsewhere)
  - Exposed mutable internals (returning arrays/objects that callers can mutate)
  - `any` abuse (using `any` to bypass type checking instead of proper types)
  - Stringly-typed APIs (using `string` where a union type or enum would be safer)
  - God objects (types with 10+ fields that should be decomposed)

### 7. Code Simplification

Flag unnecessary complexity that hinders readability:

- **Deep nesting** (>3 levels) — Use early returns, extract functions
- **Redundant code** — Duplicate logic that could be consolidated
- **Poor naming** — Single-letter variables, misleading names, abbreviations
- **Unnecessary abstraction** — Wrappers/helpers used only once
- **Over-engineering** — Generic solutions for specific problems

```typescript
// BAD: Deep nesting + mutation
function processUsers(users) {
  const results = [];
  if (users) {
    for (const user of users) {
      if (user.active) {
        if (user.email) {
          user.verified = true;
          results.push(user);
        }
      }
    }
  }
  return results;
}

// GOOD: Early returns + immutability + flat
function processUsers(users) {
  if (!users) return [];
  return users.filter((user) => user.active && user.email).map((user) => ({ ...user, verified: true }));
}
```

## Framework-Specific Checks

### React/Next.js Patterns

- **Missing dependency arrays** — `useEffect`/`useMemo`/`useCallback` with incomplete deps
- **State updates in render** — Calling setState during render causes infinite loops
- **Missing keys in lists** — Using array index as key when items can reorder
- **Prop drilling** — Props passed through 3+ levels (use context or composition)
- **Client/server boundary** — Using `useState`/`useEffect` in Server Components
- **Missing loading/error states** — Data fetching without fallback UI
- **Stale closures** — Event handlers capturing stale state values

```tsx
// BAD: Missing dependency, stale closure
useEffect(() => {
  fetchData(userId);
}, []); // userId missing from deps

// GOOD: Complete dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### Node.js/Backend Patterns

- **Unvalidated input** — Request body/params used without schema validation
- **N+1 queries** — Fetching related data in a loop instead of a join/batch
- **Missing rate limiting** — Public endpoints without throttling
- **Unbounded queries** — `SELECT *` or queries without LIMIT on user-facing endpoints
- **Missing timeouts** — External HTTP calls without timeout configuration
- **Error message leakage** — Sending internal error details to clients

```typescript
// BAD: N+1 query pattern
const users = await db.query('SELECT * FROM users');
for (const user of users) {
  user.posts = await db.query('SELECT * FROM posts WHERE user_id = $1', [user.id]);
}

// GOOD: Single query with JOIN or batch
const usersWithPosts = await db.query(`
  SELECT u.*, json_agg(p.*) as posts
  FROM users u
  LEFT JOIN posts p ON p.user_id = u.id
  GROUP BY u.id
`);
```

## Context Gathering by Mode

### PR Review Mode

```bash
gh pr diff <number>
gh pr view <number> --json files,title,body
gh api repos/{owner}/{repo}/pulls/{number}/comments --paginate
gh api repos/{owner}/{repo}/issues/{number}/comments --paginate
```

- First `gh api` call: inline review comments (file/line-specific)
- Second `gh api` call: top-level PR conversation comments
- `--paginate` ensures all comments are fetched

### Cross-Referencing Existing Comments (PR Mode Only)

After fetching existing PR comments, cross-reference them with your findings before producing output.

1. **Parsing** — Extract from each inline comment: `path`, `line`/`original_line`, `start_line`/`original_start_line` (may be null for single-line comments), `body`, `html_url`. When `start_line` is present, treat the comment as covering the range `[start_line..line]`; otherwise treat it as a single-line range. From issue comments: `body`, `html_url` only.

2. **Matching criteria** — A finding matches an existing comment when:

   **Inline comments** — ALL of:
   - Same file path (exact match)
   - Overlapping line range (within ±5 lines)
   - Similar problem description (semantic match, not string match)

   **Top-level PR comments** — match by:
   - Similar problem description only (no file/line data available)

3. **Disposition** — When a match is found:
   - `already covered` — existing comment addresses the same or wider scope
   - `widen scope` — new finding covers additional lines, files, or aspects beyond existing comment

4. **Key rule** — Already-reported findings are NOT suppressed. They are moved to Tier 2 in the output.

### Local Branch Review Mode

```bash
git diff main...HEAD
git log --oneline main...HEAD
```

### Post-Modification Review Mode (Auto-Detect)

```bash
git diff --staged    # Check staged changes first
git diff             # Fall back to unstaged changes
```

### Auto-Detection Priority

1. PR number argument provided → PR mode
2. On a non-main branch with commits ahead → Local branch mode
3. Staged changes exist → Review staged changes
4. Unstaged changes exist → Review unstaged changes

## Thorough Mode

Multi-pass review for maximum coverage. Run 3 parallel passes:

**Pass 1: Security + Bug Detection**

- Apply Security and Bug Detection dimensions
- Focus on correctness and safety

**Pass 2: Types + Code Simplification**

- Apply Type Design Quality and Code Simplification dimensions
- Focus on maintainability and clarity

**Pass 3: Tests + Silent Failures**

- Apply Test Coverage Analysis and Silent Failure Detection dimensions
- Focus on reliability and observability

After all passes complete:

1. Merge findings from all passes
2. Deduplicate (same file:line, same issue)
3. Apply tiered confidence thresholds per label type (80+ for actionable, lower for soft labels)
4. List findings flat (no dimension headers), ordered by label severity (blocking-first)
5. If any pass fails or returns no output, report: "Pass N (dimensions) did not complete — results may be incomplete." Do not silently omit failed passes.

**Note:** In thorough mode, per-pass section headers (e.g., "Pass 1: Security + Bugs") are permitted in the intermediate output before the merged flat findings. This is the only exception to the "no dimension headers" output rule.

## Output Specification

Format all output using `references/review-output-templates.md`. That file is the single source of truth for finding format, summary table, and verdict templates.

### Output Rules

These rules are mandatory. Violating them produces non-compliant output.

1. **No dimension headers in output** — Do not write "Security", "Bug Detection", etc. as section headers. Group findings into numbered sections by file or area instead.
2. **No narrative between findings** — Do not explain your analysis process. Each finding stands alone in CC format.
3. **Every finding must use a CC template from `references/review-output-templates.md`** — `<label> (<decorations>): <subject>` followed by `File:` (local path) or `File:` (GitHub permalink), then `Fix:`, `Why:` fields for all labels except `question` (which may omit `Fix:` per `references/review-conventional-comments.md`) and Tier 2 already-reported findings (which may omit `Fix:`/`Why:` when the disposition is `already covered`). Decorations are mandatory; default to `(non-blocking)` when no other decoration applies. You may optionally include `// Current` / `// Suggested` code blocks exactly as shown in the template. Do not introduce any additional fields, sections, or headings beyond what the templates define. The `Why:` field may include a brief reference to relevant documentation or standards when it adds clarity (e.g., "See React docs on exhaustive deps"), but do not fabricate URLs or cite sources you aren't certain exist.
4. **Fix before Why** — Always put the solution first, explanation second.
5. **One praise block** — A single `praise:` paragraph after all findings, before the summary table. Do not scatter praise across the output.
6. **No analysis walkthrough** — Do not show your per-dimension analysis. Only show the resulting findings.
7. **Two-tier output in PR mode** — In PR review mode, findings that match existing PR comments are placed in Tier 2 (Already Reported) after all Tier 1 (Unreported) findings. Each Tier 2 finding uses the Already-Reported Finding template from `references/review-output-templates.md`.

Never approve code with security vulnerabilities or critical bugs, regardless of other factors.

## AI-Generated Code Addendum

When reviewing AI-generated changes, additionally prioritize:

1. **Behavioral regressions** — Does the AI change subtly alter existing behavior?
2. **Security assumptions** — Does the AI code trust inputs that should be validated?
3. **Hidden coupling** — Does the change introduce accidental architecture drift?
4. **Unnecessary complexity** — AI tends to over-engineer; flag gratuitous abstractions.

Cost-awareness check:

- Flag workflows that escalate to higher-cost models without clear reasoning need.
- Recommend defaulting to lower-cost tiers for deterministic refactors.

## Comment Quality Checks

When reviewing comments in code:

- **Factual accuracy** — Do comments match what the code actually does?
- **"Why" over "what"** — Comments should explain intent, not restate code
- **No misleading comments** — Outdated comments are worse than no comments
- **Unresolved TODOs** — TODOs without issue references should be flagged
