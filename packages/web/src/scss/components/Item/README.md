# Item

The Item component is used to display a single item in a list. It can be used in Dropdown or similar.
To use Item with checkbox or radio please use components [Checkbox][checkbox] or [Radio][radio]
with `item` modifier. We do this to avoid repeating the same code and to simplify the API.

`Item__content` and `Item__slot` use `role="presentation"` in order to not introduce extra semantics into the
accessibility tree. Learn more about it in the [Accessibility](#accessibility) section.

## Basic Usage

```html
<div class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
</div>
```

## Item as Button or Link

Use a button when the whole row triggers one action and has no other interactive descendants.
Use a link when the whole row navigates to one destination.

Button:

```html
<button type="button" class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
</button>
```

Link:

```html
<a href="#" class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
</a>
```

ℹ️ Active style is visible only when the root element can obtain active state.

## Selected State

Use `color-scheme-on-selected-subtle` and `bg-color-scheme` when the item itself should have the selected background.
For stronger selected surfaces, use `color-scheme-on-selected-basic` and `bg-color-scheme`.
These color schemes do not render a checkmark or recolor slot icons on their own. If the selected state needs an icon,
render it in `Item__slot` and add `Icon--selected` to the `Icon`.

Selected with background only:

```html
<button type="button" class="Item color-scheme-on-selected-subtle bg-color-scheme">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
</button>
```

Selected with icon only:

```html
<button type="button" class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>
```

Selected with background and icon:

```html
<button type="button" class="Item color-scheme-on-selected-subtle bg-color-scheme">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>
```

## Slots

Use `Item__slot` for leading or trailing adornments such as icons, badges, or controls.
Place the main label and supporting text inside `Item__content`.

Leading icon:

```html
<button type="button" class="Item">
  <span class="Item__slot" role="presentation">
    <svg class="Icon" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
</button>
```

Leading icon, trailing selected icon, and selected background:

```html
<button type="button" class="Item color-scheme-on-selected-subtle bg-color-scheme">
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>
```

## Content with Helper Text and Metadata

Compose richer rows inside `Item__content` with [HelperText][helper-text], typography helpers,
or other inline content.

```html
<div class="Item color-scheme-on-selected-subtle bg-color-scheme">
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#folder-dualtone" />
    </svg>
  </span>
  <span class="Item__content" role="presentation">
    <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
      <span class="Label Label--medium element-stretched">Project Alpha</span>
      <span class="HelperText">Team workspace</span>
      <span class="typography-body-small-regular text-emotion-success-basic">3 updates</span>
    </div>
  </span>
</div>
```

Item with helper text:

```html
<button type="button" class="Item">
  <span class="Item__content" role="presentation">
    <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
      <span class="Label Label--medium element-stretched">Item</span>
      <span class="HelperText">Helper text</span>
    </div>
  </span>
</button>
```

Item with text content instead of Label:

```html
<div class="Item">
  <span class="Item__content" role="presentation">
    <span class="typography-body-medium-semibold">Item title</span>
    <span class="typography-body-small-regular text-secondary">Secondary text without Label</span>
  </span>
</div>
```

Use typography and text helper classes when Item content needs plain text styling instead of form-field label semantics:

```html
<div class="Item">
  <span class="Item__content" role="presentation">
    <span class="typography-body-small-regular text-secondary text-word-break-long-words">
      Long text value: customer-reference-number-2026-0000000001
    </span>
  </span>
</div>
```

## Interactive Controls in Slots

When `Item__slot` contains an interactive control such as a `ControlButton`, `button`, or link,
keep the Item root non-interactive or structure markup to avoid nested interactive elements.
Icon-only controls need an accessible name such as `aria-label`.

```html
<div class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Dismissible item</span>
  </span>
  <span class="Item__slot" role="presentation">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--hasBackground ControlButton--symmetrical text-color-scheme dynamic-color-background-interactive dynamic-color-border accessibility-tap-target"
      aria-label="Remove item"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </span>
</div>
```

For rows where the primary action lives inside the content area, keep the Item root non-interactive
and render a stretched link inside `Item__content`:

```html
<li class="Item Item--alignmentYTop color-scheme-on-selected-subtle">
  <span class="Item__slot" role="presentation">
    <svg class="Icon" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__content" role="presentation">
    <span class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-300);">
      <a href="#malir-pokoj" class="link-inherit link-not-underlined element-stretched">Malíř pokojů</a>
      <span class="HelperText">Plný úvazek</span>
    </span>
  </span>
  <span class="Item__slot" role="presentation">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--hasBackground ControlButton--symmetrical text-color-scheme dynamic-color-background-interactive dynamic-color-border accessibility-tap-target"
      aria-label="Remove Malíř pokojů"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </span>
</li>
```

## Vertical Alignment

Use `Item--alignmentYTop`, `Item--alignmentYCenter`, or `Item--alignmentYBottom` when slot content
and `Item__content` should align differently on the cross axis.

```html
<button type="button" class="Item Item--alignmentYCenter">
  <span class="Item__slot" role="presentation">
    <svg class="Icon" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__content" role="presentation">
    <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
      <span class="Label Label--medium element-stretched">Item</span>
      <span class="HelperText">Additional helper text makes the content taller than the icon.</span>
    </div>
  </span>
</button>
```

## Disabled State

The `disabled` and `text-color-scheme` utility classes style the disabled appearance only. Add the native `disabled` attribute on `<button>` yourself.
For `<a>`, `role="option"`, or other non-button roots, add `aria-disabled="true"` explicitly.

Do not add `bg-color-scheme` to the selected disabled Item.

Button:

```html
<button type="button" class="Item disabled text-color-scheme" disabled>
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched Label--disabled">Item</span>
  </span>
</button>
```

Link:

```html
<a href="#" class="Item disabled text-color-scheme" aria-disabled="true">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched Label--disabled">Item</span>
  </span>
</a>
```

ℹ️ Read more about this pattern at [Scott O'Hara's blog][scott-o-hara-disabling-a-link].

Non-interactive root:

```html
<div class="Item disabled text-color-scheme" aria-disabled="true">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched Label--disabled">Item</span>
  </span>
</div>
```

## Checkbox and Radio Item

Radio as a Item:

```html
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="radio" id="radio-item" name="example" class="Radio Radio--item" checked />
  </div>
  <div class="Item__content" role="presentation">
    <label class="Label Label--medium element-stretched" for="radio-item">Item</label>
  </div>
</div>
```

Checkbox as a Item:

```html
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="checkbox" id="checkbox-item" class="Checkbox Checkbox--item" />
  </div>
  <div class="Item__content" role="presentation">
    <label class="Label Label--medium element-stretched" for="checkbox-item">Item</label>
  </div>
</div>
```

## Usage in Dropdown

Usage in the [Dropdown][dropdown] component:

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-item-example"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-item-example"
  >
    Button as anchor
  </button>
  <div class="DropdownPopover placement-bottom-start" data-spirit-placement="bottom-start" id="dropdown-item-example">
    <a href="#" class="Item">
      <span class="Item__slot" role="presentation">
        <svg class="Icon" width="24" height="24" aria-hidden="true">
          <use href="/icons/svg/sprite.svg#info" />
        </svg>
      </span>
      <span class="Item__content" role="presentation">
        <span class="Label Label--medium element-stretched">Information</span>
      </span>
    </a>
  </div>
</div>
```

## Accessibility

Choose the Item root semantics according to what the row does:

- Use a non-interactive `<div class="Item">` for static content, status rows, or visual-only rows that are not directly actionable.
- Use `<button type="button" class="Item">` only when the whole row triggers one button-like action and the row has no other interactive descendants.
- Use `<a class="Item">` for a single link-like row. For composed rows, keep the Item root non-interactive and render a link inside `Item__content`; `element-stretched` can make the whole visual row clickable without nesting a link around other controls.
- When `Item__slot` contains an interactive control, do not render the Item root as a `<button>` or `<a>`. Keep the root non-interactive, or use the grid pattern below when the row exposes multiple actions. Icon-only remove controls need an accessible name such as `aria-label`.
- Use `role="grid"`, `role="row"`, and `role="gridcell"` when a row has multiple interactive cells or actions that should be navigated as a structured row. In this pattern, the Item itself can be `role="presentation"` and the cell content owns the interactive semantics.
- `color-scheme-on-selected-subtle` is visual only. It does not imply `aria-selected`, `aria-current`, or a widget role. The parent widget owns those semantics because listbox options, menu items, grid rows, and links all use different markup.
- Decorative slot icons should use `aria-hidden="true"` or the documented Icon conventions. `Icon--selected` is visual only and must not replace the ARIA state.
- Inline text highlighting with `<strong>` is fine for visual emphasis, but it does not announce selection or activation state.
- The `disabled` and `text-color-scheme` utility classes style the disabled appearance only. Add the native `disabled` attribute on `<button>` yourself. For `<a>`, `role="option"`, or other non-button roots, add `aria-disabled="true"` explicitly. See [Disabled State](#disabled-state).

For a listbox-like parent, add [`option`][mdn-option-role] semantics and selected state explicitly.
The parent widget must implement the keyboard interaction contract for the chosen role:

```html
<div class="Item color-scheme-on-selected-subtle bg-color-scheme" role="option" aria-selected="true">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item</span>
  </span>
</div>
```

For rows with separate navigation and remove actions, use a structured [`grid`][mdn-grid-role].
The grid role requires a keyboard navigation contract implemented in JavaScript:

```html
<div role="grid" aria-label="Recent items">
  <div class="Item" role="row">
    <span class="Item__content" role="presentation">
      <span role="gridcell">
        <a href="#project-alpha" class="element-stretched">Project Alpha</a>
      </span>
    </span>
    <span class="Item__slot" role="presentation">
      <span role="gridcell">
        <button type="button" class="ControlButton" aria-label="Remove Project Alpha">
          <svg class="Icon" width="16" height="16" aria-hidden="true">
            <use href="/icons/svg/sprite.svg#close" />
          </svg>
        </button>
      </span>
    </span>
  </div>
</div>
```

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Checkbox/README.md
[dropdown]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Dropdown/README.md
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[mdn-grid-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/grid_role
[mdn-option-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/option_role
[radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Radio/README.md
[scott-o-hara-disabling-a-link]: https://www.scottohara.me/blog/2021/05/28/disabled-links.html
