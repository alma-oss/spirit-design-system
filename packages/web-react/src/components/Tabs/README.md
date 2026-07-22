# Tabs

The Tab component is used to organize related content. User can navigate between
groups of information in tabbable regions.

## Tab

```tsx
const [selectedId, setSelectedTab] = useState(1);

const selectTab = useCallback((id) => {
  setSelectedTab(id);
}, []);

<Tabs selectedTab={selectedId} toggle={selectTab}>
  <TabList>
    <TabItem forTabPane={1}>Item Selected</TabItem>
    <TabItem forTabPane={2}>Item</TabItem>
  </TabList>
  <TabContent>
    <TabPane id={1}>Pane 1</TabPane>
    <TabPane id={2}>Pane 2</TabPane>
  </TabContent>
</Tabs>;
```

## Tab with Links

⚠️ Please note that mixing links with buttons in tab list is not recommended for accessibility reasons.

```tsx
const [selectedId, setSelectedTab] = useState(1);

const selectTab = useCallback((id) => {
  setSelectedTab(id);
}, []);

<Tabs selectedTab={selectedId} toggle={selectTab}>
  <TabList>
    <TabItem forTabPane={1}>Item Selected</TabItem>
    <TabItem forTabPane={2}>Item</TabItem>
    <TabLink href="https://www.example.com">Item Link</TabLink>
    <TabLink href="https://www.example.com">Item Link Only Desktop</TabLink>
  </TabList>
  <TabContent>
    <TabPane id={1}>Pane 1</TabPane>
    <TabPane id={2}>Pane 2</TabPane>
  </TabContent>
</Tabs>;
```

## Uncontrolled Tabs

```tsx
<UncontrolledTabs defaultSelectedTab={1}>
  <TabList>
    <TabItem forTabPane={1}>Item Selected</TabItem>
    <TabItem forTabPane={2}>Item</TabItem>
  </TabList>
  <TabContent>
    <TabPane id={1}>Pane 1</TabPane>
    <TabPane id={2}>Pane 2</TabPane>
  </TabContent>
</UncontrolledTabs>
```

## Custom Spacing

You can use the `spacing` prop to apply custom spacing between items. The prop
accepts either a spacing token (e.g. `space-100`) or an object with [breakpoint][dictionary-breakpoint] keys and spacing token values.

Default spacing:

```tsx
<Tabs spacing="space-1200">{/* Tabs content */}</Tabs>
```

Custom responsive spacing:

```tsx
<Tabs spacing={{ mobile: 'space-400', tablet: 'space-800' }}>{/* Tabs content */}</Tabs>
```

### Tabs

#### API

| Name                | Type                                             | Default | Required | Description                                           |
| ------------------- | ------------------------------------------------ | ------- | -------- | ----------------------------------------------------- |
| `selectedTab`       | \[`string` \| `number`]                          | —       | ✓        | Identification of the selected tab                    |
| `toggle`            | `Function`                                       | —       | ✓        | Toggle function which accept tab ID as input          |
| `children`          | `any`                                            | —       | ✕        | Child component                                       |
| `onSelectionChange` | `(previousId: TabId, currentId?: TabId) => void` | —       | ✕        | When the state of the selected panel changes          |
| `spacing`           | \[`SpaceToken` \| `Responsive<SpaceToken>`]      | —       | ✕        | Apply [custom spacing](#custom-spacing) between items |

### UncontrolledTabs

#### API

| Name                 | Type                                             | Default | Required | Description                                           |
| -------------------- | ------------------------------------------------ | ------- | -------- | ----------------------------------------------------- |
| `defaultSelectedTab` | \[`string` \| `number`]                          | —       | ✓        | Identification of default selected tab                |
| `children`           | `any`                                            | —       | ✕        | Child component                                       |
| `onSelectionChange`  | `(previousId: TabId, currentId?: TabId) => void` | —       | ✕        | When the state of the selected panel changes          |
| `spacing`            | \[`SpaceToken` \| `Responsive<SpaceToken>`]      | —       | ✕        | Apply [custom spacing](#custom-spacing) between items |

### TabList

Tab list

#### API

| Name       | Type  | Default | Required | Description     |
| ---------- | ----- | ------- | -------- | --------------- |
| `children` | `any` | —       | ✕        | Child component |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### TabItem

Tab list item

#### API

| Name         | Type                    | Default | Required | Description           |
| ------------ | ----------------------- | ------- | -------- | --------------------- |
| `forTabPane` | \[`string` \| `number`] | —       | ✓        | Identification of tab |
| `children`   | `any`                   | —       | ✕        | Child component       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### TabLink

Tab list link

#### API

| Name            | Type                         | Default | Required | Description                                                                 |
| --------------- | ---------------------------- | ------- | -------- | --------------------------------------------------------------------------- |
| `aria-selected` | `boolean`                    | `false` | ✕        | Whether the tab link is currently selected; pass `true` for the active link |
| `children`      | `any`                        | —       | ✕        | Child component                                                             |
| `elementType`   | `ElementType`                | `a`     | ✕        | Type of element                                                             |
| `itemProps`     | `StyleProps & HTMLLIElement` | —       | ✕        | Props for parent list element                                               |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### TabContent

Tab content wrapper

#### API

| Name       | Type  | Default | Required | Description     |
| ---------- | ----- | ------- | -------- | --------------- |
| `children` | `any` | —       | ✕        | Child component |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### TabPane

Tab content item

#### API

| Name       | Type                    | Default | Required | Description           |
| ---------- | ----------------------- | ------- | -------- | --------------------- |
| `id`       | \[`string` \| `number`] | —       | ✓        | Identification of tab |
| `children` | `any`                   | —       | ✕        | Child component       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Tabs](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tabs/README.md) component.

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
