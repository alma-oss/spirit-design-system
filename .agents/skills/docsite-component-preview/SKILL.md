---
name: spirit:docsite-component-preview
description: >-
  Add or change a component card preview on the Spirit docsite /components listing. Covers the React
  preview composition, its registration and guides, placeholder components, and keeping the detail Web Preview
  untouched. Use when adding a component to the documentation, creating or updating a card preview, or
  converting a preview into React. Page composition and SCSS rules live in spirit:docsite-composition and
  spirit:docsite-styles; do not copy those skills into this branch.
category: spirit
displayName: Spirit Docsite Component Preview
---

# Docsite Component Preview

Use this skill when someone adds a component to the docsite or changes the picture shown on its card at
`/components`. The preview is documentation UI. It is not a new component in `packages/web` or
`packages/web-react`.

Page layout and SCSS conventions are `/spirit:docsite-composition` and `/spirit:docsite-styles` on the
homepage branch. Do not copy those skills into this branch. This skill does not restyle the listing.

## Where the Preview Lives

Create `apps/docsite/src/domains/components/features/component-card/previews/<Name>Preview.tsx`.

- Add `'use client'` only when the preview uses hooks or event handlers. Previews render inside the client
  `ComponentCard`, so a static composition does not need it.
- Compose it from `@alma-oss/spirit-web-react`.
- Export the component as the default export.
- Show the default or primary variant, medium size, and a single instance, unless the source markup shows
  something else.

```tsx
import { Button } from '@alma-oss/spirit-web-react';
import React from 'react';

const ButtonPreview = () => (
  <Button color="primary" size="medium">
    Button
  </Button>
);

export default ButtonPreview;
```

## Register It

Add one line to `apps/docsite/src/domains/components/features/component-card/previews/index.ts`. The export
name is the component name, which the catalog uses as the key:

```ts
export * as Button from './ButtonPreview';
```

The catalog test fails when the export name is not an existing component.

## Guides

Guides limit the measurement lines the frame draws. Set them on the preview component only when the
preview needs one axis:

```tsx
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';
import type { PreviewComponent } from '../../component-catalog';

const AccordionPreview: PreviewComponent = () => (/* ... */);

AccordionPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default AccordionPreview;
```

The value is `PREVIEW_GUIDES.VERTICAL` or `PREVIEW_GUIDES.HORIZONTAL`. Without it, the frame draws both axes.
Keep the component the file's only export, so Fast Refresh keeps working. Import `PREVIEW_GUIDES` from
`constants/previewGuides`, not from the catalog barrel. The barrel loads the repository, which loads the
previews.

## A Component with No Preview

Do not create a preview file or a line in `previews/index.ts`. The card shows the placeholder. Do not invent
a preview.

## Leave the Packages and the Detail Preview Alone

Do not add `doc-preview-card.html`, or a loader for it, under `packages/web` or `packages/web-react`.

Do not edit `preview.html` or `apps/docsite/src/domains/components/utils/compilePreview.ts`. Those belong
to the component-detail Web Preview.

## Match the Source

When converting an existing preview, keep the variant, size, text, icons, and number of instances.

If the markup references a partial under `apps/docsite/src/domains/components/ui/partials`, render that
asset. Do not replace it with a stock photo.

Do not change `component-catalog/constants/componentCategories.ts` or `componentDescriptions.ts` unless someone asks for new categories
or public copy.

## The Frame Is a Picture

`PreviewFrame` marks the preview `inert`. Leave that in place. Do not make the card preview interactive.

`--preview-frame-padding` and `--preview-frame-guide-gap` in `PreviewFrame.scss` stay in `px`.
`PreviewFrame.tsx` reads them with `parseFloat` as pixels.

## Done

Open `/components` and find the card. Then run `yarn workspace @alma-oss/spirit-docsite test`, which runs lint,
unit tests, and types. The catalog test in
`component-catalog/repositories/__tests__/componentsCatalogRepository.test.ts` fails when a preview has no
default component, has invalid guides, or is exported under a name that is not a component.
