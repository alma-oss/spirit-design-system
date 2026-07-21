# Checkbox

## Basic Usage

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox-default" class="Checkbox" name="default" />
  <div>
    <label class="Label cursor-pointer" for="checkbox-default">Checkbox Label</label>
  </div>
</div>
```

## Required Input

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox-required" class="Checkbox" name="required" required />
  <div>
    <label class="Label Label--required cursor-pointer" for="checkbox-required">Checkbox Label</label>
  </div>
</div>
```

## Validation State with Validation Text

See Validation state [dictionary][dictionary-validation] and [ValidationText][readme-validation-text] component.

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input
    type="checkbox"
    id="checkbox-warning"
    class="Checkbox Checkbox--warning"
    name="warning"
    aria-describedby="checkbox-warning-helper-text"
  />
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label cursor-pointer" for="checkbox-warning">Checkbox Label</label>
    <div class="ValidationText ValidationText--warning" id="checkbox-warning-helper-text">Warning validation text</div>
  </div>
</div>

<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input
    type="checkbox"
    id="checkbox-danger"
    class="Checkbox Checkbox--danger"
    name="danger"
    aria-describedby="checkbox-danger-helper-text"
  />
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label cursor-pointer" for="checkbox-danger">Checkbox Label</label>
    <div class="ValidationText ValidationText--danger" id="checkbox-danger-helper-text">
      <ul>
        <li>First validation text</li>
        <li>Second validation text</li>
      </ul>
    </div>
  </div>
</div>

<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input
    type="checkbox"
    id="checkbox-warning"
    class="Checkbox Checkbox--warning"
    name="warning"
    aria-describedby="checkbox-warning-helper-text"
  />
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label cursor-pointer" for="checkbox-warning">Checkbox Label</label>
    <div class="ValidationText ValidationText--warning" id="checkbox-warning-helper-text">
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use href="/assets/icons/svg/sprite.svg#warning" />
      </svg>
      <span>Warning validation text with icon</span>
    </div>
  </div>
</div>
```

## Hidden Label

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-0);">
  <input type="checkbox" id="checkbox-hidden-label" class="Checkbox" name="hiddenLabel" required />
  <div>
    <label class="Label accessibility-hidden" for="checkbox-hidden-label">Checkbox Label</label>
  </div>
</div>
```

## Helper Text

To add helper text, use the [HelperText][readme-helper-text] component:

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input
    type="checkbox"
    id="checkbox-helper-text"
    class="Checkbox"
    name="helperText"
    aria-describedby="checkbox-helper-text-helper-text"
  />
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label cursor-pointer" for="checkbox-helper-text">Checkbox Label</label>
    <div class="HelperText" id="checkbox-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

## Consent with Details

For consent scenarios where users need access to supplementary content — such as terms and conditions or a privacy
policy — use the [`InputDetails`][readme-input-details] element to render a trigger below the label. The linked
content can be revealed in a [Modal][readme-modal] dialog or expanded inline with [Collapse][readme-collapse].

**Keep the checkbox label itself as short as possible at all times.** Move any supplementary explanation into
`InputDetails` instead. Screen readers read the full label out loud, so a long label is read in full every time.
Short labels are also easier for sighted users to scan.

### With Modal

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="consent" class="Checkbox" name="consent" aria-details="consent-details" required />
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label Label--required cursor-pointer" for="consent">I agree to the terms and privacy policy</label>
    <div id="consent-details" class="InputDetails">
      <p class="typography-body-small-regular mb-0">Please review our terms and conditions before you agree.</p>
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="modal"
        data-spirit-target="#checkbox-terms-modal"
        aria-controls="checkbox-terms-modal"
        aria-expanded="false"
      >
        See full terms and conditions
      </button>
    </div>
  </div>
</div>

<!-- Modal definition -->
```

### With Collapse

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="consent" class="Checkbox" name="consent" aria-details="consent-details" required />
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
    <label class="Label Label--required cursor-pointer" for="consent">I agree to the terms and conditions</label>
    <div id="consent-details" class="InputDetails">
      <p class="typography-body-small-regular mb-0">Please review our terms and conditions before you agree.</p>
      <button
        type="button"
        class="link-underlined link-inherit"
        data-spirit-toggle="collapse"
        data-spirit-target="checkbox-terms-collapse"
        aria-controls="checkbox-terms-collapse"
        aria-expanded="false"
      >
        Show more
      </button>
      <div id="checkbox-terms-collapse" class="Collapse">
        <div class="Collapse__content">
          <!-- Terms and conditions content -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## Accessibility

- The details content is linked to the checkbox via the `aria-details` attribute
- Use `<button>` elements with link styling (e.g., `link-underlined`, `link-inherit`), NOT `<a>` tags, for modal or
  collapse triggers
- The `aria-details` attribute is separate from `aria-describedby`:
  - `aria-describedby` announces essential information immediately (helper text, validation messages)
  - `aria-details` points to supplementary content that users can explore when needed (terms links, additional info)

## Disabled State

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox-disabled" class="Checkbox" name="disabled" disabled />
  <div>
    <label class="Label Label--disabled" for="checkbox-disabled">Checkbox Label</label>
  </div>
</div>
```

## As an Item

```html
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="checkbox" id="checkbox-item-default" class="Checkbox Checkbox--item" name="item" />
  </div>
  <div class="Item__content" role="presentation">
    <label class="Label element-stretched cursor-pointer" for="checkbox-item-default">Checkbox Label</label>
  </div>
</div>
```

## Input Position

The input position can be set using [Flex][readme-flex] component with direction.

### Input on End

```html
<div class="Flex Flex--horizontalReversed Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox-position-end" class="Checkbox" name="position" />
  <div>
    <label class="Label cursor-pointer" for="checkbox-position-end">Checkbox Label</label>
  </div>
</div>
```

### Responsive Input Position

Use responsive breakpoint modifiers to change input position at different screen sizes:

```html
<div
  class="Flex Flex--horizontal Flex--inline Flex--tablet--horizontalReversed Flex--desktop--horizontal py-500"
  style="--flex-spacing-x: var(--spirit-space-500);"
>
  <input type="checkbox" id="checkbox-position-responsive" class="Checkbox" name="position" />
  <div>
    <label class="Label cursor-pointer" for="checkbox-position-responsive">Checkbox Label</label>
  </div>
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-collapse]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Collapse/README.md
[readme-flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Flex/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-input-details]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputDetails/README.md
[readme-modal]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Modal/README.md
[readme-validation-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ValidationText/README.md
