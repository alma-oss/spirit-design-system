# Navigation

The `Navigation` component is a container for the navigation actions of the application.

It consists of these parts:

- [Navigation](#navigation)
  - [NavigationItem](#navigation-item)
    - [NavigationAction](#navigation-action)
    - [NavigationAvatar](#navigation-avatar)

## Navigation

The `Navigation` is a `nav` wrapper for navigation items.

The `Navigation` component can be horizontal or vertical. Use `direction` prop to set the orientation. Default direction is `horizontal`.

```tsx
<Navigation aria-label="Main Navigation">{/* Navigation items go here */}</Navigation>;
<Navigation aria-label="Main Navigation" direction="vertical">
  {/* Navigation items go here */}
</Navigation>;
```

It centres its children vertically, and if the children do not include `NavigationAction` components,
it will apply a gap between them.

ℹ️ Don't forget to add the `aria-label` attribute to the `Navigation` component for correct accessible title.

### API

| Name        | Type                                                                                       | Default      | Required | Description                   |
| ----------- | ------------------------------------------------------------------------------------------ | ------------ | -------- | ----------------------------- |
| `children`  | \[`ReactElement<HTMLLIElement>` \| `ReactElement<NavigationItem>` \| Array of these types] | `null`       | ✓        | Content of the Navigation     |
| `direction` | [Direction dictionary][dictionary-direction]                                               | `horizontal` | ✕        | Orientation of the Navigation |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Navigation Item

The `NavigationItem` is a container for navigation actions.

```tsx
<NavigationItem>{/* Navigation actions go here */}</NavigationItem>
```

### Navigation Item Alignment

Use `alignmentY` prop to center or stretch the content. If there is a `NavigationAction` inside, it overrides the prop and
stretches its content vertically.

```tsx
<NavigationItem>{/* Vertically centered items */}</NavigationItem>
<NavigationItem alignmentY="stretch">{/* Vertically stretched items */}</NavigationItem>
<NavigationItem>
  <NavigationAction>{/* Vertically stretched Action */}</NavigationAction>
</NavigationItem>
```

### API

| Name         | Type                       | Default  | Required | Description                        |
| ------------ | -------------------------- | -------- | -------- | ---------------------------------- |
| `alignmentY` | \[`center` \| `stretch`]   | `center` | ✕        | Vertical alignment of the children |
| `children`   | \[`string` \| `ReactNode`] | `null`   | ✓        | Content of the NavigationItem      |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Navigation Action

The `NavigationAction` is a component that is styled to be used as a navigation action.

It has to be either `box` or `pill` variant. Default variant is `box`.

```tsx
<NavigationAction href="#">Link</NavigationAction>
<NavigationAction href="#" variant="pill">
  Link
</NavigationAction>;
```

It can obtain `isSelected` or `isDisabled` states by adding the respective props.

```tsx
<NavigationAction href="#" aria-current="page" isSelected>Selected Link</NavigationAction>
<NavigationAction href="#" isDisabled>Disabled Link</NavigationAction>
```

ℹ️ Don't forget to add the `aria-current="page"` attribute for correct accessible state if selected.

ℹ️ Please note that in the `isDisabled` state the `NavigationAction` will be a `span` tag.

If the `NavigationAction` is inside a [`UNSTABLE_Header`][web-react-unstable-header] component, it will
inherit the height of the `Header`.

### API

| Name          | Type                                           | Default | Required | Description                     |
| ------------- | ---------------------------------------------- | ------- | -------- | ------------------------------- |
| `children`    | \[`string` \| `ReactNode`]                     | `null`  | ✓        | Content of the NavigationAction |
| `elementType` | `ElementType`                                  | `a`     | ✕        | Type of element used as         |
| `href`        | `string`                                       | -       | ✕        | URL of the link                 |
| `isDisabled`  | `bool`                                         | `false` | ✕        | Whether the action is disabled  |
| `isSelected`  | `bool`                                         | `false` | ✕        | Whether the action is selected  |
| `ref`         | `ForwardedRef<HTMLAnchorElement>`              | —       | ✕        | Anchor element reference        |
| `target`      | `string`                                       | `null`  | ✕        | Link target                     |
| `variant`     | [Shape Variant Dictionary][dictionary-variant] | `box`   | ✕        | Variant of the NavigationAction |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Navigation Avatar

The `NavigationAvatar` is a component that is styled to be used as a navigation action with an avatar.

```tsx
<NavigationAvatar avatarContent={<Icon name="profile" boxSize={20} />} aria-label="Profile of Jiří Bárta">
  <Text elementType="span" size="small" emphasis="semibold">
    My Account
  </Text>
</NavigationAvatar>
```

If you want the avatar to be square, don't forget to add the `isSquare` prop to the `NavigationAvatar` component.

```tsx
<NavigationAvatar avatarContent={<Icon name="profile" boxSize={20} />} isSquare aria-label="Profile of Jiří Bárta">
  <Text elementType="span" size="small" emphasis="semibold">
    My Account
  </Text>
</NavigationAvatar>
```

ℹ️ The `NavigationAvatar` can be used with different element types (`a`, `button`, `div`, `span`, etc.). Hover and active states only apply to clickable/interactive elements (`a`, `button`, elements with `href` attribute, or elements with `role="button"` or `role="link"`). When using non-interactive elements like `div` or `span`, hover styles will not be applied.

### Avatar Size

The avatar inside `NavigationAvatar` can have different sizes. Use the `avatarSize` prop to change its size. The default size is `small`.

Available sizes: `xsmall`, `small`, `medium`, `large`, `xlarge`.

```tsx
<NavigationAvatar
  avatarContent={<Icon name="profile" boxSize={16} />}
  avatarSize="xsmall"
  aria-label="Profile of Jiří Bárta"
>
  <Text elementType="span" size="small" emphasis="semibold">
    My Account
  </Text>
</NavigationAvatar>
```

You can also use responsive sizes with a responsive object, e.g. `avatarSize={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}`.

```tsx
<NavigationAvatar
  avatarContent={<Icon name="profile" boxSize={20} />}
  avatarSize={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
  aria-label="Profile of Jiří Bárta"
>
  <Text elementType="span" size="small" emphasis="semibold">
    My Account
  </Text>
</NavigationAvatar>
```

### API

| Name            | Type                                                                                                                                | Default | Required | Description                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | -------------------------------------------------------------- |
| `avatarContent` | \[`ReactElement` \| `ReactNode`]                                                                                                    | —       | ✓        | Content of the avatar, such as an image, icon, or text         |
| `avatarSize`    | \[[Size Extended dictionary][dictionary-size] \| [Responsive][readme-generated-types]<[Size Extended dictionary][dictionary-size]>] | `small` | ✕        | Size of the Avatar. Can be a single size or responsive object. |
| `children`      | \[`string` \| `ReactNode`]                                                                                                          | `null`  | ✕        | Content of the NavigationAvatar                                |
| `elementType`   | `ElementType`                                                                                                                       | `a`     | ✕        | Type of element used as                                        |
| `href`          | `string`                                                                                                                            | -       | ✕        | URL of the NavigationAvatar link                               |
| `isSquare`      | `bool`                                                                                                                              | `false` | ✕        | Whether the avatar is square                                   |
| `ref`           | `ForwardedRef<HTMLAnchorElement>`                                                                                                   | —       | ✕        | Anchor element reference                                       |
| `target`        | `string`                                                                                                                            | `null`  | ✕        | NavigationAvatar's link target                                 |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Full Example

With NavigationAction/NavigationAvatar components:

```tsx
<Navigation aria-label="Main Navigation">
  <NavigationItem>
    <NavigationAction href="#" aria-current="page" isSelected>
      Selected Link
    </NavigationAction>
  </NavigationItem>
  <NavigationItem>
    <NavigationAction href="#" isDisabled>
      Disabled Link
    </NavigationAction>
  </NavigationItem>
  <NavigationItem>
    <NavigationAction href="#">Link</NavigationAction>
  </NavigationItem>
  <NavigationItem>
    <NavigationAvatar avatarContent={<Icon name="profile" boxSize={20} />} aria-label="Profile of Jiří Bárta">
      <Text elementType="span" size="small" emphasis="semibold">
        My Account
      </Text>
    </NavigationAvatar>
  </NavigationItem>
</Navigation>
```

With Buttons:

```tsx
<Navigation aria-label="Secondary Navigation">
  <NavigationItem>
    <ButtonLink href="#">Button</ButtonLink>
  </NavigationItem>
  <NavigationItem>
    <ButtonLink href="#" color="secondary">
      Button
    </ButtonLink>
  </NavigationItem>
</Navigation>
```

[dictionary-direction]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#direction
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#variant
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-unstable-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Header/README.md
