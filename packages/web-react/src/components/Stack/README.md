# Stack

[Stack][stack] is a component that allows you to compose elements vertically.

Basic example usage:

```jsx
<Stack>
  <div>Block 1</div>
  <div>Block 2</div>
  <div>Block 3</div>
</Stack>
```

Advanced example usage:

```jsx
<Stack elementType="ul" hasIntermediateDividers hasStartDivider hasEndDivider>
  <li>
    <div>List item 1</div>
  </li>
  <li>
    <div>List item 1</div>
  </li>
  <li>
    <div>List item 1</div>
  </li>
</Stack>
```

## Custom Spacing

You can use the `spacing` prop to apply custom spacing between items. The prop
accepts either a spacing token (e.g. `space-100`) or an object with breakpoint keys and spacing token values.

Default spacing:

```jsx
<Stack hasSpacing>{/* Stacked content */}</Stack>
```

Custom spacing:

```jsx
<Stack spacing="space-1200">{/* Stacked content */}</Stack>
```

Custom responsive spacing:

```jsx
<Stack spacing={{ mobile: 'space-400', tablet: 'space-800' }}>{/* Stacked content */}</Stack>
```

## API

| Name                      | Type                                        | Default | Required | Description                                           |
| ------------------------- | ------------------------------------------- | ------- | -------- | ----------------------------------------------------- |
| `elementType`             | `ElementType`                               | `div`   | ✕        | Element type of the wrapper element                   |
| `hasEndDivider`           | `bool`                                      | `false` | ✕        | Render a divider after the last item                  |
| `hasIntermediateDividers` | `bool`                                      | `false` | ✕        | Render dividers between items                         |
| `hasSpacing`              | `bool`                                      | `false` | ✕        | Apply default spacing between items                   |
| `hasStartDivider`         | `bool`                                      | `false` | ✕        | Render a divider before the first item                |
| `spacing`                 | \[`SpaceToken` \| `Responsive<SpaceToken>`] | —       | ✕        | Apply [custom spacing](#custom-spacing) between items |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Stack Item

`StackItem` is required when using dividers between items.
It is a wrapper component that should be used inside the `Stack` component.

Basic example usage:

```jsx
<Stack hasIntermediateDividers>
  <StackItem>Stack Item 1</StackItem>
  <StackItem>Stack Item 2</StackItem>
  <StackItem>Stack Item 3</StackItem>
</Stack>
```

Advanced example usage:

```jsx
<Stack elementType="ul" hasSpacing hasIntermediateDividers hasStartDivider hasEndDivider>
  <StackItem elementType="li">Stack Item 1</StackItem>
  <StackItem elementType="li">Stack Item 2</StackItem>
  <StackItem elementType="li">Stack Item 3</StackItem>
</Stack>
```

### API

| Name          | Type          | Default | Required | Description                      |
| ------------- | ------------- | ------- | -------- | -------------------------------- |
| `elementType` | `ElementType` | `div`   | ✕        | Element type of the item element |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[stack]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Stack
