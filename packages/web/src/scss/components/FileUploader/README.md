# FileUploader

FileUploader allows users to pick one or more files to upload.

> FileUploader itself actually does not upload anything to the server.

FileUploader is a composition of a few subcomponents:

- [FileUploader](#fileuploader-1)
  - [FileUploaderInput](#fileuploaderinput)
  - [FileUploaderList](#fileuploaderlist)
    - [FileUploaderAttachment](#fileuploaderattachment)

## JavaScript Plugin

For full functionality, you need to provide Spirit JavaScript, which will handle toggling of the FileUploader component:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

You will find the [full documentation](#javascript-plugin-api) of the plugin below on this page.

Please consult the [main README][web-readme] for how to include JavaScript plugins.

Or, feel free to write the controlling script yourself.

## FileUploader

This is the main wrapper for the whole composition. It provides proper spacing
for its subcomponents:

```html
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <!-- FileUploaderInput -->
  <!-- FileUploaderList -->
</div>
```

### Fluid Width

By adding the `FileUploader--fluid` modifier class, FileUploader can take up all
the available horizontal space:

```html
<div class="FileUploader FileUploader--fluid" data-spirit-toggle="fileUploader">
  <!-- FileUploaderInput -->
  <!-- FileUploaderList -->
</div>
```

## FileUploaderInput

FileUploaderInput is a file picker built around the native HTML
[file `input`][mdn-input-file].

If supported by the device, FileUploaderInput automatically turns on the
drag-and-drop functionality (signalized by the `has-drag-and-drop` state class
on the root element).

```html
<div class="FileUploaderInput" data-spirit-element="wrapper">
  <label for="file-uploader" class="Label Label--box">Label</label>
  <input
    type="file"
    id="file-uploader"
    name="attachment"
    class="FileUploaderInput__input"
    data-spirit-element="input"
  />
  <div class="FileUploaderInput__dropZone" data-spirit-element="dropZone">
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#upload" />
    </svg>
    <label for="file-uploader" class="FileUploaderInput__dropZoneLabel">
      <span class="FileUploaderInput__link link-primary link-underlined">Upload your file</span>
      <span class="FileUploaderInput__dragAndDropLabel">or drag and drop here</span>
    </label>
    <div class="FileUploaderInput__helperText">Max file size is 10 MB</div>
  </div>
</div>
```

### Selecting Multiple Files at Once

To pick more than one file, just add the [`multiple`][mdn-multiple] attribute to the native `input` element:

```html
<input
  type="file"
  id="file-upload"
  name="attachment"
  class="FileUploaderInput__input"
  data-spirit-element="input"
  multiple
/>
```

### Maximum File Size (JavaScript)

The maximum size of the uploaded file that is validated by the JavaScript plugin can be adjusted. The default value is
10 MB. To increase the limit for example to 20 MB, add the `data-spirit-max-file-size` attribute:

👉 [Learn how file sizes are calculated][learn-about-file-sizes]

```html
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <div class="FileUploaderInput" data-spirit-element="wrapper" data-spirit-max-file-size="20971520">
    <!-- ... -->
  </div>
  <!-- FileUploaderList -->
</div>
```

### Maximum Number of Files in Queue (JavaScript)

Limit of the maximum number of uploaded files. The default value is `1`, but any value can be set via
the `data-spirit-file-queue-limit` attribute:

⚠️ When `data-spirit-file-queue-limit` > `1` the `multiple` attribute must be present on input.

```html
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <div class="FileUploaderInput" data-spirit-element="wrapper" data-spirit-file-queue-limit="2">
    <!-- ... -->
  </div>
  <!-- FileUploaderList -->
</div>
```

### Input Behavior When the Queue Is Filled (JavaScript)

Using the `data-spirit-queue-limit-behavior` attribute together with the desired limit for the queue, you can set the
input/drop zone to be hidden or disabled when the file queue limit is reached. Available options are: `hide`, `disable`,
or `none` (default).

If you set the value of `data-spirit-queue-limit-behavior` to `disable`, the input will be disabled. When you set it to
`hide`, the input disappears completely. After removing a file from the queue, the input is restored.

```html
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <div
    class="FileUploaderInput"
    data-spirit-element="wrapper"
    data-spirit-file-queue-limit="2"
    data-spirit-queue-limit-behavior="hide"
  >
    <!-- ... -->
  </div>
  <!-- FileUploaderList -->
</div>
```

### Allowed File Types

Use the [`accept`][mdn-accept] HTML attribute to restrict what file types can be
uploaded. This way, it is also validated during **drag and drop**. For example, to accept
Microsoft Word documents:

```html
<input
  type="file"
  id="file-uploader"
  name="attachment"
  class="FileUploaderInput__input"
  data-spirit-element="input"
  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
/>
```

### Required Input

To mark the input as required, simply add the `FileUploaderInput__label--required` to the label:

```html
<div class="FileUploaderInput" data-spirit-element="wrapper">
  <label for="file-uploader" class="Label Label--box Label--required">Label</label>
  <input
    type="file"
    id="file-uploader"
    name="attachment"
    class="FileUploaderInput__input"
    data-spirit-element="input"
  />
  <div class="FileUploaderInput__dropZone" data-spirit-element="dropZone">
    <!-- … -->
  </div>
</div>
```

> ⚠️ We don't use the `required` attribute on the input element. This is because it triggers the browser's default validation, which can block form submission.
> Instead, the `FileUploaderInput` component is used to open the system file dialog, and our [JS plugin](#javascript-plugin) manages the file(s).
> Please note, the validation for required files is not automatically handled. Developers need to implement this validation independently, using our JS plugin. This approach provides more flexibility and customization to meet specific validation requirements.

### Validation States

Just like any other form component in Spirit, FileUploader implements the
[Validation state dictionary][dictionary-validation].

Validation states can be presented either by adding a CSS modifier class
(`FileUploaderInput--success`, `FileUploaderInput--warning`,
`FileUploaderInput--danger`), or by adding a JS interaction class when
controlled by JavaScript (`has-success`, `has-warning`, `has-danger`).

When validated on server:

```html
<div class="FileUploaderInput FileUploaderInput--success" data-spirit-element="wrapper">
  <!-- Label -->
  <!-- Drop zone with input -->
  <div class="FileUploaderInput__validationText">Success Validation Text</div>
</div>
```

- To render validation text as a list, use `<ul>` element inside of `.FileUploaderInput__validationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.FileUploaderInput__validationText`.

```html
<div class="FileUploaderInput FileUploaderInput--success" data-spirit-element="wrapper">
  <!-- Label -->
  <!-- Drop zone with input -->
  <div class="FileUploaderInput__validationText">
    <ul>
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
</div>

<div class="FileUploaderInput FileUploaderInput--warning" data-spirit-element="wrapper">
  <!-- Label -->
  <!-- Drop zone with input -->
  <div class="FileUploaderInput__validationText">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Warning validation text with icon</div>
  </div>
</div>
```

### Disabled State

You can turn on the disabled state by adding the `disabled` attribute to the native `input`
(`FileUploaderInput__input`). Do not forget to also add the class `FileUploaderInput--disabled`
or `is-disabled` to the `FileUploaderInput` subcomponent as well.

```html
<div class="FileUploaderInput FileUploaderInput--disabled" data-spirit-element="wrapper">
  <!-- Label -->
  <input
    type="file"
    id="file-uploader-disabled"
    name="attachment"
    class="FileUploaderInput__input"
    disabled
    data-spirit-element="input"
  />
  <!-- Drop zone -->
</div>
```

#### JavaScript-Controlled Validation Text

When implementing client-side form validation, use JS interaction state classes
(`has-success`, `has-warning`, `has-danger`) on the wrapping `<div>` element and
render validation texts in a `<div>` or `<ul>` with `data-spirit-element="validation_text"`
attribute. This way your JS remains disconnected from CSS that may or may not be
[prefixed][prefixed].

**Remember this approach is only valid for vanilla JS implementation. React
components mix CSS with JS by design and handle CSS class-name prefixes their
own way.**

```html
<div class="FileUploaderInput has-success" data-spirit-element="wrapper">
  <!-- Label -->
  <!-- Drop zone with input -->
  <div data-spirit-element="validation_text">Success message inserted by JS</div>
</div>
```

##### Localization

There are four types of validation errors that have their default validation text.
You can customize those validation texts using `data-spirit-message-*` that is passed to the components' root element.

```html
<div class="FileUploaderInput has-danger" data-spirit-element="wrapper" data-spirit-message-maxfilesize="File too big!">
  <!-- … -->
</div>
```

Validation Errors:

| Name                  | Usage                                      | Description                                 |
| --------------------- | ------------------------------------------ | ------------------------------------------- |
| File Duplicity        | `data-spirit-message-duplicity="…"`        | When file is already in the queue           |
| Max File Size         | `data-spirit-message-maxfilesize="…"`      | When file size is over allowed limit        |
| Max Uploaded Files    | `data-spirit-message-maxuploadedfiles="…"` | When the limit of uploaded files is reached |
| Unsupported File Type | `data-spirit-message-unsupported="…"`      | When the file is of unsupported type        |

## FileUploaderList

FileUploaderList is a simple wrapper that provides an accessible title and the
list semantics for the selected files.

```html
<h3 id="attachments" hidden>Attachments</h3>
<ul class="FileUploaderList" aria-labelledby="attachments" data-spirit-element="list">
  <!-- Attachments, typically inserted by the JavaScript plugin -->
</ul>
```

## FileUploaderAttachment

FileUploaderAttachment represents the files to be uploaded. It is expected to be
a direct descendant of FileUploaderList, so it uses `<li>` as the root element.

Thanks to the `text-truncate` helper class, long file names are automatically
truncated.

```html
<li class="FileUploaderAttachment">
  <!-- File icon: -->
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#file" />
  </svg>
  <!-- File name: -->
  <span class="FileUploaderAttachment__name">
    <span class="text-truncate">My resume.docx</span>
  </span>
  <!-- Remove button: -->
  <button type="button" class="FileUploaderAttachment__action">
    <span class="accessibility-hidden">Remove</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

While you may insert FileUploaderAttachment into your FileUploaderList, in typical use cases it will live inside a
[`<template>`][mdn-template] tag in the parent FileUploader. The `<template>` tag must be inserted inside the main
wrapper element that has the `data-spirit-toggle="fileUploader"` attribute. Our JavaScript FileUploader plugin will then
pick up the template and apply it on any attachments the user wants to upload.

```html
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <template data-spirit-snippet="item">
    <li class="FileUploaderAttachment" data-spirit-populate-field="item">
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#file" />
      </svg>
      <span class="FileUploaderAttachment__name">
        <span class="text-truncate" data-spirit-populate-field="name">File name</span>
      </span>
      <button type="button" class="FileUploaderAttachment__action" data-spirit-populate-field="button">
        <span class="accessibility-hidden">Remove</span>
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
      </button>
    </li>
  </template>
  <!-- FileUploaderInput -->
  <!-- FileUploaderList -->
</div>
```

🖼️ Add `data-spirit-imagePreview="true"` to the `FileUploaderAttachment` component to generate preview for images in the file list.

```html
<li class="FileUploaderAttachment" data-spirit-populate-field="item" data-spirit-imagePreview="true"></li>
```

### Preview Image

You can add a preview image and image object fit to the FileUploaderAttachment.
Object fit is `cover` by default.

```html
<span class="FileUploaderAttachment__image">
  <img src="http://placekitten.com/200/300" alt="" style="--file-uploader-attachment-image-object-fit: contain;" />
</span>
```

Full example:

```html
<li class="FileUploaderAttachment">
  <!-- Preview image: start -->
  <span class="FileUploaderAttachment__image">
    <img src="http://placekitten.com/200/300" alt="" style="--file-uploader-attachment-image-object-fit: contain;" />
  </span>
  <!-- Preview image: end -->
  <span class="FileUploaderAttachment__name">
    <span class="text-truncate">My resume.docx</span>
  </span>
  <button type="button" class="FileUploaderAttachment__action">
    <span class="accessibility-hidden">Remove</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

### Custom Actions Slot

You can add custom actions to the FileUploaderAttachment.

```html
<span class="FileUploaderAttachment__slot">
  <!-- Custom action: start -->
  <button type="button" class="FileUploaderAttachment__action">
    <span class="accessibility-hidden">Edit</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#edit" />
    </svg>
  </button>
  <!-- Custom action: end -->
</span>
```

Full example:

```html
<li class="FileUploaderAttachment">
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#file" />
  </svg>
  <span class="FileUploaderAttachment__name">
    <span class="text-truncate">My resume.docx</span>
  </span>
  <span class="FileUploaderAttachment__slot">
    <!-- Custom action: start -->
    <button type="button" class="FileUploaderAttachment__action">
      <span class="accessibility-hidden">Edit</span>
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#edit" />
      </svg>
    </button>
    <!-- Custom action: end -->
  </span>
  <button type="button" class="FileUploaderAttachment__action">
    <span class="accessibility-hidden">Remove</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

#### Attaching Functionality

As long as the FileUploaderAttachment lives inside the `<template>` tag, no functionality can be attached to it.

👉 Don't use IDs to attach functionality to custom actions. IDs must be unique, and the FileUploaderAttachment template
is used for every attachment.

To attach functionality, you need to do so after the `queuedFile.fileUploader` event has been fired:

```js
const editHandler = (event) => {
  alert('Custom action clicked');
};

document.addEventListener('queuedFile.fileUploader', () => {
  document.querySelectorAll('[data-element="example-action"]').forEach((element) => {
    element.removeEventListener('click', editHandler); // Prevent multiple event listeners
    element.addEventListener('click', editHandler);
  });
});
```

Don't forget to remove the event listener when the FileUploaderAttachment is removed from the DOM:

```js
let filesQueueCounter = 0;

const editHandler = (event) => {
  alert('Edit button clicked');
};

document.addEventListener('queuedFile.fileUploader', () => {
  filesQueueCounter++;
  document.querySelectorAll('[data-element="example-action"]').forEach((element) => {
    element.removeEventListener('click', editHandler); // Prevent multiple event listeners
    element.addEventListener('click', editHandler);
  });
});

document.addEventListener('unqueueFile.fileUploader', () => {
  filesQueueCounter--;
  if (filesQueueCounter === 0) {
    document.querySelectorAll('[data-element="example-action"]').forEach((element) => {
      element.removeEventListener('click', editHandler);
    });
  }
});
```

👉 Read more about [fileUploader JavaScript events](#javascript-events).

### Passing Additional Metadata

When you need to send additional data along with the image you can do it with the `meta` argument on `addToQueue` and `updateQueue` methods of the `FileUploader` JS plugin.
If any data in `meta` option will be present, the FileUploader adds an additional hidden input with JSON stringified data to the form.
The identification of this input (`name`) will be the name of the file.
Thus you can pass to the server any additional text data you need.

```javascript
const customAddToQueue = (key: string, file: File) => {
  // passing additional data using the `meta` argument
  return FileUploader.addToQueue(key, file, { fileDescription: 'custom file description' });
};

const customUpdate = (_event: MouseEvent, file: File) => {
  return FileUploader.updateQueue(file.name, file, { fileDescription: 'changing the custom description' });
};
```

#### Updating Image Preview with Cropped Image

When you are using FileUploader with some kind of image cropper you want to also update the image preview on FileUploader attachment when image changes.
You can do this by passing a specific object in shape of coordinates (`{ x: number, y: number, cropWidth: number, cropHeight: number, originalWidth: number, originalHeight: number }`) to the `meta` argument.
Then the coordinates will be applied to the preview image in the attachment.

```javascript
const customUpdate = (event: MouseEvent, file: File) => {
  const meta = { x: 30, y: 30, cropWidth: 150, cropHeight: 150, originalWidth: 560, originalHeight: 330 };

  return FileUploader.updateQueue(file.name, file, meta);
};
```

## Composition

This is how all subcomponents build up the complete FileUploader:

```html
<!-- FileUploader: start -->
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <!-- FileUploaderAttachment template: start -->
  <template data-spirit-snippet="item">
    <li class="FileUploaderAttachment" data-spirit-populate-field="item">
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#file" />
      </svg>
      <span class="FileUploaderAttachment__name">
        <span class="text-truncate" data-spirit-populate-field="name">File name</span>
      </span>
      <button type="button" class="FileUploaderAttachment__action" data-spirit-populate-field="button">
        <span class="accessibility-hidden">Remove</span>
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
      </button>
    </li>
  </template>
  <!-- FileUploaderAttachment template: end -->

  <!-- FileUploaderInput: start -->
  <div class="FileUploaderInput" data-spirit-element="wrapper">
    <label for="file-uploader-with-attachments" class="Label Label--box">Label</label>
    <input
      type="file"
      id="file-uploader-with-attachments"
      name="attachment"
      class="FileUploaderInput__input"
      data-spirit-element="input"
    />
    <div class="FileUploaderInput__dropZone" data-spirit-element="dropZone">
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#upload" />
      </svg>
      <label for="file-uploader-with-attachments" class="FileUploaderInput__dropZoneLabel">
        <span class="FileUploaderInput__link link-primary link-underlined">Upload your file</span>
        <span class="FileUploaderInput__dragAndDropLabel">or drag and drop here</span>
      </label>
      <div class="FileUploaderInput__helperText">Max file size is 10 MB</div>
    </div>
  </div>
  <!-- FileUploaderInput: end -->

  <!-- FileUploaderList: start -->
  <h3 id="attachments" hidden>Attachments</h3>
  <ul class="FileUploaderList" aria-labelledby="attachments" data-spirit-element="list">
    <!-- FileUploaderAttachment INSERTED BY THE JS PLUGIN: start -->
    <li class="FileUploaderAttachment">
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#file" />
      </svg>
      <span class="FileUploaderAttachment__name">
        <span class="text-truncate">My resume.docx</span>
      </span>
      <button type="button" class="FileUploaderAttachment__action">
        <span class="accessibility-hidden">Remove</span>
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
      </button>
    </li>
    <!-- FileUploaderAttachment INSERTED BY THE JS PLUGIN: end -->
  </ul>
  <!-- FileUploaderList: end -->
</div>
<!-- FileUploader: end -->
```

## JavaScript Plugin API

| Method                | Description                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getInstance`         | _Static_ method which allows you to get the FileUploader instance associated with a DOM element.                                                    |
| `getOrCreateInstance` | _Static_ method which allows you to get the FileUploader instance associated with a DOM element, or create a new one in case it wasn’t initialized. |
| `getFileQueue`        | Returns a list of files in the queue.                                                                                                               |
| `addToQueue`          | Adds file to the queue.                                                                                                                             |
| `updateQueue`         | Updates file in the queue.                                                                                                                          |
| `removeFromQueue`     | Removes file from the queue.                                                                                                                        |
| `clearFileQueue`      | Deletes all the files in the queue.                                                                                                                 |

```js
const myUploaderInstance = FileUploader.getInstance('#myUploader'); // Returns a file uploader instance

const fileList: File[] = myUploaderInstance.getFileQueue();
const input = myUploaderInstance.inputElement; // Returns an input element, for further use
```

### JavaScript Events

| Method                      | Description                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `queueFile.fileUploader`    | This event is fired just before the file was added to the queue.                                                                            |
| `queuedFile.fileUploader`   | This event is fired after the file was added to queue.                                                                                      |
| `unqueueFile.fileUploader`  | This event is fired just before the file was removed from the queue.                                                                        |
| `unqueuedFile.fileUploader` | This event is fired after the file was removed from queue.                                                                                  |
| `error.fileUploader`        | This event is fired when an error occurs when adding files to the queue. A specific error message is also returned together with the event. |

## Implementation Notes

### Name Attribute

⚠️ The `name` attribute on hidden input will be always set as an array `[]` for both single-file and multiple-file usage. Make sure you handle it correctly in your code.

The `name` attribute on the default input element is used for the component's picked attachments, which are actually hidden
inputs using this attribute as an array. The `name` attribute remains on the original input element until the first attachment
is picked, then the original `name` attribute disappears and its value is used for individual attachments. If the
attachment is removed from the queue, its original value is returned to the input to avoid possible error states due
to the missing `name` attribute.

Example: So if you set `name="attachments"` to the default input element, the attachments will then show `name="attachments[]"`.

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[learn-about-file-sizes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FileUploader/README.md#understanding-file-size-in-bytes
[mdn-accept]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
[mdn-input-file]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
[mdn-multiple]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple
[mdn-template]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
[prefixed]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#prefixing-css-class-names
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
