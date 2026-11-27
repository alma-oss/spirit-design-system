import { type Booleanish, type ClickEvent, type DropdownFullWidthMode } from '../../types';

const NAME_ARIA_CONTROLS = 'aria-controls';
const NAME_ARIA_EXPANDED = 'aria-expanded';
const NAME_ARIA_HASPOPUP = 'aria-haspopup';
const NAME_DATA_FULLWIDTHMODE = 'data-spirit-fullwidthmode';
const DIALOG_ROLE = 'dialog';
const MENU_ROLE = 'menu';
const PRESENTATION_ROLE = 'presentation';

export enum fullWidthModeKeys {
  off = 'off',
  'mobile-only' = 'mobile-only',
  all = 'all',
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
  hasPopup?: Booleanish | string;
  /** ID of the `Menu` inside the popover; the trigger then controls the menu and the popover is presentational */
  menuId?: string | null;
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
    [NAME_ARIA_HASPOPUP]: Booleanish | string;
    onClick: (event?: ClickEvent) => void;
  };
}

export const useDropdownAriaProps = (props: UseDropdownAriaPropsProps): UseDropdownAriaPropsReturn => {
  const { fullWidthMode, id, isOpen, menuId, toggleHandler } = props;
  const { hasPopup = menuId ? MENU_ROLE : DIALOG_ROLE } = props;

  const triggerProps = {
    [NAME_ARIA_EXPANDED]: isOpen,
    [NAME_ARIA_CONTROLS]: String(menuId ?? id),
    [NAME_ARIA_HASPOPUP]: hasPopup,
    onClick: toggleHandler,
  };
  const contentProps = {
    id,
    // The menu inside is the popup, so the popover does not announce a dialog around it.
    role: menuId ? PRESENTATION_ROLE : DIALOG_ROLE,
    [NAME_DATA_FULLWIDTHMODE]: fullWidthMode,
  };

  return {
    contentProps,
    triggerProps,
  };
};
