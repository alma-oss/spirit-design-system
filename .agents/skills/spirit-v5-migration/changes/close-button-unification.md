# Close Button Unification

## When It Applies

Apps directly using `ModalCloseButton` or `TooltipCloseButton`. Drawer close buttons are completed by the
[drawer-panel-composition](drawer-panel-composition.md) recipe.

## Detection

```bash
rg "ModalCloseButton|TooltipCloseButton|DrawerCloseButton" <path> -g "*.{ts,tsx,js,jsx}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/close-buttons-to-close-button
```

The codemod replaces direct Modal and Tooltip close buttons with `CloseButton`, remaps Modal props to ARIA and
click-handler props, and preserves existing labels.

## Agent Edits

1. Verify migrated Modal buttons use `size="xlarge"`, `aria-controls`, `aria-expanded`, and `onClick`.
2. Verify migrated Tooltip buttons use `aria-expanded="true"` and `onClick`.
3. Do not add direct buttons when `ModalHeader hasCloseButton` or `TooltipPopover isDismissible` already renders
   the internal close button.
4. Process `DrawerCloseButton` through the Drawer recipe instead of treating it as a standalone replacement.

## Report Guidance

- Status: `not-applicable` when no removed close-button components are imported directly.
- Status: `completed` when removed imports/usages are absent and ARIA wiring is valid.
- Confidence: `high` for Modal/Tooltip codemod edits.
