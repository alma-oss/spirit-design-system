# Button `isBlock` Removal

## When It Applies

Apps using `isBlock` on `Button` or `ButtonLink`.

## Detection

```bash
rg "isBlock" <path> -g "*.{tsx,jsx}"
```

## Agent Edits

The agent applies layout replacements for every `isBlock` match in the target codebase.

```tsx
// All breakpoints
<div className="d-grid">
  <Button>Full-width Button</Button>
</div>

// Mobile only
<div className="d-grid d-tablet-block">
  <Button>Full-width on mobile</Button>
</div>

// Responsive with Grid
<Grid cols={{ mobile: 1, tablet: 2 }}>
  <Button>Responsive Button</Button>
</Grid>
```

## Report Guidance

- Status: `not-applicable` if no `isBlock` usage.
- Status: `completed` after layout replacement.
- Confidence: `high`.
