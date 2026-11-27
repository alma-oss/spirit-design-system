'use client';

import { createContext, useContext } from 'react';
import { type RovingFocusContextType } from '../rovingFocus';

export type MenuContextType = RovingFocusContextType;

export const MenuContext = createContext<MenuContextType | null>(null);

export const MenuContextProvider = MenuContext.Provider;

export const useMenuContext = () => useContext(MenuContext);
