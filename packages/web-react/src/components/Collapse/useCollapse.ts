'use client';

import { useDeprecationMessage, useDisclosureState } from '../../hooks';
import { type ClickEvent } from '../../types';

export interface CollapseReturn {
  /** collapse event handler */
  toggleHandler: (event: ClickEvent) => void;
  /** collapse toggle */
  toggle: (isOpen: boolean) => void;
  /** collapsed state */
  isOpen: boolean;
}

/**
 * @deprecated Use `useDisclosureState` from `@alma-oss/spirit-web-react` instead.
 * This hook will be removed in the next major version.
 * @param defaultOpenState - Initial open state of the collapse.
 */
export const useCollapse = (defaultOpenState: boolean): CollapseReturn => {
  useDeprecationMessage({
    method: 'custom',
    trigger: true,
    componentName: 'useCollapse',
    customText:
      '`useCollapse` is deprecated and will be removed in the next major version. Use `useDisclosureState` instead.',
  });

  const { isExpanded, toggle } = useDisclosureState({ defaultExpanded: defaultOpenState });

  const toggleHandler = (event: ClickEvent) => {
    event.preventDefault();
    toggle();
  };

  return {
    toggleHandler,
    toggle,
    isOpen: isExpanded,
  };
};
