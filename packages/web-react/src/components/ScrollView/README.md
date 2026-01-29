# ScrollView

## Usage

To make scrolling and scroll overflow decorators function correctly, the parent
container's height must be limited. In our examples, we set this height
limit using inline styles for demonstration purposes only.

### Default (Vertical)

```jsx
<div style={{ height: '250px' }}>
  <ScrollView>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
      pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
      mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
    </p>
  </ScrollView>
</div>
```

### Horizontal

```jsx
<ScrollView direction="horizontal">
  <p className="py-700" style={{ whiteSpace: 'nowrap' }}>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
    natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
    pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
    vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
    mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
    Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
    feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
  </p>
</ScrollView>
```

## Overflow Decorators

The ScrollView component provides overflow decorators on its edges, showing that there is more content to scroll to.
Shadows are used by default.

You can use borders instead:

```jsx
<ScrollView overflowDecorators="borders" />
```

Or both:

```jsx
<ScrollView overflowDecorators="both" />
```

## Hiding the Scrollbar

```jsx
<ScrollView isScrollbarDisabled />
```

## ScrollView Arrows

Setting `hasArrows` to `true` adds arrow buttons at the start and end of the scrollable area.
Clicking an arrow moves the viewport by `arrowsScrollStep` value in the ScrollView's direction.

```jsx
<ScrollView hasArrows arrowsScrollStep={200}>
  {/* scrollable content */}
</ScrollView>
```

### Custom Arrow Labels

You can customize the arrow button labels using the `ariaLabelArrows` prop.
Note that these labels are not visually displayed — they are used for accessibility purposes only.
All properties (`top`, `bottom`, `start`, `end`) are optional, and you can define any combination of them.

Default labels are automatically set based on the `direction` prop:

- Horizontal: `Scroll left` and `Scroll right` (uses `start` and `end` properties)
- Vertical: `Scroll up` and `Scroll down` (uses `top` and `bottom` properties)

You can override all labels:

```jsx
<ScrollView
  hasArrows
  direction="horizontal"
  ariaLabelArrows={{
    start: 'Custom scroll left',
    end: 'Custom scroll right',
    top: 'Custom scroll up',
    bottom: 'Custom scroll down',
  }}
>
  {/* scrollable content */}
</ScrollView>
```

Or override only one label:

```jsx
<ScrollView hasArrows direction="horizontal" ariaLabelArrows={{ start: 'Custom scroll left' }}>
  {/* scrollable content */}
</ScrollView>
```

## ScrollView Props

| Name                  | Type                                                              | Default    | Required | Description                                   |
| --------------------- | ----------------------------------------------------------------- | ---------- | -------- | --------------------------------------------- |
| `ariaLabelArrows`     | `{ top?: string, bottom?: string, start?: string; end?: string }` | —          | ✕        | Custom accessibility labels for arrow buttons |
| `arrowsScrollStep`    | `number`                                                          | `300`      | ✕        | Scroll step for arrows (pixels)               |
| `children`            | `ReactNode`                                                       | —          | ✓        | ScrollView children's nodes                   |
| `direction`           | \[`horizontal` \| `vertical`]                                     | `vertical` | ✕        | Direction of the wrapper                      |
| `hasArrows`           | `bool`                                                            | `false`    | ✕        | If true, arrows are displayed                 |
| `isScrollbarDisabled` | `bool`                                                            | `false`    | ✕        | If true, the Scrollbar is disabled            |
| `overflowDecorators`  | \[`borders` \| `shadows` \| `both`]                               | `shadows`  | ✕        | ScrollView overflow decorators                |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
