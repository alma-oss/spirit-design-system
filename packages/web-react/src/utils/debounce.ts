export type DebouncedFunction<T> = ((args: T) => void) & { cancel: () => void };

/**
 * Returns a debounced function that invokes `callback` after `delay` ms have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param {Function} callback - Function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {DebouncedFunction<T>} Debounced function with a `cancel` method.
 */
export const debounce = <T>(callback: (props: T) => void, delay: number): DebouncedFunction<T> => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounced = ((args: T): void => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = undefined;
      callback(args);
    }, delay);
  }) as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  };

  return debounced;
};
