# UNSTABLE Picker

⚠️ This component is **UNSTABLE**. Its API and behavior may change significantly. Use with caution.

This is the React implementation of the [UNSTABLE Picker][picker-web].

The Picker is a form control built on [Dropdown][dropdown-readme]. Users open a popover to choose options; the current selection appears as **tags** or custom content from `renderTags`. Compose **`UNSTABLE_PickerItem`** inside **`UNSTABLE_PickerGroup`** for list options (checkboxes when `selectionMode` is `multiple`, radios when it is `single`). You can also put arbitrary content in the popover and manage selection yourself.

Picker is a composition of:

- [UNSTABLE_Picker](#unstable_picker) – Main container; you control `selectedKeys`, `isOpen`, and `onToggle` (same pattern as [Dropdown][dropdown-readme])
- [UNSTABLE_UncontrolledPicker](#unstable_uncontrolledpicker) – Internal selection and popover state
- [UNSTABLE_PickerGroup](#unstable_pickergroup) – Field group with a legend around list options
- [UNSTABLE_PickerItem](#unstable_pickeritem) – One option row in the popover
- [UNSTABLE_PickerTag](#unstable_pickertag) – Tag layout for custom `renderTags` output

For structure, accessibility, and layout, see the [UNSTABLE Picker web documentation][picker-web].

## UNSTABLE_Picker

UNSTABLE_Picker is the main container of the composition. Popover open state uses **`isOpen`** and **`onToggle`**, like [Dropdown][dropdown-readme]. Selection uses **`selectedKeys`** and **`onSelectionChange`**.

### Basic Usage

```tsx
import React from 'react';
import {
  UNSTABLE_Picker,
  UNSTABLE_PickerGroup,
  UNSTABLE_PickerItem,
  useSelectionState,
  useToggle,
} from '@alma-oss/spirit-web-react';

export const Example = () => {
  const { selectedKeys, setSelectedKeys } = useSelectionState({ defaultSelectedKeys: ['cs'] });
  const [isOpen, onToggle] = useToggle(false);

  return (
    <UNSTABLE_Picker
      id="picker-languages"
      isOpen={isOpen}
      label="Languages"
      onToggle={onToggle}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <UNSTABLE_PickerGroup label="Languages">
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="en">English</UNSTABLE_PickerItem>
      </UNSTABLE_PickerGroup>
    </UNSTABLE_Picker>
  );
};
```

### Single Selection

Set `selectionMode` to `"single"`. Use the same `isOpen` / `onToggle` / `selectedKeys` pattern as in basic usage.

```tsx
<UNSTABLE_Picker
  id="picker-single"
  isOpen={isOpen}
  label="Language"
  selectionMode="single"
  onToggle={onToggle}
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
>
  <UNSTABLE_PickerGroup label="Language">{/* UNSTABLE_PickerItem children */}</UNSTABLE_PickerGroup>
</UNSTABLE_Picker>
```

### Single Selection with an “Any” Option

```tsx
import React, { useRef } from 'react';
import {
  Button,
  Radio,
  Text,
  UNSTABLE_Picker,
  UNSTABLE_PickerGroup,
  UNSTABLE_PickerItem,
  useSelectionState,
  useToggle,
} from '@alma-oss/spirit-web-react';
import type { SpiritUnstablePickerRef } from '@alma-oss/spirit-web-react';

const PICKER_ID = 'picker-publication-time';
const LABEL = 'Publication time';

export const PublicationTimePicker = () => {
  const [isOpen, onToggle] = useToggle(false);
  const { selectedKeys, setSelectedKeys } = useSelectionState({
    defaultSelectedKeys: [],
    selectionMode: 'single',
  });
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);

  return (
    <UNSTABLE_Picker
      ref={pickerRef}
      id={PICKER_ID}
      isOpen={isOpen}
      label={LABEL}
      selectedKeys={selectedKeys}
      selectionMode="single"
      onSelectionChange={setSelectedKeys}
      onToggle={onToggle}
    >
      <Text elementType="h3" emphasis="bold">
        {LABEL}
      </Text>
      <UNSTABLE_PickerGroup label={LABEL}>
        <Radio
          id={`${PICKER_ID}-any`}
          name={PICKER_ID}
          isChecked={selectedKeys.length === 0}
          isItem
          label="Any time"
          onChange={() => setSelectedKeys([])}
        />
        <UNSTABLE_PickerItem value="24h">Last 24 hours</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="3d">Last 3 days</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="1w">Last week</UNSTABLE_PickerItem>
      </UNSTABLE_PickerGroup>
      <Button onClick={() => pickerRef.current?.close()}>Apply</Button>
    </UNSTABLE_Picker>
  );
};
```

### Aggregated Tag

With `isAggregated`, a **single** tag shows the field label for one selected item, or `"{label} ({count})"` for multiple selections. Removing that tag clears the whole selection.

```tsx
<UNSTABLE_Picker
  id="picker-aggregated"
  isOpen={isOpen}
  label="Languages"
  isAggregated
  onToggle={onToggle}
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
>
  <UNSTABLE_PickerGroup label="Languages">{/* items */}</UNSTABLE_PickerGroup>
</UNSTABLE_Picker>
```

### Custom Selection UI (renderTags)

Use `renderTags` when the popover is not only a `UNSTABLE_PickerItem` list. The callback receives:

- **`onRemove(key)`** – Remove by item value
- **`removeTagAtIndex(index)`** – Remove by row index (prefer for remove buttons so focus moves like the default tags)
- **`getKeyboardGridRowProps(index)`** – Pass as `tagKeyboardProps` on each [`UNSTABLE_PickerTag`](#unstable_pickertag). Use one row per selected item in DOM order (`0` … `n-1`), or one row if that matches your `isAggregated` model.

If you omit `tagKeyboardProps`, custom tags are not on the selection grid keyboard path; `onRemove` / `removeTagAtIndex` still apply.

### Full Example

```tsx
import React, { useState } from 'react';
import { UNSTABLE_Picker, UNSTABLE_PickerGroup, UNSTABLE_PickerItem, useToggle } from '@alma-oss/spirit-web-react';

export const LanguagePicker = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['cs']);
  const [isOpen, onToggle] = useToggle(false);

  return (
    <UNSTABLE_Picker
      helperText="Select one or more languages"
      id="picker-languages-full"
      isOpen={isOpen}
      label="Languages"
      onToggle={onToggle}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <UNSTABLE_PickerGroup label="Languages">
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="kl">Greenlandic</UNSTABLE_PickerItem>
      </UNSTABLE_PickerGroup>
    </UNSTABLE_Picker>
  );
};
```

### Salary Picker (custom Popover Content)

Example with custom popover content (no `UNSTABLE_PickerItem`), `renderTags`, and `ref.close()`.

```tsx
import React, { useRef, useState } from 'react';
import {
  Button,
  Heading,
  Radio,
  Slider,
  Text,
  TextField,
  UNSTABLE_Picker,
  UNSTABLE_PickerGroup,
  UNSTABLE_PickerTag,
  useToggle,
} from '@alma-oss/spirit-web-react';
import type { SpiritUnstablePickerRef } from '@alma-oss/spirit-web-react';

const salaryFormatter = new Intl.NumberFormat('cs-CZ');
const formatNumber = (value: number) => salaryFormatter.format(value);

const SALARY_FROM_MIN = 0;
const SALARY_FROM_MAX = 10000;
const SALARY_FROM_DEFAULT = 3000;
const SALARY_SLIDER_STEP = 100;

const clampFromAmount = (n: number) => Math.min(SALARY_FROM_MAX, Math.max(SALARY_FROM_MIN, n));

export const SalaryPicker = () => {
  const [salary, setSalary] = useState<number | null>(null);
  const [isOpen, onToggle] = useToggle(false);
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);
  const hasSalaryLimit = salary !== null && Number.isFinite(salary);

  const fromAmount = hasSalaryLimit ? clampFromAmount(salary) : SALARY_FROM_DEFAULT;
  const salaryTagLabel = hasSalaryLimit ? `From ${formatNumber(salary)}` : '';
  const updateSalaryFromValue = (value: string) => {
    const next = Number(value);
    if (!Number.isFinite(next)) {
      return;
    }

    setSalary(clampFromAmount(next));
  };

  return (
    <UNSTABLE_Picker
      id="demo-picker-salary"
      ref={pickerRef}
      helperText="Set your minimum expected salary"
      isOpen={isOpen}
      label="Salary"
      onToggle={onToggle}
      renderTags={({ getKeyboardGridRowProps, onRemove }) => {
        if (!hasSalaryLimit) {
          return null;
        }

        return (
          <UNSTABLE_PickerTag
            label={salaryTagLabel}
            tagKeyboardProps={getKeyboardGridRowProps(0)}
            onRemove={() => onRemove('salary')}
          />
        );
      }}
      selectedKeys={hasSalaryLimit ? ['salary'] : []}
      onSelectionChange={(keys) => {
        if (keys.length === 0) setSalary(null);
      }}
    >
      <Heading elementType="h3" size="xsmall">
        Salary
      </Heading>
      <Text size="small">Set your minimum expected salary.</Text>
      <UNSTABLE_PickerGroup label="Salary">
        <Radio
          id="salary-no-limit"
          name="salary"
          isChecked={!hasSalaryLimit}
          isItem
          label="No limit"
          onChange={() => setSalary(null)}
        />
        <Radio
          id="salary-from"
          name="salary"
          isChecked={hasSalaryLimit}
          isItem
          label="From"
          onChange={() => setSalary(SALARY_FROM_DEFAULT)}
        />
        <TextField
          id="salary-textfield"
          label="Salary"
          isLabelHidden
          type="number"
          value={String(fromAmount)}
          onChange={(e) => updateSalaryFromValue(e.currentTarget.value)}
        />
        <Slider
          id="demo-picker-salary-slider"
          isLabelHidden
          label="Salary"
          max={SALARY_FROM_MAX}
          min={SALARY_FROM_MIN}
          step={SALARY_SLIDER_STEP}
          value={fromAmount}
          onChange={(e) => updateSalaryFromValue(e.target.value)}
        />
      </UNSTABLE_PickerGroup>
      <div className="d-grid mt-600">
        <Button onClick={() => pickerRef.current?.close()}>Apply</Button>
      </div>
    </UNSTABLE_Picker>
  );
};
```

### Themes

The picker, its label, and the popover can each use a different [theme][readme-style-props]:

- **`theme`** on `UNSTABLE_Picker` — selection area and trigger (the field control).
- **`labelProps.theme`** — visible label above the field (set this when the label sits on a different surface than the field, for example a brand header).
- **`popoverProps.theme`** — dropdown panel with options (defaults to `theme-light-default`).

On a **Light on Brand** surface, keep the label on-brand and use **Light Default** for the field (popover uses the same default theme):

```tsx
<Box theme="theme-light-on-brand" backgroundColor="primary" padding="space-800" borderRadius="300">
  <UNSTABLE_UncontrolledPicker
    id="demo-picker-themes"
    defaultSelectedKeys={['cs', 'dk']}
    label="Languages"
    theme="theme-light-default"
    labelProps={{ theme: 'theme-light-on-brand' }}
    popoverProps={{ theme: 'theme-light-default' }}
  >
    {/* … */}
  </UNSTABLE_UncontrolledPicker>
</Box>
```

See the [Themes demo][picker-themes-demo].

### `dropdownProps`, `popoverProps`, and `labelProps`

Forward props to the inner `Dropdown`, `DropdownPopover`, and `Label`. Each `*Props` type only includes values the picker does not set itself.

- **`labelProps`** — [style props][readme-style-props] on the visible `Label` (for example `theme`).
- **`popoverProps`** — [style props][readme-style-props] on `DropdownPopover` (for example `theme`; default `{ theme: 'theme-light-default' }`).
- **`dropdownProps`** — `alignmentX`, `alignmentY`, [style props][readme-style-props], `placement`, `fullWidthMode`, `enableAutoClose`, and `onAutoClose`.

```tsx
<UNSTABLE_Picker
  id="picker-example"
  label="Languages"
  dropdownProps={{ fullWidthMode: 'all', placement: 'bottom-start' }}
  labelProps={{ theme: 'theme-light-on-brand' }}
  popoverProps={{ theme: 'theme-light-default' }}
>
  {/* UNSTABLE_PickerGroup / UNSTABLE_PickerItem */}
</UNSTABLE_Picker>
```

### Icons

The trigger uses [Icon][web-react-icon-documentation] (`chevron-down` when closed, `chevron-up` when open).

### API

#### Ref

| Property       | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `close()`      | Closes the popover (via `onToggle`) and restores trigger focus |
| `selectedKeys` | Current selected keys (mirrors the `selectedKeys` prop)        |

| Name                  | Type                                                      | Default                            | Required | Description                                                                                                                                                            |
| --------------------- | --------------------------------------------------------- | ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addButtonLabel`      | `string`                                                  | i18n `picker.add`                  | ✕        | Visually hidden label for the trigger when the popover is closed                                                                                                       |
| `children`            | `ReactNode`                                               | —                                  | ✓        | Popover content (for example `UNSTABLE_PickerGroup` with `UNSTABLE_PickerItem`)                                                                                        |
| `closeButtonLabel`    | `string`                                                  | i18n `common.close`                | ✕        | Visually hidden label for the trigger when the popover is open                                                                                                         |
| `dropdownProps`       | `UnstablePickerDropdownProps`                             | —                                  | ✕        | Alignment and dropdown behavior for the inner `Dropdown`; see [`dropdownProps`, `popoverProps`, and `labelProps`](#dropdownprops-popoverprops-and-labelprops)          |
| `emptySelectionLabel` | `string`                                                  | —                                  | ✕        | Placeholder when nothing is selected; supports `{label}`                                                                                                               |
| `hasValidationIcon`   | `bool`                                                    | `false`                            | ✕        | Whether to show the validation icon                                                                                                                                    |
| `helperText`          | `ReactNode`                                               | —                                  | ✕        | Helper text below the field                                                                                                                                            |
| `id`                  | `string`                                                  | —                                  | ✓        | Stable id for the picker and related elements                                                                                                                          |
| `isAggregated`        | `bool`                                                    | `false`                            | ✕        | If true, shows one summary tag instead of one tag per item                                                                                                             |
| `isDisabled`          | `bool`                                                    | `false`                            | ✕        | Disables the picker and options                                                                                                                                        |
| `isLabelHidden`       | `bool`                                                    | `false`                            | ✕        | Visually hides the label (remains accessible)                                                                                                                          |
| `isOpen`              | `bool`                                                    | —                                  | ✓        | Popover open state                                                                                                                                                     |
| `isRequired`          | `bool`                                                    | `false`                            | ✕        | Required indicator on the label (visual only)                                                                                                                          |
| `label`               | `string`                                                  | —                                  | ✓        | Visible label and accessible name for the control                                                                                                                      |
| `labelProps`          | `StyleProps`                                              | —                                  | ✕        | [Style props][readme-style-props] for the inner `Label`; see [`dropdownProps`, `popoverProps`, and `labelProps`](#dropdownprops-popoverprops-and-labelprops)           |
| `onSelectionChange`   | `(keys: string[]) => void`                                | —                                  | ✓        | Called when the selection changes                                                                                                                                      |
| `onToggle`            | `() => void`                                              | —                                  | ✓        | Toggle callback; parent updates `isOpen`                                                                                                                               |
| `popoverProps`        | `StyleProps`                                              | `{ theme: 'theme-light-default' }` | ✕        | [Style props][readme-style-props] for the inner `DropdownPopover`; see [`dropdownProps`, `popoverProps`, and `labelProps`](#dropdownprops-popoverprops-and-labelprops) |
| `removeAllLabel`      | `string`                                                  | i18n `picker.removeAll`            | ✕        | Remove control label for aggregated tag                                                                                                                                |
| `removeItemLabel`     | `string`                                                  | i18n `picker.removeItemLabel`      | ✕        | Template for default per-item remove control; supports `{itemLabel}`                                                                                                   |
| `renderTags`          | `(options: UnstablePickerRenderTagsOptions) => ReactNode` | —                                  | ✕        | Custom selection UI; see [Custom Selection UI (renderTags)](#custom-selection-ui-rendertags)                                                                           |
| `selectedKeys`        | `string[]`                                                | —                                  | ✓        | Selected item values                                                                                                                                                   |
| `selectionAriaLabel`  | `string`                                                  | i18n `picker.selectionAriaLabel`   | ✕        | `aria-label` for the selection region; supports `{label}`                                                                                                              |
| `selectionMode`       | `'single'` \| `'multiple'`                                | `multiple`                         | ✕        | Radio vs checkbox behavior for `UNSTABLE_PickerItem`                                                                                                                   |
| `size`                | [Size dictionary][dictionary-size]                        | `medium`                           | ✕        | Size of the picker shell                                                                                                                                               |
| `tagDescriptionText`  | `string`                                                  | i18n `picker.tagDescriptionText`   | ✕        | Hidden text for screen readers (tag removal hint)                                                                                                                      |
| `validationState`     | [Validation dictionary][dictionary-validation]            | —                                  | ✕        | Validation state                                                                                                                                                       |
| `validationText`      | `ReactNode` \| `ReactNode[]`                              | —                                  | ✕        | Validation message                                                                                                                                                     |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_UncontrolledPicker

UNSTABLE_UncontrolledPicker wraps **UNSTABLE_Picker** with internal state for popover open state and selection.

```tsx
import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_PickerItem, UNSTABLE_UncontrolledPicker } from '@alma-oss/spirit-web-react';

export const Example = () => (
  <UNSTABLE_UncontrolledPicker id="picker-uncontrolled" label="Languages" defaultSelectedKeys={['cs']}>
    <UNSTABLE_PickerGroup label="Languages">
      <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
      <UNSTABLE_PickerItem value="en">English</UNSTABLE_PickerItem>
    </UNSTABLE_PickerGroup>
  </UNSTABLE_UncontrolledPicker>
);
```

### API

All props from **UNSTABLE_Picker** apply except `isOpen`, `onToggle`, and `selectedKeys`, which are managed internally.

| Name                  | Type                       | Default    | Required | Description                              |
| --------------------- | -------------------------- | ---------- | -------- | ---------------------------------------- |
| `children`            | `ReactNode`                | —          | ✓        | Popover content                          |
| `id`                  | `string`                   | —          | ✓        | Stable id                                |
| `label`               | `string`                   | —          | ✓        | Label                                    |
| `defaultIsOpen`       | `bool`                     | `false`    | ✕        | Initial popover open state               |
| `defaultSelectedKeys` | `string[]`                 | `[]`       | ✕        | Initial selection                        |
| `onSelectionChange`   | `(keys: string[]) => void` | —          | ✕        | Optional callback when selection changes |
| `selectionMode`       | `'single'` \| `'multiple'` | `multiple` | ✕        | Radio vs checkbox behavior for items     |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_PickerGroup

UNSTABLE_PickerGroup wraps popover content in a [FieldGroup][fieldgroup-readme] with a visible legend (`label`). Place `UNSTABLE_PickerItem` children inside for list options.

### API

| Name                | Type                                           | Default | Required | Description                                               |
| ------------------- | ---------------------------------------------- | ------- | -------- | --------------------------------------------------------- |
| `children`          | `ReactNode`                                    | —       | ✓        | Group content (for example `UNSTABLE_PickerItem`)         |
| `label`             | `string`                                       | —       | ✓        | Legend for the group                                      |
| `form`              | `string`                                       | —       | ✕        | Parent form ID (forwarded to `FieldGroup`)                |
| `hasValidationIcon` | `bool`                                         | `false` | ✕        | Whether to show validation icon                           |
| `helperText`        | `ReactNode`                                    | —       | ✕        | Helper text below the group                               |
| `isDisabled`        | `bool`                                         | `false` | ✕        | Disables the group (also pass `isDisabled` on the picker) |
| `isRequired`        | `bool`                                         | `false` | ✕        | Required indicator on the legend (visual only)            |
| `name`              | `string`                                       | —       | ✕        | Native fieldset `name`                                    |
| `validationState`   | [Validation dictionary][dictionary-validation] | —       | ✕        | Validation state                                          |
| `validationText`    | `ReactNode` \| `ReactNode[]`                   | —       | ✕        | Validation message                                        |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_PickerItem

UNSTABLE_PickerItem is one option row in the popover (picker context is required). `value` must match entries in `selectedKeys`. It renders as [Checkbox][checkbox-readme] or [Radio][radio-readme] depending on the picker `selectionMode`.

Selection, `id`, `isChecked`, `isDisabled`, `inputPosition`, and `isItem` are controlled by the picker.

### API

| Name                | Type                                           | Default | Required | Description                                                |
| ------------------- | ---------------------------------------------- | ------- | -------- | ---------------------------------------------------------- |
| `autoComplete`      | `string`                                       | —       | ✕        | Native input `autoComplete`                                |
| `children`          | `ReactNode`                                    | —       | ✓        | Label shown next to the radio/checkbox                     |
| `details`           | `ReactNode`                                    | —       | ✕        | Details content below the label                            |
| `hasValidationIcon` | `bool`                                         | `false` | ✕        | Whether to show validation icon                            |
| `helperText`        | `ReactNode`                                    | —       | ✕        | Helper text below the radio/checkbox                       |
| `indeterminate`     | `bool`                                         | —       | ✕        | Indeterminate checkbox state (`multiple` mode only)        |
| `isLabelHidden`     | `bool`                                         | —       | ✕        | Whether the label is visually hidden                       |
| `isRequired`        | `bool`                                         | —       | ✕        | Whether the option is required                             |
| `name`              | `string`                                       | —       | ✕        | Native input `name` (`multiple` mode; ignored in `single`) |
| `ref`               | `ForwardedRef<HTMLInputElement>`               | —       | ✕        | Input element reference                                    |
| `validationState`   | [Validation dictionary][dictionary-validation] | —       | ✕        | Validation state                                           |
| `validationText`    | `ReactNode` \| `ReactNode[]`                   | —       | ✕        | Validation message                                         |
| `value`             | `string`                                       | —       | ✓        | Key used in `selectedKeys`                                 |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_PickerTag

UNSTABLE_PickerTag is the tag shell for custom `renderTags` output. It applies picker sizing and accessibility roles consistent with the default tags. It wraps [Tag][tag-readme] with fixed `color`, `elementType`, and `size`.

### API

| Name               | Type                                  | Default | Required | Description                                              |
| ------------------ | ------------------------------------- | ------- | -------- | -------------------------------------------------------- |
| `children`         | `ReactNode`                           | —       | ✕        | Tag content (defaults to `label`)                        |
| `isDisabled`       | `bool`                                | `false` | ✕        | Disables the tag                                         |
| `label`            | `ReactNode`                           | —       | ✓        | Accessible label for the tag                             |
| `onRemove`         | `() => void`                          | —       | ✓        | Remove button handler                                    |
| `removeLabel`      | `string`                              | —       | ✕        | Accessible name for the remove control                   |
| `tagKeyboardProps` | `UnstablePickerSelectionGridRowProps` | —       | ✕        | Row props from `getKeyboardGridRowProps` in `renderTags` |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[checkbox-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[dropdown-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/README.md
[fieldgroup-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FieldGroup/README.md
[picker-themes-demo]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/demo/PickerThemes.tsx
[picker-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Picker/README.md
[radio-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Radio/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[tag-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tag/README.md
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
