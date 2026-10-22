# Docsite Component Detail

Workflow for the Spirit docsite component page: header, playground, tabs, and documentation blocks.

## Usage

```text
/spirit:docsite-component-detail
```

Use when you need to:

- Change the component detail layout, header, or page actions
- Add or validate a `playground.json`
- Change component tabs or the heading scale on component pages

Card pictures on `/components` stay in `/spirit:docsite-component-preview`.

## What It Covers

1. The detail layout: header, optional playground, `Navigation` tabs, then the view. No `ComponentCover`.
2. `ComponentsBand` variants `detailHeader`, `tabs`, and `content`, without changing the listing variants.
3. Header UI in `features/component-detail/ui/<Name>/`, and the playground in `features/component-playground`,
   with plain SCSS and a barrel.
4. Shared `PageActions`: copy writes the title, description, and URL; Storybook and Figma fall back to the
   listing URLs; GitHub opens the component folder.
5. `PLAYGROUND_COMPONENTS` plus `parsePlaygroundFile`. An unknown or broken playground is not rendered.
6. The small component heading scale, with the first block heading marked by `rehypeMarkBlockTitle`.
7. Leaving the Button color images out of `design.md`. `yarn supernova:extract` would put them back.

Page composition and SCSS stay in `/spirit:docsite-composition` and `/spirit:docsite-styles`. This skill does
not copy them.

## Output

A change to the component page that keeps the listing card grid and the shared heading scale on other pages.

## Check

Open `/components/button` and `/components`. Run `yarn workspace @alma-oss/spirit-docsite test`.
