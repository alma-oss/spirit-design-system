# UNSTABLE Combobox

⚠️ This component is **UNSTABLE**. Its API and behavior may change significantly. Use with caution.

Combobox is a form control built on [Dropdown][dropdown-readme]. Users filter options by typing and select multiple
items; the current selection appears as [Tags][tag-readme] or custom content from `renderTags`. Compose options with
[`UNSTABLE_ComboboxOption`](#unstable_comboboxoption).

Behavior (keyboard, ARIA, open/close, selection) is part of this package (unlike the web package, where JS is demo-only).

Combobox is a composition of:

- [UNSTABLE_Combobox](#unstable_combobox) – Main container; you control `selectedKeys`, `isOpen`, `onToggle`, `inputValue`, and `onInputChange` (same open pattern as [Dropdown][dropdown-readme])
- [UNSTABLE_ComboboxOption](#unstable_comboboxoption) – One option in the popover (`option` or grid `row`)
- [UNSTABLE_ComboboxTag](#unstable_comboboxtag) – Tag layout for custom `renderTags` output
- [UNSTABLE_ComboboxSplitTag](#unstable_comboboxsplittag) – SplitTag layout with a nested select for custom `renderTags` output

Optional convenience wrapper (you do not need it to build the composition):

- [UNSTABLE_UncontrolledCombobox](#unstable_uncontrolledcombobox) – Same API with internal open, selection, and input state

For structure, accessibility, and layout, see the [UNSTABLE Combobox web documentation][combobox-web].

## UNSTABLE_Combobox

UNSTABLE_Combobox is the main container of the composition. Popover open state uses **`isOpen`** and **`onToggle`**,
like [Dropdown][dropdown-readme] (internally `useComboboxDisclosureState`). You can drive that from
[`useDisclosureState`][disclosure-hooks] (`isOpen={isExpanded}` / `onToggle={toggle}`) or any other toggle. Selection
uses **`selectedKeys`** and **`onSelectionChange`**. The filter string is controlled via **`inputValue`** /
**`onInputChange`** — **filtering and async loading are owned by the consumer**.

### Basic Usage

```tsx
import React, { useMemo, useState } from 'react';
import { Label, UNSTABLE_Combobox, UNSTABLE_ComboboxOption, useDisclosureState } from '@alma-oss/spirit-web-react';

const ALL_OPTIONS = [
  { id: 'cs', label: 'Czech' },
  { id: 'en', label: 'English' },
];

export const Example = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
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

### Building the Options List

Compose options as children with [`UNSTABLE_ComboboxOption`](#unstable_comboboxoption). For a static list, write them
inline; for search/filter, map your filtered data to the same components (see Basic Usage above). Clicking an option
(or pressing Enter / Space) toggles selection via `onSelectionChange`. Nested links and buttons keep their own
handlers.

When filtering unmounts options that are still selected, pass **`optionKeys`** with the full set of option ids so
“all selected” and “add more” stay correct. If every option stays mounted, you can omit `optionKeys`.

Empty, loading, and tip content belong next to the options list — use `hasEmptyState`, `isLoading`, and
`auxiliaryContent`. Override empty copy with `emptyStateLabel` (defaults to i18n `combobox.emptyState`).

The filter input min-width follows the visible placeholder (`emptySelectionLabel` / `label`, or `addMoreLabel`) via
`--spirit-combobox-input-min-width`. Override with
`UNSAFE_style={{ '--spirit-combobox-input-min-width': '18ch' }}` when you need a fixed width.

### Options Popup: Listbox or Grid

Combobox always supports **multi-select** (tags in the field). `optionsRole` only chooses how the **popover options**
are marked up for accessibility, not single vs multiple selection:

| Pattern               | Prop                    | Use when                                                                                             |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| **listbox** (default) | `optionsRole="listbox"` | Each row only toggles selection. See the **Search Results** demo.                                    |
| **grid**              | `optionsRole="grid"`    | Multi-action rows with one or more interactive elements (e.g. link + remove). See **Last Searches**. |
| none                  | `optionsRole={null}`    | Tip-only / `auxiliaryContent` only (**Custom Content** demo).                                        |

**Listbox (default):** no extra markup beyond the option content.

```tsx
<UNSTABLE_Combobox id="languages" label="Languages" /* …controlled props… */>
  <UNSTABLE_ComboboxOption value="cs">
    <Label>Czech</Label>
  </UNSTABLE_ComboboxOption>
</UNSTABLE_Combobox>
```

**Grid:** set `optionsRole="grid"`. Wrap custom actions in slots with `role="gridcell"` (the option label cell is
added for you).

```tsx
<UNSTABLE_Combobox id="last-searches" label="Last searches" optionsRole="grid" /* … */>
  <UNSTABLE_ComboboxOption
    value="painter"
    label="Painter"
    endSlot={
      <span role="gridcell">
        <CloseButton size="small" tabIndex={-1} label="Remove Painter" onClick={/* … */} />
      </span>
    }
  >
    <Link href="/search?q=painter">Painter</Link>
  </UNSTABLE_ComboboxOption>
</UNSTABLE_Combobox>
```

**None:** tip-only popover with `auxiliaryContent` and no options widget.

```tsx
<UNSTABLE_Combobox
  id="tips"
  label="Tips"
  optionsRole={null}
  auxiliaryContent={<Text>Tip: You can create a new tag</Text>}
  /* … */
/>
```

Selection tags use a dynamic role inside the field, independent of `optionsRole` (same idea as
[Picker][picker-readme] and [Item accessibility][item-readme]):

- **Empty selection** – `role="group"`
- **With tags** – `role="grid"` (keyboard navigation with roving `tabindex`)

In a **grid** popup, **Arrow Up / Down** move between rows and **Arrow Left / Right** move between the row and nested
cell controls (e.g. a remove button with `tabIndex={-1}`). Nested links are not part of that Left/Right cycle.
**Enter** on the active row activates an `a[href]` when present (otherwise toggles selection). **Tab** still closes
the popover. Disabled options are skipped by arrow / Home / End navigation.

DOM focus stays on the filter input (pure `aria-activedescendant`). Arrow keys only update the virtual focus on the
option or nested control; you can keep typing to filter at any time.

The popover opens on **pointer click**, **typing**, or **Arrow Up / Down**, not when the field receives keyboard focus
alone (e.g. Tab).

When a cell control removes its own row, restore the active option with
[`activateOption`](#ref): pass the nearest enabled neighbouring option id, or `null` when none is left (see the
grid demo). That clears any nested cell-control highlight and keeps DOM focus on the filter input.

### Custom Selection UI (renderTags)

Use `renderTags` when you need a custom selection area. The callback receives:

- **`selectedItems`** – Selected items in selection order (`{ value, label }`)
- **`onRemove(key)`** – Remove by option value
- **`removeTagAtIndex(index)`** – Remove by row index (prefer for remove buttons so focus moves like the default tags)
- **`getKeyboardGridRowProps(index)`** – Pass as `tagKeyboardProps` on each [`UNSTABLE_ComboboxTag`](#unstable_comboboxtag),
  or spread onto a custom `role="row"` wrapper. Use one row per selected item in DOM order (`0` … `n-1`).

If you omit `tagKeyboardProps` / row keyboard props, custom tags are not on the selection grid keyboard path; `onRemove` /
`removeTagAtIndex` still apply.

Default selection uses [`UNSTABLE_ComboboxTag`](#unstable_comboboxtag) (a single [Tag][tag-readme]). For joined
segments (label + select + remove), use [`UNSTABLE_ComboboxSplitTag`](#unstable_comboboxsplittag) — see the
**Locations** demo. For a fully custom row, compose your own `role="row"` (for example with
[`UNSTABLE_SplitTag`][splittag-readme]) and pass `getKeyboardGridRowProps`.

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

### Passing Props to Inner Parts

Combobox is a compound component. Use these props when you need to tweak the inner `Label`, `Dropdown`,
`DropdownPopover`, or default `Tag` — for example theme, placement, or class names. Each `*Props` type only includes
values Combobox does not set itself.

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

| Property                   | Description                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `activateOption(optionId)` | Visually activate an option by value, or pass `null` to clear; focuses the filter input |
| `close()`                  | Closes the popover (via `onToggle`)                                                     |
| `focus()`                  | Focuses the combobox filter input                                                       |
| `selectedKeys`             | Current selected keys (mirrors the `selectedKeys` prop)                                 |

| Name                          | Type                                                        | Default                                     | Required | Description                                                                                                                          |
| ----------------------------- | ----------------------------------------------------------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `addMoreDescriptionText`      | `string`                                                    | i18n `combobox.addMoreDescription`          | ✕        | Visually-hidden add-more SR text; supports `{label}`                                                                                 |
| `addMoreLabel`                | `string`                                                    | i18n `combobox.addMore`                     | ✕        | Input placeholder when ≥1 tag selected                                                                                               |
| `auxiliaryContent`            | `ReactNode`                                                 | —                                           | ✕        | Extra popover content sibling of the options widget                                                                                  |
| `children`                    | `ReactNode`                                                 | —                                           | ✕        | Options inside the popover widget (optional for tip-only / `auxiliaryContent`)                                                       |
| `dropdownProps`               | `DropdownBaseProps`                                         | —                                           | ✕        | Alignment and dropdown behavior for the inner `Dropdown`; see [Passing Props to Inner Parts](#passing-props-to-inner-parts)          |
| `emptySelectionLabel`         | `string`                                                    | —                                           | ✕        | Input placeholder when nothing selected; supports `{label}`                                                                          |
| `emptyStateLabel`             | `ReactNode`                                                 | i18n `combobox.emptyState`                  | ✕        | Empty-state slot content                                                                                                             |
| `hasClearButton`              | `bool`                                                      | `false`                                     | ✕        | Clear-all addon when selection is non-empty                                                                                          |
| `hasEmptyState`               | `bool`                                                      | `false`                                     | ✕        | Enables empty-state slot; shown when there are no option children                                                                    |
| `hasValidationIcon`           | `bool`                                                      | `false`                                     | ✕        | Whether to show the validation icon                                                                                                  |
| `helperText`                  | `ReactNode`                                                 | —                                           | ✕        | Helper text below the field                                                                                                          |
| `id`                          | `string`                                                    | —                                           | ✓        | Stable id for the combobox and related elements                                                                                      |
| `inputValue`                  | `string`                                                    | —                                           | ✓        | Controlled filter/query string                                                                                                       |
| `isDisabled`                  | `bool`                                                      | `false`                                     | ✕        | Disables input, tags, and interaction                                                                                                |
| `isLabelHidden`               | `bool`                                                      | `false`                                     | ✕        | Visually hides the label (remains accessible)                                                                                        |
| `isLoading`                   | `bool`                                                      | `false`                                     | ✕        | Shows the loading slot                                                                                                               |
| `isOpen`                      | `bool`                                                      | —                                           | ✓        | Popover open state                                                                                                                   |
| `isRequired`                  | `bool`                                                      | `false`                                     | ✕        | Required indicator on the label and `aria-required` on the filter input                                                              |
| `label`                       | `string`                                                    | —                                           | ✓        | Visible label and accessible name                                                                                                    |
| `labelProps`                  | `StyleProps`                                                | —                                           | ✕        | [Style props][readme-style-props] for the inner `Label`; see [Passing Props to Inner Parts](#passing-props-to-inner-parts)           |
| `loadingLabel`                | `ReactNode`                                                 | i18n `combobox.loading`                     | ✕        | Loading slot content (text and/or spinner)                                                                                           |
| `onInputChange`               | `(value: string) => void`                                   | —                                           | ✓        | Called when the filter input changes                                                                                                 |
| `onSelectionChange`           | `(keys: string[]) => void`                                  | —                                           | ✓        | Called when the selection changes                                                                                                    |
| `onToggle`                    | `() => void`                                                | —                                           | ✓        | Toggle callback; parent updates `isOpen`                                                                                             |
| `optionKeys`                  | `string[]`                                                  | from children                               | ✕        | Full option id set for all-selected / add-more; required when filtered options unmount                                               |
| `optionsRole`                 | `'listbox'` \| `'grid'` \| `null`                           | `listbox`                                   | ✕        | Options widget pattern; see [Options Popup: Listbox or Grid](#options-popup-listbox-or-grid)                                         |
| `popoverProps`                | `StyleProps`                                                | `{ theme: 'theme-light-default' }`          | ✕        | [Style props][readme-style-props] for the inner `DropdownPopover`; see [Passing Props to Inner Parts](#passing-props-to-inner-parts) |
| `removeAllLabel`              | `string`                                                    | i18n `combobox.removeAll`                   | ✕        | Accessible label for clear-all                                                                                                       |
| `removeItemLabel`             | `string`                                                    | i18n `combobox.removeItemLabel`             | ✕        | Template for per-tag remove; supports `{itemLabel}`                                                                                  |
| `renderTags`                  | `(options: UnstableComboboxRenderTagsOptions) => ReactNode` | —                                           | ✕        | Custom selection UI; see [Custom Selection UI (renderTags)](#custom-selection-ui-rendertags)                                         |
| `selectedKeys`                | `string[]`                                                  | —                                           | ✓        | Selected option ids (insertion order)                                                                                                |
| `selectionAriaLabel`          | `string`                                                    | i18n `combobox.selectionAriaLabel`          | ✕        | `aria-label` for the selection area (`group` / `grid`); supports `{label}`                                                           |
| `selectionCountLabel`         | `string`                                                    | i18n `combobox.selectionCountLabel`         | ✕        | Input `aria-label` when multiple selected; supports `{label}`, `{count}`                                                             |
| `selectionCountLabelSingular` | `string`                                                    | i18n `combobox.selectionCountLabelSingular` | ✕        | Input `aria-label` when one selected; supports `{label}`, `{count}`                                                                  |
| `size`                        | [Size dictionary][dictionary-size]                          | `medium`                                    | ✕        | Size of the field shell                                                                                                              |
| `tagDescriptionText`          | `string`                                                    | i18n `combobox.tagDescriptionText`          | ✕        | Hidden SR hint for tag removal                                                                                                       |
| `tagProps`                    | `StyleProps`                                                | —                                           | ✕        | [Style props][readme-style-props] for the default `Tag` elements; see [Passing Props to Inner Parts](#passing-props-to-inner-parts)  |
| `validationState`             | [Validation dictionary][dictionary-validation]              | —                                           | ✕        | Validation state                                                                                                                     |
| `validationText`              | `ReactNode` \| `ReactNode[]`                                | —                                           | ✕        | Validation message                                                                                                                   |
| `variant`                     | [Fill Variants dictionary][dictionary-variant]              | `fill`                                      | ✕        | `InputContainer` variant                                                                                                             |

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
| `defaultIsOpen`       | `bool`                     | `false` | ✕        | Initial popover open state                |
| `defaultSelectedKeys` | `string[]`                 | `[]`    | ✕        | Initial selection                         |
| `id`                  | `string`                   | —       | ✓        | Stable id                                 |
| `label`               | `string`                   | —       | ✓        | Label                                     |
| `onInputChange`       | `(value: string) => void`  | —       | ✕        | Optional callback when the filter changes |
| `onSelectionChange`   | `(keys: string[]) => void` | —       | ✕        | Optional callback when selection changes  |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_ComboboxOption

UNSTABLE_ComboboxOption is one option in the popover options widget (combobox popover context is required). `value` must
match entries in `selectedKeys`. Markup follows parent [`optionsRole`](#options-popup-listbox-or-grid): `role="option"` for listbox
(default), or `role="row"` with a nested `role="gridcell"` for grid. For multi-action rows (one or more interactive
elements), put extra cells in `endSlot` / `startSlot` (see the **Last Searches** demo).
Pass optional **`label`** when `children` are rich and the selection tag should show a short title.

Selection (`isSelected` / `aria-selected`), namespaced option `id`, and disabled state are controlled by the combobox.
Pass `isDisabled` on the option for a permanently disabled item; combobox-level `isDisabled` is inherited.

### API

| Name         | Type        | Default | Required | Description                                                                        |
| ------------ | ----------- | ------- | -------- | ---------------------------------------------------------------------------------- |
| `children`   | `ReactNode` | —       | ✓        | Option label content (wrapped in `role="gridcell"` when `optionsRole="grid"`)      |
| `isDisabled` | `bool`      | `false` | ✕        | Disables this option (also inherits Combobox `isDisabled`)                         |
| `label`      | `string`    | —       | ✕        | Short label for selection tags when `children` are rich; defaults to children text |
| `value`      | `string`    | —       | ✓        | Key used in `selectedKeys` (`data-spirit-value`; DOM `id` is namespaced)           |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_ComboboxTag

UNSTABLE_ComboboxTag is the tag shell for custom `renderTags` output. It applies accessibility roles consistent with
the default tags (`role="row"`, remove control). Nested [Tag][tag-readme] `color` / `size` and remove
[ControlButton][control-button] `size` come from Combobox’s [`ContextPropsProvider`][context-props] (mapped from the
Combobox shell `size`). Combobox-specific values such as `tagDescriptionId` and nested overlay open state stay on
Combobox context — not ContextProps.

### API

| Name               | Type                    | Default                         | Required | Description                                                    |
| ------------------ | ----------------------- | ------------------------------- | -------- | -------------------------------------------------------------- |
| `children`         | `ReactNode`             | —                               | ✕        | Tag content (defaults to `label`)                              |
| `isDisabled`       | `bool`                  | `false`                         | ✕        | Disables the tag                                               |
| `label`            | `ReactNode`             | —                               | ✓        | Accessible label for the tag                                   |
| `onRemove`         | `() => void`            | —                               | ✓        | Remove button handler                                          |
| `removeLabel`      | `string`                | i18n `combobox.removeItemLabel` | ✕        | Accessible name for the remove control; supports `{itemLabel}` |
| `tagKeyboardProps` | `SelectionGridRowProps` | —                               | ✕        | Row props from `getKeyboardGridRowProps` in `renderTags`       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_ComboboxSplitTag

`UNSTABLE_ComboboxSplitTag` is a data-driven selection row for `renderTags`: a
[`UNSTABLE_SplitTag`][splittag-readme] with a label segment, nested select (Dropdown + listbox), and remove
control. Wire `tagKeyboardProps` the same way as [`UNSTABLE_ComboboxTag`](#unstable_comboboxtag). Nested overlay
and keyboard behaviour (including closing the Combobox popover when the select opens) is handled via Combobox
context; Tag / ControlButton sizing and `isDisabled` come from Combobox [`ContextPropsProvider`][context-props].

The nested select open state is managed with [`useDisclosureState`][disclosure-hooks] inside the component. The
Combobox popover itself stays on the public **`isOpen`** / **`onToggle`** API and `useComboboxDisclosureState` —
do not treat the Combobox input as an ARIA disclosure.

```tsx
renderTags={({ getKeyboardGridRowProps, removeTagAtIndex, selectedItems }) =>
  selectedItems.map((item, index) => (
    <UNSTABLE_ComboboxSplitTag
      key={item.value}
      label={item.label}
      onRemove={() => removeTagAtIndex(index)}
      tagKeyboardProps={getKeyboardGridRowProps(index)}
      select={{
        value: distances[item.value],
        options: ['+5 km', '+10 km', '+20 km', '+50 km'],
        onChange: (next) => setDistances((current) => ({ ...current, [item.value]: next })),
      }}
    />
  ))
}
```

### API

| Name               | Type                                  | Default                         | Required | Description                                                |
| ------------------ | ------------------------------------- | ------------------------------- | -------- | ---------------------------------------------------------- |
| `isDisabled`       | `bool`                                | Combobox `isDisabled`           | ✕        | Disables the row                                           |
| `label`            | `ReactNode`                           | —                               | ✓        | Primary label segment                                      |
| `onRemove`         | `() => void`                          | —                               | ✓        | Remove button handler                                      |
| `removeLabel`      | `string`                              | i18n `combobox.removeItemLabel` | ✕        | Accessible name for remove; supports `{itemLabel}`         |
| `select`           | `UnstableComboboxSplitTagSelectProps` | —                               | ✓        | Controlled select segment (`value`, `options`, `onChange`) |
| `tagKeyboardProps` | `SelectionGridRowProps`               | —                               | ✕        | Row props from `getKeyboardGridRowProps` in `renderTags`   |

#### `select`

| Name           | Type                             | Default                     | Required | Description                            |
| -------------- | -------------------------------- | --------------------------- | -------- | -------------------------------------- |
| `aria-label`   | `string`                         | derived from selected value | ✕        | Accessible name for the select trigger |
| `id`           | `string`                         | auto                        | ✕        | Id prefix for Dropdown / option ids    |
| `listboxLabel` | `string`                         | `"Options"`                 | ✕        | Accessible name for the listbox        |
| `onChange`     | `(value: string) => void`        | —                           | ✓        | Selected option change                 |
| `options`      | `string[] \| { value, label }[]` | —                           | ✓        | Select options                         |
| `value`        | `string`                         | —                           | ✓        | Selected option value                  |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[combobox-themes-demo]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Combobox/demo/ComboboxThemes.tsx
[combobox-web]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/UNSTABLE_Combobox/README.md
[context-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#shared-and-inherited-props
[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#fill-variants
[disclosure-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/disclosure/README.md
[dropdown-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/README.md
[item-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
[picker-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[splittag-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_SplitTag/README.md
[tag-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tag/README.md
