# Assets Exporter

`@alma-oss/spirit-assets-exporter` synchronizes SVG assets from a Figma Asset File into one or more repository
directories. Figma is the current source adapter; the CLI, configuration, and disk mirroring stay source-agnostic.

The package is private. Consumer repositories do not install it from npm. This repository runs the CLI locally and from
GitHub Actions. A later Cyborg delivery can keep the configuration here and open a pull request in that repository.

## Configuration

Create `spirit-assets.config.json` (cosmiconfig also accepts `.spirit-assetsrc`, `spirit-assets.config.js`, and a
`spirit-assets` key in `package.json`):

```json
{
  "fileKey": "your-figma-file-key",
  "targets": [
    {
      "brand": "Spirit",
      "out": "src/svg",
      "assets": ["icons"]
    }
  ]
}
```

The Figma file key is not a secret. It identifies a published Figma file, the same way
[`packages/web-react/figma.config.json`][web-react-figma-config] stores a file URL.

Output paths are relative to the configuration file. Each target selects one or more asset types:

- `icons`: Brand-specific variants from `Icons/{icon-name}` component sets
- `benefit-icons`: shared, unbranded `Icons/benefit-*` components
- `illustrations`: Brand-specific variants from `Illustration/{illustration-name}` component sets

Multiple asset types in one target share the same output directory and are treated as one complete set. This allows each
Brand repository to store its regular and benefit icons together:

```json
{
  "fileKey": "your-figma-file-key",
  "targets": [
    {
      "brand": "Práce",
      "out": "packages/prace-icons/src/svg",
      "assets": ["icons", "benefit-icons"]
    },
    {
      "brand": "Jobs",
      "out": "packages/jobs-icons/src/svg",
      "assets": ["icons", "benefit-icons"]
    }
  ]
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
yarn workspace @alma-oss/spirit-assets-exporter sync --config packages/icons/spirit-assets.config.json
```

If `--config` is omitted, cosmiconfig searches the current working directory for a `spirit-assets` configuration.

The target directory becomes an exact mirror of the selected Brand:

- new SVGs are added
- changed SVGs are updated
- SVGs missing from Figma are deleted

The sync aborts before changing a target when it cannot discover or download the complete asset set.

## Automated Delivery

This repository runs a GitHub Actions workflow that synchronizes icons from Figma. It can be started manually or by a
Figma library publish via external automation. Credentials live in GitHub Actions. The workflow opens or updates a pull
request when the generated SVGs differ.

Other repositories can set up a similar workflow to run the CLI and open a pull request.

Cyborg delivery is planned, not implemented: configuration stays in this repository, and a GitHub Action would open a
commit and pull request in Cyborg. Until then, Cyborg does not run this CLI.

## Testing

Run the complete package checks with:

```shell
yarn workspace @alma-oss/spirit-assets-exporter test
```

[web-react-figma-config]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/figma.config.json
