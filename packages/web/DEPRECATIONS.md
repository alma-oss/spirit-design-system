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

The `FileUploader` composition (HTML/CSS classes and the `fileUploader` JavaScript plugin) is deprecated and will be removed in the next major version. Use `FileUpload` and `File` instead. The new API is visual- and composition-first; queue handling and validation are the consumer's responsibility.

See [FileUpload][file-upload-web] and [File][file-web] documentation.

#### Migration Guide

1. Replace `FileUploader`/`FileUploaderInput`/`FileUploaderList`/`FileUploaderAttachment` markup with `FileUpload` and `File`.
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
<div class="FileUpload"><!-- upload input/dropzone --></div>
<ul class="Stack" aria-label="Uploaded files">
  <li class="File"><!-- file row --></li>
</ul>
```

### Header

The `Header` component was removed, please use `UNSTABLE_Header` component instead.

### Skeleton

The check for the existence of the `skeleton-gradient` token will be removed. Ensure that the skeleton-gradient token is properly set up in your project, as if you import all components, the project will not run without it.

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
[file-upload-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FileUpload/README.md
[file-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/File/README.md
