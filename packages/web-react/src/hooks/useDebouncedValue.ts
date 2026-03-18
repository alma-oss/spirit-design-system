'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from '../utils';

/**
 * Returns a debounced version of the provided value.
 * The returned value updates only after the specified delay has passed
 * without the input value changing.
 *
 * On the initial call the value is returned immediately (no delay).
 *
 * @param {T} inputValue - The value to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {T} The debounced value.
 */
export const useDebouncedValue = <T>(inputValue: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const isInitialMount = useRef(true);

  const debouncedSetValue = useMemo(() => debounce((value: T) => setDebouncedValue(value), delay), [delay]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      return undefined;
    }

    debouncedSetValue(inputValue);

    return () => debouncedSetValue.cancel();
  }, [inputValue, debouncedSetValue]);

  return debouncedValue;
};
