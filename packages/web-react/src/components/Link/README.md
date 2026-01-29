# Link

Link allows users to follow navigation.

```jsx
<Link href="/" color="primary" isDisabled />
```

## Underlined

You can customize the underline behavior for links with three different settings:

### Hover

This is the **default** value, which makes the underline visible only when the component is hovered over.

```jsx
<Link href="/" underlined="hover">
  …
</Link>
```

Alternatively, you can omit this prop:

```jsx
<Link href="/">…</Link>
```

### Always

The underline is constantly visible, regardless of interaction.

```jsx
<Link href="/" underlined="always">
  …
</Link>
```

### Never

The underline is never visible, even when the link is hovered over.

```jsx
<Link href="/" underlined="never">
  …
</Link>
```

## Visited Style Allowed

You can allow the link to have visited state style with the `hasVisitedStyleAllowed` prop.

```jsx
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

```jsx
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

```jsx
import { forwardRef } from 'react
import { Link } from '@alma-oss/spirit-web-react';
import { PolymorphicRef } from '@alma-oss/spirit-web-react/types';

type LinkProps<T extends ElementType = 'button'> = SpiritLinkProps<T, 'tertiary'>;

const CustomLinkRoot = <T extends ElementType = 'button'>(
  props: LinkProps<T>,
  ref: PolymorphicRef<T> // <-- Type `ref` prop with the `PolymorphicRef` here
): JSX.Element => (
  <Link
      ref={ref}
      elementType="button"
      {...props}
  />
);

export const CustomLink = forwardRef(CustomLinkRoot);
```

[dictionary-color]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#color
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
