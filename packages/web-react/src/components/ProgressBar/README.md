# ProgressBar

ProgressBar shows how far a task has advanced, either on its own or as part of a form field.

The [web package][progress-bar] still composes the native `progress` element with layout helpers. In React, label,
value text, helper text, and validation are part of the `ProgressBar` API.

## Basic Usage

The ProgressBar component implements the HTML [progress][mdn-progress] element, so the current value is
announced by assistive technologies without any extra markup:

```tsx
import { ProgressBar } from '@alma-oss/spirit-web-react';
```

```tsx
<ProgressBar aria-label="Profile completeness" value={60} />
```

ℹ️ Always set the `value` prop. A `progress` element without a value renders the browser's own
indeterminate animation, which cannot be styled.

ℹ️ Updating `value` animates the filled part. The transition is disabled when the user prefers reduced motion.

## Colors

The colors come from a color scheme. ProgressBar uses the `subtle` variant: the track uses the subtle
background and the filled part uses the basic background of the same scheme.

```tsx
<ProgressBar color="informative" value={60} />
<ProgressBar color="success" value={60} />
<ProgressBar color="warning" value={60} />
<ProgressBar color="danger" value={60} />
<ProgressBar color="selected" value={60} />
<ProgressBar color="01" value={60} />
```

Without a `color` prop, ProgressBar falls back to the informative colors.

## Value

Use `valueText` to show the current value next to the bar. Set `valuePlacement` to `"bottom"` to place it
under the bar.

```tsx
<ProgressBar aria-label="Profile completeness" value={20} valueText="20 %" />
<ProgressBar
  aria-label="Awards collected"
  aria-valuetext="4 out of 20 awards"
  max={20}
  value={4}
  valuePlacement="bottom"
  valueText="4 out of 20 awards"
/>
```

ℹ️ Browsers announce `value` and `max` as a percentage. When the value is not a percentage, describe it
with `aria-valuetext`. ProgressBar hides the visible `valueText` from assistive technologies in that case
so the value is not announced twice.

## Label

The ProgressBar needs an accessible name. Pass a visible `label`, or `aria-label` when there is no visible
label. `label` itself is optional.

```tsx
<ProgressBar id="progress-bar-label" label="Profile completeness" value={60} />
<ProgressBar aria-label="Profile completeness" value={60} />
```

Use `isLabelHidden` when the `label` should not be visible.

## Layout

ProgressBar is fluid by default. Use parent layout components like [`Flex`][readme-flex],
[`Grid`][readme-grid], [`Stack`][readme-stack], or [`Container`][readme-container] to control the component
width in page layouts.

## Helper Text

```tsx
<ProgressBar
  helperText="Complete your profile to get more offers"
  id="progress-bar-helper-text"
  label="Profile completeness"
  value={60}
/>
```

## Validation States

```tsx
<ProgressBar
  color="success"
  id="progress-bar-success"
  label="Profile completeness"
  validationState="success"
  validationText="Your profile is complete"
  value={100}
/>
```

## Disabled State

Use the `isDisabled` prop. The value text picks up the disabled content color automatically:

```tsx
<ProgressBar
  helperText="Complete your profile to get more offers"
  id="progress-bar-disabled"
  isDisabled
  label="Profile completeness"
  value={40}
  valueText="40 %"
/>
```

## Usage with File

Place the ProgressBar as File children to show the progress of a single upload:

```tsx
<ul aria-label="Uploaded files">
  <File
    helperText={
      <span id="file-upload-status" role="status">
        Uploading your file…
      </span>
    }
    label="Document.pdf"
    onDismiss={onDismiss}
    removeText="Cancel upload of Document.pdf"
  >
    <ProgressBar aria-describedby="file-upload-status" aria-label="Uploading Document.pdf" value={60} valueText="60 %" />
  </File>
</ul>
```

## Accessibility

- ProgressBar always needs an accessible name: the `label` prop, or the `aria-label` attribute.
- Changes of the value are not announced automatically. Announce milestones such as "Upload complete"
  with a polite live region, for example `role="status"` on the accompanying HelperText. Do not announce
  every percent.
- Do not rely on the color alone to communicate success or failure. Pair it with the value or with
  `validationText`.

When the ProgressBar tracks the loading of a region of the page, set `aria-busy="true"` on that region and
point the region at the ProgressBar with `aria-describedby`. Remove `aria-busy` once loading has finished:

```tsx
<div id="offers" aria-busy="true" aria-describedby="offers-progress">
  {/* … the content of this region is loading … */}
</div>

<ProgressBar id="offers-progress" aria-label="Loading offers" value={60} />
```

👉 See [Describing a particular region][mdn-progress-region] for more information.

## API

| Name                | Type                                                                                                               | Default       | Required | Description                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------- | -------- | --------------------------------------------- |
| `color`             | \[[EmotionColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| `selected`] | `informative` | ✕        | Color of the component                        |
| `hasValidationIcon` | `bool`                                                                                                             | `false`       | ✕        | Whether to show the validation state icon     |
| `helperText`        | `ReactNode`                                                                                                        | —             | ✕        | Helper text displayed below the bar           |
| `id`                | `string`                                                                                                           | —             | ✕        | Id of the native `progress` element           |
| `isDisabled`        | `bool`                                                                                                             | `false`       | ✕        | Whether the ProgressBar is disabled           |
| `isLabelHidden`     | `bool`                                                                                                             | `false`       | ✕        | Whether the label is visually hidden          |
| `label`             | `ReactNode`                                                                                                        | —             | ✕        | Visible label; omit and use `aria-label` when there is no visible label |
| `max`               | `number`                                                                                                           | `100`         | ✕        | Maximum value of the ProgressBar              |
| `validationState`   | [Validation dictionary][dictionary-validation]                                                                     | —             | ✕        | Validation state                              |
| `validationText`    | `ReactNode` or `ReactNode[]`                                                                                       | —             | ✕        | Validation text displayed below the bar       |
| `value`             | `number`                                                                                                           | —             | ✓        | Current value of the ProgressBar              |
| `valuePlacement`    | `right` \| `bottom`                                                                                                | `right`       | ✕        | Placement of `valueText` relative to the bar  |
| `valueText`         | `ReactNode`                                                                                                        | —             | ✕        | Visible value shown next to or below the bar  |
| `valueTextId`       | `string`                                                                                                           | —             | ✕        | Id applied to the visible `valueText` element |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [ProgressBar][progress-bar] component.

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[mdn-progress]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
[mdn-progress-region]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress#describing_a_particular_region
[progress-bar]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ProgressBar/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Container/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Flex/README.md
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
