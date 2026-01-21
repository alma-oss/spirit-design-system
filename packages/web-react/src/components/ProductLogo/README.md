# ProductLogo

The ProductLogo component is used to display the logo of the product.

```jsx
import { ProductLogo } from '@spirit/web-react';

<ProductLogo>
  <!-- Logo goes here -->
</ProductLogo>;
```

## Content

The content of the ProductLogo component can be an image or svg.

### Image

```jsx
<ProductLogo>
  <img src="path-to-logo" alt="Product Logo" height="60" width="120" />
</ProductLogo>
```

👉 To make the logo accessible, the image should have an `alt` attribute, or, if using inline SVG, the `<title>` element
should be present.

👉 To avoid unexpected layout shifts, it is strongly recommended to specify the `width` and `height` of the embedded
image.

### SVG

```jsx
<ProductLogo>
  <svg width="300" height="130">
    <rect width="200" height="100" x="10" y="10" rx="20" ry="20" fill="#fff" />
  </svg>
</ProductLogo>
```

## API

| Name       | Type        | Default | Required | Description                |
| ---------- | ----------- | ------- | -------- | -------------------------- |
| `children` | `ReactNode` | `null`  | ✓        | Content of the ProductLogo |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
