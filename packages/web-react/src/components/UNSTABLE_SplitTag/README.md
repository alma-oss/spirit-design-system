# UNSTABLE SplitTag

`UNSTABLE_SplitTag` visually joins multiple related `Tag` segments into one compact control.

> This component is UNSTABLE. It may significantly change at any time without notice.

The component works with Spirit `Tag` segments and `Dropdown` whose `DropdownTrigger` renders as `Tag`.
Wrapper-level `color`, `size`, `isSubtle`, and `isDisabled` props are provided to nested Tags as context defaults.
The `size` and `isDisabled` defaults also reach nested ControlButtons. Direct props override context defaults.
Keep nested Tags at the uniform wrapper `size`; use the ControlButton size mapping below for nested visual controls.

```tsx
import {
  ControlButton,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  Icon,
  Item,
  Stack,
  Tag,
  UNSTABLE_SplitTag,
  useSplitTagListboxKeyboard,
  useToggle,
} from '@alma-oss/spirit-web-react';
```

## Basic Usage

```tsx
<UNSTABLE_SplitTag>
  <Tag>Prague</Tag>
  <Tag>+5 km</Tag>
</UNSTABLE_SplitTag>
```

## With Dropdown

`DropdownTrigger` requires one button-like host. Use `elementType={Tag}` so the Tag segment owns the button
semantics and interaction. The nested `ControlButton` is decorative: render it as a `span` with
`aria-hidden="true"`. This keeps one segment as one control instead of nesting one control inside another.

The following composition mirrors the live demo. It uses `useSplitTagListboxKeyboard` for roving focus,
selection, and keyboard handlers on listbox options.

```tsx
const [selectedRadius, setSelectedRadius] = React.useState('+5 km');
const [isOpen, onToggle] = useToggle(false);
const listboxRef = React.useRef<HTMLDivElement>(null);
const radiusOptions = ['+5 km', '+10 km', '+20 km', '+50 km'];
const getOptionId = React.useCallback(
  (radiusOption) => `split-tag-radius-option-${radiusOptions.indexOf(radiusOption)}`,
  [],
);

const selectRadius = (radiusOption) => {
  setSelectedRadius(radiusOption);
  onToggle();
};

const { getOptionProps } = useSplitTagListboxKeyboard({
  getOptionId,
  listboxRef,
  onSelect: selectRadius,
  optionValues: radiusOptions,
  selectedValue: selectedRadius,
});

<UNSTABLE_SplitTag color="neutral" role="group" aria-label={`Prague distance filter, radius ${selectedRadius}`}>
  <Tag>Prague</Tag>
  <Dropdown id="split-tag-radius" isOpen={isOpen} onToggle={onToggle} placement="bottom-start">
    <DropdownTrigger elementType={Tag} aria-label={`Select distance, selected ${selectedRadius}`}>
      {selectedRadius}
      <ControlButton elementType="span" aria-hidden="true" size="xsmall" isStretched isSymmetrical>
        <Icon name="chevron-down" />
      </ControlButton>
    </DropdownTrigger>
    <DropdownPopover aria-label="Distance options">
      <Stack ref={listboxRef} role="listbox" aria-label="Distance" spacing="space-300">
        {radiusOptions.map((radiusOption) => {
          const isSelected = selectedRadius === radiusOption;

          return (
            <Item
              {...getOptionProps(radiusOption)}
              key={radiusOption}
              isSelected={isSelected}
              endSlot={isSelected ? <Icon name="check-plain" boxSize={20} /> : undefined}
            >
              {radiusOption}
            </Item>
          );
        })}
      </Stack>
    </DropdownPopover>
  </Dropdown>
</UNSTABLE_SplitTag>;
```

The listbox is for plain options only and must not contain buttons, links, checkboxes, or other interactive
descendants. Keyboard: Up/Down move between options, Home/End jump to first/last, type-ahead focuses by label,
and Space/Enter selects. See the [demo keyboard helper][split-tag-listbox-keyboard-demo] for the full
implementation and [decision 013][decision-listbox-grid] for the role choice.

## With ControlButton

Use `Tag` as the single interactive remove control and render the nested `ControlButton` as a presentational
`span`. The Tag owns the accessible name, click, and keyboard behavior; the ControlButton only provides
stretched visual chrome. A static Tag with an interactive ControlButton can be valid in another composition,
but it is not the SplitTag recipe documented here.

```tsx
<UNSTABLE_SplitTag color="neutral" role="group" aria-label="Prague distance filter">
  <Tag>Prague</Tag>
  <Tag elementType="button" aria-label="Remove Prague distance filter" onClick={onRemove}>
    <ControlButton elementType="span" aria-hidden="true" size="xsmall" isStretched isSymmetrical>
      <Icon name="close" />
    </ControlButton>
  </Tag>
</UNSTABLE_SplitTag>
```

### ControlButton Size Mapping

Set a direct `size` on nested visual ControlButtons according to this mapping. The direct prop overrides the
wrapper context size.

| Tag Size | ControlButton Size |
| -------- | ------------------ |
| xsmall   | xsmall             |
| small    | xsmall             |
| medium   | xsmall             |
| large    | small              |
| xlarge   | small              |

## Accessibility

`UNSTABLE_SplitTag` does not set grouping semantics by default. When the segments represent one filter or one
logical control, add `role="group"` and provide an accessible name with `aria-label` or `aria-labelledby`.

For removable segments, put `aria-label` and `onClick` on the interactive `Tag` and keep the nested
`ControlButton` presentational with `elementType="span"` and `aria-hidden="true"`.

Keep all nested Tags at the wrapper `size`. Uniform segment sizing is a SplitTag design rule; do not set
`size` on individual nested Tags.

## Disabled State

The `isDisabled` prop disables nested Tag and ControlButton interactions by default. Direct props on nested
components can override this default when a specific segment must remain interactive.

```tsx
<UNSTABLE_SplitTag isDisabled>
  <Tag>Prague</Tag>
  <Tag>+5 km</Tag>
  <Tag elementType="button" aria-label="Remove Prague distance filter">
    <ControlButton elementType="span" aria-hidden="true" size="xsmall" isStretched isSymmetrical>
      <Icon name="close" />
    </ControlButton>
  </Tag>
</UNSTABLE_SplitTag>
```

## API

| Name         | Type                                                                     | Default   | Required | Description                                               |
| ------------ | ------------------------------------------------------------------------ | --------- | -------- | --------------------------------------------------------- |
| `children`   | `ReactNode`                                                              | —         | ✓        | SplitTag segments                                         |
| `color`      | \[[EmotionColorType][readme-generated-types] \| `neutral` \| `selected`] | `neutral` | ✕        | Default color for nested Tag segments                     |
| `isDisabled` | `bool`                                                                   | `false`   | ✕        | Default disabled state for nested Tags and ControlButtons |
| `isSubtle`   | `bool`                                                                   | `false`   | ✕        | Default subtle variant for nested Tags                    |
| `size`       | [Size Extended dictionary][dictionary-size]                              | `medium`  | ✕        | Context size for nested Tags and ControlButtons           |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[decision-listbox-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/013-listbox-vs-grid-for-selectable-options.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size-extended
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[split-tag-listbox-keyboard-demo]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_SplitTag/useSplitTagListboxKeyboard.ts
