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

The `ControlButton` inside `Tag` requires the
[expanded size scale][expanded-size-scale] and [Tag appearance](#feature-flag-appearance) features to be enabled.

### ControlButton Size Matching

| Tag Size | ControlButton Size |
| -------- | ------------------ |
| xsmall   | xsmall             |
| small    | small              |
| medium   | small              |
| large    | medium             |
| xlarge   | medium             |

```tsx
<div className="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance">
  <Tag elementType="div" color="selected">
    <span>Tag label</span>
    <ControlButton size="small" isSymmetrical aria-label="Remove Tag label">
      <Icon name="close" />
    </ControlButton>
  </Tag>
</div>
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
<div className="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance">
  <Tag elementType="div" isDisabled>
    <span>Disabled tag</span>
    <ControlButton size="small" isSymmetrical isDisabled aria-label="Remove Disabled tag">
      <Icon name="close" />
    </ControlButton>
  </Tag>
</div>
```

## Feature Flag: Appearance

Enable the new `Tag` layout with explicit height and inside spacing by wrapping `Tag` in an element
with the `spirit-feature-enable-v5-tag-appearance` CSS class:

```tsx
<div className="spirit-feature-enable-v5-tag-appearance">
  <Tag>Tag</Tag>
</div>
```

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
[expanded-size-scale]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md#feature-flag-expanded-size-scale
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[tag]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tag/README.md
