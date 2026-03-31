'use client';

import { createContext, useContext } from 'react';
import { Sizes } from '../../constants';
import type { UnstablePickerContextType } from './types';

const PickerContext = createContext<UnstablePickerContextType>({ size: Sizes.MEDIUM });

export const PickerContextProvider = PickerContext.Provider;

export const usePickerContext = () => useContext(PickerContext);
