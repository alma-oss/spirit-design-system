# Assets Exporter

`@alma-oss/spirit-assets-exporter` synchronizes SVG assets from a Figma Asset File into one or more repository
directories. Figma is the current source adapter; the CLI, configuration, and disk mirroring stay source-agnostic.

The package is private. Consumer repositories do not install it from npm. This repository runs the CLI locally and from
GitHub Actions. A repository opts in by installing the GitHub App and merging a supported Spirit config at its root.

## Configuration

Create `spirit.config.json` at the repository root. Asset export is one tool on that shared file; other tools can add
sibling keys later without changing this shape:

```json
{
  "assets": {
    "fileKey": "your-figma-file-key",
    "targets": [
      {
        "brand": "Spirit",
        "out": "src/svg",
        "assets": ["icons"]
      }
    ]
  }
}
```

Repository opt-in also supports `.spiritrc.json` and static `spirit.config.{js,mjs,cjs,ts,cts,mts}` files. JSON takes
precedence when more than one supported root file exists. JavaScript and TypeScript configs must contain only a
JSON5-compatible object exported with `export default`; the CommonJS `.cjs` form uses `module.exports`. Imports,
function calls, `defineConfig`, `satisfies`, and `as const` are not executed or accepted. During trusted local use,
Cosmiconfig also supports an extensionless `.spiritrc` and a `spirit` key in `package.json`.

The Figma file key is not a secret. It identifies a published Figma file, the same way
[`packages/web-react/figma.config.json`][web-react-figma-config] stores a file URL.

Output paths are relative to the configuration file and must stay inside the repository. Each target selects one or more
asset types:

- `icons`: Brand-specific variants from `Icons/{icon-name}` component sets
- `benefit-icons`: shared, unbranded `Icons/benefit-*` components
- `illustrations`: Brand-specific variants from `Illustration/{illustration-name}` component sets

Multiple asset types in one target share the same output directory and are treated as one complete set:

```json
{
  "assets": {
    "fileKey": "your-figma-file-key",
    "targets": [
      {
        "brand": "Example",
        "out": "packages/example-icons/src/svg",
        "assets": ["icons", "benefit-icons"]
      }
    ]
  }
}
```

Branded icon and illustration component sets are exported only when they include a `Brand` variant matching the
configured target. Sets without that brand are skipped. Benefit icons do not have a Brand variant and are exported
unchanged into every target that selects them.

Illustrations should use a separate target because they are not part of the 24×24 icon set:

```json
{
  "brand": "Spirit",
  "out": "src/illustrations",
  "assets": ["illustrations"]
}
```

## Usage

Set `FIGMA_ACCESS_TOKEN` to a Figma personal access token with `file_content:read` and access to the Asset File, then
run:

```shell
yarn icons:sync
```

Or invoke the CLI with an explicit config path:

```shell
yarn workspace @alma-oss/spirit-assets-exporter sync --config spirit.config.json
```

If `--config` is omitted, cosmiconfig searches the current working directory for a Spirit configuration.

The target directory becomes an exact mirror of the selected Brand:

- new SVGs are added
- changed SVGs are updated
- SVGs missing from Figma are deleted

The sync aborts before changing a target when it cannot discover or download the complete asset set.

## Automated Delivery

This repository runs a GitHub Actions workflow that synchronizes icons from Figma. It can be started manually or by a
Figma library publish via external automation. Credentials live in the `figma` GitHub Actions environment.

The workflow authenticates as the GitHub App and probes the supported root config filenames in each repository the App
can access via the GitHub Contents API. Discovery resolves the repository default branch to an exact commit and reads
the first matching config at that revision. Repositories without a supported config, or without an `assets` object, are
skipped. Config files are parsed as data and never executed. A run is rejected if discovery produces more than 128
targets. Repository dispatch events must provide `client_payload.file_key`; manual runs can synchronize every opted-in
file.

Each configured target gets its own updating pull request. Sync jobs download a prebuilt CLI from the discover job and
do not install this monorepo. They check out the exact revision inspected by discovery with `blob:none` and non-cone
sparse checkout limited to the discovered root config and the validated output directory. Figma publish notes are
resolved inside each target job and written directly to a temporary pull-request body file; private checkout data and
publish notes are never uploaded as workflow artifacts.

The orchestrator repository and its Actions run are public. Job names and logs are redacted, and repository-specific
values are masked before checkout, but sparse checkout is a risk reduction rather than a strict confidentiality
boundary: Git and GitHub Actions can still expose repository or tree metadata. Repositories that require zero public
metadata exposure must run synchronization from a private orchestrator instead.

Branch name, commit message, and pull request title are optional and belong only on the `assets` object. Omitted fields
keep these defaults:

- `branch`: `chore/figma-icons-sync-{slug}`
- `commitMessage`: `chore(icons): sync {brand} icons from Figma`
- `pullRequestTitle`: `Chore(icons): Sync {brand} icons from Figma`

Repo-wide defaults live next to `fileKey`. A target may override any of them. `pullRequestTitle` is not copied from
`commitMessage`.

```json
{
  "assets": {
    "fileKey": "your-figma-file-key",
    "branch": "chore/figma-icons-sync-{slug}",
    "commitMessage": "chore(icons): sync {brand} icons from Figma",
    "pullRequestTitle": "Chore(icons): Sync {brand} icons from Figma",
    "targets": [
      {
        "brand": "Jobs",
        "out": "libs/design-icons/jobs.cz/svg",
        "assets": ["icons"],
        "commitMessage": "chore(jobs-icons): sync icons from Figma"
      }
    ]
  }
}
```

Allowed placeholders: `{brand}`, `{slug}`, `{out}`, `{repo}`, `{owner}`. Unknown `{tokens}` fail config parse.

For `branch` only, interpolated `{brand}` and `{out}` are slugified so names like `Práce` stay valid git refs.
`{slug}`, `{repo}`, and `{owner}` are left as-is. If two targets in the same repository resolve to the same branch, that
repository is skipped.

An existing automation branch is updated or deleted only when it belongs to a pull request authored by the configured
GitHub App at the same head revision. Icon updates are committed on top of the existing branch, preserving follow-up
commits such as visual-test fixes. A branch with no icon changes is deleted only when its head commit is App-authored;
human follow-up commits keep the pull request open. Updates and deletions use `--force-with-lease`, so a concurrent or
unverified branch cannot be overwritten.

A repository opts in by:

1. installing the same GitHub App, with `Contents: write` and `Pull requests: write`
2. merging a supported Spirit config at the repository root
3. allowing the App to push the automation branch

The target repository does not run the exporter or store Figma credentials.

## Testing

Run the complete package checks with:

```shell
yarn workspace @alma-oss/spirit-assets-exporter test
```

[web-react-figma-config]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/figma.config.json
