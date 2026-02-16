# UNSTABLE FileUpload

The UNSTABLE FileUpload is a visual-only variant of the FileUploader component.
It provides the same visual structure and CSS classes as the original FileUploader,
but does **not** include internal validation, form integration, or error handling.

The user is responsible for providing their own queue management functions (`addToQueue`, `onDismiss`, etc.)
which the component wires to the appropriate UI elements (input, drag-and-drop, dismiss buttons).

## Usage

### Basic

Attachments are rendered in a **Stack** (with `elementType="ul"` and `aria-label="Attachments"`) as a sibling of `UNSTABLE_FileUpload`. You iterate over your items and render attachment list items yourself using the [UNSTABLE_Attachment][attachment-readme] component. Import attachment components from `UNSTABLE_Attachment`. You manage the list of attachments in your own state and provide handlers such as `onDismiss` and `onFilesSelected`.

To show the file input and drop zone, pass `name` (and typically `label`, `linkText`, `labelText`). When `name` is omitted, only the wrapper is rendered (e.g. for layout or when you only show the attachments list).

```tsx
<Stack hasSpacing>
  <UNSTABLE_FileUpload
    id="file-uploader-example"
    name="attachments"
    label="Label"
    linkText="Upload your file(s)"
    labelText="or drag and drop here"
    helperText="Max file size is 10 MB"
    onFilesSelected={onFilesSelected}
  />
  <Stack aria-label="Attachments" elementType="ul" hasSpacing>
    {items.map((item) => (
      <UNSTABLE_Attachment key={item.id} id={item.id} label={item.label} onDismiss={() => onDismiss(item.id)} />
    ))}
  </Stack>
</Stack>
```

For attachment list items with image previews, crop metadata, or edit actions, see the [UNSTABLE_Attachment documentation][attachment-readme].

### Validation State (Visual Only)

Validation states can be displayed visually, but no validation logic is included.
The consumer is responsible for setting the validation state based on their own logic.

```tsx
<Stack hasSpacing>
  <UNSTABLE_FileUpload
    id="file-uploader-1"
    name="attachments"
    isRequired
    validationState="success"
    validationText="Validation message"
  />
  <Stack aria-label="Attachments" elementType="ul" hasSpacing />
  <UNSTABLE_FileUpload
    id="file-uploader-2"
    name="attachments"
    hasValidationIcon
    isRequired
    validationState="success"
    validationText="Validation message"
  />
  <Stack aria-label="Attachments" elementType="ul" hasSpacing />
  <UNSTABLE_FileUpload
    id="file-uploader-3"
    name="attachments"
    isRequired
    validationState="success"
    validationText={['Validation message', 'Second validation message']}
  />
  <Stack aria-label="Attachments" elementType="ul" hasSpacing />
</Stack>
```

## FileUpload Props

| Name                | Type                                 | Default  | Required | Description                                                                                                                                                                                                                                                        |
| ------------------- | ------------------------------------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accept`            | `string`                             | —        | ✕        | The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. Applies to the file picker dialog only; for drag and drop you must filter accepted types yourself. |
| `dropZoneRef`       | `MutableRefObject<HTMLDivElement>`   | —        | ✕        | Drop zone element reference                                                                                                                                                                                                                                        |
| `hasValidationIcon` | `bool`                               | `false`  | ✕        | Whether to show validation icon                                                                                                                                                                                                                                    |
| `helperText`        | `ReactNode`                          | —        | ✕        | Custom helper text                                                                                                                                                                                                                                                 |
| `iconName`          | `string`                             | `upload` | ✕        | Icon used in the drop zone                                                                                                                                                                                                                                         |
| `id`                | `string`                             | —        | ✓        | FileUpload id (used for the wrapper and the file input when input is rendered)                                                                                                                                                                                     |
| `inputRef`          | `MutableRefObject<HTMLInputElement>` | —        | ✕        | Input element reference                                                                                                                                                                                                                                            |
| `isDisabled`        | `bool`                               | —        | ✕        | Whether is field disabled                                                                                                                                                                                                                                          |
| `isFluid`           | `bool`                               | —        | ✕        | When the field is supposed to be fluid                                                                                                                                                                                                                             |
| `isLabelHidden`     | `bool`                               | —        | ✕        | Whether is input label hidden                                                                                                                                                                                                                                      |
| `isMultiple`        | `bool`                               | —        | ✕        | When multiple files can be selected at once                                                                                                                                                                                                                        |
| `isRequired`        | `bool`                               | —        | ✕        | Whether is field marked as required                                                                                                                                                                                                                                |
| `label`             | `ReactNode`                          | —        | ✕        | Field label (required when `name` is provided to show the input)                                                                                                                                                                                                   |
| `labelText`         | `string`                             | —        | ✕        | Label for input in Drop zone                                                                                                                                                                                                                                       |
| `linkText`          | `string`                             | —        | ✕        | Link text in input in Drop zone                                                                                                                                                                                                                                    |
| `name`              | `string`                             | —        | ✕        | When provided, the file input and drop zone are rendered. Field name used for the file input.                                                                                                                                                                      |
| `validationState`   | `ValidationState`                    | —        | ✕        | Validation state (visual only)                                                                                                                                                                                                                                     |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]      | —        | ✕        | Validation status text (visual only)                                                                                                                                                                                                                               |

The rest of the properties are created from the default `<div>` element. [More about the element][div-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

> ⚠️ We don't use the `required` attribute on the input element. This is because it triggers the browser's default validation, which can block form submission.
> Instead, the component opens the system file dialog and the consumer manages the file(s) (e.g. via `onFilesSelected`).

The attachments list is built with the **Stack** component: use `<Stack aria-label="Attachments" elementType="ul" hasSpacing>` and render attachment items from [UNSTABLE_Attachment][attachment-readme] as its children. See [Stack documentation][stack-docs] for Stack props.

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[attachment-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Attachment/README.md
[div-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
[stack-docs]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
