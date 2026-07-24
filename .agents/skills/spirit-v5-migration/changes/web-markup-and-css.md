# Web Markup and CSS

## When It Applies

Apps importing `@alma-oss/spirit-web`, rendering Spirit CSS classes in HTML/JSX/templates, or overriding Spirit
component selectors/variables in project styles.

## Detection

```bash
rg "@alma-oss/spirit-web|spirit-web/scss" package.json <path>
rg "link-stretched|Button--block|Button--disabled|ControlButton--disabled|Tag--disabled|Flex--(row|column)|Stack--has|TextField__|Select__|TextArea__|FieldGroup|DrawerPanel__content|Toggle__input" <path> -g "*.{tsx,jsx,html,twig,scss,sass,css}"
```

## Agent Edits

Apply the current `spirit-web` v5 migration guide to raw markup and custom styles, including:

1. `link-stretched` → `element-stretched`.
2. Removed component disabled modifiers → global `disabled`; preserve native `disabled`/`aria-disabled` semantics
   and the documented ControlButton color/tap-target classes.
3. `Flex--row`/`Flex--column` (including responsive forms) → `Flex--horizontal`/`Flex--vertical`.
4. `Stack--hasSpacing`, `--hasIntermediateDividers`, `--hasStartDivider`, `--hasEndDivider` → modifiers without
   `has`; ensure divider children use `StackItem`.
5. Replace removed `Button--block` with layout utilities or Grid.
6. Recompose legacy TextField/Select/TextArea and FieldGroup markup with Label, InputContainer, InputAddon,
   HelperText, ValidationText, InputDetails, and layout utilities.
7. Apply the matching React/shared recipes for Alert links, choice-control markup, DrawerPanel, FileUpload, Header,
   Item, Navigation, ScrollView, success icons, and Tag/ControlButton sizing.
8. Change Pagination previous/next controls from medium to small only in Pagination context.
9. Update custom selectors and Sass variables that reference removed BEM elements or old ScrollView arrow names.
10. Compile styles and visually verify color-scheme components whose surfaces were previously customized by
    component-specific modifiers.

## Codemod

React codemods do not migrate static HTML/Twig or arbitrary custom SCSS. Apply these edits directly.

## Report Guidance

- Status: `not-applicable` when the app has no raw Spirit markup, web package import, or component style overrides.
- Status: `completed` when legacy classes/selectors are absent and styles compile.
- Confidence: `high` for direct class renames; `medium` for recomposed markup and color-scheme overrides.
