# Select

Basic usage:

```html
<div class="Select Select--medium">
  <label for="select-simple" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-simple" name="simple" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
```

Sizes (please note the icon size):

```html
<div class="Select Select--small">
  <label for="select-size-small" class="Label">Small</label>
  <div class="Select__inputContainer">
    <select id="select-size-small" name="size-small" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>

<div class="Select Select--medium">
  <label for="select-size-medium" class="Label">Medium (default)</label>
  <div class="Select__inputContainer">
    <select id="select-size-medium" name="size-medium" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>

<div class="Select Select--large">
  <label for="select-size-large" class="Label">Large</label>
  <div class="Select__inputContainer">
    <select id="select-size-large" name="size-large" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
```

Required select (requires a placeholder option):

```html
<div class="Select Select--medium">
  <label for="select-simple" class="Label Label--required">Label</label>
  <div class="Select__inputContainer">
    <select id="select-simple" name="simple" class="Select__input" required>
      <option value="" selected>Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
```

Hidden label:

```html
<div class="Select Select--medium">
  <label for="select-hidden-label" class="Label accessibility-hidden">Label</label>
  <div class="Select__inputContainer">
    <select id="select-hidden-label" name="hiddenLabel" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
```

Placeholder:

Use the `option` with no value and the `selected` attribute. This
creates a placeholder in the selection list.

If you must fill out the selection list, also use the `disabled`
attribute for the placeholder. This way, the form can't be sent
until the user picks a real option, not the placeholder. This makes
sure users give all needed details before sending the form.

```html
<div class="Select Select--medium">
  <label for="select-placeholder" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-placeholder" name="placeholder" class="Select__input">
      <option value="" selected>Select option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>

<div class="Select Select--medium">
  <label for="select-placeholder-disabled" class="Label Label--required">Label</label>
  <div class="Select__inputContainer">
    <select id="select-placeholder-disabled" name="placeholderDisabled" class="Select__input" required>
      <option value="" selected disabled>Select option (default is disabled)</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
```

## Layout

Select is fluid by default. Use parent layout components like [Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container]
to control the component width in page layouts.

Usage with helper text:

To add helper text, use the [HelperText][readme-helper-text] component:

```html
<div class="Select Select--medium">
  <label for="select-helper-text" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select
      id="select-helper-text"
      name="helperText"
      class="Select__input"
      aria-describedby="select-helper-text-helper-text"
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
  <div class="HelperText" id="select-helper-text-helper-text">Helper text</div>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`Select--success`, `Select--warning`, `Select--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="Select Select--medium Select--success">
  <label for="select-success" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-success" name="success" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>

<div class="Select Select--medium Select--warning">
  <label for="select-warning" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-warning" name="warning" class="Select__input" aria-describedby="select-warning-validation-text">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
  <div class="ValidationText ValidationText--warning" id="select-warning-validation-text">Validation text</div>
</div>

<div class="Select Select--medium Select--danger">
  <label for="select-danger" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-danger" name="danger" class="Select__input" aria-describedby="select-danger-validation-text">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
  <div class="ValidationText ValidationText--danger" id="select-danger-validation-text">
    <ul>
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
</div>

<div class="Select Select--medium Select--warning">
  <label for="select-warning-icon" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select
      id="select-warning-icon"
      name="warning"
      class="Select__input"
      aria-describedby="select-warning-icon-validation-text"
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
  <div class="ValidationText ValidationText--warning" id="select-warning-icon-validation-text">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the select, disabled Select should
be marked by adding `Select--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="Select Select--medium Select--disabled">
  <label for="select-disabled" class="Label Label--disabled">Label</label>
  <div class="Select__inputContainer">
    <select id="select-disabled" name="disabled" class="Select__input" disabled>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
<div class="Select Select--medium is-disabled">
  <label for="select-is-disabled" class="Label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-is-disabled" name="isDisabled" class="Select__input" disabled>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
</div>
```

👉 Please note that responsive border radius is defined by design specifications.

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
