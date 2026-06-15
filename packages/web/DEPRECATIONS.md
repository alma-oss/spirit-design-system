# Deprecations List

This document lists all deprecations that will be removed in the next major version of the _spirit-web_ package.

> Please follow the migration guides to safely upgrade your design system components.

## Deprecations

👉 [What are deprecations?][readme-deprecations]

### Collapse `data-spirit-is-disposable`

The `data-spirit-more` attribute was removed, please use `data-spirit-is-disposable` instead.

#### Migration Guide

- `<a data-spirit-more … />` → `<a data-spirit-id-disposable … />`

### Flex

The direction values `row` and `column` were removed, please use `horizontal` and `vertical` instead.

#### Migration Guide

- `<div class="Flex Flex--row" />` → `<div class="Flex Flex--horizontal" />`
- `<div class="Flex Flex--column" />` → `<div class="Flex Flex--vertical" />`

### Form Fields

Form fields now support the `size` property. Ensure that a size is set for all form fields. The default size is `medium`.

#### Migration Guide

- `<div class="Select"><!-- … --></div>` → `<div class="Select Select--medium"><!-- … --></div>`
- `<div class="TextArea"><!-- … --></div>` → `<div class="TextArea TextArea--medium"><!-- … --></div>`
- `<div class="TextField"><!-- … --></div>` → `<div class="TextField TextField--medium"><!-- … --></div>`

### FileUploader

The `FileUploader` composition (HTML/CSS classes and the `fileUploader` JavaScript plugin) is deprecated and will be removed in the next major version. Use `UNSTABLE_FileUpload` and `UNSTABLE_File` instead. The new API is visual- and composition-first; queue handling and validation are the consumer's responsibility.

See [UNSTABLE_FileUpload][unstable-file-upload-web] and [UNSTABLE_File][unstable-file-web] documentation.

#### Migration Guide

1. Replace `FileUploader`/`FileUploaderInput`/`FileUploaderList`/`FileUploaderAttachment` markup with `UNSTABLE_FileUpload` and `UNSTABLE_File`.
2. Remove dependency on the `fileUploader` plugin (`data-spirit-toggle="fileUploader"` and related behavior).
3. Move queue and validation logic to your own JavaScript and keep the new components visual-first.

```html
<!-- before -->
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <div class="FileUploaderInput" data-spirit-element="wrapper"><!-- … --></div>
  <ul class="FileUploaderList" data-spirit-element="list">
    <!-- … -->
  </ul>
</div>

<!-- after -->
<div class="UNSTABLE_FileUpload"><!-- upload input/dropzone --></div>
<ul class="Stack" aria-label="Uploaded files">
  <li class="UNSTABLE_File"><!-- file row --></li>
</ul>
```

### Skeleton

The check for the existence of the `skeleton-gradient` token will be removed. Ensure that the skeleton-gradient token is properly set up in your project, as if you import all components, the project will not run without it.

### Stack

If you are using the `Stack` component with dividers, you must wrap each item inside the `Stack` component with a `StackItem` component.

#### Migration Guide

```html
<div class="Stack Stack--hasIntermediateDividers">
  <div>Item</div>
  <div>Item</div>
</div>
```

↓

```html
<div class="Stack Stack--hasIntermediateDividers">
  <div class="StackItem">Item</div>
  <div class="StackItem">Item</div>
</div>
```

### TextField

The `TextField__passwordToggle__icon--*` modifiers are deprecated in favor of new
`accessibility-<checked | unchecked>` helpers.

For more information, see documentation of the [TextField][text-field] component.

#### Migration Guide

```html
<span class="TextField__passwordToggle__icon TextField__passwordToggle__icon--shown"><!-- … --></span>
<span class="TextField__passwordToggle__icon TextField__passwordToggle__icon--hidden"><!-- … --></span>
```

↓

```html
<span class="TextField__passwordToggle__icon accessibility-unchecked"><!-- … --></span>
<span class="TextField__passwordToggle__icon accessibility-checked"><!-- … --></span>
```

[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#deprecations
[text-field]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
[unstable-file-upload-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_FileUpload/README.md
[unstable-file-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_File/README.md
