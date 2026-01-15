'use client';

import { createContext, useContext } from 'react';

export type RouterContextType = {
  navigate: (path: string) => void;
} | null;

const defaultContext: RouterContextType = null;

const RouterContext = createContext<RouterContextType>(defaultContext);
const RouterProvider = RouterContext.Provider;
const RouterConsumer = RouterContext.Consumer;

const useRouterContext = (): RouterContextType => useContext(RouterContext);

export default RouterContext;
export { RouterConsumer, RouterProvider, useRouterContext };
