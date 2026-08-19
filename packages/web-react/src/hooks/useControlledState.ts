'use client';

import { useCallback, useState } from 'react';

/**
 * Manages a value that can be either controlled (`value` defined) or uncontrolled (`defaultValue`).
 * The returned setter never mutates internal state while controlled, but always calls `onChange`,
 * so consumers can react to state transitions triggered internally (e.g. via a `toggle` helper).
 *
 * @param value - Controlled value. When defined, the hook always returns this value.
 * @param defaultValue - Initial value used when uncontrolled (`value` is `undefined`).
 * @param onChange - Called with the next value whenever it changes.
 */
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [stateValue, setStateValue] = useState(value ?? defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : stateValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (Object.is(currentValue, newValue)) {
        return;
      }

      if (!isControlled) {
        setStateValue(newValue);
      }

      onChange?.(newValue);
    },
    [currentValue, isControlled, onChange],
  );

  return [currentValue, setValue];
}
