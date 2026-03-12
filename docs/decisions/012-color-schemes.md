# Color Schemes

Date: 2026-03-12

Status: accepted

## Context

We noticed that many components still relied on component-specific color modifiers (e.g., `ToastBar--danger`, `ToastBar--success`)
to apply different color combinations. This approach had several drawbacks:

1. **Code duplication**: Each component needed its own set of color modifiers, leading to duplicated CSS code for
   applying the same background and text color combinations.
2. **Maintenance overhead**: When design tokens change, multiple component-specific modifiers need to be updated
   instead of a single source of truth.
3. **Limited reusability**: Color combinations defined for one component couldn't be easily reused in other
   components.
4. **Increased bundle size**: Component-specific color modifiers contributed to unnecessary CSS bloat.

## Decision

1. **Introduction of color scheme utility classes.** Color schemes are utility classes that pair background and text
   colors together to create consistent, themeable color combinations. They follow the naming pattern
   `color-scheme-on-<category>-<intensity>` where:
   - `<category>` is the color category (e.g., `accent-brand`, `emotion-danger`, `neutral`, `selected`)
   - `<intensity>` is either `basic` or `subtle`

   ⚠️ **Exception**: The `color-scheme-on-disabled` class does not follow this pattern and has no intensity suffix,
   as the disabled state has a single predefined color combination.

2. **Pairing logic.** Color schemes intelligently pair background and text colors for optimal contrast:
   - `-basic` suffix pairs `background-basic` token with `content-subtle` token
   - `-subtle` suffix pairs `background-subtle` token with `content-basic` token
3. **Replacement of component-specific color modifiers.** Components that previously used color modifiers (like
   `ToastBar--danger`) will be refactored to use color scheme utility classes (like `color-scheme-on-emotion-danger-basic`)
   on the appropriate inner element.
4. **Token-based generation.** Color schemes are automatically generated from design tokens, ensuring consistency with
   the design system's color structure defined in [tokens structure][tokens-structure].

## Consequences

### Component Refactoring

Components with color modifiers need to be updated to use color scheme utility classes instead. This includes removing
component-specific color styling and applying the utility class to the appropriate element (typically the element that
needs both background and text color).

### CSS Code Reduction

By replacing component-specific color modifiers with shared utility classes, we reduce CSS bundle size and eliminate
code duplication. Each color combination is defined once and reused across all components.

### Improved Consistency

Color schemes ensure that background and text color combinations follow design token definitions, maintaining
consistent contrast ratios and visual hierarchy throughout the design system.

### Simplified Maintenance

When design tokens change, color schemes automatically reflect those changes without requiring updates to individual
component styles. This makes the system easier to maintain and evolve.

### Architectural Clarity

The distinction between themes (scoped appearance changes) and color schemes (individual color combinations) provides
clearer architectural boundaries. Themes control the overall color palette, while color schemes apply specific
combinations where needed.

[tokens-structure]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/009-tokens-structure.md
