'use client';

import {
  type FocusEvent,
  type FocusEventHandler,
  type ForwardedRef,
  type KeyboardEvent,
  type KeyboardEventHandler,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import { isElementHidden } from '../../utils';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { type ToolbarContextType, useToolbarContext } from './ToolbarContext';

// Non-interactive elements (e.g. a `div` avatar) must not become focusable through the toolbar.
const INTERACTIVE_SELECTOR = 'a[href], button, input, select, textarea';

export interface UseToolbarItemProps<T extends HTMLElement> {
  /** Whether the item is disabled and left out of the toolbar */
  isDisabled?: boolean;
  onFocus?: FocusEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
  /** Ref of the item element, forwarded to the consumer */
  ref?: ForwardedRef<T>;
}

export interface ToolbarItemProps<T extends HTMLElement> {
  onFocus?: FocusEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
  ref?: ForwardedRef<T> | ((element: T | null) => void);
  tabIndex?: 0 | -1;
}

interface ToolbarItemRegistration {
  element: HTMLElement;
  register: ToolbarContextType['register'];
  unregister: () => void;
}

/**
 * Props for an item of a toolbar provided by `useToolbar`: roving `tabIndex`, focus tracking and arrow keys.
 * Outside a toolbar, or for a disabled or non-interactive item, the consumer's handlers stay untouched.
 *
 * @param props Item props
 * @param props.isDisabled Whether the item is disabled and left out of the toolbar
 * @param props.onFocus Consumer focus handler
 * @param props.onKeyDown Consumer keydown handler
 * @param props.ref Ref of the item element, forwarded to the consumer
 */
export const useToolbarItem = <T extends HTMLElement>({
  isDisabled = false,
  onFocus,
  onKeyDown,
  ref,
}: UseToolbarItemProps<T>): ToolbarItemProps<T> => {
  const { activeKey, isEnabled, onItemKeyDown, register, setActiveKey } = useToolbarContext();
  const key = useId();
  const elementRef = useRef<T | null>(null);
  const registrationRef = useRef<ToolbarItemRegistration | null>(null);
  const wasHiddenRef = useRef<boolean | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const setRef = useCallback(
    (node: T | null) => {
      elementRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign -- forwarding the element to the consumer's ref object
        ref.current = node;
      }
    },
    [ref],
  );

  // Runs after every render, but only (un)registers when the element, its eligibility or visibility changes,
  // so a new inline ref from the consumer does not re-register the item. Registering again on a visibility
  // change lets the toolbar move its Tab stop even when only the item rendered.
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    const nextElement =
      isEnabled && !isDisabled && element?.matches(INTERACTIVE_SELECTOR) && !element.matches(':disabled')
        ? element
        : null;
    const registration = registrationRef.current;
    const isHidden = nextElement ? isElementHidden(nextElement) : null;
    const hasVisibilityChanged = wasHiddenRef.current !== isHidden;
    wasHiddenRef.current = isHidden;

    if (registration?.element === nextElement && registration?.register === register && !hasVisibilityChanged) {
      return;
    }

    registration?.unregister();
    registrationRef.current = nextElement
      ? { element: nextElement, register, unregister: register(key, nextElement) }
      : null;
    setIsRegistered(Boolean(nextElement));
  });

  useIsomorphicLayoutEffect(
    () => () => {
      registrationRef.current?.unregister();
      registrationRef.current = null;
    },
    [],
  );

  if (!isEnabled) {
    return { onFocus, onKeyDown, ref };
  }

  // A disabled anchor keeps its `href`, so it would stay an extra Tab stop next to the toolbar's one.
  if (isDisabled) {
    return { onFocus, onKeyDown, ref: setRef, tabIndex: -1 };
  }

  if (!isRegistered) {
    return { onFocus, onKeyDown, ref: setRef };
  }

  let tabIndex: ToolbarItemProps<T>['tabIndex'];

  // Until the toolbar picks its Tab stop (e.g. before hydration), items stay in the native tab order.
  if (activeKey != null) {
    tabIndex = activeKey === key ? 0 : -1;
  }

  return {
    ref: setRef,
    tabIndex,
    onFocus: (event: FocusEvent<T>) => {
      onFocus?.(event);
      setActiveKey(key);
    },
    onKeyDown: (event: KeyboardEvent<T>) => {
      onKeyDown?.(event);
      onItemKeyDown(key, event);
    },
  };
};
