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
│   │       ├── role="grid"                           aria-live="off"
│   │       │   └── Tag                               role="row" (× N selected)
│   │       │       └── role="gridcell"
│   │       │           ├── tag label
│   │       │           └── ControlButton             (remove)
│   │       └── input[role="combobox"]                (inline, always last child)
│   └── DropdownPopover
│       └── Stack                                     role="grid" · aria-multiselectable="true"
│           └── .Item                                 role="row" (× N options)
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
<div class="UNSTABLE_Combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection">
        <div
          role="grid"
          id="combobox-selection"
          class="d-contents"
          aria-label="Selected Languages"
          aria-live="off"
          aria-atomic="false"
          aria-relevant="additions"
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
        />
      </div>
    </div>
    <div class="DropdownPopover placement-bottom-start">
      <div
        class="Stack Stack--spacing"
        style="--stack-spacing: var(--spirit-space-300);"
        role="grid"
        id="combobox-listbox"
        aria-labelledby="combobox-label"
        aria-multiselectable="true"
      >
        <div role="row" id="opt-cs" aria-selected="false" class="Item">
          <div role="gridcell"><span class="Label Label--item">Czech</span></div>
        </div>
        <div role="row" id="opt-en" aria-selected="false" class="Item">
          <div role="gridcell"><span class="Label Label--item">English</span></div>
        </div>
        <!-- More options… -->
      </div>
      <div role="status" aria-live="polite" class="UNSTABLE_Combobox__emptyState" hidden>Nothing found</div>
    </div>
  </div>
</div>
```

### Placeholder and Add-More Affordance

The input's `placeholder` carries the "add more" hint visually:

- **No selection**: placeholder shows the field label (e.g. `placeholder="Languages"`).
- **≥ 1 tag selected**: placeholder reads `+ Add more…`.

The input's minimum width is driven by the `--spirit-combobox-input-min-width` CSS variable
(default `11ch`, sized for `+ Add more…`). Override it on the root element to fit a different
placeholder string without truncation or unexpected wrapping:

```html
<div class="UNSTABLE_Combobox" style="--spirit-combobox-input-min-width: 18ch;">
  <!-- … -->
</div>
```

👉 Be aware that the input's placeholder has some limitations, mostly related to the accessibility.
For more information, please follow this article [Don't Use The Placeholder Attribute][smashing-magazine-placeholder].

## Pre-Selected Options

Set `aria-selected="true"` on any option row to pre-select it on page load.

```html
<div role="row" id="opt-cs" aria-selected="true" class="Item">
  <div role="gridcell"><span class="Label Label--item">Czech</span></div>
</div>
```

## Variants

Combobox supports the following variant modifiers on `InputContainer`:

- `InputContainer--fill` (default)
- `InputContainer--outline`

```html
<div class="UNSTABLE_Combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Fill (default)</label>
    <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Fill (default)">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>

<div class="UNSTABLE_Combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Outline</label>
    <div class="InputContainer InputContainer--outline InputContainer--medium" role="group" aria-label="Outline">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## Sizes

Use the `InputContainer--small`, `InputContainer--medium`, or `InputContainer--large` modifier on
the `InputContainer` element to control the size. `InputContainer--medium` is the default.

```html
<div class="InputContainer InputContainer--fill InputContainer--large" role="group" aria-label="Languages">
  <!-- … -->
</div>
```

## Helper Text

Add supplementary information below the Dropdown using the `HelperText` component. Give it a unique
`id` and reference it via `aria-describedby` on the input so screen readers announce the hint
when the user focuses the field.

```html
<div class="UNSTABLE_Combobox">
  <div class="Dropdown">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection">
        <div role="grid" … class="d-contents"></div>
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          aria-describedby="combobox-helper"
          class="UNSTABLE_Combobox__input"
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
<div class="UNSTABLE_Combobox">
  <div class="Dropdown">
    <label class="Label Label--danger" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--fill InputContainer--medium InputContainer--danger" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection">
        <div role="grid" … class="d-contents"></div>
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          aria-describedby="combobox-validation"
          class="UNSTABLE_Combobox__input"
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
<div class="UNSTABLE_Combobox UNSTABLE_Combobox--disabled">
  <div class="Dropdown">
    <label class="Label Label--disabled" id="combobox-label" for="combobox-input">Languages</label>
    <div class="InputContainer InputContainer--fill InputContainer--medium InputContainer--disabled" role="group" aria-label="Languages">
      <div class="UNSTABLE_ComboboxSelection">
        <div role="grid" … class="d-contents"></div>
        <input
          type="text"
          id="combobox-input"
          role="combobox"
          class="UNSTABLE_Combobox__input"
          disabled
          <!-- … -->
        />
      </div>
    </div>
    <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
  </div>
</div>
```

## With Addon

Place a clear-all `InputAddon` after the selection wrapper, inside the `InputContainer`.

```html
<div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
  <div class="UNSTABLE_ComboboxSelection">
    <!-- … selection grid and input … -->
  </div>

  <div class="InputAddon InputAddon--medium" hidden>
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

## Auxiliary Content in the Popup

The `Stack` element inside `DropdownPopover` carries `role="grid"`, which only permits
`role="row"` as direct owned elements (see [WAI-ARIA `grid` role][w3-aria-grid]). Any content
that is not an option row — empty state, loading indicator, tip, or other custom content — must
therefore be placed as a **sibling of the Stack**, not inside it.

### Empty State

Show a message when no options match the current query. Place it alongside the Stack:

```html
<div class="DropdownPopover placement-bottom-start">
  <div class="Stack Stack--spacing" role="grid" …>
    <!-- option rows -->
  </div>
  <div role="status" aria-live="polite" class="UNSTABLE_Combobox__emptyState" hidden>Nothing found</div>
</div>
```

### Loading State

Include a loading indicator alongside the option list. The `UNSTABLE_Combobox__loading` element
is hidden by default:

```html
<div class="DropdownPopover placement-bottom-start">
  <div class="UNSTABLE_Combobox__loading" role="status" aria-live="polite" hidden>Loading…</div>
  <div class="Stack Stack--spacing" role="grid" …>
    <!-- option rows -->
  </div>
</div>
```

## Accessibility

### Selection Area: Nested `role="grid"`

The `.UNSTABLE_ComboboxSelection` wrapper is a flex container and carries no ARIA role; the inner
`role="grid"` div with `display: contents` provides the grid semantics (keyboard navigation contract
with roving `tabindex`, support for interactive content inside rows). The input sits as a sibling
of the grid div so that `role="combobox"` is not a direct descendant of `role="grid"`.

### Popup: `role="grid"` with `aria-multiselectable`

The `DropdownPopover` element only handles popover positioning. The inner `Stack` element carries
the grid semantics (`role="grid"`, `aria-multiselectable="true"`, the popup `id`, and
`aria-labelledby`) — that is where the `role="row"` option children actually live. Auxiliary
children of the popover (like the loading indicator) sit alongside the Stack so they are not
interpreted as grid rows.

The `<input role="combobox">` manages `aria-expanded`, `aria-controls`, and
`aria-activedescendant` to wire the input to the popup grid in accordance with the ARIA
combobox pattern.

For more information about the ARIA combobox pattern, please follow this article [Editable Combobox with Grid Popup Example][w3-combobox-grid-popup].

### Popup: Custom Content

Any other supplementary content that is not selectable should be placed outside the `role="grid"` Stack:

```html
<div class="DropdownPopover placement-bottom-start">
  <div class="Stack Stack--spacing" role="grid" …>
    <!-- option rows -->
  </div>
  <!-- custom content here, never inside the Stack -->
  <div>Tip: You can create a new tag</div>
</div>
```

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
[w3-aria-grid]: https://www.w3.org/TR/wai-aria/#grid
[w3-combobox-grid-popup]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/
