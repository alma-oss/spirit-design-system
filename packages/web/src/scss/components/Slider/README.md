# Slider

Slider is a form control that allows users to select a value from a range of values.

## Basic Usage

The Slider component implements the HTML [range input][mdn-range] element. With the current state of CSS, this requires
a lot of browser-specific styles and a bit of JavaScript to update the slider's appearance when the value changes (this
is required by Webkit-based browsers such as Chrome or Safari).

```html
<div class="Slider">
  <label for="slider-default" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-default"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
</div>
```

### Slider Steps and Value

You can specify the Slider steps and value range by setting the `min`, `max`, and `step` attributes on the input element.

⚠️ Please note that the `--slider-position` CSS custom property must be initialized with a correct value. Also, it must
be updated when the slider value changes. See the [Slider Position](#slider-position) section for more details.

```html
<div class="Slider">
  <label for="slider-steps" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-steps"
    style="--slider-position: calc(100% * (9 - 3) / (12 - 3))"
    type="range"
    value="9"
    min="3"
    max="12"
    oninput="this.style.setProperty('--slider-position', `${Math.round(100 * (this.value - 3) / (12 - 3))}%`);"
  />
</div>
```

### Slider Position

The `--slider-position` CSS custom property is used to set the size of the lower portion of the slider track. The custom
property needs to be present when the Slider is initially rendered (see the `style` attribute) and updated anytime the slider
value changes (see the `oninput` handler with the calculation above) which includes also the user's interaction with the
slider.

👉 Please note the value of `--slider-position` must be a **percentage value from 0 to 100** and is calculated as follows:

```txt
position = 100 * (value - min) / (max - min)
```

## Required

ℹ️ As per the [HTML specification][html-spec-range], the Slider component does not have a `required` attribute.

## Hidden Label

```html
<div class="Slider">
  <label for="slider-hidden-label" class="Slider__label Slider__label--hidden">Slider</label>
  <input
    class="Slider__input"
    id="slider-hidden-label"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
</div>
```

## Fluid Width

```html
<div class="Slider Slider--fluid">
  <label for="slider-fluid" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-fluid"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
</div>
```

## Helper Text

```html
<div class="Slider">
  <label for="slider-helper-text" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-helper-text"
    aria-describedby="slider-helper-text-helper-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-helper-text-helper-text" class="Slider__helperText">Helper text</div>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`Slider--success`, `Slider--warning`, `Slider--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.Slider__validationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.Slider__validationText`.

```html
<div class="Slider Slider--success">
  <label for="slider-success" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-success"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
</div>

<div class="Slider Slider--warning">
  <label for="slider-warning" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-warning"
    aria-describedby="slider-warning-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-warning-validation-text" class="Slider__validationText">Validation text</div>
</div>

<div class="Slider Slider--danger">
  <label for="slider-danger" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-danger"
    aria-describedby="slider-danger-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-danger-validation-text" class="Slider__validationText">
    <ul>
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
</div>

<div class="Slider Slider--warning">
  <label for="slider-warning" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-warning"
    aria-describedby="slider-warning-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-warning-validation-text" class="Slider__validationText">
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
render validation texts in a `<div>` with `data-spirit-element="validation_text"`
attribute. This way your JS remains disconnected from CSS that may or may not be
[prefixed][prefixed].

**Remember this approach is only valid for vanilla JS implementation. React
components mix CSS with JS by design and handle prefixes their own way.**

```html
<div class="Slider Slider--danger">
  <label for="slider-danger" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-danger"
    aria-describedby="slider-danger-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div data-spirit-element="validation_text">Error message inserted by JS</div>
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the input, disabled Slider needs to
be marked by adding `Slider--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="Slider Slider--disabled">
  <label for="slider-disabled" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-disabled"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
    disabled
  />
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[html-spec-range]: https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)
[mdn-range]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
[prefixed]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#prefixing-css-class-names
