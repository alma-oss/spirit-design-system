import { type ElementType } from 'react';
import { useIconName } from '../../hooks';
import { type SpiritAlertProps } from '../../types';

export function useAlertIcon<E extends ElementType = 'div', C = void>({ color, iconName }: SpiritAlertProps<E, C>) {
  const iconNameValue = useIconName(color as string, {
    default: 'info',
    success: 'success',
    informative: 'info',
    warning: 'warning',
    danger: 'danger',
  });

  return iconName || iconNameValue;
}
