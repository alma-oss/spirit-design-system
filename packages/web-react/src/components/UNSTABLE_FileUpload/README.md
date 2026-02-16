# UNSTABLE FileUpload

The UNSTABLE FileUpload is a visual-only variant of the FileUploader component.
It provides the same visual structure and CSS classes as the original FileUploader,
but does **not** include internal validation, form integration, or error handling.

The user is responsible for providing their own queue management functions (`addToQueue`, `onDismiss`, etc.)
which the component wires to the appropriate UI elements (input, drag-and-drop, dismiss buttons).

## Usage

### Basic

Attachments are rendered as **children** of `UNSTABLE_FileUploadAttachments`; you iterate over your items and render `UNSTABLE_FileUploadAttachment` (or custom list items) yourself. You manage the list of attachments in your own state and provide handlers such as `onDismiss` and `onFilesSelected`.

```tsx
<UNSTABLE_FileUpload id="file-uploader-example">
  <UNSTABLE_FileUploadInput
    id="file-uploader-example-input"
    name="attachments"
    label="Label"
    linkText="Upload your file(s)"
    labelText="or drag and drop here"
    helperText="Max file size is 10 MB"
    onFilesSelected={onFilesSelected}
  />
  <UNSTABLE_FileUploadAttachments id="file-uploader-example-list" label="Attachments">
    {items.map((item) => (
      <UNSTABLE_FileUploadAttachment
        key={item.id}
        id={item.id}
        label={item.label}
        onDismiss={() => onDismiss(item.id)}
      />
    ))}
  </UNSTABLE_FileUploadAttachments>
</UNSTABLE_FileUpload>
```

### List with Image Previews

Your attachment list can hold display items with `label`, `previewUrl` (e.g. object URL for images), and optional `meta`. No `File` is passed to the list. Use the `thumbnail` slot with `UNSTABLE_AttachmentImagePreview` and `item.previewUrl`:

```tsx
<UNSTABLE_FileUploadAttachments id="file-uploader-example-list" label="Attachments">
  {items.map((item) => (
    <UNSTABLE_FileUploadAttachment
      key={item.id}
      id={item.id}
      label={item.label}
      onDismiss={() => onDismiss(item.id)}
      {...(item.previewUrl && {
        thumbnail: (
          <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
        ),
      })}
    />
  ))}
</UNSTABLE_FileUploadAttachments>
```

You can pass **any** React node in `thumbnail`. The attachment does not receive or inspect `File`; all data is string-based (label, previewUrl, meta).

### Image Preview with Crop (meta)

When building the thumbnail (e.g. with `UNSTABLE_AttachmentImagePreview`), you can pass `meta` with crop coordinates so only a region of the image is shown. The preview uses CSS to position and scale the image so the crop area fills the attachment thumbnail.

Provide all six numeric fields (in original image coordinates):

| Field            | Description                       |
| ---------------- | --------------------------------- |
| `x`              | Left offset of the crop area (px) |
| `y`              | Top offset of the crop area (px)  |
| `cropWidth`      | Width of the crop area (px)       |
| `cropHeight`     | Height of the crop area (px)      |
| `originalWidth`  | Full image width (px)             |
| `originalHeight` | Full image height (px)            |

```tsx
<UNSTABLE_FileUploadAttachment
  id={item.id}
  label={item.label}
  onDismiss={() => onDismiss(item.id)}
  {...(item.previewUrl && {
    thumbnail: (
      <UNSTABLE_AttachmentImagePreview
        imagePreview={item.previewUrl}
        label={item.label}
        meta={{
          x: 26,
          y: 41,
          cropWidth: 80,
          cropHeight: 80,
          originalWidth: 132,
          originalHeight: 162,
        }}
      />
    ),
  })}
/>
```

If `meta` is omitted or does not contain all six crop fields, the full image is shown (subject to `imageObjectFit` on the preview component).

### Editable Attachment

```tsx
<UNSTABLE_FileUploadAttachment key={id} id={id} onChange={() => console.log('edit clicked')} {...props} />
```

### Validation State (Visual Only)

Validation states can be displayed visually, but no validation logic is included.
The consumer is responsible for setting the validation state based on their own logic.

```tsx
<UNSTABLE_FileUpload>
  <UNSTABLE_FileUploadInput isRequired validationState="success" validationText="Validation message" />
  <UNSTABLE_FileUploadAttachments id="list-1" label="Attachments" />
</UNSTABLE_FileUpload>
<UNSTABLE_FileUpload>
  <UNSTABLE_FileUploadInput hasValidationIcon isRequired validationState="success" validationText="Validation message" />
  <UNSTABLE_FileUploadAttachments id="list-2" label="Attachments" />
</UNSTABLE_FileUpload>
<UNSTABLE_FileUpload>
  <UNSTABLE_FileUploadInput isRequired validationState="success" validationText={["Validation message", "Second validation message"]} />
  <UNSTABLE_FileUploadAttachments id="list-3" label="Attachments" />
</UNSTABLE_FileUpload>
```

## FileUpload Props

| Name      | Type     | Default | Required | Description                            |
| --------- | -------- | ------- | -------- | -------------------------------------- |
| `id`      | `string` | —       | ✓        | FileUpload id                          |
| `isFluid` | `bool`   | —       | ✕        | When the field is supposed to be fluid |

The rest of the properties are created from the default `<div>` element. [More about the element][div-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## FileUploadInput Props

| Name                | Type                                 | Default  | Required | Description                                                                                                                                                     |
| ------------------- | ------------------------------------ | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accept`            | `string`                             | —        | ✕        | The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. |
| `dropZoneRef`       | `MutableRefObject<HTMLDivElement>`   | —        | ✕        | Drop zone element reference                                                                                                                                     |
| `hasValidationIcon` | `bool`                               | `false`  | ✕        | Whether to show validation icon                                                                                                                                 |
| `helperText`        | `ReactNode`                          | —        | ✕        | Custom helper text                                                                                                                                              |
| `iconName`          | `string`                             | `upload` | ✕        | Icon used in the drop zone                                                                                                                                      |
| `id`                | `string`                             | —        | ✓        | FileUploadInput id                                                                                                                                              |
| `inputRef`          | `MutableRefObject<HTMLInputElement>` | —        | ✕        | Input element reference                                                                                                                                         |
| `isDisabled`        | `bool`                               | —        | ✕        | Whether is field disabled                                                                                                                                       |
| `isLabelHidden`     | `bool`                               | —        | ✕        | Whether is input label hidden                                                                                                                                   |
| `isMultiple`        | `bool`                               | —        | ✕        | When multiple files can be selected at once                                                                                                                     |
| `isRequired`        | `bool`                               | —        | ✕        | Whether is field marked as required                                                                                                                             |
| `label`             | `ReactNode`                          | —        | ✕        | Field label                                                                                                                                                     |
| `labelText`         | `string`                             | —        | ✕        | Label for input in Drop zone                                                                                                                                    |
| `linkText`          | `string`                             | —        | ✕        | Link text in input in Drop zone                                                                                                                                 |
| `name`              | `string`                             | —        | ✓        | Field name, will be used for each attachment in the queue                                                                                                       |
| `validationState`   | `ValidationState`                    | —        | ✕        | Validation state (visual only)                                                                                                                                  |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]      | —        | ✕        | Validation status text (visual only)                                                                                                                            |

The rest of the properties are created from the default `<input>` element. [More about the element][input-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

> ⚠️ We don't use the `required` attribute on the input element. This is because it triggers the browser's default validation, which can block form submission.
> Instead, the `UNSTABLE_FileUploadInput` component is used to open the system file dialog, and the component itself manages the file(s).

## FileUploadAttachments Props

| Name       | Type        | Default       | Required | Description                                                                  |
| ---------- | ----------- | ------------- | -------- | ---------------------------------------------------------------------------- |
| `children` | `ReactNode` | —             | ✕        | Attachment items (e.g. `UNSTABLE_FileUploadAttachment` components) to render |
| `id`       | `string`    | —             | ✓        | FileUploadAttachments id                                                     |
| `label`    | `string`    | `Attachments` | ✕        | Label for the list (used in the hidden heading for accessibility)            |

The rest of the properties are created from the default `<ul>` element. [More about the element][list-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## FileUploadAttachment Props

| Name         | Type         | Default  | Required | Description                                                                                                                                                |
| ------------ | ------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `editText`   | `string`     | `Edit`   | ✕        | Edit button label                                                                                                                                          |
| `iconName`   | `string`     | `file`   | ✕        | Icon shown when no thumbnail is provided                                                                                                                   |
| `id`         | `string`     | —        | ✓        | FileUploadAttachment id                                                                                                                                    |
| `label`      | `string`     | —        | ✓        | Display name (e.g. file name)                                                                                                                              |
| `onDismiss`  | `() => void` | —        | ✓        | Callback when the attachment should be removed (no arguments; parent typically closes over the item id)                                                    |
| `onChange`   | `() => void` | —        | ✕        | Callback when the edit button is clicked (no arguments); when provided, the edit button is shown                                                           |
| `removeText` | `string`     | `Remove` | ✕        | Remove button label                                                                                                                                        |
| `thumbnail`  | `ReactNode`  | —        | ✕        | Optional slot; any React node (e.g. `UNSTABLE_AttachmentImagePreview` with `imagePreview` URL). When provided, it is rendered instead of the default icon. |

The rest of the properties are created from the default `<li>` element. [More about the element][list-item-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_AttachmentImagePreview Props

| Name             | Type                     | Default | Required | Description                                                                          |
| ---------------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------ |
| `imagePreview`   | `string`                 | —       | ✓        | Image URL (e.g. object URL from queue or `useFilePreviewUrl`)                        |
| `label`          | `string`                 | —       | ✓        | Accessible label for the image (`alt` attribute)                                     |
| `meta`           | `UnstableFileMetadata`   | —       | ✕        | Optional crop metadata; see [Image Preview with Crop](#image-preview-with-crop-meta) |
| `imageObjectFit` | `'cover'` \| `'contain'` | `cover` | ✕        | How the image fits in the thumbnail frame                                            |

The rest of the properties are created from the default `<span>` element. [More about the element][span-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_AttachmentActionButton Props

| Name       | Type                                   | Default | Required | Description                                                                |
| ---------- | -------------------------------------- | ------- | -------- | -------------------------------------------------------------------------- |
| `children` | `ReactNode`                            | —       | ✕        | Accessible label for the button (visually hidden, used for screen readers) |
| `name`     | `string`                               | `edit`  | ✕        | Icon name for the button                                                   |
| `onClick`  | `MouseEventHandler<HTMLButtonElement>` | —       | ✕        | Button click handler                                                       |

The rest of the properties are created from the default `<button>` element. [More about the element][button-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_AttachmentDismissButton Props

| Name       | Type                                   | Default | Required | Description                                                                |
| ---------- | -------------------------------------- | ------- | -------- | -------------------------------------------------------------------------- |
| `children` | `ReactNode`                            | —       | ✕        | Accessible label for the button (visually hidden, used for screen readers) |
| `onClick`  | `MouseEventHandler<HTMLButtonElement>` | —       | ✕        | Button click handler                                                       |

The rest of the properties are created from the default `<button>` element. [More about the element][button-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[button-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[div-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
[input-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
[list-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
[list-item-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[span-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
