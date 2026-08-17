# Selection

[Selection][selection-pattern] manages which keys are selected in list-style components such as Picker and Combobox. It splits state, mutation helpers, and tag-grid keyboard/ARIA wiring into three composable hooks — following the same pattern layout as Disclosure and [Collection][collection-hooks].

## Features

- Controlled and uncontrolled `selectedKeys` via `useSelectionState`
- Explicit `toggleSelection` / `selectSingleKey` helpers and `replaceSelection` on hooks (no inline mode-branching ternary at call sites)
- Shared `removeItem` / `removeAll` via `useSelectionManager`
- Tag-grid roving tabindex and Delete/Backspace removal via `useSelectionAria`
- Composes with Collection for item identity — Selection does not own the item tree

## Anatomy

`useSelectionState` owns (or mirrors) the selected keys array.

`useSelectionManager` wraps controlled `selectedKeys` + `onSelectionChange` and exposes mutation helpers used by Picker items, Combobox options, and tag remove actions.

`useSelectionAria` wires keyboard behaviour for the selection tag grid (`role="grid"`). Callers pass `onRemoveAtIndex` built from the manager’s `removeItem` / `removeAll`.

## useSelectionState

Manages selection state. Tracks `selectedKeys` and provides methods to update them.

### API

```js
useSelectionState(props: UseSelectionStateProps): SelectionState
```

Pure helpers (mode-free):

```js
toggleSelection(previousKeys: string[], key: string): string[]
selectSingleKey(key: string): string[]
```

## useSelectionManager

Mutation helpers for a controlled selection. Operates on the keys array — does not require a Collection for the verbs implemented today.

### API

```js
useSelectionManager(props: UseSelectionManagerProps): SelectionManager
```

Returns `{ toggleSelection, replaceSelection, isSelected, removeItem, removeAll }`.

## useSelectionAria

Provides keyboard and roving-tabindex behaviour for a selection tag grid. Tag-grid keyboard is the first slice here; roving tabindex refinements are tracked in [DS-2520](https://jira.almacareer.tech/browse/DS-2520) and [DS-2521](https://jira.almacareer.tech/browse/DS-2521).

### API

```js
useSelectionAria(props: UseSelectionAriaProps): {
  getKeyboardGridRowProps: (index: number) => SelectionGridRowProps
  removeTagAtIndex: (index: number) => void
  focusTagAtIndex: (index: number) => void
}
```

## Deferred (needs Collection Wiring)

These APIs are intentionally not implemented yet. Collection already exists under `hooks/collection/`; wiring it into the manager (and a shared `KeyboardDelegate`) is a follow-up.

| Capability                                                                 | Why deferred                                                                                          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `selectAll` / `clearSelection` / `toggleSelectAll`                         | Must enumerate every selectable key via Collection                                                    |
| `extendSelection` (range / anchor)                                         | Needs document order from Collection                                                                  |
| Generic `isDisabled(key)` / `canSelectItem(key)`                           | Needs Collection node lookup without holding a DOM row                                                |
| `KeyboardDelegate`-driven navigation shared by tag grid and option listbox | Needs Collection order + a swappable delegate; `useComboboxOptionGridKeyboard` stays separate for now |

## Example

```jsx
import {
  selectSingleKey,
  toggleSelection,
  useSelectionAria,
  useSelectionManager,
  useSelectionState,
} from '@alma-oss/spirit-web-react';

const Example = ({ options }) => {
  const { selectedKeys, setSelectedKeys } = useSelectionState({ defaultSelectedKeys: [] });
  const manager = useSelectionManager({
    selectedKeys,
    onSelectionChange: setSelectedKeys,
    selectionMode: 'multiple',
  });
  const { getKeyboardGridRowProps, removeTagAtIndex } = useSelectionAria({
    tagCount: selectedKeys.length,
    onRemoveAtIndex: (index) => manager.removeItem(selectedKeys[index]),
  });

  return (
    <div>
      <ul role="listbox">
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              onClick={() => manager.toggleSelection(option.value)}
              aria-selected={manager.isSelected(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
      <div role="grid">
        {selectedKeys.map((key, index) => (
          <div key={key} role="row" {...getKeyboardGridRowProps(index)}>
            {key}
            <button type="button" onClick={() => removeTagAtIndex(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Callers that branch on selectionMode pick an explicit verb:
// single  → onSelectionChange(selectSingleKey(value))
// multiple → onSelectionChange(toggleSelection(selectedKeys, value))
```

[collection-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/collection/README.md
[selection-pattern]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/selection.md
