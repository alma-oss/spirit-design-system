# Collection Pattern

Collections provide a stable tree of item and section nodes built from React children — without reading the live DOM. They are the shared foundation for item identity, labels, hierarchy, and disabled state in components such as [UNSTABLE_Picker][picker] and [UNSTABLE_Combobox][combobox].

## Overview

Many Spirit components render a list of selectable or navigable items composed as JSX children. Walking those children ad hoc (and falling back to DOM queries for labels) duplicates fragile logic across components.

A **Collection** walks the element tree once and produces a stable node tree for identity, labels, hierarchy, and disabled state. Selection, keyboard behavior, and consumer-owned filtering stay in separate layers (`useSelectionState`, grid keyboard hooks, Combobox `inputValue` filtering).

## When to Use

- Building or extending a component that needs option/item identity from JSX children
- Grouping items (sections) that should exist in the data model, not only visually
- Deriving labels for tags / aria without querying the DOM
- Preparing a filtered _view_ of items for navigation helpers

## When Not to Use

- Do not use Collection as a replacement for Selection state
- Do not put consumer filtering inside Collection for Combobox today — Combobox filtering remains owned by the consumer (unmount matching options + `optionKeys`)
- Do not introduce a public `items` prop on Picker/Combobox solely because the builder supports a dynamic path

## Best Practices

### Declare Identity on Item / Section Components

Item and section components should declare how they appear in the collection (key, label text, optional disabled state). If you wrap an item in `memo` / HOC, forward that declaration (same class of issue as forwarding `spiritComponent`).

See [`hooks/collection`][collection-hooks] for the API and examples.

### Prefer Flat Item Iteration for Selection UIs

Sections may exist in the tree (e.g. `UNSTABLE_PickerGroup`), but tag/selection UIs usually iterate flat item nodes so behavior stays a flat list of values.

### Keep Filtering Ownership Clear

- Library helpers can produce a filtered Collection view (tests / future consumers).
- **Combobox** — consumer filters data and mounts matching `UNSTABLE_ComboboxOption` children; pass `optionKeys` when selected options can unmount.

## Related Hooks and Components

- [`hooks/collection`][collection-hooks] — API for `useCollection`, `createCollection`, `filterCollection`, `getNodeText`
- [`useSelectionState`][selection] — selection keys
- [UNSTABLE_Picker][picker] / [UNSTABLE_Combobox][combobox]

[collection-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/collection/README.md
[combobox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Combobox/README.md
[picker]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/README.md
[selection]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/useSelectionState.ts
