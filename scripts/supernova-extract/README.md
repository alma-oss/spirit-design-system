# Supernova Documentation Extract

Fetches the published Supernova documentation sitemap, filters out component `web`, `html` (web implementation in Supernova), and `react` subpages (those already live in package `README` files in `packages/web` / `packages/web-react`), and writes one Markdown file per page under `apps/docsite/content/supernova/`.

## Usage (from Repository Root)

```sh
# Full run (network; writes `apps/docsite/content/supernova/`)
yarn supernova:extract

# Dry run — resolve all URLs and paths only (no network fetch, no files)
yarn supernova:extract --dry-run

# Tune parallelism and delay between fetches
yarn supernova:extract -c 4 -d 100
```

**Note:** In Yarn, pass `yarn supernova:extract --dry-run` (do not put an extra `--` before `--dry-run` or the flag may not reach the script).

## Outputs

- **Markdown** — one file per page, with YAML frontmatter (`title`, `sourceUrl`, `sourcePath`, `sourceSection`, `lastExtractedAt`).
- **`manifest.json`** — sitemap order, per-page status, errors.
- **`REPORT.md`** — human-readable summary and failure list.

## Implementation Notes

- **Slug cleaning** removes Supernova id suffixes from the URL path, without stripping all-lowercase words (e.g. `spirit` in `what-is-spirit`).
- **Filtered URLs** are listed in the manifest and report (component `*/web-*`, `*/html-*`, and `*/react-*`).

## Development

```sh
cd scripts/supernova-extract
yarn types
```
