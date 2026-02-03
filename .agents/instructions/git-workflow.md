---
description: Git workflow guidelines including branch naming, commit messages, and pull requests
alwaysApply: true
---

# Git Workflow Guidelines

This document covers branch naming, commit messages, and pull request conventions.

## Branch Naming

Use lowercase with hyphens. Format: `type/DS-XXXX-short-description`

| Type       | Use Case                   |
| ---------- | -------------------------- |
| `build`    | Build system changes       |
| `chore`    | Maintenance tasks          |
| `ci`       | CI configuration changes   |
| `deps`     | Dependencies changes       |
| `docs`     | Documentation changes      |
| `feat`     | New features               |
| `fix`      | Bug fixes                  |
| `perf`     | Performance improvements   |
| `refactor` | Code refactoring           |
| `revert`   | Reverts a previous commit  |
| `style`    | Code formatting            |
| `test`     | Adding or correcting tests |

### Examples

```bash
feat/DS-123-add-new-button-variant
fix/DS-456-button-accessibility-issue
docs/DS-789-update-component-documentation
refactor/DS-101-simplify-modal-logic
```

## Commit Messages

Follow the [Conventional Commits][conventional-commits] specification with lowercase format.

### Before Committing

**IMPORTANT:** Before creating any commit, you MUST ask the user for the Jira issue ID (e.g., `DS-1234`) if one was not already provided in the conversation. Do not skip this step.

### Format

```text
type(scope): description #DS-XXXX
```

### Rules

- **Max 100 characters** for the header (type + scope + description)
- **All lowercase**: type, scope, and description must start with lowercase
- **No period** at the end of the subject line
- **Imperative mood**: "introduce feature" not "introduced feature"
- **Component names in backticks**: wrap component names with backticks (e.g., `Button`, `Modal`)
- **No AI attribution**: do not add `Co-authored-by` trailers or similar AI attribution (e.g., `Co-authored-by: Cursor`, `Co-authored-by: Claude Code`)

### Types

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `docs`     | Documentation only                                      |
| `style`    | Code style (formatting, semicolons)                     |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or correcting tests                              |
| `chore`    | Maintenance tasks, dependencies                         |
| `perf`     | Performance improvement                                 |
| `ci`       | CI configuration changes                                |
| `build`    | Build system changes                                    |
| `revert`   | Reverts a previous commit                               |

### Valid Scopes

See the full list of valid commit scopes in [`@.commitlintrc.mjs`][commitlintrc]. This file is the source of truth for which scopes are accepted.

### Jira Issue ID

Append the Jira issue ID at the end with `#DS-XXXX` format. The ID is optional but recommended for traceability.

### Breaking Changes

Use `!` after scope for breaking changes:

```text
feat(web)!: introduce auto gap in Button and ControlButton #DS-2344
```

### Fixup Commits

Use fixup commits for additional changes that should be squashed into previous commits:

```bash
git commit --fixup <commit-hash>
```

Before merging, squash fixup commits using interactive rebase:

```bash
git rebase -i --autosquash main
```

### Commit Examples

```bash
# ✅ Correct (lowercase)
feat(web-react): introduce `spacing` prop for `Button` #DS-2344
fix(web-react): clean up ESLint directives
chore(deps): upgrade Next.js to 15.5.11
refactor(web-react): use named imports for React constructs #DS-2364
docs(repo): introduce documentation about E2E tests #DS-2320

# ❌ Incorrect (uppercase - old format, do not use)
Feat(web-react): Introduce spacing prop
Chore(repo): Use catalog instead of package versions
```

## Pull Requests

When creating pull requests:

- Use the PR template from `.github/PULL_REQUEST_TEMPLATE.md`
- Component names in PR title and body must be in backticks (e.g., `Hidden`, `VisuallyHidden`)
- Include issue references as full Jira links (e.g., https://jira.almacareer.tech/browse/DS-2311)
- Do not include AI attribution (e.g., "Generated with Claude Code", "Co-authored-by: Cursor")

### PR Title Format

Follow the same format as commit messages:

```text
type(scope): description
```

### PR Description

Fill out all sections in the PR template:

1. **Description**: Explain what this PR is solving
2. **Additional context**: Note anything reviewers should focus on
3. **Issue reference**: Link to the Jira issue (full URL format)

[commitlintrc]: ../../.commitlintrc.mjs
[conventional-commits]: https://www.conventionalcommits.org/
