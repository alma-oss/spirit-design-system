# Accept Jira Issue

Decide with evidence whether a Jira issue can be accepted: verify each acceptance criterion on the live deployment, report the result, and — after your approval — comment on the ticket and Accept or Deny it.

## Usage

```text
/spirit:accept-jira-issue DS-2831
/spirit:accept-jira-issue DS-2831 DS-2774
/spirit:accept-jira-issue https://jira.almacareer.tech/browse/DS-2860
```

Or ask in plain language: "check if DS-2831 meets its acceptance criteria and whether I can accept it".

Use when you need to:

- Accept a ticket that is Done, before its PR is merged
- Check a Spirit change on its Netlify deploy preview (demo, Storybook, docsite)
- Check a product ticket on a staging environment such as beta.jobs.cz

## What It Does

1. Reads the ticket, splits the acceptance criteria into numbered items, and writes the expected observation for each one before looking at the implementation
2. Finds the implementing PR (Jira key search, branch name, `#DS-XXXX` commits) and checks its state
3. Finds the deployment — the Netlify deploy previews from the PR, or the staging URL from the ticket — and checks the preview was built from the PR head
4. Verifies every criterion in a real browser (computed styles, DOM, HTTP status) at the relevant breakpoints and in both web and web-react
5. Re-verifies borderline results in a fresh context to counter confirmation bias
6. Reports a decision — ✅ ACCEPT, 🟡 CLARIFY (information gap or open question), or ❌ DECLINE — in a short top block (decision plus at most three sentences of reasoning), followed by a Details section with an evidence table, deployment links, and a "Not verified" list
7. After your approval, posts the comment, attaches key screenshots, and applies the Accept or Deny transition; on Accept it also adds the `jira-accepted` label to the PR

## Output

A report like this, followed by the draft Jira comment for approval:

```text
✅ ACCEPT
DS-2774 · Box shadow
All 4 criteria are met on a preview built from the PR head.
The shadow renders identically in web and web-react.

────────────────────────────────────────────────────────────

Details
Counts, flags, criteria table, deployment links, "Not verified", next steps…
```

See [`references/jira-comment-template.md`](references/jira-comment-template.md) for the comment format.

## Setup

The skill works in any agent that reads `.agents/skills`. It needs:

| Capability  | Preferred              | Fallback                                                             |
| ----------- | ---------------------- | -------------------------------------------------------------------- |
| Jira        | Jira MCP server        | REST with `JIRA_PERSONAL_TOKEN`                                      |
| GitHub      | GitHub MCP server      | `gh` CLI, authenticated                                              |
| Browser     | Any browser automation | `scripts/verify.mjs` (Playwright from the repository + local Chrome) |
| Attachments | —                      | `scripts/jira-attach.sh` with `JIRA_PERSONAL_TOKEN`                  |

- Jira is on-prem and requires the company VPN.
- `JIRA_PERSONAL_TOKEN` is a Jira personal access token (Jira → Profile → Personal Access Tokens). Store it however you prefer — export it in your shell profile, keep it in a git-ignored `.env.local`, or inject it from a secret manager (for example `op run`, `doppler run`, or your OS keychain).
- Run `yarn install` so `@playwright/test` is available. The script uses your installed Google Chrome and falls back to the Playwright browser (`yarn playwright install chromium`).

## Key Principles

- **Observed evidence only.** Code and PR descriptions are not evidence; computed values on the deployment are.
- **Never round up.** Missing evidence means Not verifiable, never Met.
- **Acceptance happens before merge.** An open PR is expected; a stale preview is not.
- **No write without approval.** The comment and the Accept / Deny transition always wait for you.

## See Also

- **SKILL.md** — Full workflow, verdict rules, example report
- **references/verification-recipes.md** — Jira/GitHub/Netlify/browser commands and the fallbacks for each
- **references/jira-comment-template.md** — Accept, clarify, and decline comment templates that survive Jira's markup conversion
- Related skill: `/spirit:create-jira-issue` — Writing tickets with measurable acceptance criteria
