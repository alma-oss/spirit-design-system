'use client';

import { createContext, useContext } from 'react';
import { type ToolbarOrientation } from './useToolbarAria';

export interface ToolbarContextType {
  /** Orientation of the toolbar; `Navigation` inside it uses it for layout and ignores its own `direction` */
  orientation: ToolbarOrientation;
  /** Register an item element; returns the unregister callback */
  register: (item: HTMLElement) => () => void;
}

export const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const ToolbarContextProvider = ToolbarContext.Provider;

export const useToolbarContext = () => useContext(ToolbarContext);
