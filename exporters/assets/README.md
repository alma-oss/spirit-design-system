# Assets Exporter

`@alma-oss/spirit-assets-exporter` synchronizes SVG assets from a Figma Asset File into one or more repository
directories. Figma is the current source adapter; the CLI, configuration, and disk mirroring stay source-agnostic.

The package is private. Consumer repositories do not install it from npm. This repository runs the CLI locally and from
GitHub Actions. A repository opts in by installing the GitHub App and merging a root `spirit.config.json`.

## Configuration

Create `spirit.config.json` at the repository root. Cosmiconfig also searches for `.spiritrc`, `spirit.config.js`, and a
`spirit` key in `package.json` during trusted local use. Asset export is one tool on that shared file; other tools can
add sibling keys later without changing this shape:

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

Branded icon component sets must contain a `Brand` property matching the configured target. Benefit icons do not have a
Brand variant and are exported unchanged into every target that selects them.

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

The workflow authenticates as the GitHub App, checks out every repository the App can access, and looks for
`spirit.config.json` at the repository root. Repositories without that file, or without an `assets` object, are skipped.
Each configured target gets its own updating pull request.

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

A repository opts in by:

1. installing the same GitHub App, with `Contents: write` and `Pull requests: write`
2. merging `spirit.config.json` at the repository root
3. allowing the App to push the automation branch

The target repository does not run the exporter or store Figma credentials.

## Testing

Run the complete package checks with:

```shell
yarn workspace @alma-oss/spirit-assets-exporter test
```

[web-react-figma-config]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/figma.config.json
