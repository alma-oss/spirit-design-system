# Pagination

## Example with the Current Item in the First Place

```jsx
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

```jsx
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

```jsx
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

```jsx
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

## Uncontrolled Pagination

```jsx
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

| Name                 | Type          | Default                   | Required | Description                            |
| -------------------- | ------------- | ------------------------- | -------- | -------------------------------------- |
| `accessibilityLabel` | `string`      | `Go to page {pageNumber}` | ✕        | Accessibility label of the link        |
| `elementType`        | `ElementType` | `a`                       | ✕        | Type of an element                     |
| `isCurrent`          | `bool`        | `null`                    | ✕        | If true, the link is marked as current |
| `pageNumber`         | `number`      | —                         | ✓        | Page number, hidden for screen readers |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationButtonLink Props

This component extends the [Button][button] component with directional arrows and a hidden label.

| Name                 | Type                    | Default              | Required | Description                                                          |
| -------------------- | ----------------------- | -------------------- | -------- | -------------------------------------------------------------------- |
| `accessibilityLabel` | `string`                | `Previous` \| `Next` | ✕        | Accessibility label of the link (defaults based on direction)        |
| `direction`          | \[`previous` \| `next`] | `null`               | ✓        | The direction according to which the corresponding icon is displayed |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationLinkPrevious Props

This component extends the `PaginationButtonLink` component.

| Name                 | Type     | Default    | Required | Description                     |
| -------------------- | -------- | ---------- | -------- | ------------------------------- |
| `accessibilityLabel` | `string` | `Previous` | ✕        | Accessibility label of the link |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PaginationLinkNext Props

This component extends the `PaginationButtonLink` component.

| Name                 | Type     | Default | Required | Description                     |
| -------------------- | -------- | ------- | -------- | ------------------------------- |
| `accessibilityLabel` | `string` | `Next`  | ✕        | Accessibility label of the link |

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
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[ul-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
