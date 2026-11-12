# Review Output Templates

How findings and the report are written. `methodology.md` defines what a finding contains; this file
defines how it is rendered in each [review context][review-contexts].

## Review Contexts

| Context | When                                                                  | Findings are…                                   |
| ------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| **CLI** | A developer runs the review locally (default)                         | printed as Markdown, grouped by file            |
| **CI**  | The review runs unattended (`CI` or `GITHUB_ACTIONS` set) or `--post` | attached to the code line in a GitHub PR review |

`--cli` and `--ci` override the detection. The two contexts differ only in rendering; the findings,
severities, and verdict are the same. The CI rendering and posting are in
[`ci-rendering-and-posting.md`][ci-rendering]; load it only in the CI context or with `--post`.

## Writing Style

The team writes short, friendly English. Mirror it:

- **Hedge and ask.** "I think", "What about …?", "Why not `CloseButton`?". Prefer a `question` when unsure.
- **Lead with the fix.** Concrete fixes belong in a suggestion fence, often with little text around them.
- **One comment for repeated issues.** Report once and list the other places, ending with "Applies to the whole PR".
- **Explain blocking.** Every `blocking` finding states the reason in `Why:`.
- **Emoji carry tone, and some carry meaning.** 🔤 means "sort alphabetically" and ⚠️ marks an important point.
  Use them sparingly.

## Severity Icons

Icons make the severity visible at first sight. Use them in the report and the summary table.

| Severity  | Icon |
| --------- | ---- |
| blocking  | 🔴   |
| important | 🟠   |
| minor     | 🟡   |
| question  | ❓   |
| note      | 📝   |
| praise    | 🎉   |

## CLI Rendering

The report is Markdown, grouped by file or area. The same text is printed to the terminal and written to
the `--output` file. The `text` fences in this file only show the layout: print the report without the
outer fence. Separate the fields with blank lines and do not indent them, so the report renders the same
in a terminal and in a Markdown viewer. The `File:` line is required because nothing else anchors the finding.

```text
🟠 important: The remove action re-implements `CloseButton`

File: packages/web-react/src/components/Tag/Tag.tsx:42-55

Fix: Render `<CloseButton onClick={onRemove} />` instead of `ControlButton` + `Icon` + `VisuallyHidden`.

Why: `CloseButton` already handles the accessible label and sizing; the copy will drift from it.
```

- `File:` takes `path:line` or `path:start-end`. Use `commit <short sha>` for commit findings and
  `DS-1234` for a missing acceptance criterion.
- Include a concrete before/after whenever the fix is a line-level edit.
- `question` findings may omit `Fix:`.
- Keep `Why:` to one or two sentences. Link a Spirit doc, ADR, or WAI-ARIA pattern when it adds weight;
  never invent URLs.

### CLI Report

```text
## Spirit Code Review 🤖 — <mode>

<Review Brief>

### <file or area>
<findings…>

### Commits and PR Scope        (only when non-empty)
<findings with `File: commit <short sha>`…>

### Already Reported            (PR mode, only when non-empty)
<tier 2 findings…>
<resolved-threads line>

🎉 praise: <single paragraph, optional>

| Severity     | Count |
| ------------ | ----- |
| 🔴 blocking  | 0     |
| 🟠 important | 2     |
| 🟡 minor     | 3     |
| ❓ question  | 1     |
| 📝 note      | 0     |

**Verdict:** 🟡 COMMENT

**Warnings:**
- Jira unavailable; acceptance criteria not checked.
```

Always print every severity row, including zero counts. When there are no findings, say so in one
line, give the verdict, and still print warnings.

## Already-Reported Findings

A finding that matches an existing review comment moves to Tier 2:

```text
🟠 important: <subject>

File: <path:line>

Existing: <link to the existing comment>

Disposition: already covered | accepted | widens scope — <why>

Fix: <only when the disposition is "widens scope">

Why: <only when the disposition is "widens scope">
```

`Existing:` and `Disposition:` are mandatory. For `already covered` and `accepted`, `Fix:` and `Why:`
are omitted to reduce noise.

**Resolved threads.** A resolved thread whose fix is missing from the code is a new finding (see
`methodology.md`), not a Tier 2 item. When the fixes of the resolved threads are present, add one line at
the end of the group instead of one entry per thread:

```text
Resolved threads: 4 checked, all fixes present.
```

When some fixes are missing, say so: `Resolved threads: 4 checked, 1 fix missing (see the finding above).`

## Verdict Templates

The conditions for each verdict are defined only in [`methodology.md`][verdicts]. This table shows how
each verdict is written.

| Verdict                | Template                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| ❌ **REQUEST CHANGES** | `❌ REQUEST CHANGES — N blocking: <one line per blocker>`                 |
| 🟡 **COMMENT**         | `🟡 COMMENT — N important findings, none blocking. Address before merge.` |
| ✅ **APPROVE**         | `✅ APPROVE — No blocking or important findings.`                         |

[ci-rendering]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/ci-rendering-and-posting.md
[review-contexts]: #review-contexts
[verdicts]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/methodology.md#verdicts
