'use client';

import { type ReactNode, createContext, createElement, useContext, useMemo } from 'react';

/** Return value is ignored by Spirit; typed as `unknown` so framework navigators (e.g. Next.js `push` → `Promise<boolean>`) stay assignable without wrappers. */
type RouterNavigate = (path: string, routerOptions?: Record<string, unknown>) => unknown;

type RouterContextType = {
  navigate: RouterNavigate;
} | null;

type RouterProviderProps = {
  navigate: RouterNavigate;
  children: ReactNode;
};

const defaultContext: RouterContextType = null;

const RouterContext = createContext<RouterContextType>(defaultContext);
const RouterConsumer = RouterContext.Consumer;

/**
 * Wraps part of the app so Spirit link-like components (`Link`, `ButtonLink`, …) can call
 * `navigate` on internal clicks instead of a full page load.
 *
 * Pass your app’s navigation function as `navigate` (path plus optional options as a second argument;
 * e.g. Next.js App Router `router.push`; Pages Router often needs a thin wrapper—see package README).
 *
 * @param props Provider props.
 * @param props.navigate Invoked from link components on qualifying internal navigations (after `preventDefault` when intercepting).
 * @param props.children Subtree that should be wrapped; descendants may call {@link useRouter}.
 */
const RouterProvider = (props: RouterProviderProps): JSX.Element => {
  const { navigate, children } = props;
  const value = useMemo(() => ({ navigate }), [navigate]);

  return createElement(RouterContext.Provider, { value }, children);
};

/** Returns the router value from the nearest `RouterProvider`, or `null` when missing. */
const useRouter = (): RouterContextType => useContext(RouterContext);

export default RouterContext;
export { RouterConsumer, RouterProvider, useRouter };
export type { RouterContextType, RouterNavigate, RouterProviderProps };
