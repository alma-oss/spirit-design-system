# UNSTABLE File

`UNSTABLE_File` is a visual row for a single uploaded file. It is designed to compose with [`UNSTABLE_FileUpload`][file-upload-readme].

## Usage

Render files in a list container and handle actions in your app state:

```tsx
<Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
  <UNSTABLE_File id="file-1" label="Document.pdf" helperText="2.5 MB" onDismiss={() => onDismiss('file-1')} />
</Stack>
```

The default root element is `<li>`; pair it with a list wrapper (e.g. `Stack` with `elementType="ul"`). Use `elementType` when you need a different tag (and set roles if you leave the list pattern).

### Image Preview

Pass `previewSlot` with [`UNSTABLE_FileImagePreview`](#unstable_fileimagepreview-props) for a thumbnail:

```tsx
<UNSTABLE_File
  id="file-1"
  label="photo.jpg"
  helperText="1.2 MB"
  onDismiss={() => onDismiss('file-1')}
  previewSlot={<UNSTABLE_FileImagePreview imagePreview={previewUrl} label={`Preview of ${fileName}`} />}
/>
```

### Image Preview with Crop Metadata

When the user crops a region in the **original** image, pass **all six** numeric fields so the preview matches that crop inside the fixed-size frame. Values are in **pixels of the full source image** (`originalWidth` / `originalHeight`): top-left of the crop is `(x, y)`, size is `cropWidth` × `cropHeight`.

```tsx
const cropMeta = {
  x: 120,
  y: 80,
  cropWidth: 400,
  cropHeight: 400,
  originalWidth: 1600,
  originalHeight: 1200,
};

<UNSTABLE_File
  id="file-1"
  label="avatar.jpg"
  helperText="240 KB"
  onDismiss={() => onDismiss('file-1')}
  previewSlot={
    <UNSTABLE_FileImagePreview
      imagePreview={imageUrl}
      label="Square crop preview"
      meta={cropMeta}
      imageObjectFit="cover"
    />
  }
/>;
```

If any of the keys is missing, crop styling is skipped and the image uses the default layout. Use `imageObjectFit` (`cover` or `contain`) when you need different fitting outside the crop math.

### Validation

There is no built-in file validation. Set `validationState` and `validationText` from your own logic. States follow the [Validation state dictionary][dictionary-validation] (`success`, `warning`, `danger`).

```tsx
<UNSTABLE_File
  id="file-1"
  label="report.xlsx"
  validationState="success"
  validationText="File uploaded successfully"
  onDismiss={() => onDismiss('file-1')}
/>
```

Set `hasValidationIcon` to show the status icon next to the message (same pattern as other form fields). For several lines of feedback, pass an array to `validationText`:

```tsx
<UNSTABLE_File
  id="file-1"
  label="large.zip"
  validationState="danger"
  hasValidationIcon
  validationText={['File too large', 'Maximum size is 10 MB']}
  onDismiss={() => onDismiss('file-1')}
/>
```

## UNSTABLE_File Props

| Name                | Type                                           | Default | Required | Description                                                                                                                     |
| ------------------- | ---------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `editText`          | `string`                                       | i18n    | ✕        | Accessible name for the edit control (default from `attachment.edit`)                                                           |
| `elementType`       | `ElementType`                                  | `li`    | ✕        | Root HTML element for the row                                                                                                   |
| `hasValidationIcon` | `boolean`                                      | `false` | ✕        | When `validationState` is set, show the validation icon next to `validationText`                                                |
| `helperText`        | `ReactNode`                                    | —       | ✕        | Secondary text under the file name                                                                                              |
| `iconName`          | `string`                                       | `file`  | ✕        | Icon used when no `previewSlot` is provided                                                                                     |
| `id`                | `string`                                       | —       | ✕        | Optional `id` on the row; omit when matching static demos without an `id` on `<li>`                                             |
| `isDisabled`        | `boolean`                                      | `false` | ✕        | Disabled visuals and disabled action buttons                                                                                    |
| `label`             | `string`                                       | —       | ✓        | File name (shown in the row)                                                                                                    |
| `onChange`          | `() => void`                                   | —       | ✕        | Edit action; with `onDismiss`, both render in a row; without `onDismiss`, only the edit control is shown                        |
| `onDismiss`         | `() => void`                                   | —       | ✕        | Remove action; omit to hide the dismiss control                                                                                 |
| `previewSlot`       | `ReactNode`                                    | —       | ✕        | Custom preview area (e.g. `UNSTABLE_FileImagePreview`)                                                                          |
| `removeText`        | `string`                                       | i18n    | ✕        | Accessible name for remove (default from `attachment.remove`)                                                                   |
| `validationState`   | [Validation dictionary][dictionary-validation] | —       | ✕        | Visual validation state (visual only)                                                                                           |
| `validationText`    | `ReactNode` or `ReactNode[]`                   | —       | ✕        | Message(s) under the name when `validationState` is set (visual only); array renders multiple lines like other field validation |

The rest of the properties are created from the default `<li>` element. [More about the element][li-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. For setup, see the [Icon component documentation][web-react-icon-documentation].

## UNSTABLE_FileImagePreview Props

| Name             | Type                       | Default | Required | Description                                                                                     |
| ---------------- | -------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------- |
| `imageObjectFit` | `'cover'` \| `'contain'`   | `cover` | ✕        | Maps to `object-fit` in the preview frame                                                       |
| `imagePreview`   | `string`                   | —       | ✓        | Image URL (`src`)                                                                               |
| `label`          | `string`                   | —       | ✓        | Accessible label (`alt`)                                                                        |
| `meta`           | `UnstableFileItemMetadata` | —       | ✕        | Optional crop metadata (`x`, `y`, `cropWidth`, `cropHeight`, `originalWidth`, `originalHeight`) |

The rest of the properties are created from the default `<span>` element. [More about the element][span-element-docs]

[file-upload-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_FileUpload/README.md
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[li-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[span-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
