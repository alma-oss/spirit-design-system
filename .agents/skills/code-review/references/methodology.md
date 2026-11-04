# Code Review Methodology

How a Spirit review is performed and reported. `SKILL.md` defines the process, `checklist.md` defines
what to look for. This file defines **how to judge and how to write findings**, and it is the base
format that `spirit:conventional-comments` overlays.

## Core Philosophy

Quality over quantity. Only surface issues that matter. A review flooded with noise trains developers
to ignore feedback. Every reported finding must be actionable, specific, and worth the reader's time.

Frame findings constructively. Assume the author made a reasonable choice until proven otherwise.
Ask before asserting when intent is ambiguous, and lead with the fix rather than the fault.

## Reviewer Conduct

- **Be honest.** Do not rubber-stamp. Do not soften a real problem to be polite; state it plainly.
- **Comment on the code, not the person.**
- **Do not accept vague deferrals.** A real problem is fixed in the PR or tracked in a linked Jira
  issue. "Rather do it right than fast" applies to public API in particular.
- **Ask before asserting deletion.** Propose removing dead code as a question when you are not sure
  nothing depends on it.

## False-Positive Exclusion Rules

Do NOT report:

- **Linter- and CI-detectable items.** See the "Already enforced" section of
  [`review-history-analysis.md`](review-history-analysis.md). Formatting, import order, class-name
  pattern, commit-message format, `xlink:href`, broken links, and type errors are caught before a
  human ever looks. Never use a `nitpick` label.
- **Pre-existing issues** in unchanged code, unless they are a critical security or data-loss risk,
  or they stop the change from doing what it promises (a fix whose effect is cancelled by existing
  code). Report those at the severity of the broken promise, start the subject with
  "Pre-existing:", and point the location at the changed code that depends on it.
- **Code outside the diff**, except leftovers that the diff itself creates (a renamed prop still used
  elsewhere is in scope) and pre-existing issues covered by the rule above.
- **Pedantic style preferences** not codified in the checklist or project conventions.
- **Already-silenced warnings** with an explanatory comment.
- **Intentional design decisions** consistent with the rest of the codebase.
- **Hypothetical issues** without evidence they will happen.

## Confidence

Confidence decides whether a finding is reported. It is **never shown in output**.

- **Actionable findings** (blocking, important, minor): report only when you can point to the exact
  line and explain the concrete consequence.
- **Questions and notes**: allowed at lower confidence.

When in doubt, downgrade an actionable finding to a `question` rather than dropping it. The team asks
"Why not `CloseButton`?" far more often than it asserts.

## Severity

| Severity      | Meaning                                                                                          | Blocks merge? |
| ------------- | ------------------------------------------------------------------------------------------------ | ------------- |
| **blocking**  | Must be fixed before merge: correctness, accessibility regressions, security, an undocumented BC | Yes           |
| **important** | Should be fixed before merge or tracked in Jira: a real problem that does not break consumers    | No            |
| **minor**     | Worth doing if cheap: consistency, ordering, wording, default values in demos                    | No            |
| **question**  | Seeking the rationale before judging                                                             | No            |
| **note**      | Context the author may not have                                                                  | No            |
| **praise**    | Recognition of a pattern worth repeating                                                         | No            |

`checklist.md` gives a default severity for every item. Raise or lower it when the concrete impact
differs, and say why.

> Never approve a change with a blocking finding.

## Finding Format

Every finding has the same fields. Lead with the fix, explain second.

```text
<severity>: <subject>

  File: <path:line>  (or <path:start-end>; `commit <short sha>` for commit findings; `DS-1234` for a missing acceptance criterion)

  Fix: <concrete change — first>
  Why: <what is wrong and why it matters — second>
```

- Include a concrete before/after or a suggestion fence whenever the fix is a line-level edit.
- `question` findings may omit `Fix:`.
- Keep the `Why:` to one or two sentences. Link a Spirit doc, ADR, or WAI-ARIA pattern when it adds
  weight; never invent URLs.

### Repeated Occurrences

When the same problem occurs in several places, report it **once** at the first occurrence and list
the other locations, ending with "Applies to the whole PR" when it is pervasive. This mirrors how the
team reviews and keeps the review short.

### CLI Rendering (Default)

Plain Markdown, grouped by file or area:

```text
### packages/web-react/src/components/Tag/Tag.tsx

important: The remove action re-implements `CloseButton`

  File: packages/web-react/src/components/Tag/Tag.tsx:42-55

  Fix: Render `<CloseButton onClick={onRemove} />` instead of `ControlButton` + `Icon` + `VisuallyHidden`.
  Why: `CloseButton` already handles the accessible label and sizing; the copy will drift from it.
```

### GitHub PR Rendering (`--post`)

Follow the comment structure in `.github/copilot-instructions.md` (Finding Format section): the
` ```suggestion ` fence comes first when a line-level fix exists, then the bold subject line, then a
collapsed `<details>` block with `Fix:` and `Why:` written in HTML (Markdown does not render inside
`<details>`). The subject line is `**<severity>:** <subject>` by default, or the Conventional
Comments label line when `--conventional-comments` is set.

### Conventional Comments Overlay

Off by default: the analysis shows only part of the team uses Conventional Comments labels. With
`--conventional-comments`, load `.agents/skills/conventional-comments/SKILL.md` and prepend its
`label (decorations):` line to each finding. Nothing else changes.

## Output Structure

1. **Tier 1 — New findings**, grouped by file or area, ordered blocking → important → minor →
   question → note inside each group. Findings about commits, PR scope, and acceptance criteria
   with no implementation go in a final "Commits and PR Scope" group.
2. **Tier 2 — Already reported** (PR mode only): findings that match an existing review comment.
3. **Praise**: a single block, only when something is genuinely worth repeating.
4. **Summary table**: count per severity.
5. **Verdict** and **Warnings** (skipped inputs, unavailable services, checklist areas not applied).

Do not narrate the analysis. Do not use review dimensions ("Security", "Bugs") as headings.

## Cross-Referencing Existing PR Comments

In PR mode, compare findings with existing inline and top-level comments. A finding **matches** when
the file path is the same, the line ranges overlap within ±5 lines, and the concern is semantically
the same. Matched findings are not dropped: they move to Tier 2 with a disposition of
`already covered` or `widens scope`.

## Deduplication

Deduplicate by **file, line, and concern**. An accessibility finding and a parity finding on the same
line are two findings. When two checklist areas genuinely disagree, report both.

## Verdicts

| Verdict             | Condition                                  |
| ------------------- | ------------------------------------------ |
| **REQUEST CHANGES** | Any blocking finding                       |
| **COMMENT**         | Important or minor findings, none blocking |
| **APPROVE**         | No blocking and no important findings      |

The verdict is a recommendation printed in the report. When posting, always submit the review with
the `COMMENT` event; a human decides whether to approve.

## Reviewing AI-Generated Code

AI-generated changes need **more** scrutiny: they look plausible even when wrong. Check additionally
for subtle behavior regressions, gratuitous abstractions, re-implemented Spirit utilities, docs that
describe internals instead of the API, and tool-specific assumptions in agent files.
