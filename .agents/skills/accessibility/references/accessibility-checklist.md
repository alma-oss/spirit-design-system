# Accessibility Checklist

The actionable accessibility checklist. Target **WCAG 2.2 AA**.
Because these are design-system components, an a11y defect ships to every consumer —
treat a regression of previously-working accessibility as **blocking**. Findings use the format in
the code-review methodology. Worked code examples for these items live in `accessibility-patterns.md`.

## Keyboard Navigation

- Every interactive element is reachable and operable by keyboard (Tab to reach, Enter/Space to
  activate, Escape to dismiss overlays where expected).
- Tab order follows visual order.
- Every focusable element has a **visible focus indicator** — use the design system's `focus-ring`
  token and prefer `:focus-visible` over `:focus` for pointer interactions.
- Custom widgets (menu, combobox, tabs, dialog, disclosure) implement the expected keyboard pattern
  for their role.
- No keyboard traps.
- Focus moves into a dialog/overlay on open and returns to the trigger on close; focus is trapped
  within a modal surface while it is open.
- A focused element is not fully hidden by sticky headers/footers or overlapping panels (`2.4.11`,
  new in 2.2) — reserve space with `scroll-margin`.

## Screen Readers

- Every interactive control has an **accessible name** (visible label, `aria-label`, or
  `aria-labelledby`).
- Icon-only controls have a text alternative; decorative icons are hidden (`aria-hidden` / empty `alt`).
- Images have meaningful `alt`, or empty `alt` when decorative.
- Form controls are programmatically associated with their labels.
- Heading levels are logical and do not skip.
- Dynamic updates that must be announced use an appropriate live region (see ARIA Live Regions).
- Data tables use proper markup (`th`, `scope`).
- Screen-reader-only text uses the `VisuallyHidden` component, not `display: none` (which removes it
  from the accessibility tree).

## Visual

- Text and meaningful UI meet WCAG AA contrast (`1.4.3`, `1.4.11`) — rely on the design tokens, which
  are designed to pass.

  | Element                                | AA minimum | AAA enhanced |
  | -------------------------------------- | ---------- | ------------ |
  | Normal text (< 18px / < 14px bold)     | 4.5:1      | 7:1          |
  | Large text (≥ 18px / ≥ 14px bold)      | 3:1        | 4.5:1        |
  | UI components & graphics (incl. focus) | 3:1        | 3:1          |

- State and meaning are **never conveyed by color alone** (`1.4.1`).
- The component remains usable at 200% zoom / increased text size — no clipping or overlap.
- Animation respects `prefers-reduced-motion`; nothing flashes more than three times per second.
- Focus and state styles stay visible across all themes.

## Forms

- Every field has a visible, persistent `<label>` — placeholder text is not a label.
- Required fields are indicated non-visually too, not by color or an asterisk alone.
- Errors are associated programmatically (`aria-describedby`) and announced; never conveyed by color
  alone.
- Group related controls with `fieldset`/`legend`.
- Use an appropriate input `type` and `autocomplete`.
- On submit, errors are surfaced and focus moves to the first error or an error summary.

## Content

- Interactive targets are at least 24×24 CSS px (`2.5.8`, new in 2.2), unless an inline text link,
  browser-sized, or spaced so a 24px circle on each does not overlap a neighbour. Aim for 44×44 on
  primary actions.
- Any dragging interaction has a single-pointer alternative (`2.5.7`, new in 2.2).
- Links are distinguishable from surrounding text by more than color.
- Empty and loading states are conveyed to assistive technology.

## ARIA Live Regions

| Need                                | Politeness | Role / attribute                          |
| ----------------------------------- | ---------- | ----------------------------------------- |
| Status, progress, non-urgent update | polite     | `role="status"` or `aria-live="polite"`   |
| Error or time-sensitive alert       | assertive  | `role="alert"` or `aria-live="assertive"` |

Use live regions sparingly — overuse makes a screen reader noisy. The region must exist in the DOM
before its content changes.

## Common Anti-Patterns

- `div`/`span` with an `onClick` acting as a button → use `<button>`.
- Icon button with no name → add `aria-label` or `VisuallyHidden` text.
- State shown by color only → add text, an icon, or an ARIA state.
- Positive `tabindex` → avoid; rely on DOM order with `tabindex="0"`/`"-1"` only.
- Removing the focus outline without a replacement → use the `focus-ring` token.
- `aria-label` that contradicts the visible label → keep them consistent.
- `display: none` for screen-reader-only text → use `VisuallyHidden`.
- Redundant ARIA (e.g. `role="button"` on a `<button>`) → remove it; native semantics win.

## Prioritizing Findings

Map severity to the repo's review framing so triage is consistent:

- **Critical** (→ usually **blocking**): missing form label, missing image `alt`, insufficient
  contrast, keyboard trap, no visible focus indicator.
- **Serious** (→ blocking or strong `todo`): missing page `lang`, broken heading structure,
  non-descriptive link text, auto-playing media, missing skip link.
- **Moderate** (→ `todo`/suggestion): missing icon labels, inconsistent navigation, weak error
  identification, uncontrolled timing, missing landmark regions.

## Testing

web-react keeps shared accessibility tests under `tests/accessibilityTests/` and per-component
`*.accessibility.test.tsx`; web has SCSS a11y tooling under `scss/tools/_accessibility.scss`. A new
or changed interactive component without an accessibility test is a `todo`.

These complement — they do not replace — `eslint-plugin-jsx-a11y` (static) and manual checks. For a
quick automated pass against a running page or Storybook story:

```bash
# Lighthouse accessibility category only
npx lighthouse <url> --only-categories=accessibility

# axe-core CLI
npx @axe-core/cli <url>
```

Automated tools catch only a fraction of issues. Always also verify by hand: Tab through the whole
flow, test with a screen reader (VoiceOver / NVDA), check 200% zoom, and exercise
`prefers-reduced-motion`.
