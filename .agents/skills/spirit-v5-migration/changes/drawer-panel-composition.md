# DrawerPanel Composition

## When It Applies

Apps using `DrawerPanel`, especially its removed `closeButton` prop, `DrawerCloseButton`, or panel-level
`hasSpacing`.

## Detection

```bash
rg "DrawerPanel|DrawerCloseButton|closeButton=|hasSpacing" <path> -g "*.{tsx,jsx}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/drawer-panel-close-button-composition
```

The codemod wraps panel content in `DrawerPanelHeader` and `DrawerPanelBody`. A `DrawerCloseButton` is scaffolded as
`CloseButton` with intentionally undefined `TODO_drawerIsOpen`, `TODO_drawerId`, and `TODO_drawerOnClose`
identifiers.

## Agent Edits

1. Replace every generated `TODO_drawer*` identifier with the actual Drawer open state, id, and close handler.
2. Add an accessible `aria-label` to `Drawer`.
3. Move panel-level `hasSpacing` to `DrawerPanelBody`.
4. Place title/header content and `CloseButton size="large"` in `DrawerPanelHeader`; keep scrollable content in
   `DrawerPanelBody`.
5. Run typecheck/build: unresolved placeholders are a failed migration, not an acceptable partial result.

## Report Guidance

- Status: `not-applicable` when no DrawerPanel usage exists.
- Status: `completed` only after all placeholders are resolved and the Drawer has an accessible name.
- Confidence: `medium` because state and handler wiring are application-specific.
