# Deprecations List

This document lists all deprecations that will be removed in the next major version of the _spirit-web-react_ package.

> Please follow the migration guides to safely upgrade your design system components.

## Deprecations

👉 [What are deprecations?][readme-deprecations]

### UncontrolledCollapse `isDisposable`

The `hideOnCollapse` prop was removed, please use `isDisposable` instead.

#### Migration Guide

We are providing a [codemod][codemod-collapse] to assist with this change.

- `<UncontrolledCollapse id="collapse" renderTrigger={…} hideOnCollapse … />` → `<UncontrolledCollapse id="collapse" renderTrigger={…} isDisposable … />`

### Flex

The direction values `row` and `column` were removed, please use `horizontal` and `vertical` instead.

#### Migration Guide

We are providing a [codemod][codemod-flex] to assist with this change.

- `<Flex direction="row" />` → ` <Flex direction="horizontal" />`
- `<Flex direction="column" />` → `<Flex direction="vertical" />`
- `<Flex direction={{ mobile: 'column', tablet: 'row' }} />` → `<Flex direction={{ mobile: 'vertical', tablet: 'horizontal' }} />`

### FileUploader

The `FileUploader` component and its subcomponents are deprecated. Use `FileUpload` and `File` instead. `FileUpload` is visual-first; you own queue handling, validation, and form integration.

For details, see [FileUpload][file-upload] and [File][file] documentation.

#### Migration Guide

1. Replace `FileUploader` composition (`FileUploader`, `FileUploaderInput`, `FileUploaderList`, `FileUploaderAttachment`) with `FileUpload` + `File`.
2. Move queue handling (`addToQueue`, `onDismiss`, duplicate checks, limits) from component internals to your application state.
3. Keep validation in your app and pass only visual validation props to `FileUpload`.

```tsx
// before
<FileUploader id="file-uploader" fileQueue={fileQueue} addToQueue={addToQueue} onDismiss={onDismiss} clearQueue={clearQueue}>
  <FileUploaderInput id="file-uploader-input" name="attachments" label="Label" linkText="Upload your file(s)" />
  <FileUploaderList
    id="file-uploader-list"
    inputName="attachments"
    label="Attachments"
    attachmentComponent={(props) => <FileUploaderAttachment key={props.id} {...props} />}
  />
</FileUploader>

// after
<Stack hasSpacing>
  <FileUpload
    id="file-upload"
    name="attachments"
    label="Label"
    inputUploadText="Upload your file(s)"
    inputDragAndDropText="or drag and drop here"
    onFilesSelected={onFilesSelected}
  />
  <Stack elementType="ul" aria-label="Uploaded files" hasSpacing>
    {items.map((item) => (
      <File key={item.id} id={item.id} label={item.label} onDismiss={() => onDismiss(item.id)} />
    ))}
  </Stack>
</Stack>
```

### Header

The `Header` component is deprecated, please use the `UNSTABLE_Header` component instead.

### Stack

If you are using the `Stack` component with dividers, you must wrap each item inside the `Stack` component with a `StackItem` component.

#### Migration Guide

```tsx
<Stack hasIntermediateDividers>
  <>Item</>
  <>Item</>
</Stack>
```

↓

```tsx
<Stack hasIntermediateDividers>
  <StackItem>Item</StackItem>
  <StackItem>Item</StackItem>
</Stack>
```

[codemod-collapse]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v4/web-react/README.md#v4web-reactcollapse-isdisposable-prop--uncontrolledcollapse-hideoncollapse-to-isdisposable-prop-change
[codemod-flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v4/web-react/README.md#v4web-reactflex-direction-values---flex-direction-prop-values-row-to-horizontal-and-column-to-vertical
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
[file-upload]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FileUpload/README.md
[file]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/File/README.md
