'use client';

import { createContext, useContext } from 'react';
import { type RovingFocusContextType } from '../rovingFocus';

export type ToolbarContextType = RovingFocusContextType;

export const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const ToolbarContextProvider = ToolbarContext.Provider;

export const useToolbarContext = () => useContext(ToolbarContext);
