# Figma Assets

`@alma-oss/spirit-figma-assets-exporter` synchronizes icon SVGs from a Figma Asset File into one or more repository directories.

## Configuration

Create `figma-assets.config.json`:

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

Output paths are relative to the configuration file. Each target selects one or more asset types:

- `icons`: Brand-specific variants from `Icons/{icon-name}` component sets;
- `benefit-icons`: shared, unbranded `Icons/benefit-*` components;
- `illustrations`: Brand-specific variants from `Illustration/{illustration-name}` component sets.

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

Set `FIGMA_ACCESS_TOKEN` to a Figma personal access token with the `file_content:read` scope and access to the Asset
File, then run:

```shell
yarn workspace @alma-oss/spirit-figma-assets-exporter sync --config figma-assets.config.json
```

The target directory becomes an exact mirror of the selected Brand:

- new SVGs are added;
- changed SVGs are updated;
- SVGs missing from Figma are deleted.

The sync aborts before changing a target when it cannot discover or download the complete icon set.

## Automated Delivery

Repositories can invoke the same CLI from any CI system. In this repository, the **Sync Figma Assets** GitHub Actions
workflow accepts a manual run or a `figma-library-publish` repository dispatch. An external automation such as Make can
receive Figma's `LIBRARY_PUBLISH` webhook and send that dispatch. Manual `workflow_dispatch` runs remain available.

## Testing

Run the complete package checks with:

```shell
yarn workspace @alma-oss/spirit-figma-assets-exporter test
```

The test command enforces 100% line, branch, and function coverage for the TypeScript source.
