# Node.js Upgrade Skill

Interactive workflow for bumping the required Node.js version across the Spirit monorepo.

## Usage

```text
/spirit:upgrade-node
```

Use when you need to:

- Raise the minimum Node.js version (`engines.node`)
- Update `.nvmrc` to a new LTS patch
- Adjust the CI test matrix in `.github/workflows/build.yaml`
- Document the drop of an old Node version in migration guides
- Align `@types/node` in the Yarn catalog with the new runtime

## What It Does

1. Runs [`scripts/scan-node-refs.mjs`](scripts/scan-node-refs.mjs) to capture the current state
2. Researches the Node.js release schedule and confirms the new minimum version, `.nvmrc` patch, and CI matrix
3. Inspects git history for prior Node upgrade commits
4. Shows a change summary and waits for approval
5. Applies all file updates
6. Re-runs the scan with `--expect-min` and executes `yarn install`, `yarn build`, `yarn test:unit`

## Scan Script

Run manually from the repository root:

```bash
# Human-readable snapshot
node .agents/skills/upgrade-node/scripts/scan-node-refs.mjs --pretty

# JSON for tooling
node .agents/skills/upgrade-node/scripts/scan-node-refs.mjs

# Validate after upgrade
node .agents/skills/upgrade-node/scripts/scan-node-refs.mjs --expect-min <newMin>
```

The script reports:

- `.nvmrc`
- every `engines.node` in `package.json`
- CI `node-version` matrix
- `@types/node` catalog version
- `tools/README.md` minimum
- docker/devcontainer `node:*` images (if present)
- migration guides and whether they contain a Node drop section
- latest `migration-v*.md` paths for `web` and `web-react`

## Out of Scope

- [`docs/decisions/002-node-version.md`](docs/decisions/002-node-version.md) is never modified
- No automatic commit or push
- No hardcoded ticket IDs or commit SHAs in the skill

## Example Session

```text
/spirit:upgrade-node

→ Scan: .nvmrc 22.23.0, engines >=22 (8 files), CI [22, 24, 26]
→ Research: Node.js release schedule → propose minimum 24
→ "CI matrix?" → [24, 26, 28]
→ "Add migration guide for v6?" → yes (latest: migration-v6.md)
→ [change table] → Apply
→ scan --expect-min 24 → yarn install → yarn build → yarn test:unit
```

## Prerequisites

- Node.js matching the current repo minimum (Yarn `plugin-engines` enforces it)
- `yarn` available in PATH
- Network for `npm view node@<major> version` when resolving the latest LTS patch
