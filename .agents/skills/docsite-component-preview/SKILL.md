---
name: spirit:docsite-component-preview
description: >-
  Add or change a component card illustration on the Spirit docsite /components listing. Covers the SVG
  file, the placeholder for a component without one, and keeping the detail Web Preview untouched. Use when
  adding a component to the documentation or updating the picture on its card.
category: spirit
displayName: Spirit Docsite Component Preview
---

# Docsite Component Preview

Use this skill when someone adds a component to the docsite or changes the picture shown on its card at
`/components`. The picture is documentation UI. It is not a new component in `packages/web` or
`packages/web-react`.

## Where the Illustration Lives

The card shows one wireframe SVG per component, 120 × 96 px, from
`apps/docsite/public/component-illustrations/<slug>.svg`.

- The slug is the kebab-case component name (`ButtonLink` → `button-link`, `UNSTABLE_Combobox` →
  `unstable-combobox`), the same as in the component URL.
- Keep the SVG as it was delivered. Do not hand-edit colors or shapes.

## Registration

There is nothing to register. The catalog reads `public/component-illustrations` and shows the SVG whose file
name matches the component slug.

## Category and Description

Add a new component to its category in `component-catalog/constants/componentCategories.ts` by the placement rule
at the top of the file. Do not move existing components or change category descriptions or
`componentDescriptions.ts` unless someone asks for new categories or public copy.

## A Component with No Illustration

Do not add a file. The card shows the placeholder. Do not invent an illustration.

## Leave the Packages and the Detail Preview Alone

Do not edit `preview.html` or `apps/docsite/src/domains/components/utils/compilePreview.ts`. Those belong
to the component-detail Web Preview.

## The Frame Is a Picture

`PreviewFrame` marks the illustration `inert`. Leave that in place. Do not make the card preview interactive.

## Done

Open `/components` and find the card. Then run `yarn workspace @alma-oss/spirit-docsite test`. The catalog test
in `component-catalog/repositories/__tests__/componentsCatalogRepository.test.ts` fails when an
illustration file is not named after an existing component slug.
