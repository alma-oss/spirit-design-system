# Hidden

The Hidden component controls responsive visibility without any visual styling. It allows you to hide content at specific breakpoints while keeping it in the DOM.

## Basic Usage

```tsx
import { Hidden } from '@alma-oss/spirit-web-react';
```

```tsx
<Hidden on="mobile">Desktop and tablet only</Hidden>
```

👉 **Tip:** You can also use the `hideOn` and `hideFrom` [style props][readme-style-props] directly on any component, without needing to wrap it in Hidden.

## Visibility Control

### Hide on Specific Breakpoints

Use the `on` prop to hide content on specific breakpoints only:

```tsx
<Hidden on="mobile">Desktop and tablet content</Hidden>
<Hidden on={['mobile', 'desktop']}>Tablet only content</Hidden>
```

### Hide From Breakpoint Onwards

Use the `from` prop to hide content from a specific breakpoint and larger:

```tsx
<Hidden from="tablet">Mobile only content</Hidden>
<Hidden from="desktop">Mobile and tablet content</Hidden>
```

### Combining Both Props

You can use both `on` and `from` together for complex visibility patterns:

```tsx
<Hidden on="mobile" from="desktop">
  Tablet only content
</Hidden>
```

ℹ️ What happens when you set both `on` (component-specific prop) and `hideOn`
(style prop) at the same time? The `on` prop wins. Since the `from` and `on`
props are forwarded to `hideFrom` and `hideOn` style props respectively, the
component-specific props (`on`/`from`) will take precedence.

## Polymorphic Rendering

Render as any HTML element:

```tsx
<Hidden elementType="div" on="mobile">Content</Hidden>
<Hidden elementType="section" from="tablet">Content</Hidden>
```

## Accessibility

When content is hidden using the Hidden component (`display: none`), it is automatically removed from the
accessibility tree. **You don't need to add `aria-hidden`** — screen readers won't announce hidden content.

### Responsive Content Alternatives

When showing different content at different breakpoints (e.g., full label on desktop, icon on mobile),
you need a **single accessible label** that works regardless of viewport. The visual alternatives should
then be hidden from screen readers using `aria-hidden="true"`.

**Why?** Because `aria-hidden` is static — it hides content from screen readers regardless of whether
`display: none` is applied. If you add `aria-hidden="true"` to responsive content without providing
a separate accessible label, screen readers won't be able to access ANY version of the content.

#### Using `aria-label`

For example, add the `aria-label` attribute to the Button:

```tsx
<Button aria-label="Edit">
  <Icon name="edit" hideFrom="tablet" />
  <Hidden on="mobile" aria-hidden="true">
    Edit
  </Hidden>
</Button>
```

#### Using VisuallyHidden

Alternatively, use the [VisuallyHidden][visually-hidden] component:

```tsx
<Button>
  <Icon name="edit" hideFrom="tablet" />
  <VisuallyHidden>Edit</VisuallyHidden>
  <Hidden on="mobile" aria-hidden="true">
    Edit
  </Hidden>
</Button>
```

In both examples:

- The accessible name comes from `aria-label` or `VisuallyHidden` (always available)
- The visual text inside Hidden is marked `aria-hidden="true"` (prevents duplicate announcements)
- Icons are `aria-hidden` by default

## API

| Name          | Type                                           | Default | Required | Description                  |
| ------------- | ---------------------------------------------- | ------- | -------- | ---------------------------- |
| `elementType` | `ElementType`                                  | `span`  | ✕        | Type of element to render    |
| `from`        | [Breakpoint dictionary][dictionary-breakpoint] | —       | ✕        | Hide from breakpoint onwards |
| `on`          | [Breakpoint dictionary][dictionary-breakpoint] | —       | ✕        | Hide on specific breakpoints |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[visually-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/VisuallyHidden/README.md
