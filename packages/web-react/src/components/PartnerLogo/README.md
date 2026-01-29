# PartnerLogo

PartnerLogo is a component designed to display the partner's logo (e.g. advertiser, business partner, etc.).

```jsx
import { PartnerLogo } from '@alma-oss/spirit-web-react';

<PartnerLogo>{/* Logo goes here */}</PartnerLogo>;
```

## Sizes

The PartnerLogo component is available in [sizes][dictionary-size].

```jsx
<PartnerLogo size="small">
  {/* Logo goes here */}
</PartnerLogo>
<PartnerLogo size="medium">
  {/* Logo goes here */}
</PartnerLogo>
<PartnerLogo size="large">
  {/* Logo goes here */}
</PartnerLogo>
```

## Responsive Size

To create a PartnerLogo with responsive size, pass an object as the value for the `size` property, using [breakpoint][dictionary-breakpoint] keys to specify different size for each screen size.

```jsx
<PartnerLogo size={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}>{/* Logo goes here */}</PartnerLogo>
```

ℹ️ You can also make the logo adjust to the size of the container in which it is placed. See [Fluid Size](#fluid-size) section for more details.

## Disabled Safe Area

The PartnerLogo component can be displayed without the safe area (padding). Use `hasSafeArea` prop set to `false` to disable safe area around logo.

```jsx
<PartnerLogo hasSafeArea={false}>{/* Logo goes here */}</PartnerLogo>
```

### Fluid Size

To adjust the PartnerLogo to the size of its container, use the `isFluid` prop. This allows the logo to scale while preserving its aspect ratio
and ensures it remains vertically and horizontally aligned within the container.

```jsx
<PartnerLogo isFluid>{/* Logo goes here */}</PartnerLogo>
```

## Content

The content of the PartnerLogo component can be an image or svg.

### Image

```jsx
<PartnerLogo>
  <img src="path-to-logo" alt="Partner Logo" />
</PartnerLogo>
```

👉 To make the logo accessible, the image should have an `alt` attribute, or, if using inline SVG, the `<title>` element
should be present.

### SVG

```jsx
<PartnerLogo>
  <svg width="300" height="130">
    <title>Partner Logo</title>
    <rect width="200" height="100" x="10" y="10" rx="20" ry="20" fill="#fff" />
  </svg>
</PartnerLogo>
```

## API

| Name          | Type                                                                   | Default  | Required | Description                                                   |
| ------------- | ---------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------- |
| `children`    | `ReactNode`                                                            | `null`   | ✓        | Content of the PartnerLogo                                    |
| `hasSafeArea` | `boolean`                                                              | `true`   | ✕        | If false, the PartnerLogo is displayed without safe area      |
| `isFluid`     | `boolean`                                                              | `false`  | ✕        | If true, the PartnerLogo adjusts to the size of its container |
| `size`        | \[[Size dictionary][dictionary-size] \| `Responsive<Size dictionary>`] | `medium` | ✕        | Size of the PartnerLogo                                       |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
