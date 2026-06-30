# ControlButton Size Scale

## When It Applies

Apps using `ControlButton` where previous rendered heights must be preserved.

## Detection

```bash
rg '<ControlButton|spirit-feature-enable-v5-control-button-expanded-size-scale|\$enable-v5-control-button-expanded-size-scale' <path>
```

## What Changed

Expanded size scale is now default. Heights remapped:

| `size`   | Height before | Height now |
| -------- | ------------- | ---------- |
| `xsmall` | —             | 16px       |
| `small`  | 24px          | 20px       |
| `medium` | 32px          | 24px       |
| `large`  | 40px          | 32px       |
| `xlarge` | —             | 40px       |

## Codemod (optional)

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/control-button-size-scale
```

**Run only if** you relied on previous heights. Shifts every `size` up one step. Skips JSX spreads and `PropsProvider` size.
The transform matches the literal `ControlButton` JSX name rather than imports, so review aliases and same-named
local components.

## Safe Automated Edits

Remove the dead `spirit-feature-enable-v5-control-button-expanded-size-scale` class from markup/class helpers and
the `$enable-v5-control-button-expanded-size-scale` variable from Sass configuration.

If preserving heights:

- omitted `size` (was `medium`) → `size="large"`
- `small` → `medium`, `medium` → `large`, `large` → `xlarge`

## Agent Edits

The agent patches `<ControlButton {...props} />` spreads and `PropsProvider` context sizing when detectable.
If the app also uses ControlButton inside Tag, reconcile those final values with
[tag-controlbutton-size](tag-controlbutton-size.md). The global and Tag-specific transforms are not safely
composable for every original size, so inspect nested controls instead of trusting transform order.

## Report Guidance

- Status: `not-applicable` if no feature flag exists and the app accepts new default sizes.
- Status: `completed` after flag cleanup and, when chosen, the optional size codemod and snapshot review.
- Confidence: `medium` — visual breaking change.
