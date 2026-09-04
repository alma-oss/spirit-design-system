# Forms

Conversion heuristics for screens that contain fields and submit/cancel actions. Confirm field APIs
from current component source. Accessibility patterns live in `/spirit:accessibility`.

## Native Form Wrapper

Use a native `<form>` as the outermost wrapper, covering **both** the field area and the action
buttons. Name it with `aria-labelledby` pointing at the nearest heading — a named `<form>` becomes a
`form` landmark.

Do not put `type="submit"` outside the form. `Box elementType="form"` around fields only is wrong:
Enter will not activate the submit button.

```tsx
<Heading id="form-heading" elementType="h1">
  Personal details
</Heading>
<form aria-labelledby="form-heading" method="post">
  <Box>{/* fields */}</Box>
  <ActionGroup>
    <Button type="submit">Save</Button>
    <Button color="secondary">Cancel</Button>
  </ActionGroup>
</form>
```

## `ActionGroup` — DOM-First Submit

Use `ActionGroup` (not `Flex`) for submit/cancel pairs. Put the **submit button first in DOM**.
`horizontal-reversed` places it visually right while it receives keyboard/Enter priority. Align the
reversed cluster to the right on tablet+ (ActionGroup README).

```tsx
<ActionGroup
  direction={{ mobile: 'vertical', tablet: 'horizontal-reversed' }}
  alignmentX={{ mobile: 'stretch', tablet: 'right' }}
>
  <Button type="submit">Save</Button>
  <Button color="secondary">Cancel</Button>
</ActionGroup>
```

## `autoComplete` on Personal-Data Fields

Personal-data fields need WCAG 1.3.5 `autoComplete` tokens (`given-name`, `family-name`, `email`,
and so on). Use `/spirit:accessibility` for the token table. Do not invent tokens.

## Conditional Disclosure

When a checkbox reveals extra fields, set `aria-expanded` from the open state. Add `aria-controls`
only while the referenced IDs exist in the DOM — omit it while the fields are unmounted. See
`/spirit:accessibility` for a worked example.
