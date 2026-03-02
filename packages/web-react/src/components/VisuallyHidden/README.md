# VisuallyHidden

The VisuallyHidden component helps improve web accessibility by rendering its content in a way that it's hidden visually but still accessible to screen readers.

## 🚀 Usage

```tsx
import { VisuallyHidden } from '@alma-oss/spirit-web-react';
```

Basic example usage:

```tsx
<VisuallyHidden>Label</VisuallyHidden>
```

Advanced example:

```tsx
<VisuallyHidden elementType="div">Label</VisuallyHidden>
```

### API

| Name          | Type     | Default | Required | Description                          |
| ------------- | -------- | ------- | -------- | ------------------------------------ |
| `children`    | `string` | —       | ✓        | Hidden Label                         |
| `elementType` | `string` | `span`  | ✕        | Type of element used as main wrapper |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
