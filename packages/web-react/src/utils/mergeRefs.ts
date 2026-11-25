import { type Ref } from 'react';

/**
 * Combines refs into one callback ref, e.g. an internal ref with a forwarded one.
 *
 * @param refs Callback refs or ref objects; nullish values are skipped
 * @returns {(element: T | null) => void} Callback ref that sets all of them
 */
export const mergeRefs =
  <T>(...refs: Array<Ref<T> | undefined>) =>
  (element: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign -- forwarding the element to a ref object
        (ref as { current: T | null }).current = element;
      }
    });
  };
