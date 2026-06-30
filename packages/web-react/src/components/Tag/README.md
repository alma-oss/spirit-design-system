# Tag

Tag is a visual label used to categorize, organize, or indicate the status of items.

```tsx
import { Tag } from '@alma-oss/spirit-web-react';
```

```tsx
<Tag>Tag</Tag>
```

## Color Variants

There are several color variants of `Tag` to choose from: neutral, informative, success, warning, danger, and selected.

Each variant also has a subtle version using the `isSubtle` prop:

```tsx
<Tag>Neutral tag</Tag>
<Tag color="informative">Informative tag</Tag>
<Tag color="success">Success tag</Tag>
<Tag color="warning">Warning tag</Tag>
<Tag color="danger">Danger tag</Tag>
<Tag color="selected">Selected tag</Tag>
```

Subtle variants:

```tsx
<Tag isSubtle>Neutral subtle tag</Tag>
<Tag color="informative" isSubtle>Informative subtle tag</Tag>
<Tag color="success" isSubtle>Success subtle tag</Tag>
<Tag color="warning" isSubtle>Warning subtle tag</Tag>
<Tag color="danger" isSubtle>Danger subtle tag</Tag>
```

## Sizes

`Tag` comes in five available sizes: xsmall, small, medium, large, and xlarge.

```tsx
<Tag size="xsmall">XSmall tag</Tag>
<Tag size="small">Small tag</Tag>
<Tag>Medium tag</Tag>
<Tag size="large">Large tag</Tag>
<Tag size="xlarge">XLarge tag</Tag>
```

## With ControlButton

### ControlButton Size Mapping

| Tag Size | ControlButton Size |
| -------- | ------------------ |
| xsmall   | xsmall             |
| small    | xsmall             |
| medium   | xsmall             |
| large    | small              |
| xlarge   | small              |

```tsx
<Tag elementType="div" color="selected">
  <span>Tag label</span>
  <ControlButton size="xsmall" isSymmetrical aria-label="Remove Tag label">
    <Icon name="close" />
  </ControlButton>
</Tag>
```

## Interactive Tag

Tag can render as a `<button>` or `<a>` element using the `elementType` prop. Hover and active states apply a
dynamically derived background color.

### Button

When `elementType="button"`, `Tag` automatically sets `type="button"` to prevent accidental form submission
(the HTML default for `<button>` is `type="submit"`). You can override it by passing `type` explicitly.

```tsx
<Tag elementType="button">Button tag</Tag>
```

### Link

```tsx
<Tag elementType="a" href="#">
  Link tag
</Tag>
```

## Disabled

Use the `isDisabled` prop to visually disable a `Tag`:

```tsx
<Tag size="small" isDisabled>
  Disabled tag
</Tag>
```

Disabled `Tag` with `ControlButton`:

```tsx
<Tag elementType="div" isDisabled>
  <span>Disabled tag</span>
  <ControlButton size="xsmall" isSymmetrical isDisabled aria-label="Remove Disabled tag">
    <Icon name="close" />
  </ControlButton>
</Tag>
```

Disabled link Tag:

```tsx
<Tag elementType="a" isDisabled role="link" aria-disabled="true">
  Disabled link tag
</Tag>
```

ℹ️ Read more about this pattern at [Scott O'Hara's blog][scott-o-hara-disabling-a-link].

## API

| Name          | Type                                                                     | Default   | Required | Description                     |
| ------------- | ------------------------------------------------------------------------ | --------- | -------- | ------------------------------- |
| `children`    | `ReactNode`                                                              | —         | ✓        | Content of the Tag              |
| `color`       | \[[EmotionColorType][readme-generated-types] \| `neutral` \| `selected`] | `neutral` | ✕        | Color of the component          |
| `elementType` | `React.Element`                                                          | `span`    | ✕        | HTML tag                        |
| `isDisabled`  | `bool`                                                                   | `false`   | ✕        | Whether the tag is disabled     |
| `isSubtle`    | `bool`                                                                   | `false`   | ✕        | If is Subtle color variant used |
| `ref`         | `ForwardedRef<HTMLSpanElement>`                                          | —         | ✕        | Tag element reference           |
| `size`        | [Size Extended dictionary][dictionary-size]                              | `medium`  | ✕        | Size of the Tag                 |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Tag][tag] component.

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[scott-o-hara-disabling-a-link]: https://www.scottohara.me/blog/2021/05/28/disabled-links.html
[tag]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tag/README.md
