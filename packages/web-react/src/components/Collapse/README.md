# Collapse

## Usage

### Basic

```tsx
import React, { useState } from 'react';
import { Button } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const [isOpen, toggle] = useState<boolean>(true);

  return (
    <>
      <Button onClick={() => toggle(!isOpen)}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
      <Collapse isOpen={isOpen}>…</Collapse>
    </>
  );
};
```

### With Toggle From Hook

```tsx
import React, { useState } from 'react';
import { Button, Collapse, useCollapse } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const { isOpen, toggle } = useCollapse(false);

  return (
    <>
      <Button onClick={() => toggle(!isOpen)}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
      <Collapse isOpen={isOpen}>…</Collapse>
    </>
  );
};
```

### With Toggle Handler From Hook

```tsx
import React, { useState } from 'react';
import { Button, Collapse, useCollapse } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const { isOpen, toggleHandler } = useCollapse(false);

  return (
    <>
      <Button onClick={toggleHandler}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
      <Collapse isOpen={isOpen}>…</Collapse>
    </>
  );
};
```

### Responsive

```tsx
import React, { useState } from 'react';
import { Button, Collapse } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const [isOpen, toggle] = useState<boolean>(true);

  return (
    <>
      <Button hideFrom="tablet" onClick={() => toggle(!isOpen)}>
        Collapse Trigger ({isOpen ? 'Open' : 'Closed'})
      </Button>
      <Collapse collapsibleToBreakpoint="tablet" isOpen={isOpen}>
        …
      </Collapse>
    </>
  );
};
```

### Inline Expanding

For inline text expansion (useful for "read more" functionality), use `elementType="span"`. This ensures the expanded content appears inline with existing text rather than on a new line.

```tsx
import React, { useState } from 'react';
import { Button, Collapse } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const [isOpen, toggle] = useState<boolean>(false);

  return (
    <p>
      This is some text that continues inline when expanded.{' '}
      <Button onClick={() => toggle(!isOpen)}>{isOpen ? 'less' : '… more'}</Button>
      <Collapse id="inline-collapse" isOpen={isOpen} elementType="span">
        This additional content will appear inline with the existing text when expanded.
      </Collapse>
    </p>
  );
};
```

Important Notes:

- Use `elementType="span"` for inline behavior (currently the only supported inline element)
- The collapse element is removed from the DOM when open to prevent content duplication

## API

| Name                      | Type                                 | Default | Required | Description                                 |
| ------------------------- | ------------------------------------ | ------- | -------- | ------------------------------------------- |
| `collapsibleToBreakpoint` | \[`mobile` \| `tablet` \| `desktop`] | —       | ✕        | Handle for responsive breakpoint            |
| `elementType`             | \[`span` \| `div`]                   | `div`   | ✕        | Type of element used as wrapper and content |
| `id`                      | `string`                             | —       | ✓        | Component id                                |
| `isOpen`                  | `bool`                               | —       | ✕        | Is open on initialization                   |
| `transitionDuration`      | `number`                             | `250`   | ✕        | Transition duration in miliseconds          |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Uncontrolled Collapse

### Basic

```tsx
import React, { useState } from 'react';
import { Button, UncontrolledCollapse } from '@alma-oss/spirit-web-react';

export const Example = () => {
  // …
  return (
    <UncontrolledCollapse
      id="collapse-example"
      renderTrigger={({ isOpen, ...restProps }) => (
        <Button {...restProps}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
      )}
    >
      …
    </UncontrolledCollapse>
  );
};
```

```tsx
import React, { useState } from 'react';
import { Button, UncontrolledCollapse } from '@alma-oss/spirit-web-react';

export const Example = () => {
  // …
  return (
    <UncontrolledCollapse
      id="collapse-example"
      renderTrigger={({ isOpen, ...restProps }) => (
        <Button {...restProps}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
      )}
      hideOnCollapse
    >
      …
    </UncontrolledCollapse>
  );
};
```

## API

| Name                      | Type                                           | Default | Required | Description                                                                                              |
| ------------------------- | ---------------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `collapsibleToBreakpoint` | [Breakpoint dictionary][dictionary-breakpoint] | —       | ✕        | Handle for responsive breakpoint                                                                         |
| `elementType`             | \[`span` \| `div`]                             | `div`   | ✕        | Type of element used as wrapper and content                                                              |
| `hideOnCollapse`          | `bool`                                         | `false` | ✕        | [**DEPRECATED**][readme-deprecations] in favor of `isDisposable`; Hides button when content is displayed |
| `id`                      | `string`                                       | —       | ✓        | Component id                                                                                             |
| `isDisposable`            | `bool`                                         | `false` | ✕        | Hides trigger when content is displayed                                                                  |
| `isOpen`                  | `bool`                                         | `false` | ✕        | Is open on initialization                                                                                |
| `renderTrigger`           | `(render: CollapseRenderProps) => ReactNode`   | —       | ✕        | Properties for trigger render                                                                            |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### ⚠️ DEPRECATION NOTICE

`hideOnCollapse` property will be replaced in the next major version. Please use `isDisposable` instead.

We are providing a [codemod][codemod-collapse] to assist with this change.

[What are deprecations?][readme-deprecations]

## Render Toggle API

| Name            | Type         | Default | Required | Description           |
| --------------- | ------------ | ------- | -------- | --------------------- |
| `isOpen`        | `bool`       | —       | ✕        | When collapse is open |
| `onClick`       | `string`     | —       | ✕        | Trigger onClick event |
| `aria-expanded` | `Booleanish` | —       | ✕        | Trigger aria expanded |
| `aria-controls` | `string`     | —       | ✕        | Trigger aria controls |

[codemod-collapse]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v4/web-react/README.md#v4web-reactcollapse-isdisposable-prop--uncontrolledcollapse-hideoncollapse-to-isdisposable-prop-change
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#deprecations
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
