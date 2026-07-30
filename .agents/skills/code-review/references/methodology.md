# Code Review Methodology

The shared methodology for every Spirit code review. The orchestrator (`spirit:code-review`) and
each perspective reviewer (`accessibility-reviewer`, `frontend-reviewer`) read this reference first, then layer their own knowledge skills on top.

This reference defines **how to review and how to report**. It does **not** define what to look for in a
specific technology — that lives in the technology and lens knowledge skills
(`spirit:design-system`, `spirit:react`, `spirit:typescript`, `spirit:scss`,
`spirit:html`, `spirit:accessibility`).

## Core Philosophy

Quality over quantity. Only surface issues that matter. A review flooded with noise trains
developers to ignore feedback. Every reported finding must be actionable, specific, and worth the
reader's time.

Frame findings constructively. Assume the author made a reasonable choice until proven otherwise.
Use "consider" for suggestions, ask before asserting when intent is ambiguous, and lead with the fix
rather than the fault. The goal is to make the code better, not to catalog what is wrong.

Approach unclear code with curiosity, not accusation. When you cannot tell whether something is
intentional, ask a question rather than reporting a defect.

## Reviewer Conduct

- **Be honest.** Do not rubber-stamp — "LGTM" without evidence is not a review. Do not soften a real
  problem to be polite; state it plainly and lead with the fix.
- **Comment on the code, not the person.** Quantify impact where you can.
- **Do not accept deferred fixes.** "I'll clean it up later" is not acceptable for a real problem —
  require the fix before merge, or a tracked follow-up issue, not a vague promise.
- **Ask before asserting deletion.** When you flag dead or leftover code, propose removal as a
  question or a clearly-reversible suggestion — never recommend silently deleting code you did not
  author or are unsure about.

## False-Positive Exclusion Rules

Do NOT report:

- **Pre-existing issues** — Problems in unchanged code (unless a critical security or data-loss risk).
- **Linter-detectable items** — Formatting, import order, unused variables. The repo enforces these
  with Prettier, ESLint (`eslint-config-spirit`), Stylelint (`stylelint-config-spirit`), Remark, and
  Commitlint. Review targets only what those tools **cannot** catch. Never use a `nitpick` label.
- **Pedantic style preferences** — Style not codified in project conventions.
- **Unmodified lines** — Code outside the diff scope.
- **Already-silenced warnings** — Intentional lint suppressions with an explanatory comment.
- **Intentional design decisions** — Patterns consistent with the rest of the codebase.
- **Hypothetical issues** — "This could be a problem if…" without evidence it will be.
- **Ambiguous intent as defects** — When unsure whether code is intentional, ask for clarification
  instead of flagging it as a problem.

## Confidence Thresholds

Confidence is used internally to decide whether to report a finding. It is **never shown in output**.

- **Actionable findings** (a concrete problem, a required follow-up, or a proposed change): report
  only at high confidence (you can point to the exact line and explain the concrete failure mode).
- **Soft findings** (questions, observations, notes): allowed at lower confidence.

When in doubt, downgrade an actionable finding to a question rather than dropping it.

Scoring factors: **evidence strength** (can you point to the line and the failure mode?),
**impact severity** (what breaks if this ships?), **certainty** (sure it is wrong, or could it be
intentional?).

## Tests and Verification

- **Review tests before implementation.** Do tests exist for the changed behavior? Do they test
  behavior rather than implementation, cover edge cases, and would they catch a regression? Missing
  or weak tests for changed behavior is a finding.
- **Check the change was verified.** The PR should show evidence — tests run and green, build
  passing, and screenshots or a before/after for visual changes. A behavioral change shipped with no
  verification story is worth a finding.

## Severity

Each finding carries a severity that drives ordering and the verdict:

| Severity          | Meaning                                                                                  | Blocks merge? |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------- |
| **blocking**      | Must be fixed before merge — correctness, data loss, accessibility regressions, security | Yes           |
| **important**     | Should be addressed before merge or tracked — real problem, not merge-blocking           | No            |
| **minor**         | Improvement, only worth doing if cheap                                                   | No            |
| **question**      | Seeking clarification                                                                    | No            |
| **note / praise** | Informational / recognition                                                              | No            |

> Never approve code with a blocking finding, regardless of other factors.

## Finding Format

Every finding has the same fields regardless of sink. Lead with the fix, explain second.

```text
severity: <subject>

  File: <path:line>  (or GitHub permalink in PR mode)

  Fix:  <concrete change — first>
  Why:  <what is wrong and why it matters — second>
```

- Include a concrete code change whenever the fix can be expressed as a line-level edit.
- `question` findings may omit `Fix:`.
- Do **not** restate what a linter would catch.

### CLI Rendering

Plain markdown, no labels. Optional before/after blocks:

```text
blocking: Stale closure captures the initial `userId`

  File: packages/web-react/src/components/Picker/usePicker.ts:42

  Fix: Add `userId` to the effect dependency array.
  Why: The effect only runs once, so later `userId` changes are ignored.

  // Current
  useEffect(() => { fetchData(userId); }, []);

  // Suggested
  useEffect(() => { fetchData(userId); }, [userId]);
```

### GitHub PR Rendering

Use the fine-tuned format from [`.github/copilot-instructions.md`](../../../.github/copilot-instructions.md):
the **GitHub suggestion fence comes first** (when a line-level fix exists), then the finding, then a
collapsed `<details>` explanation. That file is the source of truth for PR-comment formatting — do
not diverge from it.

### Conventional Comments Overlay

Conventional Comments are **off by default** — plain natural-language findings as above. The team has
not adopted CC as a whole, and the model communicates findings clearly without label markings.

When the review is run with `--conventional-comments`, load `spirit:conventional-comments` and
prepend its `label (decorations):` line to each finding. Nothing else about the format changes.

## Deduplication

When merging findings from multiple reviewers, deduplicate by **`(file:line + concern)`**: two
findings collide only when they target the same location **and** the same underlying concern. A
logic finding and an accessibility finding on the same line are **not** duplicates — keep both.

Reviewers overlap on files but not on concern, so conflicts are rare. When two reviewers genuinely
disagree, surface both rather than silently picking one.

## Cross-Referencing Existing PR Comments

Before producing output in PR mode, fetch existing inline and top-level PR comments and compare them
to your findings. A finding **matches** an existing comment when the file path is the same, the line
ranges overlap (within ±5 lines), and the problem description is semantically similar.

Matched findings are **not suppressed** — they move to a second tier ("Already reported") so the
author sees the review was thorough without re-litigating resolved threads. Note whether the existing
comment already covers the finding or your finding widens its scope.

## Verdicts

| Verdict             | Condition                                      |
| ------------------- | ---------------------------------------------- |
| **REQUEST CHANGES** | Any blocking finding present                   |
| **COMMENT**         | Has important/minor findings but none blocking |
| **APPROVE**         | No blocking and no important findings          |

## Dependency Discipline

A new runtime dependency ships to every Spirit consumer and is a liability. Before a change adds one,
it should clear this gate — flag it when it does not:

- Can the existing stack (platform APIs, an existing utility, or a current dependency) already do it?
- What is the bundle-size impact, and is the dependency tree-shakeable? (see `spirit:performance-optimization`)
- Is it actively maintained?
- Does it have known vulnerabilities?
- Is its license compatible?

Prefer the platform and existing utilities over a new dependency.

## Reviewing AI-Generated Code

AI-generated changes need **more** scrutiny, not less — they are confident and plausible even when
wrong. Additionally check for behavioral regressions (subtle changes to existing behavior), inputs
trusted without validation, gratuitous abstractions or over-engineering, and accidental architecture
drift. Reject these rationalizations:

- "It works, so it is good enough" — unreadable or wrongly-structured code is compounding debt.
- "Passing tests means it is fine" — tests are necessary but miss architecture, accessibility, and
  API-surface concerns.
- "We will clean it up later" — later rarely comes; the review is the quality gate.
- "The author is sure it is correct" — everyone has blind spots; that is why it is reviewed.

## Output Discipline

- **No analysis walkthrough.** Show findings, not your reasoning process.
- **No dimension headers.** Group findings by file or area, never by review dimension
  (no "Security", "Bugs" headings).
- **One praise block**, after all findings, before the summary.
- **Lead with the fix.** Always `Fix:` before `Why:`.
