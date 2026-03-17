# UNSTABLE Picker

⚠️ This component is UNSTABLE. It may significantly change at any point in the future. Please use it with caution.

Picker is a form control that allows users to select one or more options from a dropdown and displays the
selected values as tags.

## Basic Usage

Picker is built on top of the [Dropdown][dropdown] component. It consists of a label, an input container
displaying chosen options as tags with a trigger button, and optional helper or validation text.

```txt
UNSTABLE_Picker
├── UNSTABLE_Picker__label
├── Dropdown
│   ├── UNSTABLE_Picker__inputContainer   role="group"
│   │   ├── UNSTABLE_Picker__selection    role="group" (empty) · role="grid" (selected)
│   │   │   ├── [empty]      UNSTABLE_Picker__selectionEmpty
│   │   │   └── [selected]   Tag          role="row" (× N)
│   │   │       └── role="gridcell"
│   │   │           ├── tag label
│   │   │           └── ControlButton    (remove)
│   │   └── UNSTABLE_Picker__trigger     aria-haspopup="dialog"
│   └── DropdownPopover                  role="dialog"
│       └── FieldGroup                   (checkboxes or custom content)
├── UNSTABLE_Picker__helperText          (optional)
└── UNSTABLE_Picker__validationText      (optional)
```

⚠️ The DropdownPopover is rendered using absolute positioning relative to the trigger. Make sure there is
enough space below the Picker (or around it, depending on the popover placement) so the popover does not
overflow its scrollable container or get clipped.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <div
        role="group"
        tabindex="-1"
        aria-atomic="false"
        aria-label="Selected languages"
        aria-live="off"
        aria-relevant="additions"
        id="picker-selection"
        class="UNSTABLE_Picker__selection"
      >
        <!-- The .UNSTABLE_Picker__selection role switches to "grid" and selectionEmpty is replaced with Tag elements when options are selected. -->
        <span class="UNSTABLE_Picker__selectionEmpty" aria-hidden="true">Languages</span>
      </div>
      <button
        data-spirit-toggle="dropdown"
        data-spirit-target="#picker-popover"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="picker-popover"
        class="UNSTABLE_Picker__trigger"
      >
        <span class="accessibility-hidden">Add</span>
        <svg class="Icon" width="20" height="20" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
        </svg>
      </button>
    </div>
    <div role="dialog" class="DropdownPopover" data-spirit-placement="bottom-start" id="picker-popover">
      <fieldset class="FieldGroup FieldGroup--fluid">
        <legend class="accessibility-hidden">Language</legend>
        <div class="FieldGroup__fields">
          <div class="Checkbox Checkbox--inputPositionStart Checkbox--item">
            <input type="checkbox" id="lang-cs" class="Checkbox__input" name="language" />
            <div class="Checkbox__text">
              <label class="Checkbox__label" for="lang-cs">Czech</label>
            </div>
          </div>
          <!-- More checkboxes… -->
        </div>
      </fieldset>
    </div>
  </div>
</div>
```

## Selected Tags

When options are selected, the selection area's `role` is switched from `group` to `grid` and the
placeholder label is replaced with Tag elements. Each tag is a grid row with a remove button:

Place a hidden `<span>` with a unique `id` anywhere in the `<body>` and reference it via
`aria-describedby` on every tag row. Screen readers will announce the instruction (e.g.
"Press Delete or Backspace to remove") when the tag receives focus.

```html
<div
  role="grid"
  tabindex="-1"
  aria-atomic="false"
  aria-label="Selected languages"
  aria-live="off"
  aria-relevant="additions"
  id="picker-selection"
  class="UNSTABLE_Picker__selection"
>
  <div
    role="row"
    tabindex="0"
    aria-label="Czech"
    aria-describedby="picker-tag-description"
    class="Tag Tag--selected Tag--small"
  >
    <!-- Tag content start -->
    <div role="gridcell" aria-colindex="1" class="d-contents">
      <span>Czech</span>
      <button
        type="button"
        aria-label="Remove Czech"
        class="ControlButton ControlButton--small ControlButton--symmetrical"
      >
        <svg class="Icon" width="16" height="16" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
      </button>
    </div>
    <!-- Tag content end -->
  </div>
</div>

<!-- AT help text for tags removal -->
<span id="picker-tag-description" hidden>Press Delete or Backspace to remove</span>
```

## Hidden Label

Use the `UNSTABLE_Picker__label--hidden` modifier to visually hide the label while keeping it
accessible to screen readers.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium">
  <span class="UNSTABLE_Picker__label UNSTABLE_Picker__label--hidden">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## Required

Mark the Picker as required using the `UNSTABLE_Picker__label--required` modifier. This displays
a red asterisk after the label text.

⚠️ The required state is only indicative and does not add any technical validation to the component.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium">
  <span class="UNSTABLE_Picker__label UNSTABLE_Picker__label--required">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## Sizes

Use the `UNSTABLE_Picker--small`, `UNSTABLE_Picker--medium`, or `UNSTABLE_Picker--large` modifier to
control the size of the input container. `UNSTABLE_Picker--medium` is considered the default size.

Each Picker size expects a matching Tag and ControlButton size inside the selection area:

| Picker modifier           | `min-height` | Tag class     | ControlButton class     |
| ------------------------- | ------------ | ------------- | ----------------------- |
| `UNSTABLE_Picker--small`  | 32px         | `Tag--xsmall` | `ControlButton--xsmall` |
| `UNSTABLE_Picker--medium` | 40px         | `Tag--small`  | `ControlButton--small`  |
| `UNSTABLE_Picker--large`  | 48px         | `Tag--medium` | `ControlButton--medium` |

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--large">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <div role="grid" aria-label="Selected languages" class="UNSTABLE_Picker__selection">
        <div role="row" tabindex="0" aria-label="Czech" class="Tag Tag--selected Tag--medium">
          <div role="gridcell" aria-colindex="1" class="d-contents">
            <span>Czech</span>
            <button
              type="button"
              aria-label="Remove Czech"
              class="ControlButton ControlButton--medium ControlButton--symmetrical"
            >
              <svg class="Icon" width="16" height="16" aria-hidden="true">
                <use xlink:href="/icons/svg/sprite.svg#close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## Helper Text

Add supplementary information below the input using the `UNSTABLE_Picker__helperText` element.
Give it a unique `id` and reference it via `aria-describedby` on the selection element so screen
readers announce the hint when the selection area receives focus.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <div
        role="group"
        aria-label="Selected languages"
        aria-describedby="picker-helper-text"
        class="UNSTABLE_Picker__selection"
      >
        <!-- … -->
      </div>
      <!-- … -->
    </div>
    <!-- … -->
  </div>
  <div id="picker-helper-text" class="UNSTABLE_Picker__helperText">Select one or more languages</div>
</div>
```

## Validation States

Validation states visually communicate feedback to the user. Apply a validation modifier class on
the root element and use `UNSTABLE_Picker__validationText` for the message. Give it a unique `id`
and reference it via `aria-describedby` on the selection element so screen readers announce the
message when the selection area receives focus.

Available validation states: `danger`, `warning`, `success`.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium UNSTABLE_Picker--danger">
  <span class="UNSTABLE_Picker__label UNSTABLE_Picker__label--required">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <div
        role="group"
        aria-label="Selected languages"
        aria-describedby="picker-validation-text"
        class="UNSTABLE_Picker__selection"
      >
        <!-- … -->
      </div>
      <!-- … -->
    </div>
    <!-- … -->
  </div>
  <div id="picker-validation-text" class="UNSTABLE_Picker__validationText">Please select at least one language</div>
</div>
```

## Disabled

Use the `UNSTABLE_Picker--disabled` modifier (or the `is-disabled` class) on the root element and
the `disabled` attribute on the trigger button and all interactive elements inside the selection
area (remove buttons) to disable the Picker.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium UNSTABLE_Picker--disabled">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <div role="grid" aria-label="Selected languages" class="UNSTABLE_Picker__selection">
        <div role="row" tabindex="0" aria-label="Czech" class="Tag Tag--selected Tag--disabled Tag--small">
          <div role="gridcell" aria-colindex="1" class="d-contents">
            <span>Czech</span>
            <button
              type="button"
              aria-label="Remove Czech"
              class="ControlButton ControlButton--small ControlButton--symmetrical"
              disabled
            >
              <svg class="Icon" width="16" height="16" aria-hidden="true">
                <use xlink:href="/icons/svg/sprite.svg#close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button
        data-spirit-toggle="dropdown"
        data-spirit-target="#picker-disabled"
        class="UNSTABLE_Picker__trigger"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="picker-disabled"
        disabled
      >
        <span class="accessibility-hidden">Add</span>
        <svg class="Icon" width="20" height="20" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
        </svg>
      </button>
    </div>
    <div role="dialog" class="DropdownPopover" data-spirit-placement="bottom-start" id="picker-disabled">
      <fieldset class="FieldGroup FieldGroup--fluid" disabled>
        <legend class="accessibility-hidden">Language</legend>
        <div class="FieldGroup__fields">
          <div class="Checkbox Checkbox--inputPositionStart Checkbox--item">
            <input type="checkbox" id="lang-disabled-cs" class="Checkbox__input" name="language" checked disabled />
            <div class="Checkbox__text">
              <label class="Checkbox__label" for="lang-disabled-cs">Czech</label>
            </div>
          </div>
          <!-- More checkboxes… -->
        </div>
      </fieldset>
    </div>
  </div>
</div>
```

## Fluid

Use the `UNSTABLE_Picker--fluid` modifier to make the Picker span the full width of its parent.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--medium UNSTABLE_Picker--fluid">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## JavaScript Interaction

The HTML/CSS prototype includes demo JavaScript that implements the interactive behavior described below.

👏 The interaction patterns are heavily inspired by [React Aria][react-aria]'s TagGroup component.
Big thanks to the React Aria team for their excellent work on accessible component patterns!

### Tag Selection Management

- When a checkbox in the dropdown is checked or unchecked, the selection area re-renders to reflect
  the current state: selected options appear as tags, and when nothing is selected, a placeholder
  label is shown.
- In **aggregated mode**, a single tag is displayed: it shows the option label when one item is selected,
  or `"{Label} ({count})"` when multiple items are selected. Removing the aggregated tag clears all
  selections.

### Roving Tabindex on Tags

The selection area uses roving `tabindex` to manage focus across tags:

- Only the last tag in the selection has `tabindex="0"` (the active tab stop). All other tags have
  `tabindex="-1"`.
- Arrow Left/Up and Arrow Right/Down move the `tabindex="0"` to the previous/next tag and focus it.
  Navigation wraps around at the edges.
- Home and End move focus to the first and last tag, respectively.
- When a tag row receives focus, the remove button inside it becomes focusable (`tabindex="0"`).
  When the row loses focus, the remove button goes back to `tabindex="-1"`.

### Tag Removal and Focus Recovery

When a tag is removed (via the remove button click, or Delete/Backspace key on the focused tag row):

1. The corresponding checkbox is unchecked and the selection re-renders.
2. Focus moves to the tag that now occupies the same index, or the previous tag if the removed tag
   was the last one.
3. If no tags remain, focus moves temporarily to the placeholder label (which gets `tabindex="0"`
   for the duration of focus and reverts on blur).

### Dropdown Trigger Keyboard Support

- **Arrow Down** on the trigger button opens the dropdown popover (if not already open).
- **Escape** on the trigger button closes the dropdown popover (if open).
- **Escape** inside the popover closes it and returns focus to the trigger button.

## Accessibility

### Selection Area: Dynamic Role

The selection area (`UNSTABLE_Picker__selection`) uses a dynamic ARIA role:

- **Empty state** — `role="group"`: a plain grouping container with no keyboard navigation contract.
  Its only child is the `UNSTABLE_Picker__selectionEmpty` placeholder.
- **Selected state** — `role="grid"`: switched by JavaScript when the first tag is added or when the
  picker renders with pre-selected values, and switched back to `group` when the last tag is removed.

[`role="grid"`][mdn-grid-role] was chosen over alternatives because it is the only ARIA role that provides both:

1. **A keyboard navigation contract** — arrow keys move between items with roving `tabindex`, and only one
   tag is in the tab order at a time.
2. **Support for interactive content inside items** — each tag contains a remove button. Roles like `listbox`
   require `option` children that cannot contain interactive elements. A plain `list` has no keyboard
   navigation contract.

Each tag is structured as a `row` containing a `cell` with the tag label and a remove button.
A single-column grid is valid and follows the same pattern used by [React Aria][react-aria]'s TagGroup.

### Dropdown Popover: No Listbox Role

The dropdown popover intentionally does **not** use `role="listbox"`. The popover is designed to accept
any content — Spirit components such as checkboxes, radios, sliders, and text fields. `role="listbox"`
would be too restrictive: it expects `option` children with `aria-selected`, which conflicts with native
interactive elements and prevents richer layouts.

The trigger button uses `aria-haspopup="dialog"` to indicate that activating it opens a popup that is not
a menu or listbox.

### Dropdown Popover: Required JavaScript Features

The [ARIA dialog role spec][mdn-dialog-role] mandates three JavaScript features. Because the popover is a
`<div role="dialog">`, none of these are provided by the browser and must be implemented explicitly:

1. **Initial focus** — when the popover opens, focus must move to the first focusable element inside
   it (the first checkbox). This is implemented by listening for the `shown.dropdown` event.
2. **Focus restoration** — when the popover closes by any means (Escape, click outside, Tab-out),
   focus must return to the trigger button. This is implemented by listening for the `hidden.dropdown`
   event, which fires on every close path.
3. **Tab-out-to-close** — for a non-modal anchored dropdown, the natural keyboard behaviour is that
   pressing Tab on the last focusable element closes the popover rather than wrapping focus back to
   the first element (which is the pattern for modal dialogs). This matches the combobox and date
   picker conventions.

`aria-modal="true"` is also set on the popover. Although the element is not in the browser's top
layer, `aria-modal="true"` instructs screen readers to treat content outside the popover as inert
while it is open, preventing virtual cursor navigation to the background.

#### Why `<div role="dialog">` and Not a Native `<dialog>` or the Popover API?

`<dialog>.showModal()` and `popover="auto"` both promote the element to the browser **top layer**.
The top layer severs the element from the CSS positioning context (`position: absolute` relative to
the `.Dropdown` parent) that `data-spirit-placement` relies on, so the popover would no longer
anchor to the trigger button.

`<dialog>.show()` avoids the top layer but provides no automatic focus management — it would require
exactly the same explicit JS as `<div role="dialog">` with no added benefit.

The **Popover API** (`popover="auto"`) would be the preferred future approach: all Spirit target
browsers already support it, and it would provide Escape, light dismiss, focus restoration, and
`aria-expanded` natively, leaving only initial focus to implement manually. The blocker is
positioning: the top layer requires either JS-calculated `position: fixed` coordinates (Floating UI
style) or CSS Anchor Positioning, which is not yet available in iOS Safari 18.x (a Spirit target).
Once the component adopts a JS positioning engine and drops iOS Safari 18.x, migrating to the
Popover API is strongly recommended.

### Keyboard Interaction

| Key                            | Action                                                                  |
| ------------------------------ | ----------------------------------------------------------------------- |
| Space, Enter                   | On trigger button: opens/closes the dropdown popover (native behaviour) |
| Arrow Down                     | On trigger button: opens the dropdown popover (keyboard enhancement)    |
| Escape                         | Closes the dropdown popover, returns focus to trigger                   |
| Arrow Left / Right / Up / Down | Moves focus between tags (roving tabindex)                              |
| Home                           | Moves focus to the first tag                                            |
| End                            | Moves focus to the last tag                                             |
| Delete, Backspace              | Removes the currently focused tag                                       |
| Tab (inside popover)           | On last focusable element: closes popover and returns focus to trigger  |

### ARIA Attributes

| Attribute          | Element           | Purpose                                                                              |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------ |
| `role="group"`     | Input container   | Groups the selection area and trigger together                                       |
| `role="group"`     | Selection area    | Initial role when no options are selected                                            |
| `role="grid"`      | Selection area    | Active role when options are selected; enables keyboard navigation with roving focus |
| `role="row"`       | Tag               | Represents a single selected option                                                  |
| `role="gridcell"`  | Tag inner wrapper | Contains the tag label and remove button                                             |
| `aria-live`        | Selection area    | Announces changes to selected options                                                |
| `role="dialog"`    | Dropdown popover  | Marks the popover as a dialog                                                        |
| `aria-modal`       | Dropdown popover  | Tells screen readers background content is inert while the popover is open           |
| `aria-haspopup`    | Trigger button    | Indicates the button opens a popup                                                   |
| `aria-expanded`    | Trigger button    | Indicates whether the popup is open                                                  |
| `aria-controls`    | Trigger button    | Points to the popup element                                                          |
| `aria-describedby` | Tag               | Links to the hidden removal instruction                                              |

[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown/README.md
[mdn-dialog-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role
[mdn-grid-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/grid_role
[react-aria]: https://react-aria.adobe.com/Select
