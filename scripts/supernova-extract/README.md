# Supernova Documentation Extract

Fetches the published Supernova documentation sitemap, filters out pages that already live in this repository, and writes Canonical Pages under `apps/docsite/content/`.

Skipped sources:

- Component `web`, `html`, and `react` subpages (package `README` files)
- The `all-components` catalog
- Nested migration guides, Codemods, and all releases (`docs/migrations` guides, package `CHANGELOG` files, release schedule / names). The migrations Folder Landing is still extracted.

Until Cutover, re-running this command overwrites Owned Paths recorded in `owned-paths.json`. It never deletes a file that is not owned.

## Usage (from Repository Root)

```sh
# Full run (network; writes `apps/docsite/content/`)
yarn supernova:extract

# Dry run — resolve all URLs and paths only (no network fetch, no files)
yarn supernova:extract --dry-run

# Tune parallelism and delay between fetches
yarn supernova:extract -c 4 -d 100
```

**Note:** In Yarn, pass `yarn supernova:extract --dry-run` (do not put an extra `--` before `--dry-run` or the flag may not reach the script).

## Outputs

- **Canonical Pages** — one markdown file per page, with `{ title }` frontmatter only, under `apps/docsite/content/`.
- **`owned-paths.json`** — sidecar list of files this script may overwrite or delete.
- **`REPORT.md`** — human-readable summary and failure list.

## Implementation Notes

- **Slug cleaning** removes Supernova id suffixes from the URL path, without stripping short lowercase words (e.g. `spirit` in `what-is-spirit`).
- **Folder Landings** are written as `index.md` (`overview`, `intro`, `spirit-design-system`, and same-named hubs).
- **Component Tab Pages** stay `overview.md` / `design.md` / `accessibility.md` / `figma.md`.
- **Filtered URLs** are listed in the report (component `*/web-*`, `*/html-*`, `*/react-*`, `all-components`, nested migrations, and releases).

## Development

```sh
cd scripts/supernova-extract
yarn types
yarn test:unit
```
