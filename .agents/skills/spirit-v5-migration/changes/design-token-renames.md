# Design Token Renames

## When It Applies

Apps with custom Spirit theme overrides, CSS custom properties, or JavaScript token imports.

## Detection

```bash
rg "form-field-filled|component-header-item|componentHeaderItem" <path> -g "*.{scss,sass,css,ts,tsx,js,jsx,json}"
rg "component-button-(primary|secondary)" <path> -g "*.{scss,sass,css,ts,tsx,js,jsx,json}"
```

## Agent Edits

1. Rename `form-field-filled-*` to `form-field-fill-*` in SCSS variables and
   `--spirit-color-form-field-filled-*` to `--spirit-color-form-field-fill-*` in CSS custom properties.
2. Rename `component-header-item-*` to `component-navigation-item-*` in SCSS/CSS and
   `componentHeaderItem*` to `componentNavigationItem*` in JavaScript/TypeScript token imports.
3. For overrides specifically styling Pagination items, replace reused `component-button-secondary-*` and
   `component-button-primary-*` custom properties with the matching
   `component-pagination-unselected-*` and `component-pagination-selected-*` properties from the canonical
   design-tokens migration guide.
4. Do not globally rename Button token overrides: Pagination migration is contextual, not a blanket token rename.
5. Re-run detection and compile styles or build the target app.

## Codemod

None.

## Report Guidance

- Status: `not-applicable` when no old token names or Pagination-specific Button token overrides exist.
- Status: `completed` when old names are absent and styles compile.
- Confidence: `high` for direct renames; `medium` for identifying contextual Pagination overrides.
