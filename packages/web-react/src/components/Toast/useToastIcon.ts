import { useIconName } from '../../hooks/useIconName';
import { type SpiritToastBarProps } from '../../types';
import { DEFAULT_TOAST_COLOR } from './constants';

export function useToastIcon({ color, iconName }: Partial<SpiritToastBarProps>) {
  const iconNameValue = useIconName(
    color as string,
    {
      danger: 'danger',
      informative: 'info',
      neutral: 'info',
      success: 'success',
      warning: 'warning',
    },
    DEFAULT_TOAST_COLOR,
  );

  return iconName || iconNameValue;
}
