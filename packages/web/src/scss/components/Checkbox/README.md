# Checkbox

## Basic Usage

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input type="checkbox" id="checkbox-default" class="Checkbox__input" name="default" />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-default">Checkbox Label</label>
  </div>
</div>
```

## Required Input

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input type="checkbox" id="checkbox-required" class="Checkbox__input" name="required" required />
  <div class="Checkbox__text">
    <label class="Label Label--inline Label--required" for="checkbox-required">Checkbox Label</label>
  </div>
</div>
```

## Validation State with Validation Text

See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--warning">
  <input
    type="checkbox"
    id="checkbox-warning"
    class="Checkbox__input"
    name="warning"
    aria-describedby="checkbox-warning-helper-text"
  />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-warning">Checkbox Label</label>
    <div class="ValidationText ValidationText--warning ValidationText--inline" id="checkbox-warning-helper-text">
      Warning validation text
    </div>
  </div>
</div>

<div class="Checkbox Checkbox--inputPositionStart Checkbox--danger">
  <input
    type="checkbox"
    id="checkbox-danger"
    class="Checkbox__input"
    name="danger"
    aria-describedby="checkbox-danger-helper-text"
  />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-danger">Checkbox Label</label>
    <div class="ValidationText ValidationText--danger ValidationText--inline" id="checkbox-danger-helper-text">
      <ul>
        <li>First validation text</li>
        <li>Second validation text</li>
      </ul>
    </div>
  </div>
</div>

<div class="Checkbox Checkbox--inputPositionStart Checkbox--warning">
  <input
    type="checkbox"
    id="checkbox-warning"
    class="Checkbox__input"
    name="warning"
    aria-describedby="checkbox-warning-helper-text"
  />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-warning">Checkbox Label</label>
    <div class="ValidationText ValidationText--warning ValidationText--inline" id="checkbox-warning-helper-text">
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
      </svg>
      <span>Warning validation text with icon</span>
    </div>
  </div>
</div>
```

## Hidden Label

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input type="checkbox" id="checkbox-hidden-label" class="Checkbox__input" name="hiddenLabel" required />
  <div class="Checkbox__text">
    <label class="Label Label--inline accessibility-hidden" for="checkbox-hidden-label">Checkbox Label</label>
  </div>
</div>
```

## Helper Text

To add helper text, use the [HelperText][helper-text] component:

```html
<div class="Checkbox">
  <input
    type="checkbox"
    id="checkbox-helper-text"
    class="Checkbox__input"
    name="helperText"
    aria-describedby="checkbox-helper-text-helper-text"
  />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-helper-text">Checkbox Label</label>
    <div class="HelperText HelperText--inline" id="checkbox-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

## Consent Checkbox with Details

For consent scenarios where users need access to terms and conditions or privacy policies, use the [`InputDetails`][readme-input-details]
element with modal triggers.

### Emphasized Label

Use emphasized (bold) label text to make the agreement statement more prominent:

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input
    type="checkbox"
    id="consent-emphasized-label"
    class="Checkbox__input"
    name="consentEmphasizedLabel"
    aria-details="consent-emphasized-label-details"
    required
  />
  <div class="Checkbox__text">
    <label class="Label Label--inline Label--required" for="consent-emphasized-label">
      <span class="typography-body-medium-semibold">I agree to the terms and conditions</span>
    </label>
    <div id="consent-emphasized-label-details" class="InputDetails">
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#terms-modal"
        aria-controls="terms-modal"
        aria-expanded="false"
      >
        See full terms and conditions
      </button>
    </div>
  </div>
</div>
<!-- Modal definitions -->
```

### Full Example with Validation and Helper Text

Complete example showing label, details with multiple links, helper text, and validation:

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--danger">
  <input
    type="checkbox"
    id="consent-full-example"
    class="Checkbox__input"
    name="consentFullExample"
    aria-details="consent-full-example-details"
    aria-describedby="consent-full-example-helper-text consent-full-example-validation-text"
    required
  />
  <div class="Checkbox__text">
    <label class="Label Label--inline Label--required" for="consent-full-example">
      I agree to the terms and privacy policy
    </label>
    <div id="consent-full-example-details" class="InputDetails">
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#terms-modal"
        aria-controls="terms-modal"
        aria-expanded="false"
      >
        See full terms and conditions
      </button>
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#privacy-modal"
        aria-controls="privacy-modal"
        aria-expanded="false"
      >
        See privacy policy
      </button>
    </div>
    <div class="HelperText HelperText--inline" id="consent-full-example-helper-text">
      Please read the documents carefully before agreeing
    </div>
    <div class="ValidationText ValidationText--danger" id="consent-full-example-validation-text">
      You must agree to continue
    </div>
  </div>
</div>

<!-- Modal definitions -->
```

## Accessibility

- The details content is linked to the checkbox via the `aria-details` attribute
- Use `<button>` elements with link styling (e.g., `link-underlined`, `link-inherit`), NOT `<a>` tags, for modal triggers
- The `aria-details` attribute is separate from `aria-describedby`:
  - `aria-describedby` announces essential information immediately (helper text, validation messages)
  - `aria-details` points to supplementary content that users can explore when needed (terms links, additional info)

## Disabled State

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--disabled">
  <input type="checkbox" id="checkbox-disabled" class="Checkbox__input" name="disabled" disabled />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-disabled">Checkbox Label</label>
  </div>
</div>
```

## As an Item

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--item">
  <input type="checkbox" id="checkbox-item-default" class="Checkbox__input" name="item" />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-item-default">Checkbox Label</label>
  </div>
</div>
```

## Input Position

The input position can be set to `start` (default) or `end`.

### Input on End

```html
<div class="Checkbox Checkbox--inputPositionEnd">
  <input type="checkbox" id="checkbox-position-end" class="Checkbox__input" name="position" />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-position-end">Checkbox Label</label>
  </div>
</div>
```

### Responsive Input Position

Use responsive breakpoint modifiers to change input position at different screen sizes:

```html
<div class="Checkbox Checkbox--tablet--inputPositionEnd">
  <input type="checkbox" id="checkbox-position-responsive" class="Checkbox__input" name="position" />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox-position-responsive">Checkbox Label</label>
  </div>
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-input-details]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputDetails/README.md
