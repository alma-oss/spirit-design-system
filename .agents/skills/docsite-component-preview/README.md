# Docsite Component Preview

Workflow for adding or changing the picture on a component card in the Spirit docsite.

## Usage

```text
/spirit:docsite-component-preview
```

Use when you need to:

- Add a card preview for a component on `/components`
- Leave a component on the placeholder because it has no illustration

## What It Covers

1. An SVG in `apps/docsite/public/component-illustrations/<slug>.svg`
2. The slug registered in `componentIllustrations.ts`
3. No file and no slug for a card that stays a placeholder
4. Leaving `preview.html` and `compilePreview.ts` for the detail Web Preview
5. Leaving the illustration `inert`

## Output

An SVG plus one slug in the catalog, or nothing for a placeholder.

## Check

Open `/components` and find the card. Run `yarn workspace @alma-oss/spirit-docsite test`. `componentsCatalogRepository.test.ts`
checks that every registered illustration has a file.
