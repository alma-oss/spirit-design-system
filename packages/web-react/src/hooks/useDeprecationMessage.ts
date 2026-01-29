'use client';

import { useEffect } from 'react';
import { warning } from '../common/utilities';

export interface UseDeprecationMessageProps {
  method?: 'component' | 'property' | 'custom';
  trigger: boolean;
  componentName: string;
  componentProps?: {
    newName?: string;
    delete?: boolean;
  };
  propertyProps?: {
    // Use for property name
    deprecatedName?: string;
    newName?: string;
    delete?: boolean;
    // Use for property value
    deprecatedValue?: string;
    newValue?: string;
    propertyName?: string;
  };
  customText?: string;
}

export const useDeprecationMessage = ({
  method = 'component',
  trigger,
  componentName,
  componentProps,
  propertyProps,
  customText,
}: UseDeprecationMessageProps) => {
  const messageBase = `Deprecation warning (${componentName}):`;

  useEffect(() => {
    const isExecutable = trigger && componentName && process.env.NODE_ENV === 'development';

    let message: string | undefined;
    let hasProps: boolean;

    switch (method) {
      case 'property':
        if (propertyProps?.delete) {
          message = `${messageBase} "${propertyProps?.deprecatedName}" property will be deleted in the next major version.`;
        } else if (propertyProps?.deprecatedValue && propertyProps?.newValue && propertyProps?.propertyName) {
          message = `${messageBase} The "${propertyProps?.deprecatedValue}" value for "${propertyProps?.propertyName}" property will be renamed to "${propertyProps?.newValue}" in the next major version.`;
        } else {
          message = `${messageBase} "${propertyProps?.deprecatedName}" property will be replaced in the next major version. Please use "${propertyProps?.newName}" instead. ♻️️`;
        }
        hasProps = !!propertyProps;
        break;

      case 'custom':
        message = `${messageBase} ${customText}`;
        hasProps = true;
        break;

      case 'component':
      default:
        if (componentProps?.delete) {
          message = `${messageBase} The component and its subcomponents will be deleted in the next major version.`;
        } else {
          message = `${messageBase} The component and its subcomponents will be renamed to "${componentProps?.newName}" in the next major version.`;
        }
        hasProps = !!componentProps;
        break;
    }

    if (message && isExecutable && hasProps) {
      warning(false, message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- We want to call this hook only once
  }, []);
};
