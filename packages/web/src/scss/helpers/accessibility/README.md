# Accessibility

Accessibility helpers are tiny CSS classes that make it easier to create accessible websites.

## Visually Hidden

A common helper for hiding content visually but keeping it [accessible to screen readers][wcag-hiding-content].

```html
<span class="accessibility-hidden">This is invisible, but accessible by screen readers</span>
```

## Tap Target

This helper ensures that the active tap area of a link or button is large enough to be tapped on a mobile device.
The minimum recommended tap area is 40 px by 40 px.

```html
<button type="button" class="accessibility-tap-target">Tap Me!</button>
```

ℹ️ If the element is larger than the minimum dimensions, the tap area will be the same size as the element.

ℹ️ Currently, the tap target area size conforms to the [WCAG Level AA][wcag-tap-target-aa], but is smaller than
the minimum size recommended by the [WCAG Level AAA][wcag-tap-target-aaa].

## Stateful Button Label

### Collapsed/Expanded

This helper conditionally displays content based on the `aria-expanded` attribute. Use it to show different content depending on whether the element is expanded or collapsed.

```html
<button type="button" aria-expanded="false" aria-controls="#element-id">
  <span class="accessibility-open">Hide content</span>
  <span class="accessibility-closed">Show content</span>
</button>
```

### Checked/Unchecked

This helper conditionally displays content based on the `aria-checked` attribute. Commonly used for switch controls like the password visibility toggle.

```html
<button type="button" role="switch" aria-checked="false" aria-label="Show password">
  <span class="accessibility-unchecked">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use href="/icons/sprite.svg#visibility-on" />
    </svg>
  </span>
  <span class="accessibility-checked">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use href="/icons/sprite.svg#visibility-off" />
    </svg>
  </span>
</button>
```

ℹ️ The checked and unchecked helpers use `inline-flex` display to properly align icon containers within buttons.

[wcag-hiding-content]: https://www.w3.org/WAI/WCAG21/Techniques/css/C7
[wcag-tap-target-aa]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[wcag-tap-target-aaa]: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
