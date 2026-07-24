# Wrapper Monorepo

## When It Applies

Monorepos where most application code imports Spirit through a **wrapper design-system package** that re-exports
`@alma-oss/spirit-web-react`, instead of importing Spirit directly.

Typical signals:

- A workspace package like `@org/design-system` that re-exports Spirit components
- Plugin/app code uses `from '@org/design-system'` while the wrapper lib may import `@alma-oss/spirit-web-react` directly
- Multiple source roots (`libs/*`, `apps/*/src`, `plugins/*/src`)

## Detection

```bash
# Wrapper package name(s)
rg '"@.+/design-system"' package.json -g "package.json"

# Consumer imports via wrapper vs direct Spirit
rg "from ['\"]@alma-oss/spirit-web-react" <path> -g "*.{tsx,ts}" | wc -l
rg "from ['\"]<wrapper-package>" <path> -g "*.{tsx,ts}" | wc -l
```

Record profile as `wrapper`, `direct`, or `mixed` in the migration report.

## Codemods

Pass `-s` with the wrapper package name on **every** codemod run against paths that import through the wrapper.
`@alma-oss/spirit-web-react` is matched by default, so `-s` adds wrapper sources — you do not need to repeat the
Spirit package when both are in play.

```bash
IMPORT_SOURCE_ARGS=(-s "@org/design-system")
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/<transform>
```

When the wrapper lib imports Spirit directly but plugins use the wrapper, run codemods **per path**:

1. Wrapper lib paths — omit `-s` (or only direct Spirit imports)
2. Plugin/app paths — include `-s "@org/design-system"` (quote scoped package names in zsh/bash)

If `-s` appears ineffective, stop after the one-file smoke test and diagnose the packaged CLI/version. Do not
bypass the supported CLI with a direct, unpinned jscodeshift invocation.

### Pre-Flight Smoke Test

Before batch runs on hundreds of files, transform **one known hit** and inspect the diff. If the CLI reports
`0 ok` with no errors, check codemods build output (`dist/helpers` must exist) before continuing.

## Safe Automated Edits

No file edits in this recipe — it defines **order and scope** for other recipes.

## Agent Edits — Suggested Order

1. Upgrade Spirit deps in the wrapper lib and monorepo root; install.
2. Fix compile errors in the wrapper lib ([general-upgrade-prerequisites](general-upgrade-prerequisites.md)).
3. Run all v5 codemods on the wrapper lib source.
4. Run all v5 codemods on plugin/app paths with `-s` set to the wrapper package.
5. Apply manual recipes (FileUploader, Header recomposition, Navigation slots) starting with the heaviest plugins.
6. Update wrapper **public exports** when UNSTABLE aliases were removed upstream.
7. Validate per workspace ([SKILL.md](../SKILL.md) Step 6 + profile validation commands).

When the monorepo uses Docker for development, run install and codemods inside the same environment the team uses
for local dev (e.g. `make install` after resolution changes).

## Report Guidance

- Status: `completed` when wrapper lib and all scanned consumer paths are migrated and validation passes.
- Status: `partial` when wrapper lib is done but plugin manual migrations remain.
- Confidence: `high` for codemod batches with verified smoke test; `medium` for mixed import layouts.
