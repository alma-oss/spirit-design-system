import type { ReactElement, ReactNode } from 'react';

export type CollectionNodeType = 'item' | 'section';

/**
 * Partial node returned from `getCollectionNode`.
 * The builder fills `parentKey`, `index`, and resolved `childNodes`.
 */
export interface CollectionNodePartial {
  type: CollectionNodeType;
  key: string;
  textValue?: string;
  rendered?: ReactNode;
  isDisabled?: boolean;
  props?: Record<string, unknown>;
  /** Section: child elements to walk; omit/empty for leaf items */
  hasChildNodes?: boolean;
  children?: ReactNode;
}

export type GetCollectionNode = (
  props: Record<string, unknown>,
) => Generator<CollectionNodePartial, void, undefined> | Iterable<CollectionNodePartial>;

export interface CollectionComponentType {
  getCollectionNode?: GetCollectionNode;
  spiritComponent?: string;
}

export interface CollectionNode<T = unknown> {
  key: string;
  type: CollectionNodeType;
  value?: T;
  textValue: string;
  rendered?: ReactNode;
  isDisabled?: boolean;
  props?: Record<string, unknown>;
  hasChildNodes: boolean;
  childNodes: Iterable<CollectionNode<T>>;
  parentKey: string | null;
  index: number;
}

export interface Collection<T = unknown> {
  /** Number of **item** nodes (sections are not counted). */
  size: number;
  getKeys(): Iterable<string>;
  getItem(key: string): CollectionNode<T> | undefined;
  getFirstKey(): string | null;
  getLastKey(): string | null;
  getKeyBefore(key: string): string | null;
  getKeyAfter(key: string): string | null;
  getChildren(key: string): Iterable<CollectionNode<T>>;
  getItemNodes(): Iterable<CollectionNode<T>>;
  [Symbol.iterator](): Iterator<CollectionNode<T>>;
}

export interface CreateCollectionOptions<T = unknown> {
  children?: ReactNode;
  /** Dynamic path — builder-only; not a public Picker/Combobox prop. */
  items?: Iterable<T>;
  renderItem?: (item: T) => ReactElement;
}
