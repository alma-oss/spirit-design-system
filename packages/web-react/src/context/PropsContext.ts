'use client';

import React, { createContext, useContext } from 'react';

type PropsContextType = Record<string, unknown> | null;

const PropsContext = createContext<PropsContextType>(null);

const PropsProvider = ({ value, children }: { value: Record<string, unknown>; children: React.ReactNode }) => {
  const parentContext = useContext(PropsContext);
  const mergedValue = parentContext ? { ...parentContext } : {};
  for (const [key, contextValue] of Object.entries(value)) {
    if (contextValue == null) {
      delete mergedValue[key];
    } else {
      mergedValue[key] = contextValue;
    }
  }

  return React.createElement(PropsContext.Provider, { value: mergedValue }, children);
};
const PropsConsumer = PropsContext.Consumer;

/**
 * Merges the props from the context with the provided props.
 * If the context is available, its values override the corresponding props in the returned object.
 * Components (e.g. Label, HelperText) typically apply precedence: defaults first, then context, then direct props,
 * so direct props ultimately win when passed explicitly.
 *
 * @template T - The type of the props object
 * @param {T} props - Props to merge with the context
 * @returns {T} The merged props with context values applied (direct props can still override when passed to the component)
 */
const useContextProps = <T extends PropsContextType>(props: T = {} as T): T => {
  const context = useContext(PropsContext);

  return context ? { ...props, ...context } : props;
};

export default PropsContext;
export { PropsConsumer, PropsProvider, useContextProps };
