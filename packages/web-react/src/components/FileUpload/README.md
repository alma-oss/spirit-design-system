# FileUpload

The FileUpload is a visual-only component for selecting files.
It follows the web contract for `FileUpload` and composes with `File`,
but does **not** include internal validation, form integration, or error handling.

FileUpload is fluid by default. Use parent layout components such as [`Grid`][readme-grid], [`Stack`][readme-stack], or [`Container`][readme-container] to control width and positioning.

The user is responsible for providing their own queue management functions (`addToQueue`, `onDismiss`, etc.)
which the component wires to the appropriate UI elements (input, drag-and-drop, dismiss buttons).

## Usage

### Basic

Files are rendered in a **Stack** (with `elementType="ul"` and `aria-label="Uploaded files"`) as a sibling of `FileUpload`. You iterate over your items and render list items using the [File][readme-file] component. You manage the list in your own state and provide handlers such as `onDismiss` and `onFilesSelected`.

To show the file input and drop zone, pass `name` (and typically `label`, `inputUploadText`, `inputDragAndDropText`, and optionally `buttonText` for the decorative button). When `name` is omitted, only the wrapper is rendered (e.g. for layout or when you only show the uploaded files list).

```tsx
<Stack hasSpacing>
  <FileUpload
    id="file-uploader-example"
    name="attachments"
    label="Label"
    inputUploadText="Upload your file(s)"
    inputDragAndDropText="or drag and drop here"
    helperText="Max file size is 10 MB"
    onFilesSelected={onFilesSelected}
  />
  <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
    {items.map((item) => (
      <File key={item.id} id={item.id} label={item.label} helperText="2.5 MB" onDismiss={() => onDismiss(item.id)} />
    ))}
  </Stack>
</Stack>
```

For image previews, crop metadata, validation rows, or edit actions in file rows, see the [File documentation][readme-file].

### Validation State (Visual Only)

Validation states can be displayed visually, but no validation logic is included.
The consumer is responsible for setting the validation state based on their own logic.

```tsx
<Stack hasSpacing>
  <FileUpload
    id="file-uploader-1"
    name="attachments"
    isRequired
    validationState="success"
    validationText="Validation message"
  />
  <Stack aria-label="Uploaded files" elementType="ul" hasSpacing />
  <FileUpload
    id="file-uploader-2"
    name="attachments"
    hasValidationIcon
    isRequired
    validationState="success"
    validationText="Validation message"
  />
  <Stack aria-label="Uploaded files" elementType="ul" hasSpacing />
  <FileUpload
    id="file-uploader-3"
    name="attachments"
    isRequired
    validationState="success"
    validationText={['Validation message', 'Second validation message']}
  />
  <Stack aria-label="Uploaded files" elementType="ul" hasSpacing />
</Stack>
```

## FileUpload Props

| Name                     | Type                                 | Default  | Required | Description                                                                                                                                                                                                                                                        |
| ------------------------ | ------------------------------------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accept`                 | `string`                             | —        | ✕        | The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. Applies to the file picker dialog only; for drag and drop you must filter accepted types yourself. |
| `buttonText`             | `string`                             | `Browse` | ✕        | Visible label on the decorative button (`aria-hidden`; triggers the same file input). Use `inputUploadText` / field `label` for the accessible name.                                                                                                               |
| `dropZoneRef`            | `MutableRefObject<HTMLDivElement>`   | —        | ✕        | Drop zone element reference                                                                                                                                                                                                                                        |
| `hasValidationIcon`      | `bool`                               | `false`  | ✕        | Whether to show validation icon                                                                                                                                                                                                                                    |
| `helperText`             | `ReactNode`                          | —        | ✕        | Custom helper text                                                                                                                                                                                                                                                 |
| `iconName`               | `string`                             | `upload` | ✕        | Icon used in the drop zone                                                                                                                                                                                                                                         |
| `id`                     | `string`                             | —        | ✓        | File input id (`id` / `htmlFor` / `aria-describedby` linkage in upload input block)                                                                                                                                                                                |
| `inputDragAndDropText`   | `string`                             | —        | ✕        | Drag-and-drop suffix in the drop zone (hidden when drag-and-drop is not supported)                                                                                                                                                                                 |
| `inputRef`               | `MutableRefObject<HTMLInputElement>` | —        | ✕        | Input element reference                                                                                                                                                                                                                                            |
| `inputUploadText`        | `string`                             | —        | ✕        | Primary label in the drop zone                                                                                                                                                                                                                                     |
| `isCompact`              | `bool`                               | —        | ✕        | Compact drop-zone layout (`FileUploadInput__dropZone--compact`)                                                                                                                                                                                                    |
| `isDisabled`             | `bool`                               | —        | ✕        | Whether is field disabled                                                                                                                                                                                                                                          |
| `isDragAndDropSupported` | `bool`                               | —        | ✕        | When set, overrides drag-and-drop support (dashed border / DnD handlers); use `false` for "dragging not available" examples.                                                                                                                                       |
| `isLabelHidden`          | `bool`                               | —        | ✕        | Whether is input label hidden                                                                                                                                                                                                                                      |
| `isMultiple`             | `bool`                               | —        | ✕        | When multiple files can be selected at once                                                                                                                                                                                                                        |
| `isRequired`             | `bool`                               | —        | ✕        | Whether is field marked as required                                                                                                                                                                                                                                |
| `isUploadDisabled`       | `bool`                               | —        | ✕        | Disables only upload interactions. Use `isDisabled` when the whole field should be disabled.                                                                                                                                                                       |
| `label`                  | `ReactNode`                          | —        | ✕        | Field label (required when `name` is provided to show the input)                                                                                                                                                                                                   |
| `name`                   | `string`                             | —        | ✕        | When provided, the file input and drop zone are rendered. Field name used for the file input.                                                                                                                                                                      |
| `rootId`                 | `string`                             | —        | ✕        | Optional `id` on the root `.FileUpload` wrapper (matches static doc anchors such as `example-standard`).                                                                                                                                                           |
| `validationState`        | `ValidationState`                    | —        | ✕        | Validation state (visual only)                                                                                                                                                                                                                                     |
| `validationText`         | \[`ReactNode` \| `ReactNode[]`]      | —        | ✕        | Validation status text (visual only)                                                                                                                                                                                                                               |

The rest of the properties are created from the default `<div>` element. [More about the element][div-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

> ⚠️ We don't use the `required` attribute on the input element. This is because it triggers the browser's default validation, which can block form submission.
> Instead, the component opens the system file dialog and the consumer manages the file(s) (e.g. via `onFilesSelected`).

The files list is built with the **Stack** component: use `<Stack aria-label="Uploaded files" elementType="ul" hasSpacing>` and render file items from [File][readme-file] as its children. See [Stack documentation][stack-docs] for Stack props.

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[div-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Container/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-file]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/File/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[stack-docs]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
