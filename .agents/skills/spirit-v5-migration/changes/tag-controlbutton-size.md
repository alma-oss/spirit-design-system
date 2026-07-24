# Tag ControlButton Size

## When It Applies

Apps rendering `ControlButton` inside `Tag`.

## Detection

```bash
rg "<Tag|<ControlButton" <path> -g "*.{tsx,jsx}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/tag-controlbutton-size
```

The codemod changes nested ControlButton sizes `small` → `xsmall` and `medium` → `small`, including responsive
object values. It skips omitted/dynamic sizes and spread-provided values. It matches literal JSX names rather than
Spirit imports, so review aliases and same-named local components.

## Agent Edits

1. Review all `ControlButton` descendants of `Tag`, including wrapper components and values supplied by spreads or
   `PropsProvider`.
2. Keep `xsmall` unchanged.
3. If the optional global ControlButton size-preservation transform also ran, manually reconcile every nested
   control with the final Tag mapping; the two transforms are not safely composable for every original size.
4. Verify visual alignment for every Tag size and update expected snapshots.

## Report Guidance

- Status: `not-applicable` when Tags do not contain ControlButton.
- Status: `completed` when nested controls follow the v5 size mapping.
- Confidence: `high` for literal codemod edits; `medium` for dynamic/context sizes.
