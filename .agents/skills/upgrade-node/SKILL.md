---
name: spirit:upgrade-node
description: >-
  Upgrade Spirit Design System Node.js minimum version, .nvmrc, engines, CI matrix,
  migration docs, and @types/node catalog. Use when the user asks to upgrade Node.js,
  drop an old Node LTS, or bump the required Node version in the monorepo.
category: spirit
displayName: Spirit Node.js Upgrade
---

# Spirit Node.js Upgrade

Use this skill when bumping the **required Node.js version** in the Spirit monorepo: `.nvmrc`,
`engines.node`, CI matrix, migration docs, and `@types/node` catalog.

Do **not** hardcode ticket IDs, commit SHAs, or specific Node versions in this workflow. Discover
current state with the scan script and historical patterns with git.

Do **not** modify [`docs/decisions/002-node-version.md`](docs/decisions/002-node-version.md).
It documents the general Node.js policy and may be read for context; version-specific details belong
in migration guides.

## Principles

- **Scan first.** Always run `scan-node-refs.mjs` before asking questions or editing files.
- **Confirm before editing.** Show a change summary and get user approval.
- **Git precedents, not memory.** Inspect recent Node upgrade commits in this repo.

---

## Workflow

### Step 1: Baseline Scan

From the repository root:

```bash
node .agents/skills/upgrade-node/scripts/scan-node-refs.mjs --pretty
```

Use the output for defaults in Step 2 and as the file checklist in Step 5.

If the script fails, fall back to grep for `engines.node`, `.nvmrc`, and `node-version:` in
`.github/workflows/`.

### Step 2: Gather Inputs

Research the [Node.js release schedule](https://nodejs.org/en/about/releases/) (web search or
Context7 MCP) to propose the next LTS major after `summary.minEngineMajor` from the scan.

Use `AskQuestion` (or conversation context) to confirm anything not already known:

| Input                 | Source / default                                                          |
| --------------------- | ------------------------------------------------------------------------- |
| New minimum major     | next LTS from release schedule after scan `summary.minEngineMajor`        |
| `.nvmrc` patch        | `npm view node@<major> version`                                           |
| Dropped major         | previous `summary.minEngineMajor` from scan                               |
| CI matrix             | user decision; typically drop EOL, keep LTS, add next                     |
| Migration guide scope | yes if a major release is in progress; paths from `latestMigrationGuides` |
| Bump `@types/node`    | yes — align catalog major with runtime                                    |

Present current values from the scan before asking.

### Step 3: Git Precedents

Find fresh precedents — do not rely on frozen examples:

```bash
git log --oneline --grep="Node" -i -20
git log --oneline --grep="upgrade.*node\|drop.*node\|engines" -i -15
```

For the most relevant commits:

```bash
git show <commit> --stat
git show <commit> -p -- .nvmrc package.json .github/workflows/build.yaml docs/migrations/ .yarnrc.yml tools/README.md
```

Typical changes to expect:

- `engines.node` in all published packages
- `.nvmrc`
- CI matrix in `.github/workflows/build.yaml`
- migration guide section „Dropped Support for Node.js X“ in the **latest** web and web-react guides
- `@types/node` in `.yarnrc.yml` + `yarn.lock`
- `tools/README.md` minimum version

### Step 4: Present Change Summary

Show a table of planned edits: file → old value → new value.

Use `AskQuestion`:

1. **Apply changes** — proceed with the upgrade
2. **Edit first** — user adjusts inputs
3. **Cancel** — do not modify files

### Step 5: Apply Changes

After approval, update in this order:

1. [`.nvmrc`](.nvmrc) → chosen patch version
2. **`engines.node`** → `>=<newMin>` in **every** file listed by the scan script
3. [`.github/workflows/build.yaml`](.github/workflows/build.yaml) → `node-version: [<matrix>]`
4. **Migration guides** (if major release):
   - Edit only the files in `latestMigrationGuides` from the scan (`web` and `web-react`)
   - Do **not** edit older migration guides
   - Add „General Changes → Dropped Support for Node.js X“ using the latest Node drop section in
     `docs/migrations/` as a template (find via git, not hardcoded version)
5. [`tools/README.md`](tools/README.md) → `Node.js ≥ <newMin>`
6. [`.yarnrc.yml`](.yarnrc.yml) → bump `@types/node` to latest `<newMajor>.x` patch, then
   `yarn install`

**Out of scope / do not change:**

- [`docs/decisions/002-node-version.md`](docs/decisions/002-node-version.md)
- Unrelated work on the branch
- Devcontainer or docker images unless they exist and the user asks to include them

### Step 6: Post-Upgrade Validation

```bash
node .agents/skills/upgrade-node/scripts/scan-node-refs.mjs --expect-min <newMin>
node --version
yarn install
yarn build
yarn test:unit
```

If `--expect-min` fails, fix remaining files and re-run the scan until it passes.

If `@types/node` bump causes type errors, fix only real breaking changes.

---

## Scan Script Reference

Script: [`.agents/skills/upgrade-node/scripts/scan-node-refs.mjs`](scripts/scan-node-refs.mjs)

| Flag                   | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `--pretty`             | Markdown table for the user                         |
| `--expect-min <major>` | Fail if any reference is below the expected minimum |
| `--root <path>`        | Repository root (default: cwd)                      |

The script scans: `.nvmrc`, all `engines.node` in `package.json`, CI matrix, `@types/node` catalog,
`tools/README.md`, docker/devcontainer images, migration guide Node drop sections, and the latest
`migration-v*.md` paths for `web` and `web-react`.

---

## Migration Guide Template

Add to the **latest** web and web-react migration guides reported by `latestMigrationGuides`:

```markdown
## General Changes

### Dropped Support for Node.js <old>

The Node.js v<old> is no longer supported. The minimum required Node.js version is <new>.
```

For web-react, link to the web migration guide for the same requirement.

---

## Risks

| Risk                                                   | Mitigation                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| New matrix version unavailable in `actions/setup-node` | First CI run reveals it; adjust matrix or document follow-up |
| `@types/node` type errors                              | Fix incrementally; do not block runtime upgrade              |
| Inconsistent engines across packages                   | Scan script reports inconsistencies in `summary.issues`      |
