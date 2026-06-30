# Navigation Slots and Open State

## When It Applies

Apps using `Navigation`, `NavigationAction`, or vertical navigation with custom icons.

## Detection

```bash
rg "NavigationAction|Navigation" <path> -g "*.{tsx,jsx}"
```

## What Changed

- `NavigationAction` supports `startSlot`/`endSlot` for content around the label.
- Expanded category triggers get open visual state from `aria-expanded="true"`.
- Vertical selected-state indicator (active stripe in `box` variant) removed.

## Codemod

None.

## Agent Edits

The agent applies slot migration, a11y attributes, and snapshot updates in the target codebase.

1. Move icons from `NavigationAction` children to `startSlot`/`endSlot`.
2. Set `aria-expanded="true"` on expanded category triggers.
3. Use structural nesting for second-level items; keep icons on parent category actions only.
4. Update snapshots if relying on selected-state stripe.

## Report Guidance

- Status: `not-applicable` if Navigation not used.
- Status: `completed` after slot migration and a11y attributes.
- Confidence: `medium`.
