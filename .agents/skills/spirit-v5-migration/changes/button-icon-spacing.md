# Button Icon Spacing

## When It Applies

Apps with `Icon` children inside `Button`, `ButtonLink`, or `ControlButton` using margin props.

## Detection

```bash
rg '<(Button|ButtonLink|ControlButton)' <path> -g "*.{tsx,jsx}" -A 5 | rg "margin(Right|Left|X)"
```

## What Changed

Buttons set spacing via `column-gap`. Remove `marginRight`, `marginLeft`, `marginX` from child `Icon` components. Use `spacing` prop on the button for non-default spacing.

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/button-icon-margin-removal
```

## Safe Automated Edits

```diff
- <Button>
-   <Icon name="hamburger" marginRight="space-400" />
+ <Button>
+   <Icon name="hamburger" />
    Menu
  </Button>

- <Button>
-   <Icon name="hamburger" marginRight="space-600" />
+ <Button spacing="space-600">
+   <Icon name="hamburger" />
    Menu
  </Button>
```

## Agent Edits

The agent patches spacing patterns the codemod skips.

## Report Guidance

- Status: `completed` when codemod applied and agent patched remaining spacing cases.
- Confidence: `high` for direct Icon margins; `medium` for other spacing patterns.
