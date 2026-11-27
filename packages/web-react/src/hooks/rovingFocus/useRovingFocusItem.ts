'use client';

import { type RefObject, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export interface RovingFocusContextType {
  /** Register an item element; returns the unregister callback */
  register: (item: HTMLElement) => () => void;
}

interface Registration {
  item: HTMLElement;
  register: RovingFocusContextType['register'];
  unregister: () => void;
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
  const registrationRef = useRef<Registration | null>(null);

  // Runs after every render, as a new `elementType` replaces the element without changing the ref.
  useIsomorphicLayoutEffect(() => {
    const item = ref.current;
    const registration = registrationRef.current;

    if (registration?.item === item && registration?.register === register) {
      return;
    }

    registration?.unregister();
    registrationRef.current = register && item ? { item, register, unregister: register(item) } : null;
  });

  useIsomorphicLayoutEffect(
    () => () => {
      registrationRef.current?.unregister();
      registrationRef.current = null;
    },
    [],
  );
};
