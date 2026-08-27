# ProgressBar

ProgressBar shows how far a task has advanced, either on its own or as part of a form field.

## Basic Usage

ProgressBar is the native HTML [progress][mdn-progress] element, so the current value is announced by
assistive technologies without any extra markup:

```html
<progress
  class="ProgressBar color-scheme-on-emotion-informative-subtle"
  value="60"
  max="100"
  aria-label="Profile completeness"
></progress>
```

ℹ️ Always set the `value` attribute. A `progress` element without a value renders the browser's own
indeterminate animation, which cannot be styled.

ℹ️ The width of the filled part is computed by the browser from the `value` attribute, so it cannot be
transitioned. Set `value` to the new number and the bar jumps to it.

## Colors

The colors come from a [color scheme][color-schemes] class. Pick the `subtle` variant: the track uses
the subtle background and the filled part uses the basic background of the same scheme.

```html
<progress class="ProgressBar color-scheme-on-emotion-informative-subtle" value="60" max="100"></progress>
<progress class="ProgressBar color-scheme-on-emotion-success-subtle" value="60" max="100"></progress>
<progress class="ProgressBar color-scheme-on-emotion-warning-subtle" value="60" max="100"></progress>
<progress class="ProgressBar color-scheme-on-emotion-danger-subtle" value="60" max="100"></progress>
<progress class="ProgressBar color-scheme-on-selected-subtle" value="60" max="100"></progress>
<progress class="ProgressBar color-scheme-on-accent-01-subtle" value="60" max="100"></progress>
```

Without a color scheme class, ProgressBar falls back to the informative colors.

The optional `ProgressBar--<color>` modifier overrides the color scheme when
`component-progress-bar-*` tokens are defined. See [Component Color Overrides][component-color-overrides]
for more information.

## Value

Use the [Flex](#layout) component to place the value next to the bar. The value itself is a caption,
so use the `typography-caption` and `text-secondary` helper classes.

To the right of the bar:

```html
<div
  class="Flex Flex--horizontal Flex--noWrap Flex--alignmentYCenter"
  style="--flex-spacing-x: var(--spirit-space-600);"
>
  <progress
    class="ProgressBar color-scheme-on-emotion-informative-subtle"
    value="20"
    max="100"
    aria-label="Profile completeness"
  ></progress>
  <span class="typography-caption text-secondary">20%</span>
</div>
```

Below the bar:

```html
<div class="Flex Flex--vertical" style="--flex-spacing-y: var(--spirit-space-600);">
  <progress
    class="ProgressBar color-scheme-on-accent-01-subtle"
    value="4"
    max="20"
    aria-label="Awards collected"
    aria-valuetext="4 out of 20 awards"
  ></progress>
  <span class="typography-caption text-secondary" aria-hidden="true">4 out of 20 awards</span>
</div>
```

ℹ️ Browsers announce `value` and `max` as a percentage. When the value is not a percentage, describe it
with `aria-valuetext` and hide the duplicate visible text with `aria-hidden`. For a plain percentage,
leave the visible text as it is: it is a sibling of the ProgressBar, not part of its description, so it
is not announced twice.

## Label

Because ProgressBar is a labelable element, use the [Label][readme-label] component the same way as with
any other form field:

```html
<div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
  <label for="progress-bar-label" class="Label">Profile completeness</label>
  <progress
    class="ProgressBar color-scheme-on-emotion-informative-subtle"
    id="progress-bar-label"
    value="60"
    max="100"
  ></progress>
</div>
```

Use the `accessibility-hidden` helper class on the Label, or the `aria-label` attribute, when the label
should not be visible.

## Layout

ProgressBar is fluid by default. Use parent layout components like [Flex][readme-flex],
[Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container] to control the component
width in page layouts.

## Helper Text

Associate the [HelperText][readme-helper-text] component with the ProgressBar using the
`aria-describedby` attribute:

```html
<div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
  <label for="progress-bar-helper-text" class="Label">Profile completeness</label>
  <progress
    class="ProgressBar color-scheme-on-emotion-informative-subtle"
    id="progress-bar-helper-text"
    value="60"
    max="100"
    aria-describedby="progress-bar-helper-text-helper-text"
  ></progress>
  <div class="HelperText" id="progress-bar-helper-text-helper-text">Complete your profile to get more offers</div>
</div>
```

## Validation States

Pair the matching color scheme with the [ValidationText][readme-validation-text] component:

```html
<div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
  <label for="progress-bar-success" class="Label">Profile completeness</label>
  <progress
    class="ProgressBar color-scheme-on-emotion-success-subtle"
    id="progress-bar-success"
    value="100"
    max="100"
    aria-describedby="progress-bar-success-validation-text"
  ></progress>
  <div class="ValidationText ValidationText--success" id="progress-bar-success-validation-text">
    Your profile is complete
  </div>
</div>
```

## Disabled State

Use the `color-scheme-on-disabled` class. Put it on the wrapping Flex so that the value can pick the
disabled content color up through the `text-color-scheme` helper class:

```html
<div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
  <label for="progress-bar-disabled" class="Label Label--disabled">Profile completeness</label>
  <div
    class="Flex Flex--horizontal Flex--noWrap Flex--alignmentYCenter color-scheme-on-disabled"
    style="--flex-spacing-x: var(--spirit-space-600);"
  >
    <progress
      class="ProgressBar"
      id="progress-bar-disabled"
      value="40"
      max="100"
      aria-describedby="progress-bar-disabled-helper-text"
    ></progress>
    <span class="typography-caption text-color-scheme">40%</span>
  </div>
  <div class="HelperText HelperText--disabled" id="progress-bar-disabled-helper-text">
    Complete your profile to get more offers
  </div>
</div>
```

## Usage with File

Place the ProgressBar inside `File__text` to show the progress of a single upload:

```html
<ul aria-label="Uploaded files">
  <li class="File">
    <!-- … preview … -->
    <div class="File__content">
      <div class="File__text">
        <span class="File__name">
          <span class="text-truncate-multiline text-word-break-long-words" style="--text-truncate-lines: 1;"
            >Document.pdf</span
          >
        </span>
        <progress
          class="ProgressBar color-scheme-on-emotion-informative-subtle"
          value="60"
          max="100"
          aria-label="Uploading Document.pdf"
          aria-describedby="file-upload-status"
        ></progress>
        <span class="HelperText" id="file-upload-status" role="status">Uploading your file…</span>
      </div>
    </div>
    <!-- … actions … -->
  </li>
</ul>
```

## Accessibility

- ProgressBar always needs an accessible name: a [Label][readme-label] linked with the `for` attribute,
  or the `aria-label` attribute.
- Changes of the value are not announced automatically. Announce milestones such as "Upload complete"
  with a polite live region, for example `role="status"` on the accompanying HelperText. Do not announce
  every percent.
- Do not rely on the color alone to communicate success or failure. Pair it with the value or with the
  [ValidationText][readme-validation-text] component.

[color-schemes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#color-schemes
[component-color-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-color-overrides
[mdn-progress]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Flex/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-label]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Label/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
[readme-validation-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ValidationText/README.md
