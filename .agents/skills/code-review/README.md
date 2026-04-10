# Code Review Skill

Unified code review methodology covering security, quality, and maintainability.

## Directory Structure

```text
skills/code-review/
  SKILL.md                              # Core methodology and knowledge base
  README.md                             # This file
  references/
    review-checklist.md                 # Flat checkbox checklist by dimension
    review-conventional-comments.md     # Conventional Comments label definitions and rules
    review-output-templates.md          # Output format templates
```

## Usage Modes

| Mode             | Trigger              | Diff Source                      |
| ---------------- | -------------------- | -------------------------------- |
| **PR Review**    | `/review #123`       | `gh pr diff 123`                 |
| **Local Branch** | `/review --local`    | `git diff main...HEAD`           |
| **Auto-detect**  | `/review`            | Staged > unstaged > branch diff  |
| **Thorough**     | `/review --thorough` | Same as above, 3 parallel passes |

## Conventional Comments Labels

| Label      | Intent                                     | Blocking                           |
| ---------- | ------------------------------------------ | ---------------------------------- |
| issue      | A problem that must or should be addressed | Yes (with `(blocking)` decoration) |
| suggestion | Improvement or better approach             | No                                 |
| todo       | Required follow-up task                    | No                                 |
| question   | Seeking clarification                      | No                                 |
| thought    | Observation for consideration              | No                                 |
| note       | Informational highlight                    | No                                 |
| chore      | Maintenance or cleanup                     | No                                 |
| praise     | Positive feedback                          | No                                 |

See `references/review-conventional-comments.md` for full definitions, decorations, and scoring rules.

## Review Dimensions

1. **Project Guidelines Compliance** — Conventions from CLAUDE.md
2. **Bug Detection** — Logic errors, null handling, race conditions
3. **Security** — Injection, XSS, auth, secrets, CSRF
4. **Silent Failure Detection** — Empty catches, swallowed errors
5. **Test Coverage Analysis** — Behavioral coverage gaps
6. **Type Design Quality** — Invariants, encapsulation, anti-patterns
7. **Code Simplification** — Nesting, naming, redundancy

## Verdicts

- **APPROVE** — No `issue` or `todo` findings
- **COMMENT** — Has `issue` or `todo` findings but none `(blocking)`
- **REQUEST CHANGES** — Any `(blocking)` finding present

## Full Reference

See [SKILL.md](./SKILL.md) for the complete methodology, code examples, framework-specific checks, and output specifications.
