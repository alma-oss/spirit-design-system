# Breadcrumbs

## Usage

### Basic

Define breadcrumb items as an array type of `BreadcrumbsItem[]`.

```tsx
const items = [
  {
    title: 'Root',
    url: '#rootUrl',
  },
  {
    title: 'Category',
    url: '#categoryUrl',
  },
  {
    title: 'Subcategory',
    url: '#subcategoryUrl',
  },
  {
    title: 'Current page',
    url: '#currentUrl',
  },
];
```

Simply pass the breadcrumbs array as a prop. A localized Back item is rendered on small viewports by default.

```tsx
<Breadcrumbs items={items} />
```

Override the Back label or the landmark name with `strings`:

```tsx
<Breadcrumbs items={items} strings={{ label: { back: { key: 'navigation.back' } } }} />
```

### Custom Usage

Use custom content for the ordered list as component's children instead of passing breadcrumb items array via props:

```tsx
<Breadcrumbs>
  {items.map((item) => (
    <li key={`BreadcrumbsItem_${item.title}`}>
      <Link color="primary" underlined="always">
        {item.title}
      </Link>
    </li>
  ))}
</Breadcrumbs>
```

### API

| Name          | Type                                                 | Default | Required | Description                                                                                                     |
| ------------- | ---------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                                          | —       | ✕        | Custom content to override items rendering from array                                                           |
| `elementType` | `ElementType`                                        | `nav`   | ✕        | Type of element used as wrapper                                                                                 |
| `goBackTitle` | `string`                                             | —       | ✕        | _Deprecated, use `strings.label.back`_                                                                          |
| `items`       | `BreadcrumbsItem[]`                                  | —       | ✕        | Navigation menu items                                                                                           |
| `strings`     | `{ ariaLabel?, label?: { back? } }`                  | —       | ✕        | Optional copy overrides; see [Translations](#translations)                                                          |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Translations

Override optional copy with [`strings`][readme-component-strings]. Omitted keys use the built-in English default.

| Key              | Default key               | English default | Description                                      |
| ---------------- | ------------------------- | --------------- | ------------------------------------------------ |
| `label.back`     | `breadcrumbs.back`        | `Go back`       | Visible go-back item (small viewports)           |
| `ariaLabel.nav`  | `breadcrumbs.ariaLabel`   | `Breadcrumb`    | Accessible name of the landmark                  |

### Deprecation Notice

The `goBackTitle` prop is deprecated and will be removed in v6.

### Migration Guide

```diff
- <Breadcrumbs goBackTitle="Back" />
+ <Breadcrumbs strings={{ label: { back: { key: 'navigation.back' } } }} />
```

## BreadcrumbsItem

Use the `BreadcrumbsItem` component for the ordered list as the component's children instead of passing the breadcrumb items array via props:

```tsx
<Breadcrumbs>
  {items.map((item, index) => (
    <BreadcrumbsItem key={`BreadcrumbsItem_${item.title}`} isCurrent={items.length === index - 1} href={item.url}>
      {item.title}
    </BreadcrumbsItem>
  ))}
</Breadcrumbs>
```

### API

| Name            | Type        | Default         | Required | Description                                           |
| --------------- | ----------- | --------------- | -------- | ----------------------------------------------------- |
| `children`      | `ReactNode` | —               | ✕        | Children node                                         |
| `href`          | `string`    | —               | ✕ \*     | URL, if not set, the item is rendered as a plain text |
| `iconNameEnd`   | `string`    | `chevron-right` | ✕        | Icon name at the end of the item                      |
| `iconNameStart` | `string`    | `chevron-left`  | ✕        | Icon name at the start of the item                    |
| `isCurrent`     | `boolean`   | `false`         | ✕        | Whether is the item the current page                  |
| `isGoBackOnly`  | `boolean`   | `false`         | ✕        | Whether should be displayed in go back mode           |

(\*) Optional only for the current page.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Dealing with Long Titles

When you need to shorten the title of the BreadcrumbsItem the preferred way is to use platform native helpers.
There are multiple ways in JavaScript which will truncate a string for you like `.slice` or `.substring`, e.g. `str.slice(0, num) + '…'`.

Additional option is to use helper class `text-truncate` with defined width.

You can also use any of the existing [npm packages which deal with truncating the string][truncate-npm-search].

For comprehensive guidance on handling text truncation, translations, and multiple string length scenarios, see the [Content Truncating Guidelines][truncation].

For detailed information see [Breadcrumbs][breadcrumbs] component.

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[breadcrumbs]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Breadcrumbs/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-component-strings]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#component-strings
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[truncation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/TRUNCATING.md#breadcrumbs
[truncate-npm-search]: https://www.npmjs.com/search?q=truncate
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
