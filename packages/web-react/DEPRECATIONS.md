# Deprecations List

This document lists all deprecations that will be removed in the next major version of the _spirit-web-react_ package.

> Please follow the migration guides to safely upgrade your design system components.

## Deprecations

👉 [What are deprecations?][readme-deprecations]

### Heading

The `emphasis` prop is deprecated in its entirety and will be removed in v6. Use the `fontWeight` prop for the
`regular`, `semibold`, and `bold` font weights, and use the `isItalic` prop for italic styling.

#### Migration Guide

Run the codemod on your source files:

```shell
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/heading-text-emphasis-prop
```

Or migrate manually:

```tsx
// before
<Heading elementType="h2" emphasis="italic">
  Heading
</Heading>
<Heading elementType="h2" emphasis="semibold">
  Heading
</Heading>

// after
<Heading elementType="h2" fontWeight="regular" isItalic>
  Heading
</Heading>
<Heading elementType="h2" fontWeight="semibold">
  Heading
</Heading>
```

### PaginationButtonLink

The `PaginationButtonLink` component is deprecated. Use `PaginationLinkPrevious` / `PaginationLinkNext` for previous and next links.

#### Migration Guide

Replace `PaginationButtonLink` with `PaginationLinkPrevious` or `PaginationLinkNext`.

```tsx
// Before
<PaginationButtonLink direction="next" href="/page-2" />
<PaginationButtonLink direction="previous" href="/page-1" />

// After
<PaginationLinkNext href="/page-2" />
<PaginationLinkPrevious href="/page-1" />
```

🪄 Use a codemod to rename `PaginationButtonLink` to `PaginationLinkPrevious` / `PaginationLinkNext`:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/pagination-button-link-to-pagination-link
```

### Text

The `emphasis` prop is deprecated in its entirety and will be removed in v6. Use the `fontWeight` prop for the
`regular`, `semibold`, and `bold` font weights, and use the `isItalic` prop for italic styling.

#### Migration Guide

Run the codemod on your source files:

```shell
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/heading-text-emphasis-prop
```

Or migrate manually:

```tsx
// before
<Text emphasis="italic">Text</Text>
<Text emphasis="bold">Text</Text>

// after
<Text isItalic>Text</Text>
<Text fontWeight="bold">Text</Text>
```

[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
