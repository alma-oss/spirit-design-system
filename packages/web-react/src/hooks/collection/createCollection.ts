import { Children, type ReactElement, type ReactNode, isValidElement } from 'react';
import { createCollectionFromNodes } from './createCollectionFromNodes';
import { getNodeText } from './getNodeText';
import type {
  Collection,
  CollectionComponentType,
  CollectionNode,
  CollectionNodePartial,
  CreateCollectionOptions,
} from './types';

const isOptionItemRole = (role?: string) => role === 'option' || role === 'row';

const toIterable = <T>(value: Generator<T, void, undefined> | Iterable<T>): Iterable<T> => value;

const ensureUniqueKey = (key: string, seen: Map<string, number>): string => {
  const count = seen.get(key) ?? 0;
  seen.set(key, count + 1);

  if (count === 0) {
    return key;
  }

  return `${key}#${count}`;
};

type WalkContext<T> = {
  itemNodes: CollectionNode<T>[];
  keyCounts: Map<string, number>;
  siblingCounter: { value: number };
};

function walkNodes<T>(node: ReactNode, parentKey: string | null, context: WalkContext<T>): CollectionNode<T>[] {
  const result: CollectionNode<T>[] = [];

  Children.forEach(node, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const type = child.type as CollectionComponentType;
    const props = child.props as Record<string, unknown>;

    if (typeof type?.getCollectionNode === 'function') {
      for (const partial of toIterable(type.getCollectionNode(props))) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define -- mutual recursion with materializePartial
        result.push(...materializePartial(partial, parentKey, context));
      }

      return;
    }

    const role = typeof props.role === 'string' ? props.role : undefined;
    const id = typeof props.id === 'string' ? props.id : undefined;

    if (isOptionItemRole(role) && id) {
      const partial: CollectionNodePartial = {
        type: 'item',
        key: id,
        textValue: getNodeText(props.children as ReactNode),
        isDisabled: Boolean(props.isDisabled),
        props,
      };

      // eslint-disable-next-line @typescript-eslint/no-use-before-define -- mutual recursion with materializePartial
      result.push(...materializePartial(partial, parentKey, context));

      return;
    }

    if (props.children != null) {
      result.push(...walkNodes(props.children as ReactNode, parentKey, context));
    }
  });

  return result;
}

function materializePartial<T>(
  partial: CollectionNodePartial,
  parentKey: string | null,
  context: WalkContext<T>,
): CollectionNode<T>[] {
  if (!partial.key) {
    return [];
  }

  // Item keys are consumer-controlled option values — keep them stable and skip
  // duplicates instead of suffixing (Picker/Combobox treat node.key as the value).
  // Section keys may be derived (e.g. group labels); suffix those for uniqueness.
  let { key } = partial;

  if (partial.type === 'item') {
    if ((context.keyCounts.get(key) ?? 0) > 0) {
      return [];
    }

    context.keyCounts.set(key, 1);
  } else {
    key = ensureUniqueKey(key, context.keyCounts);
  }

  const index = context.siblingCounter.value;

  // Shared counter for document-order indices among siblings.
  // eslint-disable-next-line no-param-reassign -- intentional shared walk state
  context.siblingCounter.value += 1;

  const childNodes: CollectionNode<T>[] =
    partial.hasChildNodes || partial.children != null
      ? walkNodes(partial.children, key, {
          itemNodes: context.itemNodes,
          keyCounts: context.keyCounts,
          siblingCounter: { value: 0 },
        })
      : [];

  const collectionNode: CollectionNode<T> = {
    key,
    type: partial.type,
    textValue: partial.textValue ?? '',
    rendered: partial.rendered,
    isDisabled: partial.isDisabled,
    props: partial.props,
    hasChildNodes: childNodes.length > 0,
    childNodes,
    parentKey,
    index,
  };

  if (partial.type === 'item') {
    context.itemNodes.push(collectionNode);
  }

  return [collectionNode];
}

const buildFromChildren = <T>(
  children: ReactNode | undefined,
): {
  rootNodes: CollectionNode<T>[];
  itemNodes: CollectionNode<T>[];
} => {
  const itemNodes: CollectionNode<T>[] = [];
  const keyCounts = new Map<string, number>();
  const rootNodes = walkNodes<T>(children, null, {
    itemNodes,
    keyCounts,
    siblingCounter: { value: 0 },
  });

  return { rootNodes, itemNodes };
};

/**
 * Builds a Collection tree from static children and/or a dynamic items array.
 * Never touches the DOM — identity comes from `getCollectionNode` / role fallback.
 *
 * @param options Builder options
 */
export const createCollection = <T = unknown>(options: CreateCollectionOptions<T> = {}): Collection<T> => {
  const { children, items, renderItem } = options;

  let sourceChildren = children;

  if (items != null && renderItem) {
    const rendered: ReactElement[] = [];

    for (const item of items) {
      rendered.push(renderItem(item));
    }

    sourceChildren = rendered;
  }

  const { rootNodes, itemNodes } = buildFromChildren<T>(sourceChildren);

  return createCollectionFromNodes(rootNodes, itemNodes);
};
