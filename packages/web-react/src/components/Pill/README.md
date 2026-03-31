# Pill

Pills can be used to show count or label.

## Basic Usage

```tsx
import { Pill } from '@alma-oss/spirit-web-react';
```

```tsx
<Pill>3</Pill>
```

## Color Variants

`Pill` supports selected, neutral, and emotion color variants.

```tsx
<Pill color="selected">333</Pill>
<Pill color="neutral">333</Pill>
<Pill color="success">3</Pill>
<Pill color="informative">3</Pill>
<Pill color="warning">3</Pill>
<Pill color="danger">3</Pill>
```

## Subtle Variant

Use the `isSubtle` prop to switch the Pill to its subtle color scheme:

```tsx
<Pill color="success" isSubtle>
  3
</Pill>
```

## Content Length

Pill works well for short labels and numeric counts, but it can also render longer content when needed:

```tsx
<Pill color="selected">333</Pill>
```

## API

| Name       | Type                                                                          | Default    | Required | Description                         |
| ---------- | ----------------------------------------------------------------------------- | ---------- | -------- | ----------------------------------- |
| `children` | `ReactNode`                                                                   | —          | ✓        | Content of the Pill                 |
| `color`    | \[[EmotionColorNamesType][readme-generated-types] \| `selected` \| `neutral`] | `selected` | ✕        | Color of the component              |
| `isSubtle` | `bool`                                                                        | `false`    | ✕        | Whether the Pill uses subtle colors |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Pill][pill] component

[pill]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Pill/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
