# UNSTABLE_Table

The `UNSTABLE_Table` component provides a styled table element for displaying tabular data.

> This component is UNSTABLE. It may significantly change at any time without notice.

## Usage

```html
<table class="UNSTABLE_Table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
  </tbody>
</table>
```

## Modifiers

The component supports the following modifiers:

### Striped Table

Add alternating background colors to table rows for better readability:

```html
<table class="UNSTABLE_Table UNSTABLE_Table--striped">
  <!-- table content -->
</table>
```

### Bordered Table

Add borders to all cells:

```html
<table class="UNSTABLE_Table UNSTABLE_Table--bordered">
  <!-- table content -->
</table>
```

### Compact Table

Reduce padding for a more compact appearance:

```html
<table class="UNSTABLE_Table UNSTABLE_Table--compact">
  <!-- table content -->
</table>
```

### Hoverable Table

Add hover effect to table rows:

```html
<table class="UNSTABLE_Table UNSTABLE_Table--hoverable">
  <!-- table content -->
</table>
```

### Responsive Table

Make the table scrollable on small screens:

```html
<table class="UNSTABLE_Table UNSTABLE_Table--responsive">
  <!-- table content -->
</table>
```

## Combining Modifiers

You can combine multiple modifiers:

```html
<table class="UNSTABLE_Table UNSTABLE_Table--striped UNSTABLE_Table--bordered UNSTABLE_Table--hoverable">
  <!-- table content -->
</table>
```

## Accessibility

- Use `<th>` elements for header cells with `scope` attribute when appropriate
- Provide a `<caption>` element or `aria-label` for table description
- Ensure adequate color contrast for text and backgrounds
- Use semantic HTML structure for screen readers
