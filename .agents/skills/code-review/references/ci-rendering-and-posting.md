# CI Rendering and Posting

Load this file only when the review context is **CI** or `--post` is set. A local CLI run does not need it;
it uses the CLI rendering in `review-output-templates.md`.

It defines how findings are rendered as GitHub review comments and how the review is posted.

## CI Rendering

For findings posted as inline review comments, omit the `File:` line because the code line anchors them.
For CI reports printed or written without `--post`, retain a `File: path:line` location for every finding.
Otherwise use the structure below, based on the Finding Format in `.github/copilot-instructions.md`, so
both reviewers look alike:

- The ` ```suggestion ` fence comes first when a line-level fix exists. Nothing comes before it.
- Then the bold subject line: `**{label} ({decorations}):** {subject}`, exactly as in
  `.github/copilot-instructions.md`. Pick the label and the decorations from the tables in
  `.agents/skills/conventional-comments/SKILL.md`; that file is the only place that maps severities to labels.
  Decorations are always present: use `non-blocking` when no other decoration applies.
- Then a collapsed `<details>` block with `Fix:` and `Why:`. Markdown does not render inside
  `<details>`, so use HTML: inline code as `<code>…</code>`, code blocks as `<pre><code>…</code></pre>`.

With a suggestion:

````markdown
```suggestion
{suggested code}
```

**{label} ({decorations}):** {subject}

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
**{label} ({decorations}):** {subject}

<details>
  <summary>Explanation</summary>
  <strong>Fix:</strong> {fix explanation}
  <br />
  <br />
  <strong>Why:</strong> {why explanation}
</details>
```

The CI subject line always uses the Conventional Comments label line, so the `--conventional-comments`
flag only affects CLI rendering.

### Findings Without an Inline Anchor

Findings that cannot attach to a changed line (commit findings, missing acceptance criteria, files
outside the diff) go into the review body. They keep the location because nothing else anchors them:

```markdown
**{label} ({decorations}):** {subject}

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

**Already reported:** {tier 2 findings, and the resolved-threads line}

🎉 {praise}

**Warnings:** {warnings}
```

## Posting (`--post`, PR Mode Only)

Post exactly one review. Never approve or request changes automatically; the verdict is stated in
the review body and a human decides.

1. Render each finding in the CI format above: suggestion fence first, then the subject line, then the
   collapsed `<details>` block with `Fix:` and `Why:`.
2. Findings on lines inside the PR diff become inline comments (`side: "RIGHT"`, `line`, and
   `start_line` for ranges) without a `File:` line, because the comment is anchored to the code. All
   other findings (they keep their location), Tier 2 items, praise, the summary table, and the
   verdict go into the review body.
3. Write the payload to a temporary file and submit it:

```bash
gh api repos/{owner}/{repo}/pulls/<pr>/reviews --method POST --input <payload.json>
```

```json
{
  "commit_id": "<headRefOid>",
  "event": "COMMENT",
  "body": "<summary, out-of-diff findings, verdict>",
  "comments": [{ "path": "<file>", "line": 42, "side": "RIGHT", "body": "<finding>" }]
}
```

If posting fails (permissions, a line no longer in the diff), retry once with all findings moved
into the body; if that fails too, print the report and the error.
