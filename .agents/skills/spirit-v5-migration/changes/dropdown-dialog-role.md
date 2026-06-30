# Dropdown Dialog Role

## When It Applies

Apps using `Dropdown`, `DropdownPopover`, or `DropdownTrigger`.

## Detection

```bash
rg "<DropdownPopover|<DropdownTrigger|<Dropdown" <path> -g "*.{tsx,jsx}"
```

## What Changed

- `DropdownPopover` renders `role="dialog"` by default.
- `DropdownTrigger` has `aria-haspopup="dialog"` by default.
- Keyboard: Escape closes; Tab/Shift+Tab past focusable elements closes; focus moves to first interactive element on open.

## Agent Edits

The agent adds accessible names and updates snapshots in the target codebase.

1. Add `aria-label` or `aria-labelledby` to every `DropdownPopover` (required for ARIA dialogs).
2. Remove redundant explicit `role="dialog"` if it was a v4 feature-flag workaround.
3. Update snapshot tests for new `role` and `aria-haspopup` attributes.

**Opt out** for navigation menus — override both popover role and trigger `aria-haspopup`:

```tsx
<Dropdown …>
  <DropdownTrigger aria-haspopup="menu" elementType="button">Trigger</DropdownTrigger>
  <DropdownPopover role="menu">…</DropdownPopover>
</Dropdown>
```

## Validation

- Every `DropdownPopover` has an accessible name.
- Snapshot tests updated.

## Report Guidance

- Status: `completed` when all popovers named and snapshots updated.
- Status: `partial` if some popovers need design review for opt-out.
- Confidence: `high` for adding `aria-label`; `medium` for opt-out cases.
