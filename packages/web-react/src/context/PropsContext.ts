'use client';

import { type ReactNode, createContext, createElement, useContext } from 'react';
import { isNullish } from '../utils';

type PropsContextType = Record<string, unknown> | null;

/**
 * Props applied to every context consumer regardless of its namespace.
 *
 * Mirrors Adobe Spectrum's environmental/provider props, which cascade to all descendants
 * rather than being targeted to a single slot. They live at the top level of the context
 * value (not inside a namespace) and have the lowest precedence in the merge.
 */
const GLOBAL_PROPS = ['isDisabled', 'isRequired'] as const;

const PropsContext = createContext<PropsContextType>(null);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Picks the global props that are present (non-nullish) in the given context.
 *
 * @param {Record<string, unknown>} context - The current context value.
 * @returns {Record<string, unknown>} An object containing only the present global props.
 */
const pickGlobalProps = (context: Record<string, unknown>): Record<string, unknown> => {
  const globalProps: Record<string, unknown> = {};

  for (const key of GLOBAL_PROPS) {
    if (!isNullish(context[key])) {
      globalProps[key] = context[key];
    }
  }

  return globalProps;
};

/**
 * Removes `null`/`undefined` values so they cannot clobber component defaults downstream.
 *
 * @template T - The type of the props object.
 * @param {T} value - The object to filter.
 * @returns {T} A new object without nullish values.
 */
const omitNullish = <T extends Record<string, unknown>>(value: T): T => {
  const result: Record<string, unknown> = {};

  for (const [key, propValue] of Object.entries(value)) {
    if (!isNullish(propValue)) {
      result[key] = propValue;
    }
  }

  return result as T;
};

/**
 * Merges an incoming provider value into the inherited (parent) context value.
 *
 * Top-level keys are replaced (or deleted when the incoming value is `null`/`undefined`).
 * Namespace keys (plain-object values) are cascaded one level deep so props from outer and
 * inner providers do not collide; keys cleared with `null`/`undefined` inside a namespace are
 * removed (used by `StackItem` to clear inherited context).
 *
 * @param {Record<string, unknown>} parentContext - The inherited context value.
 * @param {Record<string, unknown>} value - The incoming provider value.
 * @returns {Record<string, unknown>} The merged context value.
 */
const mergeContextValue = (
  parentContext: Record<string, unknown>,
  value: Record<string, unknown>,
): Record<string, unknown> => {
  const mergedValue: Record<string, unknown> = { ...parentContext };

  for (const [key, incomingValue] of Object.entries(value)) {
    const parentValue = mergedValue[key];

    if (isNullish(incomingValue)) {
      delete mergedValue[key];
    } else if (isPlainObject(parentValue) && isPlainObject(incomingValue)) {
      const mergedNamespace: Record<string, unknown> = { ...parentValue };

      for (const [namespaceKey, namespaceValue] of Object.entries(incomingValue)) {
        if (isNullish(namespaceValue)) {
          delete mergedNamespace[namespaceKey];
        } else {
          mergedNamespace[namespaceKey] = namespaceValue;
        }
      }

      mergedValue[key] = mergedNamespace;
    } else {
      mergedValue[key] = incomingValue;
    }
  }

  return mergedValue;
};

const PropsProvider = ({ value, children }: { value: Record<string, unknown>; children: ReactNode }) => {
  const parentContext = useContext(PropsContext);
  const mergedValue = mergeContextValue(parentContext ?? {}, value);

  return createElement(PropsContext.Provider, { value: mergedValue }, children);
};

const PropsConsumer = PropsContext.Consumer;

/**
 * Merges context props into the props passed directly to a component.
 *
 * Following Adobe Spectrum's slot-props concept, the context value is namespaced by component:
 * a consumer reads only the props addressed to its namespace (plus the top-level global props),
 * so props from sibling providers do not collide. The namespace defaults to `defaultNamespace`
 * but can be overridden per instance via the component's `propsContext` prop.
 *
 * Precedence (low → high): global props < namespace props < direct props. `null`/`undefined`
 * values are stripped so component defaults can still apply, and the `propsContext` addressing
 * prop is removed from the result.
 *
 * @template T - The type of the props object.
 * @param {T} props - Props passed directly to the component.
 * @param {string} [defaultNamespace] - The component's default namespace in the context value.
 * @returns {T} The merged props.
 */
const useContextProps = <T extends Record<string, unknown>>(props: T = {} as T, defaultNamespace?: string): T => {
  const context = useContext(PropsContext) ?? {};
  const { propsContext, ...restProps } = props as T & { propsContext?: string };

  const namespace = propsContext || defaultNamespace;
  const namespaceProps =
    namespace && isPlainObject(context[namespace]) ? (context[namespace] as Record<string, unknown>) : {};
  const globalProps = pickGlobalProps(context);

  // Precedence (low → high): global props < namespace props < direct props.
  const mergedProps = { ...globalProps, ...namespaceProps, ...restProps };

  return omitNullish(mergedProps) as T;
};

export default PropsContext;
export { GLOBAL_PROPS, PropsConsumer, PropsProvider, useContextProps };
