# Flex Direction Values

## When It Applies

Apps using `Flex` with `direction="row"` or `direction="column"`.

## Detection

```bash
rg 'direction="(row|column)"|direction=\{\{.*(row|column)' <path> -g "*.{tsx,jsx}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/flex-direction-values
```

## Safe Automated Edits

```diff
- <Flex direction="row" … />
- <Flex direction="column" … />
+ <Flex direction="horizontal" … />
+ <Flex direction="vertical" … />

- <Flex direction={{ mobile: "column", tablet: "row" }} … />
+ <Flex direction={{ mobile: 'vertical', tablet: 'horizontal' }} … />
```

Only updates `Flex` imported from Spirit (respects `-s` wrapper sources). Plain `.ts` files without Spirit `Flex` usage are left unchanged.

- Status: `completed` after codemod or agent-applied rename.
- Confidence: `high`.
