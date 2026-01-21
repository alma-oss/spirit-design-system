# Truncate

Truncate is a component that truncates text based on various criteria: lines, words, or characters.

```jsx
import { Truncate } from '@alma-oss/spirit-web-react';

<Truncate>{/* Text go here */}</Truncate>;
```

> **ℹ️ Best Practices:**
> For comprehensive guidance on when and how to use truncation, handling translations, and component-specific guidelines, see the [Content Truncating Guidelines][truncation].

## Truncation Modes

The component supports three truncation modes using the `mode` prop:

### Lines

Truncate text to a specific number of lines using `mode="lines"` and `limit` props:

```jsx
<Truncate limit={2} mode="lines">
  {/* Text go here */}
</Truncate>
```

### Words

Truncate text to a specific number of words using `mode="words"` and `limit` props:

```jsx
<Truncate limit={10} mode="words">
  {/* Text go here */}
</Truncate>
```

### Characters

Truncate text to a specific number of characters using `mode="characters"` and `limit` props:

```jsx
<Truncate limit={50} mode="characters">
  {/* Text go here */}
</Truncate>
```

### Content Compatibility

The truncation modes have different requirements for the content they can process:

| Mode         | Plain Text | Formatted Text (HTML/React Elements) | Notes                                               |
| ------------ | ---------- | ------------------------------------ | --------------------------------------------------- |
| `lines`      | ✅         | ✅                                   | Uses CSS line-clamping, works with any content      |
| `words`      | ✅         | ❌                                   | Requires string content, doesn't process HTML/React |
| `characters` | ✅         | ❌                                   | Requires string content, doesn't process HTML/React |

#### Examples

✅ **Works** - Plain text with any mode:

```jsx
<Truncate mode="words" limit={10}>
  This is plain text that can be truncated
</Truncate>
```

✅ **Works** - Formatted text with `lines` mode:

```jsx
<Truncate mode="lines" limit={2}>
  Text with <strong>emphasis</strong> and <a href="#">links</a>
</Truncate>
```

❌ **Doesn't work** - Formatted text with `words` or `characters` mode:

```jsx
<Truncate mode="words" limit={10}>
  Text with <strong>emphasis</strong> {/* Won't truncate properly */}
</Truncate>
```

### Expandable Example

This example demonstrates how to make truncated text expandable, allowing users to toggle between the truncated and full content.

```jsx
import React, { useState } from 'react';
import { Button, Text, Truncate } from '@alma-oss/spirit-web-react';

const Example = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Text>
        {isExpanded ? (
          children
        ) : (
          <Truncate limit={2} mode="lines">
            {children}
          </Truncate>
        )}
      </Text>

      <Button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Show Less' : 'Show More'}</Button>
    </>
  );
};
```

## API

| Name          | Type                                 | Default   | Required | Description                                                |
| ------------- | ------------------------------------ | --------- | -------- | ---------------------------------------------------------- |
| `children`    | `string` \| `ReactNode`              | `null`    | ✓        | Content of the Truncate                                    |
| `elementType` | `ElementType`                        | `span`    | ✕        | Type of element used                                       |
| `limit`       | `number`                             | `3`       | ✕        | The limit for the truncation (lines, words, or characters) |
| `mode`        | `'lines' \| 'words' \| 'characters'` | `'lines'` | ✕        | The type of truncation to apply                            |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[truncation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/TRUNCATING.md
