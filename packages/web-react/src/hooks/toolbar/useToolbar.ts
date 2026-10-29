'use client';

import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Direction, KeyboardKey } from '../../constants';
import { isElementHidden } from '../../utils';
import { type GridRowMove, getNextEnabledRowIndex } from '../gridKeyboardNavigation';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { type ToolbarContextType } from './ToolbarContext';

export type ToolbarOrientation = (typeof Direction)[keyof typeof Direction];

export interface UseToolbarProps {
  /** Whether the toolbar keyboard contract is active */
  isEnabled?: boolean;
  /** Which arrow keys move the focus */
  orientation: ToolbarOrientation;
}

/**
 * Map a key to a toolbar move; Left and Right are swapped in right-to-left layouts.
 *
 * @param key Event key
 * @param orientation Toolbar orientation
 * @param isRtl Whether the layout is right-to-left
 */
export const getToolbarMove = (key: string, orientation: ToolbarOrientation, isRtl: boolean): GridRowMove | null => {
  const isVertical = orientation === Direction.VERTICAL;

  switch (key) {
    case KeyboardKey.Home:
      return 'first';
    case KeyboardKey.End:
      return 'last';
    case KeyboardKey.ArrowDown:
      return isVertical ? 'next' : null;
    case KeyboardKey.ArrowUp:
      return isVertical ? 'previous' : null;
    case KeyboardKey.ArrowRight:
      if (isVertical) {
        return null;
      }

      return isRtl ? 'previous' : 'next';
    case KeyboardKey.ArrowLeft:
      if (isVertical) {
        return null;
      }

      return isRtl ? 'next' : 'previous';
    default:
      return null;
  }
};

/**
 * Roving tabindex for a toolbar (`role="toolbar"`): one Tab stop, arrow keys matching
 * the orientation with wrapping, and Home/End. Items join via `useToolbarItem`.
 *
 * @param props Hook configuration
 * @param props.isEnabled Whether the toolbar keyboard contract is active
 * @param props.orientation Which arrow keys move the focus
 * @returns {ToolbarContextType} Value for `ToolbarContextProvider`
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
 */
export const useToolbar = ({ isEnabled = true, orientation }: UseToolbarProps): ToolbarContextType => {
  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [activeKey, setActiveKey] = useState<string | null>(null);
  // Re-renders the toolbar when items (un)register, so the Tab stop is resolved again.
  const [, setItemsVersion] = useState(0);

  // Items register in mount order, so the DOM decides their order.
  const getOrderedKeys = useCallback(
    () =>
      [...itemsRef.current.entries()]
        // eslint-disable-next-line no-bitwise -- `compareDocumentPosition` returns a bit mask
        .sort(([, a], [, b]) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .map(([key]) => key),
    [],
  );

  const register = useCallback((key: string, element: HTMLElement) => {
    itemsRef.current.set(key, element);
    setItemsVersion((version) => version + 1);

    return () => {
      itemsRef.current.delete(key);
      setItemsVersion((version) => version + 1);
    };
  }, []);

  const isItemSkipped = useCallback((key: string) => {
    const element = itemsRef.current.get(key);

    return !element || element.matches(':disabled') || isElementHidden(element);
  }, []);

  // The first focusable item is the Tab stop until another one gets focus.
  const resolveActiveKey = useCallback(
    (currentKey: string | null) =>
      currentKey && !isItemSkipped(currentKey)
        ? currentKey
        : (getOrderedKeys().find((key) => !isItemSkipped(key)) ?? null),
    [getOrderedKeys, isItemSkipped],
  );

  // Runs after every render, as an item can get hidden or disabled without registering again.
  useIsomorphicLayoutEffect(() => {
    if (!isEnabled) {
      return;
    }

    const nextKey = resolveActiveKey(activeKey);

    if (nextKey !== activeKey) {
      setActiveKey(nextKey);
    }
  });

  // Responsive props like `hideOn` hide items without a render.
  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleResize = () => setActiveKey(resolveActiveKey);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isEnabled, resolveActiveKey]);

  const onItemKeyDown = useCallback(
    (key: string, event: KeyboardEvent<HTMLElement>) => {
      if (!isEnabled || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl';
      const move = getToolbarMove(event.key, orientation, isRtl);

      if (!move) {
        return;
      }

      const keys = getOrderedKeys();
      const nextKey =
        keys[getNextEnabledRowIndex(keys.indexOf(key), keys.length, move, (index) => isItemSkipped(keys[index]))];

      if (!nextKey) {
        return;
      }

      event.preventDefault();
      setActiveKey(nextKey);
      itemsRef.current.get(nextKey)?.focus();
    },
    [getOrderedKeys, isEnabled, isItemSkipped, orientation],
  );

  return useMemo(
    () => ({ activeKey, isEnabled, onItemKeyDown, register, setActiveKey }),
    [activeKey, isEnabled, onItemKeyDown, register],
  );
};
