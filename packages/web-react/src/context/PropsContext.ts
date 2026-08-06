'use client';

import { type ReactNode, createContext, createElement, useContext } from 'react';
import { isNullish, isPlainObject, omitNullish } from '../utils';

type PropsContextType = Record<string, unknown> | null;

/**
 * Props applied to every context consumer regardless of its namespace.
 *
 * Global props, which cascade to all descendants
 * rather than being targeted to a single component. They live at the top level of the context
 * value (not inside a namespace) and have the lowest precedence in the merge.
 */
const GLOBAL_PROPS = ['isDisabled', 'isRequired', 'validationState'] as const;

/**
 * Named groups of namespaces that additionally cascade a shared value beneath `GLOBAL_PROPS`.
 *
 * Unlike global props, a group value only reaches consumers whose namespace is listed as a
 * member, so it doesn't leak into unrelated components (e.g. a group used for `elementType`
 * doesn't reach `label` unless `label` is a member; a group used for `size` never reaches
 * `Button`/`SplitButton`, whose size type is incompatible).
 */
const NAMESPACE_GROUPS = {
  inlineElements: ['label', 'helperText', 'validationText'],
  formFields: ['inputContainer', 'inputAddon', 'controlButton'],
} as const;

const PropsContext = createContext<PropsContextType>(null);

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
 * Picks the props of any namespace group the given namespace belongs to.
 *
 * @param {Record<string, unknown>} context - The current context value.
 * @param {string} [namespace] - The namespace to check group membership for.
 * @returns {Record<string, unknown>} An object containing the applicable group props.
 */
const pickGroupProps = (context: Record<string, unknown>, namespace?: string): Record<string, unknown> =>
  Object.entries(NAMESPACE_GROUPS).reduce<Record<string, unknown>>((groupProps, [groupName, members]) => {
    const isMember =
      !!namespace && (members as readonly string[]).includes(namespace) && isPlainObject(context[groupName]);

    return isMember ? { ...groupProps, ...(context[groupName] as Record<string, unknown>) } : groupProps;
  }, {});

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
 * Namespace props concept, the context value is namespaced by component:
 * a consumer reads only the props addressed to its namespace (plus the top-level global props
 * and any namespace-group props it belongs to, see `NAMESPACE_GROUPS`), so props from sibling
 * providers do not collide. The namespace defaults to `defaultNamespace` but can be overridden
 * per instance via the component's `propsContext` prop.
 *
 * Precedence (low → high): global props < group props < namespace props < direct props.
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

  const namespace = propsContext || defaultNamespace;
  const namespaceProps =
    namespace && isPlainObject(context[namespace]) ? (context[namespace] as Record<string, unknown>) : {};
  const globalProps = pickGlobalProps(context);
  const groupProps = pickGroupProps(context, namespace);

  // Precedence (low → high): global props < group props < namespace props < direct props.
  const mergedProps = { ...globalProps, ...groupProps, ...namespaceProps, ...restProps };

  return omitNullish(mergedProps) as T;
};

export default PropsContext;
export { GLOBAL_PROPS, NAMESPACE_GROUPS, PropsConsumer, PropsProvider, useContextProps };
