'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns a throttled version of the provided value (leading and trailing).
 * The initial value is returned immediately. Later updates are committed at most
 * once per `delay` ms; the latest value is always flushed when the window ends.
 *
 * @param {T} inputValue - The value to throttle.
 * @param {number} delay - Throttle interval in milliseconds.
 * @returns {T} The throttled value.
 */
export const useThrottledValue = <T>(inputValue: T, delay: number): T => {
  const [throttledValue, setThrottledValue] = useState(inputValue);
  const lastCommittedAtRef = useRef(0);
  const trailingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestValueRef = useRef(inputValue);
  latestValueRef.current = inputValue;

  useEffect(() => {
    const commit = (nextValue: T) => {
      lastCommittedAtRef.current = Date.now();
      setThrottledValue(nextValue);
    };

    if (lastCommittedAtRef.current === 0) {
      lastCommittedAtRef.current = Date.now();

      return undefined;
    }

    const remainingMs = delay - (Date.now() - lastCommittedAtRef.current);

    if (remainingMs <= 0) {
      if (trailingTimeoutRef.current != null) {
        clearTimeout(trailingTimeoutRef.current);
        trailingTimeoutRef.current = null;
      }
      commit(inputValue);

      return undefined;
    }

    if (trailingTimeoutRef.current != null) {
      clearTimeout(trailingTimeoutRef.current);
    }

    trailingTimeoutRef.current = setTimeout(() => {
      trailingTimeoutRef.current = null;
      commit(latestValueRef.current);
    }, remainingMs);

    return undefined;
  }, [delay, inputValue]);

  useEffect(
    () => () => {
      if (trailingTimeoutRef.current != null) {
        clearTimeout(trailingTimeoutRef.current);
      }
    },
    [],
  );

  return throttledValue;
};
