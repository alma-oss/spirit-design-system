# `web-react` v6 Codemods

This is a collection of codemods for updating Web-React v6 components.

You can find instructions on how to run these codemods in the main package [README][readme-codemods].

## Included Scripts

### `v6/web-react/heading-text-emphasis-prop` — Replace `emphasis` on `Heading` and `Text`

This codemod replaces the deprecated `emphasis` prop on `Heading` and `Text`.
Font-weight values move to `fontWeight`, while `italic` moves to `isItalic`.

For `Heading`, `emphasis="italic"` becomes `fontWeight="regular" isItalic` to preserve the legacy regular italic
style. For `Text`, the regular font weight is already the default.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/heading-text-emphasis-prop
npx @alma-oss/spirit-codemods -p <path> -s "@org/design-system" -t v6/web-react/heading-text-emphasis-prop
```

#### Example

```diff
- <Heading emphasis="semibold">Heading</Heading>
+ <Heading fontWeight="semibold">Heading</Heading>

- <Heading emphasis="italic">Heading</Heading>
+ <Heading fontWeight="regular" isItalic>Heading</Heading>

- <Text emphasis="italic">Text</Text>
+ <Text isItalic>Text</Text>
```

### `v6/web-react/pagination-button-link-to-pagination-link` — Rename `PaginationButtonLink` to Previous / Next Links

This codemod replaces `PaginationButtonLink` with `PaginationLinkPrevious` or `PaginationLinkNext` based on the `direction` prop.
It also migrates `PaginationLink` elements that still pass `direction`, removes that prop, and drops Button-only props (`color`, `size`, `isSymmetrical`, `isLoading`, `spacing`).
Related type identifiers become `PaginationLinkPreviousNextProps`.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v6/web-react/pagination-button-link-to-pagination-link
npx @alma-oss/spirit-codemods -p <path> -s "@org/design-system" -t v6/web-react/pagination-button-link-to-pagination-link
```

#### Example

```diff
- import { PaginationButtonLink, type PaginationButtonLinkProps } from '@alma-oss/spirit-web-react';
+ import { PaginationLinkNext, PaginationLinkPrevious, type PaginationLinkPreviousNextProps } from '@alma-oss/spirit-web-react';

- <PaginationButtonLink direction="next" href="/page-2" />
- <PaginationButtonLink color="secondary" size="small" isSymmetrical direction="previous" href="/page-1" />
+ <PaginationLinkNext href="/page-2" />
+ <PaginationLinkPrevious href="/page-1" />
```

[readme-codemods]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md
