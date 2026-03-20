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

## Accessibility

- Link the `InputDetails` element to the input via the `aria-details` attribute on the input
- Use `<button>` elements for modal triggers (not `<a>` tags) for better accessibility
- The `aria-details` attribute is separate from `aria-describedby` used by helper text and validation text

[readme-checkbox]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Checkbox/README.md
[readme-toggle]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Toggle/README.md
