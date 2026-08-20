# UNSTABLE Combobox

⚠️ This component is UNSTABLE. It may significantly change at any point in the future. Please use it with caution.

Combobox is a form control that allows users to filter a list of options by typing and selecting multiple
items, displaying the selected values as removable tags.

> **JS interaction is not part of Spirit.** There is a demo-only example
> showing one possible interaction pattern. In your project, implement the keyboard handling,
> filtering, and selection management to match your own requirements and framework.

## Basic Usage

Combobox is built on top of the [Dropdown][dropdown] component. It consists of a label, an input
container holding the tag selection grid with an inline text input, and a dropdown popover with the
filterable option list.

```txt
UNSTABLE_Combobox
└── Stack                                             space-400
    ├── Label
    ├── Dropdown
    │   ├── InputContainer                            role="group"
    │   │   └── UNSTABLE_ComboboxSelection            (wrapper)
    │   │       ├── role="group" / role="grid"        empty / with tags; aria-live="off"
    │   │       │   └── Tag                           role="row" (× N selected)
    │   │       │       └── role="gridcell"
    │   │       │           ├── tag label
    │   │       │           └── ControlButton         (remove)
    │   │       └── input[role="combobox"]            (inline, always last child)
    │   └── DropdownPopover
    │       └── Stack                                 role="listbox" · aria-multiselectable="true"
    │           └── Item                              role="option" (× N options)
    ├── HelperText                                    (optional)
    └── ValidationText                                (optional)
```

Combobox always supports **multi-select** (tags in the field). The options widget role only chooses how the
**popover options** are marked up for accessibility — not single vs multiple selection. Use **listbox** (default)
when each row only toggles selection. For options with one or more interactive elements (e.g. link + remove), use
`role="grid"` instead — see [Options Popup: Listbox or Grid](#options-popup-listbox-or-grid).

The selection wrapper (`.UNSTABLE_ComboboxSelection`) is a container holding two siblings:

1. A selection area div — `role="group"` when empty, `role="grid"` when tags are present (same dynamic role
   as [Picker][picker-selection-role]).
2. The text input. Because `role="combobox"` cannot be a direct descendant of `role="grid"`, the
   input lives outside that div.

```html
<div class="UNSTABLE_Combobox">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
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
          >
            <div role="row" class="Tag Tag--selected Tag--small color-scheme-on-selected-basic">
              <div role="gridcell" class="d-contents">
                <span>Spanish</span>
                <button
                  type="button"
                  class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical text-color-scheme dynamic-color-background-interactive dynamic-color-border accessibility-tap-target"
                  aria-label="Remove Spanish"
                  tabindex="-1"
                >
                  <svg class="Icon" width="16" height="16" aria-hidden="true">
                    <use href="/assets/icons/svg/sprite.svg#close" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <input
            type="text"
            id="combobox-input"
            role="combobox"
            aria-haspopup="listbox"
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
      <div role="dialog" class="DropdownPopover placement-bottom-start">
        <div
          class="Stack Stack--spacing"
          style="--stack-spacing: var(--spirit-space-300);"
          role="listbox"
          id="combobox-listbox"
          aria-labelledby="combobox-label"
          aria-multiselectable="true"
        >
          <div
            role="option"
            id="opt-es"
            aria-selected="true"
            class="Item color-scheme-on-selected-subtle bg-color-scheme"
          >
            <span class="Label element-stretched cursor-pointer">Spanish</span>
          </div>
          <div role="option" id="opt-cs" aria-selected="false" class="Item">
            <span class="Label element-stretched cursor-pointer">Czech</span>
          </div>
          <div role="option" id="opt-en" aria-selected="false" class="Item">
            <span class="Label element-stretched cursor-pointer">English</span>
          </div>
          <!-- More options… -->
        </div>
        <div role="status" aria-live="polite" class="UNSTABLE_Combobox__emptyState" hidden>Nothing found</div>
      </div>
    </div>
  </div>
</div>
```

> **Dropdown popover:** The filter input uses `aria-haspopup` matching the options widget role (`listbox` by default,
> or `grid` for multi-action rows; omit it for tip-only popovers). The popover still uses Dropdown’s non-modal
> `role="dialog"` with an accessible name (`aria-labelledby` pointing at the Combobox label) — same packaging
> constraint as the React Combobox and Picker.

### Placeholder and Add-More Affordance

The input's `placeholder` can carry the "add more" hint visually:

- **No selection**: placeholder shows the field label (e.g. `placeholder="Languages"`).
- **≥ 1 tag selected**: placeholder reads `+ Add more…`.

The input's minimum width is driven by the `--spirit-combobox-input-min-width` CSS variable
(default `11ch`, sized for `+ Add more…`). In the React package this variable is set automatically
from the length of the currently visible placeholder. In HTML, override it on the root element to
fit a different placeholder string without truncation or unexpected wrapping:

```html
<div class="UNSTABLE_Combobox" style="--spirit-combobox-input-min-width: 18ch;">
  <!-- … -->
</div>
```

👉 Be aware that the input's placeholder has some limitations, mostly related to the accessibility.
For more information, please follow this article [Don't Use The Placeholder Attribute][smashing-magazine-placeholder].

## Pre-Selected Options

Set `aria-selected="true"` on any option to pre-select it on page load.

```html
<div role="option" id="opt-cs" aria-selected="true" class="Item color-scheme-on-selected-subtle bg-color-scheme">
  <span class="Label element-stretched cursor-pointer">Czech</span>
</div>
```

## Options Popup: Listbox or Grid

Choose the popup options pattern with the role on the options `Stack` (not inferred from children):

| Pattern               | Markup                                           | Use when                                                                  |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| **listbox** (default) | `role="listbox"` → `role="option"`               | Each row only toggles selection                                           |
| **grid**              | `role="grid"` → `role="row"` → `role="gridcell"` | Multi-action rows — one or more interactive elements (e.g. link + remove) |
| none                  | no options widget                                | Tip-only / auxiliary content only                                         |

Selection tags stay on a separate selection area inside the field (`role="group"` when empty,
`role="grid"` when tags are present) — independent of the popover options role.

A row with a country name and flag but **no** interactive controls still uses `role="option"` (listbox). Use
`role="grid"` only when the row contains interactive elements beyond the row itself.

### Grid Popup Example

```html
<div role="dialog" class="DropdownPopover placement-bottom-start">
  <div
    class="Stack Stack--spacing"
    style="--stack-spacing: var(--spirit-space-300);"
    role="grid"
    id="combobox-listbox"
    aria-labelledby="combobox-label"
    aria-multiselectable="true"
  >
    <div
      role="row"
      id="opt-search-1"
      aria-selected="false"
      class="Item Item--alignmentYTop"
      data-spirit-label="Painter"
      tabindex="-1"
    >
      <span class="Item__slot" role="presentation">
        <svg class="Icon" width="24" height="24" aria-hidden="true">
          <use href="/assets/icons/svg/sprite.svg#search" />
        </svg>
      </span>
      <span class="Item__content" role="presentation">
        <span role="gridcell" aria-colindex="1">
          <span class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-300);">
            <span class="typography-body-medium-regular">Painter</span>
            <span class="HelperText">Full-time</span>
          </span>
        </span>
      </span>
      <span class="Item__slot" role="presentation">
        <span role="gridcell">
          <button
            type="button"
            class="ControlButton ControlButton--small ControlButton--hasBackground ControlButton--symmetrical"
            tabindex="-1"
            aria-label="Remove Painter"
          >
            <svg class="Icon" width="16" height="16" aria-hidden="true">
              <use href="/assets/icons/svg/sprite.svg#close" />
            </svg>
          </button>
        </span>
      </span>
    </div>
    <!-- More rows… -->
  </div>
</div>
```

Set `aria-haspopup="grid"` on the filter input when the options widget uses `role="grid"`. Nested cell controls
carry `tabindex="-1"` so Arrow Left / Right can reach them without adding tab stops.

For the grid popup pattern, see [Editable Combobox with Grid Popup Example][w3-combobox-grid-popup]. For listbox,
see [Editable Combobox With List Autocomplete Example][w3-combobox-list-autocomplete].

## Variants

Combobox supports the following variant modifiers on `InputContainer`:

- `InputContainer--fill` (default)
- `InputContainer--outline`

```html
<div class="UNSTABLE_Combobox">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label" id="combobox-label" for="combobox-input">Fill (default)</label>
    <div class="Dropdown">
      <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Fill (default)">
        <!-- … -->
      </div>
      <!-- … -->
    </div>
  </div>
</div>

<div class="UNSTABLE_Combobox">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label" id="combobox-label" for="combobox-input">Outline</label>
    <div class="Dropdown">
      <div class="InputContainer InputContainer--outline InputContainer--medium" role="group" aria-label="Outline">
        <!-- … -->
      </div>
      <!-- … -->
    </div>
  </div>
</div>
```

## Sizes

Use the `InputContainer--small`, `InputContainer--medium`, or `InputContainer--large` modifier on
the `InputContainer` element to control the size. `InputContainer--medium` is the default.

Each size expects a specific Tag and ControlButton size inside the selection area:

| InputContainer modifier  | Tag class     | ControlButton class     |
| ------------------------ | ------------- | ----------------------- |
| `InputContainer--small`  | `Tag--xsmall` | `ControlButton--xsmall` |
| `InputContainer--medium` | `Tag--small`  | `ControlButton--xsmall` |
| `InputContainer--large`  | `Tag--medium` | `ControlButton--xsmall` |

```html
<div class="InputContainer InputContainer--fill InputContainer--large" role="group" aria-label="Languages">
  <div class="UNSTABLE_ComboboxSelection">
    <div role="grid" … class="d-contents">
      <div role="row" class="Tag Tag--selected Tag--medium color-scheme-on-selected-basic">
        <!-- … -->
      </div>
    </div>
    <!-- … -->
  </div>
</div>
```

## Custom Selection Tags (Tag vs SplitTag)

The demo script reads `data-spirit-combobox-tag-template` on `.UNSTABLE_Combobox` to choose which
`<template>` clones into the selection grid:

- **Default** (`combobox-tag-template`) — a single selected [Tag][tag] row with a remove control.
- **SplitTag** (`combobox-split-tag-template`) — an [`UNSTABLE_SplitTag`][splittag] row with city label,
  nested distance [Dropdown][dropdown], and remove control (see the **Locations** demo).

```html
<div
  class="UNSTABLE_Combobox"
  data-spirit-element="combobox"
  data-spirit-combobox-tag-template="combobox-split-tag-template"
>
  <!-- … -->
</div>
```

## Helper Text

Add supplementary information below the Dropdown using the `HelperText` component. Give it a unique
`id` and reference it via `aria-describedby` on the input so screen readers announce the hint
when the user focuses the field.

```html
<div class="UNSTABLE_Combobox">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
      <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
        <div class="UNSTABLE_ComboboxSelection">
          <div role="group" … class="d-contents"><!-- … --></div>
          <input
            type="text"
            id="combobox-input"
            role="combobox"
            aria-describedby="combobox-helper"
            class="UNSTABLE_Combobox__input"
            …
          />
        </div>
      </div>
      <div role="dialog" class="DropdownPopover placement-bottom-start" …><!-- … --></div>
    </div>
    <div id="combobox-helper" class="HelperText">You can select multiple languages.</div>
  </div>
</div>
```

## Required

Mark the Combobox as required using the `Label--required` modifier and `aria-required="true"` on the
filter input. Do not use the native `required` attribute — the input is a filter, not the selection
value, so browser constraint validation would not reflect whether an option is selected.

```html
<div class="UNSTABLE_Combobox">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label Label--required" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
      <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
        <div class="UNSTABLE_ComboboxSelection">
          <div role="group" … class="d-contents"><!-- … --></div>
          <input
            type="text"
            id="combobox-input"
            role="combobox"
            class="UNSTABLE_Combobox__input"
            aria-required="true"
            …
          />
        </div>
      </div>
      <div role="dialog" class="DropdownPopover placement-bottom-start" …><!-- … --></div>
    </div>
  </div>
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
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label Label--danger" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
      <div
        class="InputContainer InputContainer--fill InputContainer--medium InputContainer--danger"
        role="group"
        aria-label="Languages"
      >
        <div class="UNSTABLE_ComboboxSelection">
          <div role="group" … class="d-contents"><!-- … --></div>
          <input
            type="text"
            id="combobox-input"
            role="combobox"
            aria-describedby="combobox-validation"
            class="UNSTABLE_Combobox__input"
            …
          />
        </div>
      </div>
      <div role="dialog" class="DropdownPopover placement-bottom-start" …><!-- … --></div>
    </div>
    <div id="combobox-validation" class="ValidationText ValidationText--danger" role="alert">
      Please select at least one language.
    </div>
  </div>
</div>
```

## Disabled

Add `UNSTABLE_Combobox--disabled` on the root element, `InputContainer--disabled` on the input container
and the `disabled` attribute on the input to disable the Combobox.

```html
<div class="UNSTABLE_Combobox UNSTABLE_Combobox--disabled">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label Label--disabled" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
      <div
        class="InputContainer InputContainer--fill InputContainer--medium InputContainer--disabled"
        role="group"
        aria-label="Languages"
      >
        <div class="UNSTABLE_ComboboxSelection">
          <div role="group" … class="d-contents"><!-- … --></div>
          <input type="text" id="combobox-input" role="combobox" class="UNSTABLE_Combobox__input" disabled … />
        </div>
      </div>
      <div role="dialog" class="DropdownPopover placement-bottom-start" …><!-- … --></div>
    </div>
  </div>
</div>
```

## With Clear Button

Place a clear-all `InputAddon` after the selection wrapper, inside the `InputContainer`.
Hide it with `hidden` and the `d-none` utility when nothing is selected (`InputAddon` uses
`display: flex`, which would otherwise override the `[hidden]` attribute).

```html
<div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
  <div class="UNSTABLE_ComboboxSelection">
    <!-- … selection grid and input … -->
  </div>

  <div class="InputAddon InputAddon--medium d-none" hidden>
    <button
      type="button"
      class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--hasBackground text-color-scheme dynamic-color-border dynamic-color-background-interactive accessibility-tap-target"
    >
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use href="/icons/svg/sprite.svg#close" />
      </svg>
      <span class="accessibility-hidden">Remove all</span>
    </button>
  </div>
</div>
```

## Dropdown and DropdownPopover

Customise the inner `Dropdown` and `DropdownPopover` elements directly using CSS utility classes
and data attributes. The combobox does not set these itself, so any values you add are applied as-is.

- **`DropdownPopover` element** — add a theme utility class (for example `theme-light-default`;
  this is the default) to control the panel theme.
- **`data-spirit-placement`** on `.DropdownPopover` — controls where the popover anchors relative
  to the input (for example `bottom-start`).
- **`data-spirit-fullwidthmode`** on `.DropdownPopover` — stretches the popover to the field width
  (`off` · `mobile-only` · `all`).

The following example positions the popover at `bottom-start` and expands it to full field width:

```html
<div class="UNSTABLE_Combobox">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
      <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
        <!-- … -->
      </div>
      <div
        role="dialog"
        class="DropdownPopover placement-bottom-start"
        data-spirit-placement="bottom-start"
        data-spirit-fullwidthmode="all"
      >
        <!-- … -->
      </div>
    </div>
  </div>
</div>
```

## Auxiliary Content in the Popover

The options `Stack` inside `DropdownPopover` uses `role="listbox"` (or `role="grid"` for multi-action rows). Any
content that is not a selectable option — empty state, loading indicator, tip, or other custom content — must
therefore be placed as a **sibling of the Stack**, not inside it.

### Empty State

Show a message when no options match the current query. Place it alongside the Stack:

```html
<div role="dialog" class="DropdownPopover placement-bottom-start">
  <div class="Stack Stack--spacing" role="listbox" …>
    <!-- options -->
  </div>
  <div role="status" aria-live="polite" class="UNSTABLE_Combobox__emptyState" hidden>Nothing found</div>
</div>
```

### Loading State

Include a loading indicator alongside the option list. The `UNSTABLE_Combobox__loading` element
is hidden by default:

```html
<div role="dialog" class="DropdownPopover placement-bottom-start">
  <div class="UNSTABLE_Combobox__loading" role="status" aria-live="polite" hidden>Loading…</div>
  <div class="Stack Stack--spacing" role="listbox" …>
    <!-- options -->
  </div>
</div>
```

## Accessibility

### Selection Area: Dynamic Role

The `.UNSTABLE_ComboboxSelection` wrapper carries no ARIA role. The inner selection div uses a dynamic role
(same pattern as [Picker][picker-selection-role]):

- **Empty state** — `role="group"`: a plain grouping container with no keyboard navigation contract.
- **Selected state** — `role="grid"`: switched by JavaScript when the first tag is added (or when the field
  renders with pre-selected values), and switched back to `group` when the last tag is removed.

The filter input sits as a sibling of that div so that `role="combobox"` is not a direct descendant of
`role="grid"`.

### Popover: `role="listbox"` or `role="grid"` with `aria-multiselectable`

The `DropdownPopover` element only handles popover positioning. The inner `Stack` carries the options widget — see
[Options Popup: Listbox or Grid](#options-popup-listbox-or-grid) for markup, when to use each pattern, and a grid
example.

`aria-multiselectable="true"` applies to both. Auxiliary children of the popover (loading, empty state, tips) sit
alongside the Stack so they are not interpreted as options.

The `<input role="combobox">` manages `aria-expanded`, `aria-controls`, and `aria-activedescendant`. Set
`aria-haspopup` to the same role as the options widget (`listbox` or `grid`); omit it for tip-only popovers.

DOM focus stays on the filter input (pure `aria-activedescendant`). Arrow keys only update the visually active option
or nested control — typing to filter remains available at any time.

The popover opens on **pointer click**, **typing**, or **Arrow Up / Down** — not when the field receives keyboard focus
alone (e.g. Tab).

In a grid popup, nested cell controls carry `tabindex="-1"` so Arrow Left / Right can reach them without adding tab
stops. When such a control removes its own row, activate the nearest enabled neighbouring option (or clear
`aria-activedescendant` when none is left) and keep DOM focus on the input.

### Popover: Custom Content

Any other supplementary content that is not selectable should be placed outside the options `Stack`:

```html
<div role="dialog" class="DropdownPopover placement-bottom-start">
  <div class="Stack Stack--spacing" role="listbox" …>
    <!-- options -->
  </div>
  <!-- custom content here, never inside the Stack -->
  <div>Tip: You can create a new tag</div>
</div>
```

### Keyboard Interaction

| Key                            | Context    | Action                                                                                             |
| ------------------------------ | ---------- | -------------------------------------------------------------------------------------------------- |
| Arrow Down                     | Text input | Opens the popover (if closed); activates the first / next enabled option (`aria-activedescendant`) |
| Arrow Up                       | Text input | Opens the popover (if closed); activates the last / previous enabled option                        |
| Arrow Right                    | Text input | Activates the next nested cell control in the visually active row (e.g. remove button)             |
| Arrow Left                     | Text input | Moves visual activation from a nested cell control back to the option row                          |
| Home                           | Text input | Activates the first enabled option (when an option is already active)                              |
| End                            | Text input | Activates the last enabled option (when an option is already active)                               |
| Enter                          | Text input | Toggles the visually active option, or activates the nested control when one is active             |
| Escape                         | Text input | Closes the popover                                                                                 |
| Tab                            | Text input | Closes the popover; moves focus to the next focusable element                                      |
| Backspace                      | Text input | Focuses the last tag when the filter is empty (remove with a second Backspace)                     |
| Arrow Left / Right / Up / Down | Tag        | Moves focus between tags (roving tabindex)                                                         |
| Home                           | Tag        | Moves focus to the first tag                                                                       |
| End                            | Tag        | Moves focus to the last tag                                                                        |
| Delete, Backspace              | Tag        | Removes the focused tag and returns focus to the filter input                                      |

Options marked `aria-disabled="true"` are skipped by Arrow Up / Down, Home and End. DOM focus never leaves the filter
input for option navigation; Space and printable characters type into the filter as usual.

### ARIA Attributes

| Attribute                        | Element                | Purpose                                                                |
| -------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| `role="group"`                   | InputContainer         | Groups the selection area and input together                           |
| `role="group"`                   | Selection inner div    | Initial role when no options are selected                              |
| `role="grid"`                    | Selection inner div    | Active role when tags are present; enables roving focus across tags    |
| `role="listbox"` / `role="grid"` | Options Stack          | Options widget (`listbox` default; `grid` for multi-action rows)       |
| `role="option"` / `role="row"`   | Option item            | One selectable option (listbox or grid)                                |
| `role="gridcell"`                | Tag / grid option cell | Contains the label and interactive controls (tags; grid options)       |
| `aria-live="off"`                | Selection inner area   | Announces added tags to screen readers without interrupting            |
| `role="combobox"`                | Text input             | Identifies the text input as a combobox                                |
| `aria-haspopup`                  | Text input             | `"listbox"` or `"grid"` matching the options widget; omit for tip-only |
| `aria-expanded`                  | Text input             | Indicates whether the popover is open                                  |
| `aria-controls`                  | Text input             | Points to the options widget (omit when there is none)                 |
| `aria-autocomplete`              | Text input             | Set to `"list"` to indicate filtered suggestions                       |
| `aria-activedescendant`          | Text input             | Points to the currently active option                                  |
| `aria-multiselectable`           | Options Stack          | Indicates multiple options can be selected simultaneously              |
| `aria-selected`                  | Option item            | Marks whether the option is currently selected                         |
| `aria-describedby`               | Tag / text input       | Links to the removal instruction / helper text / validation message    |

[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown/README.md
[picker-selection-role]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Picker/README.md#selection-area-dynamic-role
[smashing-magazine-placeholder]: https://www.smashingmagazine.com/2018/06/placeholder-attribute/
[splittag]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/UNSTABLE_SplitTag/README.md
[tag]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Tag/README.md
[w3-combobox-grid-popup]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/
[w3-combobox-list-autocomplete]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
