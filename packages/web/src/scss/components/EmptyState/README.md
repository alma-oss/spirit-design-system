# EmptyState

EmptyState component should be included at the error pages or empty state pages as the carrier of an information and links to elsewhere.

EmptyState component is a composition of the following components:

- [EmptyState](#unstable-emptystate)
- [EmptyStateSection](#unstable-emptystatesection)

## Component Composition

### EmptyState

The `EmptyState` component is a main container responsible for positioning the [EmptyStateSection](#unstable-emptystatesection) components or content.

```html
<div class="Stack Stack--hasSpacing EmptyState" style="--stack-spacing: var(--spirit-space-700);">
  <!-- EmptyStateSection components or content go here -->
</div>
```

This component is based on the [Stack][stack] component and accepts all its variants. For more information about `Stack` usage options, see the [Stack documentation][stack].

### EmptyStateSection

The `EmptyStateSection` component is a container for the content of each section.

```html
<div class="Stack EmptyState__section">
  <!-- EmptyStateSection content go here -->
</div>
```

This component is based on the [Stack][stack] component and accepts all its variants. For more information about `Stack` usage options, see the [Stack documentation][stack].

### Full Example

```html
<div class="Stack Stack--hasSpacing EmptyState" style="--stack-spacing: var(--spirit-space-700);">
  <div class="Stack EmptyState__section">Placeholder</div>
  <div class="Stack Stack--hasSpacing EmptyState__section" style="--stack-spacing: var(--spirit-space-500);">
    <h2 class="typography-heading-xsmall-bold">Headline</h2>
    <p color="secondary" class="typography-body-medium-text-regular">Description</p>
  </div>
  <div class="Stack EmptyState__section">
    <div
      class="Flex Flex--noWrap Flex--alignmentXStretch Flex--tablet--alignmentXCenter Flex--alignmentYStretch Flex--vertical Flex--tablet--horizontalReversed"
    >
      <a href="#" role="button" class="Button Button--primary Button--medium">Action</a>
      <a href="#" role="button" class="Button Button--secondary Button--medium">Action</a>
    </div>
  </div>
  <div class="Stack EmptyState__section"><a href="#" class="link-primary">Link to something</a></div>
</div>
```

[stack]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Stack/README.md
