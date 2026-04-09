# FieldGroup

FieldGroup is a component that groups form fields together. Additionally, it provides a common label, helper text, and
validation messages for all fields in the group.

## Basic Usage

```html
<fieldset class="FieldGroup">
  <legend class="accessibility-hidden">Label</legend>
  <div class="Label" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <!-- Form fields… -->
  </div>
</fieldset>
```

## HTML Semantics

The FieldGroup component is a wrapper for form fields. Therefore, it uses the HTML `<fieldset>` element to group the
fields together. The `<legend>` element is used to provide an _accessible_ label for the group, while the `<div>`
element with the `FieldGroup__label` class is used to provide a _visible_ label. The reason for this duplication is that
the `<legend>` element has very limited styling capabilities and is only used for accessibility purposes.

On the other hand, a plain `<div>` element is used to wrap the form fields instead of `<ul>` which might seem more
appropriate at first. The reason for this is that the `<fieldset>` element already provides a semantic grouping for the
fields. The `<ul>` element would only add additional complexity without providing any benefit.

⚠️ **The FieldGroup component does not provide all necessary semantics and any styling to its child fields.** It is up
to the developer to configure the child fields correctly, including necessary attributes and CSS classes.

## Required Fields

To render FieldGroup as required, add the `FieldGroup__label--required` modifier class to the `FieldGroup__label`
element.

```html
<fieldset class="FieldGroup">
  <legend class="accessibility-hidden">Label</legend>
  <div class="Label Label--required" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <!-- Form fields… -->
  </div>
</fieldset>
```

⚠️ The `Label` element is only used to indicate visually that all fields in the group are required. The
individual fields themselves need to be marked as required using the `required` attribute and the corresponding
`--required` modifier class.

## Hidden Label

Unlike from the real form fields like TextField or Select, the FieldGroup component does not provide a `--hidden`
modifier class for its label. Because of its construction, you can simply hide the visual label by omitting it in the
code.

```html
<fieldset class="FieldGroup">
  <legend class="accessibility-hidden">Label</legend>
  <!-- div.FieldGroup__label is omitted -->
  <div class="FieldGroup__fields">
    <!-- Form fields… -->
  </div>
</fieldset>
```

⚠️ Remember the `<legend>` element should be always present to provide an accessible label for the group.

## Helper Text

To render helper text, use the [HelperText][helper-text] component:

```html
<fieldset class="FieldGroup" aria-describedby="field-group-helper-text">
  <legend class="accessibility-hidden">Label</legend>
  <div class="Label" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <!-- Form fields… -->
  </div>
  <div class="HelperText" id="field-group-helper-text">Helper text</div>
</fieldset>
```

👉 To improve the UX for users with assistive technologies, connect the helper text to the group using the
`aria-describedby` attribute. This way, the helper text is announced when the group receives focus.

## Fluid Width

FieldGroup is fluid by default. Use parent layout components like [Grid][grid], [Stack][stack], or [Container][container]
to control the component width in page layouts.

## Disabled State

To disable all fields in the group, add the `disabled` attribute to the `<fieldset>` element.

<details>
  <summary>
    ⚠️ Additionally, the corresponding <code>--disabled</code> modifier classes need to be added to all child form
    components.
  </summary>

Why? While the `disabled` attribute on the `<fieldset>` element [is already sufficient][mdn-fieldset-disabled] to
disable the child inputs, you still need to add the `--disabled` modifier classes to all form fields to turn on the
disabled styling on all elements.

</details>

```html
<fieldset class="FieldGroup" disabled>
  <legend class="accessibility-hidden">Label</legend>
  <div class="Label" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <div class="TextField TextField--medium TextField--disabled">
      <label for="text-field" class="TextField__label">Label</label>
      <input type="text" id="text-field" class="TextField__input" name="textField" placeholder="Placeholder" disabled />
    </div>
  </div>
</fieldset>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class (`FieldGroup--success`, `FieldGroup--warning`,
`FieldGroup--danger`), or by adding a JS interaction class when controlled by JavaScript (`has-success`, `has-warning`,
`has-danger`). See Validation state [dictionary][dictionary-validation].

```html
<fieldset class="FieldGroup FieldGroup--success" aria-describedby="field-group-success-validation-text">
  <legend class="accessibility-hidden">Label</legend>
  <div class="Label" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <!-- Form fields… -->
  </div>
  <div id="field-group-success-validation-text" class="ValidationText ValidationText--success">Validation text</div>
</fieldset>
```

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div id="field-group-danger-validation-text" class="ValidationText ValidationText--danger">
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>

<div id="field-group-danger-validation-text" class="ValidationText ValidationText--danger">
  <svg width="20" height="20" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
  </svg>
  <div>Warning validation text with icon</div>
</div>
```

👉 To improve the UX for users with assistive technologies, connect the validation text to the group using the
`aria-describedby` attribute. This way, the validation text is announced when the group receives focus.

👉 Consider using [`aria-live`][aria-live] attribute on the validation text element to announce validation messages to
screen readers.

[aria-live]: https://bitsofco.de/using-aria-live/
[container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[mdn-fieldset-disabled]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#disabled_fieldset
[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
