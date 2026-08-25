# Pagination

## Deprecation Notice

`PaginationButtonLink` is deprecated and will be removed in the next major version.
Use `PaginationLinkPrevious` / `PaginationLinkNext` for previous and next links.

[What are deprecations?][readme-deprecations]

### Migration Guide

Replace `PaginationButtonLink` with `PaginationLinkPrevious` or `PaginationLinkNext`.

```tsx
// Before
<PaginationButtonLink direction="next" href="/page-2" />

// After
<PaginationLinkNext href="/page-2" />
```

🪄 Use a codemod to rename `PaginationButtonLink` to `PaginationLinkPrevious` / `PaginationLinkNext`:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/pagination-button-link-to-pagination-link
```

## Example with the Current Item in the First Place

```tsx
<Pagination>
  <PaginationItem>
    <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 1" pageNumber={1} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" accessibilityLabel="Go to Page 2" pageNumber={2} />
  </PaginationItem>
  {'...'}
  <PaginationItem>
    <PaginationLinkNext href="#" />
  </PaginationItem>
</Pagination>
```

## Example with the Current Item in the Middle

```tsx
<Pagination>
  <PaginationItem>
    <PaginationLinkPrevious href="#" />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" accessibilityLabel="Go to Page 11" pageNumber={11} />
  </PaginationItem>
  {'...'}
  <PaginationItem>
    <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 13" pageNumber={13} />
  </PaginationItem>
  {'...'}
  <PaginationItem>
    <PaginationLink href="#" accessibilityLabel="Go to Page 15" pageNumber={15} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLinkNext href="#" />
  </PaginationItem>
</Pagination>
```

## Example with the Current Item in the Last Place

```tsx
<Pagination>
  <PaginationItem>
    <PaginationLinkPrevious href="#" />
  </PaginationItem>
  {'...'}
  <PaginationItem>
    <PaginationLink href="#" accessibilityLabel="Go to Page 112" pageNumber={112} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 113" pageNumber={113} />
  </PaginationItem>
</Pagination>
```

## Example with the First Current Item, Centered

```tsx
<Pagination UNSAFE_className="text-center">
  <PaginationItem>
    <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 1" pageNumber={1} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" accessibilityLabel="Go to Page 2" pageNumber={2} />
  </PaginationItem>
  {'...'}
  <PaginationItem>
    <PaginationLinkNext href="#" />
  </PaginationItem>
</Pagination>
```

## Example with Disabled Links

```tsx
<Pagination>
  <PaginationItem>
    <PaginationLinkPrevious href="#" isDisabled />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" isDisabled accessibilityLabel="Go to Page 11" pageNumber={11} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 12" pageNumber={12} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" accessibilityLabel="Go to Page 13" pageNumber={13} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLinkNext href="#" isDisabled />
  </PaginationItem>
</Pagination>
```

## Uncontrolled Pagination

```tsx
<UncontrolledPagination
  totalPages={10}
  defaultPage={5}
  onChange={(pageNumber) => {
    console.log(pageNumber);
  }}
/>
```

## Pagination Props

| Name        | Type                      | Default | Required | Description                                        |
| ----------- | ------------------------- | ------- | -------- | -------------------------------------------------- |
| `children`  | `ReactNode`               | `null`  | ✕        | Content of the Pagination wrapper                  |
| `listProps` | `SpiritUListElementProps` | `{}`    | ✕        | Props for the inner [UL element props][ul-element] |

Other unnamed props of this component are formed from the [HTML element][html-element].

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationItem Props

| Name       | Type        | Default | Required | Description         |
| ---------- | ----------- | ------- | -------- | ------------------- |
| `children` | `ReactNode` | `null`  | ✕        | Content of the Item |

Other unnamed props of this component are formed from the [LI element][li-element].

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationLink Props

Renders a numbered page, or custom content through `children`.
Pass `pageNumber` for a page number, or `children` for custom content.
Do not mix the two.

| Name                 | Type          | Default                   | Required | Description                                                      |
| -------------------- | ------------- | ------------------------- | -------- | ---------------------------------------------------------------- |
| `accessibilityLabel` | `string`      | `Go to page {pageNumber}` | ✕        | Accessibility label of the numbered link                         |
| `children`           | `ReactNode`   | —                         | ✕        | Custom content; use instead of `pageNumber`                      |
| `elementType`        | `ElementType` | `a`                       | ✕        | Type of an element                                               |
| `href`               | `string`      | —                         | ✕        | Link URL                                                         |
| `isCurrent`          | `bool`        | `null`                    | ✕        | If true, the numbered link is marked as current                  |
| `isDisabled`         | `bool`        | `false`                   | ✕        | If true, the link is disabled                                    |
| `pageNumber`         | `number`      | —                         | ✕        | Page number, hidden for screen readers; omit when using children |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

`isDisabled` sets `aria-disabled` and the `Pagination__link--disabled` class on `elementType="a"` (default).
It does not set the HTML `disabled` attribute, and it prevents click and navigation.
For `elementType="button"`, the native `disabled` attribute is used.
Disabled styles take precedence over `isCurrent`.

## PaginationButtonLink Props

⚠️ This component is deprecated and will be removed in the next major version.
Use [`PaginationLinkPrevious`](#paginationlinkprevious-props) or
[`PaginationLinkNext`](#paginationlinknext-props) instead.

This component extends the [Button][button] component with directional arrows and a hidden label.

| Name                 | Type                    | Default              | Required | Description                                                          |
| -------------------- | ----------------------- | -------------------- | -------- | -------------------------------------------------------------------- |
| `accessibilityLabel` | `string`                | `Previous` \| `Next` | ✕        | Accessibility label of the link (defaults based on direction)        |
| `direction`          | \[`previous` \| `next`] | `null`               | ✓        | The direction according to which the corresponding icon is displayed |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationLinkPrevious Props

This component wraps `PaginationLink` and renders a previous chevron with a visually hidden label.

| Name                 | Type     | Default    | Required | Description                     |
| -------------------- | -------- | ---------- | -------- | ------------------------------- |
| `accessibilityLabel` | `string` | `Previous` | ✕        | Accessibility label of the link |
| `href`               | `string` | —          | ✕        | Link URL                        |
| `isDisabled`         | `bool`   | `false`    | ✕        | If true, the link is disabled   |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationLinkNext Props

This component wraps `PaginationLink` and renders a next chevron with a visually hidden label.

| Name                 | Type     | Default | Required | Description                     |
| -------------------- | -------- | ------- | -------- | ------------------------------- |
| `accessibilityLabel` | `string` | `Next`  | ✕        | Accessibility label of the link |
| `href`               | `string` | —       | ✕        | Link URL                        |
| `isDisabled`         | `bool`   | `false` | ✕        | If true, the link is disabled   |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UncontrolledPagination Props

| Name                         | Type                           | Default      | Required | Description                                                         |
| ---------------------------- | ------------------------------ | ------------ | -------- | ------------------------------------------------------------------- |
| `accessibilityLabel`         | `string`                       | `Go to page` | ✕        | Accessibility label prefix for the page links                       |
| `accessibilityLabelNext`     | `string`                       | `Next`       | ✕        | Accessibility label of the next link                                |
| `accessibilityLabelPrevious` | `string`                       | `Previous`   | ✕        | Accessibility label of the previous link                            |
| `defaultPage`                | `number`                       | `1`          | ✕        | The number of the page selected as current page at the first render |
| `onChange`                   | `(pageNumber: number) => void` | -            | ✕        | On page change callback                                             |
| `totalPages`                 | `number`                       | `0`          | ✓        | Total count of pages                                                |
| `visiblePages`               | `number`                       | `5`          | ✕        | Number of displayed pages                                           |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Pagination][pagination] component.

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Button/README.md
[html-element]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[li-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[pagination]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Pagination/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[ul-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
