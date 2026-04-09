# UNSTABLE Attachment

The UNSTABLE Attachment is a standalone component for rendering a single attachment item (e.g. in a file upload list). It provides the same visual structure and CSS classes as the FileUploader attachment row. It is typically used inside a **Stack** (with `elementType="ul"` and `aria-label="Attachments"`) alongside [UNSTABLE_FileUpload][file-upload-readme] when building upload UIs.

The component does **not** manage state or files; you provide `id`, `label`, `onDismiss`, and optionally `previewSlot`, `onChange`, and labels.

## Usage

### Basic

Render a list of attachments inside a Stack. You manage the list in your own state and provide handlers such as `onDismiss`.

```tsx
<Stack aria-label="Attachments" elementType="ul" hasSpacing>
  {items.map((item) => (
    <UNSTABLE_Attachment key={item.id} id={item.id} label={item.label} onDismiss={() => onDismiss(item.id)} />
  ))}
</Stack>
```

### List with Image Previews

Your attachment list can hold display items with `label`, `previewUrl` (e.g. object URL for images), and optional `meta`. Use the `previewSlot` slot with `UNSTABLE_AttachmentImagePreview` and `item.previewUrl`:

```tsx
<Stack aria-label="Attachments" elementType="ul" hasSpacing>
  {items.map((item) => (
    <UNSTABLE_Attachment
      key={item.id}
      id={item.id}
      label={item.label}
      onDismiss={() => onDismiss(item.id)}
      {...(item.previewUrl && {
        previewSlot: (
          <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
        ),
      })}
    />
  ))}
</Stack>
```

You can pass **any** React node in `previewSlot`. The attachment does not receive or inspect `File`; all data is string-based (label, previewUrl, meta).

### Image Preview with Crop

When building the preview (e.g. with `UNSTABLE_AttachmentImagePreview`), you can pass `meta` with crop coordinates so only a region of the image is shown. The preview uses CSS to position and scale the image so the crop area fills the attachment preview slot.

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
<UNSTABLE_Attachment
  id={item.id}
  label={item.label}
  onDismiss={() => onDismiss(item.id)}
  {...(item.previewUrl && {
    previewSlot: (
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
<UNSTABLE_Attachment key={id} id={id} onChange={() => console.log('edit clicked')} {...props} />
```

### Layout

Attachment rows are fluid by default. Use parent layout components such as `Grid`, `Stack`, or `Container` to control width and positioning.

## UNSTABLE_Attachment Props

| Name          | Type          | Default  | Required | Description                                                                                                                                                |
| ------------- | ------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `editText`    | `string`      | `Edit`   | ✕        | Edit button label                                                                                                                                          |
| `elementType` | `ElementType` | `'li'`   | ✕        | The HTML element or React component to render. Use e.g. `"div"` when the attachment is not inside a list.                                                  |
| `iconName`    | `string`      | `file`   | ✕        | Icon shown when no previewSlot is provided                                                                                                                 |
| `id`          | `string`      | —        | ✓        | Attachment id                                                                                                                                              |
| `label`       | `string`      | —        | ✓        | Display name (e.g. file name)                                                                                                                              |
| `onChange`    | `() => void`  | —        | ✕        | Callback when the edit button is clicked (no arguments); when provided, the edit button is shown                                                           |
| `onDismiss`   | `() => void`  | —        | ✓        | Callback when the attachment should be removed (no arguments; parent typically closes over the item id)                                                    |
| `previewSlot` | `ReactNode`   | —        | ✕        | Optional slot; any React node (e.g. `UNSTABLE_AttachmentImagePreview` with `imagePreview` URL). When provided, it is rendered instead of the default icon. |
| `removeText`  | `string`      | `Remove` | ✕        | Remove button label                                                                                                                                        |

The rest of the properties are created from the default `<li>` element. [More about the element][list-item-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UNSTABLE_AttachmentImagePreview Props

| Name             | Type                     | Default | Required | Description                                                                     |
| ---------------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------- |
| `imageObjectFit` | `'cover'` \| `'contain'` | `cover` | ✕        | How the image fits in the preview frame                                         |
| `imagePreview`   | `string`                 | —       | ✓        | Image URL (e.g. object URL from queue or a custom hook)                         |
| `label`          | `string`                 | —       | ✓        | Accessible label for the image (`alt` attribute)                                |
| `meta`           | `UnstableFileMetadata`   | —       | ✕        | Optional crop metadata; see [Image Preview with Crop](#image-preview-with-crop) |

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
[file-upload-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_FileUpload/README.md
[list-item-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[span-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
