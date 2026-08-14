'use client';

import { useMemo } from 'react';
import { createCollection } from './createCollection';
import type { Collection, CreateCollectionOptions } from './types';

/**
 * Builds a memoized Collection from children and/or dynamic items.
 *
 * @param options Builder options (`children`, optional `items` + `renderItem`)
 */
export const useCollection = <T = unknown>(options: CreateCollectionOptions<T>): Collection<T> => {
  const { children, items, renderItem } = options;

  return useMemo(
    () =>
      createCollection({
        children,
        items,
        renderItem,
      }),
    [children, items, renderItem],
  );
};
