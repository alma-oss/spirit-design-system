# Tag

```jsx
import { Tag } from '@alma-oss/spirit-web-react';
```

```jsx
  <Tag color="neutral">Tag</Tag>
  <Tag color="success">Tag</Tag>
  <Tag color="informative">Tag</Tag>
  <Tag color="warning">Tag</Tag>
  <Tag color="danger">Tag</Tag>
  <Tag color="selected">Tag</Tag>
```

## API

| Name          | Type                                                                     | Default   | Required | Description                     |
| ------------- | ------------------------------------------------------------------------ | --------- | -------- | ------------------------------- |
| `children`    | `ReactNode`                                                              | —         | ✓        | Content of the Tag              |
| `color`       | \[[EmotionColorType][readme-generated-types] \| `neutral` \| `selected`] | `neutral` | ✕        | Color of the component          |
| `elementType` | `React.Element`                                                          | `span`    | ✕        | HTML tag                        |
| `isDisabled`  | `bool`                                                                   | `false`   | ✕        | Whether the tag is disabled     |
| `isSubtle`    | `bool`                                                                   | `false`   | ✕        | If is Subtle color variant used |
| `ref`         | `ForwardedRef<HTMLSpanElement>`                                          | —         | ✕        | Tag element reference           |
| `size`        | [Size Extended dictionary][dictionary-size]                              | `medium`  | ✕        | Size of the Tag                 |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Tag][tag] component

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[tag]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tag/README.md
