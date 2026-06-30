# Alert Link Color

## When It Applies

Apps relying on links inside `Alert` to inherit the Alert content color.

## Detection

```bash
rg "<Alert|<Link|<a " <path> -g "*.{tsx,jsx}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/alert-link-color-inherit
```

The codemod adds `color="inherit"` to Spirit `Link` descendants of Spirit `Alert` unless a `color` prop already
exists. It respects aliased imports and configured wrapper import sources.

## Agent Edits

1. Review codemod results and preserve intentional explicit colors.
2. Add `underlined="always"` where an inherited-color link would otherwise be indistinguishable from surrounding
   text.
3. Migrate native `<a>` elements that relied on removed Alert CSS to Spirit `Link`, or apply the equivalent
   `link-inherit link-underlined` classes when the app uses Spirit web CSS directly.

## Report Guidance

- Status: `not-applicable` when Alerts contain no links relying on inherited color.
- Status: `completed` after link color and underline behavior are explicit.
- Confidence: `high` for codemod edits; `medium` for native-link styling.
