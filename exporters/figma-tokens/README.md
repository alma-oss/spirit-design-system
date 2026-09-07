# Figma Tokens

`@alma-oss/spirit-figma-tokens-exporter` captures Figma variables and styles, then generates the SCSS and TypeScript files in `@alma-oss/spirit-design-tokens`.

Figma is the source of truth. A local plugin writes a lossless snapshot; this CLI validates, transforms, and generates package files. REST variable extraction is reserved for a later Enterprise transport and must emit the same snapshot schema.

## Capture (plugin)

1. Build the plugin bundle: `yarn workspace @alma-oss/spirit-figma-tokens-exporter build`
2. In Figma desktop, import `exporters/figma-tokens/plugin/manifest.json` as a development plugin. Figma requires `main` (`plugin/code.js`) to live in the same directory as the manifest — rebuild after pulling so that file exists, then re-import if Figma still has an older path.
3. Open the brand Config file (Spirit: [SPIRIT Config](https://www.figma.com/design/BXRF3VABXQm2TGkL0nwS4i/SPIRIT--Config-))
4. Run **Spirit Figma Tokens** and save the downloaded `*.figma-tokens.snapshot.json`

Snapshots are ephemeral and gitignored. Do not commit them.

## Configuration

Create `figma-tokens.config.json` next to the generated package (paths are relative to the config file):

```json
{
  "fileKey": "BXRF3VABXQm2TGkL0nwS4i",
  "brand": "Spirit",
  "out": "src",
  "snapshot": ".snapshots/spirit.figma-tokens.snapshot.json",
  "fontStacks": {
    "Inter": "'Inter', sans-serif",
    "Roboto Mono": "'Roboto Mono', monospace",
    "General Sans": "'General Sans', sans-serif"
  }
}
```

The same collection contract is used by SPIRIT, PRÁCE.CZ, JOBS.CZ, CV ONLINE, and WIREFRAME Config files. Configure each brand separately (one `fileKey` and snapshot per file). Do not export the UI Kit.

Typography styles whose names contain `Link` or `Italic` are excluded, matching the existing token exporter. Italics are applied in products with the `.text-italic` helper.

## Usage

```shell
yarn workspace @alma-oss/spirit-figma-tokens-exporter generate --config packages/design-tokens/figma-tokens.config.json
yarn workspace @alma-oss/spirit-figma-tokens-exporter check --config packages/design-tokens/figma-tokens.config.json
yarn workspace @alma-oss/spirit-figma-tokens-exporter generate --config packages/design-tokens/figma-tokens.config.json --dry-run
```

`generate` writes an exact mirror of `js/` and `scss/` under `out`. `check` fails when those files would change. The output directory is not touched until the snapshot is valid.

The Supernova exporter in `exporters/tokens` remains available until the next major release for parity and rollback.

## Testing

```shell
yarn workspace @alma-oss/spirit-figma-tokens-exporter test
```
