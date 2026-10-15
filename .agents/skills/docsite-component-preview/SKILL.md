---
name: spirit:docsite-component-preview
description: >-
  Add or change a component card preview on the Spirit docsite /components listing. Covers the React
  preview composition, manifest and registry, placeholder components, and keeping the detail Web Preview
  untouched. Use when adding a component to the documentation, creating or updating a card preview, or
  converting a preview into React. Page composition and SCSS rules live in spirit:docsite-composition and
  spirit:docsite-styles; do not copy those skills into this branch.
category: spirit
displayName: Spirit Docsite Component Preview
---

# Docsite component preview

Use this skill when someone adds a component to the docsite or changes the picture shown on its card at
`/components`. The preview is documentation UI. It is not a new component in `packages/web` or
`packages/web-react`.

Page layout and SCSS conventions are `/spirit:docsite-composition` and `/spirit:docsite-styles` on the
homepage branch. Do not copy those skills into this branch. This skill does not restyle the listing.

## Where the preview lives

Create `apps/docsite/src/domains/components/features/component-list/previews/<Name>Preview.tsx`.

- Start the file with `'use client'`.
- Compose it from `@alma-oss/spirit-web-react`.
- Export the component as the default export.
- Show the default or primary variant, medium size, and a single instance, unless the source markup shows
  something else.

```tsx
'use client';

import { Button } from '@alma-oss/spirit-web-react';
import React from 'react';

const ButtonPreview = () => (
  <Button color="primary" size="medium">
    Button
  </Button>
);

export default ButtonPreview;
```

## Register it in both places

The catalog test requires the manifest keys and `COMPONENT_PREVIEWS` keys to be the same set.

1. Add the component name to `COMPONENT_PREVIEW_MANIFEST` in
   `apps/docsite/src/domains/components/features/component-list/model/componentPreviewManifest.ts`.
2. Import the preview and add the same name to `COMPONENT_PREVIEWS` in
   `apps/docsite/src/domains/components/features/component-list/previews/index.ts`:

```ts
Button: { Preview: ButtonPreview, guides: COMPONENT_PREVIEW_MANIFEST.Button },
```

Guides are `'vertical'`, `'horizontal'`, or `undefined`. `undefined` draws both axes. Copy the value into
both files; the test checks they match.

## A component with no preview

Add the name only to `COMPONENTS_WITHOUT_PREVIEW` in `componentPreviewManifest.ts`. The card shows the
placeholder. Do not invent a preview, and do not put that name in the manifest or in `COMPONENT_PREVIEWS`.
A name belongs to one list.

## Leave the packages and the detail preview alone

Do not add `doc-preview-card.html`, or a loader for it, under `packages/web` or `packages/web-react`.

Do not edit `preview.html` or `apps/docsite/src/domains/components/utils/compilePreview.ts`. Those belong
to the component-detail Web Preview.

## Match the source

When converting an existing preview, keep the variant, size, text, icons, and number of instances.

If the markup references a partial under `apps/docsite/src/domains/components/ui/partials`, render that
asset. Do not replace it with a stock photo.

Do not change `componentCategories.ts` or `componentDescriptions.ts` unless someone asks for new categories
or public copy.

## The frame is a picture

`PreviewFrame` marks the preview `inert`. Leave that in place. Do not make the card preview interactive.

`--preview-frame-padding` and `--preview-frame-guide-gap` in `PreviewFrame.scss` stay in `px`.
`PreviewFrame.tsx` reads them with `parseFloat` as pixels.

## Done

Open `/components` and find the card. Then run docsite lint, types, and unit tests. The catalog test in
`model/__tests__/componentCatalog.test.ts` fails when the manifest and the registry disagree, or when a
placeholder component is registered.
