# TextArea

Basic usage:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-default" class="Label Label--box">Label</label>
  <textarea id="text-area-default" class="TextArea__input" name="default" placeholder="Placeholder"></textarea>
</div>
```

Sizes:

```html
<div class="TextArea TextArea--small">
  <label for="text-area-size-small" class="Label Label--box">Small</label>
  <textarea
    id="text-area-size-small"
    class="TextArea__input"
    name="size-small"
    placeholder="Placeholder"
    aria-describedby="text-area-size-small-helper-text"
  ></textarea>
  <div id="text-area-size-small-helper-text" class="HelperText">Helper text</div>
</div>

<div class="TextArea TextArea--medium">
  <label for="text-area-size-medium" class="Label Label--box">Medium (default)</label>
  <textarea
    id="text-area-size-medium"
    class="TextArea__input"
    name="size-medium"
    placeholder="Placeholder"
    aria-describedby="text-area-size-medium-helper-text"
  ></textarea>
  <div id="text-area-size-medium-helper-text" class="HelperText">Helper text</div>
</div>

<div class="TextArea TextArea--large">
  <label for="text-area-size-large" class="Label Label--box">Large</label>
  <textarea
    id="text-area-size-large"
    class="TextArea__input"
    name="size-large"
    placeholder="Placeholder"
    aria-describedby="text-area-size-large-helper-text"
  ></textarea>
  <div id="text-area-size-large-helper-text" class="HelperText">Helper text</div>
</div>
```

Required textarea:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-required" class="Label Label--box Label--required">Label</label>
  <textarea id="text-area-required" class="TextArea__input" name="required" placeholder="Placeholder"></textarea>
</div>
```

Hidden label:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-hidden-label" class="Label Label--box accessibility-hidden">Hidden Label</label>
  <textarea id="text-area-hidden-label" class="TextArea__input" name="hiddenLabel" placeholder="Placeholder">
    Filled
  </textarea>
</div>
```

Fluid width:

```html
<div class="TextArea TextArea--medium TextArea--fluid">
  <label for="text-area-fluid" class="Label Label--box">Label</label>
  <textarea id="text-area-fluid" class="TextArea__input" name="fluid" placeholder="Placeholder"></textarea>
</div>
```

Helper text:

To add helper text, use the [HelperText][helper-text] component:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-helper-text" class="Label Label--box">Label</label>
  <textarea
    id="text-area-helper-text"
    class="TextArea__input"
    name="helperText"
    placeholder="Placeholder"
    aria-describedby="text-area-helper-text-helper-text"
  ></textarea>
  <div id="text-area-helper-text-helper-text" class="HelperText">Helper text</div>
</div>
```

## Counter

The counter shows the current character count. It can work in two modes:

1. **With threshold**: Shows `current/threshold` (e.g. `0/200`).
2. **Count only**: Shows just the current count (e.g. `0`).

The counter is purely informational — it does not set any validation state or text automatically.
Validation must be handled separately (see [Validation States](#validation-states)).

In the web package, counter demos are **visual only** (static markup); interactive counter behaviour
is provided by the React package (`@spirit-design-system/web-react`).

If you need to communicate a minimum length requirement, use the helper text element with a stable **`id`** and reference it from the textarea via **`aria-describedby`** (together with the screen readers (SR) counter message id when both are present):

```html
<div id="text-area-example-helper" class="HelperText">Write between 100 and 200 characters</div>
```

or:

```html
<div id="text-area-example-helper" class="HelperText">Write at least 100 characters</div>
```

Counter with threshold:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-counter" class="Label Label--box">Label</label>
  <textarea
    id="text-area-counter"
    class="TextArea__input"
    name="default"
    placeholder="Placeholder"
    aria-describedby="text-area-counter-message"
  ></textarea>
  <div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXSpaceBetween Flex--alignmentYTop">
    <div class="TextArea__counter" aria-hidden="true">0/200</div>
  </div>
  <div id="text-area-counter-message" class="accessibility-hidden">You can enter up to 200 characters</div>
</div>
```

Counter showing only the count:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-counter-only" class="Label Label--box">Label</label>
  <textarea
    id="text-area-counter-only"
    class="TextArea__input"
    name="default"
    placeholder="Placeholder"
    aria-describedby="text-area-counter-only-helper-text text-area-counter-only-message"
  ></textarea>
  <div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXSpaceBetween Flex--alignmentYTop">
    <div>
      <div id="text-area-counter-only-helper-text" class="HelperText">Write at least 100 characters</div>
    </div>
    <div class="TextArea__counter" aria-hidden="true">0</div>
  </div>
  <div id="text-area-counter-only-message" class="accessibility-hidden">0 characters entered</div>
</div>
```

Counter with helper text, validation text, and validation state:

```html
<div class="TextArea TextArea--medium TextArea--danger">
  <label for="text-area-counter-danger" class="Label Label--box">Label</label>
  <textarea
    id="text-area-counter-danger"
    class="TextArea__input"
    name="default"
    placeholder="Placeholder"
    aria-describedby="text-area-counter-danger-validation-text text-area-counter-danger-helper-text text-area-counter-danger-message"
  >
    Filled
  </textarea>
  <div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXSpaceBetween Flex--alignmentYTop">
    <div>
      <div id="text-area-counter-danger-validation-text" class="ValidationText ValidationText--danger">
        You have entered too many characters
      </div>
      <div id="text-area-counter-danger-helper-text" class="HelperText">This is helper text</div>
    </div>
    <div class="TextArea__counter" aria-hidden="true">201/200</div>
  </div>
  <div id="text-area-counter-danger-message" class="accessibility-hidden">1 character over limit</div>
</div>
```

### Counter Accessibility

The counter uses a two-element pattern to provide separate visual and SR experiences:

1. **Visible counter** (`.TextArea__counter`): Displays the compact `current/max` or count-only format (e.g. `0/200` or `0`).
   Has `aria-hidden="true"` so screen readers (SR) ignore it, since this format is not SR-friendly.

2. **SR message** (`.accessibility-hidden`): A visually hidden element with a human-readable
   message linked to the textarea via `aria-describedby`. When the user focuses the textarea, SR
   announces this message (e.g. "You can enter up to 200 characters" or "5 characters entered").
   If there is **helper text** and/or **validation text**, give those containers stable `id` values and list
   **all** relevant ids in `aria-describedby` (order: validation, helper, counter message is a common choice).

In a JavaScript-enhanced environment, the SR message element should be dynamically updated:

- Add `aria-live="polite"` and `aria-atomic="true"` to announce updates.
- Update the text to reflect the remaining characters (e.g. "269 characters remaining"
  or "5 characters over limit").
- Debounce updates by ~500ms to avoid interrupting the user while typing.

⚠️ Do **not** add `aria-live` in static HTML — it should only be added by JavaScript
to prevent stale announcements when JS has not loaded.

## Input Width

There are several ways to adjust the textarea width:

### Rows Attribute

The number of visible text lines for the control. Supported values are positive integers from `3` up.

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-rows" class="Label Label--box">Label</label>
  <textarea id="text-area-rows" class="TextArea__input" rows="3" name="rows"></textarea>
</div>
```

### Grid

For other use cases (wider textarea or textarea with unknown value length), we
recommend placing them inside the Grid component and using `TextArea--fluid`
modifier to fill the available space.

## JavaScript Plugin for Auto-Resizing

To enable auto-resizing of the textarea, first, you need to provide Spirit JavaScript,
which will handle the functionality:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main README][web-readme] for how to include JavaScript
plugins.

Then you need to add data attribute `data-spirit-toggle="autoResize"` to the component.

```html
<div class="TextArea TextArea--medium" data-spirit-toggle="autoResize">
  <label for="text-area-auto-resize" class="Label Label--box">Label of auto-resizing TextArea</label>
  <textarea id="text-area-auto-resize" class="TextArea__input" name="autoResize"></textarea>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`TextArea--success`, `TextArea--warning`, `TextArea--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="TextArea TextArea--medium TextArea--danger">
  <label for="text-area-danger" class="Label Label--box">Label</label>
  <textarea id="text-area-danger" class="TextArea__input" name="danger" placeholder="Placeholder">Filled</textarea>
  <div class="ValidationText ValidationText--danger">Danger validation text</div>
</div>

<div class="TextArea TextArea--medium has-danger">
  <label for="text-area-danger-has-danger" class="Label Label--box">Label</label>
  <textarea id="text-area-danger-has-danger" class="TextArea__input" name="hasDanger" placeholder="Placeholder">
    Filled
  </textarea>
  <div class="ValidationText ValidationText--danger">Danger validation text</div>
</div>

<div class="ValidationText ValidationText--danger">
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>

<div class="TextArea TextArea--medium has-warning">
  <label for="text-area-danger-has-warning" class="Label Label--box">Label</label>
  <textarea id="text-area-danger-has-warning" class="TextArea__input" name="hasDanger" placeholder="Placeholder">
    Filled
  </textarea>
  <div class="ValidationText ValidationText--warning">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

### JavaScript-Controlled Validation Text

When implementing client-side form validation, use JS interaction state classes
(`has-success`, `has-warning`, `has-danger`) on the wrapping `<div>` element and
render validation texts in a `<div>` or `<ul>` with `data-spirit-element="validation_text"`
attribute. This way your JS remains disconnected from CSS that may or may not be
[prefixed][prefixed].

**Remember this approach is only valid for vanilla JS implementation. React
components mix CSS with JS by design and handle prefixes their own way.**

```html
<div class="TextArea TextArea--medium has-danger">
  <label for="text-area-js-validation" class="Label Label--box">Label</label>
  <textarea
    id="text-area-js-validation"
    class="TextArea__input"
    name="jsValidation"
    placeholder="Placeholder"
    aria-describedby="text-area-js-validation-error"
  >
    Filled
  </textarea>
  <div id="text-area-js-validation-error" data-spirit-element="validation_text">Error message inserted by JS</div>
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the textarea, disabled TextArea can
be marked by adding `TextArea--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="TextArea TextArea--medium TextArea--disabled">
  <label for="text-area-disabled" class="Label Label--box Label--disabled">Label</label>
  <textarea
    id="text-area-disabled"
    class="TextArea__input"
    name="disabled"
    placeholder="Placeholder"
    disabled
  ></textarea>
</div>
<div class="TextArea TextArea--medium TextArea--disabled">
  <label for="text-area-disabled-filled" class="Label Label--box Label--disabled">Label</label>
  <textarea
    id="text-area-disabled-filled"
    class="TextArea__input"
    name="disabledFilled"
    placeholder="Placeholder"
    disabled
  >
    Filled
  </textarea>
</div>
```

👉 Please note that responsive border radius is defined by design specifications.

[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
[prefixed]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#prefixing-css-class-names
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
