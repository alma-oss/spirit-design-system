'use client';

import { createContext, useContext } from 'react';
import type { UnstablePickerListboxContextValue } from './types';

const defaultContext: UnstablePickerListboxContextValue = {
  isListbox: false,
  getOptionProps: () => {
    throw new Error('UNSTABLE_PickerItem in listbox presentation must be rendered inside UNSTABLE_PickerGroup.');
  },
};

const PickerListboxContext = createContext<UnstablePickerListboxContextValue>(defaultContext);

export const PickerListboxContextProvider = PickerListboxContext.Provider;

export const usePickerListboxContext = (): UnstablePickerListboxContextValue => useContext(PickerListboxContext);
