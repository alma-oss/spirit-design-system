# EmptyState

EmptyState component should be included in the error pages or empty state pages as the carrier of information and links to elsewhere.

EmptyState component is a composition of the following components:

- [EmptyState](#emptystate)
  - [EmptyStateSection](#emptystatesection)

## EmptyState

The `EmptyState` component is a main container responsible for positioning the [EmptyStateSection](#unstable-emptystatesection) components or content.

```jsx
<EmptyState>
  <!-- EmptyStateSection components or content go here -->
</EmptyState>
```

### API

The component is based on the [Stack][stack] component and accepts all its properties. For more information, see the [Stack component API][stack-api].

## EmptyStateSection

The `EmptyStateSection` component is a container for the content of each section.

```jsx
<EmptyStateSection>
  <!-- Content goes here -->
</EmptyStateSection>
```

### API

The component is based on the [Stack][stack] component and accepts all its properties. For more information, see the [Stack component API][stack-api].

## Full Example

```jsx
<EmptyState spacing="space-900">
  <EmptyStateSection>
    <Icon name="search" isSymbol />
  </EmptyStateSection>
  <EmptyStateSection>
    <Heading elementType="h2">Heading</Heading>
    <Text>Description</Text>
  </EmptyStateSection>
  <EmptyStateSection>
    <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
      <ButtonLink href="#">Primary Action</ButtonLink>
      <ButtonLink href="#" color="secondary">
        Secondary Action
      </ButtonLink>
    </ActionGroup>
  </EmptyStateSection>
  <EmptyStateSection>
    <Link href="#">Link to something</Link>
  </EmptyStateSection>
</EmptyState>
```

[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
[stack-api]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md#api
