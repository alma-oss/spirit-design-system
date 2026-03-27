# InputDetails

InputDetails is a shared component for rendering supplementary content below form field labels,
such as links or modal triggers.

It can be used internally in the form components.

## Usage with Checkbox

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input type="checkbox" id="consent" class="Checkbox__input" name="consent" aria-details="consent-details" required />
  <div class="Checkbox__text">
    <label class="Checkbox__label Checkbox__label--required" for="consent">I agree to the terms and conditions</label>
    <div id="consent-details" class="InputDetails">
      <button
        type="button"
        class="link-inherit link-underlined"
        data-spirit-toggle="modal"
        data-spirit-target="#terms-modal"
      >
        See full terms and conditions
      </button>
    </div>
  </div>
</div>
<!-- Modal definitions -->
```

## Usage with Toggle

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Toggle__label Toggle__label--required" for="consent">I agree to the terms and conditions</label>
    <div id="consent-details" class="InputDetails">
      <button
        type="button"
        class="link-inherit link-underlined"
        data-spirit-toggle="modal"
        data-spirit-target="#terms-modal"
      >
        See full terms and conditions
      </button>
    </div>
  </div>
  <input type="checkbox" id="consent" class="Toggle__input" name="consent" required aria-details="consent-details" />
</div>
<!-- Modal definitions -->
```

## Disabled State

When the parent component is disabled, the text and links inside InputDetails are automatically dimmed.
You must manually add the `disabled` attribute to interactive elements (buttons, links) inside InputDetails.

**Note:** The `disabled` attribute on buttons and links is required for proper keyboard and screen reader behavior.

### With Disabled Checkbox

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--disabled">
  <input
    type="checkbox"
    id="consent"
    class="Checkbox__input"
    name="consent"
    aria-details="consent-details"
    disabled
    required
  />
  <div class="Checkbox__text">
    <label class="Checkbox__label Checkbox__label--required" for="consent">
      <span class="typography-body-medium-semibold">I agree to the terms and conditions</span>
    </label>
    <div id="consent-details" class="InputDetails">
      <p class="typography-body-medium-regular">We want to keep you informed</p>
      <button type="button" class="link-underlined link-inherit" disabled>See full terms and conditions</button>
    </div>
  </div>
</div>
```

### With Disabled Toggle

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--disabled">
  <div class="Toggle__text">
    <label class="Toggle__label Toggle__label--required" for="consent">I agree to the terms and conditions</label>
    <div id="consent-details" class="InputDetails">
      <button type="button" class="link-underlined link-inherit" disabled>See full terms and conditions</button>
      <button type="button" class="link-underlined link-inherit" disabled>See privacy policy</button>
    </div>
  </div>
  <input
    type="checkbox"
    id="consent"
    class="Toggle__input"
    name="consent"
    disabled
    required
    aria-details="consent-details"
  />
</div>
```

## Accessibility

- Link the `InputDetails` element to the input via the `aria-details` attribute on the input
- Use `<button>` elements for modal triggers (not `<a>` tags) for better accessibility
- The `aria-details` attribute is separate from `aria-describedby` used by helper text and validation text:
  - `aria-describedby` announces essential information immediately (helper text, validation messages)
  - `aria-details` points to supplementary content that users can explore when needed (terms links, additional info)
