# `web-react` v4 Codemods

This is a collection of codemods for updating Web-React v4 components.

You can find instructions on how to run these codemods in the main package [README](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md).

## Included Scripts

### `v4/web-react/package-scope-change` — Change Package npm Organization From `@lmc-eu` to `@alma-oss`

This codemod updates all import statements from `@lmc-eu/spirit-web-react` to `@alma-oss/spirit-web-react`.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v4/web-react/package-scope-change
```

#### Example

```diff
- import { Button, Heading, Text } from '@lmc-eu/spirit-web-react';
+ import { Button, Heading, Text } from '@alma-oss/spirit-web-react';
- import { Avatar } from '@lmc-eu/spirit-web-react/components/Avatar';
+ import { Avatar } from '@alma-oss/spirit-web-react/components/Avatar';
- import { Flex } from '@lmc-eu/spirit-web-react/src';
+ import { Flex } from '@alma-oss/spirit-web-react/src';
```
