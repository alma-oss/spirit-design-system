import { type Context, type ReactNode, createElement } from 'react';

// Context<T> is invariant, so a heterogeneous tuple list can't be typed soundly per element.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContextValuePair = readonly [Context<any>, any];

/**
 * Nests several context providers at once, so a producer can cascade one render's values to
 * multiple dedicated group contexts without hand-nesting a `Context.Provider` per value.
 *
 * @param {object} props - The component props.
 * @param {ReadonlyArray<[Context<unknown>, unknown]>} props.values - Context/value pairs to provide, outermost first.
 * @param {ReactNode} props.children - The nested content.
 * @returns {JSX.Element} The children wrapped in one `Context.Provider` per pair.
 */
const UniversalProvider = ({
  values,
  children,
}: {
  values: readonly ContextValuePair[];
  children: ReactNode;
}): JSX.Element =>
  values.reduceRight<ReactNode>(
    (acc, [Context, value]) => createElement(Context.Provider, { value }, acc),
    children,
  ) as JSX.Element;

export { UniversalProvider };
