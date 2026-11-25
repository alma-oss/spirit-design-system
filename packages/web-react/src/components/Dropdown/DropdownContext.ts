'use client';

import { type MutableRefObject, createContext, useContext } from 'react';
import { Placements } from '../../constants';
import { type ClickEvent, type PlacementDictionaryType } from '../../types';
import { fullWidthModeKeys } from './useDropdownAriaProps';

export type DropdownMenuFocus = 'first' | 'last';

type DropdownContextType = {
  dropdownRef: MutableRefObject<HTMLElement | null>;
  fullWidthMode?: keyof typeof fullWidthModeKeys;
  id: string;
  isOpen: boolean;
  /** ID of the `Menu` inside the popover, if any */
  menuId?: string | null;
  /** Which menu item gets focus when the menu opens */
  menuFocusRef?: MutableRefObject<DropdownMenuFocus>;
  /** Close the popover; focus returns to the trigger unless `returnFocus` is `false` */
  onClose?: (returnFocus?: boolean) => void;
  onToggle: (event?: ClickEvent) => void;
  placement?: PlacementDictionaryType;
  /** Register the `Menu` inside the popover; returns the unregister callback */
  registerMenu?: (menuId: string) => () => void;
  triggerRef: MutableRefObject<HTMLElement | null | undefined>;
};

const defaultContext: DropdownContextType = {
  dropdownRef: { current: null },
  fullWidthMode: fullWidthModeKeys.off,
  id: '',
  isOpen: false,
  onToggle: () => {},
  placement: Placements.BOTTOM_START,
  triggerRef: { current: null },
};

const DropdownContext = createContext<DropdownContextType>(defaultContext);
const DropdownProvider = DropdownContext.Provider;
const DropdownConsumer = DropdownContext.Consumer;

const useDropdownContext = (): DropdownContextType & { placement: PlacementDictionaryType } => {
  const ctx = useContext(DropdownContext);

  return {
    ...ctx,
    placement: ctx.placement ?? defaultContext.placement,
  };
};

export default DropdownContext;
export { DropdownConsumer, DropdownProvider, useDropdownContext };
export type { DropdownContextType };
