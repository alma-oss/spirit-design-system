# Item Composable API

## When It Applies

Apps using `Item` with `label`, `helperText`, `iconName`, or `selectionDecorator` props.

## Detection

```bash
rg "<Item.*(label|helperText|iconName|selectionDecorator)" <path> -g "*.{tsx,jsx}"
rg "selectionDecorator" <path>
```

## What Changed

| Before                    | After                                                 |
| ------------------------- | ----------------------------------------------------- |
| `label` prop              | `children` with `Label`                               |
| `helperText` prop         | `children` with `HelperText`                          |
| `iconName` prop           | `startSlot={<Icon name="…" />}`                       |
| `selectionDecorator`      | `isSelected` + explicit `endSlot`                     |
| Implicit `button` default | `div` default; set `elementType="button"` for buttons |

Selection indicators in `endSlot` still use the `check-plain` icon (see [Item README][readme-item]).

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/item-props
```

Adds `elementType="button"`, migrates slots and children. May not cover all dynamic cases.

## Safe Automated Edits

```diff
- <Item label="Item" iconName="search" helperText="Helper text" isSelected />
+ <Item
+   elementType="button"
+   startSlot={<Icon name="search" color="selected" />}
+   endSlot={<Icon name="check-plain" color="selected" />}
+   isSelected
+ >
+   <Label>Item</Label>
+   <HelperText helperText="Helper text" />
+ </Item>
```

**`selectionDecorator` mapping:**

- omitted or `"icon"` → trailing check icon in `endSlot` when selected
- `"background"` → `isSelected` only
- `"both"` → `isSelected` plus trailing check icon in `endSlot`

## Agent Edits

The agent applies Item API changes the codemod skips.

- `isDisabled` on `elementType="a"` or `role="option"` — add `aria-disabled` explicitly.
- Generated `startSlot` icons — add `color="selected"` when the selected design requires it; the codemod applies
  selected color only to generated end-slot check icons.
- Dynamic `selectionDecorator` values — migrate using the mapping table above.
- Complex conditional Item rendering — refactor to composable API while preserving behavior.

## Report Guidance

- Status: `completed` when all Items migrated.
- Status: `partial` if codemod skipped dynamic cases.
- Confidence: `medium` — review visual result and a11y.

[readme-item]: ../../../../packages/web-react/src/components/Item/README.md
