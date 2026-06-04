# Dynamic Colors

Dynamic color helpers create borders and backgrounds derived from the color scheme of the parent element. They apply
curated tokens where available and compute only what's missing.

## Requirements

To use dynamic color helpers, set up two things.

First, apply a color scheme to the **parent element** using a `color-scheme-on-*` class. You can use any available
color scheme, for example the basic informative scheme:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <!-- Dynamic color helpers will be applied inside this element. -->
</div>
```

Second, add one or more `dynamic-color-*` classes to an element inside:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <button type="button" class="button-unstyled dynamic-color-background-interactive">Click me</button>
</div>
```

## How Colors Are Resolved

Dynamic colors first try to apply the matching color scheme token and only fall back to a color computed with
`oklch()` when no appropriate token is found. This dual behavior is what makes the helpers suitable for
color-scheme-aware components: they pick up the active color scheme when one is present, yet keep working outside of
any color scheme by computing their colors from the background.

If no background has been set anywhere up the tree — neither a color scheme nor a background utility — the helpers
fall back to the primary background token, so they always produce a usable color.

There are two exceptions to this rule:

- **With a color scheme, borders always use its subtle border color** — whether the scheme is a basic or subtle
  variant — so the border stands out on a basic background.
- **Interactive (hover and active) backgrounds are always computed** so the resulting color does not diverge too much
  from the background.

## Border

Use `dynamic-color-border` class on elements with borders:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <button type="button" class="button-unstyled border-100 border-solid dynamic-color-border">Click me</button>
</div>
```

⚠️ **The `dynamic-color-border` class only changes the border color.** It must be used with a combination of border-width and border-style classes to achieve any effect.

## Interactive Background

Use `dynamic-color-background-interactive` class on interactive elements like buttons or links:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <button type="button" class="button-unstyled dynamic-color-background-interactive">Click me</button>
</div>
```

ℹ️ Specifically for buttons, we recommend using a combination of `dynamic-color-background-interactive` and `button-unstyled`
class, possibly with some additional styling:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <button type="button" class="button-unstyled dynamic-color-background-interactive rounded-200 px-700 py-500">
    Click me
  </button>
</div>
```

## Selected Background

Use `dynamic-color-background-selected` class on selected elements:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <a href="#" aria-current="page" class="dynamic-color-background-selected">Selected item</a>
  <a href="#">Not selected</a>
</div>
```

ℹ️ To prevent style changes on hover, we recommend using a combination of `dynamic-color-background-selected` and `link-not-underlined` class,
possibly with some additional styling:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <a
    href="#"
    aria-current="page"
    class="dynamic-color-background-selected link-not-underlined text-color-scheme rounded-200 px-700 py-500"
  >
    Selected link
  </a>
</div>
```

ℹ️ Always set the text color directly on the link element with the `text-color-scheme` utility class. Default link styles override colors inherited from the parent, so the text color must be set explicitly on the element itself to keep the text readable.

## Using Background Utilities

Dynamic color helpers also work when the parent's background is set with a background utility class such as
`bg-emotion-informative-basic` (paired with a matching text color), instead of a color scheme. Because there is no
color scheme token to read, every dynamic color is computed from the background with `oklch()`:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <button type="button" class="button-unstyled dynamic-color-background-interactive">Click me</button>
</div>
```

ℹ️ We still recommend color schemes as the more robust option. A color scheme delivers a complete, ready-to-use set of
colors — content, background, and border — whereas a background utility provides only the background color, leaving
everything else to be computed.
