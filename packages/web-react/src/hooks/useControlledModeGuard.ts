'use client';

import { useEffect, useRef } from 'react';
import { warning } from '../common/utilities';

export interface UseControlledModeGuardProps<T> {
  value?: T;
  defaultValue?: T;
  componentName: string;
  valuePropName?: string;
  defaultValuePropName?: string;
  bothDefinedMessage?: string;
  modeSwitchMessage?: string;
}

/**
 * Dev-only guard for controlled/uncontrolled APIs (`value` + `defaultValue`).
 * Warns when both props are set and when mode switches across renders.
 *
 * @param props - Guard configuration for controlled/uncontrolled checks.
 * @param props.value - Controlled value.
 * @param props.defaultValue - Uncontrolled initial value.
 * @param props.componentName - Name used in warning messages.
 * @param props.valuePropName - Optional controlled prop label for warning text.
 * @param props.defaultValuePropName - Optional uncontrolled prop label for warning text.
 * @param props.bothDefinedMessage - Optional custom warning when both value and defaultValue are set.
 * @param props.modeSwitchMessage - Optional custom warning when controlled mode changes across renders.
 */
export const useControlledModeGuard = <T>(props: UseControlledModeGuardProps<T>): void => {
  const {
    value,
    defaultValue,
    componentName,
    valuePropName = 'value',
    defaultValuePropName = 'defaultValue',
    bothDefinedMessage,
    modeSwitchMessage,
  } = props;
  const isControlled = value !== undefined;
  const isControlledRef = useRef<boolean | undefined>(undefined);
  const didWarnBothValueAndDefaultRef = useRef(false);

  useEffect(() => {
    if (value !== undefined && defaultValue !== undefined && !didWarnBothValueAndDefaultRef.current) {
      didWarnBothValueAndDefaultRef.current = true;

      warning(
        false,
        bothDefinedMessage ??
          `${componentName}: \`${valuePropName}\` and \`${defaultValuePropName}\` cannot both be set. Use either controlled (\`${valuePropName}\`) or uncontrolled (\`${defaultValuePropName}\`) mode.`,
      );
    }
  }, [bothDefinedMessage, componentName, defaultValue, defaultValuePropName, value, valuePropName]);

  useEffect(() => {
    if (isControlledRef.current === undefined) {
      isControlledRef.current = isControlled;

      return;
    }

    if (isControlledRef.current !== isControlled) {
      warning(
        false,
        modeSwitchMessage ??
          `${componentName}: Do not switch between controlled (\`${valuePropName}\` defined) and uncontrolled (\`${valuePropName}\` undefined) modes across renders.`,
      );
    }

    isControlledRef.current = isControlled;
  }, [componentName, isControlled, modeSwitchMessage, valuePropName]);
};
