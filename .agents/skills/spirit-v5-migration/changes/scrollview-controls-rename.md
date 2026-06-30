# ScrollView Arrows to Controls

## When It Applies

Apps using ScrollView arrow APIs, hooks, or constants.

## Detection

```bash
rg "hasArrows|ScrollViewArrows|useScrollViewArrows|arrowsScrollStep|ariaLabelArrows|SCROLL_VIEW_ARROWS" <path>
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/scrollview-arrows-to-controls
```

## Safe Automated Edits

| Before                       | After                          |
| ---------------------------- | ------------------------------ |
| `hasArrows`                  | `hasControls`                  |
| `arrowsScrollStep`           | `controlsScrollStep`           |
| `ariaLabelArrows`            | `ariaLabelControls`            |
| `ScrollViewArrows`           | `ScrollViewControls`           |
| `useScrollViewArrows`        | `useScrollViewControls`        |
| `{ arrows }`                 | `{ controls }`                 |
| `SCROLL_VIEW_ARROWS_LABEL_*` | `SCROLL_VIEW_CONTROLS_LABEL_*` |
| `classProps.arrows`          | `classProps.controls`          |

## Report Guidance

- Status: `completed` after codemod or agent-applied rename.
- Confidence: `high`.
