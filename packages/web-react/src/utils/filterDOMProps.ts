import { GLOBAL_PROPS } from '../context/PropsContext';

/**
 * Removes the global context props (`isDisabled`, `isRequired`, `validationState`) so they
 * are not spread onto a DOM element as raw attributes.
 *
 * @template T - The type of the props object.
 * @param {T} props - The object to filter.
 * @returns {T} A new object without the global context props.
 */
export const filterDOMProps = <T extends object>(props: T): T =>
  Object.entries(props).reduce(
    (result, [key, value]) =>
      GLOBAL_PROPS.includes(key as (typeof GLOBAL_PROPS)[number]) ? result : { ...result, [key]: value },
    {} as T,
  );
