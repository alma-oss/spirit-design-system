# Verification Recipes

Concrete commands for each step, with fallbacks for environments without a given MCP server. Learned from real acceptance sessions — each pitfall below actually happened.

## Jira

Site: `almacareer.atlassian.net` (Atlassian Cloud), reached through the Atlassian MCP. No API token is needed. Operations that are not primary tools run through `executeRead` / `executeWrite` with `cloudId: almacareer.atlassian.net`.

| Operation        | Atlassian MCP operation       | Tool           | Notes                                                              |
| ---------------- | ----------------------------- | -------------- | ------------------------------------------------------------------ |
| Get issue        | `getJiraIssue`                | primary        | `view: "evidence"` adds custom fields                              |
| Get comments     | `listJiraIssueComments`       | primary        | Pages with `startAt`; `getJiraIssue` embeds at most 20             |
| Add comment      | `addOrEditJiraIssueComment`   | primary        | `contentFormat: "html"`; pass `commentId` to edit in place         |
| List transitions | `listJiraIssueTransitions`    | `executeRead`  | Returns the target status of each transition                       |
| Apply transition | `transitionJiraIssue`         | primary        | Use the id resolved from the list                                  |
| Attach file      | `uploadAttachmentToJiraIssue` | `executeWrite` | Two phases: run the returned `uploadCommand`, then attach `fileId` |

Pitfalls:

- An authentication error on every call means the Atlassian MCP needs to be signed in again.
- The comment returned by the write call is not the stored body — re-fetch.
- Transition IDs differ between workflows and issue states; always pick by name (`Accept`, `Deny`).

## GitHub

| Need                 | GitHub MCP                                       | `gh` CLI                                                                |
| -------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| Find PR for a ticket | search pull requests `<KEY> repo:<owner>/<repo>` | `gh pr list --repo <owner>/<repo> --state all --search "<KEY>"`         |
| PR state, head SHA   | pull request read `get`                          | `gh pr view <N> --repo <owner>/<repo> --json state,headRefOid,mergedAt` |
| Changed files        | pull request read `get_files`                    | `gh pr view <N> --repo <owner>/<repo> --json files`                     |
| Netlify bot comments | pull request read `get_comments`                 | `gh pr view <N> --repo <owner>/<repo> --comments`                       |
| Commits for a ticket | list commits / search                            | `git log origin/main --oneline --grep "#<KEY>"`                         |

Label the PR after acceptance (the `jira-accepted` label already exists; do not create it):

```bash
gh label list --repo <owner>/<repo> --search jira-accepted
gh pr edit <N> --repo <owner>/<repo> --add-label jira-accepted
gh pr view <N> --repo <owner>/<repo> --json labels --jq '[.labels[].name]'
```

The GitHub MCP has no label-write tool, so use `gh` for this step.

Pitfalls:

- `gh` can return `HTTP 401: Bad credentials` while the MCP works — switch to the MCP.
- The GitHub MCP can return 404 for `almacareer/*` repositories while `gh` works — switch to `gh`.
- A PR search can return several PRs mentioning the key (earlier drafts, related tickets). Match on the `Issue reference` in the PR body.
- The PR named in a ticket comment may be closed unmerged, with the work landed by a different PR.

## Netlify Deploy Previews

- Demo: `https://deploy-preview-<PR>--spirit-design-system.netlify.app`
- Storybook: `https://deploy-preview-<PR>--spirit-design-system-storybook.netlify.app`
- Docsite: `https://deploy-preview-<PR>--spirit-design-system-docsite.netlify.app`
- Production demo: `https://spirit-design-system.netlify.app`

Each Netlify bot comment on the PR has a "Latest commit" row — compare it with the PR head SHA to detect a stale preview.

A site is not built for a PR that doesn't touch its paths (see `[context.deploy-preview] ignore` in `apps/demo/netlify.toml`, `apps/storybook/netlify.toml`, `apps/docsite/netlify.toml`).

Demo page paths — the component directory is **lowercased** and the trailing slash is required (`Box/` returns a 301 to `box/`):

- `/packages/web/src/scss/components/<name>/`
- `/packages/web-react/src/components/<name>/`
- Unstable components use the lowercase `unstable_` prefix, e.g. `/packages/web-react/src/components/unstable_tile/`.

Storybook story IDs:

```bash
curl -s "https://deploy-preview-3011--spirit-design-system-storybook.netlify.app/index.json" \
  | grep -oE '"id":"components-box[^"]*"'
```

Link a story as `<storybook>/?path=/docs/<id>` (docs page) or `?path=/story/<id>` (single story); render it without the Storybook UI at `<storybook>/iframe.html?viewMode=story&id=<id>`.

## Browser

Use any browser automation your environment has. Without one, use [`../scripts/verify.mjs`](../scripts/verify.mjs):

```bash
# Computed styles of every element whose own text matches, at two widths
node .agents/skills/accept-jira-issue/scripts/verify.mjs \
  --url "<page-url>" --text "With radius per corner" \
  --props border-start-start-radius,border-start-end-radius,border-end-end-radius,border-end-start-radius \
  --widths 375,1400

# Elements by CSS selector, plus a screenshot per width
node .agents/skills/accept-jira-issue/scripts/verify.mjs \
  --url "<page-url>" --selector ".shadow-100" --props box-shadow \
  --screenshot /tmp/DS-2774-acceptance/shadow.png
```

Pitfalls:

- Playwright's bundled browser is often not downloaded in this repository — the script launches the locally installed Google Chrome (`channel: 'chrome'`) and falls back to the bundled one.
- Storybook never reaches `networkidle` — navigate with `load` and wait for the element instead.
- Prefer text output (computed values, accessibility tree) over screenshots; take screenshots only for the 1–2 most visual criteria.

### Link Checks (Product Tickets)

To check that links on a staging page resolve, run this in the page context (browser console or the browser tool's evaluate):

```js
const links = [...document.querySelectorAll('footer a[href]')].map((a) => a.href);
const results = await Promise.all(
  links.map(async (href) => {
    try {
      const response = await fetch(href, { redirect: 'manual' });
      return { href, status: response.status, type: response.type };
    } catch (error) {
      return { href, error: String(error) };
    }
  }),
);
console.table(results);
```

Cross-origin links return an opaque response — open them and check the page title instead.

## Shell Portability

- macOS `sed` needs an explicit empty backup suffix: `sed -i '' 's/a/b/' file`.
- zsh fails on unmatched globs — quote them: `grep -r --include='*.ts' …`.
