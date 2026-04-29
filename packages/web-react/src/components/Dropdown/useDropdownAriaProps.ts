import { type Booleanish, type ClickEvent, type DropdownFullWidthMode } from '../../types';

const NAME_ARIA_CONTROLS = 'aria-controls';
const NAME_ARIA_EXPANDED = 'aria-expanded';
const NAME_ARIA_HASPOPUP = 'aria-haspopup';
const NAME_DATA_FULLWIDTHMODE = 'data-spirit-fullwidthmode';

export enum fullWidthModeKeys {
  'off' = 'off',
  'mobile-only' = 'mobile-only',
  'all' = 'all',
}
export interface UseDropdownAriaPropsProps {
  /** element ID */
  id: string;
  /** open state */
  isOpen: boolean;
  /** fullWidthMode */
  fullWidthMode: DropdownFullWidthMode | undefined;
  /** toggle callback */
  toggleHandler: (event?: ClickEvent) => void;
  /** trigger's aria-haspopup override */
  hasPopup?: string;
}

export interface UseDropdownAriaPropsReturn {
  /** content returned props */
  contentProps: {
    id: string;
    role: string;
    [NAME_DATA_FULLWIDTHMODE]?: keyof typeof fullWidthModeKeys | undefined;
  };
  /** trigger returned props */
  triggerProps: {
    [NAME_ARIA_EXPANDED]: Booleanish;
    [NAME_ARIA_CONTROLS]: string;
    [NAME_ARIA_HASPOPUP]: string;
    onClick: (event?: ClickEvent) => void;
  };
}

export const useDropdownAriaProps = (props: UseDropdownAriaPropsProps): UseDropdownAriaPropsReturn => {
  const { fullWidthMode, hasPopup = 'dialog', id, isOpen, toggleHandler } = props;

  const triggerProps = {
    [NAME_ARIA_EXPANDED]: isOpen,
    [NAME_ARIA_CONTROLS]: String(id),
    [NAME_ARIA_HASPOPUP]: hasPopup,
    onClick: toggleHandler,
  };
  const contentProps = {
    id,
    role: 'dialog',
    [NAME_DATA_FULLWIDTHMODE]: fullWidthMode,
  };

  return {
    contentProps,
    triggerProps,
  };
};
