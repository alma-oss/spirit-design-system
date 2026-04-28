'use client';

import { type RefObject, useEffect } from 'react';
import { getFocusableElements } from '../utils';

export interface UseAutoFocusOptions {
  /** Whether autofocus should run. */
  isActive: boolean;
  /** Ref to container where the first focusable is searched. */
  containerRef: RefObject<HTMLElement | null>;
}

/**
 * Focuses the first focusable descendant element when activated.
 *
 * @param options - Hook configuration.
 * @param options.isActive - Whether autofocus should run.
 * @param options.containerRef - Ref to container element.
 */
export const useAutoFocus = ({ isActive, containerRef }: UseAutoFocusOptions): void => {
  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    const first = getFocusableElements(containerRef.current)[0];

    first?.focus();
  }, [containerRef, isActive]);
};
