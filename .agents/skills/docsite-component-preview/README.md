# Docsite component preview

Workflow for adding or changing the picture on a component card in the Spirit docsite.

## Usage

```text
/spirit:docsite-component-preview
```

Use when you need to:

- Add a card preview for a component on `/components`
- Convert an existing preview into a React composition
- Leave a component on the placeholder because it has no preview

## What it covers

1. A `'use client'` preview in `features/component-list/previews/<Name>Preview.tsx`, built with
   `@alma-oss/spirit-web-react`
2. The same component name in `COMPONENT_PREVIEW_MANIFEST` and `COMPONENT_PREVIEWS`
3. `COMPONENTS_WITHOUT_PREVIEW` for a card that stays a placeholder
4. Keeping `doc-preview-card.html` out of the component packages, and leaving `preview.html` and
   `compilePreview.ts` for the detail Web Preview
5. Reusing an asset from `ui/partials` when the source markup points at one
6. Leaving the preview `inert`, and leaving the frame's parsed lengths in `px`

Page composition and SCSS stay in `/spirit:docsite-composition` and `/spirit:docsite-styles` on the homepage
branch. This skill does not copy them.

## Output

A preview file plus the two registry edits, or one placeholder-list edit. Categories and public descriptions
stay as they are unless the task asks to change them.

## Check

Open `/components` and find the card. Run docsite lint, types, and unit tests. `componentCatalog.test.ts`
checks that the manifest and the registry list the same components.
