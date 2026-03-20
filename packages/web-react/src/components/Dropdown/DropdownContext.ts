'use client';

import { type MutableRefObject, createContext, useContext } from 'react';
import { Placements } from '../../constants';
import { type ClickEvent, type PlacementDictionaryType } from '../../types';
import { fullWidthModeKeys } from './useDropdownAriaProps';

type DropdownContextType = {
  dropdownRef: MutableRefObject<HTMLElement | null>;
  fullWidthMode?: keyof typeof fullWidthModeKeys;
  id: string;
  isOpen: boolean;
  onToggle: (event: ClickEvent) => void;
  placement?: PlacementDictionaryType;
  triggerRef: MutableRefObject<HTMLElement | undefined>;
};

const defaultContext: DropdownContextType = {
  dropdownRef: { current: null },
  fullWidthMode: fullWidthModeKeys.off,
  id: '',
  isOpen: false,
  onToggle: () => {},
  placement: Placements.BOTTOM_START,
  triggerRef: { current: undefined },
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
