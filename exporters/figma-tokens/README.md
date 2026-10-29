# Figma Tokens

`@alma-oss/spirit-figma-tokens-exporter` reads variables and styles from a Figma Config file and writes the SCSS and TypeScript files in `@alma-oss/spirit-design-tokens`.

Figma is a source adapter. Configuration, the CLI, and the output mirror stay independent of Figma. Set `FIGMA_ACCESS_TOKEN` to a token that can read file content and local variables (`file_content:read` and `file_variables:read`).

## Configuration

Token export is a `tokens` key on the repository `spirit.config.json`, next to `assets`. Each source is one brand and one Figma file:

```json
{
  "tokens": {
    "sources": [
      {
        "fileKey": "BXRF3VABXQm2TGkL0nwS4i",
        "brand": "Spirit",
        "out": "packages/design-tokens/src",
        "fontStacks": {
          "Inter": "'Inter', sans-serif",
          "Roboto Mono": "'Roboto Mono', monospace",
          "General Sans": "'General Sans', sans-serif"
        }
      }
    ]
  }
}
```

`out` is relative to the config file. Synchronization replaces that directory with the generated files.

The file key is not a secret. Spirit Config is [SPIRIT (Config)](https://www.figma.com/design/BXRF3VABXQm2TGkL0nwS4i/). Configure other brands as additional sources. Do not export the UI Kit.

Typography styles whose names contain `Link` or `Italic` are excluded. Italics are applied in products with the `.text-italic` helper.

## Usage

```shell
export FIGMA_ACCESS_TOKEN=your-token-here
yarn workspace @alma-oss/spirit-design-tokens sync
yarn workspace @alma-oss/spirit-figma-tokens-exporter sync --config spirit.config.json --dry-run
yarn workspace @alma-oss/spirit-figma-tokens-exporter sync --brand Spirit
```

`sync` writes an exact mirror of each source `out` directory. `--dry-run` reports changes without writing. A source is validated completely before its directory is touched.

The Supernova exporter in `exporters/tokens` remains available until the next major release.

## Testing

```shell
yarn workspace @alma-oss/spirit-figma-tokens-exporter test
```
