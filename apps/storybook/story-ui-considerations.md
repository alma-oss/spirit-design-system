# Story UI Considerations for Spirit

These are strict rules for generating screens with the Spirit Design System. What the components are and how they
are used is documented in `story-ui-docs/`. Breaking any rule below makes the output invalid.

## Component Library Details

**Library Name**: Spirit Design System (Alma Career)
**Import Path**: `@alma-oss/spirit-web-react`

Allowed imports: `@alma-oss/spirit-web-react` and `react` only. Icons are rendered with Spirit `Icon`, so no icon
package is imported. No other UI libraries, CSS in JS libraries or utility frameworks.

## Core Principles

- Build every screen only from Spirit components. Verify each component and prop name against the Spirit
  TypeScript API, never guess names or values.
- All layout comes from `Section`, `Container`, `Stack`, `Flex`, `Grid`, `GridItem`, `Box` and `Card`, and from
  token-based props (`spacing`, `margin*`, `padding*`, `size`, `textColor`, `backgroundColor`, `colorScheme`).
- Spacing, color, radius and shadow values are Spirit token names only, for example `space-600`, `secondary`,
  `emotion-success-subtle`, `300`.
- Native elements are allowed only where Spirit has no component: `<form>`, `<option>` inside `Select`, and list
  semantics through `Stack elementType="ul"` with `StackItem`.

## Do

- Import every used component by name from `@alma-oss/spirit-web-react` in one import statement.
- Give `Heading` an `elementType` and keep one `h1` per screen with a logical heading order.
- Give every form control a unique `id`, a `label` and a `name`. Use `isLabelHidden` instead of omitting the label.
- Group related controls with `FieldGroup`. Spirit has no `FormGroup`; a request for one maps to `FieldGroup` plus
  `Stack`.
- Wrap every child of a `Stack` that has `hasIntermediateDividers`, `hasStartDivider` or `hasEndDivider` in
  `StackItem`.
- Put primary and secondary actions into `ActionGroup`.
- Use `type="submit"` on the button that submits a form.
- Prefer stable components. Use an `UNSTABLE_*` component only when the request needs exactly its capability and no
  stable component fits.
- Omit props whose value equals the component default, for example `color="primary"` on `Button`, `size="medium"` on
  `Heading` or `Text`, `elementType="p"` on `Text`, `direction="vertical"` on `Card`, `hasContainer` on `Section`.
- Use React state (`useState`) for interactivity such as opening a `Modal` or controlled `isChecked`.

## Don't

- No `style` prop, no `className`, no `UNSAFE_style`, no `UNSAFE_className`.
- No `<style>` tags, CSS or SCSS files, CSS modules, styled components or `!important`.
- No ad-hoc CSS classes, including Spirit utility class names typed by hand.
- No hex, rgb or hsl colors, no px, rem or em values, and no `var(--…)` references. The only numeric size is
  `Icon boxSize`, a number in pixels.
- No `<div>` or `<span>` for layout or spacing, and no `<h1>`–`<h6>`, `<p>`, `<button>`, `<a>`, `<input>`,
  `<select>`, `<textarea>`, `<label>`, `<fieldset>` or `<hr>` where Spirit provides `Heading`, `Text`, `Button`,
  `Link`, `TextField`, `Select`, `TextArea`, `Label`, `FieldGroup` or `Divider`.
- No deprecated APIs: no `emphasis` on `Heading` or `Text` (use `fontWeight` and `isItalic`), no `closeLabel` on
  `ModalHeader`, `Tooltip`, `Toast` or `ToastBar` (use `strings.closeAria`), no `label` on `CloseButton`, no
  `goBackTitle` on `Breadcrumbs`, no `PaginationButtonLink` (use `PaginationLinkPrevious` and
  `PaginationLinkNext`), no `accessibilityLabel*` on Pagination parts, no `buttonLabel` or `dropdownTriggerLabel` on
  `SplitButton` (use `labelButton` and `strings.dropdown.trigger`). Accessible texts of `File`, `FileUpload` and
  `ScrollView` go to their `strings` prop.
- No invented components such as `FormGroup`, `Form`, `Typography`, `Paper`, `Row`, `Col` or `Spacer`.

## Accessibility

- Every form control has a visible or visually hidden `label`. Placeholder text is never a label.
- Icon-only buttons (`Button isSymmetrical`) contain `<VisuallyHidden>` text that names the action.
- Prefer visible text or `VisuallyHidden` over `aria-label`. When `aria-label` is needed, it never repeats the role:
  write `aria-label="Main"` on a navigation, not `"Main navigation"`.
- A `Section` that keeps the `section` element is named by its heading through `aria-labelledby`; otherwise render
  it with `elementType="div"`.
- A button that opens a `Modal` sets `aria-controls` to the Modal `id` and `aria-expanded` to its open state.
- Use `Alert` with an emotion `color` for messages, never color alone to communicate state.

## Error Patterns to Avoid

1. **Wrong**: `<div style={{ display: 'flex', gap: 16 }}>`
   **Right**: `<Flex spacing="space-600">`
   **Why**: Layout and spacing come from Spirit components and space tokens.

2. **Wrong**: `<Box UNSAFE_style={{ background: '#f5f5f5' }}>`
   **Right**: `<Box backgroundColor="secondary">` or `<Box colorScheme="neutral-subtle">`
   **Why**: Colors are token names consumed through props.

3. **Wrong**: `<Text emphasis="bold">`
   **Right**: `<Text fontWeight="bold">`
   **Why**: `emphasis` is deprecated.

4. **Wrong**: `<FormGroup label="Contact">`
   **Right**: `<FieldGroup id="contact" label="Contact">`
   **Why**: Spirit has no `FormGroup`; `FieldGroup` needs `id` and `label`.

5. **Wrong**: `<Button isSymmetrical><Icon name="close" /></Button>`
   **Right**: `<Button isSymmetrical><Icon name="close" /><VisuallyHidden>Close</VisuallyHidden></Button>`
   **Why**: Icon-only buttons need an accessible name.
