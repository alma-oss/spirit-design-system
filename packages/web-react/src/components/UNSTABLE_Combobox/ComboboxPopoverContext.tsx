'use client';

import { createContext, useContext } from 'react';
import type { UnstableComboboxPopoverContextValue } from './types';

const defaultContext: UnstableComboboxPopoverContextValue = {
  id: '',
  isDisabled: false,
  selectedKeys: [],
};

const ComboboxPopoverContext = createContext<UnstableComboboxPopoverContextValue>(defaultContext);

export const ComboboxPopoverContextProvider = ComboboxPopoverContext.Provider;

export const useComboboxPopoverContext = (): UnstableComboboxPopoverContextValue => useContext(ComboboxPopoverContext);
