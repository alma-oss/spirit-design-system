'use client';

import { type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export interface RovingFocusContextType {
  /** Register an item element; returns the unregister callback */
  register: (item: HTMLElement) => () => void;
}

/**
 * Registers an item element with a composite widget through its `register` callback.
 * Without the callback, i.e. outside the widget, nothing happens.
 *
 * @param ref Ref of the item element
 * @param register Register callback of the nearest widget
 */
export const useRovingFocusItem = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  register: RovingFocusContextType['register'] | undefined,
): void => {
  useIsomorphicLayoutEffect(() => {
    const item = ref.current;

    if (!register || !item) {
      return undefined;
    }

    return register(item);
  }, [ref, register]);
};
