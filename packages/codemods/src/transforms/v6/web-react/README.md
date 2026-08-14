# `web-react` V6 Codemods

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

[readme-codemods]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md
