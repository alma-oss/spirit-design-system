# Review Output Templates

How findings and the report are written. `methodology.md` defines what a finding contains; this file
defines how it is rendered in each [review context][review-contexts].

## Review Contexts

| Context | When                                                                  | Findings are…                                   |
| ------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| **CLI** | A developer runs the review locally (default)                         | printed as Markdown, grouped by file            |
| **CI**  | The review runs unattended (`CI` or `GITHUB_ACTIONS` set) or `--post` | attached to the code line in a GitHub PR review |

`--cli` and `--ci` override the detection. The two contexts differ only in rendering; the findings,
severities, and verdict are the same.

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

Plain Markdown grouped by file or area. The `File:` line is required because nothing else anchors the finding.

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

## CI Rendering

For findings posted as inline review comments, omit the `File:` line because the code line anchors them.
For CI reports printed or written without `--post`, retain a `File: path:line` location for every finding.
Otherwise use the structure below, based on the Finding Format in `.github/copilot-instructions.md`, so
both reviewers look alike:

- The ` ```suggestion ` fence comes first when a line-level fix exists. Nothing comes before it.
- Then the bold subject line: `**<icon> <severity>:** <subject>`.
- Then a collapsed `<details>` block with `Fix:` and `Why:`. Markdown does not render inside
  `<details>`, so use HTML: inline code as `<code>…</code>`, code blocks as `<pre><code>…</code></pre>`.

With a suggestion:

````markdown
```suggestion
{suggested code}
```

**🟠 important:** {subject}

<details>
  <summary>Explanation</summary>
  <strong>Fix:</strong> {fix explanation}
  <br />
  <br />
  <strong>Why:</strong> {why explanation}
</details>
````

Without a suggestion:

```markdown
**🟠 important:** {subject}

<details>
  <summary>Explanation</summary>
  <strong>Fix:</strong> {fix explanation}
  <br />
  <br />
  <strong>Why:</strong> {why explanation}
</details>
```

When `--conventional-comments` is set, the subject line is the Conventional Comments label line instead.

### Findings Without an Inline Anchor

Findings that cannot attach to a changed line (commit findings, missing acceptance criteria, files
outside the diff) go into the review body. They keep the location because nothing else anchors them:

```markdown
**🟡 minor:** {subject}

<details>
  <summary>Explanation</summary>
  <strong>File:</strong> <code>commit 1a2b3c4</code>
  <br />
  <br />
  <strong>Fix:</strong> {fix explanation}
  <br />
  <br />
  <strong>Why:</strong> {why explanation}
</details>
```

### Review Body

The review body carries the verdict, the summary table, out-of-diff findings, Tier 2 items, praise,
and warnings. The Review Brief is omitted.

```markdown
## Spirit Code Review 🤖

**Verdict:** 🟡 COMMENT. {one-line reason}

| Severity     | Count |
| ------------ | ----- |
| 🔴 blocking  | 0     |
| 🟠 important | 2     |
| 🟡 minor     | 3     |
| ❓ question  | 1     |
| 📝 note      | 0     |

{findings without an inline anchor}

**Already reported:** {tier 2 findings}

🎉 {praise}

**Warnings:** {warnings}
```

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

## Verdict Templates

| Verdict                | Condition                                  | Template                                                        |
| ---------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| ❌ **REQUEST CHANGES** | Any blocking finding                       | `❌ REQUEST CHANGES — N blocking: <one line per blocker>`       |
| 🟡 **COMMENT**         | Important or minor findings, none blocking | `🟡 COMMENT — N findings, none blocking. Address before merge.` |
| ✅ **APPROVE**         | No blocking and no important findings      | `✅ APPROVE — No blocking or important findings.`               |

The verdict is a recommendation. When posting, always submit the review with the `COMMENT` event; a
human decides whether to approve.

[review-contexts]: #review-contexts
