# UNSTABLE File

This block provides the visual layout for a single file item in a file list.
It is a standalone component, but most often it is used in combination with the [UNSTABLE_FileUpload][readme-file-upload] component.

## Basic Example with File Icon

⚠️ UNSTABLE_File is a list item (`<li>`), so it should be wrapped in a `<ul>` element:

```html
<ul aria-label="Uploaded files">
  <li class="UNSTABLE_File">
    <div class="UNSTABLE_File__preview">
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#file" />
      </svg>
    </div>
    <div class="UNSTABLE_File__content">
      <div class="UNSTABLE_File__text">
        <span class="UNSTABLE_File__name">
          <span class="text-truncate">Document.pdf</span>
        </span>
        <span class="UNSTABLE_File__helperText">8,5 kB</span>
      </div>
    </div>
    <div
      class="Flex Flex--noWrap Flex--alignmentXStretch Flex--tablet--alignmentXLeft Flex--alignmentYStretch Flex--horizontal"
      style="--flex-spacing-x: var(--spirit-space-500)"
    >
      <button
        type="button"
        class="ControlButton ControlButton--large ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive"
        aria-label="Edit file name Document.pdf"
      >
        <svg class="Icon" width="16" height="16" aria-hidden="true">
          <use xlink:href="/assets/icons/svg/sprite.svg#edit" />
        </svg>
      </button>
      <button
        type="button"
        class="ControlButton ControlButton--large ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive"
        aria-label="Remove file Document.pdf from list"
      >
        <svg class="Icon" width="16" height="16" aria-hidden="true">
          <use xlink:href="/assets/icons/svg/sprite.svg#close" />
        </svg>
      </button>
    </div>
  </li>
</ul>
```

## Image Preview

Use an `<img>` element inside `.UNSTABLE_File__preview` for image attachments:

```html
<li class="UNSTABLE_File">
  <div class="UNSTABLE_File__preview">
    <img src="https://picsum.photos/seed/avatar1/48/48" width="48" height="48" alt="Profile photo" />
  </div>
  <!-- … same content and actions as above … -->
</li>
```

The image can be positioned/cropped via CSS custom properties:

- `--spirit-file-image-top`
- `--spirit-file-image-left`
- `--spirit-file-image-width`
- `--spirit-file-image-height`
- `--spirit-file-image-object-fit`

```html
<li
  class="UNSTABLE_File"
  style="
    --spirit-file-image-top: -10px;
    --spirit-file-image-left: -20px;
    --spirit-file-image-width: 80px;
    --spirit-file-image-height: 80px;
    --spirit-file-image-object-fit: cover;
  "
>
  <div class="UNSTABLE_File__preview">
    <img src="https://picsum.photos/seed/avatar1/48/48" width="48" height="48" alt="Profile photo" />
  </div>
  <!-- … same content and actions as above … -->
</li>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`UNSTABLE_File--success`, `UNSTABLE_File--warning`, `UNSTABLE_File--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.UNSTABLE_File__validationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.UNSTABLE_File__validationText`.

### Success, Warning, and Danger States

Add the appropriate validation class (`has-success`, `has-warning`, or `has-danger`) and use `.UNSTABLE_File__validationText` for the message:

```html
<li class="UNSTABLE_File has-success">
  <!-- … preview, name … -->
  <div class="UNSTABLE_File__validationText">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#success" />
    </svg>
    <div>File uploaded successfully</div>
  </div>
  <!-- … actions … -->
</li>
```

### Uploading State

Show upload progress using `.UNSTABLE_File__helperText`:

```html
<li class="UNSTABLE_File">
  <!-- … preview … -->
  <div class="UNSTABLE_File__content">
    <div class="UNSTABLE_File__text">
      <span class="UNSTABLE_File__name">
        <span class="text-truncate">Document.pdf</span>
      </span>
      <div class="UNSTABLE_File__helperText">
        <div>
          <svg class="Icon animation-spin-clockwise" width="16" height="16" aria-hidden="true">
            <use xlink:href="/assets/icons/svg/sprite.svg#spinner" />
          </svg>
          <span>Uploading your file…</span>
        </div>
      </div>
    </div>
  </div>
  <!-- … actions … -->
</li>
```

## Disabled State

```html
<li class="UNSTABLE_File UNSTABLE_File--disabled">
  <div class="UNSTABLE_File__preview">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#file" />
    </svg>
  </div>
  <div class="UNSTABLE_File__content">
    <div class="UNSTABLE_File__text">
      <span class="UNSTABLE_File__name">
        <span class="text-truncate">Document.pdf</span>
      </span>
      <span class="UNSTABLE_File__helperText">8,5 kB</span>
    </div>
  </div>
  <button
    type="button"
    class="ControlButton ControlButton--large ControlButton--symmetrical ControlButton--disabled color-scheme-on-disabled dynamic-color-border dynamic-color-background-interactive"
    aria-label="Remove file Document.pdf from list"
    disabled
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-file-upload]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/UNSTABLE_FileUpload/README.md
