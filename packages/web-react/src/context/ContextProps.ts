'use client';

import { type ElementType, type ReactNode, createContext, createElement, useContext } from 'react';
import { type SizesDictionaryType } from '../types';
import { isNullish, isPlainObject, mergeProps } from '../utils';

type PropsContextType = Record<string, unknown> | null;

/**
 * Props provided to every context consumer regardless of its namespace.
 *
 * Global props, which cascade to all descendants
 * rather than being targeted to a single component. They live at the top level of the context
 * value (not inside a namespace) and have the lowest precedence in the merge. Whether a given
 * consumer actually applies a global prop (rather than just receiving and discarding it via
 * `filterDOMProps`) depends on that consumer's own implementation.
 */
const GLOBAL_PROPS = ['isDisabled', 'isRequired', 'validationState'] as const;

const PropsContext = createContext<PropsContextType>(null);

/**
 * Dedicated contexts that cascade a shared value to a fixed set of related components.
 *
 * Unlike global props (which reach every consumer automatically), joining a group is opt-in:
 * a component only receives the value if it explicitly reads the context and merges it in
 * itself. That's what lets any component — including one defined outside this package — join
 * a group, since there's no closed membership list to edit.
 *
 * A group value fully replaces whatever an ancestor provided for that context (plain React
 * context behavior, no deep merge), which is exactly the reset semantics `Stack`/`StackItem`
 * rely on. If a group value ever grows a second field, a producer setting only one field would
 * silently clear the other — worth remembering before adding fields here.
 */
export type InlineElementsContextValue = { elementType?: ElementType };
export type FormFieldsContextValue = { size?: SizesDictionaryType };
export type ListItemsContextValue = { elementType?: ElementType };

const InlineElementsContext = createContext<InlineElementsContextValue | null>(null);
const FormFieldsContext = createContext<FormFieldsContextValue | null>(null);
const ListItemsContext = createContext<ListItemsContextValue | null>(null);

/**
 * Picks the global props that are present (non-nullish) in the given context.
 *
 * @param {Record<string, unknown>} context - The current context value.
 * @returns {Record<string, unknown>} An object containing only the present global props.
 */
const pickGlobalProps = (context: Record<string, unknown>): Record<string, unknown> =>
  GLOBAL_PROPS.reduce<Record<string, unknown>>(
    (globalProps, key) => (isNullish(context[key]) ? globalProps : { ...globalProps, [key]: context[key] }),
    {},
  );

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

const ContextPropsProvider = ({ value, children }: { value: Record<string, unknown>; children: ReactNode }) => {
  const parentContext = useContext(PropsContext);
  const mergedValue = mergeContextValue(parentContext ?? {}, value);

  return createElement(PropsContext.Provider, { value: mergedValue }, children);
};

const PropsConsumer = PropsContext.Consumer;

/**
 * Merges context props into the props passed directly to a component.
 *
 * Namespace props concept, the context value is namespaced by component:
 * a consumer reads only the props addressed to its namespace plus the top-level global props,
 * so props from sibling providers do not collide. The namespace defaults to `defaultNamespace`
 * but can be overridden per instance via the component's `propsContext` prop.
 *
 * A value shared by several related components (e.g. inline elements, form fields, list items)
 * doesn't live in this shared context at all — it lives in its own dedicated context
 * (`InlineElementsContext`, `FormFieldsContext`, `ListItemsContext`), which a consumer reads
 * itself with `useContext` and merges in alongside this hook's result. That's what lets any
 * component — including one defined outside this package — join a group, since there's no
 * closed membership list to edit.
 *
 * Precedence (low → high): global props < namespace props < direct props.
 * `null`/`undefined` values are stripped so component defaults can still apply, and the
 * `propsContext` addressing prop is removed from the result.
 *
 * @template T - The type of the props object.
 * @param {T} props - Props passed directly to the component.
 * @param {string} [defaultNamespace] - The component's default namespace in the context value.
 * @returns {T} The merged props.
 */
const useContextProps = <T extends Record<string, unknown>>(props: T = {} as T, defaultNamespace?: string): T => {
  const context = useContext(PropsContext) ?? {};
  const { propsContext, ...restProps } = props as T & { propsContext?: string };

  const namespace = propsContext ?? defaultNamespace;
  const namespaceProps =
    namespace && isPlainObject(context[namespace]) ? (context[namespace] as Record<string, unknown>) : {};
  const globalProps = pickGlobalProps(context);

  // Precedence (low → high): global props < namespace props < direct props.
  return mergeProps(globalProps, namespaceProps, restProps) as T;
};

export default PropsContext;
export {
  ContextPropsProvider,
  FormFieldsContext,
  GLOBAL_PROPS,
  InlineElementsContext,
  ListItemsContext,
  PropsConsumer,
  useContextProps,
};
