# Icon

Icons are graphical metaphors or symbols that can be used to complement existing experiences.

## Getting Started

To use this component in your project you need to run the following command using [npm][npm]:

```bash
npm install -S @alma-oss/spirit-icons
```

If you prefer [Yarn][yarn], use the following command instead:

```bash
yarn add @alma-oss/spirit-icons
```

### Dependencies

`@alma-oss/spirit-icons` is required as a **peer dependency** to keep package size as low as possible.
So it will not be automatically installed with `@alma-oss/spirit-web-react`.

- [`@alma-oss/spirit-icons`][icons-package] - Spirit Icons package
- [`html-react-parser`][html-react-parser-package] - HTML to React parser (avoid usage of `dangerouslySetInnerHTML` on the server side)

## Usage

To ensure the `Icon` component functions as expected, wrap your application or the component tree where Icon is used with the `IconsProvider`.
You need to pass the icon set to the provider as its value.

```jsx
import { Icon, IconsProvider } from '@alma-oss/spirit-web-react';
import icons from '@alma-oss/spirit-icons/icons';

<IconsProvider value={icons}>{/* Your Icon, app or component where Icon is used */}</IconsProvider>;
```

### Example

```jsx
import { Icon, IconsProvider } from '@alma-oss/spirit-web-react';
import icons from '@alma-oss/spirit-icons/icons';

<IconsProvider value={icons}>
  <Icon name="warning" />
  Hey! Pay attention!
</IconsProvider>;
```

## Color

You can change the color of the icon by using the `color` attribute.
Available colors are emotion colors, text colors, and the accent colors defined in your design tokens.

### Example

```jsx
import { Icon, IconsProvider } from '@alma-oss/spirit-web-react';
import icons from '@alma-oss/spirit-icons/icons';

<IconsProvider value={icons}>
  <Icon name="warning" color="warning" />
</IconsProvider>;
```

## Full Example

```jsx
import { Icon, IconsProvider } from '@alma-oss/spirit-web-react';
import icons from '@alma-oss/spirit-icons/icons';

<IconsProvider value={icons}>
  <Icon name="warning" color="warning" boxSize={{ mobile: 20, tablet: 30, desktop: 40 }} title="Icon Title" />
  Hey! Pay attention!
</IconsProvider>;
```

## API

| Name      | Type                                                                                                                                                 | Default      | Required | Description                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| `boxSize` | \[`number` \| `Responsive<number>`]                                                                                                                  | 24           | ✕        | Size of the icon, use object to set responsive values, e.g. `{ mobile: 20, tablet: 30, desktop: 40 }` |
| `color`   | \[[AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] \| [TextColorNamesType][readme-generated-types]] | `primary` \* | ✕        | Color of the dualtone icon                                                                            |
| `name`    | `string`                                                                                                                                             | —            | ✓        | Name of the icon                                                                                      |
| `title`   | `string`                                                                                                                                             | —            | ✕        | Title of the icon                                                                                     |

(\*) The default color "Primary" is used only for dualtone icons. For single-tone icons, the default color is inherited from the parent element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For more details about Icons see [Spirit Icons][spirit-icons] package.

[html-react-parser-package]: https://www.npmjs.com/package/html-react-parser
[icons-package]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/icons
[npm]: https://www.npmjs.com/
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[spirit-icons]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/icons/README.md
[yarn]: https://yarnpkg.com/
