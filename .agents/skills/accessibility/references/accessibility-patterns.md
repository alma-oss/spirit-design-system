# Accessibility Code Patterns

Worked, copy-ready accessibility patterns for Spirit, used alongside `accessibility-checklist.md`.
Every example uses Spirit primitives — the `VisuallyHidden` component, the `$focus-ring` token, and
the SCSS a11y tools (`hide-text()`, `min-tap-target()`) — rather than ad-hoc CSS. Target **WCAG 2.2
AA**.

## Accessible Name for Icon-Only Controls (1.1.1, 4.1.2)

Prefer a real `<button>`/`Button` with `VisuallyHidden` label text; hide the icon from AT. This is
the pattern used by Spirit's own close buttons (`DrawerCloseButton`, `TooltipCloseButton`).

```tsx
import { VisuallyHidden } from '../VisuallyHidden';

// ✅ Visible icon, screen-reader name, icon hidden from the a11y tree
<button type="button" onClick={onClose}>
  <Icon name="close" aria-hidden="true" />
  <VisuallyHidden>Close dialog</VisuallyHidden>
</button>

// ✅ Equivalent with aria-label when there is no child text node
<button type="button" aria-label="Close dialog" onClick={onClose}>
  <Icon name="close" aria-hidden="true" />
</button>
```

```scss
// Vanilla / SCSS: the screen-reader-only helper instead of `display: none`
@use '@tokens' as tokens;
@use '../../tools/accessibility';

.MyComponent__srOnly {
  @include accessibility.hide-text(); // or apply the `.accessibility-hidden` helper class
}
```

Avoid: `aria-label` that contradicts the visible text, or `display: none` for SR-only content (it is
removed from the accessibility tree).

## Don't Rely on Color Alone (1.4.1, 3.3.1)

State and errors need a non-color signal — text and/or an icon — plus the programmatic association.

```tsx
<div className="TextField TextField--error">
  <label htmlFor="email">Email</label>
  <input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
  <p id="email-error" role="alert" className="TextField__validationText">
    <Icon name="warning" aria-hidden="true" /> Enter a valid email address.
  </p>
</div>
```

## Visible Focus with the Design-System Token (2.4.7, 1.4.11)

Never drop the focus outline without an equivalent. Use the `$focus-ring` token; prefer
`:focus-visible` so the ring shows for keyboard users without flashing on pointer clicks. The token
is contrast-checked to meet the 3:1 UI-component minimum.

```scss
@use '@tokens' as tokens;

.MyControl {
  &:focus-visible {
    outline: none;
    box-shadow: tokens.$focus-ring;
  }
}
```

Form fields get this for free from the shared mixin:

```scss
@use '../../tools/form-fields' as form-fields-tools;

.MyField__input {
  @include form-fields-tools.box-field-focus-visible();
}
```

## Focus Not Obscured by Sticky Chrome (2.4.11 — New in 2.2)

A focused element must not be fully hidden behind a sticky header/footer. Reserve room with
`scroll-margin` so it scrolls into the clear.

```scss
@use '@tokens' as tokens;

:focus-visible {
  scroll-margin-top: var(--#{tokens.$css-variable-prefix}sticky-header-height, 80px);
  scroll-margin-bottom: 60px;
}
```

## Target Size (2.5.8 — New in 2.2)

Interactive targets are ≥ 24×24 CSS px. When the visible control is smaller (e.g. a compact icon
button), expand the hit area without changing the layout using the `min-tap-target()` mixin or the
`.accessibility-tap-target` helper.

```scss
@use '../../tools/accessibility';

.MyIconButton {
  @include accessibility.min-tap-target(24px); // adds a centered ::before hit area
}
```

## Dragging Movements Need a Pointer Alternative (2.5.7 — New in 2.2)

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

## Form Labels (3.3.2)

Every field has a programmatically associated, visible label. Placeholder text is not a label. Group
related controls with `fieldset`/`legend`.

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

Respect the user's preference; the design-system motion tokens should already gate on it.

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Screen-Reader Command Quick Reference

Useful for manual verification (see `accessibility-checklist.md` → Testing).

| Action                | VoiceOver (macOS)  | NVDA (Windows)         |
| --------------------- | ------------------ | ---------------------- |
| Toggle on/off         | Cmd + F5           | Ctrl + Alt + N         |
| Read next item        | VO + Right Arrow   | Down Arrow             |
| Next heading          | VO + Cmd + H       | H                      |
| Next form control     | VO + Cmd + J       | F                      |
| Next landmark/region  | VO + Cmd + (rotor) | D                      |
| List links / headings | VO + U (rotor)     | Insert + F7 (elements) |

VO = Control + Option. Also test Tab order, 200% zoom, and `prefers-reduced-motion`.
