'use client';

import { createContext, useContext } from 'react';

export interface ToolbarContextType {
  /** Register an item element; returns the unregister callback */
  register: (item: HTMLElement) => () => void;
}

export const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const ToolbarContextProvider = ToolbarContext.Provider;

export const useToolbarContext = () => useContext(ToolbarContext);
