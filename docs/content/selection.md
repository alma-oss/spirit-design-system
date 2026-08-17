# Selection Pattern

Selection manages which item keys are chosen in list-style interfaces. It is the shared foundation for selection state and tag-grid keyboard behaviour in components such as [UNSTABLE_Picker][picker] and [UNSTABLE_Combobox][combobox].

## Overview

Many Spirit components let users pick one or more values from a set of options. Without a shared selection layer, each component reimplements toggle-versus-replace decisions, tag removal, and keyboard navigation over selected tags.

A **Selection** pattern splits that work into three hooks:

- `useSelectionState` — owns or mirrors `selectedKeys`
- `useSelectionManager` — mutation helpers (`toggleSelection`, `replaceSelection`, `removeItem`, `removeAll`, `isSelected`)
- `useSelectionAria` — tag-grid roving tabindex and Delete/Backspace removal

Item identity and labels come from [Collection][collections]; Selection does not walk children or the DOM for option metadata.

## When to Use

- The UI lets users **select items by clicking, tapping, or using the keyboard** (for example Picker, Combobox, or a custom list with checkboxes or radios)
- Selected values are shown as **tags or chips** that users can review and remove
- Building or extending a component that keeps a list of selected keys
- Sharing toggle / replace / remove behaviour across Picker-style and Combobox-style UIs

## When Not to Use

- The UI **does not need interactive selection** — for example a static list or read-only display of data
- A **fixed, non-editable value** is enough (readonly field with no way to change the choice)
- You need item identity, labels, or sections only — use [Collection][collections], not Selection
- Do not use Selection as a replacement for Collection (item identity, labels, sections)

## Best Practices

### Make Selection Visually and Semantically Clear

Users and assistive technologies should recognize what is selectable and what is already selected:

- Show **selected state** clearly (highlight, checkmark, filled radio, or tag)
- Use **radio-style** presentation when only one value is allowed; **checkbox-style** or **tags** when multiple values are allowed
- Expose selection to assistive tech (`aria-selected` on options, appropriate roles for the list and tags)

### Keep Selection Separate From Collection

Collection answers “what items exist?”. Selection answers “which keys are selected?”. Pass keys between them; do not store rendered nodes inside selection state.

### Drive Tag Removal Through the Manager

Build `useSelectionAria`’s `onRemoveAtIndex` from `useSelectionManager`’s `removeItem` / `removeAll` so Picker and Combobox do not hand-roll filter-and-notify logic.

## Behaviors

### SelectionMode

| Mode       | Meaning                                                               |
| ---------- | --------------------------------------------------------------------- |
| `single`   | At most one key selected (radio-style). Removal clears the selection. |
| `multiple` | Zero or more keys (checkbox-style).                                   |

Spirit does not use a `none` selection mode.

### SelectionBehavior (future)

`toggle` (click adds/removes) versus `replace` (click replaces; modifiers extend) is a future concept. Spirit does not expose `selectionBehavior` yet — the split is `selectionMode`-driven at the call site. When `selectionBehavior: 'replace'` is added, touch targets should still behave as toggle because modifier keys are unavailable.

### Disabled Items

Generic `isDisabled(key)` on the manager is deferred until Collection is wired into Selection. Components that already know a row is disabled (for example Combobox option `isDisabled`) guard selection at the interaction layer today.

### Keyboard

- **Tag grid** — Arrow / Home / End move between tags; Delete and Backspace remove; implemented by `useSelectionAria`
- **Option list** — Combobox keeps a separate activedescendant implementation for the popover list

## Common Use Cases

| Example               | Use cases                                                                    |
| --------------------- | ---------------------------------------------------------------------------- |
| Picker                | Single or multiple choice with selected values shown as tags                 |
| Combobox              | Filterable multiple selection with tags and a listbox popover                |
| Uncontrolled wrappers | Local `useSelectionState` + `setSelectedKeys` until the parent takes control |

## Related

- [`hooks/selection`][selection-hooks] — API for `useSelectionState`, `useSelectionManager`, `useSelectionAria`
- [Collection pattern][collections] — item identity and labels
- [UNSTABLE_Picker][picker] / [UNSTABLE_Combobox][combobox]

[collections]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/collections.md
[combobox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Combobox/README.md
[picker]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md
[selection-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/selection/README.md
