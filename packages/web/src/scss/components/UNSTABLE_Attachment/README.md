# UNSTABLE Attachment

Standalone attachment row styles. This block provides the visual layout for a single attachment item (e.g. in a file list). It is used by the [UNSTABLE_Attachment][web-react-attachment] React component. Class names may be [prefixed][prefixed] in your build.

## Structure

- **`.Attachment`** – root (one row: icon/preview, name, optional slot, dismiss button)
- **`.Attachment--fluid`** – modifier for full-width row
- **`.Attachment__image`** – wrapper for preview image
- **`.Attachment__name`** – file name (use `text-truncate` for long names)
- **`.Attachment__slot`** – optional slot for custom actions (e.g. edit button)
- **`.Attachment__action`** – button style (used for both slot actions and dismiss)

## Basic Example

```html
<li class="Attachment">
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#file" />
  </svg>
  <span class="Attachment__name">
    <span class="text-truncate">My resume.docx</span>
  </span>
  <button type="button" class="Attachment__action">
    <span class="accessibility-hidden">Remove</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

## Fluid Width

Add the modifier so the row stretches to the container width:

```html
<li class="Attachment Attachment--fluid">
  <!-- ... -->
</li>
```

## Preview Image

Use `.Attachment__image` for an image preview. The image can be positioned/cropped via CSS custom properties: `--file-uploader-attachment-image-top`, `--file-uploader-attachment-image-left`, `--file-uploader-attachment-image-width`, `--file-uploader-attachment-image-height`, `--file-uploader-attachment-image-object-fit`.

```html
<li class="Attachment">
  <span class="Attachment__image">
    <img src="preview.jpg" alt="Preview" style="--file-uploader-attachment-image-object-fit: contain;" />
  </span>
  <span class="Attachment__name">
    <span class="text-truncate">image.jpg</span>
  </span>
  <button type="button" class="Attachment__action">
    <span class="accessibility-hidden">Remove</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

## Custom Actions Slot

Add an optional slot (e.g. for an edit button) before the dismiss button:

```html
<li class="Attachment">
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#file" />
  </svg>
  <span class="Attachment__name">
    <span class="text-truncate">My resume.docx</span>
  </span>
  <span class="Attachment__slot">
    <button type="button" class="Attachment__action">
      <span class="accessibility-hidden">Edit</span>
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#edit" />
      </svg>
    </button>
  </span>
  <button type="button" class="Attachment__action">
    <span class="accessibility-hidden">Remove</span>
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</li>
```

[web-react-attachment]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Attachment/README.md
[prefixed]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#prefixed
