# CharacterCounter

Renders the visible character count for a textarea (e.g. `5/200` or `5`) and a debounced, polite screen reader message. It is used by [TextArea][readme-text-area] (through **TextFieldBase**) when `hasCounter` or `counterThreshold` is set. You can also use it directly if you wire `currentLength`, ARIA registration, and the live region `id` yourself.

## Usage

```tsx
import { CharacterCounter } from '@alma-oss/spirit-web-react';
```

Example aligned with field helpers (visible count + describedby registration):

```tsx
import { CharacterCounter, useAriaIds } from '@alma-oss/spirit-web-react';

const [, registerAria] = useAriaIds();

return (
  <CharacterCounter id="my-text-area" registerAria={registerAria} counterThreshold={200} currentLength={value.length} />
);
```

With count only (no max in the visible label), reuse the same `registerAria` as in the previous example:

```tsx
<CharacterCounter id="my-text-area" registerAria={registerAria} hasCounter currentLength={value.length} />
```

With disabled state:

```tsx
<CharacterCounter id="my-text-area" registerAria={registerAria} isDisabled currentLength={value.length} />
```

With validation state:

```tsx
<CharacterCounter id="my-text-area" registerAria={registerAria} validationState="danger" currentLength={value.length} />
```

### API

| Name               | Type                                                  | Default | Required | Description                                                                                                        |
| ------------------ | ----------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `counterThreshold` | `number`                                              | —       | ✕        | When set, shows `currentLength/threshold` and drives max-oriented screen reader copy.                              |
| `currentLength`    | `number`                                              | —       | ✓        | Current number of characters.                                                                                      |
| `hasCounter`       | `bool`                                                | —       | ✕        | When true, shows the count without a threshold segment.                                                            |
| `id`               | `string`                                              | —       | ✓        | Base id for the field; used to build the screen reader message element id (`${id}-counter-screen-reader-message`). |
| `isDisabled`       | `boolean`                                             | —       | ✕        | Whether the character counter is disabled.                                                                         |
| `registerAria`     | `(params: { add?: string; remove?: string }) => void` | —       | ✓        | Adds/removes the screen reader message id from `aria-describedby` (same pattern as helper/validation text).        |
| `strings`          | `CharacterCounterStrings`                             | —       | ✕        | Screen reader message overrides; see [Translations](#translations)                                                 |
| `validationState`  | `Validation`                                          | —       | ✕        | Validation state.                                                                                                  |

The component renders nothing if neither `hasCounter` nor `counterThreshold` is set.

### Translations

Override screen reader messages with [`strings`][readme-component-strings]. The visible `5/200` text is not translated.
Omitted keys use the built-in English default.

| Key                                  | Default key                                 | English default                              | Description                         |
| ------------------------------------ | ------------------------------------------- | -------------------------------------------- | ----------------------------------- |
| `ariaLabel.canEnterUpTo`             | `textArea.counter.canEnterUpTo`             | `You can enter up to {maxLength} characters` | At the limit                        |
| `ariaLabel.character.overLimit`      | `textArea.counter.characterOverLimit`       | `{count} character over limit`               | One character over                  |
| `ariaLabel.character.remaining`      | `textArea.counter.characterRemaining`       | `{count} character remaining`                | One character remaining             |
| `ariaLabel.characters.entered`       | `textArea.counter.charactersEntered`        | `{count} characters entered`                 | Count only (no threshold)           |
| `ariaLabel.characters.overLimit`     | `textArea.counter.charactersOverLimit`      | `{count} characters over limit`              | Several characters over             |
| `ariaLabel.characters.remaining`     | `textArea.counter.charactersRemaining`      | `{count} characters remaining`               | Several characters remaining        |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches]. For controlling inherited and shared props from ancestors, use
[context props][readme-props-context] mechanisms.

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-component-strings]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#component-strings
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-props-context]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#shared-and-inherited-props
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-text-area]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/TextArea/README.md
