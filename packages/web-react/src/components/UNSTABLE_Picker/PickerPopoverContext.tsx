'use client';

import { createContext, useContext } from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../constants';
import type { UnstablePickerPopoverContextValue } from './types';

const defaultContext: UnstablePickerPopoverContextValue = {
  id: '',
  isDisabled: false,
  onSelectionChange: () => {},
  selectedKeys: [],
  selectionMode: MULTIPLE_SELECTION_MODE,
};

const PickerPopoverContext = createContext<UnstablePickerPopoverContextValue>(defaultContext);

export const PickerPopoverContextProvider = PickerPopoverContext.Provider;

export const usePickerPopoverContext = (): UnstablePickerPopoverContextValue => useContext(PickerPopoverContext);
