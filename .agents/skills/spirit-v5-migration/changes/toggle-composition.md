# Toggle Composition and Spacing

## When It Applies

Apps using `Toggle`, especially rows with explicit `marginY` or custom label typography.

## Detection

```bash
rg "<Toggle" <path> -g "*.{tsx,jsx}"
```

## What Changed

Toggle now composes its layout from Spirit components and provides built-in `py-500` row padding.
`Label` already owns label typography.

## Codemod

None.

## Agent Edits

1. Remove explicit `marginY="space-500"` added for the old row spacing.
2. Stack multiple Toggle rows with plain `<Stack>`; remove `hasSpacing` when the Stack contains only these rows.
3. Keep `hasSpacing` when the Stack intentionally mixes Toggle rows with other form fields.
4. Replace `<Text emphasis="semibold">` or other custom typography passed as `label` with a plain label string.
5. Update snapshots affected by the composition markup.

## Report Guidance

- Status: `completed` when redundant margins/gaps and custom label typography are removed.
- Confidence: `high` for deterministic cleanup; `medium` for mixed custom layouts.
