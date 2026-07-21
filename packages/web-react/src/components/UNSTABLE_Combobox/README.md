# UNSTABLE Combobox

⚠️ This component is **UNSTABLE**. Its API and behavior may change significantly. Use with caution.

This is the React implementation of the [UNSTABLE Combobox][combobox-web].

Combobox is a form control built on [Dropdown][dropdown-readme]. Users filter options by typing and select multiple
items; the current selection appears as **tags** or custom content from `renderTags`. Compose options with
[`UNSTABLE_ComboboxOption`](#unstable_comboboxoption) (same pattern as [`UNSTABLE_PickerItem`][picker-item-readme]).

Behavior (keyboard, ARIA, open/close, selection) is part of this package — unlike the web package, where JS is demo-only.

Combobox is a composition of:

- [UNSTABLE_Combobox](#unstable_combobox) – Main container; you control `selectedKeys`, `isOpen`, `onToggle`, `inputValue`, and `onInputChange` (same open pattern as [Dropdown][dropdown-readme])
- [UNSTABLE_UncontrolledCombobox](#unstable_uncontrolledcombobox) – Internal open, selection, and input state
- [UNSTABLE_ComboboxOption](#unstable_comboboxoption) – One option row in the popover grid
- [UNSTABLE_ComboboxTag](#unstable_comboboxtag) – Tag layout for custom `renderTags` output

For structure, accessibility, and layout, see the [UNSTABLE Combobox web documentation][combobox-web].

> **Dropdown popover:** The filter input uses `aria-haspopup="grid"` (same as the [web Combobox][combobox-web]).
> The popover still comes from Dropdown’s non-modal `role="dialog"` — a packaging constraint shared with
> [Picker][picker-readme].

> **Downshift:** Spirit does not use [Downshift][downshift]. Combobox reuses Dropdown + custom hooks
> (same posture as Picker).

## UNSTABLE_Combobox

UNSTABLE_Combobox is the main container of the composition. Popover open state uses **`isOpen`** and **`onToggle`**,
like [Dropdown][dropdown-readme]. Selection uses **`selectedKeys`** and **`onSelectionChange`**. The filter string is
controlled via **`inputValue`** / **`onInputChange`** — filtering and async loading are owned by the consumer.

### Basic Usage

```tsx
import React, { useMemo, useState } from 'react';
import { Label, UNSTABLE_Combobox, UNSTABLE_ComboboxOption, useToggle } from '@alma-oss/spirit-web-react';

const ALL_OPTIONS = [
  { id: 'cs', label: 'Czech' },
  { id: 'en', label: 'English' },
];

export const Example = () => {
  const [isOpen, onToggle] = useToggle(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLowerCase();

    return ALL_OPTIONS.filter((option) => option.label.toLowerCase().includes(query));
  }, [inputValue]);

  return (
    <UNSTABLE_Combobox
      id="languages"
      label="Languages"
      isOpen={isOpen}
      onToggle={onToggle}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      inputValue={inputValue}
      onInputChange={setInputValue}
      optionKeys={ALL_OPTIONS.map((option) => option.id)}
      hasEmptyState={filteredOptions.length === 0}
    >
      {filteredOptions.map((option) => (
        <UNSTABLE_ComboboxOption key={option.id} value={option.id}>
          <Label>{option.label}</Label>
        </UNSTABLE_ComboboxOption>
      ))}
    </UNSTABLE_Combobox>
  );
};
```

### Option Rows and Filtering

Prefer [`UNSTABLE_ComboboxOption`](#unstable_comboboxoption): it sets `role="row"`, nested `role="gridcell"`, and
syncs `isSelected` / `aria-selected` from Combobox context. Combobox owns toggle on option `mousedown` / Enter /
Space via `onSelectionChange`.

Pass **`optionKeys`** (all option ids) when filtered options are unmounted, so the “all selected” placeholder and
add-more affordance stay correct. If omitted, Combobox derives keys from currently mounted option children
(fine when the full set stays in the tree).

Auxiliary popover content (empty state, loading, tips) must be **siblings** of the option grid — use
`hasEmptyState`, `isLoading`, and `auxiliaryContent`. Empty-state copy comes from `emptyStateLabel`
(i18n `combobox.emptyState` by default; pass a custom `ReactNode` to override).

### Custom Selection UI (renderTags)

Use `renderTags` when you need a custom selection area. The callback receives:

- **`onRemove(key)`** – Remove by option value
- **`removeTagAtIndex(index)`** – Remove by row index (prefer for remove buttons so focus moves like the default tags)
- **`getKeyboardGridRowProps(index)`** – Pass as `tagKeyboardProps` on each [`UNSTABLE_ComboboxTag`](#unstable_comboboxtag).
  Use one row per selected item in DOM order (`0` … `n-1`).

If you omit `tagKeyboardProps`, custom tags are not on the selection grid keyboard path; `onRemove` /
`removeTagAtIndex` still apply.

### Themes

The combobox, its label, and the popover can each use a different [theme][readme-style-props]:

- **`theme`** on `UNSTABLE_Combobox` — selection area and filter field.
- **`labelProps.theme`** — visible label above the field (set this when the label sits on a different surface than the field).
- **`popoverProps.theme`** — dropdown panel with options (defaults to `theme-light-default`).

On a **Light on Brand** surface, keep the label on-brand and use **Light Default** for the field (popover uses the
same default theme):

```tsx
<Box theme="theme-light-on-brand" backgroundColor="primary" padding="space-800" borderRadius="300">
  <div className="theme-light-default">
    <UNSTABLE_UncontrolledCombobox
      id="demo-combobox-themes"
      defaultSelectedKeys={['cs', 'en']}
      label="Languages"
      labelProps={{ theme: 'theme-light-on-brand' }}
      popoverProps={{ theme: 'theme-light-default' }}
    >
      {/* UNSTABLE_ComboboxOption children */}
    </UNSTABLE_UncontrolledCombobox>
  </div>
</Box>
```

See the [Themes demo][combobox-themes-demo].

### `dropdownProps`, `popoverProps`, `labelProps`, and `tagProps`

Forward props to the inner `Dropdown`, `DropdownPopover`, `Label`, and `Tag` elements. Each `*Props` type only
includes values the combobox does not set itself.

- **`labelProps`** — [style props][readme-style-props] on the visible `Label` (for example `theme`).
- **`popoverProps`** — [style props][readme-style-props] on `DropdownPopover` (for example `theme`; default
  `{ theme: 'theme-light-default' }`).
- **`dropdownProps`** — `alignmentX`, `alignmentY`, [style props][readme-style-props], `placement`, `fullWidthMode`,
  and `onAutoClose`. Combobox always enables Dropdown `enableAutoClose` (not overridable).
- **`tagProps`** — [style props][readme-style-props] applied to every default `Tag` in the selection area (for example
  `UNSAFE_className`). Ignored when `renderTags` is used.

```tsx
<UNSTABLE_UncontrolledCombobox
  id="combobox-example"
  label="Languages"
  dropdownProps={{ fullWidthMode: 'all', placement: 'bottom-start' }}
  labelProps={{ theme: 'theme-light-on-brand' }}
  popoverProps={{ theme: 'theme-light-default' }}
  tagProps={{ UNSAFE_className: 'bg-accent-01-subtle' }}
>
  {/* UNSTABLE_ComboboxOption children */}
</UNSTABLE_UncontrolledCombobox>
```

### API

#### Ref

| Property       | Description                                             |
| -------------- | ------------------------------------------------------- |
| `close()`      | Closes the popover (via `onToggle`)                     |
| `focus()`      | Focuses the combobox filter input                       |
| `selectedKeys` | Current selected keys (mirrors the `selectedKeys` prop) |

| Name                          | Type                                                        | Default                                     | Required | Description                                                                                                                                                                                 |
| ----------------------------- | ----------------------------------------------------------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                          | `string`                                                    | —                                           | ✓        | Stable id for the combobox and related elements                                                                                                                                             |
| `label`                       | `string`                                                    | —                                           | ✓        | Visible label and accessible name                                                                                                                                                           |
| `children`                    | `ReactNode`                                                 | —                                           | ✕        | Option rows inside the popover grid (optional for tip-only / `auxiliaryContent`)                                                                                                            |
| `isOpen`                      | `bool`                                                      | —                                           | ✓        | Popover open state                                                                                                                                                                          |
| `onToggle`                    | `() => void`                                                | —                                           | ✓        | Toggle callback; parent updates `isOpen`                                                                                                                                                    |
| `selectedKeys`                | `string[]`                                                  | —                                           | ✓        | Selected option ids (insertion order)                                                                                                                                                       |
| `onSelectionChange`           | `(keys: string[]) => void`                                  | —                                           | ✓        | Called when the selection changes                                                                                                                                                           |
| `inputValue`                  | `string`                                                    | —                                           | ✓        | Controlled filter/query string                                                                                                                                                              |
| `onInputChange`               | `(value: string) => void`                                   | —                                           | ✓        | Called when the filter input changes                                                                                                                                                        |
| `optionKeys`                  | `string[]`                                                  | from children                               | ✕        | Full option id set for all-selected / add-more; required when filtered options unmount                                                                                                      |
| `isLoading`                   | `bool`                                                      | `false`                                     | ✕        | Shows the loading slot                                                                                                                                                                      |
| `hasEmptyState`               | `bool`                                                      | `false`                                     | ✕        | Enables empty-state slot; shown when there are no option children                                                                                                                           |
| `auxiliaryContent`            | `ReactNode`                                                 | —                                           | ✕        | Extra popover content sibling of the option grid                                                                                                                                            |
| `hasClearButton`              | `bool`                                                      | `false`                                     | ✕        | Clear-all addon when selection is non-empty                                                                                                                                                 |
| `helperText`                  | `ReactNode`                                                 | —                                           | ✕        | Helper text below the field                                                                                                                                                                 |
| `validationState`             | [Validation dictionary][dictionary-validation]              | —                                           | ✕        | Validation state                                                                                                                                                                            |
| `validationText`              | `ReactNode` \| `ReactNode[]`                                | —                                           | ✕        | Validation message                                                                                                                                                                          |
| `hasValidationIcon`           | `bool`                                                      | `false`                                     | ✕        | Whether to show the validation icon                                                                                                                                                         |
| `isDisabled`                  | `bool`                                                      | `false`                                     | ✕        | Disables input, tags, and interaction                                                                                                                                                       |
| `isLabelHidden`               | `bool`                                                      | `false`                                     | ✕        | Visually hides the label (remains accessible)                                                                                                                                               |
| `isRequired`                  | `bool`                                                      | `false`                                     | ✕        | Required indicator on the label (visual only)                                                                                                                                               |
| `size`                        | [Size dictionary][dictionary-size]                          | `medium`                                    | ✕        | Size of the field shell                                                                                                                                                                     |
| `variant`                     | [Fill Variants dictionary][dictionary-variant]              | `fill`                                      | ✕        | `InputContainer` variant                                                                                                                                                                    |
| `dropdownProps`               | `DropdownBaseProps`                                         | —                                           | ✕        | Alignment and dropdown behavior for the inner `Dropdown`; see [`dropdownProps`, `popoverProps`, `labelProps`, and `tagProps`](#dropdownprops-popoverprops-labelprops-and-tagprops)          |
| `popoverProps`                | `StyleProps`                                                | `{ theme: 'theme-light-default' }`          | ✕        | [Style props][readme-style-props] for the inner `DropdownPopover`; see [`dropdownProps`, `popoverProps`, `labelProps`, and `tagProps`](#dropdownprops-popoverprops-labelprops-and-tagprops) |
| `labelProps`                  | `StyleProps`                                                | —                                           | ✕        | [Style props][readme-style-props] for the inner `Label`; see [`dropdownProps`, `popoverProps`, `labelProps`, and `tagProps`](#dropdownprops-popoverprops-labelprops-and-tagprops)           |
| `tagProps`                    | `StyleProps`                                                | —                                           | ✕        | [Style props][readme-style-props] for the default `Tag` elements; see [`dropdownProps`, `popoverProps`, `labelProps`, and `tagProps`](#dropdownprops-popoverprops-labelprops-and-tagprops)  |
| `renderTags`                  | `(options: UnstableComboboxRenderTagsOptions) => ReactNode` | —                                           | ✕        | Custom selection UI; see [Custom Selection UI (renderTags)](#custom-selection-ui-rendertags)                                                                                                |
| `addMoreLabel`                | `string`                                                    | i18n `combobox.addMore`                     | ✕        | Input placeholder when ≥1 tag selected                                                                                                                                                      |
| `addMoreDescriptionText`      | `string`                                                    | i18n `combobox.addMoreDescription`          | ✕        | Visually-hidden add-more SR text; supports `{label}`                                                                                                                                        |
| `emptySelectionLabel`         | `string`                                                    | —                                           | ✕        | Input placeholder when nothing selected; supports `{label}`                                                                                                                                 |
| `emptyStateLabel`             | `ReactNode`                                                 | i18n `combobox.emptyState`                  | ✕        | Empty-state slot content                                                                                                                                                                    |
| `loadingLabel`                | `ReactNode`                                                 | i18n `combobox.loading`                     | ✕        | Loading slot content (text and/or spinner)                                                                                                                                                  |
| `removeAllLabel`              | `string`                                                    | i18n `combobox.removeAll`                   | ✕        | Accessible label for clear-all                                                                                                                                                              |
| `removeItemLabel`             | `string`                                                    | i18n `combobox.removeItemLabel`             | ✕        | Template for per-tag remove; supports `{itemLabel}`                                                                                                                                         |
| `selectionAriaLabel`          | `string`                                                    | i18n `combobox.selectionAriaLabel`          | ✕        | `aria-label` for the selection grid; supports `{label}`                                                                                                                                     |
| `selectionCountLabel`         | `string`                                                    | i18n `combobox.selectionCountLabel`         | ✕        | Input `aria-label` when multiple selected; supports `{label}`, `{count}`                                                                                                                    |
| `selectionCountLabelSingular` | `string`                                                    | i18n `combobox.selectionCountLabelSingular` | ✕        | Input `aria-label` when one selected; supports `{label}`, `{count}`                                                                                                                         |
| `tagDescriptionText`          | `string`                                                    | i18n `combobox.tagDescriptionText`          | ✕        | Hidden SR hint for tag removal                                                                                                                                                              |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_UncontrolledCombobox

UNSTABLE_UncontrolledCombobox wraps **UNSTABLE_Combobox** with internal state for popover open state, selection, and
the filter string. Filter starts as `''`. Use **`defaultIsOpen`** for the initial popover state (default `false`).

```tsx
import React from 'react';
import { Label, UNSTABLE_ComboboxOption, UNSTABLE_UncontrolledCombobox } from '@alma-oss/spirit-web-react';

export const Example = () => (
  <UNSTABLE_UncontrolledCombobox id="languages-uncontrolled" label="Languages" defaultSelectedKeys={['cs']}>
    <UNSTABLE_ComboboxOption value="cs">
      <Label>Czech</Label>
    </UNSTABLE_ComboboxOption>
    <UNSTABLE_ComboboxOption value="en">
      <Label>English</Label>
    </UNSTABLE_ComboboxOption>
  </UNSTABLE_UncontrolledCombobox>
);
```

### API

All props from **UNSTABLE_Combobox** apply except `isOpen`, `onToggle`, `selectedKeys`, and `inputValue`, which are
managed internally.

| Name                  | Type                       | Default | Required | Description                               |
| --------------------- | -------------------------- | ------- | -------- | ----------------------------------------- |
| `children`            | `ReactNode`                | —       | ✕        | Option rows (optional for tip-only)       |
| `id`                  | `string`                   | —       | ✓        | Stable id                                 |
| `label`               | `string`                   | —       | ✓        | Label                                     |
| `defaultIsOpen`       | `bool`                     | `false` | ✕        | Initial popover open state                |
| `defaultSelectedKeys` | `string[]`                 | `[]`    | ✕        | Initial selection                         |
| `onSelectionChange`   | `(keys: string[]) => void` | —       | ✕        | Optional callback when selection changes  |
| `onInputChange`       | `(value: string) => void`  | —       | ✕        | Optional callback when the filter changes |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_ComboboxOption

UNSTABLE_ComboboxOption is one option row in the popover grid (combobox popover context is required). `value` must
match entries in `selectedKeys`. It renders as [`Item`][item-readme] with `role="row"` and a nested `role="gridcell"`.

Selection (`isSelected` / `aria-selected`), namespaced row `id`, and disabled state are controlled by the combobox. Pass
`isDisabled` on the option for a permanently disabled row; combobox-level `isDisabled` is inherited.

### API

| Name         | Type        | Default | Required | Description                                                              |
| ------------ | ----------- | ------- | -------- | ------------------------------------------------------------------------ |
| `value`      | `string`    | —       | ✓        | Key used in `selectedKeys` (`data-spirit-value`; DOM `id` is namespaced) |
| `children`   | `ReactNode` | —       | ✓        | Option label content (wrapped in `role="gridcell"`)                      |
| `isDisabled` | `bool`      | `false` | ✕        | Disables this option (also inherits Combobox `isDisabled`)               |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_ComboboxTag

UNSTABLE_ComboboxTag is the tag shell for custom `renderTags` output. It applies combobox sizing and accessibility
roles consistent with the default tags. It wraps [Tag][tag-readme] with fixed `color`, `elementType`, and `size`.

### API

| Name               | Type                                    | Default                         | Required | Description                                                    |
| ------------------ | --------------------------------------- | ------------------------------- | -------- | -------------------------------------------------------------- |
| `children`         | `ReactNode`                             | —                               | ✕        | Tag content (defaults to `label`)                              |
| `isDisabled`       | `bool`                                  | `false`                         | ✕        | Disables the tag                                               |
| `label`            | `ReactNode`                             | —                               | ✓        | Accessible label for the tag                                   |
| `onRemove`         | `() => void`                            | —                               | ✓        | Remove button handler                                          |
| `removeLabel`      | `string`                                | i18n `combobox.removeItemLabel` | ✕        | Accessible name for the remove control; supports `{itemLabel}` |
| `tagKeyboardProps` | `UnstableComboboxSelectionGridRowProps` | —                               | ✕        | Row props from `getKeyboardGridRowProps` in `renderTags`       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[combobox-themes-demo]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Combobox/demo/ComboboxThemes.tsx
[combobox-web]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/UNSTABLE_Combobox/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#fill-variants
[downshift]: https://www.downshift-js.com/
[dropdown-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/README.md
[item-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
[picker-item-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md#unstable_pickeritem
[picker-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[tag-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tag/README.md
