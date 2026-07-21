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
    │   │       ├── role="grid"                       aria-live="off"
    │   │       │   └── Tag                           role="row" (× N selected)
    │   │       │       └── role="gridcell"
    │   │       │           ├── tag label
    │   │       │           └── ControlButton         (remove)
    │   │       └── input[role="combobox"]            (inline, always last child)
    │   └── DropdownPopover
    │       └── Stack                                 role="grid" · aria-multiselectable="true"
    │           └── Item                              role="row" (× N options)
    │               └── role="gridcell"
    ├── HelperText                                    (optional)
    └── ValidationText                                (optional)
```

The selection wrapper (`.UNSTABLE_ComboboxSelection`) is a container holding two siblings:

1. A `role="grid"` div — its tag rows are semantically grouped as a grid for assistive technology.
2. The text input. Because `role="combobox"` cannot be a direct descendant of `role="grid"`, the
   input lives outside the grid div.

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
          <div
            role="row"
            id="opt-cs"
            aria-selected="true"
            class="Item Item--selected color-scheme-on-selected-subtle bg-color-scheme"
          >
            <div role="gridcell"><span class="Label element-stretched cursor-pointer">Spanish</span></div>
          </div>
          <div role="row" id="opt-cs" aria-selected="false" class="Item">
            <div role="gridcell"><span class="Label element-stretched cursor-pointer">Czech</span></div>
          </div>
          <div role="row" id="opt-en" aria-selected="false" class="Item">
            <div role="gridcell"><span class="Label element-stretched cursor-pointer">English</span></div>
          </div>
          <!-- More options… -->
        </div>
        <div role="status" aria-live="polite" class="UNSTABLE_Combobox__emptyState" hidden>Nothing found</div>
      </div>
    </div>
  </div>
</div>
```

### Placeholder and Add-More Affordance

The input's `placeholder` can carry the "add more" hint visually:

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
<div
  role="row"
  id="opt-cs"
  aria-selected="true"
  class="Item Item--selected color-scheme-on-selected-subtle bg-color-scheme"
>
  <div role="gridcell"><span class="Label element-stretched cursor-pointer">Czech</span></div>
</div>
```

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
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label" id="combobox-label" for="combobox-input">Languages</label>
    <div class="Dropdown">
      <div class="InputContainer InputContainer--fill InputContainer--medium" role="group" aria-label="Languages">
        <div class="UNSTABLE_ComboboxSelection">
          <div role="grid" … class="d-contents"><!-- … --></div>
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
      <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
    </div>
    <div id="combobox-helper" class="HelperText">You can select multiple languages.</div>
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
          <div role="grid" … class="d-contents"><!-- … --></div>
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
      <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
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
          <div role="grid" … class="d-contents"><!-- … --></div>
          <input type="text" id="combobox-input" role="combobox" class="UNSTABLE_Combobox__input" disabled … />
        </div>
      </div>
      <div class="DropdownPopover placement-bottom-start" …><!-- … --></div>
    </div>
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
      class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--hasBackground text-color-scheme"
      aria-label="Remove all"
    >
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use href="/icons/svg/sprite.svg#close" />
      </svg>
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

The `.UNSTABLE_ComboboxSelection` wrapper carries no ARIA role; the inner `role="grid"` div provides
the grid semantics (keyboard navigation contract with roving `tabindex`, support for interactive
content inside rows). The input sits as a sibling of the grid div so that `role="combobox"` is not
a direct descendant of `role="grid"`.

### Popover: `role="grid"` with `aria-multiselectable`

The `DropdownPopover` element only handles popover positioning. The inner `Stack` element carries
the grid semantics (`role="grid"`, `aria-multiselectable="true"`, the popover `id`, and
`aria-labelledby`) — that is where the `role="row"` option children actually live. Auxiliary
children of the popover (like the loading indicator) sit alongside the Stack so they are not
interpreted as grid rows.

The `<input role="combobox">` manages `aria-expanded`, `aria-controls`, and
`aria-activedescendant` to wire the input to the popover grid in accordance with the ARIA
combobox pattern.

For more information about the ARIA combobox pattern, please follow this article [Editable Combobox with Grid Popup Example][w3-combobox-grid-popup].

### Popover: Custom Content

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

### Keyboard Interaction

| Key                            | Context           | Action                                                                               |
| ------------------------------ | ----------------- | ------------------------------------------------------------------------------------ |
| Arrow Down                     | Text input        | Opens the popover (if closed); moves focus to the first visible option               |
| Arrow Up                       | Text input        | Opens the popover (if closed); moves focus to the last visible option                |
| Arrow Down                     | Option in popover | Moves focus to the next option; stays on the last option (no wrap)                   |
| Arrow Up                       | Option in popover | Moves focus to the previous option; returns focus to the input from the first option |
| Home                           | Option in popover | Moves focus to the first visible option                                              |
| End                            | Option in popover | Moves focus to the last visible option                                               |
| Space, Enter                   | Option in popover | Toggles selection of the focused option                                              |
| Escape                         | Text input        | Closes the popover                                                                   |
| Escape                         | Option in popover | Closes the popover; returns focus to the input                                       |
| Tab                            | Option in popover | Closes the popover; moves focus to the next focusable element                        |
| Shift + Tab                    | Option in popover | Closes the popover; returns focus to the input                                       |
| Any printable character        | Option in popover | Returns focus to the input; appends the character; filters the list                  |
| Arrow Left / Right / Up / Down | Tag               | Moves focus between tags (roving tabindex)                                           |
| Home                           | Tag               | Moves focus to the first tag                                                         |
| End                            | Tag               | Moves focus to the last tag                                                          |
| Delete, Backspace              | Tag               | Removes the focused tag                                                              |

### ARIA Attributes

| Attribute               | Element              | Purpose                                                             |
| ----------------------- | -------------------- | ------------------------------------------------------------------- |
| `role="group"`          | InputContainer       | Groups the selection area and input together                        |
| `role="grid"`           | Selection inner div  | Enables keyboard navigation with roving focus across tags           |
| `role="row"`            | Tag / option row     | Represents a single tag or option                                   |
| `role="gridcell"`       | Tag / option cell    | Contains the label and interactive controls                         |
| `aria-live="off"`       | Selection inner grid | Announces added tags to screen readers without interrupting         |
| `role="combobox"`       | Text input           | Identifies the text input as a combobox                             |
| `aria-haspopup="grid"`  | Text input           | Indicates the input controls a grid popover                         |
| `aria-expanded`         | Text input           | Indicates whether the popover is open                               |
| `aria-controls`         | Text input           | Points to the popover grid element                                  |
| `aria-autocomplete`     | Text input           | Set to `"list"` to indicate filtered suggestions                    |
| `aria-activedescendant` | Text input           | Points to the currently active option row                           |
| `aria-multiselectable`  | Popover grid (Stack) | Indicates multiple rows can be selected simultaneously              |
| `aria-selected`         | Option row           | Marks whether the option is currently selected                      |
| `aria-describedby`      | Tag / text input     | Links to the removal instruction / helper text / validation message |

[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown/README.md
[smashing-magazine-placeholder]: https://www.smashingmagazine.com/2018/06/placeholder-attribute/
[w3-aria-grid]: https://www.w3.org/TR/wai-aria/#grid
[w3-combobox-grid-popup]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/
