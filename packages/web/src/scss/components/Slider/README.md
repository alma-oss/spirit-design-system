# Slider

Slider is a form control that allows users to select a value from a range of values.

## Basic Usage

The Slider component implements the HTML [range input][mdn-range] element. With the current state of CSS, this requires
a lot of browser-specific styles and a bit of JavaScript to update the slider's appearance when the value changes (this
is required by Webkit-based browsers such as Chrome or Safari).

```html
<div>
  <label for="slider-default" class="Label">Slider</label>
  <input
    class="Slider"
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
<div>
  <label for="slider-steps" class="Label">Slider</label>
  <input
    class="Slider"
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
<div>
  <label for="slider-hidden-label" class="Label accessibility-hidden">Slider</label>
  <input
    class="Slider"
    id="slider-hidden-label"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
</div>
```

## Layout

Slider is fluid by default. Use parent layout components like [Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container]
to control the component width in page layouts.

## Helper Text

To add helper text, use the [HelperText][readme-helper-text] component:

```html
<div>
  <label for="slider-helper-text" class="Label">Slider</label>
  <input
    class="Slider"
    id="slider-helper-text"
    aria-describedby="slider-helper-text-helper-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div class="HelperText" id="slider-helper-text-helper-text">Helper text</div>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`ValidationText--success`, `ValidationText--warning`, `ValidationText--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div>
  <label for="slider-success" class="Label">Slider</label>
  <input
    class="Slider"
    id="slider-success"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
</div>

<div>
  <label for="slider-warning" class="Label">Slider</label>
  <input
    class="Slider"
    id="slider-warning"
    aria-describedby="slider-warning-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-warning-validation-text" class="ValidationText ValidationText--warning">Validation text</div>
</div>

<div>
  <label for="slider-danger" class="Label">Slider</label>
  <input
    class="Slider"
    id="slider-danger"
    aria-describedby="slider-danger-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-danger-validation-text" class="ValidationText ValidationText--danger">
    <ul>
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
</div>

<div>
  <label for="slider-warning" class="Label">Slider</label>
  <input
    class="Slider"
    id="slider-warning"
    aria-describedby="slider-warning-validation-text"
    style="--slider-position: 30%"
    type="range"
    value="30"
    oninput="this.style.setProperty('--slider-position', `${Math.round((100 * this.value) / 100)}%`);"
  />
  <div id="slider-warning-validation-text" class="ValidationText ValidationText--warning">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

## Disabled State

```html
<div>
  <label for="slider-disabled" class="Label Label--disabled">Slider</label>
  <input
    class="Slider"
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
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
