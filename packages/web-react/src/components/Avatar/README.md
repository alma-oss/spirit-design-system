# Avatar

The `Avatar` component is used to display a user's profile picture or initials.

```jsx
import { Avatar } from '@alma-oss/spirit-web-react';

<Avatar aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</Avatar>;
```

## Square

Add `isSquare` prop to make the avatar a square.

```jsx
<Avatar isSquare aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</Avatar>
```

## Sizes

The Avatar component is available in all [extended sizes][dictionary-size].

```jsx
<Avatar aria-label="Profile of Jiří Bárta" size="xsmall">
  <span aria-hidden="true">JB</span>
</Avatar>
<Avatar aria-label="Profile of Jiří Bárta" size="small">
  <span aria-hidden="true">JB</span>
</Avatar>
<Avatar aria-label="Profile of Jiří Bárta" size="medium">
  <span aria-hidden="true">JB</span>
</Avatar>
<Avatar aria-label="Profile of Jiří Bárta" size="large">
  <span aria-hidden="true">JB</span>
</Avatar>
<Avatar aria-label="Profile of Jiří Bárta" size="xlarge">
  <span aria-hidden="true">JB</span>
</Avatar>
```

## Responsive Sizes

You can set different avatar sizes for different [breakpoints][dictionary-breakpoint] using a responsive object:

```jsx
<Avatar size={{ mobile: 'xsmall', tablet: 'medium', desktop: 'xlarge' }} aria-label="Profile of Jiří Bárta">
  <svg class="Icon" width="24" height="24" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
  </svg>
</Avatar>
```

## Content

The content of the `Avatar` component can be an image, an icon, or a text string.

### Icon

```jsx
<Avatar size="xsmall" aria-label="Profile of Jiří Bárta">
  <Icon name="profile" />
</Avatar>
<Avatar aria-label="Profile of Jiří Bárta">
  <Icon name="profile" />
</Avatar>
<Avatar aria-label="Profile of Jiří Bárta">
  <Icon name="profile" boxSize={32} />
</Avatar>
```

#### Avatar and Icon Sizes

The size of the icons is automatically adjusted according to the size of the avatar.

| Avatar Size | Icon Size |
| ----------- | --------- |
| xsmall      | 16px      |
| small       | 20px      |
| medium      | 24px      |
| large       | 28px      |
| xlarge      | 32px      |

You can always override the icon size by setting the [`boxSize`][readme-icon-api] prop on the Icon component.

ℹ️ Don't forget to add the `aria-label` attribute for accessible title.

To ensure correct Icon rendering, please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

### Image

Add an image, it will be resized to fit the avatar.

```jsx
<Avatar aria-label="Profile of Jiří Bárta">
  <img src="https://picsum.photos/id/823/162/162" alt="Jiří Bárta" aria-hidden="true" />
</Avatar>
```

ℹ️ Don't forget to add the `aria-label` attribute for accessible title.
The image should have an `alt` attribute set and can be aria-hidden, because the `aria-label`
attribute is set on the container.

### Text

It is possible to use text as the content of the `Avatar` component.
This is useful when you want to display the initials of a user. You need to
take care of the text length and case. The rest is handled by the component.

```jsx
<Avatar aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</Avatar>
```

ℹ️ Don't forget to add the `aria-label` attribute for accessible title, especially when
using an abbreviation. The `aria-hidden` attribute is set on the text span, because the `aria-label`
attribute is set on the container and the abbreviation is not useful for screen readers.

## API

| Name          | Type                                                                                                                                | Default  | Required | Description                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                                                                                                                         | `null`   | ✓        | Content of the Avatar                                                                                 |
| `elementType` | `ElementType`                                                                                                                       | `button` | ✕        | Type of element                                                                                       |
| `isSquare`    | `bool`                                                                                                                              | `false`  | ✕        | If true, Avatar is square                                                                             |
| `ref`         | `ForwardedRef<HTMLButtonElement>`                                                                                                   | —        | ✕        | Avatar element reference                                                                              |
| `size`        | \[[Size Extended dictionary][dictionary-size] \| [Responsive][readme-generated-types]<[Size Extended dictionary][dictionary-size]>] | `medium` | ✕        | Size of the Avatar. Can be a single size or responsive object with mobile/tablet/desktop breakpoints. |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-icon-api]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#api
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
