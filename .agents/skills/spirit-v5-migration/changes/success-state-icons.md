# Success State Icons

## When It Applies

Apps with custom success validation/status icon references.

## Detection

```bash
rg "check-plain|validationStateIcon|hasValidationIcon|validationState=.success." <path> -g "*.{tsx,ts,jsx,js,html,twig}"
```

## What Changed

Success icons in `ValidationText`, `Alert`, and `Toast` now use `success` instead of `check-plain`.
Selection indicators such as Item and PricingPlan still use `check-plain`.

## Agent Edits

1. Replace custom `check-plain` references with `success` only when they represent success validation or status.
2. Keep `check-plain` for selection/checkmark semantics.
3. Review snapshots or visual tests for affected status components.

## Codemod

None.

## Report Guidance

- Status: `not-applicable` when the app has no custom success icon references.
- Status: `completed` when status and selection semantics use the correct distinct icons.
- Confidence: `medium` because the icon name alone does not reveal semantics.
