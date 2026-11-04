# 12. Commits and PR Scope

Commit and PR conventions (types, `!`, no AI attribution, PR title and description) are defined in
`.agents/instructions/git-workflow.md`; do not restate them. Commitlint already checks format, scope
list, and issue references. Check what it cannot:

- **Type matches intent** (important) — `feat` vs `refactor` vs `fix` vs `docs`; `!` for breaking
  a stable API.
- **Descriptive subject** (minor) — The subject reads well in the changelog and does not repeat the
  type ("fix: fix …").
- **No AI attribution** (important) — No `Co-authored-by` trailers or "Generated with" lines.
- **Commit order** (minor) — Web before React for a shared feature; no commit references work that
  lands later.
- **PR scope** (important) — Unrelated changes go to a separate PR; out-of-scope findings become a
  Jira issue linked from the PR. An API change without stated motivation gets a question.
- **Does what it says** (important) — The change does what the Jira acceptance criteria and the PR
  title promise, checked by behavior, not by the presence of code. See the Jira step in `SKILL.md`
  for missing, partial, and diverging criteria.
