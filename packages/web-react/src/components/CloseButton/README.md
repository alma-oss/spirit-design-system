# CloseButton

CloseButton is a ready-made close control built on top of [ControlButton][control-button]. It bundles the
close icon, an accessible label, and the symmetrical icon-only layout that close buttons in dialogs, drawers,
toasts, and tooltips share, so you don't have to assemble them by hand.

## When to Use CloseButton

Use **CloseButton** whenever you need a button that dismisses a surface — a modal, drawer, toast, tooltip, or any
custom dismissible container.

Need a generic icon-only control that isn't a close action? Use [ControlButton][control-button] directly.

## Basic Usage

```tsx
<CloseButton onClick={handleClose} />
```

CloseButton renders the close icon and a [VisuallyHidden][visually-hidden] label automatically. By default the
label is the localized `Close` string; override it with the `label` prop.

```tsx
<CloseButton label="Dismiss notification" onClick={handleClose} />
```

## Sizes

CloseButton forwards `size` to the underlying ControlButton and supports the same five sizes: `xsmall`, `small`,
`medium` (default), `large`, and `xlarge`.

```tsx
<CloseButton size="large" onClick={handleClose} />
```

## Subtle Variant

Remove the border with `isSubtle`:

```tsx
<CloseButton isSubtle onClick={handleClose} />
```

## Disabled State

```tsx
<CloseButton isDisabled onClick={handleClose} />
```

## Accessibility

CloseButton always renders a visually hidden text label so the button has an accessible name without any extra
markup. Provide a more specific label with the `label` prop when the default `Close` is not descriptive enough:

```tsx
<CloseButton label="Close dialog" onClick={handleClose} />
```

When the button controls a specific surface, forward the relevant ARIA attributes:

```tsx
<CloseButton aria-expanded={isOpen} aria-controls={dialogId} onClick={handleClose} />
```

## API

| Name            | Type                               | Default  | Required | Description                                                                                                           |
| --------------- | ---------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `isDisabled`    | `bool`                             | `false`  | ✕        | Whether the button is disabled                                                                                        |
| `isSubtle`      | `bool`                             | `false`  | ✕        | Whether the button is in subtle variant (no border)                                                                   |
| `isSymmetrical` | \[`bool` \| `Responsive<bool>`]    | `true`   | ✕        | Whether the button should be symmetrical, use object to set responsive values, e.g. `{ mobile: true, tablet: false }` |
| `label`         | `string`                           | `Close`  | ✕        | Accessible label; falls back to the localized `Close` string                                                          |
| `onClick`       | `(event: ClickEvent) => void`      | —        | ✕        | Click handler                                                                                                         |
| `ref`           | `ForwardedRef<HTMLButtonElement>`  | —        | ✕        | Button element reference                                                                                              |
| `size`          | [Size dictionary][dictionary-size] | `medium` | ✕        | Size of the button                                                                                                    |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes] and the
remaining [ControlButton][control-button] props. If you need more control over the styling of a component, you can
use [style props][readme-style-props] and [escape hatches][readme-escape-hatches].

[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[visually-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/VisuallyHidden/README.md
