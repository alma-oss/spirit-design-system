import type { Collection, CollectionNode } from './types';

/**
 * Builds a Collection API object from an already-materialized node tree.
 * Shared by `createCollection` and `filterCollection`.
 *
 * @param rootNodes Root nodes (items and/or sections)
 * @param itemNodes Flat list of item nodes in document order
 */
export const createCollectionFromNodes = <T>(
  rootNodes: CollectionNode<T>[],
  itemNodes: CollectionNode<T>[],
): Collection<T> => {
  const childrenByKey = new Map<string, CollectionNode<T>[]>();
  const itemByKey = new Map(itemNodes.map((node) => [node.key, node]));
  const indexByKey = new Map(itemNodes.map((node, index) => [node.key, index]));

  const indexTree = (nodes: CollectionNode<T>[]) => {
    for (const node of nodes) {
      childrenByKey.set(node.key, [...node.childNodes]);
      indexTree([...node.childNodes]);
    }
  };

  indexTree(rootNodes);
  childrenByKey.set('', rootNodes);

  return {
    size: itemNodes.length,
    getKeys: () => itemNodes.map((node) => node.key),
    getItem: (key: string) => itemByKey.get(key),
    getFirstKey: () => itemNodes[0]?.key ?? null,
    getLastKey: () => itemNodes[itemNodes.length - 1]?.key ?? null,
    getKeyBefore: (key: string) => {
      const index = indexByKey.get(key);

      if (index == null || index <= 0) {
        return null;
      }

      return itemNodes[index - 1]?.key ?? null;
    },
    getKeyAfter: (key: string) => {
      const index = indexByKey.get(key);

      if (index == null || index >= itemNodes.length - 1) {
        return null;
      }

      return itemNodes[index + 1]?.key ?? null;
    },
    getChildren: (key: string) => childrenByKey.get(key) ?? [],
    getItemNodes: () => itemNodes,
    [Symbol.iterator]: () => itemNodes[Symbol.iterator](),
  };
};
