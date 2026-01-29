# Header and HeaderDialog

The Header is a highly variable and customizable component. It comes in several
design variants and provides a handful of building blocks you can use to achieve
your specific design goals.

The Header is a composition of several subcomponents:

- [Header](#minimal-header)
  - [HeaderMobileActions](#mobile-only-actions)
  - [HeaderDesktopActions](#desktop-only-actions)
    - [HeaderNav](#navigation)
      - [HeaderNavItem](#navigation)
        - [HeaderLink](#navigation)
- [HeaderDialog](#header-dialog)
  - [HeaderDialogCloseButton](#close-button)
  - [HeaderDialogActions](#primary-and-secondary-actions)
    - [HeaderDialogNav](#navigation-1)
      - [HeaderDialogNavItem](#navigation-1)
        - [HeaderDialogLink](#navigation-1)
        - [HeaderDialogText](#navigation-1)

## ⚠️ DEPRECATION NOTICE

The component will be removed in the next major version. The component will be replaced by the current implementation of the `Header`
and related subcomponents with the `UNSTABLE_Header` component (which will later be renamed to `Header`).
The `UNSTABLE_Header` is designed for use in composition with `Navigation` and `Drawer` components.

Please see [UNSTABLE_Header][unstable-header-component] component documentation.

[What are deprecations?][readme-deprecations]

## Accessibility Guidelines

👉 The animation effect of this component is dependent on the
`prefers-reduced-motion` media query.

🌍 Although we don't need it yet, this component experimentally supports RTL
languages (because just a single line had to be added to make it all work 🎉).

## Minimal Header

Without any modifier, Header is ready to contain necessary blocks in a classic
left-to-right layout (in LTR documents). Please note it is fully transparent
unless you specify a color variant.

```jsx
<Header>
  <Link href="/">
    <ProductLogo>
      <img src="https://www.example.com/logo.png" width="65" height="24" alt="Spirit" />
    </ProductLogo>
  </Link>
</Header>
```

## Color Variants

Currently, Header comes in two color variants: **primary** and **transparent**
(for non-solid backgrounds like gradients or images). Use the `color` property
to apply the desired background color to Header.

```jsx
<Header color="transparent">
  <Link href="/">
    <ProductLogo>
      <img src="https://www.example.com/logo.png" width="65" height="24" alt="Spirit" />
    </ProductLogo>
  </Link>
</Header>
```

## Simple Header

The `isSimple` modifier makes the header bar slightly shorter and aligns its
content to the center. Use this design variant when all you need on the page is
just branding.

```jsx
<Header isSimple>
  <Link href="/">
    <ProductLogo>
      <img src="https://www.example.com/logo.png" width="65" height="24" alt="Spirit" />
    </ProductLogo>
  </Link>
</Header>
```

## API

| Name       | Type                           | Default       | Required | Description                         |
| ---------- | ------------------------------ | ------------- | -------- | ----------------------------------- |
| `children` | `ReactNode`                    | —             | ✕        | Children node                       |
| `color`    | \[`primary` \| `transparent`\] | `transparent` | ✕        | Color variant                       |
| `isSimple` | `bool`                         | `false`       | ✕        | Shorter, centered version of Header |

The component implements the [`HTMLElement`][mdn-api-html-element] interface.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Supported Content

To create a responsive header with top-level navigation, there are the following
building blocks to use:

1. Inside Header:
   1. mobile-only actions, including toggle button by default,
   2. desktop-only actions with primary and secondary action slots.
2. Inside Header Dialog:
   1. primary actions slot (all [breakpoints][dictionary-breakpoint]),
   2. secondary actions slot (all breakpoints).

## Header

### Mobile-Only Actions

Slot for actions that are intended to display on mobile and tablet screens only.
It holds the toggle button by default, but you can add as many custom elements
as the free space in Header allows.

```jsx
<HeaderMobileActions dialogId="my-header-dialog" />
```

Toggle button is already part of the mobile actions component. It is linked to
the [Header Dialog](#header-dialog) via the `dialogId` prop.

#### Custom Mobile Actions

You can place any custom content into the mobile actions component:

```jsx
<HeaderMobileActions dialogId="my-header-dialog">{/* Mobile-only actions */}</HeaderMobileActions>
```

#### API

| Name              | Type                                           | Default | Required | Description                     |
| ----------------- | ---------------------------------------------- | ------- | -------- | ------------------------------- |
| `children`        | `ReactNode`                                    | —       | ✕        | Children node                   |
| `dialogId`        | `string`                                       | —       | ✓        | ID of the linked HeaderDialog   |
| `isOpen`          | `bool`                                         | `false` | ✓        | Dialog open state               |
| `menuToggleLabel` | `string`                                       | `Menu`  | ✕        | Label of the menu toggle button |
| `onOpen`          | `(event: ClickEvent or KeyboardEvent) => void` | —       | ✓        | Callback for dialog when opened |

The component implements the [`HTMLElement`][mdn-api-html-element] interface.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Desktop-Only Actions

As the name suggests, desktop-only actions are intended to display on desktop screens only. They generally work as flex
containers that define vertical alignment and spacing.

If you need to align actions to the end of the Header, use the `isAtEnd` prop.

👉 It is critical to **make sure all your actions fit the Header on the
desktop breakpoint**. Spirit intentionally does not provide any overflow
control here.

```jsx
<HeaderDesktopActions aria-label="Main navigation">
  {/* Desktop-only actions */}
</HeaderDesktopActions>
<HeaderDesktopActions isAtEnd>
  {/* Desktop-only actions aligned to the end */}
</HeaderDesktopActions>
```

#### API

| Name       | Type        | Default | Required | Description                                 |
| ---------- | ----------- | ------- | -------- | ------------------------------------------- |
| `children` | `ReactNode` | —       | ✕        | Children node                               |
| `isAtEnd`  | `bool`      | `false` | ✕        | If true, the actions are aligned to the end |

The component implements the [`HTMLElement`][mdn-api-html-element] interface.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

#### Navigation

Navigation is designed to live in either of the action slots.

👉 As of now, only single-level navigation is supported. You may consider
using the [Header Dialog](#header-dialog) for other use cases such as the user
menu.

```jsx
<HeaderNav>
  <HeaderNavItem>
    <HeaderLink href="/" isCurrent>
      Job offers
    </HeaderLink>
  </HeaderNavItem>
  <HeaderNavItem>
    <HeaderLink href="/">Part-time jobs</HeaderLink>
  </HeaderNavItem>
  <HeaderNavItem>
    <HeaderLink href="/">Inspiration</HeaderLink>
  </HeaderNavItem>
  <HeaderNavItem>
    <HeaderLink href="/">Replies</HeaderLink>
  </HeaderNavItem>
  <HeaderNavItem>
    <HeaderLink href="/">Employers</HeaderLink>
  </HeaderNavItem>
</HeaderNav>
```

Both links and buttons are supported:

```jsx
<HeaderNav>
  <HeaderNavItem>
    <HeaderLink href="/">Link item</HeaderLink>
  </HeaderNavItem>
  <HeaderNavItem>
    <HeaderButton>Button item</HeaderButton>
  </HeaderNavItem>
</HeaderNav>
```

#### Other Content

You can avoid using the [HeaderNav](#navigation) for standalone links. That way, you can combine links and buttons in
the same container:

```jsx
<HeaderDesktopActions isAtEnd>
  <HeaderButton>Marian</HeaderButton>
  <Button color="primary">Sign in</Button>
</HeaderDesktopActions>
```

##### HeaderNav API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component further inherits properties from the [`<ul>`][mdn-ul-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderNavItem API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component further inherits properties from the [`<li>`][mdn-li-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderLink API

| Name          | Type          | Default | Required | Description          |
| ------------- | ------------- | ------- | -------- | -------------------- |
| `children`    | `ReactNode`   | —       | ✕        | Children node        |
| `elementType` | `ElementType` | `a`     | ✕        | Type of element      |
| `isCurrent`   | `bool`        | `false` | ✕        | Mark link as current |

The component further inherits properties from the [`<a>`][mdn-a-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderButton API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component further inherits properties from the [`<button>`][mdn-button-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Header Dialog

Header Dialog is Spirit's solution for responsive navigation and selected use
cases such as the user menu. Please note Header Dialog is not intended to be
used for second-level navigation in general.

```jsx
const [isOpen, setOpen] = useState(false);

<HeaderDialog id="my-header-dialog" isOpen={isOpen} onClose={() => setOpen(false)}>
  {/* Close button with primary and secondary actions */}
</HeaderDialog>;
```

### API

| Name       | Type                                           | Default | Required | Description                            |
| ---------- | ---------------------------------------------- | ------- | -------- | -------------------------------------- |
| `children` | `ReactNode`                                    | —       | ✕        | Children node                          |
| `id`       | `string`                                       | —       | ✓        | ID to be linked in HeaderMobileActions |
| `isOpen`   | `bool`                                         | `false` | ✓        | Open state                             |
| `onClose`  | `(event: ClickEvent or KeyboardEvent) => void` | —       | ✓        | Callback for dialog when closed        |

The component further inherits properties from the [`<dialog>`][mdn-dialog-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Close Button

HeaderDialogCloseButton contains all necessary handles to control parent dialog.

```jsx
<HeaderDialogCloseButton />
```

#### API

| Name    | Type     | Default | Required | Description                     |
| ------- | -------- | ------- | -------- | ------------------------------- |
| `label` | `string` | `Close` | ✕        | Label of the menu toggle button |

The component further inherits properties from the [`<button>`][mdn-button-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Primary and Secondary Actions

There are two slots for actions inside Header Dialog: primary actions slot and
the optional secondary actions slot.

```jsx
<HeaderDialogActions aria-label="Main navigation">
  {/* Primary actions */}
</HeaderDialogActions>
<HeaderDialogActions color="secondary">
  {/* Secondary actions */}
</HeaderDialogActions>
```

#### API

| Name       | Type                        | Default   | Required | Description   |
| ---------- | --------------------------- | --------- | -------- | ------------- |
| `children` | `ReactNode`                 | —         | ✕        | Children node |
| `color`    | \[`primary` \| `secondary`] | `primary` | ✕        | Color variant |

The component implements the [`HTMLElement`][mdn-api-html-element] interface.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

#### Navigation

Navigation capabilities are very similar to those of Header. All principles
apply here as well, with the only difference in component names starting with
`HeaderDialog` instead of `Header`.

```jsx
<HeaderDialogNav>
  <HeaderDialogNavItem>
    <HeaderDialogLink href="/" isCurrent>
      Job offers
    </HeaderDialogLink>
  </HeaderDialogNavItem>
  <HeaderDialogNavItem>
    <HeaderDialogLink href="/">Part-time jobs</HeaderDialogLink>
  </HeaderDialogNavItem>
  <HeaderDialogNavItem>
    <HeaderDialogLink href="/">Inspiration</HeaderDialogLink>
  </HeaderDialogNavItem>
  <HeaderDialogNavItem>
    <HeaderDialogLink href="/">Replies</HeaderDialogLink>
  </HeaderDialogNavItem>
  <HeaderDialogNavItem>
    <HeaderDialogLink href="/">Employers</HeaderDialogLink>
  </HeaderDialogNavItem>
</HeaderDialogNav>
```

Navigation items can be links, buttons, or just text:

```jsx
<HeaderDialogNav>
  <HeaderDialogNavItem>
    <HeaderDialogLink href="/">Link item</HeaderDialogLink>
  </HeaderDialogNavItem>
  <HeaderDialogNavItem>
    <HeaderDialogButton>Button item</HeaderDialogButton>
  </HeaderDialogNavItem>
  <HeaderDialogNavItem>
    <HeaderDialogText>Text item</HeaderDialogText>
  </HeaderDialogNavItem>
</HeaderDialogNav>
```

##### HeaderDialogNav API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component further inherits properties from the [`<ul>`][mdn-ul-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderDialogNavItem API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component further inherits properties from the [`<li>`][mdn-li-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderDialogLink API

| Name          | Type          | Default | Required | Description          |
| ------------- | ------------- | ------- | -------- | -------------------- |
| `children`    | `ReactNode`   | —       | ✕        | Children node        |
| `elementType` | `ElementType` | `a`     | ✕        | Type of element      |
| `isCurrent`   | `bool`        | `false` | ✕        | Mark link as current |

The component further inherits properties from the [`<a>`][mdn-a-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderDialogButton API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component further inherits properties from the [`<button>`][mdn-button-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

##### HeaderDialogText API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

The component implements the [`HTMLElement`][mdn-api-html-element] interface.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Composition

This is how all supported building blocks of the Header build up the complete
composition:

```jsx
<Header>
  {/* Branding */}
  <HeaderMobileActions dialogId="header-dialog-example" isOpen={isOpen} onOpen={handleOpen}>
    {/* Optional mobile-only actions */}
  </HeaderMobileActions>
  <HeaderDesktopActions aria-label="Navigation">
    {/* Desktop-only primary actions */}
    <HeaderNav>
      <HeaderNavItem>
        <HeaderLink href="/">Job offers</HeaderLink>
      </HeaderNavItem>
      {/* … */}
    </HeaderNav>
  </HeaderDesktopActions>
  <HeaderDesktopActions isAtEnd>{/* Desktop-only secondary actions */}</HeaderDesktopActions>
</Header>
```

And the complete Header Dialog:

```jsx
<HeaderDialog id="header-dialog-example" aria-label="Menu" isOpen={isOpen} onClose={handleClose}>
  <HeaderDialogCloseButton />
  <HeaderDialogActions>
    <HeaderDialogNav>
      {/* Primary actions */}
      <HeaderDialogNavItem>
        <HeaderDialogLink href="/">Job offers</HeaderDialogLink>
      </HeaderDialogNavItem>
      {/* … */}
    </HeaderDialogNav>
  </HeaderDialogActions>
  <HeaderDialogActions color="secondary">{/* Secondary actions */}</HeaderDialogActions>
</HeaderDialog>
```

<details>
  <summary>Show full example code of Header with responsive navigation</summary>

```jsx
const [isOpen, setOpen] = React.useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

<Header>
  <Link href="/" aria-label="Spirit homepage">
    <ProductLogo>
      <img src="…" width="65" height="24" alt="Spirit" />
    </ProductLogo>
  </Link>
  <HeaderMobileActions dialogId="my-menu" isOpen={isOpen} onOpen={handleOpen} />
  <HeaderDesktopActions aria-label="Navigation">
    <HeaderNav>
      <HeaderNavItem>
        <HeaderLink href="/" isCurrent>Job offers</HeaderLink>
      </HeaderNavItem>
      <HeaderNavItem>
        <HeaderLink href="/">Part-time jobs</HeaderLink>
      </HeaderNavItem>
      <HeaderNavItem>
        <HeaderLink href="/">Inspiration</HeaderLink>
      </HeaderNavItem>
      <HeaderNavItem>
        <HeaderLink href="/">Replies</HeaderLink>
      </HeaderNavItem>
      <HeaderNavItem>
        <HeaderLink href="/">Employers</HeaderLink>
      </HeaderNavItem>
    </HeaderNav>
  </HeaderDesktopActions>
  <HeaderDesktopActions isAtEnd>
    <ButtonLink color="primary" href="/">Sign in</ButtonLink>
    <ButtonLink color="secondary" href="/">Enterprise</ButtonLink>
  </HeaderDesktopActions>
</Header>

<HeaderDialog
  id="my-menu"
  aria-label="Menu"
  isOpen={isOpen}
  onClose={handleClose}
>
  <HeaderDialogCloseButton />
  <HeaderDialogActions aria-label="Main navigation">
    <HeaderDialogNav>
      <HeaderDialogNavItem>
        <HeaderDialogLink href="/" isCurrent>Job offers</HeaderDialogLink>
      </HeaderDialogNavItem>
      <HeaderDialogNavItem>
        <HeaderDialogLink href="/">Part-time jobs</HeaderDialogLink>
      </HeaderDialogNavItem>
      <HeaderDialogNavItem>
        <HeaderDialogLink href="/">Inspiration</HeaderDialogLink>
      </HeaderDialogNavItem>
      <HeaderDialogNavItem>
        <HeaderDialogLink href="/">Replies</HeaderDialogLink>
      </HeaderDialogNavItem>
      <HeaderDialogNavItem>
        <HeaderDialogLink href="/">Employers</HeaderDialogLink>
      </HeaderDialogNavItem>
    </HeaderDialogNav>
  </HeaderDialogActions>
  <HeaderDialogActions color="secondary">
    <ButtonLink color="primary" href="/">Sign in</ButtonLink>
    <ButtonLink color="secondary" href="/">Enterprise</ButtonLink>
  </HeaderDialogActions>
</HeaderDialog>
```

</details>

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[mdn-a-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[mdn-api-html-element]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[mdn-button-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[mdn-dialog-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[mdn-li-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[mdn-ul-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[unstable-header-component]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Header/README.md
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
