# InputDetails

InputDetails is a shared subcomponent for rendering supplementary content below form field labels,
typically containing modal triggers for terms and conditions, privacy policies, etc.

It is used inside [Checkbox][readme-checkbox] and [Toggle][readme-toggle].

## Usage with Checkbox

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input type="checkbox" id="consent" class="Checkbox__input" name="consent" aria-details="consent-details" required />
  <div class="Checkbox__text">
    <label class="Checkbox__label Checkbox__label--required" for="consent">I agree to the terms and conditions</label>
    <div id="consent-details" class="InputDetails">
      <button type="button" data-spirit-toggle="modal" data-spirit-target="#terms-modal">
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
      <button type="button" data-spirit-toggle="modal" data-spirit-target="#terms-modal">
        See full terms and conditions
      </button>
    </div>
  </div>
  <input type="checkbox" id="consent" class="Toggle__input" name="consent" required aria-details="consent-details" />
</div>
<!-- Modal definitions -->
```

## Disabled State

When the parent component (Checkbox or Toggle) is disabled, the text and links inside InputDetails are automatically dimmed via a CSS custom property.
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
- The `aria-details` attribute is separate from `aria-describedby` used by helper text and validation text

[readme-checkbox]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Checkbox/README.md
[readme-toggle]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Toggle/README.md
