# UNSTABLE SplitTag

`UNSTABLE_SplitTag` visually joins multiple related `Tag` segments into one compact control.

> This component is UNSTABLE. It may significantly change at any time without notice.

The component works with Spirit `Tag` segments and Spirit overlay components whose trigger renders as `Tag`.
Wrapper-level `color`, `size`, `isSubtle`, and `isDisabled` props are provided to nested Tags as defaults.
Direct props on a nested `Tag` override those defaults.

```tsx
import {
  ControlButton,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  Icon,
  Item,
  Label,
  Tag,
  UNSTABLE_SplitTag,
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

Use `DropdownTrigger` with `elementType={Tag}` to render the trigger as a button-like Tag segment.

```tsx
const [selectedRadius, setSelectedRadius] = React.useState('+5 km');
const [isOpen, setIsOpen] = React.useState(false);
const radiusOptions = ['+5 km', '+10 km', '+20 km', '+50 km'];

<UNSTABLE_SplitTag color="neutral" role="group" aria-label={`Prague distance filter, radius ${selectedRadius}`}>
  <Tag>Prague</Tag>
  <Dropdown id="split-tag-radius" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} placement="bottom-start">
    <DropdownTrigger elementType={Tag}>
      {selectedRadius}
      <Icon name="chevron-down" />
    </DropdownTrigger>
    <DropdownPopover>
      {radiusOptions.map((radiusOption) => (
        <Item
          key={radiusOption}
          elementType="button"
          isSelected={selectedRadius === radiusOption}
          onClick={() => setSelectedRadius(radiusOption)}
          type="button"
        >
          <Label>{radiusOption}</Label>
        </Item>
      ))}
    </DropdownPopover>
  </Dropdown>
</UNSTABLE_SplitTag>;
```

## With ControlButton

Use a non-interactive `Tag` shell when the remove action lives on a nested `ControlButton`.

```tsx
<UNSTABLE_SplitTag color="neutral" role="group" aria-label="Prague distance filter">
  <Tag>Prague</Tag>
  <Tag>
    <ControlButton aria-label="Remove Prague distance filter" onClick={onRemove} size="xsmall" isSymmetrical>
      <Icon name="close" />
    </ControlButton>
  </Tag>
</UNSTABLE_SplitTag>
```

Alternatively, use `Tag` as the interactive element and render the nested `ControlButton` as a presentational
`span` to avoid nested interactive controls.

```tsx
<UNSTABLE_SplitTag color="neutral" role="group" aria-label="Prague distance filter">
  <Tag>Prague</Tag>
  <Tag elementType="button" aria-label="Remove Prague distance filter" onClick={onRemove}>
    <ControlButton elementType="span" aria-hidden="true" size="xsmall" isSymmetrical>
      <Icon name="close" />
    </ControlButton>
  </Tag>
</UNSTABLE_SplitTag>
```

### ControlButton Size Mapping

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

For removable segments, provide a specific accessible label and click handler on the interactive element.
When the action lives on `ControlButton`, put `aria-label` and `onClick` on the button. When the action lives on
`Tag`, keep the nested `ControlButton` presentational with `elementType="span"` and `aria-hidden="true"`.

## Disabled State

The `isDisabled` prop disables nested Tag and ControlButton interactions by default. Direct props on nested
components can override this default when a specific segment must remain interactive.

```tsx
<UNSTABLE_SplitTag isDisabled>
  <Tag>Prague</Tag>
  <Tag elementType="button">+5 km</Tag>
  <Tag>
    <ControlButton aria-label="Remove Prague distance filter" size="xsmall" isSymmetrical>
      <Icon name="close" />
    </ControlButton>
  </Tag>
</UNSTABLE_SplitTag>
```

## API

| Name         | Type                                                                     | Default   | Required | Description                                |
| ------------ | ------------------------------------------------------------------------ | --------- | -------- | ------------------------------------------ |
| `children`   | `ReactNode`                                                              | —         | ✓        | SplitTag segments                          |
| `color`      | \[[EmotionColorType][readme-generated-types] \| `neutral` \| `selected`] | `neutral` | ✕        | Default color for nested Tag segments      |
| `isDisabled` | `bool`                                                                   | `false`   | ✕        | Default disabled state for nested controls |
| `isSubtle`   | `bool`                                                                   | `false`   | ✕        | Default subtle variant for nested Tags     |
| `size`       | [Size Extended dictionary][dictionary-size]                              | `medium`  | ✕        | Default size for nested Tag segments       |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size-extended
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
