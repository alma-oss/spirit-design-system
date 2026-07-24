# Radio Composition and Spacing

## When It Applies

Apps using `Radio`, especially rows with explicit `marginY`.

## Detection

```bash
rg "<Radio" <path> -g "*.{tsx,jsx}"
```

## What Changed

Radio now composes its layout from Spirit components and provides built-in `py-500` row padding.

## Codemod

None.

## Agent Edits

1. Remove explicit `marginY="space-500"` added for the old row spacing.
2. Stack multiple Radio rows with plain `<Stack>`; remove `hasSpacing` when the Stack contains only these rows.
3. Keep `hasSpacing` when the Stack intentionally mixes Radio rows with other form fields.
4. Update snapshots affected by the composition markup.

## Report Guidance

- Status: `completed` when redundant margins/gaps are removed.
- Confidence: `high` for deterministic cleanup; `medium` for mixed custom layouts.
