# Docsite Canonical Pages Until Cutover

Date: 2026-09-10

Status: accepted

Until Cutover, extracted documentation is written as native-looking Canonical Pages colocated with existing repository documentation and components. Ownership lives in a sidecar so re-extract can overwrite script-owned files without marking the markdown as imported.

## Context

Spirit documentation still originates in Supernova, but the docsite must publish it as ordinary markdown from established repository locations. Keeping a `content/supernova/` dump, or leaving `sourceUrl` in frontmatter, would make those files look imported and would block treating them as hand-authored pages after Cutover.

The alternatives were: (1) leave a staging dump and wire routes to it, (2) import once and merge on later extracts, or (3) write Canonical Pages that look hand-authored while Supernova remains the source of truth.

## Decision

1. **Colocated canonical trees.** General documentation is written to `docs/{introduction,design,development}/`. The migrations Folder Landing is `docs/migrations/index.md`. Component Tab Pages are written next to the React component as `packages/web-react/src/components/<Component>/docs/{overview,design,accessibility,figma}.md`. The colocated pages describe the shared component family; the existing `README.md` remains implementation API documentation.
2. **Repo-backed pages stay unique.** Nested migration guides, Codemods, CHANGELOGs, the release schedule, and release-names docs already exist in the repository. The docsite publishes those files in place; extract skips them instead of copying. The migrations Folder Landing is unique Supernova copy and stays a Canonical Page.
3. **Pages look native.** Canonical Pages have `{ title }` frontmatter only. In-page Supernova chrome is stripped. Internal `/latest/…` links are rewritten to docsite paths. Folder Landings are `index.md`. Component Tab Pages keep `overview.md` / `design.md` / `accessibility.md` / `figma.md`.
4. **Sidecar ownership.** The extract script records repository-relative Owned Paths beside the script, not in the markdown. Re-extract overwrites and deletes only allowlisted Owned Paths. It never touches a file that is not owned.
5. **Supernova until Cutover.** Until the last extract, do not hand-edit Owned Paths. Cutover is that last extract plus removal of the extract script.

## Consequences

- Re-running `yarn supernova:extract` refreshes the published docs without a merge step.
- Colocated component documentation stays outside the published `@alma-oss/spirit-web-react` package because the package includes only `dist` and root documentation files.
- Nested migration guides and releases stay a single source in `docs/` and package files; the docsite aliases those URLs instead of storing a second copy. The migrations landing remains a Canonical Page.
- A later hand-authored page in any destination is safe only if it is not an Owned Path.
- Images may still point at Supernova CDNs until a separate vendoring step at Cutover.
- Only the generated Canonical Page destinations are excluded from Remark lint until Cutover.
