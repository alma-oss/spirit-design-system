# Collection

[Collections][collection-pattern] are a stable tree of nodes built from React children (or a dynamic items array) without touching the DOM. They provide item identity, labels, hierarchy, and disabled state for components such as Picker and Combobox.

## Features

- Builds a stable node tree from the element tree — never from live DOM queries
- Item and section components declare themselves via static `getCollectionNode` on the component type
- Supports static children and a dynamic `items` + `renderItem` builder path
- Sections (groups) participate in the tree; consumers can still iterate flat item nodes
- `filterCollection` returns a filtered view for navigation / future consumers
- Composes with [Selection][selection-pattern] (`useSelectionState`) — Collection does not own selection

## Anatomy

Collection item/section components expose a static `getCollectionNode` generator that yields partial nodes (`type`, `key`, `textValue`, …).

`createCollection` / `useCollection` walks children, calls `getCollectionNode` when present, and builds a `Collection` with key lookup and next/prev helpers.

Transparent wrappers without `getCollectionNode` are recursed into. Combobox also recognizes custom `role="option"|"row"` + `id` rows as a parity escape hatch.

## GetCollectionNode

Static method on an item or section component type. Yields one or more partial collection nodes.

### API

```js
Component.getCollectionNode = function* (props: object): Iterable<CollectionNodePartial>
```

## CreateCollection

Pure builder that walks children / dynamic items into a `Collection`.

### API

```js
createCollection(options: CreateCollectionOptions): Collection
```

## useCollection

React wrapper around `createCollection` (memoized).

### API

```js
useCollection(options: CreateCollectionOptions): Collection
```

## FilterCollection

Returns a new `Collection` containing only matching item nodes. Sections without matches are omitted.

### API

```js
filterCollection(collection: Collection, predicate: (node) => boolean): Collection
```

## GetNodeText

Flattens a `ReactNode` to plain text for `textValue` / aria labels (whitespace normalized).

### API

```js
getNodeText(node: ReactNode): string
```

## Example

```jsx
import { getNodeText, useCollection } from '@alma-oss/spirit-web-react';

const MyItem = (props) => <div>{props.children}</div>;
MyItem.getCollectionNode = function* (props) {
  yield {
    type: 'item',
    key: String(props.value ?? ''),
    rendered: props.children,
    textValue: getNodeText(props.children),
  };
};

const MyGroup = (props) => <fieldset>{props.children}</fieldset>;
MyGroup.getCollectionNode = function* (props) {
  yield {
    type: 'section',
    key: `group:${getNodeText(props.label)}`,
    textValue: getNodeText(props.label),
    hasChildNodes: true,
    children: props.children,
  };
};

const Example = ({ children }) => {
  const collection = useCollection({ children });

  return (
    <ul>
      {[...collection.getItemNodes()].map((node) => (
        <li key={node.key}>{node.textValue}</li>
      ))}
    </ul>
  );
};

<Example>
  <MyGroup label="Languages">
    <MyItem value="cs">Czech</MyItem>
    <MyItem value="en">English</MyItem>
  </MyGroup>
</Example>;
```

[collection-pattern]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/collections.md
[selection-pattern]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/selection.md
