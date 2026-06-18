import { type HTMLAttributes, useId } from 'react';
import { type ClickEvent } from '../../types';
import { isSSR } from '../../utils/ssr';
import { type DisclosureState } from './useDisclosureState';

const ATTR_ARIA_EXPANDED = 'aria-expanded';
const ATTR_ARIA_CONTROLS = 'aria-controls';
const ATTR_ARIA_LABELLEDBY = 'aria-labelledby';
const ATTR_ARIA_HIDDEN = 'aria-hidden';

export interface DisclosureAriaProps {
  /** Panel element id. When provided, overrides the auto-generated id. */
  id?: string;
  /** Whether the disclosure trigger is disabled. */
  isDisabled?: boolean;
  /** Whether the disclosure is expanded (controlled). */
  isExpanded?: boolean;
  /** Whether the disclosure is expanded by default (uncontrolled). */
  defaultExpanded?: boolean;
}

export interface TriggerAriaProps {
  /** Auto-generated trigger id, linked to the panel via aria-labelledby. */
  id: string;
  /** Whether the disclosure panel is currently expanded. */
  'aria-expanded': boolean;
  /** Id of the controlled panel element. */
  'aria-controls': string;
  /** Toggles the disclosure when called. No-op when isDisabled is true. */
  onClick: (event: ClickEvent) => void;
}

export interface DisclosureAria {
  /** Props for the disclosure trigger. */
  triggerProps: TriggerAriaProps;
  /** Props for the disclosure panel. */
  panelProps: HTMLAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a disclosure component.
 *
 * @param props - Props for the disclosure.
 * @param state - State for the disclosure, as returned by `useDisclosureState`.
 */
export function useDisclosureAria(props: DisclosureAriaProps, state: DisclosureState): DisclosureAria {
  const { id, isDisabled } = props;
  const triggerId = useId();
  const generatedPanelId = useId();
  const panelId = id ?? generatedPanelId;

  return {
    triggerProps: {
      id: triggerId,
      [ATTR_ARIA_EXPANDED]: state.isExpanded,
      [ATTR_ARIA_CONTROLS]: panelId,
      onClick: () => {
        if (!isDisabled) {
          state.toggle();
        }
      },
    },
    panelProps: {
      id: panelId,
      [ATTR_ARIA_LABELLEDBY]: triggerId,
      [ATTR_ARIA_HIDDEN]: !state.isExpanded,
      hidden: isSSR ? !state.isExpanded : undefined,
    },
  };
}
