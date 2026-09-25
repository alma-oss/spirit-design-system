# Skeleton

Skeleton is a component that can be used to indicate that the content is loading or that the content is not yet
available.

```tsx
import { SkeletonText, SkeletonHeading, SkeletonShape } from '@alma-oss/spirit-web-react';
```

On the parent element, you must use `aria-busy` and `aria-live` attributes to indicate that the content inside is
loading.
The `aria-busy` is set to `true` when the content is loading, and `aria-live` is set to `polite` to announce the loading
state to screen readers.

## SkeletonText

SkeletonText defines a placeholder for loading the Text component.

```tsx
<SkeletonText/>
<SkeletonText lines={2}/>
<SkeletonText lines={2} size="small"/>
<SkeletonText lines={2} width={240}/>
<SkeletonText lines={2} width="60%"/>
```

A pixel `width` is converted to `rem`. A percentage is applied as-is. The last line of a multi-line skeleton is `80%` of that width.

### API

| Name    | Type                               | Default  | Required | Description                                                                      |
| ------- | ---------------------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `size`  | [Size dictionary][dictionary-size] | `medium` | ✕        | Size variant                                                                     |
| `lines` | `number`                           | 1        | ✕        | Specifies an number of lines                                                     |
| `width` | `number` or percentage             | `100%`   | ✕        | Width in **px** (converted to `rem` internally), or a percentage such as `'60%'` |

## SkeletonHeading

SkeletonHeading defines a placeholder for loading the Heading component.

```tsx
<SkeletonHeading/>
<SkeletonHeading lines={2}/>
<SkeletonHeading lines={2} size="small"/>
<SkeletonHeading lines={2} width={240}/>
<SkeletonHeading lines={2} width="50%"/>
```

A pixel `width` is converted to `rem`. A percentage is applied as-is. The last line of a multi-line skeleton is `80%` of that width.

### API

| Name    | Type                               | Default  | Required | Description                                                                      |
| ------- | ---------------------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `size`  | [Size dictionary][dictionary-size] | `medium` | ✕        | Size variant                                                                     |
| `lines` | `number`                           | 1        | ✕        | Specifies an number of lines                                                     |
| `width` | `number` or percentage             | `100%`   | ✕        | Width in **px** (converted to `rem` internally), or a percentage such as `'50%'` |

## SkeletonShape

SkeletonShape defines a placeholder for loading the Shape component.

```tsx
<SkeletonShape width={100} height={100}/>
<SkeletonShape width={100} height={100} borderRadius="full"/>
<SkeletonShape width={100} height={100} borderRadius={{ mobile: '100', tablet: '400', desktop: '500' }}/>
<SkeletonShape width="50%" height={100}/>
<SkeletonShape width="100%" height="50%"/>
```

### Shape Size Units

The `width` and `height` props accept:

- a **px** value as a plain number, without the unit suffix
- a **percentage** string, for example `'100%'`

Pixel numbers are converted to `rem` internally using the Spirit base font size (16 px by default),
so the shape scales with the user's root font-size preference. Percentage strings are applied as-is.

```tsx
// 100 px → '6.25rem' at the default 16 px base
<SkeletonShape width={100} height={100} />

// percentage is kept as a CSS percentage
<SkeletonShape width="100%" height="50%" />
```

### API

| Name           | Type                                        | Default | Required | Description                                                                                                       |
| -------------- | ------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `borderRadius` | [Radius dictionary][radius-size] \ `object` | `400`   | ✕        | Border radius variant, use object to set responsive values, e.g. { mobile: '200', tablet: '300', desktop: '400' } |
| `width`        | `number` or percentage                      | ✕       | ✓        | Width in **px** (converted to `rem` internally), or a percentage such as `'100%'`                                 |
| `height`       | `number` or percentage                      | ✕       | ✓        | Height in **px** (converted to `rem` internally), or a percentage such as `'100%'`                                |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Full Example

```tsx
<Grid aria-busy="true" aria-live="polite">
  <GridItem>
    <SkeletonShape width={100} height={100} borderRadius="full" />
  </GridItem>
  <GridItem columnStart={2} columnEnd={12}>
    <SkeletonHeading size="medium" lines={1} UNSAFE_className="mb-900" />
    <SkeletonText size="medium" lines={2} />
  </GridItem>
</Grid>
```

For detailed information see [Skeleton][skeleton] component.

[skeleton]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Skeleton/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[radius-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#border
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
