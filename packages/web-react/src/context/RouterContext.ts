'use client';

import React, { type ReactNode, createContext, useContext } from 'react';

export type RouterContextType = {
  navigate: (path: string, routerOptions?: Record<string, unknown>) => void;
  useHref?: (href: string) => string;
} | null;

export type RouterProviderProps = {
  navigate: (path: string, routerOptions?: Record<string, unknown>) => void;
  useHref?: (href: string) => string;
  children: ReactNode;
};

const defaultContext: RouterContextType = null;

const RouterContext = createContext<RouterContextType>(defaultContext);
const RouterConsumer = RouterContext.Consumer;

const RouterProvider = ({ navigate, useHref, children }: RouterProviderProps): JSX.Element =>
  React.createElement(RouterContext.Provider, { value: { navigate, useHref } }, children);

const useRouter = (): RouterContextType => useContext(RouterContext);

export default RouterContext;
export { RouterConsumer, RouterProvider, useRouter };
export type { RouterContextType as RouterContext };
