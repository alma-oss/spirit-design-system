# UNSTABLE_FileUpload

UNSTABLE_FileUpload allows users to pick one or more files via a native file input and an optional drop zone.

> It does not upload files to the server or manage a file queue; implement that in your application.

The component is a composition of:

- [UNSTABLE_FileUpload](#unstable_fileupload-1) (wrapper)
- [UNSTABLE_FileUploadInput](#unstable_fileuploadinput) (file picker with drop zone)
- [UNSTABLE_File][readme-file] (optional, for displaying uploaded files)

## UNSTABLE_FileUpload

Wrapper that provides spacing for the file input block:

```html
<div class="UNSTABLE_FileUpload">
  <!-- UNSTABLE_FileUploadInput -->
</div>
```

## UNSTABLE_FileUploadInput

File picker built around the native HTML [file `input`][mdn-input-file].
Add the `has-drag-and-drop` class when the environment supports drag-and-drop
(e.g. when you enable it via your own script or when you know the context supports it).
The class controls appearance only: dashed border and visibility of the “or drag and drop here” text.

### Basic Structure

```html
<div class="UNSTABLE_FileUpload">
  <div class="UNSTABLE_FileUploadInput has-drag-and-drop">
    <label for="file-uploader" class="UNSTABLE_FileUploadInput__label">Label</label>
    <input
      type="file"
      id="file-uploader"
      name="attachment"
      class="UNSTABLE_FileUploadInput__input"
      aria-describedby="file-uploader-helper"
    />
    <div class="UNSTABLE_FileUploadInput__dropZone">
      <svg class="Icon" width="28" height="28" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#upload" />
      </svg>
      <div class="UNSTABLE_FileUploadInput__dropZoneContent">
        <label for="file-uploader" class="UNSTABLE_FileUploadInput__dropZoneLabel">
          Upload your file <span class="UNSTABLE_FileUploadInput__dragAndDropLabel">or drag and drop here</span>
        </label>
        <div id="file-uploader-helper" class="UNSTABLE_FileUploadInput__helperText">Max file size is 10 MB</div>
      </div>
      <div class="Button Button--primary Button--medium" aria-hidden="true">Browse</div>
    </div>
  </div>
</div>
```

- Use `aria-describedby` on the input to point to the `id` of the helper text, and to the validation text `id` when present (e.g. `aria-describedby="file-uploader-helper file-uploader-validation"`). Order: helper first, then validation if both exist.
- Omit the `has-drag-and-drop` class if drag-and-drop is not supported; the “or drag and drop here” part is then hidden via CSS.

### Compact Variant

Add `UNSTABLE_FileUploadInput__dropZone--compact` to the drop zone for a more compact layout:

```html
<div class="UNSTABLE_FileUploadInput__dropZone UNSTABLE_FileUploadInput__dropZone--compact">
  <div class="UNSTABLE_FileUploadInput__dropZoneContent">
    <!-- label + helper text -->
  </div>
  <div class="Button Button--primary Button--medium" aria-hidden="true">Browse</div>
</div>
```

### Multiple Files

Use the native [`multiple`][mdn-multiple] attribute:

```html
<input type="file" id="file-uploader" name="attachment" class="UNSTABLE_FileUploadInput__input" multiple />
```

### Allowed File Types

Use the [`accept`][mdn-accept] attribute to restrict file types:

```html
<input
  type="file"
  id="file-uploader"
  name="attachment"
  class="UNSTABLE_FileUploadInput__input"
  accept=".pdf,application/pdf"
/>
```

### Required Label

Add `UNSTABLE_FileUploadInput__label--required` to the label for a required indicator. Validation is up to your application:

```html
<label for="file-uploader" class="UNSTABLE_FileUploadInput__label UNSTABLE_FileUploadInput__label--required"
  >Label</label
>
```

### Validation States

Follow the [Validation state dictionary][dictionary-validation]. Use modifier classes on the root `UNSTABLE_FileUploadInput`: `UNSTABLE_FileUploadInput--success`, `UNSTABLE_FileUploadInput--warning`, `UNSTABLE_FileUploadInput--danger`.

Add validation text and give it an `id` for `aria-describedby` when you use it:

```html
<div class="UNSTABLE_FileUploadInput UNSTABLE_FileUploadInput--success">
  <!-- Label, input, drop zone -->
  <div id="file-uploader-validation" class="UNSTABLE_FileUploadInput__validationText">Success validation text</div>
</div>
```

- For a list of messages, use `<ul>` inside `.UNSTABLE_FileUploadInput__validationText`.
- For an icon, place an `<svg>` inside `.UNSTABLE_FileUploadInput__validationText`.

### Disabled State

- Add the `disabled` attribute to the input.
- Add `UNSTABLE_FileUploadInput--disabled` to the root and `UNSTABLE_FileUploadInput__dropZone--disabled` to the drop zone so styling reflects the disabled state:

```html
<div class="UNSTABLE_FileUploadInput UNSTABLE_FileUploadInput--disabled">
  <label for="file-uploader-disabled" class="UNSTABLE_FileUploadInput__label">Label</label>
  <input
    type="file"
    id="file-uploader-disabled"
    name="attachment"
    class="UNSTABLE_FileUploadInput__input"
    disabled
    aria-describedby="file-uploader-disabled-helper"
  />
  <div class="UNSTABLE_FileUploadInput__dropZone UNSTABLE_FileUploadInput__dropZone--disabled">
    <!-- ... -->
    <div id="file-uploader-disabled-helper" class="UNSTABLE_FileUploadInput__helperText">Max file size is 10 MB</div>
    <div class="Button Button--primary Button--medium Button--disabled" aria-hidden="true">Browse</div>
  </div>
</div>
```

## Displaying Uploaded Files

Use [UNSTABLE_File][readme-file] to display a list of uploaded files.
Place the file list after the `UNSTABLE_FileUpload` wrapper.

👉 To provide information about file list to AT, wrap the file list in a container (`ul`) with an appropriate `aria-label` (e.g. `aria-label="Uploaded files"`).
If you need a vertical spacing, you can use `Stack` with `Stack--hasSpacing` on the file list container.

```html
<div class="UNSTABLE_FileUpload mb-800">
  <!-- UNSTABLE_FileUploadInput -->
  <div class="UNSTABLE_FileUploadInput has-drag-and-drop">
    <!-- ... input and drop zone ... -->
  </div>
</div>

<!-- File list using UNSTABLE_File -->
<ul class="Stack Stack--hasSpacing" aria-label="Uploaded files">
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
        <span class="UNSTABLE_File__helperText">2.5 MB</span>
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

  <!-- File with uploading state -->
  <li class="UNSTABLE_File">
    <div class="UNSTABLE_File__preview">
      <img src="https://picsum.photos/seed/avatar1/48/48" width="48" height="48" alt="Image preview" />
    </div>
    <div class="UNSTABLE_File__content">
      <div class="UNSTABLE_File__text">
        <span class="UNSTABLE_File__name">
          <span class="text-truncate">vacation-photo.jpg</span>
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
    <button
      type="button"
      class="ControlButton ControlButton--large ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive"
      aria-label="Remove file vacation-photo.jpg from list"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </li>

  <!-- File with success state -->
  <li class="UNSTABLE_File has-success">
    <div class="UNSTABLE_File__preview">
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#file" />
      </svg>
    </div>
    <div class="UNSTABLE_File__content">
      <div class="UNSTABLE_File__text">
        <span class="UNSTABLE_File__name">
          <span class="text-truncate">report-2024.xlsx</span>
        </span>
        <div class="UNSTABLE_File__validationText">
          <svg class="Icon" width="20" height="20" aria-hidden="true">
            <use xlink:href="/assets/icons/svg/sprite.svg#success" />
          </svg>
          <div>File uploaded successfully</div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="ControlButton ControlButton--large ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive"
      aria-label="Remove file report-2024.xlsx from list"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </li>
</ul>
```

See [UNSTABLE_File documentation][readme-file] for more details on file states and customization options.

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[mdn-accept]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
[mdn-input-file]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
[mdn-multiple]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple
[readme-file]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/UNSTABLE_File/README.md
