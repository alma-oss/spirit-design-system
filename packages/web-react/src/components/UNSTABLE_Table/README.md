# UNSTABLE_Table

The `UNSTABLE_Table` component provides a styled table element for displaying tabular data in React applications.

> This component is UNSTABLE. It may significantly change at any time without notice.

## Basic Usage

```jsx
import { UNSTABLE_Table } from '@lmc-eu/spirit-web-react';

<UNSTABLE_Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john.doe@example.com</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>jane.smith@example.com</td>
      <td>Designer</td>
    </tr>
  </tbody>
</UNSTABLE_Table>;
```

## Props

| Name           | Type      | Default | Description                                     |
| -------------- | --------- | ------- | ----------------------------------------------- |
| `isStriped`    | `boolean` | `false` | Add alternating background colors to table rows |
| `isBordered`   | `boolean` | `false` | Add borders to all cells                        |
| `isCompact`    | `boolean` | `false` | Reduce padding for a more compact appearance    |
| `isHoverable`  | `boolean` | `false` | Add hover effect to table rows                  |
| `isResponsive` | `boolean` | `false` | Make the table scrollable on small screens      |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Striped Table

Use `isStriped` to add alternating background colors to table rows for better readability:

```jsx
<UNSTABLE_Table isStriped>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>$10.00</td>
    </tr>
    <tr>
      <td>Widget B</td>
      <td>$15.00</td>
    </tr>
  </tbody>
</UNSTABLE_Table>
```

## Bordered Table

Use `isBordered` to add borders to all cells:

```jsx
<UNSTABLE_Table isBordered>{/* table content */}</UNSTABLE_Table>
```

## Compact Table

Use `isCompact` to reduce padding for a more compact appearance:

```jsx
<UNSTABLE_Table isCompact>{/* table content */}</UNSTABLE_Table>
```

## Hoverable Table

Use `isHoverable` to add a hover effect to table rows:

```jsx
<UNSTABLE_Table isHoverable>{/* table content */}</UNSTABLE_Table>
```

## Responsive Table

Use `isResponsive` to make the table scrollable on small screens:

```jsx
<UNSTABLE_Table isResponsive>{/* table content */}</UNSTABLE_Table>
```

## Combining Modifiers

You can combine multiple modifiers for enhanced functionality:

```jsx
<UNSTABLE_Table isStriped isBordered isHoverable>
  {/* table content */}
</UNSTABLE_Table>
```

## Accessibility

- Use `<th>` elements for header cells
- Add `scope` attribute to `<th>` elements (`scope="col"` for column headers, `scope="row"` for row headers)
- Provide a `<caption>` element or `aria-label` for table description
- Ensure adequate color contrast for text and backgrounds
- Use semantic HTML structure for screen readers

## Example with Accessibility

```jsx
<UNSTABLE_Table>
  <caption>Employee directory</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">John Doe</th>
      <td>john.doe@example.com</td>
      <td>Developer</td>
    </tr>
  </tbody>
</UNSTABLE_Table>
```

[readme-additional-attributes]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/README.md#style-props
