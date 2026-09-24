---
name: spirit:handoff-for-acceptation
description: Hand a finished DS Jira issue over for acceptation — assemble a handoff comment (product manager mention, branch README, component preview links, PR), post it as exact wiki markup, then transition the issue to Done past its quality-gate validator.
---

# Hand Off for Acceptation

Post a short handoff comment on an implemented DS issue and move it to `Done`. The comment is the
mention, the README rendered on the branch, one preview link per implementation the PR touched, and
the PR itself — entry points, not an essay. The PR body already carries the reasoning.

## Principles

- **The mention is always the product manager.** Acceptation is their call. The reporter is often the
  designer or engineer who filed the ticket — a different role.
- **Never invent a URL.** Verify each one, or ask for it. An unreachable preview and a 404 are the
  same situation: unproven.
- **Never assert a quality gate you cannot evidence.** PR approvals evidence code review; nothing here
  evidences manual, UX, or accessibility testing.

---

## Workflow

### Step 1: Resolve the Issue, Branch, and PR

The session's git snapshot goes stale — re-read the branch, then find its PR:

```bash
git branch --show-current
gh pr list --head "$(git branch --show-current)" --state all \
  --json number,title,url,files,reviewDecision,state
```

Take the `DS-XXXX` key from the branch name, the commit subjects, or the PR title. No PR means
nothing to hand off — stop and say so. Read the issue with
`jira_get_issue(issue_key="DS-XXXX", fields="summary,status,labels,components")`.

### Step 2: Resolve the Product Manager

Never carry a name in this skill — a stale username mentions the wrong person silently. Resolve in
order: whoever the user named in the conversation → the DS project lead, the closest API-resolvable
proxy → ask with `AskUserQuestion`, offering the lead as the first option.

```bash
curl -s -H "Authorization: Bearer $JIRA_PERSONAL_TOKEN" \
  "https://jira.almacareer.tech/rest/api/2/project/DS" \
  | python3 -c "import sys,json; l=json.load(sys.stdin)['lead']; print(l['displayName'], l['name'])"
```

The mention token is `[~<name>]` from `jira_get_user_profile`'s `name` field — **not** the address you
searched with; the two often differ by mail domain. This is Jira Server/DC, so `[~accountid:...]`
does not work.

### Step 3: Collect the Links

| Link               | Shape                                                                                                 | When                             |
| ------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------- |
| README             | `github.com/alma-oss/spirit-design-system/blob/<branch>/packages/<pkg>/…/<Name>/README.md`            | per package the PR touched       |
| Demo (vanilla CSS) | `deploy-preview-<PR>--spirit-design-system.netlify.app/packages/web/src/scss/components/<name>/`      | PR touches `packages/web/`       |
| Demo (React)       | `deploy-preview-<PR>--spirit-design-system.netlify.app/packages/web-react/src/components/<name>/`     | PR touches `packages/web-react/` |
| Storybook          | `deploy-preview-<PR>--spirit-design-system-storybook.netlify.app/?path=/docs/components-<name>--docs` | only if the PR changed a story   |

Component casing is **PascalCase** on GitHub and **lowercase** in preview URLs. Demo paths mirror
source paths because the demo app's Vite root is the repo root (`apps/demo/config/vite/app.ts`);
Storybook paths come from the story's `title` (`Components/<Name>`).

**Storybook is always optional and gated on stories, never on scope** — a link to a page nobody
changed is noise, including on a PR covering both implementations:

```bash
gh pr view <PR> --json files --jq '.files[].path' | grep -E '\.stories\.(ts|tsx)$|\.mdx$' | grep -v '\.figma\.stories\.'
```

`*.figma.stories.tsx` does not count — code-connect mappings are hidden from the production sidebar
(`apps/storybook/main.ts`). **Never link `spirit-design-system-docsite`**: it is a work-in-progress
next-generation docs site, so ignore its Netlify bot comment entirely.

Verify every link before it goes in: the README with
`gh api "repos/alma-oss/spirit-design-system/contents/<path>?ref=<branch>" --jq '.html_url'`, and each
preview by fetching it _and_ by checking the Netlify bot's "Latest commit" matches the branch head —
a stale preview shows the component as it was. If a preview cannot be verified, ask per link whether
to use the derived URL, take one you paste, or drop that bullet.

### Step 4: Draft, Confirm, Post

Show the comment rendered and as the exact wiki markup, and wait for approval — this instance has no
comment-edit or comment-delete tool, so a bad comment can only be superseded. Then POST it over REST,
which stores the body byte-for-byte; `jira_add_comment` runs a Markdown-to-wiki converter that
corrupts `[text|url]` links and bold at line start. Write the body to a file so no shell quoting
touches it:

```bash
python3 -c "import json; json.dump({'body': open('/tmp/handoff.txt').read().rstrip('\n')}, open('/tmp/handoff.json','w'))"
curl -s -w '\nHTTP %{http_code}\n' -X POST \
  -H "Authorization: Bearer $JIRA_PERSONAL_TOKEN" -H "Content-Type: application/json" \
  --data-binary @/tmp/handoff.json "https://jira.almacareer.tech/rest/api/2/issue/DS-XXXX/comment"
```

Expect `HTTP 201`, then read the response's `body` and confirm it matches what was approved.

### Step 5: Transition to Done

"Ready for acceptation" is the transition named `Done`, targeting status `Done` — there is no status
called "To Accept". Resolve its ID by target status every time, fill the quality gates the validator
demands, and verify the result. Both are in
[`references/quality-gates.md`](references/quality-gates.md) — read it before transitioning.

### Step 6: Report

Give the new status, the comment ID, whom you mentioned and how you resolved them, which gate statuses
you set, which fields you left empty, and any link that went in unverified. Flag what the accepting
party is about to walk into: unanswered reviewer questions, failing checks, an unmerged base PR.

---

## Comment Template

```text
[~<pm-username>] {{<Component>}} (<vanilla CSS|React|vanilla CSS and React>) is ready for acceptation.

* Documentation: [<Component> README on the branch|<README html_url>]
* Demo: [<Component> on the deploy preview|<preview url>]
* Pull request: [#<PR>|<PR url>]
```

With both implementations in scope, label the bullets so each says what it opens — `Documentation`,
`Documentation (React)`, `Demo (vanilla CSS)`, `Demo (React)`, `Storybook`, `Pull request` — rather
than several bullets all reading "Demo". Markup rules and this instance's corruption bugs:
[`../create-jira-issue/references/wiki-markup-cheatsheet.md`](../create-jira-issue/references/wiki-markup-cheatsheet.md).

---

## Good vs Bad Examples

|                                | Description                                                                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| ❌ **README in the PR**        | A `pull/<PR>/files#diff-…` link — a diff view, not the rendered documentation that gets reviewed.                                  |
| ❌ **Unverified preview link** | Pasting a derived URL after every fetch returned `000`, without saying it is unverified. No network proves nothing about the path. |
| ❌ **Storybook by scope**      | A Storybook link because the issue involves React, on a PR that touched no story.                                                  |
| ❌ **Comment via MCP**         | `jira_add_comment` — the converter rewrites wiki markup, and the comment cannot be edited afterwards.                              |
| ❌ **Asserting a gate**        | Setting `Manual tests status = Passed` because the transition refused to go through otherwise. Ask instead.                        |
