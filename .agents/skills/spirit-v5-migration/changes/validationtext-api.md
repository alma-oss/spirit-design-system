# ValidationText API

## When It Applies

Apps using standalone `ValidationText` with `hasValidationStateIcon`.

## Detection

```bash
rg "hasValidationStateIcon|ValidationText" <path> -g "*.{tsx,jsx}"
```

## What Changed

- `hasValidationStateIcon` removed — use `validationStateIcon` on standalone `ValidationText`.
- Inline / form-field mode removed — compose layout with parent components.
- Success icon changed from `check-plain` to `success`.

Built-in form fields still accept `hasValidationIcon` and pass `validationStateIcon` internally.

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/validation-state-icon-prop
```

The codemod renames standalone Spirit `ValidationText` usage only. It does not change
`hasValidationIcon` on composed form components.

## Safe Automated Edits

The agent applies prop renames when the codemod misses a match.

```diff
- <ValidationText validationText="Error" hasValidationStateIcon validationState="danger" />
+ <ValidationText validationText="Error" validationStateIcon="danger" />
```

## Agent Edits

The agent handles aliased/wrapped components missed by the codemod and refactors standalone `ValidationText`
inline layouts to composable patterns.

## Report Guidance

- Status: `completed` when props updated and snapshots reviewed.
- Confidence: `high` for codemod prop rename; `medium` for layout composition.
