import { createCollectionFromNodes } from './createCollectionFromNodes';
import type { Collection, CollectionNode } from './types';

const filterTree = <T>(
  nodes: Iterable<CollectionNode<T>>,
  predicate: (node: CollectionNode<T>) => boolean,
  itemNodes: CollectionNode<T>[],
): CollectionNode<T>[] => {
  const result: CollectionNode<T>[] = [];

  for (const node of nodes) {
    if (node.type === 'item') {
      if (predicate(node)) {
        const filtered: CollectionNode<T> = {
          ...node,
          childNodes: [],
          hasChildNodes: false,
        };

        itemNodes.push(filtered);
        result.push(filtered);
      }
    } else {
      const childNodes = filterTree(node.childNodes, predicate, itemNodes);

      if (childNodes.length > 0) {
        result.push({
          ...node,
          childNodes,
          hasChildNodes: true,
        });
      }
    }
  }

  return result;
};

/**
 * Returns a new Collection containing only item nodes that match `predicate`.
 * Sections without matching children are omitted.
 *
 * @param collection Source collection
 * @param predicate Match function for item nodes
 */
export const filterCollection = <T = unknown>(
  collection: Collection<T>,
  predicate: (node: CollectionNode<T>) => boolean,
): Collection<T> => {
  const itemNodes: CollectionNode<T>[] = [];
  const roots = [...collection.getChildren('')];
  const filteredRoots =
    roots.length > 0
      ? filterTree(roots, predicate, itemNodes)
      : filterTree([...collection.getItemNodes()], predicate, itemNodes);

  return createCollectionFromNodes(filteredRoots, itemNodes);
};
