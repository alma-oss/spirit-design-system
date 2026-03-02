# Item

The Item component is used to display a single item in a list. It can be used in Dropdown or similar.

To use Item with checkbox or radio please use components [Checkbox][checkbox] or [Radio][radio]
with `isItem` property. We do this to avoid repeating the same code and to simplify the API.

Simple Item example:

```tsx
<Item label="Item" />
```

Item with icon example:

```tsx
<Item label="Item" iconName="search" />
```

Item in selected state example (with icon only by default):

```tsx
<Item label="Item" isSelected />
```

Item in selected state with background only:

```tsx
<Item label="Item" isSelected selectionDecorator="background" />
```

Item in selected state with both background and icon:

```tsx
<Item label="Item" isSelected selectionDecorator="both" />
```

Item with Helper text example:

```tsx
<Item label="Item" helperText="Helper text" />
```

Item in disabled state example:

```tsx
<Item label="Item" isDisabled />
```

Item with icon and helper text in selected state example:

```tsx
<Item label="Item" iconName="search" helperText="Helper text" isSelected />
```

Item as a link example:

```tsx
<Item label="Item" elementType="a" href="#" />
```

Radio as Item:

```tsx
<Radio id="radio-item" name="example" label="Radio Label" isItem />
```

Checkbox as Item:

```tsx
<Checkbox id="checkbox-item" name="example" label="Checkbox Label" isItem />
```

Usage in [Dropdown][dropdown] component:

```tsx
const [isOpen, setIsOpen] = React.useState(false);
const onToggle = () => setIsOpen(!isOpen);

<Dropdown id="dropdown-example" isOpen={isOpen} onToggle={onToggle}>
  <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
  <DropdownPopover>
    <Item elementType="a" href="#" label="Item label" />
  </DropdownPopover>
</Dropdown>;
```

## API

| Name                 | Type                                   | Default  | Required | Description                     |
| -------------------- | -------------------------------------- | -------- | -------- | ------------------------------- |
| `elementType`        | `ElementType`                          | `button` | ✕        | Type of element used as wrapper |
| `helperText`         | `string`                               | —        | ✕        | Custom helper text              |
| `iconName`           | `string`                               | —        | ✕        | Icon used in item               |
| `isDisabled`         | `bool`                                 | `false`  | ✕        | Whether is the item disabled    |
| `isSelected`         | `bool`                                 | `false`  | ✕        | Whether is the item selected    |
| `label`              | \[`string` \| `ReactNode`]             | —        | ✓        | Label of the item               |
| `selectionDecorator` | `'icon'` \| `'background'` \| `'both'` | `icon`   | ✕        | Selection state decorator       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown
[radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Radio/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
