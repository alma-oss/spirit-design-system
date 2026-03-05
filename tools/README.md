# Local Publish Testing

## Overview

This directory contains tooling to verify that the [Yarn patch of Lerna][lerna-patch] correctly
resolves Yarn `catalog:` references to real semver versions before creating npm tarballs.

When packages are published to npm, any `catalog:NAME` references in `dependencies`,
`peerDependencies`, or `optionalDependencies` **must** be resolved to real semver strings
(e.g., `^2.3.1`). Consumers on npm, pnpm, or bun do not understand the `catalog:` protocol
and will get install errors if these references are left unresolved.

The test publishes all packages to an isolated local [Verdaccio][verdaccio] registry and inspects every
resulting `.tgz` tarball, reporting whether any unresolved `catalog:` references remain.

## How It Works

`test-local-publish.sh` performs the following steps:

1. **Kills any stale Verdaccio** on port 4873 from a previous run, then starts a fresh instance
   using `verdaccio-test.yaml` — an isolated registry with no proxy to npmjs.org
2. **Clears the storage** at `/tmp/verdaccio-spirit-storage` so every run starts clean
3. **Runs `lerna publish from-package`** against `http://localhost:4873` with `LERNA_NO_PROVENANCE=1`
4. **Inspects every published `.tgz`** — extracts `package/package.json` from each tarball and
   checks `dependencies`, `peerDependencies`, and `optionalDependencies` for any remaining
   `catalog:` strings
5. **Reports ✅ / ❌** per dependency and **PASS / FAIL** per package; exits non-zero on any failure
6. **Cleans up** on exit — stops Verdaccio and restores any `package.json` files modified during
   the publish run

## Prerequisites

- **Node.js ≥ 20**
- **`jq`** (used for JSON inspection of tarballs)
- **`tar`** (used to extract `package.json` from tarballs)
- **`curl`** (used for health-checking Verdaccio startup)
- **`git`** (used to restore `package.json` files after publish)
- **`yarn`** (used to invoke `lerna publish` and run Verdaccio)
- **`verdaccio`** — installed automatically as a devDependency (`yarn install`)

## Usage

Run from the repository root:

```bash
# Full lifecycle — prepack/postpack scripts run (builds exports, strips dev conditions)
./tools/test-local-publish.sh

# Skip prepack/postpack — isolates catalog resolution from the build pipeline
./tools/test-local-publish.sh --no-scripts
```

Use `--no-scripts` to focus exclusively on whether catalog refs are resolved correctly,
without involving the package build steps.

## Expected Output

```sh
Starting Verdaccio...
Waiting for Verdaccio to be ready...
Verdaccio is ready (attempt 4 / 60).

Publishing all affected packages to local registry...
Registry: http://localhost:4873

lerna notice cli v9.0.3
...
lerna success published 6 packages

════════════════════════════════════════════════════════════
Inspecting published tarballs for unresolved catalog: refs
════════════════════════════════════════════════════════════

=== alma-oss-spirit-analytics-1.0.0.tgz ===
  sade: ^1.8.1 ✅
  zx: ^8.3.0 ✅

=== alma-oss-spirit-codemods-1.0.0.tgz ===
  jscodeshift: ^17.0.0 ✅
  sade: ^1.8.1 ✅
  zx: ^8.3.0 ✅

=== alma-oss-spirit-web-1.0.0.tgz ===
  @csstools/normalize.css: ^12.0.0 ✅
  @floating-ui/dom: ^1.5.3 ✅

=== alma-oss-spirit-web-react-1.0.0.tgz ===
  classnames: ^2.3.1 ✅
  html-react-parser: 5.1.1 ✅
  react-transition-group: ^4.4.5 ✅

────────────────────────────────────────────────────────────
Results: 4 PASS, 0 FAIL
────────────────────────────────────────────────────────────
ALL PACKAGES VERIFIED ✅
```

If any `catalog:` reference is left unresolved, the affected dependency is marked with ❌ and
the script exits with a non-zero status.

## Environment Variables

| Variable              | Value | Description                                                                                                                                                                   |
| --------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LERNA_NO_PROVENANCE` | `1`   | Set automatically by the script. Bypasses `"provenance": true` in each package's `publishConfig`, which requires GitHub Actions OIDC and is unavailable during local testing. |

## Files

| File                    | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `test-local-publish.sh` | Main test script — starts Verdaccio, publishes packages, inspects tarballs   |
| `verdaccio-test.yaml`   | Minimal Verdaccio config — isolated registry, no npm proxy, anonymous access |

## Troubleshooting

**Port 4873 already in use**
The script kills stale Verdaccio processes automatically before starting. If it still fails,
kill the process listening on the port:

```bash
kill $(lsof -t -iTCP:4873 -sTCP:LISTEN)
```

**`EUNCOMMIT` error or modified `package.json` files after a run**
Lerna's `--no-git-reset` flag leaves `package.json` files modified on disk. The EXIT trap
normally restores them, but if the script was interrupted abruptly, run:

```bash
git checkout -- packages/*/package.json
```

**Verdaccio fails to start**
Check the log for errors:

```bash
cat /tmp/verdaccio-spirit.log
```

**Package version already exists in the registry**
The script clears `/tmp/verdaccio-spirit-storage` on every start, so this should not occur.
If it does, delete the storage manually and re-run:

```bash
rm -rf /tmp/verdaccio-spirit-storage
./tools/test-local-publish.sh
```

[lerna-patch]: ../.yarn/patches/
[verdaccio]: https://verdaccio.org
