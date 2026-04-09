# Toggle

Toggle is a form control that allows users to switch between two states.

## Basic Usage

The Toggle component implements the HTML [checkbox input][mdn-checkbox] element. It uses
the native input element and styles it to look like a toggle switch.

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-default">Toggle Label</label>
  </span>
  <input type="checkbox" id="toggle-default" class="Toggle__input" name="default" />
</div>
```

## Indicators

If you need to indicate the state of the toggle, you can add the `Toggle__input--indicators`
modifier class to the input. This will add a visual indicators to the toggle switch.

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-indicators">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-indicators" class="Toggle__input Toggle__input--indicators" name="default" />
</div>
```

## Required

Add the `required` attribute to the input to mark it as required and add the
`Label--required` modifier class to the label to indicate the state.

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline Label--required" for="toggle-required">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-required" class="Toggle__input" name="required" required />
</div>
```

## Hidden Label

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline accessibility-hidden" for="toggle-hidden-label">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-hidden-label" class="Toggle__input" name="hidden-label" />
</div>
```

## Layout

Toggle is fluid by default. Use parent layout components like [Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container]
to control the component width in page layouts.

## Helper Text

To add helper text, use the [HelperText][readme-helper-text] component:

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-helper-text">Toggle Label</label>
    <div class="HelperText" id="toggle-helper-text-helper-text">Helper text</div>
  </div>
  <input
    type="checkbox"
    id="toggle-helper-text"
    class="Toggle__input"
    name="helper-text"
    aria-describedby="toggle-helper-text-helper-text"
  />
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`Toggle--success`, `Toggle--warning`, `Toggle--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--success">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-success">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-success" class="Toggle__input" name="default" />
</div>

<div class="Toggle Toggle--inputPositionEnd Toggle--warning">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-warning">Toggle Label</label>
    <div class="ValidationText ValidationText--warning ValidationText--inline" id="toggle-warning-validation-text">
      Validation text
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-warning"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-warning-validation-text"
    checked
  />
</div>

<div class="Toggle Toggle--inputPositionEnd Toggle--danger">
  <div class="Toggle__text">
    <label for="toggle-danger" class="Label Label--inline">Toggle Label</label>
    <ul class="ValidationText ValidationText--danger ValidationText--inline" id="toggle-danger-validation-text">
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
  <input
    type="checkbox"
    id="toggle-danger"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-danger-validation-text"
  />
</div>

<div class="Toggle Toggle--inputPositionEnd Toggle--warning">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-warning">Toggle Label</label>
    <div class="ValidationText ValidationText--warning ValidationText--inline" id="toggle-warning-validation-text">
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
      </svg>
      <span>Validation text with icon</span>
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-warning"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-warning-validation-text"
    checked
  />
</div>
```

### JavaScript-Controlled Validation Text

When implementing client-side form validation, use JS interaction state classes
(`has-success`, `has-warning`, `has-danger`) on the wrapping `<div>` element and
render validation texts in a `<div>` with `data-spirit-element="validation_text"`
attribute. This way your JS remains disconnected from CSS that may or may not be
[prefixed][prefixed].

**Remember this approach is only valid for vanilla JS implementation. React
components mix CSS with JS by design and handle prefixes their own way.**

```html
<div class="Toggle Toggle--inputPositionEnd has-success">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-success">Toggle Label</label>
    <div
      class="ValidationText ValidationText--success"
      id="toggle-success-validation-text"
      data-spirit-element="validation_text"
    >
      Validation text
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-success"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-success-validation-text"
  />
</div>
```

To render validation text as a list, use `<ul>` element inside of `<div>`.

```html
<div
  class="ValidationText ValidationText--success"
  id="toggle-success-validation-text"
  data-spirit-element="validation_text"
>
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>
```

## Consent with Details

For consent scenarios where users need access to terms and conditions or privacy policies, use the [`InputDetails`][readme-input-details]
class to render supplementary content (such as modal triggers) below the label.

### Emphasized Label

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline Label--required" for="toggle-consent-emphasized">
      <span class="typography-body-medium-semibold">I agree to the terms and conditions</span>
    </label>
    <div id="toggle-consent-emphasized-details" class="InputDetails">
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#terms-modal"
      >
        See full terms and conditions
      </button>
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-consent-emphasized"
    class="Toggle__input"
    name="consent"
    required
    aria-details="toggle-consent-emphasized-details"
  />
</div>
<!-- Modal definitions -->
```

### Full Example

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--danger">
  <div class="Toggle__text">
    <label class="Label Label--inline Label--required" for="toggle-consent-full">
      I agree to the terms and privacy policy
    </label>
    <div id="toggle-consent-full-details" class="InputDetails">
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#terms-modal"
      >
        See full terms and conditions
      </button>
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#privacy-modal"
      >
        See privacy policy
      </button>
    </div>
    <div class="HelperText HelperText--inline" id="toggle-consent-full-helper-text">
      Please read the documents carefully before agreeing
    </div>
    <div class="ValidationText ValidationText--danger" id="toggle-consent-full-validation-text">
      You must agree to continue
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-consent-full"
    class="Toggle__input"
    name="consent"
    required
    aria-describedby="toggle-consent-full-helper-text toggle-consent-full-validation-text"
    aria-details="toggle-consent-full-details"
  />
</div>
<!-- Modal definitions -->
```

## Accessibility

- The details content is linked to the toggle via the `aria-details` attribute
- Use `<button>` elements with link styling (e.g., `link-underlined`, `link-inherit`), NOT `<a>` tags, for modal triggers
- The `aria-details` attribute is separate from `aria-describedby`:
  - `aria-describedby` announces essential information immediately (helper text, validation messages)
  - `aria-details` points to supplementary content that users can explore when needed (terms links, additional info)

## Disabled State

On top of adding the `disabled` attribute to the input, disabled Toggle needs to
be marked by adding `Toggle--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--disabled">
  <div class="Toggle__text">
    <label class="Label Label--inline Label--disabled" for="toggle-disabled">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-disabled" class="Toggle__input" name="default" disabled />
</div>
```

## Input Position

The input position can be set to `end` (default) or `start`.

### Input on Start

```html
<div class="Toggle Toggle--inputPositionStart">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-position-start">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-position-start" class="Toggle__input" name="position" />
</div>
```

### Responsive Input Position

Use responsive breakpoint modifiers to change input position at different screen sizes:

```html
<div class="Toggle Toggle--tablet--inputPositionStart">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-position-responsive">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-position-responsive" class="Toggle__input" name="position" />
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[mdn-checkbox]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
[prefixed]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#prefixing-css-class-names
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-input-details]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputDetails/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
