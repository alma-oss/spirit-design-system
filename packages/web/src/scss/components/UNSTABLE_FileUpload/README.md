# UNSTABLE_FileUpload

UNSTABLE_FileUpload allows users to pick one or more files via a native file input and an optional drop zone.

> It does not upload files to the server or manage a file queue; implement that in your application.

The component is a composition of:

- [UNSTABLE_FileUpload](#unstable_fileupload-1) (wrapper)
- [UNSTABLE_FileUploadInput](#unstable_fileuploadinput) (file picker with drop zone)

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
    <label for="file-uploader" class="Label">Label</label>
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
        <div id="file-uploader-helper" class="HelperText">Max file size is 10 MB</div>
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

Add `Label--required` to the label for a required indicator. Validation is up to your application:

```html
<label for="file-uploader" class="Label Label--required">Label</label>
```

### Validation States

Follow the [Validation state dictionary][dictionary-validation]. Use modifier classes on the root `UNSTABLE_FileUploadInput`: `UNSTABLE_FileUploadInput--success`, `UNSTABLE_FileUploadInput--warning`, `UNSTABLE_FileUploadInput--danger`.

Add validation text and give it an `id` for `aria-describedby` when you use it:

```html
<div class="UNSTABLE_FileUploadInput UNSTABLE_FileUploadInput--success">
  <!-- Label, input, drop zone -->
  <div id="file-uploader-validation" class="ValidationText ValidationText--success">Success validation text</div>
</div>
```

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

### Disabled State

- Add the `disabled` attribute to the input.
- Add `UNSTABLE_FileUploadInput--disabled` to the root and `UNSTABLE_FileUploadInput__dropZone--disabled` to the drop zone so styling reflects the disabled state:

```html
<div class="UNSTABLE_FileUploadInput UNSTABLE_FileUploadInput--disabled">
  <label for="file-uploader-disabled" class="Label Label--disabled">Label</label>
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
    <div id="file-uploader-disabled-helper" class="HelperText HelperText--disabled">Max file size is 10 MB</div>
    <div class="Button Button--primary Button--medium Button--disabled" aria-hidden="true">Browse</div>
  </div>
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[mdn-accept]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
[mdn-input-file]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
[mdn-multiple]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple
