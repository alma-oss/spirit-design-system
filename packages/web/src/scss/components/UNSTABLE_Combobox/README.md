# UNSTABLE Combobox

⚠️ This component is UNSTABLE. It may significantly change at any point in the future. Please use it with caution.

Combobox is a form control that allows users to filter a list of options by typing and selecting multiple
items, displaying the selected values as removable tags.

## Basic Usage

Combobox is built on top of the [Dropdown][dropdown] component. It consists of a label, an input
container holding the tag selection grid with an inline text input, and a dropdown popover with the
filterable option list.

```txt
.UNSTABLE_Combobox
├── Dropdown
│   ├── Label
│   ├── InputContainer                                role="group"
│   │   └── .UNSTABLE_ComboboxSelection               (flex wrapper)
│   │       ├── role="grid" · display:contents        · aria-live="off"
│   │       │   └── Tag                               role="row" (× N selected)
│   │       │       └── role="gridcell"
│   │       │           ├── tag label
│   │       │           └── ControlButton             (remove)
│   │       └── input[role="combobox"]                (inline, always last child)
│   └── DropdownPopover
│       └── Stack                                     role="grid" · aria-multiselectable="true"
│           └── .UNSTABLE_ComboboxOption              role="row" (× N options)
│               └── role="gridcell"
├── ValidationText                                    (optional)
└── HelperText                                        (optional)
```

The selection wrapper (`.UNSTABLE_ComboboxSelection`) is a flex container holding two siblings:

1. A `role="grid"` div with `display: contents` — its tag rows participate in the parent flex layout
   while still being semantically grouped as a grid for assistive technology.
2. The text input. Because `role="combobox"` cannot be a direct descendant of `role="grid"`, the
   input lives outside the grid div as a flex sibling.

⚠️ The DropdownPopover is rendered using absolute positioning relative to the Dropdown wrapper. Make
sure there is enough space below the Combobox (or around it, depending on the popover placement) so
the popover does not overflow its scrollable container or get clipped.

```html
<div class="UNSTABLE_Combobox" data-spirit-element="combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--medium" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection">
        <div
          role="grid"
          id="combobox-selection"
          class="d-contents"
          aria-label="Selected Languages"
          aria-live="off"
          aria-atomic="false"
          aria-relevant="additions"
          data-spirit-combobox-selection
        ></div>
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
    <div class="DropdownPopover placement-bottom-start" data-spirit-combobox-listbox>
      <div
        class="Stack Stack--hasSpacing"
        style="--stack-spacing: var(--spirit-space-300);"
        role="grid"
        id="combobox-listbox"
        aria-labelledby="combobox-label"
        aria-multiselectable="true"
      >
        <div role="row" id="opt-cs" aria-selected="false" class="UNSTABLE_ComboboxOption">
          <div role="gridcell">Czech</div>
        </div>
        <div role="row" id="opt-en" aria-selected="false" class="UNSTABLE_ComboboxOption">
          <div role="gridcell">English</div>
        </div>
        <!-- More options… -->
      </div>
      <div data-spirit-combobox-empty-state class="UNSTABLE_Combobox__emptyState" hidden>Nothing found</div>
    </div>
  </div>
</div>
```

### Placeholder and Add-More Affordance

The input's `placeholder` carries the "add more" hint visually. The JS swaps the placeholder text
according to selection state:

- **No selection**: placeholder shows the field label (e.g. `placeholder="Languages"`).
- **≥ 1 tag selected and not all options selected**: placeholder reads `+ Add more…`.
- **All options selected**: placeholder is cleared — there is nothing left to add.

Because placeholders are unreliable for assistive technology, the JS also injects a
visually-hidden `<span class="accessibility-hidden">Add more {fieldLabel}</span>` next to the input
and links it via `aria-describedby` whenever the "+ Add more…" hint is shown. Selection count
remains announced through the input's `aria-label`.

The input's minimum width is driven by the `--spirit-combobox-input-min-width` CSS variable
(default `11ch`, sized for `+ Add more…`). Override it on the root element to fit a different
placeholder string without truncation or unexpected wrapping:

```html
<div class="UNSTABLE_Combobox" style="--spirit-combobox-input-min-width: 18ch;" data-spirit-element="combobox">
  <!-- … -->
</div>
```

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
      <div class="UNSTABLE_ComboboxSelection">
        <div role="grid" … class="d-contents" data-spirit-combobox-selection></div>
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
      <div class="UNSTABLE_ComboboxSelection">
        <div role="grid" … class="d-contents" data-spirit-combobox-selection></div>
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
      <div class="UNSTABLE_ComboboxSelection">
        <div role="grid" … class="d-contents" data-spirit-combobox-selection></div>
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

Pre-selected options (`aria-selected="true"`) are still rendered as disabled tags, so the field
reflects the current state even though the user cannot edit it.

## With Addon

Place a clear-all `InputAddon` after the selection wrapper, inside the `InputContainer`. The demo
script reveals it whenever at least one tag is selected and clears the entire selection on click.

```html
<div class="InputContainer InputContainer--medium" role="group" aria-label="Languages">
  <div class="UNSTABLE_ComboboxSelection">
    <!-- … selection grid and input … -->
  </div>

  <!-- Clear-all addon: shown by JS when ≥1 item is selected -->
  <div class="InputAddon InputAddon--medium" hidden data-spirit-combobox-clear>
    <button
      type="button"
      class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--hasBackground"
      aria-label="Remove all"
    >
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
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

| Key                            | Action                                                        |
| ------------------------------ | ------------------------------------------------------------- |
| Arrow Down / Arrow Up          | Opens popup (if closed); moves active row down / up           |
| Home                           | Moves active row to the first visible option                  |
| End                            | Moves active row to the last visible option                   |
| Enter / Space                  | Toggles selection of the active option row                    |
| Escape                         | Closes the popup                                              |
| Tab                            | Closes the popup and moves browser focus to the next element  |
| Arrow Left / Right / Up / Down | In selection grid: moves focus between tags (roving tabindex) |
| Home / End                     | In selection grid: moves focus to first / last tag            |
| Delete / Backspace             | On focused tag row: removes the tag                           |

## Accessibility

### Selection Area: Nested `role="grid"`

The `.UNSTABLE_ComboboxSelection` wrapper is a flex container and carries no ARIA role; the inner
`role="grid"` div with `display: contents` provides the grid semantics (keyboard navigation contract
with roving `tabindex`, support for interactive content inside rows). The input sits as a sibling
of the grid div so that `role="combobox"` is not a direct descendant of `role="grid"`.

### Popup: `role="grid"` with `aria-multiselectable`

The `DropdownPopover` element only handles popover positioning and is referenced by JS via
`data-spirit-combobox-listbox`. The inner `Stack` element carries the grid semantics
(`role="grid"`, `aria-multiselectable="true"`, the popup `id`, and `aria-labelledby`) — that is
where the `role="row"` option children actually live. Auxiliary children of the popover (like the
loading indicator) sit alongside the Stack so they are not interpreted as grid rows.

The `<input role="combobox">` manages `aria-expanded`, `aria-controls`, and
`aria-activedescendant` to wire the input to the popup grid in accordance with the ARIA
combobox pattern.

For more information about the ARIA combobox pattern, please follow this article [Editable Combobox with Grid Popup Example][w3-combobox-grid-popup].

### ARIA Attributes

| Attribute               | Element              | Purpose                                                             |
| ----------------------- | -------------------- | ------------------------------------------------------------------- |
| `role="group"`          | InputContainer       | Groups the selection area and input together                        |
| `role="grid"`           | Selection inner div  | Enables keyboard navigation with roving focus across tags           |
| `role="row"`            | Tag / option row     | Represents a single tag or option                                   |
| `role="gridcell"`       | Tag / option cell    | Contains the label and interactive controls                         |
| `aria-live="off"`       | Selection inner grid | Announces added tags to screen readers without interrupting         |
| `role="combobox"`       | Text input           | Identifies the text input as a combobox                             |
| `aria-haspopup="grid"`  | Text input           | Indicates the input controls a grid popup                           |
| `aria-expanded`         | Text input           | Indicates whether the popup is open                                 |
| `aria-controls`         | Text input           | Points to the popup grid element                                    |
| `aria-autocomplete`     | Text input           | Set to `"list"` to indicate filtered suggestions                    |
| `aria-activedescendant` | Text input           | Points to the currently active option row                           |
| `aria-multiselectable`  | Popup grid (Stack)   | Indicates multiple rows can be selected simultaneously              |
| `aria-selected`         | Option row           | Marks whether the option is currently selected                      |
| `aria-describedby`      | Tag / text input     | Links to the removal instruction / helper text / validation message |

[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown/README.md
[smashing-magazine-placeholder]: https://www.smashingmagazine.com/2018/06/placeholder-attribute/
[w3-combobox-grid-popup]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/
