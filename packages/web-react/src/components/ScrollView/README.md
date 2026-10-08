# ScrollView

## Usage

To make scrolling and scroll overflow decorators function correctly, the parent
container's height must be limited. In our examples, we set this height
limit using inline styles for demonstration purposes only.

### Default (Vertical)

```tsx
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

```tsx
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

```tsx
<ScrollView overflowDecorators="borders" />
```

Or both:

```tsx
<ScrollView overflowDecorators="both" />
```

## Hiding the Scrollbar

```tsx
<ScrollView isScrollbarDisabled />
```

## ScrollView Controls

Setting `hasControls` to `true` adds scroll control buttons at the start and end of the scrollable area.
Clicking a control moves the viewport by `controlsScrollStep` value in the ScrollView's direction.

```tsx
<ScrollView hasControls controlsScrollStep={200}>
  {/* scrollable content */}
</ScrollView>
```

### Custom Control Labels

You can customize the control button labels using the `strings` prop.
Note that these labels are not visually displayed — they are used for accessibility purposes only.
All properties (`ariaLabel.top`, `ariaLabel.bottom`, `ariaLabel.start`, `ariaLabel.end`) are optional, and you can define any combination of them.

Default labels are automatically set based on the `direction` prop:

- Horizontal: `Scroll left` and `Scroll right` (uses `ariaLabel.start` and `ariaLabel.end`)
- Vertical: `Scroll up` and `Scroll down` (uses `ariaLabel.top` and `ariaLabel.bottom`)

You can override all labels:

```tsx
<ScrollView
  hasControls
  direction="horizontal"
  strings={{
    ariaLabel: {
      start: 'Custom scroll left',
      end: 'Custom scroll right',
      top: 'Custom scroll up',
      bottom: 'Custom scroll down',
    },
  }}
>
  {/* scrollable content */}
</ScrollView>
```

Or override only one label:

```tsx
<ScrollView hasControls direction="horizontal" strings={{ ariaLabel: { start: 'Custom scroll left' } }}>
  {/* scrollable content */}
</ScrollView>
```

## ScrollView Props

| Name                  | Type                                                              | Default    | Required | Description                                                            |
| --------------------- | ----------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------- |
| `strings`             | `{ ariaLabel?: { start?, end?, top?, bottom? } }`                 | —          | ✕        | Control button labels; see [Translations](#translations)               |
| `ariaLabelControls`   | `{ top?: string, bottom?: string, start?: string; end?: string }` | —          | ✕        | _Deprecated, use `strings.ariaLabel.start` / `end` / `top` / `bottom`_ |
| `controlsScrollStep`  | `number`                                                          | `300`      | ✕        | Scroll step for controls (pixels)                                      |
| `children`            | `ReactNode`                                                       | —          | ✓        | ScrollView children's nodes                                            |
| `direction`           | \[`horizontal` \| `vertical`]                                     | `vertical` | ✕        | Direction of the wrapper                                               |
| `hasControls`         | `bool`                                                            | `false`    | ✕        | If true, controls are displayed                                        |
| `isScrollbarDisabled` | `bool`                                                            | `false`    | ✕        | If true, the Scrollbar is disabled                                     |
| `overflowDecorators`  | \[`borders` \| `shadows` \| `both`]                               | `shadows`  | ✕        | ScrollView overflow decorators                                         |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Translations

Override optional copy with [`strings`][readme-component-strings]. Omitted keys use the built-in English default.

| Key                | Default key             | English default | Description              |
| ------------------ | ----------------------- | --------------- | ------------------------ |
| `ariaLabel.start`  | `scrollView.ariaStart`  | `Scroll left`   | Horizontal start control |
| `ariaLabel.end`    | `scrollView.ariaEnd`    | `Scroll right`  | Horizontal end control   |
| `ariaLabel.top`    | `scrollView.ariaTop`    | `Scroll up`     | Vertical start control   |
| `ariaLabel.bottom` | `scrollView.ariaBottom` | `Scroll down`   | Vertical end control     |

### Deprecation Notice

`ariaLabelControls` is deprecated and will be removed in v6. Use `strings.ariaLabel.start` / `end` / `top` /
`bottom` instead.

### Migration Guide

```diff
- <ScrollView hasControls ariaLabelControls={{ start: 'Left', end: 'Right' }} />
+ <ScrollView hasControls strings={{ ariaLabel: { start: 'Left', end: 'Right' } }} />
```

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-component-strings]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#component-strings
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
