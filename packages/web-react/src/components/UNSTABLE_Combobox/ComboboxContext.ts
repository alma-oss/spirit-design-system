'use client';

import { createContext, useContext } from 'react';
import { Sizes } from '../../constants';
import type { UnstableComboboxContextType } from './types';

const ComboboxContext = createContext<UnstableComboboxContextType>({ size: Sizes.MEDIUM });

export const ComboboxContextProvider = ComboboxContext.Provider;

export const useComboboxContext = () => useContext(ComboboxContext);
