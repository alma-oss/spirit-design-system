'use client';

import { useDisclosureAria, useDisclosureState } from '../../hooks';
import { type ClickEvent, type CollapseAria } from '../../types';

export interface UseCollapseOptions {
  /** Id shared between the trigger and the collapse panel. When omitted, one is auto-generated. */
  id?: string;
  /** Whether the disclosure trigger is disabled. */
  isDisabled?: boolean;
}

export interface CollapseReturn {
  /** @DEPRECATED collapse event handler */
  toggleHandler: (event: ClickEvent) => void;
  /** collapse toggle */
  toggle: (event: ClickEvent) => void;
  /** collapsed state */
  isOpen: boolean;
  /** aria props for the trigger and the panel, sharing a single id pair */
  ariaProps: CollapseAria['ariaProps'];
}

/**
 * Composes `useDisclosureState` and `useDisclosureAria` into everything a `Collapse` needs:
 * state, a toggle handler, and matching trigger/panel aria props from a single shared id.
 *
 * @param defaultOpenState - Initial open state of the collapse.
 * @param options - Optional shared id and disabled state for the generated aria props.
 */
export const useCollapse = (defaultOpenState: boolean, options?: UseCollapseOptions): CollapseReturn => {
  const state = useDisclosureState({ defaultExpanded: defaultOpenState });
  const { triggerProps, panelProps } = useDisclosureAria({ id: options?.id, isDisabled: options?.isDisabled }, state);

  const handleToggle = (event: ClickEvent) => {
    event.preventDefault();
    state.toggle();
  };

  return {
    /** @DEPRECATED remove in future major release */
    toggleHandler: handleToggle,
    toggle: handleToggle,
    isOpen: state.isExpanded,
    ariaProps: {
      trigger: triggerProps,
      panel: panelProps,
    },
  };
};
