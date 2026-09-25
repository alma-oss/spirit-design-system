# ContextualHelp

ContextualHelp shows extra information about a nearby field or control. It renders a quiet icon-only
[ControlButton][control-button] that opens an uncontrolled [Tooltip][tooltip].

## Basic Usage

```tsx
import { ContextualHelp } from '@alma-oss/spirit-web-react';

<ContextualHelp>Choose all languages you can use at work.</ContextualHelp>;
```

The trigger uses the `info` icon and the i18n `common.contextualHelp` accessible name (`More information`) by
default. Use `label` for a more specific accessible name and `iconProps` to configure the icon:

```tsx
<ContextualHelp iconProps={{ name: 'help', boxSize: 20 }} label="More information about Languages">
  Choose all languages you can use at work.
</ContextualHelp>
```

## Placement and Dismissible Tooltip

```tsx
<ContextualHelp placement="top" isDismissible>
  Adjust how transparent this layer is.
</ContextualHelp>
```

Placement defaults to `top`. The tooltip opens on click, hover, and focus.

## Size

`size` configures the trigger ControlButton and defaults to `small`.

```tsx
<ContextualHelp size="medium">More information</ContextualHelp>
```

## With Form Fields

Pass a `ContextualHelp` element to [UNSTABLE_Combobox][combobox] or [UNSTABLE_Picker][picker] via `contextualHelp`.
The field provides the tooltip `id` through context. When the field is disabled, the trigger inherits `isDisabled`.

Prefer visible [HelperText][helper-text] whenever the information can be shown persistently. Hidden contextual help can
be overlooked, so use ContextualHelp only when HelperText is not suitable.

```tsx
<UNSTABLE_UncontrolledCombobox
  id="languages"
  label="Languages"
  contextualHelp={
    <ContextualHelp label="More information about Languages" placement="right">
      Choose all languages you can use.
    </ContextualHelp>
  }
>
  {/* options */}
</UNSTABLE_UncontrolledCombobox>
```

Standalone usage (no field) generates an `id` automatically.

## Accessibility

The trigger is a real button with a [VisuallyHidden][visually-hidden] name. Keyboard users can open the tooltip with
focus as well as click.

## API

| Name            | Type                                         | Default                      | Required | Description                      |
| --------------- | -------------------------------------------- | ---------------------------- | -------- | -------------------------------- |
| `children`      | `ReactNode`                                  | —                            | ✓        | Tooltip content                  |
| `iconProps`     | `SpiritIconProps`                            | `{ name: 'info' }`           | ✕        | Props passed to the trigger icon |
| `isDismissible` | `bool`                                       | `false`                      | ✕        | Shows a close button             |
| `label`         | `string`                                     | i18n `common.contextualHelp` | ✕        | Accessible trigger name          |
| `placement`     | [Placement dictionary][dictionary-placement] | `top`                        | ✕        | Tooltip placement                |
| `size`          | [Size dictionary][dictionary-size]           | `small`                      | ✕        | Trigger ControlButton size       |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

This component uses the [Icon][icon] component internally. To ensure correct rendering, please refer to the Icon
documentation for setup instructions.

[combobox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Combobox/README.md
[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/HelperText/README.md
[icon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
[picker]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tooltip/README.md
[visually-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/VisuallyHidden/README.md
