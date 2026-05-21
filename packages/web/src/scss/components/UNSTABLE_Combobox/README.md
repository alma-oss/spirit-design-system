# UNSTABLE Combobox

⚠️ This component is UNSTABLE. It may significantly change at any point in the future. Please use it with caution.

Combobox is a form control that allows users to filter a list of options by typing and selecting multiple
items, displaying the selected values as removable tags.

## Basic Usage

Combobox is built on top of the [Dropdown][dropdown] component. It consists of a label, an input
container holding the tag selection grid with an inline text input, and a dropdown popover with the
filterable option list.

```txt
UNSTABLE_Combobox
├── Dropdown
│   ├── Label
│   ├── InputContainer                           role="group"
│   │   └── UNSTABLE_ComboboxSelection           role="grid" · aria-live="off"
│   │       ├── Tag                              role="row" (× N selected)
│   │       │   └── role="gridcell"
│   │       │       ├── tag label
│   │       │       └── ControlButton            (remove)
│   │       └── input[role="combobox"]           (inline, always last child)
│   └── DropdownPopover                          role="grid" · aria-multiselectable="true"
│       └── UNSTABLE_ComboboxOption              role="row" (× N options)
│           └── role="gridcell"
├── ValidationText                               (optional)
└── HelperText                                   (optional)
```

The text input is placed as the last child of `UNSTABLE_ComboboxSelection` so that typed text always
appears after all selected tags in the flex layout. Tags are inserted before the input.

⚠️ The DropdownPopover is rendered using absolute positioning relative to the Dropdown wrapper. Make
sure there is enough space below the Combobox (or around it, depending on the popover placement) so
the popover does not overflow its scrollable container or get clipped.

```html
<div class="UNSTABLE_Combobox" data-spirit-element="combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--medium" role="group" aria-label="Languages">
      <div
        class="UNSTABLE_ComboboxSelection"
        role="grid"
        aria-label="Selected Languages"
        aria-live="off"
        aria-atomic="false"
        aria-relevant="additions"
        data-spirit-combobox-selection
      >
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          aria-haspopup="grid"
          aria-expanded="false"
          aria-controls="combobox-listbox"
          aria-labelledby="combobox-label"
          aria-autocomplete="list"
          autocomplete="off"
          placeholder="Languages"
          class="UNSTABLE_Combobox__input"
          data-spirit-combobox-input
        />
      </div>
    </div>
    <div
      class="DropdownPopover placement-bottom-start"
      role="grid"
      id="combobox-listbox"
      aria-labelledby="combobox-label"
      aria-multiselectable="true"
      data-spirit-combobox-listbox
    >
      <div class="Stack Stack--hasSpacing" style="--stack-spacing: var(--spirit-space-300);">
        <div role="row" id="opt-cs" aria-selected="false" class="UNSTABLE_ComboboxOption">
          <div role="gridcell">Czech</div>
        </div>
        <div role="row" id="opt-en" aria-selected="false" class="UNSTABLE_ComboboxOption">
          <div role="gridcell">English</div>
        </div>
        <!-- More options… -->
        <div data-spirit-combobox-empty-state hidden>
          <div class="UNSTABLE_Combobox__emptyState">Nothing found</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Placeholder and Add-More Affordance

The input's `placeholder` attribute is reserved for the field label hint only:

- **No selection**: shows the field label text (e.g. `placeholder="Languages"`).
- **≥ 1 tag selected**: placeholder is cleared; JS inserts a `UNSTABLE_Combobox__addMore` span
  directly before the input that reads `+ Add more…`. The span is `aria-hidden` and carries no
  instructions — selection count is announced to screen readers via `aria-label` on the input.
- **Input focused / user is typing**: the `+ Add more…` span hides so it does not compete with the
  cursor or the typed query.

👉 Be aware that the input's placeholder has some limitations, mostly related to the accessibility.
For more information, please follow this article [Don’t Use The Placeholder Attribute][smashing-magazine-placeholder].

## Pre-Selected Options

Set `aria-selected="true"` on any option row to pre-select it on page load. The demo script reads
the initial selection state and renders the corresponding tags immediately.

```html
<div role="row" id="opt-cs" aria-selected="true" class="UNSTABLE_ComboboxOption">
  <div role="gridcell">Czech</div>
</div>
```

## Grouped Options

Wrap related options in a `role="rowgroup"` element and give it a visible label via
`aria-labelledby`. Add `data-spirit-combobox-group` so the filtering script can hide empty groups.

```html
<div role="rowgroup" aria-labelledby="group-bohemia-label" data-spirit-combobox-group>
  <div id="group-bohemia-label" class="UNSTABLE_ComboboxGroup__label" aria-hidden="true">Bohemia</div>
  <div role="row" id="opt-prague" aria-selected="false" class="UNSTABLE_ComboboxOption">
    <div role="gridcell">Prague</div>
  </div>
  <!-- More options… -->
</div>
```

## Static Text and Dismissible Options

Use `UNSTABLE_ComboboxOption__static` for non-interactive separator labels. Use
`UNSTABLE_ComboboxOption--dismissible` for options that can be permanently removed from the list
(e.g. search history), adding a dismissible `ControlButton` with `data-spirit-combobox-option-dismiss`.

```html
<!-- Non-interactive separator -->
<div class="UNSTABLE_ComboboxOption__static" aria-hidden="true">Recent searches</div>

<!-- Dismissible option -->
<div
  role="row"
  id="opt-dismiss-1"
  aria-selected="false"
  class="UNSTABLE_ComboboxOption UNSTABLE_ComboboxOption--dismissible"
>
  <div role="gridcell">Frontend developer</div>
  <div role="gridcell">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical ControlButton--hasBackground"
      aria-label="Remove Frontend developer from suggestions"
      data-spirit-combobox-option-dismiss
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </div>
</div>
```

### Dismissible Link Row

Combine `UNSTABLE_ComboboxOption--dismissible` with `data-spirit-combobox-link-row` to create a
dismissible option whose primary action is navigation. Place the `<a>` element **inside**
`<div role="gridcell" class="UNSTABLE_ComboboxOption__cell">` — never use `<a>` as the gridcell
element itself, as that is not valid HTML. Give the link `tabindex="-1"` so keyboard focus stays
on the row; JS follows the link on Enter or click.

CSS link decoration reset (`text-decoration: none; color: inherit`) is scoped to
`UNSTABLE_ComboboxOption--dismissible` — it only takes effect in this variant.

```html
<div
  role="row"
  id="opt-link-1"
  aria-selected="false"
  class="UNSTABLE_ComboboxOption UNSTABLE_ComboboxOption--dismissible"
  data-spirit-combobox-link-row
>
  <div role="gridcell" class="UNSTABLE_ComboboxOption__cell">
    <a href="/jobs/frontend-developer" tabindex="-1">Frontend developer</a>
  </div>
  <div role="gridcell">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical ControlButton--hasBackground"
      aria-label="Remove Frontend developer from suggestions"
      data-spirit-combobox-option-dismiss
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </div>
</div>
```

## Options with Icon

Use `UNSTABLE_ComboboxOption__cell` on the gridcell and `UNSTABLE_ComboboxOption__label` on the
label wrapper to create options with a leading icon and multi-line description.

```html
<div role="row" id="opt-lead" aria-selected="false" class="UNSTABLE_ComboboxOption">
  <div role="gridcell" class="UNSTABLE_ComboboxOption__cell">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#profile" />
    </svg>
    <div class="UNSTABLE_ComboboxOption__label">
      <div>Team Lead</div>
      <div class="typography-body-small-regular text-secondary">Full-time, from 200 000 CZK</div>
    </div>
  </div>
</div>
```

## Sizes

Use the `InputContainer--small`, `InputContainer--medium`, or `InputContainer--large` modifier on
the `InputContainer` element to control the size. `InputContainer--medium` is the default.

```html
<div class="InputContainer InputContainer--large" role="group" aria-label="Languages">
  <!-- … -->
</div>
```

## Helper Text

Add supplementary information below the Dropdown using the `HelperText` component. Give it a unique
`id` and reference it via `aria-describedby` on the input so screen readers announce the hint
when the user focuses the field.

```html
<div class="UNSTABLE_Combobox" data-spirit-element="combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--medium" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection" … data-spirit-combobox-selection>
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          aria-describedby="combobox-helper"
          class="UNSTABLE_Combobox__input"
          data-spirit-combobox-input
          <!-- … -->
        />
      </div>
    </div>
    <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
  </div>
  <div id="combobox-helper" class="HelperText">You can select multiple languages.</div>
</div>
```

## Validation States

Validation states visually communicate feedback to the user. Apply a validation modifier class on
the `InputContainer` element and use `ValidationText` for the message, placing it outside the
`Dropdown` wrapper but inside the root element. Give it a unique `id` and reference it via
`aria-describedby` on the input.

Available validation states: `danger`, `warning`, `success`.

```html
<div class="UNSTABLE_Combobox" data-spirit-element="combobox">
  <div class="Dropdown">
    <label class="Label Label--danger" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--medium InputContainer--danger" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection" … data-spirit-combobox-selection>
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          aria-describedby="combobox-validation"
          class="UNSTABLE_Combobox__input"
          data-spirit-combobox-input
          <!-- … -->
        />
      </div>
    </div>
    <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
  </div>
  <div id="combobox-validation" class="ValidationText ValidationText--danger" role="alert">
    Please select at least one language.
  </div>
</div>
```

## Disabled

Add `UNSTABLE_Combobox--disabled` on the root element, `InputContainer--disabled` on the input container
and the `disabled` attribute on the input to disable the Combobox.

```html
<div class="UNSTABLE_Combobox UNSTABLE_Combobox--disabled" data-spirit-element="combobox">
  <div class="Dropdown">
    <label class="Label Label--disabled" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--medium InputContainer--disabled" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection" … data-spirit-combobox-selection>
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          class="UNSTABLE_Combobox__input"
          disabled
          data-spirit-combobox-input
          <!-- … -->
        />
      </div>
    </div>
    <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
  </div>
</div>
```

## Addons

Place addon elements (e.g. a clear-all button and a chevron toggle) inside the `InputContainer`
after the selection grid. Use `InputAddon` as a visual wrapper for each slot.

The chevron toggle button uses `data-spirit-toggle="combobox"` and `aria-expanded` so the script
can toggle the popup open/closed on click and CSS can rotate the icon accordingly.

```html
<div class="InputContainer InputContainer--medium" role="group" aria-label="Languages">
  <!-- … selection grid and input … -->

  <div
    class="Flex Flex--horizontal Flex--noWrap"
    style="--flex-spacing-x: var(--spirit-space-0); --flex-spacing-y: var(--spirit-space-0);"
  >
    <!-- Clear-all addon: shown by JS when ≥1 item is selected -->
    <div class="InputAddon InputAddon--medium" hidden data-spirit-combobox-clear>
      <button
        type="button"
        class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--hasBackground"
        aria-label="Remove all"
      >
        <svg class="Icon" width="20" height="20" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
      </button>
    </div>
    <!-- Chevron addon: click opens or closes the popup -->
    <span class="InputAddon InputAddon--medium">
      <button
        type="button"
        class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--hasBackground"
        aria-hidden="true"
        aria-expanded="false"
        data-spirit-toggle="combobox"
      >
        <svg class="Icon" width="20" height="20" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
        </svg>
      </button>
    </span>
  </div>
</div>
```

## Async / Loading State

Add `data-spirit-combobox-async` to the root element to enable async mode. Include a loading
indicator element with `data-spirit-combobox-loading` inside the popover — the script shows it
during a simulated 600 ms delay and hides options while loading.

```html
<div class="UNSTABLE_Combobox" data-spirit-element="combobox" data-spirit-combobox-async>
  <div class="Dropdown">
    <!-- … -->
    <div class="DropdownPopover placement-bottom-start" …>
      <div class="UNSTABLE_Combobox__loading" role="status" aria-live="polite" data-spirit-combobox-loading hidden>
        Loading…
      </div>
      <!-- option list … -->
    </div>
  </div>
</div>
```

## JavaScript Interaction

The HTML/CSS prototype includes a demo JavaScript that implements the interactive behavior described below.

### Filtering

As the user types, option rows whose label does not match the query are hidden with
`display: none`. Matching text is highlighted: the matching portion renders at regular weight
while the surrounding text is bolded. When a query is cleared, options are fully restored.
Groups (`role="rowgroup"`) are hidden when all their children are filtered out.

### Roving Tabindex on Tags

The tag selection grid uses roving `tabindex`:

- Only the last tag has `tabindex="0"` (the active tab stop). All others have `tabindex="-1"`.
- Arrow Left/Up and Arrow Right/Down move focus to the previous/next tag. Navigation wraps around.
- Home and End move focus to the first and last tag, respectively.
- When a tag row receives focus, its remove button becomes focusable (`tabindex="0"`).

### Tag Removal and Focus Recovery

When a tag is removed (remove button click or Delete/Backspace on the focused tag row):

1. The corresponding option row is deselected (`aria-selected="false"`) and the selection re-renders.
2. Focus moves to the tag that now occupies the same index, or the previous tag if the last one was removed.
3. If no tags remain, focus returns to the input.

### Keyboard Interaction

| Key                            | Action                                                            |
| ------------------------------ | ----------------------------------------------------------------- |
| Arrow Down / Arrow Up          | Opens popup (if closed); moves active row down / up               |
| Home                           | Moves active row to the first visible option                      |
| End                            | Moves active row to the last visible option                       |
| Arrow Right                    | On active dismissible row: moves focus to its dismiss button      |
| Enter / Space                  | Toggles selection of the active option row                        |
| Delete / Backspace             | On active dismissible row (empty input): removes it from the list |
| Escape                         | Closes the popup                                                  |
| Tab                            | Closes the popup and moves browser focus to the next element      |
| Arrow Left / Right / Up / Down | In selection grid: moves focus between tags (roving tabindex)     |
| Home / End                     | In selection grid: moves focus to first / last tag                |
| Delete / Backspace             | On focused tag row: removes the tag                               |

## Accessibility

### Selection Area: `role="grid"`

The `UNSTABLE_ComboboxSelection` element uses `role="grid"`. This provides a keyboard navigation
contract (arrow keys between items with roving `tabindex`) while allowing interactive content
(remove buttons) inside each item — which roles like `listbox` do not support.

### Popup: `role="grid"` with `aria-multiselectable`

The dropdown popover uses `role="grid"` with `aria-multiselectable="true"`. Options are
`role="row"` elements with `aria-selected`. This pattern supports multi-column layouts (icon +
label + dismiss button) and is compatible with grouped content via `role="rowgroup"`.

The `<input role="combobox">` manages `aria-expanded`, `aria-controls`, and
`aria-activedescendant` to wire the input to the popup grid in accordance with the ARIA
combobox pattern.

For more information about the ARIA combobox pattern, please follow this article [Editable Combobox with Grid Popup Example][w3-combobox-grid-popup].

### ARIA Attributes

| Attribute               | Element           | Purpose                                                             |
| ----------------------- | ----------------- | ------------------------------------------------------------------- |
| `role="group"`          | InputContainer    | Groups the selection area and input together                        |
| `role="grid"`           | Selection area    | Enables keyboard navigation with roving focus across tags           |
| `role="row"`            | Tag / option row  | Represents a single tag or option                                   |
| `role="gridcell"`       | Tag / option cell | Contains the label and interactive controls                         |
| `aria-live="off"`       | Selection area    | Announces added tags to screen readers without interrupting         |
| `role="combobox"`       | Text input        | Identifies the text input as a combobox                             |
| `aria-haspopup="grid"`  | Text input        | Indicates the input controls a grid popup                           |
| `aria-expanded`         | Text input        | Indicates whether the popup is open                                 |
| `aria-controls`         | Text input        | Points to the popup grid element                                    |
| `aria-autocomplete`     | Text input        | Set to `"list"` to indicate filtered suggestions                    |
| `aria-activedescendant` | Text input        | Points to the currently active option row                           |
| `aria-expanded`         | Chevron button    | Mirrors popup state; drives CSS chevron rotation                    |
| `aria-multiselectable`  | Popup grid        | Indicates multiple rows can be selected simultaneously              |
| `aria-selected`         | Option row        | Marks whether the option is currently selected                      |
| `aria-describedby`      | Tag / text input  | Links to the removal instruction / helper text / validation message |

[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown/README.md
[smashing-magazine-placeholder]: https://www.smashingmagazine.com/2018/06/placeholder-attribute/
[w3-combobox-grid-popup]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/
