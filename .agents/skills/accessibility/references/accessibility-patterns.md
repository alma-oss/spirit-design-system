# Accessibility Code Patterns

Worked, copy-ready accessibility patterns for Spirit, used alongside `accessibility-checklist.md`.
Every example uses Spirit primitives — the `VisuallyHidden` component, the `$focus-ring` token, and
the SCSS a11y tools (`hide-text()`, `min-tap-target()`) — rather than ad-hoc CSS. Target **WCAG 2.2
AA**.

## Accessible Name for Icon-Only Controls (1.1.1, 4.1.2)

Prefer hidden label text over `aria-label` — hidden text is translatable by browser translators,
while `aria-label` is not. This is the pattern used by Spirit's own `CloseButton` component.

### React (TSX)

```tsx
import { VisuallyHidden } from '../VisuallyHidden';

// ✅ Preferred: icon + hidden label text (translatable)
<button type="button" onClick={onClose}>
  <Icon name="close" />
  <VisuallyHidden>Close dialog</VisuallyHidden>
</button>

// ✅ Alternative: aria-label (browser translators may not translate this for screen reader users)
<button type="button" aria-label="Close dialog" onClick={onClose}>
  <Icon name="close" />
</button>
```

### Vanilla HTML

```html
<!-- ✅ Preferred: icon + .accessibility-hidden span -->
<button type="button">
  <!-- icon SVG or img here -->
  <span class="accessibility-hidden">Close dialog</span>
</button>

<!-- ✅ Alternative: aria-label -->
<button type="button" aria-label="Close dialog">
  <!-- icon SVG or img here -->
</button>
```

### Vanilla HTML + Custom SCSS

Use when you need a custom selector instead of the `.accessibility-hidden` helper class.

```html
<button type="button" class="MyButton">
  <!-- icon SVG or img here -->
  <span class="MyButton__label">Close dialog</span>
</button>
```

```scss
@use '../../tools/accessibility';

.MyButton__label {
  @include accessibility.hide-text();
}
```

Avoid: `aria-label` that contradicts the visible text, or `display: none` for SR-only content (it is
removed from the accessibility tree).

## Don't Rely on Color Alone (1.4.1, 3.3.1)

State and errors need a non-color signal — text and/or an icon — plus the programmatic association.

```html
<div>
  <label for="email">Email</label>
  <input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
  <p id="email-error" role="alert">
    <!-- icon or symbol here — non-color signal -->
    Enter a valid email address.
  </p>
</div>
```

## Visible Focus with the Design-System Token (2.4.7, 1.4.11)

Never drop the focus outline without an equivalent. Use the `$focus-ring` token; prefer
`:focus-visible` so the ring shows for keyboard users without flashing on pointer clicks. The token
is contrast-checked to meet the 3:1 UI-component minimum.

```scss
@use '@tokens' as tokens;

.MyControl:focus-visible {
  outline: none;
  box-shadow: tokens.$focus-ring;
}
```

## Focus Not Obscured by Sticky Headers/Footers (2.4.11)

A focused element must not be fully hidden behind a sticky header/footer. Reserve room with
`scroll-margin` so it scrolls into the clear.

```scss
@use '@tokens' as tokens;

// Scope to a scrollable wrapper rather than using a global selector — apply where needed.
.MyScrollableContainer :focus-visible {
  scroll-margin-top: var(--#{tokens.$css-variable-prefix}sticky-header-height, 5rem);
  scroll-margin-bottom: tokens.$space-700;
}
```

## Target Size (2.5.8)

Interactive targets are ≥ 24×24 px. When the visible control is smaller (e.g. a compact icon
button or any element with a small visual footprint), expand the hit area without changing the layout
using a11y utility mixins or helper classes — for example `min-tap-target()` or
`.accessibility-tap-target` (see `packages/web/src/scss/tools/_accessibility.scss` for the current
set of available utilities).

```scss
@use '../../tools/accessibility';

.MyIconButton {
  @include accessibility.min-tap-target(24px); // adds a centered ::before hit area
}
```

When a link should cover an entire container (e.g. a card) rather than just a fixed hit zone, use
`pseudo-element.stretch()` or the `.element-stretched` helper class instead. The nearest
`position: relative` ancestor becomes the clickable boundary.

```scss
@use '../../tools/pseudo-element';

.MyCard {
  position: relative;
}

.MyCard__link {
  @include pseudo-element.stretch(); // ::before stretches to inset: 0 of the parent
}
```

Or with the helper class:

```html
<div class="MyCard" style="position: relative;">
  <a href="#" class="MyCard__link element-stretched">Card title</a>
</div>
```

## Dragging Movements Need a Pointer Alternative (2.5.7)

Any reorder/slider/drag interaction must also be operable with discrete controls.

```tsx
// ✅ Drag to reorder, AND up/down buttons that do the same thing
<li>
  <span>{item.label}</span>
  <button type="button" aria-label={`Move ${item.label} up`} onClick={() => move(item.id, -1)}>
    ↑
  </button>
  <button type="button" aria-label={`Move ${item.label} down`} onClick={() => move(item.id, 1)}>
    ↓
  </button>
</li>
```

## Named Form Landmark (1.3.6, 4.1.2)

A `<form>` has a `form` landmark role only when it has an accessible name. Add `aria-labelledby`
pointing to the nearest heading, and let the form wrap both the field area and the action buttons:

```tsx
<Heading id="form-heading" elementType="h1">Personal details</Heading>
<form aria-labelledby="form-heading" method="post">
  <Box>{/* fields */}</Box>
  <ActionGroup><Button type="submit">Save</Button></ActionGroup>
</form>
```

## Conditional `aria-controls` — Disclosure Pattern (4.1.2)

`aria-controls` must reference IDs that **exist in the DOM**. When controlled elements are
conditionally rendered, omit `aria-controls` while they are absent — `aria-expanded` alone is
sufficient to signal the collapsed state:

```tsx
// ✅ Correct — aria-controls only present when IDs are in the DOM
function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Checkbox
        aria-expanded={open}
        {...(open && { 'aria-controls': 'extra-1 extra-2' })}
        onChange={() => setOpen((prev) => !prev)}
      />
      {open && (
        <>
          <TextField id="extra-1" />
          <TextField id="extra-2" />
        </>
      )}
    </>
  );
}

// ❌ Wrong — aria-controls always present, even when elements are absent from the DOM
function WrongExample() {
  return <Checkbox aria-controls="extra-1 extra-2" aria-expanded={open} />;
}
```

## Form Labels (3.3.2)

Every field has a programmatically associated label. Placeholder text is not a label. Group
related controls with `fieldset`/`legend`. For personal-data fields add `autoComplete` (WCAG 1.3.5):

| Field               | `autoComplete`     |
| ------------------- | ------------------ |
| First name          | `given-name`       |
| Last name           | `family-name`      |
| Title before name   | `honorific-prefix` |
| Title after name    | `honorific-suffix` |
| Email               | `email`            |
| Phone               | `tel`              |
| City / municipality | `address-level2`   |
| Street address      | `street-address`   |
| Postal / ZIP        | `postal-code`      |
| Country             | `country`          |

```tsx
// ✅ Explicit association
<label htmlFor="first-name">First name</label>
<input id="first-name" name="firstName" type="text" autoComplete="given-name" />

// ✅ Grouping
<fieldset>
  <legend>Contact preference</legend>
  <label><input type="radio" name="contact" value="email" /> Email</label>
  <label><input type="radio" name="contact" value="phone" /> Phone</label>
</fieldset>
```

## Error Handling on Submit (3.3.1, 3.3.3)

Announce errors, mark invalid fields, and move focus to the first error (or an error summary).

```tsx
function handleSubmit(event) {
  event.preventDefault();
  const errors = validate(form);
  if (errors.length > 0) {
    setErrors(errors);
    // Move focus to the first invalid field so the error is announced
    document.getElementById(errors[0].fieldId)?.focus();
  }
}
```

## Live Regions (4.1.3)

Announce dynamic updates without moving focus. The region must already exist in the DOM before its
content changes. Use them sparingly.

| Need                                | Politeness | Role / attribute                          |
| ----------------------------------- | ---------- | ----------------------------------------- |
| Status, progress, non-urgent update | polite     | `role="status"` or `aria-live="polite"`   |
| Error or time-sensitive alert       | assertive  | `role="alert"` or `aria-live="assertive"` |

```tsx
// Persistent region, content updated later
<div role="status" aria-live="polite" className="MyComponent__status">
  {statusMessage}
</div>
```

## Modal Focus Management

Prefer the native `<dialog>` element — it traps focus and handles `Escape` automatically. When you
build a custom overlay, move focus in on open, trap it while open, and restore it to the trigger on
close.

```tsx
const triggerRef = useRef(null);
const dialogRef = useRef(null);

function open() {
  triggerRef.current = document.activeElement; // remember the trigger
  dialogRef.current?.showModal(); // native focus trap + Escape
}

function close() {
  dialogRef.current?.close();
  triggerRef.current?.focus(); // restore focus
}
```

## Reduced Motion (2.3.3)

Respect the user's preference; wrap animations in the `no-preference` query so they are off by
default for users who have requested reduced motion.

```scss
@use 'theme';

@media (prefers-reduced-motion: no-preference) {
  .MyComponent {
    transition: background theme.$transition-duration theme.$transition-timing;
  }
}
```
