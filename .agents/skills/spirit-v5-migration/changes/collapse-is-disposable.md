# Collapse `hideOnCollapse` to `isDisposable`

## When It Applies

Apps using `UncontrolledCollapse` with `hideOnCollapse` or vanilla Collapse triggers with `data-spirit-more`.

## Detection

```bash
rg "hideOnCollapse|UncontrolledCollapse|data-spirit-more" <path> -g "*.{tsx,jsx,html,twig}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/collapse-isDisposable-prop
```

## Safe Automated Edits

```diff
- <UncontrolledCollapse hideOnCollapse … />
+ <UncontrolledCollapse isDisposable … />
```

## Agent Edits

The agent applies the React prop rename when the codemod misses a match and replaces
`data-spirit-more` with `data-spirit-is-disposable` in static markup.

## Validation

No remaining `hideOnCollapse` props or `data-spirit-more` attributes.

## Report Guidance

- Status: `completed` after codemod or agent-applied rename.
- Confidence: `high`.
