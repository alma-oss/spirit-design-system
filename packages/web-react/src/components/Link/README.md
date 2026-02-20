# Link

Link allows users to follow navigation.

```tsx
<Link href="/" color="primary" isDisabled />
```

## Colors

Link supports four color options: `primary` (default), `secondary`, `tertiary`, and `inherit`.

### Inherit Color

The `inherit` color option allows links to inherit color from their parent element. This is useful when links need to match the color of their container, such as in Alert or other colored components.

```tsx
<Alert color="success">
  See{' '}
  <Link href="/faq" color="inherit" underlined="always">
    FAQ
  </Link>{' '}
  for more info.
</Alert>
```

**Accessibility Note:** When using `color="inherit"`, it's recommended to set `underlined="always"` to ensure links are visually distinguishable from surrounding text.

```tsx
<Link href="/" color="inherit" underlined="always">
  Inherit Color Link
</Link>
```

## Underlined

You can customize the underline behavior for links with three different settings:

### Hover

This is the **default** value, which makes the underline visible only when the component is hovered over.

```tsx
<Link href="/" underlined="hover">
  …
</Link>
```

Alternatively, you can omit this prop:

```tsx
<Link href="/">…</Link>
```

### Always

The underline is constantly visible, regardless of interaction.

```tsx
<Link href="/" underlined="always">
  …
</Link>
```

### Never

The underline is never visible, even when the link is hovered over.

```tsx
<Link href="/" underlined="never">
  …
</Link>
```

## Visited Style Allowed

You can allow the link to have visited state style with the `hasVisitedStyleAllowed` prop.

```tsx
<Link href="/" hasVisitedStyleAllowed>
  …
</Link>
```

## API

| Name                     | Type                                      | Default   | Required | Description                      |
| ------------------------ | ----------------------------------------- | --------- | -------- | -------------------------------- |
| `color`                  | [Link Color dictionary][dictionary-color] | `primary` | ✕        | Color of the link                |
| `elementType`            | `ElementType`                             | `a`       | ✕        | Type of element used as          |
| `hasVisitedStyleAllowed` | `bool`                                    | `false`   | ✕        | Allow link to have visited style |
| `href`                   | `string`                                  | —         | ✕        | Link's href attribute            |
| `isDisabled`             | `bool`                                    | `false`   | ✕        | Whether is the link disabled     |
| `ref`                    | `ForwardedRef<HTMLAnchorElement>`         | —         | ✕        | Link element reference           |
| `underlined`             | `hover` \| `always` \| `never`            | `hover`   | ✕        | When is the link underlined      |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Link classes are fabricated using `useLinkStyleProps` hook. You can use it to create your own custom Link component.

```tsx
const CustomLink = (props: SpiritLinkProps): JSX.Element => {
  const { classProps, props: modifiedProps, children } = useLinkStyleProps(props);

  return (
    <a {...modifiedProps} href={props.href} className={classProps}>
      {children}
    </a>
  );
};
```

## Custom Polymorphic Component

If you are using `forwardRef`, use the `PolymorphicRef` type for the reference.

```tsx
import { forwardRef } from 'react';
import { Link } from '@alma-oss/spirit-web-react';
import { PolymorphicRef } from '@alma-oss/spirit-web-react/types';

type LinkProps<T extends ElementType = 'button'> = SpiritLinkProps<T, 'tertiary'>;

const CustomLinkRoot = <T extends ElementType = 'button'>(
  props: LinkProps<T>,
  ref: PolymorphicRef<T>, // <-- Type `ref` prop with the `PolymorphicRef` here
): JSX.Element => <Link ref={ref} elementType="button" {...props} />;

export const CustomLink = forwardRef(CustomLinkRoot);
```

[dictionary-color]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#color
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
