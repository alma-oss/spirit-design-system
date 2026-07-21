'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_OPTIONS_ROLE } from './constants';
import type { UnstableComboboxPopoverContextValue } from './types';

const defaultContext: UnstableComboboxPopoverContextValue = {
  id: '',
  activeDescendantId: undefined,
  activeNestedControlIndex: null,
  isDisabled: false,
  optionsRole: DEFAULT_OPTIONS_ROLE,
  selectedKeysSet: new Set(),
};

const ComboboxPopoverContext = createContext<UnstableComboboxPopoverContextValue>(defaultContext);

export const ComboboxPopoverContextProvider = ComboboxPopoverContext.Provider;

export const useComboboxPopoverContext = (): UnstableComboboxPopoverContextValue => useContext(ComboboxPopoverContext);
