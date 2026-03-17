# UNSTABLE Picker

Picker is a form control that allows users to select one or more options from a dropdown and displays the
selected values as tags.

## Basic Usage

Picker is built on top of the [Dropdown][dropdown] component. It consists of a label, an input container
displaying chosen options as tags with a trigger button, and optional helper or validation text.

⚠️ The DropdownPopover is rendered using absolute positioning relative to the trigger. Make sure there is
enough space below the Picker (or around it, depending on the popover placement) so the popover does not
overflow its scrollable container or get clipped.

```html
<div class="UNSTABLE_Picker">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
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
        <span class="UNSTABLE_Picker__selectionLabel" aria-hidden="true">Languages</span>
      </div>
      <button
        data-spirit-toggle="dropdown"
        data-spirit-target="#picker-popover"
        class="UNSTABLE_Picker__trigger"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="picker-popover"
      >
        <span class="accessibility-hidden">Add</span>
        <svg class="Icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
        </svg>
      </button>
    </div>
    <div class="DropdownPopover" data-spirit-placement="bottom-start" id="picker-popover">
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

## Hidden Label

Use the `UNSTABLE_Picker__label--hidden` modifier to visually hide the label while keeping it
accessible to screen readers.

```html
<div class="UNSTABLE_Picker">
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
<div class="UNSTABLE_Picker">
  <span class="UNSTABLE_Picker__label UNSTABLE_Picker__label--required">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## Helper Text

Add supplementary information below the input using the `UNSTABLE_Picker__helperText` element.

```html
<div class="UNSTABLE_Picker">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
  <div class="UNSTABLE_Picker__helperText">Select one or more languages</div>
</div>
```

## Validation States

Validation states visually communicate feedback to the user. Apply a validation modifier class on
the root element and use `UNSTABLE_Picker__validationText` for the message.

Available validation states: `danger`, `warning`, `success`.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--danger">
  <span class="UNSTABLE_Picker__label UNSTABLE_Picker__label--required">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
  <div class="UNSTABLE_Picker__validationText">Please select at least one language</div>
</div>
```

## Disabled

Use the `UNSTABLE_Picker--disabled` modifier on the root element and the `disabled` attribute on
the trigger button to disable the Picker.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--disabled">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
      <button class="UNSTABLE_Picker__trigger" disabled>
        <!-- … -->
      </button>
    </div>
  </div>
</div>
```

## Fluid

Use the `UNSTABLE_Picker--fluid` modifier to make the Picker span the full width of its parent.

```html
<div class="UNSTABLE_Picker UNSTABLE_Picker--fluid">
  <span class="UNSTABLE_Picker__label">Languages</span>
  <div class="Dropdown">
    <div role="group" aria-label="Languages" class="UNSTABLE_Picker__inputContainer">
      <!-- … -->
    </div>
    <!-- … -->
  </div>
</div>
```

## Selected Tags

When options are selected, they appear as tags in the selection area. Each tag is a grid row with
a remove button:

```html
<div role="grid" aria-label="Selected languages" class="UNSTABLE_Picker__selection">
  <div
    role="row"
    tabindex="0"
    aria-label="Czech"
    aria-describedby="picker-tag-description"
    class="Tag Tag--selected Tag--small"
  >
    <div role="cell" aria-colindex="1" style="display: contents">
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
  </div>
</div>
<span id="picker-tag-description" hidden>Press Delete or Backspace to remove</span>
```

## JavaScript Interaction

The HTML/CSS prototype includes demo JavaScript that implements the interactive behavior described below.
When building the React component, reimplement this logic using React state and event handlers.

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

### Selection Area: Grid Role

The selection area uses `role="grid"` to display selected options as tags. The grid role was chosen over
alternatives because it is the only ARIA role that provides both:

1. **A keyboard navigation contract** — arrow keys move between items with roving `tabindex`, and only one
   tag is in the tab order at a time.
2. **Support for interactive content inside items** — each tag contains a remove button. Roles like `listbox`
   require `option` children that cannot contain interactive elements. A plain `list` has no keyboard
   navigation contract.

Each tag is structured as a `row` containing a `cell` with the tag label and a remove button.
A single-column grid is valid and follows the same pattern used by [React Aria][react-aria]'s TagGroup.

### Dropdown Popover: No Listbox Role

The dropdown popover intentionally does **not** use `role="listbox"`. The popover contains native checkbox
inputs inside a `<fieldset>`, which are already fully accessible for multi-select scenarios. Using
`role="listbox"` would create a role conflict because `listbox` expects `option` children with
`aria-selected`, not `checkbox` inputs.

The trigger button uses `aria-haspopup="dialog"` to indicate that activating it opens a popup that is not
a menu or listbox. This also applies to custom content pickers (e.g. a salary picker with radios, sliders,
and text fields).

### Keyboard Interaction

| Key                    | Action                                                |
| ---------------------- |-------------------------------------------------------|
| Arrow Down             | On trigger button: opens the dropdown popover         |
| Escape                 | Closes the dropdown popover, returns focus to trigger |
| Arrow Left/Right/Up/Down | Moves focus between tags (roving tabindex)          |
| Home                   | Moves focus to the first tag                          |
| End                    | Moves focus to the last tag                           |
| Delete, Backspace      | Removes the currently focused tag                     |
| Tab                    | Moves focus into/out of the selection area            |

### ARIA Attributes

| Attribute          | Element                        | Purpose                                            |
| ------------------ | ------------------------------ |----------------------------------------------------|
| `role="group"`     | `.UNSTABLE_Picker__inputContainer` | Groups the selection area and trigger together |
| `role="grid"`      | Selection area                 | Enables keyboard navigation with roving focus      |
| `role="row"`       | Tag                            | Represents a single selected option                |
| `role="cell"`      | Tag inner wrapper              | Contains the tag label and remove button           |
| `aria-live`        | Selection area                 | Announces changes to selected options              |
| `aria-haspopup`    | Trigger button                 | Indicates the button opens a popup                 |
| `aria-expanded`    | Trigger button                 | Indicates whether the popup is open                |
| `aria-controls`    | Trigger button                 | Points to the popup element                        |
| `aria-describedby` | Tag                            | Links to the hidden removal instruction            |

[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown/README.md
[react-aria]: https://react-aria.adobe.com/Select
