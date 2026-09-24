# Deprecations List

This document lists all deprecations that will be removed in the next major version of the _spirit-web-react_ package.

> Please follow the migration guides to safely upgrade your design system components.

## Deprecations

👉 [What are deprecations?][readme-deprecations]

The deprecated component string props below can be migrated with:

```shell
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/component-strings-prop
```

### Breadcrumbs

The `goBackTitle` prop is deprecated and will be removed in v6. Use `strings.label.back` instead.

#### Migration Guide

```tsx
// Before
<Breadcrumbs goBackTitle="Back" />

// After
<Breadcrumbs strings={{ label: { back: 'Back' } }} />
```

### CloseButton

The `label` prop is deprecated and will be removed in v6. Use `strings.ariaLabel` instead.

#### Migration Guide

```tsx
// Before
<CloseButton label="Close dialog" />

// After
<CloseButton strings={{ ariaLabel: 'Close dialog' }} />
```

### File

The `editText` and `removeText` props are deprecated and will be removed in v6. Use `strings.ariaLabelEdit` and
`strings.ariaLabelRemove` instead.

#### Migration Guide

```tsx
// Before
<File label="document.pdf" editText="Edit file" removeText="Remove file" />

// After
<File label="document.pdf" strings={{ ariaLabelEdit: 'Edit file', ariaLabelRemove: 'Remove file' }} />
```

### FileUpload

The `buttonText`, `inputUploadText`, and `inputDragAndDropText` props are deprecated and will be removed in v6.
Use `strings.labelButton`, `strings.labelUpload`, and `strings.labelDragAndDrop` instead.

#### Migration Guide

```tsx
// Before
<FileUpload
  id="attachments"
  name="attachments"
  label="Attachments"
  buttonText="Browse"
  inputUploadText="Upload your file"
  inputDragAndDropText="or drag and drop here"
/>

// After
<FileUpload
  id="attachments"
  name="attachments"
  label="Attachments"
  strings={{
    labelButton: 'Browse',
    labelUpload: 'Upload your file',
    labelDragAndDrop: 'or drag and drop here',
  }}
/>
```

### ModalHeader

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabelClose` instead.

#### Migration Guide

```tsx
// Before
<ModalHeader closeLabel="Close modal">Modal title</ModalHeader>

// After
<ModalHeader strings={{ ariaLabelClose: 'Close modal' }}>Modal title</ModalHeader>
```

### PaginationLink

The `accessibilityLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabel` instead.

#### Migration Guide

```tsx
// Before
<PaginationLink accessibilityLabel="Go to page 2" pageNumber={2} />

// After
<PaginationLink strings={{ ariaLabel: 'Go to page 2' }} pageNumber={2} />
```

### PaginationLinkPrevious

The `accessibilityLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabelPrevious` instead.

#### Migration Guide

```tsx
// Before
<PaginationLinkPrevious accessibilityLabel="Previous page" href="/page/1" />

// After
<PaginationLinkPrevious strings={{ ariaLabelPrevious: 'Previous page' }} href="/page/1" />
```

### PaginationLinkNext

The `accessibilityLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabelNext` instead.

#### Migration Guide

```tsx
// Before
<PaginationLinkNext accessibilityLabel="Next page" href="/page/3" />

// After
<PaginationLinkNext strings={{ ariaLabelNext: 'Next page' }} href="/page/3" />
```

### UncontrolledPagination

The `accessibilityLabel`, `accessibilityLabelPrevious`, and `accessibilityLabelNext` props are deprecated and will
be removed in v6. Use the corresponding keys in `strings` instead.

#### Migration Guide

```tsx
// Before
<UncontrolledPagination
  accessibilityLabel="Go to page"
  accessibilityLabelPrevious="Previous page"
  accessibilityLabelNext="Next page"
  totalPages={10}
/>

// After
<UncontrolledPagination
  strings={{
    ariaLabel: 'Go to page',
    ariaLabelPrevious: 'Previous page',
    ariaLabelNext: 'Next page',
  }}
  totalPages={10}
/>
```

### UncontrolledSplitButton

The `buttonLabel` and `dropdownTriggerLabel` props are deprecated and will be removed in v6. Use `labelButton` and
`strings.ariaLabelDropdown` instead.

#### Migration Guide

```tsx
// Before
<UncontrolledSplitButton
  id="save-actions"
  buttonLabel="Save"
  buttonOnClick={handleSave}
  dropdownTriggerLabel="More"
/>

// After
<UncontrolledSplitButton
  id="save-actions"
  labelButton="Save"
  buttonOnClick={handleSave}
  strings={{ ariaLabelDropdown: 'More' }}
/>
```

### ToastBar

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabelClose` instead.

#### Migration Guide

```tsx
// Before
<ToastBar id="toast-example" closeLabel="Close toast" />

// After
<ToastBar id="toast-example" strings={{ ariaLabelClose: 'Close toast' }} />
```

### UncontrolledToast

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabelClose` instead.

#### Migration Guide

```tsx
// Before
<UncontrolledToast closeLabel="Close toast" />

// After
<UncontrolledToast strings={{ ariaLabelClose: 'Close toast' }} />
```

### Tooltip

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.ariaLabelClose` instead.

#### Migration Guide

```tsx
// Before
<Tooltip id="tooltip-example" closeLabel="Close tooltip" isOpen onToggle={setIsOpen} />

// After
<Tooltip
  id="tooltip-example"
  strings={{ ariaLabelClose: 'Close tooltip' }}
  isOpen
  onToggle={setIsOpen}
/>
```

### UNSTABLE_Picker

The flat translation props (`addButtonLabel`, `closeButtonLabel`, `emptySelectionLabel`, `removeAllLabel`,
`removeItemLabel`, `selectionAriaLabel`, `tagDescriptionText`) are deprecated and will be removed in v6. Use `strings`
instead. The same mapping applies to `UNSTABLE_UncontrolledPicker`.

#### Migration Guide

```tsx
// Before
<UNSTABLE_Picker addButtonLabel="Add" emptySelectionLabel="Languages" />

// After
<UNSTABLE_Picker strings={{ ariaAdd: 'Add', labelEmptySelection: 'Languages' }} />
```

### UNSTABLE_Combobox

The flat translation props (`addMoreLabel`, `addMoreDescriptionText`, `emptySelectionLabel`, `removeAllLabel`,
`removeItemLabel`, `selectionAriaLabel`, `selectionCountLabel`, `selectionCountLabelSingular`, `tagDescriptionText`)
are deprecated and will be removed in v6. Use `strings` instead. `emptyStateLabel` and `loadingLabel` stay top-level
because they accept `ReactNode`. The same mapping applies to `UNSTABLE_UncontrolledCombobox`.

#### Migration Guide

```tsx
// Before
<UNSTABLE_Combobox addMoreLabel="+ Add more…" emptySelectionLabel="Search" />

// After
<UNSTABLE_Combobox strings={{ labelAddMore: '+ Add more…', labelEmptySelection: 'Search' }} />
```

### ScrollView

The `ariaLabelControls` prop is deprecated and will be removed in v6. Use `strings.ariaStart`, `strings.ariaEnd`,
`strings.ariaTop`, and `strings.ariaBottom` instead. The same mapping applies to `ScrollViewControls`.

#### Migration Guide

```tsx
// Before
<ScrollView hasControls ariaLabelControls={{ start: 'Left', end: 'Right' }} />

// After
<ScrollView hasControls strings={{ ariaStart: 'Left', ariaEnd: 'Right' }} />
```

### Heading

The `emphasis` prop is deprecated in its entirety and will be removed in v6. Use the `fontWeight` prop for the
`regular`, `semibold`, and `bold` font weights, and use the `isItalic` prop for italic styling.

#### Migration Guide

Run the codemod on your source files:

```shell
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/heading-text-emphasis-prop
```

Or migrate manually:

```tsx
// before
<Heading elementType="h2" emphasis="italic">
  Heading
</Heading>
<Heading elementType="h2" emphasis="semibold">
  Heading
</Heading>

// after
<Heading elementType="h2" fontWeight="regular" isItalic>
  Heading
</Heading>
<Heading elementType="h2" fontWeight="semibold">
  Heading
</Heading>
```

### PaginationButtonLink

The `PaginationButtonLink` component is deprecated. Use `PaginationLinkPrevious` / `PaginationLinkNext` for previous and next links.

#### Migration Guide

Replace `PaginationButtonLink` with `PaginationLinkPrevious` or `PaginationLinkNext`.

```tsx
// Before
<PaginationButtonLink direction="next" href="/page-2" />
<PaginationButtonLink direction="previous" href="/page-1" />

// After
<PaginationLinkNext href="/page-2" />
<PaginationLinkPrevious href="/page-1" />
```

🪄 Use a codemod to rename `PaginationButtonLink` to `PaginationLinkPrevious` / `PaginationLinkNext`:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/pagination-button-link-to-pagination-link
```

### Text

The `emphasis` prop is deprecated in its entirety and will be removed in v6. Use the `fontWeight` prop for the
`regular`, `semibold`, and `bold` font weights, and use the `isItalic` prop for italic styling.

#### Migration Guide

Run the codemod on your source files:

```shell
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/heading-text-emphasis-prop
```

Or migrate manually:

```tsx
// before
<Text emphasis="italic">Text</Text>
<Text emphasis="bold">Text</Text>

// after
<Text isItalic>Text</Text>
<Text fontWeight="bold">Text</Text>
```

[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
