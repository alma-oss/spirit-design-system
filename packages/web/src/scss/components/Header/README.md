# Header

The Header is a highly variable and customizable component. It comes in several
design variants and provides a handful of building blocks you can use to achieve
your specific design goals.

The Header is a composition of several subcomponents:

- [Header](#minimal-header)
  - [HeaderMobileActions](#mobile-only-actions)
  - [HeaderDesktopActions](#desktop-only-actions)
    - [HeaderNav](#header-navigation)
      - [HeaderNavItem](#header-navigation)
        - [HeaderLink](#header-navigation)
- [HeaderDialog](#header-dialog)
  - [HeaderDialogCloseButton](#close-button)
  - [HeaderDialogActions](#primary-and-secondary-actions)
    - [HeaderDialogNav](#header-dialog-navigation)
      - [HeaderDialogNavItem](#header-dialog-navigation)
        - [HeaderDialogLink](#header-dialog-navigation)
        - [HeaderDialogText](#header-dialog-navigation)

## ⚠️ DEPRECATION NOTICE

The component will be removed in the next major version. The component will be replaced by the current implementation of the `Header`
and related subcomponents with the `UNSTABLE_Header` component (which will later be renamed to `Header`).
The `UNSTABLE_Header` is designed for use in composition with `Navigation` and `Drawer` components.

Please see [UNSTABLE_Header][unstable-header-component] component documentation.

[What are deprecations?][readme-deprecations]

## JavaScript Plugin

For full functionality, you need to provide Spirit JavaScript, which will handle
toggling of the Header component:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main README][web-readme] for how to include JavaScript
plugins.

Or, feel free to write the controlling script yourself.

The HeaderDialog uses the Offcanvas JS Plugin to toggle the dialog.
See [Offcanvas documentation][offcanvas-docs] for more details.

## Accessibility Guidelines

- Ensure accessibility by using a `<nav>` element or, if using a more generic
  element such as a `<div>`, add a `role="navigation"` to every navigation to
  explicitly identify it as a landmark region for users of assistive
  technologies.
- Indicate the current item by using `aria-current="page"` for the current
  page or `aria-current="true"` for the current item in a set.
- Don't forget to provide textual equivalents for icon buttons. Use either the
  `aria-label` attribute, or the provided `accessibility-hidden` helper class.
- For Header to work correctly with assistive technologies, the `aria-expanded`
  attributes need to be updated by JavaScript when Header is toggled.

👉 The animation effect of this component is dependent on the
`prefers-reduced-motion` media query.

🌍 Although we don't need it yet, this component experimentally supports RTL
languages (because just a single line had to be added to make it all work 🎉).

## Minimal Header

Without any modifier, Header is ready to contain necessary blocks in a classic
left-to-right layout (in LTR documents). Please note it is fully transparent
unless you add a color variant modifier class.

```html
<header class="Header">
  <a href="#" aria-label="Company homepage">
    <img src="…" alt="Company" />
  </a>
</header>
```

## Color Variants

Currently, Header comes in two color variants: **primary** and **transparent**
(for non-solid backgrounds like gradients or images). Add `Header--transparent`
modifier class to apply transparent background color to Header.

```html
<header class="Header Header--transparent">
  <a href="#" aria-label="Company homepage">
    <img src="…" alt="Company" />
  </a>
</header>
```

## Simple Header

The `Header--simple` modifier makes the header bar slightly shorter and aligns
its content to the center. Use this design variant when all you need on the page
is just branding.

```html
<header class="Header Header--simple">
  <a href="#" aria-label="Company homepage">
    <img src="…" alt="Company" />
  </a>
</header>
```

## Supported Content

To create a responsive header with top-level navigation, there are the following
building blocks to use:

1. Inside Header:
   1. mobile-only actions, including toggle button by default,
   2. desktop-only actions with primary and secondary action slots.
2. Inside Header Dialog:
   1. primary actions slot (all [breakpoints][dictionary-breakpoint]),
   2. secondary actions slot (all breakpoints).

## Header Component

### Mobile-Only Actions

Slot for actions that are intended to display on mobile and tablet screens only.
It is designed to hold the toggle button (see below) but you can add as many
custom elements as the free space in Header allows.

```html
<div class="HeaderMobileActions">
  <!-- Mobile-only actions -->
</div>
```

#### Toggle Button

Toggle button reveals the [Header Dialog](#header-dialog) containing actions for
small screens (up to the desktop breakpoint). It makes use of a secondary Button
by default.

The toggle button implements Spirit's Off-canvas JavaScript plugin. It is linked
to the corresponding instance of Header Dialog via ID placed in `data-spirit-target`
and `aria-controls` attributes.

```html
<button
  type="button"
  class="Button Button--secondary Button--medium"
  data-spirit-toggle="offcanvas"
  data-spirit-target="#my-header-dialog"
  aria-controls="my-header-dialog"
  aria-expanded="false"
>
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
</button>
```

### Desktop-Only Actions

As the name suggests, desktop-only actions are intended to display on desktop screens only. They generally work as flex
containers that define vertical alignment and spacing.

If you need to align actions to the end of the Header, use the `HeaderDesktopActions--end` modifier class.

👉 It is critical to **make sure all your actions fit the Header on the
desktop breakpoint**. Spirit intentionally does not provide any overflow
control here.

```html
<nav class="HeaderDesktopActions" aria-label="Main navigation">
  <!-- Desktop-only actions -->
</nav>
<nav class="HeaderDesktopActions HeaderDesktopActions--end">
  <!-- Desktop-only actions aligned to the end -->
</nav>
```

#### Header Navigation

Navigation is designed to live in either of the action slots (just remember you
should use the `<nav>` element with the appropriate `aria-label` for that slot,
see the example above).

👉 As of now, only single-level navigation is supported. You may consider
using the [Header Dialog](#header-dialog) for other use cases such as the user
menu.

```html
<ul class="HeaderNav">
  <li class="HeaderNavItem">
    <a href="#" class="HeaderLink HeaderLink--current" aria-current="page">Job offers</a>
  </li>
  <li class="HeaderNavItem">
    <a href="#" class="HeaderLink">Part-time jobs</a>
  </li>
  <li class="HeaderNavItem">
    <a href="#" class="HeaderLink">Inspiration</a>
  </li>
  <li class="HeaderNavItem">
    <a href="#" class="HeaderLink">Replies</a>
  </li>
  <li class="HeaderNavItem">
    <a href="#" class="HeaderLink">Employers</a>
  </li>
</ul>
```

Both links and buttons are supported by `HeaderLink` class:

```html
<ul class="HeaderNav">
  <li class="HeaderNavItem">
    <a href="#" class="HeaderLink">Link item</a>
  </li>
  <li class="HeaderNavItem">
    <button type="button" class="HeaderLink">Button item</button>
  </li>
</ul>
```

#### Other Content

You can avoid using the [HeaderNav](#navigation) for standalone links. That way, you can combine links and buttons in
the same container:

```html
<nav class="HeaderDesktopActions HeaderDesktopActions--end">
  <a href="#" class="HeaderLink">Marian</a>
  <a href="#" class="Button Button--primary Button--medium">Sign in</a>
</nav>
```

## Header Dialog

Header Dialog is Spirit's solution for responsive navigation and selected use
cases such as the user menu. Please note Header Dialog is not intended to be
used for second-level navigation in general.

Header Dialog implements the [`<dialog>`][mdn-dialog] element to easily provide
the best possible user experience and accessibility.

```html
<dialog id="my-header-dialog" class="HeaderDialog" aria-label="Menu">
  <div class="HeaderDialog__panel">
    <div class="HeaderDialog__content">
      <!-- Close button with primary and secondary actions -->
    </div>
  </div>
</dialog>
```

### Close Button

Close button closes the Header Dialog using our Off-canvas JavaScript plugin.

```html
<button
  type="button"
  class="HeaderDialogCloseButton"
  data-spirit-dismiss="offcanvas"
  data-spirit-target="#my-header-dialog"
  aria-controls="my-header-dialog"
  aria-expanded="false"
>
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
  <span class="accessibility-hidden">Close</span>
</button>
```

### Primary and Secondary Actions

There are two slots for actions inside Header Dialog: primary actions slot and
the optional secondary actions slot.

👉 When there are too many actions, vertical overflow is correctly handled on
small screens (`HeaderDialog__content` provides vertical scrolling when
necessary).

```html
<nav class="HeaderDialogActions HeaderDialogActions--primary" aria-label="Main navigation">
  <!-- Primary actions -->
</nav>
<nav class="HeaderDialogActions HeaderDialogActions--secondary">
  <!-- Secondary actions -->
</nav>
```

#### Header Dialog Navigation

Navigation capabilities are very similar to those of Header. All principles
apply here as well, with the only difference in class names starting with
`HeaderDialog` instead of `Header`.

```html
<ul class="HeaderDialogNav">
  <li class="HeaderDialogNavItem">
    <a href="#" class="HeaderDialogLink HeaderDialogLink--current" aria-current="page">Job offers</a>
  </li>
  <li class="HeaderDialogNavItem">
    <a href="#" class="HeaderDialogLink">Part-time jobs</a>
  </li>
  <li class="HeaderDialogNavItem">
    <a href="#" class="HeaderDialogLink">Inspiration</a>
  </li>
  <li class="HeaderDialogNavItem">
    <a href="#" class="HeaderDialogLink">Replies</a>
  </li>
  <li class="HeaderDialogNavItem">
    <a href="#" class="HeaderDialogLink">Employers</a>
  </li>
</ul>
```

Navigation items can be links, buttons, or just text:

```html
<ul class="HeaderDialogNav">
  <li class="HeaderDialogNavItem">
    <a href="#" class="HeaderDialogLink">Link item</a>
  </li>
  <li class="HeaderDialogNavItem">
    <button type="button" class="HeaderDialogLink">Button item</button>
  </li>
  <li class="HeaderDialogNavItem">
    <span class="HeaderDialogText">Text item</span>
  </li>
</ul>
```

## Composition

This is how all supported building blocks of the Header build up the complete
composition:

```html
<header class="Header">
  <!-- Branding -->
  <!-- Mobile-only actions -->
  <!-- Desktop-only primary actions -->
  <!-- Desktop-only secondary actions -->
</header>
```

And the complete Header Dialog:

```html
<dialog class="HeaderDialog">
  <div class="HeaderDialog__panel">
    <div class="HeaderDialog__content">
      <!-- Close button -->
      <!-- Primary actions -->
      <!-- Secondary actions -->
    </div>
  </div>
</dialog>
```

<details>
  <summary>Show full example code of Header with responsive navigation</summary>

```html
<!-- Header: start -->
<header class="Header">
  <a href="#" aria-label="Spirit homepage">
    <img src="…" width="65" height="24" alt="Spirit" />
  </a>

  <!-- HeaderMobileActions: start -->
  <div class="HeaderMobileActions">
    <button
      type="button"
      class="Button Button--secondary Button--medium Button--symmetrical"
      data-spirit-toggle="offcanvas"
      data-spirit-target="#header-dialog-example-1"
      aria-controls="header-dialog-example-1"
      aria-expanded="false"
    >
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#hamburger" />
      </svg>
      <span class="accessibility-hidden">Menu</span>
    </button>
  </div>
  <!-- HeaderMobileActions: end -->

  <!-- HeaderDesktopActions: start -->
  <nav class="HeaderDesktopActions" aria-label="Main navigation">
    <!-- HeaderNav: start -->
    <ul class="HeaderNav">
      <li class="HeaderNavItem">
        <a href="#" class="HeaderLink HeaderLink--current" aria-current="page">Job offers</a>
      </li>
      <li class="HeaderNavItem">
        <a href="#" class="HeaderLink">Part-time jobs</a>
      </li>
      <li class="HeaderNavItem">
        <a href="#" class="HeaderLink">Inspiration</a>
      </li>
      <li class="HeaderNavItem">
        <a href="#" class="HeaderLink">Replies</a>
      </li>
      <li class="HeaderNavItem">
        <a href="#" class="HeaderLink">Employers</a>
      </li>
    </ul>
    <!-- HeaderNav: end -->
  </nav>
  <!-- HeaderDesktopActions: end -->

  <!-- HeaderDesktopActions: start -->
  <nav class="HeaderDesktopActions HeaderDesktopActions--end">
    <a href="#" class="Button Button--primary Button--medium">Sign in</a>
    <a href="#" class="Button Button--secondary Button--medium">Enterprise</a>
  </nav>
  <!-- HeaderDesktopActions: end -->
</header>
<!-- Header: end -->

<!-- HeaderDialog: start -->
<dialog id="header-dialog-example-1" class="HeaderDialog" aria-label="Menu">
  <div class="HeaderDialog__panel">
    <div class="HeaderDialog__content">
      <!-- HeaderDialogCloseButton: start -->
      <button
        type="button"
        class="HeaderDialogCloseButton"
        data-spirit-dismiss="offcanvas"
        data-spirit-target="#header-dialog-example-1"
        aria-controls="header-dialog-example-1"
        aria-expanded="false"
      >
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
        <span class="accessibility-hidden">Close</span>
      </button>
      <!-- HeaderDialogCloseButton: end -->

      <!-- HeaderDialogActions: start -->
      <nav class="HeaderDialogActions HeaderDialogActions--primary" aria-label="Main navigation">
        <!-- HeaderDialogNav: start -->
        <ul class="HeaderDialogNav">
          <li class="HeaderDialogNavItem">
            <a href="#" class="HeaderDialogLink HeaderDialogLink--current" aria-current="page">Job offers</a>
          </li>
          <li class="HeaderDialogNavItem">
            <a href="#" class="HeaderDialogLink">Part-time jobs</a>
          </li>
          <li class="HeaderDialogNavItem">
            <a href="#" class="HeaderDialogLink">Inspiration</a>
          </li>
          <li class="HeaderDialogNavItem">
            <a href="#" class="HeaderDialogLink">Replies</a>
          </li>
          <li class="HeaderDialogNavItem">
            <a href="#" class="HeaderDialogLink">Employers</a>
          </li>
        </ul>
        <!-- HeaderDialogNav: end -->
      </nav>
      <!-- HeaderDialogActions: end -->

      <!-- HeaderDialogActions: start -->
      <nav class="HeaderDialogActions HeaderDialogActions--secondary">
        <a href="#" class="Button Button--primary Button--medium">Sign in</a>
        <a href="#" class="Button Button--secondary Button--medium">Enterprise</a>
      </nav>
      <!-- HeaderDialogActions: end -->
    </div>
  </div>
</dialog>
<!-- HeaderDialog: end -->
```

</details>

## Known Limitations

- Header Dialog is currently the only responsive option for actions on mobile
  and tablet screens. As a consequence, the navigation markup needs to be
  duplicated in your HTML.
- Only single-level navigation is currently supported. However, you can provide
  a custom navigation component instead of the built-in `HeaderNav` (or
  `HeaderDialogNav`) as long as it works with the responsive off-canvas
  design of Header Dialog.
- The Header breakpoint is mapped to the desktop breakpoint and currently cannot
  be changed.
- As of now, the Header height cannot be changed.

✍️ Please do feel free to let us know should you believe this component lacks
some important capabilities. Thank you! 🙏

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#deprecations
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
[mdn-dialog]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[offcanvas-docs]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Offcanvas/README.md
[unstable-header-component]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Header/README.md
