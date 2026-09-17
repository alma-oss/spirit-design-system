# ContextualHelp

ContextualHelp shows extra information about a nearby field or control. It renders a quiet icon-only
[ControlButton][control-button] that opens a [Tooltip][tooltip].

## Basic Usage

```tsx
import { ContextualHelp } from '@alma-oss/spirit-web-react';

<ContextualHelp id="languages-help" label="More information about Languages">
  Choose all languages you can use at work.
</ContextualHelp>;
```

The trigger uses the `info` icon by default. Override `icon` with another name, or pass `{ name, boxSize }` to set a
custom size (otherwise the icon inherits ControlButton's per-size dimensions):

```tsx
<ContextualHelp id="segment-help" icon="help" label="What is a segment?">
  Segments identify who your visitors are and where they navigated from.
</ContextualHelp>

<ContextualHelp id="languages-help" icon={{ name: 'info', boxSize: 20 }} label="More information about Languages">
  Choose all languages you can use at work.
</ContextualHelp>
```

## Placement and Other Tooltip Props

ContextualHelp forwards [Tooltip][tooltip] props such as `placement`, `trigger`, `isDismissible`, and flipping
behavior. Placement defaults to `top`; the trigger defaults to click, hover, and focus.

```tsx
<ContextualHelp id="opacity-help" placement="top" isDismissible label="More information about opacity">
  Adjust how transparent this layer is.
</ContextualHelp>
```

## Size

`size` is applied to the trigger [ControlButton][control-button] (`small` by default).

```tsx
<ContextualHelp id="help-medium" size="medium" label="More information">
  More information
</ContextualHelp>
```

## With Form Fields

Pass a `ContextualHelp` element (or other content) to [UNSTABLE_Combobox][combobox] or
[UNSTABLE_Picker][picker] via `contextualHelp`. You own the tooltip `id` and `label`.

```tsx
<UNSTABLE_UncontrolledCombobox
  id="languages"
  label="Languages"
  contextualHelp={
    <ContextualHelp id="languages-help" placement="right" label="More information about Languages">
      Choose all languages you can use.
    </ContextualHelp>
  }
>
  {/* options */}
</UNSTABLE_UncontrolledCombobox>
```

## Accessibility

The trigger is a real button with a [VisuallyHidden][visually-hidden] name. Pass `label` in product and preview usage.
i18n `common.contextualHelp` (`More information`) is only the fallback. Keyboard users can open the tooltip with focus
as well as click.

## API

| Name            | Type                                                            | Default                       | Required | Description                                                |
| --------------- | --------------------------------------------------------------- | ----------------------------- | -------- | ---------------------------------------------------------- |
| `children`      | `ReactNode`                                                     | —                             | ✓        | Tooltip content                                            |
| `icon`          | `string` \| `{ name?: string, boxSize?: number \| Responsive }` | `'info'`                      | ✕        | Trigger icon name, or `{ name, boxSize }` to override size |
| `id`            | `string`                                                        | —                             | ✓        | Tooltip id                                                 |
| `isDismissible` | `bool`                                                          | `false`                       | ✕        | Shows a close button in the tooltip                        |
| `isOpen`        | `bool`                                                          | —                             | ✕        | Controlled open state                                      |
| `label`         | `string`                                                        | i18n `common.contextualHelp`  | ✕        | Accessible name for the trigger                            |
| `onToggle`      | `(isOpen: boolean) => void`                                     | —                             | ✕        | Called when open state changes; omit for uncontrolled      |
| `placement`     | [Placement dictionary][dictionary-placement]                    | `top`                         | ✕        | Tooltip placement                                          |
| `size`          | [Size dictionary][dictionary-size]                              | `small`                       | ✕        | Trigger button size                                        |
| `trigger`       | `('click' \| 'hover' \| 'focus' \| 'manual')[]`                 | `['click', 'hover', 'focus']` | ✕        | How the tooltip opens                                      |

On top of the API options, the component accepts remaining [Tooltip][tooltip] props, [additional attributes][readme-additional-attributes],
[style props][readme-style-props], and [escape hatches][readme-escape-hatches].

This component uses the [Icon][icon] component internally. To ensure correct rendering, please refer to the Icon
documentation for setup instructions.

[combobox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Combobox/README.md
[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[icon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
[picker]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tooltip/README.md
[visually-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/VisuallyHidden/README.md
