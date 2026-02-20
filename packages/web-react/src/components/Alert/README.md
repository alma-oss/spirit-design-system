# Alert

Alert presents feedback or important information to users.

```jsx
import { Alert } from '@alma-oss/spirit-web-react';
```

```jsx
<Alert color="success">Hey! Pay attention!</Alert>
<Alert color="informative">Hey! Pay attention!</Alert>
<Alert color="warning">Hey! Pay attention!</Alert>
<Alert color="danger">Hey! Pay attention!</Alert>
<Alert color="informative" iconName="warning">Hey! Pay attention!</Alert>
<Alert color="informative" isCentered>Hey! Pay attention!</Alert>
```

## Links in Alert

To ensure links inside Alert inherit the alert's color, use the Link component with `color="inherit"`:

```jsx
<Alert color="success">
  See{' '}
  <Link href="/faq" color="inherit" underlined="always">
    FAQ
  </Link>{' '}
  for more info.
</Alert>
```

The `underlined="always"` prop is recommended for accessibility to ensure links are distinguishable from surrounding text.

## Default Icons According to Color Variant

| Color name    | Icon name     |
| ------------- | ------------- |
| `danger`      | `danger`      |
| `default`     | `info`        |
| `informative` | `info`        |
| `success`     | `check-plain` |
| `warning`     | `warning`     |

## API

| Name           | Type                                            | Default   | Required | Description                |
| -------------- | ----------------------------------------------- | --------- | -------- | -------------------------- |
| `children`     | `ReactNode`                                     | —         | ✓        | Content of the Alert       |
| `color`        | [EmotionColorNamesType][readme-generated-types] | `success` | ✕        | Color of the component     |
| `iconName`     | `string`                                        | `info` \* | ✕        | Icon used in Alert         |
| `isCentered` . | `bool`                                          | `false`   | ✕        | If true, Alert is centered |

(\*) For each emotion color, a default icon is defined.
The icons come from the [Icon package][icon-package], or from your custom source of icons.
Read the section [Default Icons according to Color Variant](#default-icons-according-to-color-variant).

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Alert][alert] component.

⚠️ Please pay attention to the accessibility setting when Alert is dynamically displayed. In case you need to use the component as an information that requires the user's immediate attention,
you can set `role="alert"` as an [additional attribute][readme-additional-attributes].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[alert]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Alert/README.md
[icon-package]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/icons
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
