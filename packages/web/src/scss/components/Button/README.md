# Button

Button allows users to take actions.

## Basic Usage

```html
<button type="button" class="Button Button--primary Button--medium">Click me</button>
```

## Color Variants

There are several color variants of Button to choose from:

- primary, secondary, tertiary
- plain (with a transparent background)
- emotion colors: success, informative, warning, danger

```html
<button type="button" class="Button Button--primary Button--medium">Primary Button</button>
<button type="button" class="Button Button--secondary Button--medium">Secondary Button</button>
<button type="button" class="Button Button--tertiary Button--medium">Tertiary Button</button>
<button type="button" class="Button Button--plain Button--medium">Plain Button</button>
<button type="button" class="Button Button--success Button--medium">Success button</button>
<button type="button" class="Button Button--informative Button--medium">Informative button</button>
<button type="button" class="Button Button--warning Button--medium">Warning button</button>
<button type="button" class="Button Button--danger Button--medium">Danger button</button>
```

## Sizes

Button comes in three available sizes:

```html
<button type="button" class="Button Button--primary Button--small">Small Button</button>
<button type="button" class="Button Button--primary Button--medium">Medium Button</button>
<button type="button" class="Button Button--primary Button--large">Large Button</button>
```

## Icons

To insert an icon into a button, use the [Icon][readme-icon] component with proper spacing:

```html
<button type="button" class="Button Button--primary Button--medium">
  <svg class="Icon mr-400" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  Menu
</button>
```

### Icon-Only Button

Use the `Button--symmetrical` modifier when you only need a compact, icon-only button:

```html
<button type="button" class="Button Button--primary Button--medium Button--symmetrical">
  <svg class="Icon" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
</button>
```

⚠️ **Accessibility note:** Remember to always provide an accessible label anytime you are hiding the text label.
Learn more about it in the [Accessibility](#accessibility) section.

### Default Icon Sizes

Button automatically sets a default size for the [Icon][readme-icon] component used inside.

| Button Size | Icon Size |
| ----------- | --------- |
| small       | 20 px     |
| medium      | 20 px     |
| large       | 24 px     |

## Responsive Button

Responsive buttons are buttons that toggle between displaying icon or text label depending on the viewport size.
They combine the usage of:

- [Icon][readme-icon] component
- `Button--symmetrical` modifier to make the button symmetrical when only the icon is visible
- Display utility classes (like `d-none`, `d-tablet-inline`) to control visibility of a visual text label
- `accessibility-hidden` class to provide an accessible label

⚠️ **Accessibility note:** Remember to always provide an accessible label anytime you are hiding the text label.
Learn more about it in the [Accessibility](#accessibility) section.

### Examples

Icon on mobile, text label from tablet onwards:

```html
<button type="button" class="Button Button--primary Button--medium Button--symmetrical Button--tablet--asymmetrical">
  <svg class="Icon mr-tablet-400" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
  <span class="d-none d-tablet-inline" aria-hidden="true">Menu</span>
</button>
```

Text label on mobile, icon from tablet onwards:

```html
<button type="button" class="Button Button--primary Button--medium Button--tablet--symmetrical">
  <svg class="Icon mr-400 mr-tablet-0" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
  <span class="d-tablet-none" aria-hidden="true">Menu</span>
</button>
```

Text label on mobile, icon from desktop onwards:

```html
<button type="button" class="Button Button--primary Button--medium Button--desktop--symmetrical">
  <svg class="Icon mr-400 mr-desktop-0" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
  <span class="d-desktop-none" aria-hidden="true">Menu</span>
</button>
```

Icon on mobile and tablet, text label on desktop:

```html
<button type="button" class="Button Button--primary Button--medium Button--symmetrical Button--desktop--asymmetrical">
  <svg class="Icon mr-desktop-400" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
  <span class="d-none d-desktop-inline" aria-hidden="true">Menu</span>
</button>
```

Icon on tablet only:

```html
<button
  type="button"
  class="Button Button--primary Button--medium Button--tablet--symmetrical Button--desktop--asymmetrical"
>
  <svg class="Icon mr-400 mr-tablet-0 mr-desktop-400" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
  <span class="d-tablet-none d-desktop-inline" aria-hidden="true">Menu</span>
</button>
```

## Full-Width Button

To span a `Button` to the full width of its parent, you can use CSS utility classes or [Grid][readme-grid] to achieve the desired layout.

Responsive on all breakpoints:

```html
<div class="d-grid">
  <button type="button" class="Button Button--primary Button--medium">Full-width Button</button>
</div>
```

Full-width on mobile:

```html
<div class="d-grid d-tablet-block">
  <button type="button" class="Button Button--primary Button--medium">Responsive full-width Button</button>
</div>
```

Responsive full-width buttons with [Grid][readme-grid]:

```html
<div
  class="Grid Grid--cols-1 Grid--tablet--cols-2"
  style="
    --grid-spacing-x: var(--spirit-space-1100);
    --grid-spacing-y: var(--spirit-space-1100);
  "
>
  <button type="button" class="Button Button--primary Button--medium">Primary responsive full-width Button</button>
  <a href="#" class="Button Button--secondary Button--medium">Secondary responsive full-width Button</a>
</div>
```

### DEPRECATION NOTICE

The `Button--block` modifier is deprecated and will be removed in the next major release.

For more information, please read the [Full-Width Button](#full-width-button) section.

## Disabled Button

There are several ways to disable a Button:

```html
<button type="button" class="Button Button--primary Button--medium" disabled>Disabled Button</button>
<button type="button" class="Button Button--primary Button--medium is-disabled">Disabled Button</button>
<button type="button" class="Button Button--primary Button--medium Button--disabled">Disabled Button</button>
```

## Loading Button

Use the `Button--loading` modifier to show a loading spinner inside the button.

⚠️ Spirit CSS depends on the correct placement of the Spinner Icon: it must be the last child of the Button.

Loading button with a text label:

```html
<a href="#" class="Button Button--primary Button--medium Button--loading Button--disabled">
  Button primary
  <svg class="Icon animation-spin-clockwise" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#spinner" />
  </svg>
</a>
```

Loading button with an icon and a text label:

```html
<button type="button" class="Button Button--primary Button--medium Button--loading" disabled>
  <svg class="Icon mr-400" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  Menu
  <svg class="Icon animation-spin-clockwise" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#spinner" />
  </svg>
</button>
```

[Icon-only](#icon-only-button) loading button:

```html
<button type="button" class="Button Button--primary Button--medium Button--symmetrical Button--loading" disabled>
  <span class="accessibility-hidden">Menu</span>
  <svg class="Icon" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <svg class="Icon animation-spin-clockwise" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#spinner" />
  </svg>
</button>
```

## Accessibility

⚠️ **Accessibility note:** Always use `accessibility-hidden` class for the accessible label and add `aria-hidden="true"` to the
visible text or add `aria-label` to the button. Using `display: none` utility classes (like `d-tablet-none`)
hides content from screen readers, so the `accessibility-hidden` class ensures the label is always accessible
regardless of viewport size.

⚠️ Even when just the icon is meant to be visible, remember to include an accessible button label
for users with assistive technologies:

### Using `aria-label`

For example, add the `aria-label` attribute to the Button:

```html
<button type="button" class="Button Button--primary Button--medium Button--symmetrical" aria-label="Menu">
  <svg class="Icon" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="d-tablet-none" aria-hidden="true">Menu</span>
</button>
```

### Using `accessibility-hidden`

Alternatively, use the `accessibility-hidden` class:

```html
<button type="button" class="Button Button--primary Button--medium Button--symmetrical">
  <svg class="Icon" width="20" height="20" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
</button>
```

### Using Tooltip

[Icon-only buttons](#icon-only-button) should be only used for familiar, easily recognizable actions.
In other cases, consider displaying the button label in a [Tooltip][readme-tooltip]:

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button
    type="button"
    class="Button Button--primary Button--medium Button--symmetrical"
    data-spirit-toggle="tooltip"
    data-spirit-target="#my-tooltip"
    aria-describedby="my-tooltip"
  >
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#info" />
    </svg>
    <span class="accessibility-hidden">I have a tooltip!</span>
  </button>
  <div id="my-tooltip" class="TooltipPopover">
    Hello there!
    <span class="Tooltip__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

👉 See the [Tooltip][readme-tooltip] documentation for more examples.

[readme-grid]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-icon]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web/src/scss/components/Icon/README.md
[readme-tooltip]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web/src/scss/components/Tooltip/README.md
