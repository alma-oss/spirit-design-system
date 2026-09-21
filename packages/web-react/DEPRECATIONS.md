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

The `goBackTitle` prop is deprecated and will be removed in v6. Use `strings.back` instead.

#### Migration Guide

```tsx
// Before
<Breadcrumbs goBackTitle="Back" />

// After
<Breadcrumbs strings={{
back: 'Back',
}} />
```

### CloseButton

The `label` prop is deprecated and will be removed in v6. Use `strings.closeAria` instead.

#### Migration Guide

```tsx
// Before
<CloseButton label="Close dialog" />

// After
<CloseButton strings={{
closeAria: 'Close dialog',
}} />
```

### File

The `editText` and `removeText` props are deprecated and will be removed in v6. Use `strings.editAria` and
`strings.removeAria` instead.

#### Migration Guide

```tsx
// Before
<File label="document.pdf" editText="Edit file" removeText="Remove file" />

// After
<File label="document.pdf" strings={{
editAria: 'Edit file',
removeAria: 'Remove file',
}} />
```

### FileUpload

The `buttonText`, `inputUploadText`, and `inputDragAndDropText` props are deprecated and will be removed in v6.
Use `strings.button`, `strings.upload`, and `strings.dragAndDrop` instead.

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
button: 'Browse',
upload: 'Upload your file',
dragAndDrop: 'or drag and drop here',
}}
/>
```

### ModalHeader

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.closeAria` instead.

#### Migration Guide

```tsx
// Before
<ModalHeader closeLabel="Close modal">Modal title</ModalHeader>

// After
<ModalHeader strings={{
closeAria: 'Close modal',
}}>Modal title</ModalHeader>
```

### PaginationLink

The `accessibilityLabel` prop is deprecated and will be removed in v6. Use `strings.pageAria` instead.

#### Migration Guide

```tsx
// Before
<PaginationLink accessibilityLabel="Go to page 2" pageNumber={2} />

// After
<PaginationLink strings={{
pageAria: 'Go to page 2',
}} pageNumber={2} />
```

### PaginationLinkPrevious

The `accessibilityLabel` prop is deprecated and will be removed in v6. Use `strings.previousAria` instead.

#### Migration Guide

```tsx
// Before
<PaginationLinkPrevious accessibilityLabel="Previous page" href="/page/1" />

// After
<PaginationLinkPrevious strings={{
previousAria: 'Previous page',
}} href="/page/1" />
```

### PaginationLinkNext

The `accessibilityLabel` prop is deprecated and will be removed in v6. Use `strings.nextAria` instead.

#### Migration Guide

```tsx
// Before
<PaginationLinkNext accessibilityLabel="Next page" href="/page/3" />

// After
<PaginationLinkNext strings={{
nextAria: 'Next page',
}} href="/page/3" />
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
pageAria: 'Go to page',
previousAria: 'Previous page',
nextAria: 'Next page',
}}
  totalPages={10}
/>
```

### UncontrolledSplitButton

The `buttonLabel` and `dropdownTriggerLabel` props are deprecated and will be removed in v6. Use `labelButton` and
`strings.dropdown.trigger` instead.

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
  strings={{
dropdown: {
  trigger: 'More',
},
}}
/>
```

### ToastBar

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.closeAria` instead.

#### Migration Guide

```tsx
// Before
<ToastBar id="toast-example" closeLabel="Close toast" />

// After
<ToastBar id="toast-example" strings={{
closeAria: 'Close toast',
}} />
```

### UncontrolledToast

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.closeAria` instead.

#### Migration Guide

```tsx
// Before
<UncontrolledToast closeLabel="Close toast" />

// After
<UncontrolledToast strings={{
closeAria: 'Close toast',
}} />
```

### Tooltip

The `closeLabel` prop is deprecated and will be removed in v6. Use `strings.closeAria` instead.

#### Migration Guide

```tsx
// Before
<Tooltip id="tooltip-example" closeLabel="Close tooltip" isOpen onToggle={setIsOpen} />

// After
<Tooltip
  id="tooltip-example"
  strings={{
closeAria: 'Close tooltip',
}}
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
<UNSTABLE_Picker strings={{
addAria: 'Add',
selection: {
  empty: 'Languages',
},
}} />
```

### UNSTABLE_Combobox

The flat translation props (`addMoreLabel`, `addMoreDescriptionText`, `emptySelectionLabel`, `removeAllLabel`,
`removeItemLabel`, `selectionAriaLabel`, `selectionCountLabel`, `selectionCountLabelSingular`, `tagDescriptionText`)
are deprecated and will be removed in v6. Use `strings` instead. `emptyStateLabel` and `loadingLabel` stay top-level
`ReactNode` slots and win over `strings.emptyState` and `strings.loading`. The same mapping applies to
`UNSTABLE_UncontrolledCombobox`.

#### Migration Guide

```tsx
// Before
<UNSTABLE_Combobox addMoreLabel="+ Add more…" emptySelectionLabel="Search" />

// After
<UNSTABLE_Combobox strings={{
addMore: {
  label: '+ Add more…',
},
selection: {
  empty: 'Search',
},
}} />
```

### ScrollView

The `ariaLabelControls` prop is deprecated and will be removed in v6. Use `strings.startAria`, `strings.endAria`,
`strings.topAria`, and `strings.bottomAria` instead. The same mapping applies to `ScrollViewControls`.

#### Migration Guide

```tsx
// Before
<ScrollView hasControls ariaLabelControls={{ start: 'Left', end: 'Right' }} />

// After
<ScrollView hasControls strings={{
startAria: 'Left',
endAria: 'Right',
}} />
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

### Translation Dictionary

Old `t()` and `I18nProvider` paths still resolve until v6. The list of paths is `deprecatedTranslationKeys` in `src/translations/deprecatedTranslationKeys.ts`.

Remove that deprecation in v6 by deleting these:

- `src/translations/deprecatedTranslationKeys.ts`
- `src/translations/__tests__/deprecatedTranslationKeys.test.ts`
- `migrateDeprecatedTranslations` in `src/context/I18nContext.tsx`
- `resolveTranslation` in `src/hooks/useI18n.ts` (call `resolveTranslationKey` again)

[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
