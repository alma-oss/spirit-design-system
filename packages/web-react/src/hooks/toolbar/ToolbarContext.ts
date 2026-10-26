'use client';

import { type KeyboardEvent, type ReactNode, createContext, createElement, useContext } from 'react';

export interface ToolbarContextType {
  /** Key of the item that is the toolbar's Tab stop */
  activeKey: string | null;
  /** Whether a toolbar is active; items outside of it keep their native behavior */
  isEnabled: boolean;
  onItemKeyDown: (key: string, event: KeyboardEvent<HTMLElement>) => void;
  /** Register an item element; returns the unregister callback */
  register: (key: string, element: HTMLElement) => () => void;
  setActiveKey: (key: string) => void;
}

const defaultToolbarContext: ToolbarContextType = {
  activeKey: null,
  isEnabled: false,
  onItemKeyDown: () => {},
  register: () => () => {},
  setActiveKey: () => {},
};

export const ToolbarContext = createContext<ToolbarContextType>(defaultToolbarContext);

export const ToolbarContextProvider = ToolbarContext.Provider;

export const useToolbarContext = () => useContext(ToolbarContext);

/**
 * Stops the toolbar context, so controls of an overlay (dialog, popover, collapse) rendered inside
 * a toolbar keep their own Tab order instead of joining the toolbar.
 *
 * @param props Component props
 * @param props.children Overlay content
 */
export const ToolbarBoundary = ({ children }: { children?: ReactNode }) =>
  createElement(ToolbarContextProvider, { value: defaultToolbarContext }, children);
